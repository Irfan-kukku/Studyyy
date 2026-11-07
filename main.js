(function(){
  const {useState,useEffect}=React;const h=htm.bind(React.createElement);
  const USERNAME_EMAIL={safree:'safree@studyplanner.app'};
  const friendlyError=code=>({
    'auth/invalid-credential':'Incorrect User ID or password.',
    'auth/invalid-login-credentials':'Incorrect User ID or password.',
    'auth/user-not-found':'Incorrect User ID or password.',
    'auth/wrong-password':'Incorrect User ID or password.',
    'auth/too-many-requests':'Too many attempts. Please wait and try again.',
    'auth/network-request-failed':'Network error. Check your internet connection.',
    'auth/invalid-email':'This User ID is not configured.'
  }[code]||'Unable to sign in. Please try again.');
  const AuthLogo=()=>window.SPLogoAvatar?h`<${window.SPLogoAvatar} size="auth"/>`:h`<div class="auth-icon">📚</div>`;
  function Login(){
    const[u,setU]=useState('');const[p,setP]=useState('');const[show,setShow]=useState(false);const[err,setErr]=useState('');const[busy,setBusy]=useState(false);
    const submit=async e=>{e.preventDefault();setErr('');const email=USERNAME_EMAIL[u.trim().toLowerCase()];if(!email){setErr('Incorrect User ID or password.');return}setBusy(true);try{await window.SPFirebase.auth.signInWithEmailAndPassword(email,p)}catch(x){setErr(friendlyError(x.code))}finally{setBusy(false)}};
    return h`<div class="auth-shell"><div class="auth-card"><${AuthLogo}/><h1>Study Planner</h1><p class="mu">174-video study planner</p><form onSubmit=${submit} class="auth-form"><label>User ID</label><input autocomplete="username" autocapitalize="none" spellcheck="false" value=${u} onInput=${e=>setU(e.target.value)} placeholder="Enter User ID" required/><label>Password</label><div class="pass-wrap"><input type=${show?'text':'password'} autocomplete="current-password" value=${p} onInput=${e=>setP(e.target.value)} placeholder="Enter password" required/><button type="button" class="showpass" onClick=${()=>setShow(!show)}>${show?'Hide':'Show'}</button></div>${err&&h`<div class="auth-error">${err}</div>`}<button class="p auth-submit" disabled=${busy}>${busy?'Signing in…':'Login'}</button></form><div class="mu auth-foot">Your progress is synced securely with your account.</div></div></div>`;
  }
  function Loading(){return h`<div class="auth-shell"><div class="auth-card auth-loading"><${AuthLogo}/><h1>Study Planner</h1><p class="mu">Checking your login…</p><div class="bar"><i style=${{width:'55%'}}/></div></div></div>`}
  function Gate(){
    const[user,setUser]=useState(null);const[ready,setReady]=useState(false);const[err,setErr]=useState('');
    useEffect(()=>{return window.SPFirebase.auth.onAuthStateChanged(async u=>{setErr('');if(!u){window.__SP_BOOT_STATE=null;setUser(null);setReady(true);return}try{await window.SPFirebase.hydrate(u,window.__SP_BOOT_STATE||window.StudyPlannerLoad?.()||null);setUser(u);setReady(true)}catch(e){setErr('Could not load your planner. Check Firestore rules and internet connection.');setReady(true)}})},[]);
    if(!ready)return h`<${Loading}/>`;if(!user)return h`<${Login}/>`;if(err)return h`<div class="auth-shell"><div class="auth-card"><h1>Planner unavailable</h1><p class="auth-error">${err}</p><button onClick=${()=>window.SPFirebase.signOut()}>Back to login</button></div></div>`;return h`<${window.StudyPlannerApp} user=${user}/>`;
  }
  ReactDOM.createRoot(document.getElementById('root')).render(h`<${Gate}/>`);
})();

if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
