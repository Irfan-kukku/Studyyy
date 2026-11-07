
const {useState,useEffect}=React;const h=htm.bind(React.createElement);
/*LOGIC*/
const SUBJ=["History", "Geography", "Life Science", "Arts & Culture", "Simple Arithmetic", "Current Affairs", "Economics", "Chemistry", "Constitution", "Mental Ability", "Physics"];const V=[[0,"General",1],[1,"Chapter 2",1],[2,"Chapter 2",1],[0,"General",2],[3,"General",1],[1,"Chapter 2",2],[2,"Chapter 2",2],[1,"Chapter 2",3],[3,"General",2],[4,"Chapter 4",1],[0,"General",3],[3,"General",3],[4,"Chapter 4",2],[0,"General",4],[1,"Chapter 2",4],[0,"General",5],[4,"Chapter 4",3],[3,"General",4],[4,"Chapter 1",1],[5,"General",1],[1,"Chapter 1",1],[2,"Chapter 2",3],[0,"General",6],[1,"Chapter 2",5],[0,"General",7],[5,"General",2],[6,"General",1],[3,"General",5],[7,"Chapter 1",1],[8,"Chapter 1",1],[0,"General",8],[2,"Chapter 2",4],[4,"Chapter 1",2],[1,"Chapter 1",2],[1,"Chapter 2",6],[3,"General",6],[6,"General",2],[2,"Chapter 2",5],[0,"General",9],[5,"General",3],[8,"Chapter 1",2],[4,"Chapter 1",3],[1,"Chapter 2",7],[4,"Chapter 1",4],[8,"Chapter 1",3],[1,"Chapter 1",3],[2,"Chapter 1",1],[4,"Chapter 3",1],[3,"General",7],[7,"Chapter 1",2],[4,"Chapter 2",1],[0,"General",10],[7,"Chapter 1",3],[2,"Chapter 2",6],[9,"Chapter 3",1],[2,"Chapter 2",7],[1,"Chapter 1",4],[1,"Chapter 2",8],[8,"Chapter 1",4],[1,"Chapter 2",9],[2,"Chapter 2",8],[4,"Chapter 1",5],[4,"Chapter 4",4],[2,"Chapter 3",1],[10,"Chapter 2",1],[4,"Chapter 4",5],[6,"General",3],[4,"Chapter 3",2],[2,"Chapter 3",2],[8,"Chapter 1",5],[3,"General",8],[5,"General",4],[3,"General",9],[2,"Chapter 2",9],[2,"Chapter 1",2],[4,"Chapter 4",6],[0,"General",11],[4,"Chapter 4",7],[0,"General",12],[5,"General",5],[4,"Chapter 2",2],[4,"Chapter 4",8],[9,"Chapter 3",2],[5,"General",6],[4,"Chapter 2",3],[4,"Chapter 3",3],[0,"General",13],[1,"Chapter 1",5],[4,"Chapter 1",6],[1,"Chapter 2",10],[8,"Chapter 2",1],[4,"Chapter 4",9],[4,"Chapter 2",4],[8,"Chapter 3",1],[1,"Chapter 2",11],[8,"Chapter 2",2],[1,"Chapter 2",12],[10,"Chapter 4",1],[4,"Chapter 4",10],[10,"Chapter 2",2],[8,"Chapter 3",2],[8,"Chapter 1",6],[10,"Chapter 2",3],[8,"Chapter 1",7],[10,"Chapter 4",2],[10,"Chapter 2",4],[7,"Chapter 1",4],[9,"Chapter 3",3],[6,"General",4],[0,"General",14],[8,"Chapter 4",1],[3,"General",10],[4,"Chapter 3",4],[2,"Chapter 3",3],[3,"General",11],[2,"Chapter 2",10],[2,"Chapter 3",4],[2,"Chapter 2",11],[7,"Chapter 1",5],[4,"Chapter 1",7],[7,"Chapter 1",6],[9,"Chapter 3",4],[4,"Chapter 3",5],[6,"General",5],[10,"Chapter 3",1],[6,"General",6],[9,"Chapter 3",5],[10,"Chapter 3",2],[2,"Chapter 2",12],[7,"Chapter 1",7],[8,"Chapter 4",2],[8,"Chapter 1",8],[4,"Chapter 4",11],[8,"Chapter 3",3],[5,"General",7],[4,"Chapter 1",8],[9,"Chapter 1",1],[2,"Chapter 1",3],[10,"Chapter 3",3],[4,"Chapter 2",5],[1,"Chapter 2",13],[9,"Chapter 3",6],[6,"General",7],[1,"Chapter 2",14],[6,"General",8],[8,"Chapter 2",3],[1,"Chapter 2",15],[4,"Chapter 3",6],[1,"Chapter 2",16],[9,"Chapter 1",2],[10,"Chapter 4",3],[10,"Chapter 2",5],[10,"Chapter 3",4],[2,"Chapter 3",5],[5,"General",8],[1,"Chapter 1",6],[2,"Chapter 1",4],[8,"Chapter 4",3],[2,"Chapter 1",5],[4,"Chapter 1",9],[0,"General",15],[9,"Chapter 1",3],[1,"Chapter 1",7],[3,"General",12],[7,"Chapter 1",8],[2,"Chapter 1",6],[5,"General",9],[9,"Chapter 2",1],[4,"Chapter 2",6],[9,"Chapter 2",2],[1,"Chapter 1",8],[0,"General",16],[10,"Chapter 3",5],[1,"Chapter 1",9]];const BASE_NV=V.length;let NV=BASE_NV;const BASE_SUBJ=SUBJ.length;
const HUE=[200,260,25,150,45,120,330,290,5,175,225];const hue=s=>HUE[s]!==undefined?HUE[s]:(s*137)%360;
const CH={};V.forEach((x,i)=>(CH[x[0]+'|'+x[1]]=CH[x[0]+'|'+x[1]]||[]).push(i));
const PER=5;const SLOT=['4:00–5:30 PM','5:45–7:15 PM','7:30–9:00 PM','9:15–11:00 PM · Extra','12:00–1:00 AM'];const old2new=p=>Math.floor(p/4)*PER+(p%4===3?4:p%4);
const START=new Date(2026,10,7);const ST=['Not Started','Completed','Revisit','Moved'];const W=['Completed','Revisit'];
const KEY='studyplanner.v1';const KEY2='studyplanner.v2';
const clone=o=>JSON.parse(JSON.stringify(o));
const init=()=>({v:2,sched:(()=>{const a=Array(44*PER).fill(null);for(let i=0;i<BASE_NV;i++)a[old2new(i)]=i;return a})(),st:{},extras:[],log:[],sessions:[]});
const stat=(S,i)=>S.st[i]||'Not Started';const watched=(S,i)=>W.includes(stat(S,i));
const chIds=i=>CH[V[i][0]+'|'+V[i][1]];const nm=i=>SUBJ[V[i][0]]+' · '+V[i][1]+' · V'+V[i][2];
const dayOf=p=>Math.floor(p/PER);const dDate=d=>{const x=new Date(START);x.setDate(x.getDate()+d);return x};
const fd=d=>dDate(d).toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short'});
const rawToday=()=>Math.round((new Date().setHours(0,0,0,0)-START)/864e5);
const earlierOK=(S,i)=>chIds(i).slice(0,V[i][2]-1).every(j=>watched(S,j));
const lastDay=S=>{let m=0;S.sched.forEach((x,k)=>{if(x!==null)m=k});return dayOf(m)+1};
const pos=(S,i)=>S.sched.indexOf(i);
const where=(S,i)=>{const p=pos(S,i);return p<0?'—':'Day '+(dayOf(p)+1)+' · '+SLOT[p%PER]};
function reorder(T,i){const ids=chIds(i).filter(j=>T.st[j]!=='Completed'&&T.sched.includes(j));const sl=ids.map(j=>T.sched.indexOf(j)).sort((a,b)=>a-b);ids.forEach((j,k)=>T.sched[sl[k]]=j)}
function place(T,i,after){let j=T.sched.findIndex((x,k)=>k>after&&x===null);if(j<0){j=T.sched.length;for(let n=0;n<PER;n++)T.sched.push(null)}T.sched[j]=i}
const L=(T,m)=>T.log.unshift({t:Date.now(),m});
let curS=null;
function applyCustom(S){curS=S;SUBJ.length=BASE_SUBJ;V.length=BASE_NV;Object.keys(CH).forEach(k=>delete CH[k]);
 (Array.isArray(S.subj)?S.subj:[]).forEach(n=>SUBJ.push(String(n)));
 (Array.isArray(S.custom)?S.custom:[]).forEach(c=>V.push([c.s,c.c,c.n]));
 NV=V.length;V.forEach((x,i)=>(CH[x[0]+'|'+x[1]]=CH[x[0]+'|'+x[1]]||[]).push(i))}
