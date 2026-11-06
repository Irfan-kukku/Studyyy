/* Firebase + Firestore sync layer for Study Planner.
   No password is stored here. Firebase Auth handles credentials. */
(function(){
  const cfg=window.firebaseConfig;
  const app=firebase.initializeApp(cfg);
  const auth=firebase.auth();
  const db=firebase.firestore();
  try{auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)}catch(e){}
  try{db.enablePersistence({synchronizeTabs:true}).catch(()=>{})}catch(e){}

  let uid=null, docRef=null, stop=null, revision=0, lastSyncedState=null, ready=false, latestLocalState=null;
  let writeQueue=Promise.resolve();
  const clone=o=>JSON.parse(JSON.stringify(o));
  const clientId=(()=>{try{return localStorage.getItem('sp.clientId')||(()=>{const x=crypto.randomUUID();localStorage.setItem('sp.clientId',x);return x})()}catch(e){return Math.random().toString(36).slice(2)}})();

  function refFor(u){return db.collection('users').doc(u).collection('planner').doc('state')}
  async function ensureDoc(u, initial){
    const r=refFor(u), snap=await r.get();
    if(!snap.exists){
      await r.set({state:initial,revision:0,clientUpdatedAt:Date.now(),updatedBy:clientId,updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
      return {state:initial,revision:0};
    }
    const d=snap.data()||{};return {state:d.state,revision:Number(d.revision||0)};
  }
  async function hydrate(u, localFallback){
    uid=u.uid;docRef=refFor(uid);
    const fallback=localFallback||window.StudyPlannerInit?.()||null;const remote=await ensureDoc(uid, fallback);
    if(remote.state && typeof remote.state==='object'){
      revision=remote.revision;lastSyncedState=clone(remote.state);window.__SP_BOOT_STATE=remote.state;
    }else{revision=0;lastSyncedState=clone(localFallback);window.__SP_BOOT_STATE=localFallback}
    ready=true;
    try{await db.collection('users').doc(uid).collection('profile').doc('main').set({username:'safree',email:u.email||null,lastLoginAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true})}catch(e){}
    return window.__SP_BOOT_STATE;
  }
  function diffState(local,base){
    if(!base)return true;
    return JSON.stringify(local)!==JSON.stringify(base);
  }
  async function savePlanner(state){
    if(!ready||!docRef)return;
    latestLocalState=clone(state);
    const next=clone(state), baseRev=revision, localBase=lastSyncedState&&clone(lastSyncedState), ts=Date.now();
    writeQueue=writeQueue.then(async()=>{
      await db.runTransaction(async tx=>{
        const snap=await tx.get(docRef);const d=snap.exists?(snap.data()||{}):{};const remoteRev=Number(d.revision||0);const remoteState=d.state;
        if(remoteRev!==baseRev && remoteState){
          // Never replace a newer server state with an older local snapshot.
          if(JSON.stringify(remoteState)!==JSON.stringify(localBase)) throw new Error('REMOTE_CHANGED');
        }
        tx.set(docRef,{state:next,revision:remoteRev+1,clientUpdatedAt:ts,updatedBy:clientId,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
        revision=remoteRev+1;lastSyncedState=clone(next);
      });
    }).catch(async err=>{
      if(err.message==='REMOTE_CHANGED'){
        try{const snap=await docRef.get();const d=snap.data()||{};revision=Number(d.revision||0);lastSyncedState=clone(d.state);window.__SP_BOOT_STATE=d.state;window.dispatchEvent(new CustomEvent('sp-remote-newer',{detail:d.state}));}catch(e){}
      }
    });
    return writeQueue;
  }
  async function writeSnapshot(state){return savePlanner(state)}
  function subscribePlanner(cb){
    if(!docRef)return()=>{};
    if(stop)stop();
    stop=docRef.onSnapshot(snap=>{
      if(!snap.exists)return;
      const d=snap.data()||{};
      revision=Number(d.revision||0);
      if(d.state){lastSyncedState=clone(d.state);cb({state:d.state,revision});}
    },()=>{});
    const onNew=e=>cb({state:e.detail,revision});window.addEventListener('sp-remote-newer',onNew);
    return()=>{if(stop)stop();stop=null;window.removeEventListener('sp-remote-newer',onNew)};
  }
  async function recordOperation(info){
    if(info&&info.result)return savePlanner(info.result);
  }
  function signOut(){return auth.signOut()}
  window.addEventListener('online',()=>{if(latestLocalState&&ready)savePlanner(latestLocalState).catch(()=>{})});
  window.SPFirebase={auth,db,hydrate,savePlanner,writeSnapshot,recordOperation,subscribePlanner,signOut,get uid(){return uid},clientId};
})();
