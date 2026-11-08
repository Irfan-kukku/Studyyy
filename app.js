const {useState,useEffect}=React;const h=htm.bind(React.createElement);
const APP_VERSION='2.4.1';
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

/* ---------- Creative Portrait Logo (Strictly Clipped Shine) ---------- */
function LogoAvatar({size='hero', onClick}){
 const[burst,setBurst]=useState(false);
 const ref=React.useRef(null);
 const trig=e=>{
  if(onClick)onClick(e);
  setBurst(true);
  try{navigator.vibrate&&navigator.vibrate([8,24,12])}catch(_){}
  setTimeout(()=>setBurst(false),650);
 };
 const move=e=>{
  const el=ref.current;if(!el)return;
  const r=el.getBoundingClientRect();
  const clientX=e.touches?e.touches[0].clientX:e.clientX;
  const clientY=e.touches?e.touches[0].clientY:e.clientY;
  const x=(clientX-r.left-r.width/2)/(r.width/2);
  const y=(clientY-r.top-r.height/2)/(r.height/2);
  el.style.transform=`perspective(500px) rotateX(${(-y*16).toFixed(1)}deg) rotateY(${(x*16).toFixed(1)}deg)`;
 };
 const reset=()=>{if(ref.current)ref.current.style.transform=''};
 const handleImgErr=e=>{
  const t=e.target;
  if(!t.dataset.step){t.dataset.step='1';t.src='image.png'}
  else if(t.dataset.step==='1'){t.dataset.step='2';t.src='icons/icon-192.png'}
 };
 return h`<div ref=${ref} class=${'sp-logo-stage sz-'+size+(burst?' burst':'')} onClick=${trig} onMouseMove=${move} onMouseLeave=${reset} onTouchMove=${move} onTouchEnd=${reset} title="Study Planner">
  <div class="sp-logo-halo" aria-hidden="true"/>
  <div class="sp-logo-orbit" aria-hidden="true"/>
  <div class="sp-logo-ripple" aria-hidden="true"/>
  <div class="sp-logo-medallion">
   <img class="sp-logo-img" src="icons/logo.png" onError=${handleImgErr} alt="Study Planner Logo"/>
   <div class="sp-logo-sheen-clip" aria-hidden="true">
    <div class="sp-logo-sheen"/>
   </div>
  </div>
 </div>`;
}
window.SPLogoAvatar=LogoAvatar;