function validate(S){const prev=curS;if(S&&typeof S==='object')applyCustom(S);const r=validate0(S);if(r&&prev)applyCustom(prev);return r}
function validate0(S){if(!S||!Array.isArray(S.sched)||S.sched.length%PER||typeof S.st!=='object'||!Array.isArray(S.log)||!Array.isArray(S.extras))return'Unrecognised file';
const seen=new Set();for(const x of S.sched){if(x===null)continue;if(!Number.isInteger(x)||x<0||x>=NV||seen.has(x))return'Duplicate or invalid video in schedule';seen.add(x)}
for(let i=0;i<NV;i++)if(!seen.has(i)&&S.st[i]!=='Completed')return'Video missing: '+nm(i);
for(const k in CH){const p=CH[k].filter(j=>seen.has(j)&&S.st[j]!=='Completed').map(j=>S.sched.indexOf(j));if(p.some((x,n)=>n&&x<p[n-1]))return'Chapter order broken: '+k}return''}
const op={
set(S,i,val){const w=W.includes(val);
 if(w&&!earlierOK(S,i))return{err:'Finish the earlier videos of this chapter first'};
 if(!w&&chIds(i).slice(V[i][2]).some(j=>watched(S,j)))return{err:'Later videos in this chapter are already done'};
 const T=clone(S);T.st[i]=val;if(!w&&T.sched.indexOf(i)<0){place(T,i,Math.max(0,rawToday())*PER+PER-1)}reorder(T,i);
 L(T,nm(i)+' → '+val);return{S:T,ok:nm(i)+': '+val}},
extra(S,i,note){if(stat(S,i)==='Completed')return{err:'Already completed'};
 if(!earlierOK(S,i))return{err:'Videos 1–'+(V[i][2]-1)+' of this chapter must be completed first'};
 const T=clone(S);const p=T.sched.indexOf(i);if(p>=0)T.sched[p]=null;T.st[i]='Completed';T.extras.push({i,note,t:Date.now()});
 L(T,'Extra video: '+nm(i)+(p>=0?' (freed Day '+(dayOf(p)+1)+' slot)':'')+(note?' — '+note:''));return{S:T,ok:'Extra recorded'}},
swap(S,pid,xid,note){if(pid===xid)return{err:'Pick two different videos'};if(pos(S,pid)<0||stat(S,pid)==='Completed')return{err:'Planned video must be pending'};
 if(stat(S,xid)==='Completed')return{err:'Extra video already completed'};if(!earlierOK(S,xid))return{err:'Earlier videos of the extra video\'s chapter must be completed first'};
 const T=clone(S);const a=T.sched.indexOf(pid),b=T.sched.indexOf(xid);T.sched[a]=xid;if(b>=0)T.sched[b]=null;
 T.st[xid]='Completed';T.extras.push({i:xid,note,t:Date.now()});place(T,pid,a);T.st[pid]='Moved';reorder(T,pid);
 L(T,'Swap: '+nm(xid)+' replaced '+nm(pid)+' (Day '+(dayOf(a)+1)+'). Displaced → '+where(T,pid)+(note?' — '+note:''));return{S:T,ok:'Swapped; displaced video rescheduled'}},
move(S,i,day){if(stat(S,i)==='Completed'||pos(S,i)<0)return{err:'Only pending planned videos can be moved'};
 const T=clone(S);while(T.sched.length<day*PER)T.sched.push(null);let j=-1;for(let k=(day-1)*PER;k<day*PER;k++)if(T.sched[k]===null){j=k;break}
 if(j<0)return{err:'Day '+day+' has no free slot — use Swap instead'};const from=where(S,i);T.sched[T.sched.indexOf(i)]=null;T.sched[j]=i;reorder(T,i);T.st[i]='Moved';
 const actual=where(T,i),actualDay=dayOf(T.sched.indexOf(i))+1;
 L(T,'Moved '+nm(i)+': '+from+' → '+actual+(actualDay!==day?' (requested Day '+day+'; adjusted to preserve chapter order)':''));
 const ok=actualDay===day?'Moved to '+actual:'Requested Day '+day+'; placed on '+actual+' to keep this chapter’s videos in order.';
 return{S:T,ok}},
catchup(S,i,day){if(stat(S,i)==='Completed')return{err:'Already completed'};if(!earlierOK(S,i))return{err:'Finish the earlier videos of this chapter first'};
 const p=pos(S,i);const T=clone(S);if(p>=0)T.sched[p]=null;T.st[i]='Completed';(T.cu=T.cu||[]).push({i,day,t:Date.now()});
 L(T,'Catch-up (Day '+(day+1)+', evening): '+nm(i)+(p>=0?' — missed from Day '+(dayOf(p)+1):''));return{S:T,ok:'Caught up: '+nm(i)}},
add(S,o){const clean=x=>String(x==null?'':x).replace(/\|/g,' ').replace(/\s+/g,' ').trim().slice(0,60);
 applyCustom(S);const T=clone(S);T.subj=T.subj||[];T.custom=T.custom||[];
 let s=+o.subj;if(s<0){const nn=clean(o.newSubj);if(!nn)return{err:'Enter a subject name'};const f=SUBJ.findIndex(x=>x.toLowerCase()===nn.toLowerCase());if(f>=0)s=f;else{T.subj.push(nn);s=BASE_SUBJ+T.subj.length-1}}
 let ch=clean(o.ch==='__new'?o.newCh:o.ch);if(!ch)return{err:'Enter a chapter name'};
 const ex=Object.keys(CH).find(k=>k.split('|')[0]==s&&k.split('|')[1].toLowerCase()===ch.toLowerCase());if(ex)ch=ex.split('|')[1];
 const have=CH[s+'|'+ch]||[];const n=Math.max(1,Math.min(30,Math.floor(+o.count)||1));
 const ids=[];for(let k=1;k<=n;k++){T.custom.push({s,c:ch,n:have.length+k});ids.push(BASE_NV+T.custom.length-1)}
 applyCustom(T);
 const lastPend=Math.max(-1,...have.filter(j=>T.st[j]!=='Completed').map(j=>T.sched.indexOf(j)));
 let after=+o.day>0?(+o.day-1)*PER-1:T.sched.reduce((m,x,k)=>x!==null?k:m,-1);after=Math.max(after,lastPend);
 ids.forEach(i=>{let j=after+1;for(;;j++){while(j>=T.sched.length)for(let q=0;q<PER;q++)T.sched.push(null);if(T.sched[j]===null&&j%PER!==3)break}T.sched[j]=i;after=j});
 L(T,'Added '+n+' video'+(n>1?'s':'')+': '+SUBJ[s]+' · '+ch+' · V'+(have.length+1)+(n>1?'–V'+(have.length+n):'')+' → '+where(T,ids[0]));
 return{S:T,ok:'Added '+n+' video'+(n>1?'s':'')+' — first on '+where(T,ids[0])}},
session(S,txt,min){const T=clone(S);T.sessions.push({txt,min,t:Date.now()});L(T,'Extra study session: '+txt+(min?' ('+min+' min)':''));return{S:T,ok:'Session recorded'}}};
/*ENDLOGIC*/
const migrate=s=>{if(s&&s.v!==2&&Array.isArray(s.sched)&&s.sched.length%4===0){const a=Array(s.sched.length/4*PER).fill(null);s.sched.forEach((x,p)=>{a[old2new(p)]=x});s.sched=a;s.v=2}return s};
const load=()=>{try{let s=JSON.parse(localStorage.getItem(KEY2)||localStorage.getItem(KEY));s=migrate(s);if(s&&!validate(s))return s}catch(e){}return init()};
const localSave=S=>{try{localStorage.setItem(KEY2,JSON.stringify(S))}catch(e){}};
const Chip=({s})=>h`<span class="chip" style=${{'--c':`hsl(${hue(s)} 60% 55%)`}}>${SUBJ[s]}</span>`;
const col=s=>`hsl(${hue(s)} 60% 55%)`;
const Bar=({p,c,label})=>h`<div><div class="nm"><span>${label}</span><span class="mu">${p}%</span></div><div class="bar" style=${{'--c':c}}><i style=${{width:p+'%'}}/></div></div>`;
const cnt=(S,ids)=>ids.filter(i=>stat(S,i)==='Completed').length;
const pct=(a,b)=>b?Math.round(a/b*100):0;
const StSel=({S,i,act})=>h`<select value=${stat(S,i)} onChange=${e=>act(op.set,i,e.target.value)}>${ST.map(x=>h`<option key=${x}>${x}</option>`)}</select>`;
const VRow=({S,i,act,time})=>h`<div class="row" style=${{'--c':col(V[i][0])}}>
 <input type="checkbox" checked=${stat(S,i)==='Completed'} onChange=${e=>act(op.set,i,e.target.checked?'Completed':'Not Started')}/>
 <div class="m"><${Chip} s=${V[i][0]}/><div><b>${V[i][1]} · Video ${V[i][2]}</b></div><div class="mu">${time}</div></div><${StSel} S=${S} i=${i} act=${act}/></div>`;
function Pick({S,onPick,pending}){const[s,setS]=useState(0);const[c,setC]=useState(0);const[v,setV]=useState(0);
 const chs=Object.keys(CH).filter(k=>k.split('|')[0]==s);const ids=CH[chs[Math.min(c,chs.length-1)]];
 useEffect(()=>onPick(ids[Math.min(v,ids.length-1)]),[s,c,v]);
 return h`<div class="g"><select value=${s} onChange=${e=>{setS(+e.target.value);setC(0);setV(0)}}>${SUBJ.map((x,i)=>h`<option value=${i} key=${i}>${x}</option>`)}</select>
 <div class="g g2"><select value=${c} onChange=${e=>{setC(+e.target.value);setV(0)}}>${chs.map((k,i)=>h`<option value=${i} key=${k}>${k.split('|')[1]}</option>`)}</select>
 <select value=${v} onChange=${e=>setV(+e.target.value)}>${ids.map((j,i)=>h`<option value=${i} key=${j}>Video ${V[j][2]} (${stat(S,j)})</option>`)}</select></div></div>`}
function PickRem({S,onPick}){
 const el=i=>stat(S,i)!=='Completed'&&earlierOK(S,i);
 const subs=SUBJ.map((_,k)=>k).filter(k=>Object.keys(CH).some(c=>c.split('|')[0]==k&&CH[c].some(el)));
 const[s0,setS]=useState(-1);const[c,setC]=useState(0);const[v,setV]=useState(0);
 const sub=subs.includes(s0)?s0:subs[0];
 const chs=Object.keys(CH).filter(k=>k.split('|')[0]==sub&&CH[k].some(el));
 const ids=chs.length?CH[chs[Math.min(c,chs.length-1)]].filter(el):[];
 const sel=ids.length?ids[Math.min(v,ids.length-1)]:null;
 useEffect(()=>onPick(sel),[sel]);
 if(!subs.length)return h`<p>🎉 No remaining videos.</p>`;
 return h`<div class="g"><select value=${sub} onChange=${e=>{setS(+e.target.value);setC(0);setV(0)}}>${subs.map(k=>h`<option value=${k} key=${k}>${SUBJ[k]}</option>`)}</select>
 <div class="g g2"><select value=${Math.min(c,chs.length-1)} onChange=${e=>{setC(+e.target.value);setV(0)}}>${chs.map((k,i)=>h`<option value=${i} key=${k}>${k.split('|')[1]}</option>`)}</select>
 <select value=${Math.min(v,ids.length-1)} onChange=${e=>setV(+e.target.value)}>${ids.map((j,i)=>h`<option value=${i} key=${j}>Video ${V[j][2]} (${stat(S,j)})</option>`)}</select></div></div>`}