function CountUp({to,dur=900,suffix=''}){const[v,setV]=useState(0);const from=React.useRef(0);
 useEffect(()=>{const a=from.current,b=to;let raf,t0;let reduce=false;try{reduce=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
  if(a===b||reduce){setV(b);from.current=b;return}
  const step=t=>{t0=t0||t;const p=Math.min(1,(t-t0)/dur);const e=1-Math.pow(1-p,3);setV(Math.round(a+(b-a)*e));if(p<1)raf=requestAnimationFrame(step);else from.current=b};
  raf=requestAnimationFrame(step);return()=>{cancelAnimationFrame(raf);from.current=b}},[to]);
 return h`<span>${v}${suffix}</span>`}
const streakOf=S=>{const days=new Set();(S.log||[]).forEach(l=>{if(/→ Completed|Extra video|Catch-up|Swap:|Extra study/.test(l.m))days.add(new Date(l.t).toDateString())});
 let n=0;const d=new Date();if(!days.has(d.toDateString()))d.setDate(d.getDate()-1);while(days.has(d.toDateString())){n++;d.setDate(d.getDate()-1)}return n};
const SLOT_LEN=[90,90,90,105,60];
function nextSlot(S,rt,now){if(rt<0||rt>=lastDay(S))return null;
 for(let k=0;k<PER;k++){const i=S.sched[rt*PER+k];if(i===null||i===undefined||stat(S,i)==='Completed')continue;
  const t=new Date(dDate(rt));t.setHours(0,SLOT_MIN[k],0,0);const st=t.getTime(),en=st+SLOT_LEN[k]*6e4;
  if(now<en)return{k,i,st,en,live:now>=st}}return null}
const fmtIn=ms=>{const m=Math.max(1,Math.round(ms/6e4));return m>=60?Math.floor(m/60)+'h '+(m%60?m%60+'m':''):m+'m'};
const GRADES=[['aurora','Midnight Aurora','#8b7bff','#2dd4bf'],['rose','Rosé Noir','#f2a7b8','#c9a46a'],['emerald','Emerald Reserve','#4fd9a0','#d9c27a'],['sapphire','Sapphire Sky','#4da3ff','#7ee0ff'],['gold','Classic Gold','#d4b575','#8a6a2c']];

function Intro({onDone}){useEffect(()=>{const t=setTimeout(onDone,3500);return()=>clearTimeout(t)},[]);
 return h`<div class="intro" onClick=${onDone} role="presentation"><div class="intro-bg"><i/><i/><i/></div>
  <div class="intro-core"><${LogoAvatar} size="intro"/>
  <h1 class="intro-title">${'Study Planner'.split('').map((c,k)=>h`<span key=${k} style=${{'--d':(700+k*55)+'ms'}}>${c===' '?'\u00a0':c}</span>`)}</h1>
  <p class="intro-tag">Plan · Focus · Progress</p><div class="intro-line"><i/></div></div><div class="intro-skip">Tap to skip</div></div>`}

function Hero({S,rt,nd,done,NV,P,user,dark,onTheme,onStyle,onLogout}){
 const[now,setNow]=useState(Date.now());useEffect(()=>{const id=setInterval(()=>setNow(Date.now()),30000);return()=>clearInterval(id)},[]);
 const hr=new Date(now).getHours();const greet=hr<5?'Late night focus':hr<12?'Good morning':hr<17?'Good afternoon':'Good evening';
 const st=streakOf(S);const nx=nextSlot(S,rt,now);const dayN=Math.min(Math.max(rt,0),nd-1)+1;
 return h`<header class="hero"><div class="hero-bg" aria-hidden="true"><i/><i/><i/></div>
  <div class="hero-top"><div><span class="hero-hello">${greet}</span>${user?.email?h`<div class="hero-mail">${user.email}</div>`:null}</div>
   <div class="hero-btns"><button aria-label="Toggle theme" onClick=${onTheme}><${Icon} name=${dark==='dark'?'sun':'moon'}/></button><button aria-label="Style & Glass" onClick=${onStyle}><${Icon} name="palette"/></button><button aria-label="Logout" onClick=${onLogout}><${Icon} name="logout"/></button></div></div>
  <h1 class="hero-title"><${LogoAvatar} size="hero"/><span>Study <em>Planner</em></span></h1>
  <div class="hero-sub">Day ${dayN} of ${nd} · ${NV} videos</div>
  <div class="hero-grid"><div class="hero-ring" style=${{'--progress':P+'%'}}><b><${CountUp} to=${P} suffix="%"/></b></div>
   <div class="hero-chips"><div class="hchip flame"><${Icon} name="flame" size=${17}/><span><b><${CountUp} to=${st}/></b> day streak</span></div>
    <div class="hchip"><${Icon} name="check" size=${17}/><span><b><${CountUp} to=${done}/></b> / ${NV} done</span></div></div></div>
  <div class=${'hero-next'+(nx&&nx.live?' live':'')}><${Icon} name="clock" size=${18}/>${nx?h`<div class="hn-t"><b>${nx.live?'Live now':'Next · '+SLOT[nx.k]}</b><span>${nm(nx.i)}</span></div><div class="hn-c">${nx.live?'ends in '+fmtIn(nx.en-now):'in '+fmtIn(nx.st-now)}</div>`:h`<div class="hn-t"><b>${rt<0?'Your plan starts 7 Nov':'All set for today'}</b><span>${rt<0?'Preview Day 1 below':'Nothing else scheduled'}</span></div>`}</div></header>`}


function VRow({S,i,act,time,today=false}){const ref=React.useRef(null);const g=React.useRef(null);const done=stat(S,i)==='Completed';
 const mv=(x,anim)=>{const n=ref.current;if(!n)return;n.style.transition=anim?'transform .4s cubic-bezier(.2,.9,.3,1.25)':'none';n.style.transform=x?'translateX('+x+'px)':'';if(n.parentNode)n.parentNode.style.setProperty('--sw',String(Math.min(1,x/96)))};
 const ts=e=>{if(e.target.closest&&e.target.closest('select,input,button'))return;const t=e.touches[0];g.current={x:t.clientX,y:t.clientY,on:false,dead:false,dx:0}};
 const tm=e=>{const s=g.current;if(!s||s.dead)return;const t=e.touches[0],dx=t.clientX-s.x,dy=t.clientY-s.y;
  if(!s.on){if(Math.abs(dy)>10&&Math.abs(dy)>Math.abs(dx)){s.dead=true;return}if(dx>14&&dx>Math.abs(dy)*1.4){s.on=true;try{navigator.vibrate&&navigator.vibrate(5)}catch(_){}}else return}
  s.dx=Math.max(0,dx);mv(Math.min(150,s.dx*.8),false)};
 const te=()=>{const s=g.current;g.current=null;if(!s||!s.on){return}window.__rowSwipeAt=Date.now();
  if(s.dx*.8>=76){mv(0,true);try{navigator.vibrate&&navigator.vibrate([10,30,10])}catch(_){}act(op.set,i,done?'Not Started':'Completed')}else mv(0,true)};
 return h`<div class="swrap" style=${{'--sw':0}}><div class=${'swbg'+(done?' undo':'')} aria-hidden="true"><${Icon} name=${done?'moon':'check'} size=${20}/><span>${done?'Mark not started':'Release to complete'}</span></div>
 <div class=${'row video-row'+(today?' today-video':'')} ref=${ref} onTouchStart=${ts} onTouchMove=${tm} onTouchEnd=${te} onTouchCancel=${()=>{g.current=null;mv(0,true)}} style=${{'--c':col(V[i][0])}}>
 <input type="checkbox" checked=${done} onChange=${e=>act(op.set,i,e.target.checked?'Completed':'Not Started')}/>
 <div class="m"><${Chip} s=${V[i][0]}/><div><b>${V[i][1]} · Video ${V[i][2]}</b></div><div class="mu">${time}</div></div><${StSel} S=${S} i=${i} act=${act}/></div></div>`}
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


function Icon({name,size=19,cls=''}){const paths={home:'M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z',chart:'M4 19V5m0 14h17M8 15l3-4 3 2 6-7',calendar:'M4 5h16v16H4z M8 3v4m8-4v4M4 10h16',list:'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',plus:'M12 5v14M5 12h14',shuffle:'m16 3 4 4-4 4M4 7h3c5 0 5 10 10 10h3m-4-4 4 4-4 4M4 17h3c1.5 0 2.5-1 3.3-2.2',moon:'M20 15.5A8 8 0 0 1 8.5 4 8 8 0 1 0 20 15.5z',database:'M12 3c5 0 9 1.3 9 3s-4 3-9 3-9-1.3-9-3 4-3 9-3z M3 6v12c0 1.7 4 3 9 3s9-1.3 9-3V6 M3 12c0 1.7 4 3 9 3s9-1.3 9-3',book:'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z M4 5.5v16.5',spark:'m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z M19 16l1 2 2 1-2 1-1 2-1-2-2-1 2-1z',sun:'M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4m0-12.8L17 7M7 17l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',logout:'M10 17l5-5-5-5m5 5H3m10-9h7v18h-7',flame:'M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2-4.2.2 1.2.8 2 1.6 2.4C10.4 8 11 5.5 12 3z',palette:'M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.8 0-1.3-1-1.6-1-2.7 0-1 .8-1.5 1.8-1.5H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z M7.5 11h.01M10 7.5h.01M14.5 7.5h.01',clock:'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',check:'M5 12.5l4.5 4.5L19 7',refresh:'M21 12a9 9 0 0 0-15.5-6.3L3 8m0-5v5h5m-5 4a9 9 0 0 0 15.5 6.3L21 16m0 5v-5h-5'};return h`<svg class=${'ui-icon'+(cls?' '+cls:'')} width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d=${paths[name]||paths.spark}/></svg>`}

/* ---------- 120fps Zero-Lag iPhone Instagram Floating Dock ---------- */
function SwipeNav({tabs,tab,go}){
  const navR=React.useRef(null);
  const tr=React.useRef(null);
  const indR=React.useRef(null);
  const goR=React.useRef(go);goR.current=go;
  const tabsR=React.useRef(tabs);tabsR.current=tabs;
  const sup=React.useRef(0);

  const updEdge=()=>{
    const n=tr.current;if(!n)return;
    n.classList.toggle('fade-l',n.scrollLeft>6);
    n.classList.toggle('fade-r',n.scrollLeft+n.clientWidth<n.scrollWidth-6);
  };

  const place=(smooth)=>{
    const n=tr.current,ind=indR.current;if(!n||!ind)return;
    const b=n.querySelector('button.on');if(!b)return;
    const x=b.offsetLeft,w=b.offsetWidth;
    ind.style.width=w+'px';
    ind.style.transform='translate3d('+x+'px,0,0)';
    ind.style.opacity='1';
    const targetScroll=x-(n.clientWidth-w)/2;
    if(smooth){
      n.scrollTo({left:targetScroll,behavior:'smooth'});
    }else{
      n.scrollLeft=targetScroll;
    }
    updEdge();
  };

  useEffect(()=>{place(true)},[tab]);
  useEffect(()=>{
    const r=()=>place(false);
    window.addEventListener('resize',r,{passive:true});
    place(false);
    return()=>window.removeEventListener('resize',r);
  },[]);

  useEffect(()=>{
    const n=tr.current,navEl=navR.current,ind=indR.current;
    if(!n||!navEl||!ind)return;
    let sc=null,raf=0;

    const setScrubUI=(on)=>{
      n.classList.toggle('scrub',on);
      navEl.classList.toggle('is-scrubbing',on);
    };

    const cacheMetrics=()=>{
      const r=n.getBoundingClientRect();
      const bs=[...n.querySelectorAll('button')];
      const metrics=bs.map(b=>({el:b,left:b.offsetLeft,width:b.offsetWidth,mid:b.offsetLeft+b.offsetWidth/2}));
      return {rect:r,metrics};
    };

    const peek=(metrics,k)=>{
      for(let j=0;j<metrics.length;j++){
        metrics[j].el.classList.toggle('peek',j===k);
      }
    };

    const begin=()=>{
      if(!sc)return;
      const c=cacheMetrics();
      sc.rect=c.rect;
      sc.metrics=c.metrics;
      sc.on=true;
      sc.k=null;
      setScrubUI(true);
      try{navigator.vibrate&&navigator.vibrate(10)}catch(_){}
    };

    const start=e=>{
      const t=e.touches[0];
      sc={x:t.clientX,y:t.clientY,cx:t.clientX,on:false,moved:false,k:null,rect:null,metrics:null};
      if(e.target.closest&&e.target.closest('button.on'))begin();
      else sc.hold=setTimeout(()=>{if(sc&&!sc.moved)begin()},210);
    };

    const renderFrame=()=>{
      raf=0;
      if(!sc||!sc.on||!sc.metrics||!sc.metrics.length)return;
      const {rect,metrics,cx}=sc;
      const relX=cx-rect.left+n.scrollLeft;
      let best=0,bd=1e9;
      for(let i=0;i<metrics.length;i++){
        const d=Math.abs(metrics[i].mid-relX);
        if(d<bd){bd=d;best=i}
      }
      const target=metrics[best];
      const minX=metrics[0].left;
      const last=metrics[metrics.length-1];
      const maxX=last.left+last.width-target.width;
      const x=Math.max(minX,Math.min(maxX,relX-target.width/2));
      ind.style.width=target.width+'px';
      ind.style.transform='translate3d('+x+'px,0,0)';
      if(best!==sc.k){
        sc.k=best;
        peek(metrics,best);
        try{navigator.vibrate&&navigator.vibrate(5)}catch(_){}
      }
      if(cx-rect.left<44){n.scrollLeft-=6;updEdge()}
      else if(rect.right-cx<44){n.scrollLeft+=6;updEdge()}
    };

    const move=e=>{
      if(!sc)return;
      const t=e.touches[0];
      sc.cx=t.clientX;
      if(!sc.on){
        if(Math.abs(t.clientX-sc.x)>8||Math.abs(t.clientY-sc.y)>8){
          sc.moved=true;
          clearTimeout(sc.hold);
        }
        return;
      }
      if(e.cancelable)e.preventDefault();
      if(!raf)raf=requestAnimationFrame(renderFrame);
    };

    const end=()=>{
      if(!sc)return;
      clearTimeout(sc.hold);
      if(raf){cancelAnimationFrame(raf);raf=0}
      const was=sc.on,k=sc.k,metrics=sc.metrics;
      sc=null;
      if(was){
        setScrubUI(false);
        sup.current=Date.now();
        if(metrics)peek(metrics,-1);
        const tt=k===null?null:tabsR.current[k];
        if(tt)goR.current(tt[0]);
        requestAnimationFrame(()=>place(true));
      }
    };

    let scrollRaf=0;
    const onScroll=()=>{
      if(!scrollRaf){
        scrollRaf=requestAnimationFrame(()=>{scrollRaf=0;updEdge()});
      }
    };

    n.addEventListener('scroll',onScroll,{passive:true});
    n.addEventListener('touchstart',start,{passive:true});
    n.addEventListener('touchmove',move,{passive:false});
    n.addEventListener('touchend',end,{passive:true});
    n.addEventListener('touchcancel',end,{passive:true});
    return()=>{
      n.removeEventListener('scroll',onScroll);
      n.removeEventListener('touchstart',start);
      n.removeEventListener('touchmove',move);
      n.removeEventListener('touchend',end);
      n.removeEventListener('touchcancel',end);
    };
  },[]);

  return h`<nav class="dock" ref=${navR} aria-label="Main navigation">
    <div class="dock-track fade-r" ref=${tr} onClickCapture=${e=>{if(Date.now()-sup.current<350){e.stopPropagation();e.preventDefault()}}}>
      <span class="dock-ind" ref=${indR} aria-hidden="true" style=${{opacity:0}}/>
      ${tabs.map(([t,ic])=>h`<button key=${t} class=${tab===t?'on':''} aria-current=${tab===t?'page':undefined} onClick=${()=>go(t)}><b><${Icon} name=${ic} size=${21}/></b><span>${t}</span></button>`)}
    </div>
  </nav>`;
}

function App({user}){
 const[S,setS]=useState(()=>window.__SP_BOOT_STATE&&validate(window.__SP_BOOT_STATE)===''?window.__SP_BOOT_STATE:load());applyCustom(S);const[tab,setTab]=useState('Today');const[grade,setGrade]=useState(()=>{try{return localStorage.getItem('sp.grade')||'aurora'}catch(e){return 'aurora'}});const[intro,setIntro]=useState(()=>{try{if(sessionStorage.getItem('sp.intro'))return false;sessionStorage.setItem('sp.intro','1')}catch(e){}try{return !matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return true}});const[dark,setDark]=useState(()=>{try{return localStorage.getItem('sp.theme')}catch(e){return null}});
 const[msg,setMsg]=useState(null);const[celebrate,setCelebrate]=useState(false);
 const[showGlass,setShowGlass]=useState(false);const[closingGlass,setClosingGlass]=useState(false);const[popOrigin,setPopOrigin]=useState({x:'84%',y:'10%'});
 const[glassIntensity,setGlassIntensity]=useState(()=>{try{return Number(localStorage.getItem('sp.glassIntensity')??70)}catch(e){return 70}});const[soundOn,setSoundOn]=useState(()=>{try{return localStorage.getItem('sp.completionSound')!=='off'}catch(e){return true}});
 const[updateReady,setUpdateReady]=useState(false);const[checkingUpdate,setCheckingUpdate]=useState(false);const swRegRef=React.useRef(null);
 const audioRef=React.useRef(null);const undoAudioRef=React.useRef(null);const nd=lastDay(S);const rt=rawToday();const[day0,setDay]=useState(Math.min(Math.max(rt,0),nd-1));
 const ndRef=React.useRef(nd);ndRef.current=nd;const lastSeen=React.useRef(rawToday());

 /* ---------- macOS Window Open / Close Controller ---------- */
 const openGlassModal=(e)=>{
  if(e&&e.currentTarget){
   const r=e.currentTarget.getBoundingClientRect();
   const px=Math.round(((r.left+r.width/2)/window.innerWidth)*100)+'%';
   const py=Math.round(((r.top+r.height/2)/window.innerHeight)*100)+'%';
   setPopOrigin({x:px,y:py});
  }
  setClosingGlass(false);
  setShowGlass(true);
  try{navigator.vibrate&&navigator.vibrate(8)}catch(_){}
 };
 const closeGlassModal=()=>{
  if(closingGlass)return;
  setClosingGlass(true);
  setTimeout(()=>{setShowGlass(false);setClosingGlass(false)},210);
 };

 /* ---------- In-App Update Engine (Auto Content Hash + Version Check) ---------- */
 useEffect(()=>{
  if(!('serviceWorker' in navigator))return;
  let refreshing=false;
  const onControllerChange=()=>{if(refreshing)return;refreshing=true;window.location.reload()};
  navigator.serviceWorker.addEventListener('controllerchange',onControllerChange);
  navigator.serviceWorker.getRegistration().then(reg=>{
   if(!reg)return;
   swRegRef.current=reg;
   if(reg.waiting)setUpdateReady(true);
   reg.addEventListener('updatefound',()=>{
    const nw=reg.installing;if(!nw)return;
    nw.addEventListener('statechange',()=>{
     if(nw.state==='installed'&&navigator.serviceWorker.controller)setUpdateReady(true);
    });
   });
  }).catch(()=>{});
  const poll=setInterval(()=>{swRegRef.current?.update().catch(()=>{})},120000);
  return()=>{navigator.serviceWorker.removeEventListener('controllerchange',onControllerChange);clearInterval(poll)};
 },[]);

 const applyAppUpdate=async()=>{
  toast('Installing update…');
  try{
   const reg=swRegRef.current||(await navigator.serviceWorker?.getRegistration());
   if(reg&&reg.waiting){
    reg.waiting.postMessage({type:'SKIP_WAITING'});
    setTimeout(()=>window.location.reload(),600);
    return;
   }
   if('caches' in window){
    const keys=await caches.keys();
    await Promise.all(keys.map(k=>caches.delete(k)));
   }
  }catch(e){}
  window.location.reload();
 };

 const checkForAppUpdate=async()=>{
  if(checkingUpdate)return;
  setCheckingUpdate(true);
  try{
   let foundNew=false;
   if('serviceWorker' in navigator){
    const reg=await navigator.serviceWorker.getRegistration();
    if(reg){
     swRegRef.current=reg;
     await reg.update();
     if(reg.waiting||reg.installing)foundNew=true;
    }
   }
   const [resApp, resCss]=await Promise.all([
    fetch('app.js?_t='+Date.now(),{cache:'no-store'}),
    fetch('style.css?_t='+Date.now(),{cache:'no-store'})
   ]);
   if(resApp.ok&&resCss.ok){
    const txt=(await resApp.text())+(await resCss.text());
    const hash=String(txt.length)+':'+Array.from(txt).reduce((s,c)=>((s<<5)-s+c.charCodeAt(0))|0,0);
    const savedHash=localStorage.getItem('sp.buildHash');
    if(!savedHash){
     localStorage.setItem('sp.buildHash',hash);
    }else if(savedHash!==hash){
     localStorage.setItem('sp.buildHash',hash);
     foundNew=true;
    }
   }
   if(foundNew){
    setUpdateReady(true);
    toast('New update ready to install!');
   }else{
    toast('You are on the latest version (v'+APP_VERSION+')');
   }
  }catch(e){
   toast('Could not check for updates — check connection',1);
  }finally{
   setCheckingUpdate(false);
  }
 };

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
 useEffect(()=>{const mq=matchMedia('(prefers-color-scheme: dark)');const apply=()=>{document.documentElement.dataset.theme=dark||(mq.matches?'dark':'light')};apply();try{dark?localStorage.setItem('sp.theme',dark):localStorage.removeItem('sp.theme')}catch(e){}if(mq.addEventListener)mq.addEventListener('change',apply);return()=>{if(mq.removeEventListener)mq.removeEventListener('change',apply)}},[dark]);
 useEffect(()=>{if(grade==='gold')delete document.documentElement.dataset.grade;else document.documentElement.dataset.grade=grade;try{localStorage.setItem('sp.grade',grade)}catch(e){}},[grade]);
 useEffect(()=>{document.documentElement.style.setProperty('--glass-strength',String(glassIntensity/100));document.documentElement.style.setProperty('--glass-alpha',String(.18+(glassIntensity/100)*.48));document.documentElement.style.setProperty('--glass-saturation',(125+glassIntensity*.8)+'%');document.documentElement.style.setProperty('--glass-blur',(8+glassIntensity*.24)+'px');try{localStorage.setItem('sp.glassIntensity',String(glassIntensity))}catch(e){}},[glassIntensity]);
 useEffect(()=>{try{localStorage.setItem('sp.completionSound',soundOn?'on':'off')}catch(e){}},[soundOn]);
 const tmr=React.useRef(0);const toast=(m,e)=>{setMsg({m,e});clearTimeout(tmr.current);tmr.current=setTimeout(()=>setMsg(null),2600)};
 const act=(f,...a)=>{const before=f===op.set?stat(S,a[0]):null;const r=f(S,...a);if(r.err)toast(r.err,1);else{setS(r.S);toast(r.ok||'Saved');if(f===op.set&&before!==stat(r.S,a[0])){const after=stat(r.S,a[0]);if(after==='Completed'){setCelebrate(true);setTimeout(()=>setCelebrate(false),1450);if(soundOn){try{if(!audioRef.current)audioRef.current=new Audio('completion.mp3');audioRef.current.currentTime=0;const play=audioRef.current.play();if(play?.catch)play.catch(()=>{})}catch(e){}}}else if(before==='Completed'&&after!=='Completed'&&soundOn){try{if(!undoAudioRef.current)undoAudioRef.current=new Audio('uncheck.mp3');undoAudioRef.current.currentTime=0;const play=undoAudioRef.current.play();if(play?.catch)play.catch(()=>{})}catch(e){}}}}return !r.err};
 const all=[...Array(NV).keys()];const done=cnt(S,all);const P=pct(done,NV);
 const rev=all.filter(i=>stat(S,i)==='Revisit').length,mvd=all.filter(i=>stat(S,i)==='Moved').length;
 const pending=all.filter(i=>stat(S,i)!=='Completed'&&pos(S,i)>=0).sort((a,b)=>pos(S,a)-pos(S,b));
 const overdue=all.filter(i=>(stat(S,i)!=='Completed'&&pos(S,i)>=0&&dayOf(pos(S,i))<rt)||stat(S,i)==='Revisit');
 const missedFor=d=>all.filter(i=>stat(S,i)!=='Completed'&&((pos(S,i)>=0&&dayOf(pos(S,i))<d)||stat(S,i)==='Revisit')).sort((a,b)=>pos(S,a)-pos(S,b));
 const tabs=[['Today','home'],['Progress','chart'],['Calendar','calendar'],['List','list'],['Add','plus'],['Tools','shuffle'],['Catch-up','moon'],['Data','database']];
 const[dir,setDir]=useState('');const tabIdx=tabs.findIndex(x=>x[0]===tab);
 const goTab=t=>{if(t===tab)return;const a=tabs.findIndex(x=>x[0]===t);setDir(a>tabIdx?'from-right':'from-left');try{navigator.vibrate&&navigator.vibrate(8)}catch(e){}setTab(t);window.scrollTo({top:0,behavior:'smooth'})};
 const tp=React.useRef(null);
 const swipe={start:e=>{const t=e.touches[0];tp.current=e.target.closest&&e.target.closest('input,textarea,select,.cal,[data-noswipe]')?null:{x:t.clientX,y:t.clientY,t:Date.now()}},
  end:e=>{const p=tp.current;tp.current=null;if(!p)return;const t=e.changedTouches[0],dx=t.clientX-p.x,dy=t.clientY-p.y;
   if(Date.now()-(window.__rowSwipeAt||0)<120)return;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.8&&Date.now()-p.t<700){const n=tabIdx+(dx<0?1:-1);if(n>=0&&n<tabs.length)goTab(tabs[n][0])}},
  cancel:()=>{tp.current=null}};
 const day=Math.min(day0,nd-1);const dd=dDate(day);const isToday=day===rt;
 const lst=all.filter(i=>(!fs||V[i][0]==fs)&&(!fc||V[i][1]===fc)&&(!fst||stat(S,i)===fst)&&(!q||(nm(i)+where(S,i)).toLowerCase().includes(q.toLowerCase()))&&(!fdt||(pos(S,i)>=0&&dayOf(pos(S,i))===Math.round((new Date(fdt+'T00:00')-START)/864e5))));
 const exp=JSON.stringify(S);
 return h`<div class="w">
 ${updateReady&&h`<div class="update-banner"><div class="update-banner-info"><span class="update-pulse"/><div><b>New version available</b><div class="mu">Tap to update immediately without losing progress</div></div></div><button class="p" onClick=${applyAppUpdate}>Update now</button></div>`}
 <${Hero} S=${S} rt=${rt} nd=${nd} done=${done} NV=${NV} P=${P} user=${user} dark=${dark} onTheme=${()=>setDark((dark||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))==='dark'?'light':'dark')} onStyle=${openGlassModal} onLogout=${()=>window.SPFirebase?.signOut()}/>
 
 ${showGlass&&h`<div class=${'macos-modal-backdrop'+(closingGlass?' is-closing':'')} onClick=${e=>{if(e.target===e.currentTarget)closeGlassModal()}}>
  <div class="macos-window" role="dialog" aria-modal="true" aria-label="Style and Glass Settings" style=${{'--pop-x':popOrigin.x,'--pop-y':popOrigin.y}}>
   <div class="macos-titlebar">
    <div class="macos-traffic">
     <button type="button" class="macos-dot close" aria-label="Close" onClick=${closeGlassModal}>×</button>
     <button type="button" class="macos-dot min" aria-label="Minimize" onClick=${closeGlassModal}>−</button>
     <button type="button" class="macos-dot max" aria-label="Expand" onClick=${closeGlassModal}>+</button>
    </div>
    <div class="macos-title"><${Icon} name="palette" size=${15}/> <span>Style & Glass</span></div>
    <button type="button" class="macos-done-btn" onClick=${closeGlassModal}>Done</button>
   </div>
   <div class="macos-body">
    <label class="setting-line">Colour grade</label>
    <div class="grades">${GRADES.map(([id,name,c1,c2])=>h`<button key=${id} class=${'grade-sw'+(grade===id?' on':'')} onClick=${()=>setGrade(id)} style=${{'--g1':c1,'--g2':c2}}><i/><span>${name}</span></button>`)}</div>
    <label class="setting-line">Appearance</label>
    <select style=${{width:"100%"}} value=${dark||"system"} onChange=${e=>setDark(e.target.value==="system"?null:e.target.value)}><option value="system">System · Adaptive</option><option value="dark">Dark</option><option value="light">Light</option></select>
    <label class="setting-line">Glass intensity <b>${glassIntensity}%</b></label>
    <input class="glass-range" type="range" min="0" max="100" value=${glassIntensity} onInput=${e=>setGlassIntensity(+e.target.value)}/>
    <label class="setting-line"><input type="checkbox" checked=${soundOn} onChange=${e=>setSoundOn(e.target.checked)}/> Play completion and uncheck audio</label>
    <div class="update-row"><div><b>App Update</b><div class="mu">Version v${APP_VERSION}</div></div><button class="p" onClick=${updateReady?applyAppUpdate:checkForAppUpdate} disabled=${checkingUpdate}><${Icon} name="refresh" size=${16} cls=${checkingUpdate?'spin-icon':''}/> ${updateReady?'Install Update':checkingUpdate?'Checking…':'Check for Update'}</button></div>
    <p class="mu" style=${{marginTop:12,marginBottom:0}}>Reduce Transparency on iPhone is respected automatically where the browser exposes that accessibility preference.</p>
   </div>
  </div>
 </div>`}

 <div class="card"><div class="bar"><i style=${{width:P+'%'}}/></div><div class="stats">
 <div><b><${CountUp} to=${NV}/></b><span class="mu">Total</span></div><div><b><${CountUp} to=${done}/></b><span class="mu">Done</span></div><div><b><${CountUp} to=${NV-done}/></b><span class="mu">Left</span></div><div><b><${CountUp} to=${rev}/></b><span class="mu">Revisit</span></div><div><b><${CountUp} to=${mvd}/></b><span class="mu">Moved</span></div></div>
 <div class="mu" style=${{textAlign:'center',marginTop:6}}>${P}% complete</div></div>

 <div class=${'page-view '+(dir||'')} key=${tab} onTouchStart=${swipe.start} onTouchEnd=${swipe.end} onTouchCancel=${swipe.cancel}>
 ${tab==='Today'&&h`<div class="card"><div class="top" style=${{margin:0}}><button onClick=${()=>setDay(Math.max(0,day-1))}>‹</button>
 <div style=${{textAlign:'center'}}><h2 style=${{margin:0}}>Day ${day+1} ${isToday?'· Today':''}</h2><div class="mu">${dd.toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div></div>
 <button onClick=${()=>setDay(Math.min(nd-1,day+1))}>›</button></div>
 ${rt<0&&h`<p class="mu">Your plan begins on 7 Nov 2026 — previewing Day 1.</p>`}
 <div style=${{marginTop:12}}>${[0,1,2,3,4].map(k=>[k,S.sched[day*PER+k]]).map(([k,i])=>
  i===null||i===undefined?h`<div class="row" key=${k}><div class="m mu">${SLOT[k]} · Free slot</div></div>`:h`<${VRow} key=${k} S=${S} i=${i} act=${act} today=${isToday} time=${SLOT[k]+' · Video slot '+(k+1)}/>`)}
 <div class="row" style=${{display:'block'}}><b>Catch-up · use the 9:15–11:00 PM extra slot if free</b>
 ${(S.cu||[]).filter(c=>c.day===day).map(c=>h`<div class="mu" key=${c.i}>✅ Watched: ${nm(c.i)}</div>`)}
 ${missedFor(day).length?h`<div class="mu" style=${{margin:'6px 0'}}>Missed earlier — watch one now:</div>${missedFor(day).slice(0,5).map(i=>h`<div key=${i} style=${{display:'flex',gap:8,alignItems:'center',justifyContent:'space-between',marginBottom:6}}><span><span class="chip" style=${{'--c':col(V[i][0])}}>${SUBJ[V[i][0]]}</span> ${V[i][1]} · V${V[i][2]}<span class="mu"> · ${stat(S,i)==='Revisit'?'Revisit':where(S,i).split(' · ')[0]}</span></span><button class="p" onClick=${()=>act(op.catchup,i,day)}>Watched</button></div>`)}`:h`<div class="mu" style=${{marginTop:4}}>Free — nothing missed.</div>`}</div></div></div>`}

 ${tab==='Progress'&&h`<div class="card"><h2>Subjects</h2>${SUBJ.map((s,k)=>{const ids=all.filter(i=>V[i][0]===k);return h`<${Bar} key=${k} label=${s+' ('+cnt(S,ids)+'/'+ids.length+')'} p=${pct(cnt(S,ids),ids.length)} c=${col(k)}/>`})}</div>
 <div class="card"><h2>Chapters</h2>${Object.keys(CH).map(k=>{const[s,c]=k.split('|');return h`<${Bar} key=${k} label=${SUBJ[s]+' – '+c+' ('+cnt(S,CH[k])+'/'+CH[k].length+')'} p=${pct(cnt(S,CH[k]),CH[k].length)} c=${col(s)}/>`})}</div>`}

 ${tab==='Calendar'&&h`<div class="card"><h2>Calendar</h2><div class="cal">${['M','T','W','T','F','S','S'].map((x,i)=>h`<div class="mu" key=${i} style=${{textAlign:'center'}}>${x}</div>`)}
 ${Array.from({length:(START.getDay()+6)%7},(_,i)=>h`<div key=${'b'+i}/>`)}
 ${Array.from({length:nd},(_,d)=>{const ids=S.sched.slice(d*PER,d*PER+PER).filter(x=>x!==null);const n=ids.filter(i=>stat(S,i)==='Completed').length;
  return h`<button key=${d} onClick=${()=>{setDay(d);goTab('Today')}} style=${{background:n&&n===ids.length?'color-mix(in srgb,#2fb16b 35%,transparent)':'',outline:d===rt?'2px solid var(--ac)':''}}><b>${dDate(d).getDate()}</b>${dDate(d).toLocaleDateString(undefined,{month:'short'})}<br/>${n}/${ids.length}</button>`})}</div></div>`}

 ${tab==='List'&&h`<div class="card"><div class="g"><input placeholder="Search videos" value=${q} onInput=${e=>setQ(e.target.value)}/>
 <div class="g g2"><select value=${fs} onChange=${e=>{setFs(e.target.value);setFc('')}}><option value="">All subjects</option>${SUBJ.map((x,i)=>h`<option value=${i} key=${i}>${x}</option>`)}</select>
 <select value=${fc} onChange=${e=>setFc(e.target.value)}><option value="">All chapters</option>${[...new Set(Object.keys(CH).filter(k=>!fs||k.split('|')[0]==fs).map(k=>k.split('|')[1]))].map(c=>h`<option key=${c}>${c}</option>`)}</select>
 <select value=${fst} onChange=${e=>setFst(e.target.value)}><option value="">All statuses</option>${ST.map(x=>h`<option key=${x}>${x}</option>`)}</select>
 <input type="date" value=${fdt} onChange=${e=>setFdt(e.target.value)}/></div></div><div class="mu" style=${{margin:'8px 0'}}>${lst.length} videos</div>
 ${lst.map(i=>h`<${VRow} key=${i} S=${S} i=${i} act=${act} time=${where(S,i)}/>`)}</div>`}

 ${tab==='Tools'&&h`<div class="card"><h2>Extra video</h2><${Pick} S=${S} onPick=${setEx}/><input style=${{width:'100%',margin:'8px 0'}} placeholder="Note (optional)" value=${note} onInput=${e=>setNote(e.target.value)}/>
 <button class="p" onClick=${()=>act(op.extra,ex,note)&&setNote('')}>Record as completed</button></div>
 <div class="card"><h2>Replace a planned video with an extra</h2><div class="mu">Planned video (will be displaced)</div>
 <select style=${{width:'100%',margin:'6px 0'}} value=${pl} onChange=${e=>setPl(e.target.value)}><option value="">Choose…</option>${pending.map(i=>h`<option value=${i} key=${i}>${where(S,i).split(' · ')[0]} · ${nm(i)}</option>`)}</select>
 <div class="mu">Extra video watched instead</div><${Pick} S=${S} onPick=${setXs}/><div style=${{marginTop:8}}><button class="p" onClick=${()=>pl===''?toast('Choose the planned video',1):act(op.swap,+pl,xs,note)}>Swap & reschedule displaced</button></div></div>
 <div class="card"><h2>Move a planned video</h2><div class="g g2"><select value=${mv} onChange=${e=>setMv(e.target.value)}><option value="">Video…</option>${pending.map(i=>h`<option value=${i} key=${i}>${nm(i)}</option>`)}</select>
 <select value=${md} onChange=${e=>setMd(+e.target.value)}>${Array.from({length:nd+3},(_,d)=>h`<option value=${d+1} key=${d}>Day ${d+1} · ${fd(d)}</option>`)}</select></div>
 <div style=${{marginTop:8}}><button class="p" onClick=${()=>mv===''?toast('Choose a video',1):act(op.move,+mv,md)}>Move</button></div></div>`}

 ${tab==='Catch-up'&&h`<div class="card"><h2>Catch-up · evening</h2><p class="mu">Videos you missed on earlier days (or marked Revisit) can be watched in tonight's extra evening slot.</p>${overdue.length?overdue.map(i=>h`<div class="row" key=${i} style=${{'--c':col(V[i][0])}}><div class="m"><${Chip} s=${V[i][0]}/><div><b>${V[i][1]} · Video ${V[i][2]}</b></div><div class="mu">${stat(S,i)==='Revisit'?'Revisit':'Missed · '+where(S,i)}</div></div><button class="p" onClick=${()=>act(op.catchup,i,Math.max(rt,0))}>Watched tonight</button></div>`):h`<p>🎉 The evening slot is free — nothing pending.</p>`}</div>
 <div class="card"><h2>Which extra class did you study today?</h2><div class="mu" style=${{marginBottom:8}}>Pick from your remaining videos</div><${PickRem} S=${S} onPick=${setSx}/>
 <input type="number" style=${{width:'100%',marginTop:8}} placeholder="Minutes (optional)" value=${smin} onInput=${e=>setSmin(e.target.value)}/>
 <div style=${{marginTop:8}}><button class="p" onClick=${()=>sx===null?toast('Nothing to record',1):act(op.extra,sx,smin?'Studied '+smin+' min':'')&&setSmin('')}>Mark as studied</button></div></div>`}

 ${tab==='Add'&&h`<${AddTab} S=${S} act=${act}/>`}
 ${tab==='Data'&&h`<div class="card"><h2>App Update</h2><p class="mu">Check for new features or force-refresh cached files while keeping all your study progress safe.</p><div class="update-row"><div><b>Study Planner v${APP_VERSION}</b><div class="mu">${updateReady?'A new update is ready to install':'Installed & synced'}</div></div><div style=${{display:'flex',gap:8}}><button class="p" onClick=${updateReady?applyAppUpdate:checkForAppUpdate} disabled=${checkingUpdate}><${Icon} name="refresh" size=${16} cls=${checkingUpdate?'spin-icon':''}/> ${updateReady?'Update Now':checkingUpdate?'Checking…':'Check for Update'}</button><button onClick=${applyAppUpdate}>Force Reload</button></div></div></div>
 <div class="card"><h2>Export / import (JSON)</h2><textarea readOnly value=${exp} onFocus=${e=>e.target.select()}/>
 <div style=${{margin:'8px 0'}}><button onClick=${()=>{try{navigator.clipboard.writeText(exp);toast('Copied')}catch(e){toast('Select the text and copy',1)}}}>Copy JSON</button></div>
 <textarea placeholder="Paste exported JSON here" value=${imp} onInput=${e=>setImp(e.target.value)}/>
 <div style=${{marginTop:8}}><button class="p" onClick=${()=>{try{const j=migrate(JSON.parse(imp)),er=validate(j);if(er)toast(er,1);else{setS(j);window.SPFirebase?.writeSnapshot(j).catch(()=>{});setImp('');toast('Imported')}}catch(e){toast('Invalid JSON',1)}}}>Import</button></div></div>
 <div class="card"><h2>Reset</h2>${rst?h`<p>Erase all progress and restore the original timetable?</p><button class="d" onClick=${()=>{setS(init());window.SPFirebase?.writeSnapshot(init()).catch(()=>{});setRst(false);toast('Reset done')}}>Yes, reset</button> <button onClick=${()=>setRst(false)}>Cancel</button>`:h`<button class="d" onClick=${()=>setRst(true)}>Reset everything</button>`}</div>
 <div class="card"><h2>Change log</h2>${S.log.length?S.log.slice(0,80).map((l,k)=>h`<div key=${k} class="mu" style=${{padding:'4px 0',borderBottom:'1px solid var(--ln)'}}>${new Date(l.t).toLocaleString()} — ${l.m}</div>`):h`<span class="mu">No changes yet.</span>`}</div>`}
 </div>

 ${celebrate&&h`<div class="completion-pop"><div class="completion-burst">✓</div><b>Video completed</b><span>Excellent progress. Keep going.</span></div>`}
 <${SwipeNav} tabs=${tabs} tab=${tab} go=${goTab}/>
 ${msg&&h`<div class=${'toast'+(msg.e?' e':'')}>${msg.m}</div>`}
 ${intro&&h`<${Intro} onDone=${()=>setIntro(false)}/>`}</div>`}


Object.keys(op).forEach(k=>{op[k]._spName=k});

window.StudyPlannerApp=App;window.StudyPlannerInit=init;window.StudyPlannerLoad=load;