/* ---------- Add videos tab ---------- */
function AddTab({S,act}){
 const[s,setS]=useState(0);const[ns,setNs]=useState('');const[c,setC]=useState('');const[nc,setNc]=useState('');const[n,setN]=useState(1);const[d,setD]=useState(0);
 const chs=s>=0?Object.keys(CH).filter(k=>k.split('|')[0]==s).map(k=>k.split('|')[1]):[];
 const chv=chs.includes(c)?c:(c==='__new'||!chs.length?'__new':chs[0]);
 const base=chv==='__new'||s<0?0:(CH[s+'|'+chv]||[]).length;const nd=lastDay(S);
 const added=(S.custom||[]).map((_,k)=>BASE_NV+k).reverse().slice(0,25);
 const go=()=>{if(act(op.add,{subj:s,newSubj:ns,ch:chv,newCh:nc,count:n,day:d})){setNc('');setNs('');setN(1)}};
 return h`<div class="card"><h2>➕ Add new videos</h2><div class="g">
  <label class="mu">Subject</label>
  <select value=${s} onChange=${e=>{setS(+e.target.value);setC('')}}>${SUBJ.map((x,i)=>h`<option value=${i} key=${i}>${x}</option>`)}<option value=${-1}>➕ New subject…</option></select>
  ${s<0&&h`<input placeholder="New subject name" value=${ns} onInput=${e=>setNs(e.target.value)}/>`}
  <label class="mu">Chapter</label>
  <select value=${chv} onChange=${e=>setC(e.target.value)}>${chs.map(x=>h`<option value=${x} key=${x}>${x}</option>`)}<option value="__new">➕ New chapter…</option></select>
  ${chv==='__new'&&h`<input placeholder="New chapter name" value=${nc} onInput=${e=>setNc(e.target.value)}/>`}
  <label class="mu">How many videos? (they'll be numbered V${base+1}${n>1?'–V'+(base+(+n||1)):''})</label>
  <input type="number" min="1" max="30" value=${n} onInput=${e=>setN(e.target.value)}/>
  <label class="mu">Schedule</label>
  <select value=${d} onChange=${e=>setD(+e.target.value)}><option value=${0}>At the end of my plan</option>${Array.from({length:nd},(_,k)=>h`<option value=${k+1} key=${k}>Next free slot from Day ${k+1} · ${fd(k)}</option>`)}</select>
  <button class="p" onClick=${go}>Add to planner</button></div></div>
 <div class="card"><h2>Recently added</h2>${added.length?added.map(i=>h`<div class="row" key=${i} style=${{'--c':col(V[i][0])}}><div class="m"><${Chip} s=${V[i][0]}/><div><b>${V[i][1]} · Video ${V[i][2]}</b></div><div class="mu">${stat(S,i)==='Completed'?'Completed':where(S,i)}</div></div></div>`):h`<span class="mu">Nothing added yet.</span>`}</div>`}

/* ---------- Reminders ---------- */
const FKEY='sp.fired.v1';
const SLOT_MIN=[960,1065,1170,1275,1440];
const atTime=(d,hhmm)=>{const[a,b]=String(hhmm).split(':').map(Number);const t=new Date(dDate(d));t.setHours(a||0,b||0,0,0);return t.getTime()};
function buildEvents(S,rt){
 const ev=[];const nd=lastDay(S);
 for(const d of [rt-1,rt]){if(d<0||d>=nd)continue;
  for(let k=0;k<PER;k++){const i=S.sched[d*PER+k];if(i===null||i===undefined||stat(S,i)==='Completed')continue;
   const t=new Date(dDate(d));t.setHours(0,SLOT_MIN[k],0,0);const st=t.getTime();
   const calendarDate=new Date(st).toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short',year:'numeric'});
   ev.push({key:'s|'+d+'|'+k+'|'+i,at:st,until:st+10*6e4,title:'📚 Study reminder · Plan Day '+(d+1),body:nm(i)+' · '+SLOT[k]+' · Calendar date: '+calendarDate})}}
 return ev}
async function showNote(title,body,tag){
 const o={body,tag,icon:'icons/icon-192.png',badge:'icons/icon-192.png'};
 try{const reg=navigator.serviceWorker&&await navigator.serviceWorker.getRegistration();if(reg){await reg.showNotification(title,o);return true}}catch(e){}
 try{new Notification(title,o);return true}catch(e){return false}}
function tickReminders(S){
 if(typeof Notification==='undefined'||Notification.permission!=='granted')return;
 const now=Date.now();let fired=[];try{fired=JSON.parse(localStorage.getItem(FKEY)||'[]')}catch(e){}
 let changed=false;
 for(const e of buildEvents(S,rawToday())){if(now>=e.at&&now<=e.until&&!fired.includes(e.key)){fired.push(e.key);changed=true;showNote(e.title,e.body,e.key)}}
 if(changed){try{localStorage.setItem(FKEY,JSON.stringify(fired.slice(-300)))}catch(e){}}}

function App({user}){
 const[S,setS]=useState(()=>window.__SP_BOOT_STATE&&validate(window.__SP_BOOT_STATE)===''?window.__SP_BOOT_STATE:load());applyCustom(S);const[tab,setTab]=useState('Today');const[dark,setDark]=useState(()=>{try{return localStorage.getItem('sp.theme')}catch(e){return null}});
 const[msg,setMsg]=useState(null);const[celebrate,setCelebrate]=useState(false);const[showGlass,setShowGlass]=useState(false);const[glassIntensity,setGlassIntensity]=useState(()=>{try{return Number(localStorage.getItem('sp.glassIntensity')??70)}catch(e){return 70}});const[soundOn,setSoundOn]=useState(()=>{try{return localStorage.getItem('sp.completionSound')!=='off'}catch(e){return true}});const audioRef=React.useRef(null);const undoAudioRef=React.useRef(null);const nd=lastDay(S);const rt=rawToday();const[day0,setDay]=useState(Math.min(Math.max(rt,0),nd-1));
 const ndRef=React.useRef(nd);ndRef.current=nd;const lastSeen=React.useRef(rawToday());
 useEffect(()=>{const snap=()=>{const t=rawToday();if(t!==lastSeen.current){lastSeen.current=t;setDay(Math.min(Math.max(t,0),ndRef.current-1))}};
  const vis=()=>{if(!document.hidden)snap()};document.addEventListener('visibilitychange',vis);window.addEventListener('focus',snap);window.addEventListener('pageshow',snap);const id=setInterval(snap,30000);
  return()=>{document.removeEventListener('visibilitychange',vis);window.removeEventListener('focus',snap);window.removeEventListener('pageshow',snap);clearInterval(id)}},[]);
 const[q,setQ]=useState('');const[fs,setFs]=useState('');const[fc,setFc]=useState('');const[fst,setFst]=useState('');const[fdt,setFdt]=useState('');
 const[ex,setEx]=useState(0);const[note,setNote]=useState('');const[xs,setXs]=useState(0);const[pl,setPl]=useState('');const[mv,setMv]=useState('');const[md,setMd]=useState(1);
 const[sess,setSess]=useState('');const[sx,setSx]=useState(null);const[smin,setSmin]=useState('');const[imp,setImp]=useState('');const[rst,setRst]=useState(false);
 const live=React.useRef({});live.current={S};
 useEffect(()=>{const ask=()=>{if(typeof Notification!=='undefined'&&Notification.permission==='default'){try{Notification.requestPermission()}catch(e){}}};ask();
  document.addEventListener('pointerdown',ask,{once:true});
  const t=()=>tickReminders(live.current.S);t();const vis=()=>{if(!document.hidden)t()};document.addEventListener('visibilitychange',vis);window.addEventListener('focus',t);const id=setInterval(t,15000);
  return()=>{document.removeEventListener('pointerdown',ask);document.removeEventListener('visibilitychange',vis);window.removeEventListener('focus',t);clearInterval(id)}},[]);
 const syncReady=React.useRef(false);const remoteUpdate=React.useRef(false);
 useEffect(()=>{localSave(S);if(!syncReady.current){syncReady.current=true;return;}if(remoteUpdate.current){remoteUpdate.current=false;return;}window.SPFirebase?.savePlanner(S).catch(()=>{})},[S]);
 useEffect(()=>{let stop=window.SPFirebase?.subscribePlanner((remote)=>{if(remote&&validate(remote.state)===''){remoteUpdate.current=true;setS(remote.state);window.__SP_BOOT_STATE=remote.state}});return()=>{if(stop)stop()}},[]);
 useEffect(()=>{if(dark){document.documentElement.dataset.theme=dark;try{localStorage.setItem('sp.theme',dark)}catch(e){}}},[dark]);
 useEffect(()=>{document.documentElement.style.setProperty('--glass-strength',String(glassIntensity/100));document.documentElement.style.setProperty('--glass-alpha',String(.30+(glassIntensity/100)*.38));document.documentElement.style.setProperty('--glass-saturation',(120+glassIntensity*.7)+'%');document.documentElement.style.setProperty('--glass-blur',(8+glassIntensity*.2)+'px');try{localStorage.setItem('sp.glassIntensity',String(glassIntensity))}catch(e){}},[glassIntensity]);
 useEffect(()=>{try{localStorage.setItem('sp.completionSound',soundOn?'on':'off')}catch(e){}},[soundOn]);
 const tmr=React.useRef(0);const toast=(m,e)=>{setMsg({m,e});clearTimeout(tmr.current);tmr.current=setTimeout(()=>setMsg(null),2600)};
 const act=(f,...a)=>{const before=f===op.set?stat(S,a[0]):null;const r=f(S,...a);if(r.err)toast(r.err,1);else{setS(r.S);toast(r.ok||'Saved');if(f===op.set&&before!==stat(r.S,a[0])){const after=stat(r.S,a[0]);if(after==='Completed'){setCelebrate(true);setTimeout(()=>setCelebrate(false),1450);if(soundOn){try{if(!audioRef.current)audioRef.current=new Audio('completion.mp3');audioRef.current.currentTime=0;const play=audioRef.current.play();if(play?.catch)play.catch(()=>{})}catch(e){}}}else if(before==='Completed'&&after!=='Completed'&&soundOn){try{if(!undoAudioRef.current)undoAudioRef.current=new Audio('uncheck.mp3');undoAudioRef.current.currentTime=0;const play=undoAudioRef.current.play();if(play?.catch)play.catch(()=>{})}catch(e){}}}}return !r.err};
 const all=[...Array(NV).keys()];const done=cnt(S,all);const P=pct(done,NV);
 const rev=all.filter(i=>stat(S,i)==='Revisit').length,mvd=all.filter(i=>stat(S,i)==='Moved').length;
 const pending=all.filter(i=>stat(S,i)!=='Completed'&&pos(S,i)>=0).sort((a,b)=>pos(S,a)-pos(S,b));
 const overdue=all.filter(i=>(stat(S,i)!=='Completed'&&pos(S,i)>=0&&dayOf(pos(S,i))<rt)||stat(S,i)==='Revisit');
 const missedFor=d=>all.filter(i=>stat(S,i)!=='Completed'&&((pos(S,i)>=0&&dayOf(pos(S,i))<d)||stat(S,i)==='Revisit')).sort((a,b)=>pos(S,a)-pos(S,b));
 const tabs=[['Today','🏠'],['Progress','📊'],['Calendar','📅'],['List','✅'],['Add','➕'],['Tools','🔀'],['Catch-up','🌙'],['Data','💾']];
 const day=Math.min(day0,nd-1);const dd=dDate(day);const isToday=day===rt;
 const lst=all.filter(i=>(!fs||V[i][0]==fs)&&(!fc||V[i][1]===fc)&&(!fst||stat(S,i)===fst)&&(!q||(nm(i)+where(S,i)).toLowerCase().includes(q.toLowerCase()))&&(!fdt||(pos(S,i)>=0&&dayOf(pos(S,i))===Math.round((new Date(fdt+'T00:00')-START)/864e5))));
 const exp=JSON.stringify(S);
 return h`<div class="w">
 <div class="top"><div><h1>📚 Study Planner</h1><div class="mu">Starts 7 Nov 2026 · ${nd} days · ${NV} videos</div><div class="mu">${user?.email||''}</div></div>
 <div style=${{display:'flex',gap:6}}><button onClick=${()=>setDark((dark||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))==='dark'?'light':'dark')}>🌓</button><button onClick=${()=>setShowGlass(!showGlass)}>✨ Glass</button><button onClick=${()=>window.SPFirebase?.signOut()}>Logout</button></div></div>
 ${showGlass&&h`<div class="card glass-settings"><div class="top"><h2>✨ Liquid Glass settings</h2><button onClick=${()=>setShowGlass(false)}>Done</button></div><label class="setting-line">Glass intensity <b>${glassIntensity}%</b></label><input class="glass-range" type="range" min="0" max="100" value=${glassIntensity} onInput=${e=>setGlassIntensity(+e.target.value)}/><label class="setting-line"><input type="checkbox" checked=${soundOn} onChange=${e=>setSoundOn(e.target.checked)}/> Play completion and uncheck audio</label><p class="mu">Reduce Transparency on iPhone is respected automatically where the browser exposes that accessibility preference.</p></div>`}
 <div class="card"><div class="bar"><i style=${{width:P+'%'}}/></div><div class="stats">
 <div><b>${NV}</b><span class="mu">Total</span></div><div><b>${done}</b><span class="mu">Done</span></div><div><b>${NV-done}</b><span class="mu">Left</span></div><div><b>${rev}</b><span class="mu">Revisit</span></div><div><b>${mvd}</b><span class="mu">Moved</span></div></div>
 <div class="mu" style=${{textAlign:'center',marginTop:6}}>${P}% complete</div></div>

 ${tab==='Today'&&h`<div class="card"><div class="top" style=${{margin:0}}><button onClick=${()=>setDay(Math.max(0,day-1))}>‹</button>
 <div style=${{textAlign:'center'}}><h2 style=${{margin:0}}>Day ${day+1} ${isToday?'· Today':''}</h2><div class="mu">${dd.toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div></div>
 <button onClick=${()=>setDay(Math.min(nd-1,day+1))}>›</button></div>
 ${rt<0&&h`<p class="mu">Your plan begins on 7 Nov 2026 — previewing Day 1.</p>`}
 <div style=${{marginTop:12}}>${[0,1,2,3,4].map(k=>[k,S.sched[day*PER+k]]).map(([k,i])=>
  i===null||i===undefined?h`<div class="row" key=${k}><div class="m mu">${SLOT[k]} · Free slot</div></div>`:h`<${VRow} key=${k} S=${S} i=${i} act=${act} time=${SLOT[k]+' · Video slot '+(k+1)}/>`)}
 <div class="row" style=${{display:'block'}}><b>🌙 Catch-up · use the 9:15–11:00 PM extra slot if free</b>
 ${(S.cu||[]).filter(c=>c.day===day).map(c=>h`<div class="mu" key=${c.i}>✅ Watched: ${nm(c.i)}</div>`)}
 ${missedFor(day).length?h`<div class="mu" style=${{margin:'6px 0'}}>Missed earlier — watch one now:</div>${missedFor(day).slice(0,5).map(i=>h`<div key=${i} style=${{display:'flex',gap:8,alignItems:'center',justifyContent:'space-between',marginBottom:6}}><span><span class="chip" style=${{'--c':col(V[i][0])}}>${SUBJ[V[i][0]]}</span> ${V[i][1]} · V${V[i][2]}<span class="mu"> · ${stat(S,i)==='Revisit'?'Revisit':where(S,i).split(' · ')[0]}</span></span><button class="p" onClick=${()=>act(op.catchup,i,day)}>Watched</button></div>`)}`:h`<div class="mu" style=${{marginTop:4}}>Free — nothing missed.</div>`}</div></div></div>`}

 ${tab==='Progress'&&h`<div class="card"><h2>Subjects</h2>${SUBJ.map((s,k)=>{const ids=all.filter(i=>V[i][0]===k);return h`<${Bar} key=${k} label=${s+' ('+cnt(S,ids)+'/'+ids.length+')'} p=${pct(cnt(S,ids),ids.length)} c=${col(k)}/>`})}</div>
 <div class="card"><h2>Chapters</h2>${Object.keys(CH).map(k=>{const[s,c]=k.split('|');return h`<${Bar} key=${k} label=${SUBJ[s]+' – '+c+' ('+cnt(S,CH[k])+'/'+CH[k].length+')'} p=${pct(cnt(S,CH[k]),CH[k].length)} c=${col(s)}/>`})}</div>`}

 ${tab==='Calendar'&&h`<div class="card"><h2>Calendar</h2><div class="cal">${['M','T','W','T','F','S','S'].map((x,i)=>h`<div class="mu" key=${i} style=${{textAlign:'center'}}>${x}</div>`)}
 ${Array.from({length:(START.getDay()+6)%7},(_,i)=>h`<div key=${'b'+i}/>`)}
 ${Array.from({length:nd},(_,d)=>{const ids=S.sched.slice(d*PER,d*PER+PER).filter(x=>x!==null);const n=ids.filter(i=>stat(S,i)==='Completed').length;
  return h`<button key=${d} onClick=${()=>{setDay(d);setTab('Today')}} style=${{background:n&&n===ids.length?'color-mix(in srgb,#2fb16b 35%,transparent)':'',outline:d===rt?'2px solid var(--ac)':''}}><b>${dDate(d).getDate()}</b>${dDate(d).toLocaleDateString(undefined,{month:'short'})}<br/>${n}/${ids.length}</button>`})}</div></div>`}

 ${tab==='List'&&h`<div class="card"><div class="g"><input placeholder="🔍 Search" value=${q} onInput=${e=>setQ(e.target.value)}/>
 <div class="g g2"><select value=${fs} onChange=${e=>{setFs(e.target.value);setFc('')}}><option value="">All subjects</option>${SUBJ.map((x,i)=>h`<option value=${i} key=${i}>${x}</option>`)}</select>
 <select value=${fc} onChange=${e=>setFc(e.target.value)}><option value="">All chapters</option>${[...new Set(Object.keys(CH).filter(k=>!fs||k.split('|')[0]==fs).map(k=>k.split('|')[1]))].map(c=>h`<option key=${c}>${c}</option>`)}</select>
 <select value=${fst} onChange=${e=>setFst(e.target.value)}><option value="">All statuses</option>${ST.map(x=>h`<option key=${x}>${x}</option>`)}</select>
 <input type="date" value=${fdt} onChange=${e=>setFdt(e.target.value)}/></div></div><div class="mu" style=${{margin:'8px 0'}}>${lst.length} videos</div>
 ${lst.map(i=>h`<${VRow} key=${i} S=${S} i=${i} act=${act} time=${where(S,i)}/>`)}</div>`}

 ${tab==='Tools'&&h`<div class="card"><h2>➕ Extra video</h2><${Pick} S=${S} onPick=${setEx}/><input style=${{width:'100%',margin:'8px 0'}} placeholder="Note (optional)" value=${note} onInput=${e=>setNote(e.target.value)}/>
 <button class="p" onClick=${()=>act(op.extra,ex,note)&&setNote('')}>Record as completed</button></div>
 <div class="card"><h2>🔁 Replace a planned video with an extra</h2><div class="mu">Planned video (will be displaced)</div>
 <select style=${{width:'100%',margin:'6px 0'}} value=${pl} onChange=${e=>setPl(e.target.value)}><option value="">Choose…</option>${pending.map(i=>h`<option value=${i} key=${i}>${where(S,i).split(' · ')[0]} · ${nm(i)}</option>`)}</select>
 <div class="mu">Extra video watched instead</div><${Pick} S=${S} onPick=${setXs}/><div style=${{marginTop:8}}><button class="p" onClick=${()=>pl===''?toast('Choose the planned video',1):act(op.swap,+pl,xs,note)}>Swap & reschedule displaced</button></div></div>
 <div class="card"><h2>📆 Move a planned video</h2><div class="g g2"><select value=${mv} onChange=${e=>setMv(e.target.value)}><option value="">Video…</option>${pending.map(i=>h`<option value=${i} key=${i}>${nm(i)}</option>`)}</select>
 <select value=${md} onChange=${e=>setMd(+e.target.value)}>${Array.from({length:nd+3},(_,d)=>h`<option value=${d+1} key=${d}>Day ${d+1} · ${fd(d)}</option>`)}</select></div>
 <div style=${{marginTop:8}}><button class="p" onClick=${()=>mv===''?toast('Choose a video',1):act(op.move,+mv,md)}>Move</button></div></div>`}

 ${tab==='Catch-up'&&h`<div class="card"><h2>🌙 Catch-up · evening</h2><p class="mu">Videos you missed on earlier days (or marked Revisit) can be watched in tonight's extra evening slot.</p>${overdue.length?overdue.map(i=>h`<div class="row" key=${i} style=${{'--c':col(V[i][0])}}><div class="m"><${Chip} s=${V[i][0]}/><div><b>${V[i][1]} · Video ${V[i][2]}</b></div><div class="mu">${stat(S,i)==='Revisit'?'Revisit':'Missed · '+where(S,i)}</div></div><button class="p" onClick=${()=>act(op.catchup,i,Math.max(rt,0))}>Watched tonight</button></div>`):h`<p>🎉 The evening slot is free — nothing pending.</p>`}</div>
 <div class="card"><h2>📖 Which extra class did you study today?</h2><div class="mu" style=${{marginBottom:8}}>Pick from your remaining videos</div><${PickRem} S=${S} onPick=${setSx}/>
 <input type="number" style=${{width:'100%',marginTop:8}} placeholder="Minutes (optional)" value=${smin} onInput=${e=>setSmin(e.target.value)}/>
 <div style=${{marginTop:8}}><button class="p" onClick=${()=>sx===null?toast('Nothing to record',1):act(op.extra,sx,smin?'Studied '+smin+' min':'')&&setSmin('')}>Mark as studied</button></div></div>`}

 ${tab==='Add'&&h`<${AddTab} S=${S} act=${act}/>`}
 ${tab==='Data'&&h`<div class="card"><h2>Export / import (JSON)</h2><textarea readOnly value=${exp} onFocus=${e=>e.target.select()}/>
 <div style=${{margin:'8px 0'}}><button onClick=${()=>{try{navigator.clipboard.writeText(exp);toast('Copied')}catch(e){toast('Select the text and copy',1)}}}>Copy JSON</button></div>
 <textarea placeholder="Paste exported JSON here" value=${imp} onInput=${e=>setImp(e.target.value)}/>
 <div style=${{marginTop:8}}><button class="p" onClick=${()=>{try{const j=migrate(JSON.parse(imp)),er=validate(j);if(er)toast(er,1);else{setS(j);window.SPFirebase?.writeSnapshot(j).catch(()=>{});setImp('');toast('Imported')}}catch(e){toast('Invalid JSON',1)}}}>Import</button></div></div>
 <div class="card"><h2>Reset</h2>${rst?h`<p>Erase all progress and restore the original timetable?</p><button class="d" onClick=${()=>{setS(init());window.SPFirebase?.writeSnapshot(init()).catch(()=>{});setRst(false);toast('Reset done')}}>Yes, reset</button> <button onClick=${()=>setRst(false)}>Cancel</button>`:h`<button class="d" onClick=${()=>setRst(true)}>Reset everything</button>`}</div>
 <div class="card"><h2>Change log</h2>${S.log.length?S.log.slice(0,80).map((l,k)=>h`<div key=${k} class="mu" style=${{padding:'4px 0',borderBottom:'1px solid var(--ln)'}}>${new Date(l.t).toLocaleString()} — ${l.m}</div>`):h`<span class="mu">No changes yet.</span>`}</div>`}

 ${celebrate&&h`<div class="completion-pop"><div class="completion-burst">✓</div><b>Video completed!</b><span>Great work — keep going 🎉</span></div>`}
 <nav>${tabs.map(([t,ic])=>h`<button key=${t} class=${tab===t?'on':''} onClick=${()=>setTab(t)}><b>${ic}</b>${t}</button>`)}</nav>
 ${msg&&h`<div class=${'toast'+(msg.e?' e':'')}>${msg.m}</div>`}</div>`}


Object.keys(op).forEach(k=>{op[k]._spName=k});

window.StudyPlannerApp=App;window.StudyPlannerInit=init;window.StudyPlannerLoad=load;
