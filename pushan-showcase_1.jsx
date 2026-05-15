import { useState, useEffect, useRef } from "react";

const C = {
  bg:"#06040f",ember:"#f97316",violet:"#a855f7",cyan:"#06b6d4",green:"#22c55e",
  surface:"rgba(255,255,255,0.03)",border:"rgba(255,255,255,0.07)",borderHi:"rgba(255,255,255,0.16)",
  text:"#f4f0ff",muted:"rgba(244,240,255,0.5)",muted2:"rgba(244,240,255,0.25)",
};
const RUNES=["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ","ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛜ","ᛞ","ᛟ"];
const PROJECTS=[
  {id:"silverwall",num:"01",tag:"LIVE DATA · UI SYSTEMS",title:"SilverWall",year:"2024",status:"LIVE",sc:"#22c55e",desc:"Engineering-grade F1 telemetry dashboard. Real-time car tracking on circuit maps, live leaderboards, sector timing — wrapped in a design system built from zero.",detail:"Token-based design system + component library. React 18 + FastAPI + WebSocket streaming from OpenF1. Discord bot for race alerts.",tech:["Figma","React 18","TypeScript","Tailwind","FastAPI","Supabase","WebSockets"],role:"Design Lead · Frontend Architect",live:"https://silverwall.vercel.app",repo:"https://github.com/Ashborn-047/silverwall",accent:"#06b6d4"},
  {id:"terminal",num:"02",tag:"EXPERIENCE DESIGN · CLI UX",title:"Terminal OS",year:"2024",status:"LIVE",sc:"#22c55e",desc:"A portfolio reimagined as a personal OS — navigated entirely through a terminal. Identity rendering, memory archives, encrypted comms, project dossiers.",detail:"Custom CLI parser with typed command dispatch. Cinematic reveal sequences. The interaction model is the message.",tech:["React","TypeScript","Framer Motion","CLI UX","Vercel"],role:"Concept · UX Architect · Dev",live:"https://ashborn-terminal-os.vercel.app",repo:"https://github.com/Ashborn-047/Ashborn-terminal-OS",accent:"#a855f7"},
  {id:"evolution",num:"03",tag:"WebGL · GSAP · DIGITAL MUSEUM",title:"Evolution Atlas",year:"2025",status:"LIVE",sc:"#22c55e",desc:"A digital museum of interface design. 7 curated exhibits: kinetic typography, liquid shaders, GLSL cinematic dashboards, colour theory, UI history 1995–2025.",detail:"30+ GLSL fragment shaders. Letterforms as particle systems. Three.js + GSAP. A living research archive.",tech:["React","Three.js","WebGL/GLSL","GSAP","R3F","Zustand"],role:"Creative Director · Shader Engineer",live:"https://ashborn-047.github.io/evolution-atlas/",repo:"https://github.com/Ashborn-047/evolution-atlas",accent:"#f97316"},
  {id:"webtoon",num:"04",tag:"UX STRATEGY · PLATFORM REDESIGN",title:"Webtoon Redesign",year:"2024",status:"CASE STUDY",sc:"#06b6d4",desc:"Full UX deconstruction and redesign — modular homepage, micro-personalization engine, creator visibility system, improved discovery flow.",detail:"Competitive analysis, user flow mapping, IA rebuild, then shipped a working implementation. Treated as a real product problem.",tech:["UX Research","Figma","React","TypeScript"],role:"UX Researcher · Product Designer",repo:"https://github.com/Ashborn-047/Webtoon-Ecosystem-Platform-Redesign-",accent:"#ec4899"},
  {id:"rune",num:"05",tag:"CANVAS · GSAP · IMMERSIVE UI",title:"Rune Realm",year:"2025",status:"LIVE",sc:"#22c55e",desc:"Immersive Elder Futhark web experience. Matrix rune rain, nebula particle canvas, scratch-to-reveal daily draw ritual, 4 atmospheric themes.",detail:"Canvas nebula + rune particle rain. GSAP-orchestrated loading sequence. Token-first theme system.",tech:["React","TypeScript","GSAP","Canvas API","Lucide"],role:"Interaction Designer · Creative Dev",live:"https://ashborn-047.github.io/rune-realm/",repo:"https://github.com/Ashborn-047/rune-realm",accent:"#eab308"},
  {id:"svgforge",num:"06",tag:"SVG · ANIMATION LAB",title:"SVG Forge",year:"2025",status:"LIVE",sc:"#22c55e",desc:"Zero-dependency SVG animation laboratory. Stroke draw-ons, shape morphing, glitch scramble, turbulence distortion, glow pulse — all live and editable.",detail:"feTurbulence + feDisplacementMap distortion. SMIL declarative animation. Real-time controls, code editor, ⌘K palette.",tech:["HTML5","CSS3","Vanilla JS","SVG SMIL","SVG Filters"],role:"Animation Engineer · UI Designer",live:"https://ashborn-047.github.io/svg-forge/",repo:"https://github.com/Ashborn-047/svg-forge",accent:"#a855f7"},
  {id:"lifesync",num:"07",tag:"PRODUCT DESIGN · AI · DESIGN SYSTEM",title:"LifeSync",year:"2024",status:"IN PROGRESS",sc:"#eab308",desc:"AI-powered personal OS with behavioral analytics, adaptive personas, cross-platform automation, and a full 48+ component design system.",detail:"Token-first design system. Radix UI primitives. Every component documented. The system before the product.",tech:["Figma","Design System","React","TypeScript","Radix UI"],role:"Product Designer · Systems Architect",repo:"https://github.com/Ashborn-047/Lifesync",accent:"#a855f7"},
];

function useReveal(t=0.08){
  const ref=useRef(null);const[v,setV]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect();}},{threshold:t});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return[ref,v];
}
function useW(){
  const[w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{const f=()=>setW(window.innerWidth);window.addEventListener("resize",f);return()=>window.removeEventListener("resize",f);},[]);
  return w;
}

function ParticleCanvas(){
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");
    let W=canvas.width=window.innerWidth,H=canvas.height=window.innerHeight,raf;
    const pts=Array.from({length:45},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.13,vy:(Math.random()-.5)*.13,r:Math.random()*1.1+.4,rune:RUNES[Math.floor(Math.random()*RUNES.length)],isRune:Math.random()>.72,op:Math.random()*.28+.05,pulse:Math.random()*Math.PI*2}));
    const resize=()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;};
    window.addEventListener("resize",resize);
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      [[W*.2,H*.3,W*.38,"rgba(168,85,247,0.042)"],[W*.82,H*.65,W*.3,"rgba(249,115,22,0.026)"],[W*.5,H*.05,W*.26,"rgba(6,182,212,0.02)"]].forEach(([x,y,r,c])=>{const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,c);g.addColorStop(1,"transparent");ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();});
      pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.pulse+=.011;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;const op=p.op*(.6+.4*Math.sin(p.pulse));if(p.isRune){ctx.font=`${p.r*9+6}px serif`;ctx.fillStyle=`rgba(168,85,247,${op*.6})`;ctx.fillText(p.rune,p.x,p.y);}else{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(168,85,247,${op})`;ctx.fill();}});
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<110){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(168,85,247,${(1-d/110)*.038})`;ctx.lineWidth=.5;ctx.stroke();}}
      raf=requestAnimationFrame(draw);
    };raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
}

function LogoStroke(){
  const[on,setOn]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setOn(true),300);return()=>clearTimeout(t);},[]);
  return(
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M3 23L13 3L23 23" stroke="#a855f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{strokeDasharray:82,strokeDashoffset:on?0:82,transition:"stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1)"}}/>
      <path d="M7 16L19 16" stroke="#f97316" strokeWidth="2" strokeLinecap="round" style={{strokeDasharray:38,strokeDashoffset:on?0:38,transition:"stroke-dashoffset .8s .45s cubic-bezier(.4,0,.2,1)"}}/>
    </svg>
  );
}

function KineticWord({word,baseDelay=0,gradient}){
  const[ref,v]=useReveal(.1);
  return(
    <span ref={ref} style={{display:"block",background:gradient,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}} aria-label={word}>
      {word.split("").map((ch,i)=>(
        <span key={i} style={{display:"inline-block",opacity:v?1:0,transform:v?"translateY(0) rotateX(0)":"translateY(36px) rotateX(-55deg)",transition:`opacity .58s ${baseDelay+i*.045}s cubic-bezier(.4,0,.2,1),transform .58s ${baseDelay+i*.045}s cubic-bezier(.4,0,.2,1)`,transformOrigin:"bottom center"}}>
          {ch===" "?"\u00a0":ch}
        </span>
      ))}
    </span>
  );
}

function GlitchText({text,active}){
  const[d,setD]=useState(text);
  useEffect(()=>{
    if(!active){setD(text);return;}
    let f=0,raf;
    const sc=()=>{setD(text.split("").map((ch,i)=>f>i*2?ch:RUNES[Math.floor(Math.random()*RUNES.length)]).join(""));f++;if(f<text.length*3)raf=requestAnimationFrame(sc);else setD(text);};
    raf=requestAnimationFrame(sc);return()=>cancelAnimationFrame(raf);
  },[active,text]);
  return <>{d}</>;
}

function Reveal({children,delay=0,style={}}){
  const[ref,v]=useReveal();
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(24px)",transition:`opacity .7s ${delay}s cubic-bezier(.4,0,.2,1),transform .7s ${delay}s cubic-bezier(.4,0,.2,1)`,...style}}>{children}</div>;
}

function CardSVG({id,acc,hov}){
  const s={position:"absolute",inset:0,width:"100%",height:"100%",opacity:hov?.18:.08,transition:"opacity .4s",pointerEvents:"none"};
  if(id==="silverwall")return <svg style={s} viewBox="0 0 300 160"><ellipse cx="150" cy="80" rx="100" ry="58" fill="none" stroke={acc} strokeWidth="1.5"/><ellipse cx="150" cy="80" rx="58" ry="34" fill="none" stroke={acc} strokeWidth=".8" strokeDasharray="5 4"/><circle cx="150" cy="22" r="5" fill={acc}/><circle cx="250" cy="80" r="3" fill={acc} opacity=".5"/><circle cx="50" cy="80" r="3" fill={acc} opacity=".5"/></svg>;
  if(id==="terminal")return <svg style={s} viewBox="0 0 300 160"><rect x="18" y="14" width="264" height="132" rx="4" fill="none" stroke={acc} strokeWidth=".9"/><rect x="18" y="14" width="264" height="26" rx="4" fill={acc} opacity=".07"/>{[0,1,2].map(j=><circle key={j} cx={34+j*14} cy="27" r="4" fill={acc} opacity={.35+j*.2}/>)}{[54,70,86,102].map((y,j)=><rect key={j} x="34" y={y} width={[72,110,52,90][j]} height="3.5" rx="2" fill={acc} opacity=".27"/>)}</svg>;
  if(id==="evolution")return <svg style={s} viewBox="0 0 300 160">{[36,62,90,120].map((r,j)=><circle key={j} cx="150" cy="80" r={r/2} fill="none" stroke={acc} strokeWidth={j===0?1.5:.8} opacity={.75-j*.14}/>)}{[0,60,120,180,240,300].map((a,j)=>{const rad=a*Math.PI/180;return <circle key={j} cx={150+54*Math.cos(rad)} cy={80+54*Math.sin(rad)} r="2.5" fill={acc} opacity=".5"/>;})}<circle cx="150" cy="80" r="6" fill={acc}/></svg>;
  if(id==="webtoon")return <svg style={s} viewBox="0 0 300 160">{[[18,14,124,130],[150,14,132,76],[150,98,132,48]].map(([x,y,w,h],j)=><rect key={j} x={x} y={y} width={w} height={h} rx="3" fill="none" stroke={acc} strokeWidth=".9" opacity={.65-j*.12}/>)}</svg>;
  if(id==="rune")return <svg style={s} viewBox="0 0 300 160">{["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ"].map((r,j)=><text key={j} x={20+(j%6)*50} y={44+Math.floor(j/6)*60} fontSize="28" fill={acc} opacity={.28+.16*(j%2)} fontFamily="serif">{r}</text>)}</svg>;
  if(id==="svgforge")return <svg style={s} viewBox="0 0 300 160"><path d="M16,140 Q78,18 150,80 Q222,142 284,32" fill="none" stroke={acc} strokeWidth="1.5" strokeDasharray="7 3"/><path d="M30,152 C88,50 168,118 284,24" fill="none" stroke={acc} strokeWidth=".8" opacity=".4"/>{[[16,140],[150,80],[284,32]].map(([x,y],j)=><circle key={j} cx={x} cy={y} r="4.5" fill={acc}/>)}</svg>;
  return <svg style={s} viewBox="0 0 300 160">{[[60,80],[150,80],[240,80]].map(([x,y],j)=><g key={j}><circle cx={x} cy={y} r="30" fill="none" stroke={acc} strokeWidth=".9" opacity=".5"/>{j<2&&<line x1={x+30} y1={y} x2={[150,240][j]-30} y2={y} stroke={acc} strokeWidth=".8" opacity=".35"/>}</g>)}</svg>;
}

function Card({p,i,mobile}){
  const[hov,setHov]=useState(false);const[exp,setExp]=useState(false);
  const[ref,v]=useReveal(.05);
  return(
    <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(28px)",transition:`opacity .7s ${Math.min(i*.07,.3)}s cubic-bezier(.4,0,.2,1),transform .7s ${Math.min(i*.07,.3)}s cubic-bezier(.4,0,.2,1)`}}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{position:"relative",background:hov?`${p.accent}0d`:C.surface,border:`1px solid ${hov?p.accent+"55":C.border}`,backdropFilter:"blur(14px)",transition:"all .32s cubic-bezier(.4,0,.2,1)",overflow:"hidden"}}>
        <CardSVG id={p.id} acc={p.accent} hov={hov}/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:hov?`linear-gradient(90deg,transparent,${p.accent},transparent)`:"transparent",transition:"background .4s"}}/>
        <div style={{position:"relative",padding:mobile?"16px 18px":"24px 28px"}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10,marginBottom:10,flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"monospace",fontSize:9,color:p.accent,letterSpacing:".18em",textTransform:"uppercase",marginBottom:7}}>{p.tag}</div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:mobile?20:26,fontWeight:800,letterSpacing:"-.02em",lineHeight:1.1,margin:0,color:C.text}}>
                <GlitchText text={p.title} active={hov}/>
              </h3>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5,flexShrink:0}}>
              <span style={{fontFamily:"monospace",fontSize:8,color:C.muted2}}>{p.year}</span>
              <div style={{display:"flex",alignItems:"center",gap:5,background:`${p.sc}14`,border:`1px solid ${p.sc}33`,padding:"3px 9px"}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:p.sc,boxShadow:`0 0 5px ${p.sc}`}}/>
                <span style={{fontFamily:"monospace",fontSize:8,color:p.sc,letterSpacing:".1em"}}>{p.status}</span>
              </div>
            </div>
          </div>
          <div style={{fontFamily:"monospace",fontSize:9,color:C.muted2,letterSpacing:".05em",marginBottom:12,fontStyle:"italic"}}>{p.role}</div>
          <p style={{color:C.muted,fontSize:mobile?13:14,lineHeight:1.8,marginBottom:12,fontWeight:300}}>{p.desc}</p>
          <div style={{maxHeight:exp?"200px":"0",overflow:"hidden",transition:"max-height .42s cubic-bezier(.4,0,.2,1)"}}>
            <p style={{color:C.muted2,fontSize:13,lineHeight:1.8,marginBottom:12,fontWeight:300,paddingLeft:14,borderLeft:`2px solid ${p.accent}44`}}>{p.detail}</p>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:16}}>
            {p.tech.map(t=><span key={t} style={{fontFamily:"monospace",fontSize:9,color:hov?C.muted:C.muted2,background:hov?`${p.accent}0d`:"transparent",border:`1px solid ${hov?p.accent+"33":C.border}`,padding:"3px 9px",letterSpacing:".04em",transition:"all .28s"}}>{t}</span>)}
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {p.live&&<a href={p.live} target="_blank" rel="noopener noreferrer"
                style={{fontFamily:"monospace",fontSize:10,color:p.accent,border:`1px solid ${p.accent}55`,padding:"7px 14px",textDecoration:"none",letterSpacing:".06em",transition:"all .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=`${p.accent}1a`;e.currentTarget.style.borderColor=p.accent;}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor=`${p.accent}55`;}}>LIVE ↗</a>}
              <a href={p.repo} target="_blank" rel="noopener noreferrer"
                style={{fontFamily:"monospace",fontSize:10,color:C.muted,border:`1px solid ${C.border}`,padding:"7px 14px",textDecoration:"none",letterSpacing:".06em",transition:"all .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.color=C.text;e.currentTarget.style.borderColor=C.borderHi;}}
                onMouseLeave={e=>{e.currentTarget.style.color=C.muted;e.currentTarget.style.borderColor=C.border;}}>GITHUB →</a>
            </div>
            <button onClick={()=>setExp(e=>!e)} style={{fontFamily:"monospace",fontSize:9,color:exp?p.accent:C.muted2,background:"none",border:"none",cursor:"pointer",letterSpacing:".08em",padding:"7px 0",transition:"color .2s"}}>
              {exp?"LESS ↑":"MORE ↓"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Nav({scrolled,mobile}){
  const[open,setOpen]=useState(false);
  const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setOpen(false);};
  return(
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"space-between",padding:mobile?"14px 20px":"16px 48px",background:scrolled||open?"rgba(6,4,15,0.94)":"transparent",backdropFilter:scrolled||open?"blur(20px)":"none",borderBottom:scrolled||open?"1px solid rgba(168,85,247,0.1)":"1px solid transparent",transition:"all .38s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
          <LogoStroke/><span style={{fontFamily:"monospace",fontSize:11,color:"#a855f7",letterSpacing:".12em"}}>PUSHAN_047</span>
        </div>
        {mobile?(
          <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",padding:4,display:"flex",flexDirection:"column",gap:5}}>
            {[0,1,2].map(i=><div key={i} style={{width:22,height:1.5,background:open?"#a855f7":C.muted,transition:"all .3s",transform:open?(i===0?"rotate(45deg) translateY(6.5px)":i===2?"rotate(-45deg) translateY(-6.5px)":"scaleX(0)"):"none"}}/>)}
          </button>
        ):(
          <div style={{display:"flex",gap:32,alignItems:"center"}}>
            {["work","about","contact"].map(l=>(
              <button key={l} onClick={()=>go(l)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"monospace",fontSize:11,color:C.muted,letterSpacing:".1em",textTransform:"uppercase",transition:"color .2s"}}
                onMouseEnter={e=>e.target.style.color=C.text} onMouseLeave={e=>e.target.style.color=C.muted}>{l}</button>
            ))}
            <a href="http://duskdawn.xyz" target="_blank" rel="noopener noreferrer"
              style={{fontFamily:"monospace",fontSize:10,color:"#a855f7",border:"1px solid rgba(168,85,247,0.4)",padding:"7px 18px",textDecoration:"none",letterSpacing:".1em",transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(168,85,247,0.1)";e.currentTarget.style.borderColor="#a855f7";}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(168,85,247,0.4)";}}>PORTFOLIO ↗</a>
          </div>
        )}
      </nav>
      {mobile&&open&&(
        <div style={{position:"fixed",top:52,left:0,right:0,zIndex:190,background:"rgba(6,4,15,0.97)",borderBottom:"1px solid rgba(168,85,247,0.1)",padding:"24px 20px 28px",display:"flex",flexDirection:"column",gap:4}}>
          {["work","about","contact"].map(l=>(
            <button key={l} onClick={()=>go(l)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"monospace",fontSize:15,color:C.muted,letterSpacing:".12em",textTransform:"uppercase",textAlign:"left",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>{l}</button>
          ))}
          <a href="http://duskdawn.xyz" target="_blank" rel="noopener noreferrer" style={{fontFamily:"monospace",fontSize:12,color:"#a855f7",textDecoration:"none",padding:"14px 0",letterSpacing:".1em"}}>PORTFOLIO ↗</a>
        </div>
      )}
    </>
  );
}

function Hero({mobile}){
  const[on,setOn]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setOn(true),100);return()=>clearTimeout(t);},[]);
  const a=d=>({opacity:on?1:0,transform:on?"translateY(0)":"translateY(20px)",transition:`opacity .9s ${d}s cubic-bezier(.4,0,.2,1),transform .9s ${d}s cubic-bezier(.4,0,.2,1)`});
  return(
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:mobile?"110px 20px 60px":"130px 48px 80px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"relative",maxWidth:860}}>
        <div style={{...a(.1),fontFamily:"monospace",fontSize:mobile?9:10,color:"#a855f7",letterSpacing:".22em",textTransform:"uppercase",marginBottom:24,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:28,height:1,background:"#a855f7",flexShrink:0}}/>PROJECT SHOWCASE · PUSHAN · 2025
        </div>
        <h1 style={{...a(.22),fontFamily:"'Syne',sans-serif",fontSize:mobile?"clamp(44px,11vw,66px)":"clamp(58px,8vw,102px)",fontWeight:800,lineHeight:.92,letterSpacing:"-.03em",marginBottom:28,perspective:"600px"}}>
          <KineticWord word="Work" baseDelay={.3} gradient="linear-gradient(135deg,#f4f0ff 0%,#a78bfa 100%)"/>
          <KineticWord word="that" baseDelay={.52} gradient="linear-gradient(135deg,#f4f0ff 0%,#a78bfa 100%)"/>
          <KineticWord word="speaks." baseDelay={.74} gradient="linear-gradient(135deg,#f97316 0%,#a855f7 55%,#06b6d4 100%)"/>
        </h1>
        <p style={{...a(.58),fontSize:mobile?14:16,color:C.muted,maxWidth:480,lineHeight:1.8,marginBottom:40,fontWeight:300}}>
          UI/UX design &amp; frontend engineering. Ideas-first, AI-assisted, built with intention. Kinetic type, liquid shaders, particle systems, SVG animation — all from scratch.
        </p>
        <div style={{...a(.72),display:"flex",gap:12,flexWrap:"wrap"}}>
          {[{label:"SEE THE WORK ↓",id:"work",primary:true},{label:"PORTFOLIO ↗",href:"http://duskdawn.xyz"},{label:"GITHUB ↗",href:"https://github.com/Ashborn-047"}].map(btn=>{
            const[hov,setHov]=useState(false);
            return(
              <a key={btn.label} href={btn.href||"#"} onClick={btn.id?e=>{e.preventDefault();document.getElementById(btn.id)?.scrollIntoView({behavior:"smooth"});}:undefined}
                target={btn.href?"_blank":undefined} rel={btn.href?"noopener noreferrer":undefined}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                style={{fontFamily:"monospace",fontSize:mobile?10:11,padding:mobile?"11px 22px":"12px 28px",letterSpacing:".12em",textDecoration:"none",transition:"all .25s cubic-bezier(.4,0,.2,1)",display:"inline-flex",alignItems:"center",
                  background:btn.primary?(hov?"#c084fc":"#a855f7"):"transparent",
                  color:btn.primary?"#06040f":(hov?C.text:C.muted),
                  border:btn.primary?"none":"1px solid",borderColor:hov?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.1)",
                  transform:hov&&btn.primary?"translateY(-2px)":"translateY(0)",
                  boxShadow:btn.primary&&hov?"0 8px 30px rgba(168,85,247,0.35)":"none"}}>
                {btn.label}
              </a>
            );
          })}
        </div>
      </div>
      {!mobile&&(
        <div style={{position:"absolute",right:48,top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",gap:1}}>
          {[["07","Projects"],["37+","Repos"],["WebGL","Shaders"],["GSAP","Animations"]].map(([val,label])=>(
            <div key={label} style={{background:"rgba(168,85,247,0.05)",backdropFilter:"blur(16px)",border:"1px solid rgba(168,85,247,0.12)",padding:"14px 22px",textAlign:"right"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#a855f7",lineHeight:1,marginBottom:2}}>{val}</div>
              <div style={{fontFamily:"monospace",fontSize:8,color:C.muted2,letterSpacing:".1em",textTransform:"uppercase"}}>{label}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",opacity:.28,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
        <span style={{fontFamily:"monospace",fontSize:8,letterSpacing:".22em",color:C.muted}}>SCROLL</span>
        <div style={{width:1,height:34,background:"linear-gradient(to bottom,rgba(168,85,247,0.6),transparent)"}}/>
      </div>
    </section>
  );
}

function About({mobile}){
  const principles=[
    {icon:"◈",label:"IDEAS-FIRST",text:"Every project started with a genuine problem. The direction, concept, the why — mine. AI accelerates the how."},
    {icon:"◉",label:"FEEDBACK LOOPS",text:"Constant iteration: define, direct, evaluate, redirect. Same loop whether working with a team or a model."},
    {icon:"⬡",label:"SYSTEMS THINKING",text:"Design systems not screens. Token-first, component library before product. Structure before surface."},
    {icon:"▸",label:"END-TO-END",text:"Figma to working React. I close the gap myself — no translation loss, no hand-off friction."},
  ];
  return(
    <section id="about" style={{background:"rgba(168,85,247,0.02)",borderTop:"1px solid rgba(168,85,247,0.08)",borderBottom:"1px solid rgba(168,85,247,0.08)",padding:mobile?"60px 20px":"100px 48px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <Reveal style={{marginBottom:48}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <span style={{fontFamily:"monospace",fontSize:10,color:"#a855f7",letterSpacing:".15em",flexShrink:0}}>02 /</span>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:mobile?"clamp(22px,6vw,32px)":"clamp(26px,3.5vw,40px)",fontWeight:700,letterSpacing:"-.02em",margin:0,color:C.text}}>The Approach</h2>
            <div style={{flex:1,height:1,background:"rgba(168,85,247,0.1)"}}/>
          </div>
        </Reveal>
        <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"1fr 1fr",gap:mobile?32:64}}>
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            {principles.map((p,i)=>(
              <Reveal key={p.label} delay={i*.08}>
                <div style={{borderLeft:"2px solid rgba(168,85,247,0.22)",paddingLeft:20}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                    <span style={{color:"#a855f7",fontSize:14}}>{p.icon}</span>
                    <span style={{fontFamily:"monospace",fontSize:9,color:"#a855f7",letterSpacing:".16em",textTransform:"uppercase"}}>{p.label}</span>
                  </div>
                  <p style={{color:C.muted,fontSize:mobile?13:14,lineHeight:1.8,fontWeight:300}}>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={.18}>
            <div style={{display:"flex",flexDirection:"column",gap:18}}>
              {[{cat:"DESIGN",tags:["Figma","Design Systems","UX Research","Prototyping","Motion","IA"]},{cat:"FRONTEND",tags:["React","TypeScript","Tailwind","Framer Motion","GSAP","Next.js"]},{cat:"CREATIVE CODE",tags:["Three.js","WebGL/GLSL","Canvas API","SVG SMIL","SVG Filters"]},{cat:"SYSTEMS",tags:["FastAPI","Supabase","WebSockets","SpacetimeDB"]},].map(s=>(
                <div key={s.cat}>
                  <div style={{fontFamily:"monospace",fontSize:8,color:C.muted2,letterSpacing:".14em",marginBottom:8,textTransform:"uppercase"}}>{s.cat}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {s.tags.map(t=>{const[hov,setHov]=useState(false);return<span key={t} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{fontFamily:"monospace",fontSize:9,color:hov?C.text:C.muted,background:hov?"rgba(168,85,247,0.1)":"transparent",border:`1px solid ${hov?"rgba(168,85,247,0.4)":C.border}`,padding:"4px 10px",letterSpacing:".04em",transition:"all .2s",cursor:"default"}}>{t}</span>;})}
                  </div>
                </div>
              ))}
              <div style={{marginTop:6,background:"rgba(249,115,22,0.04)",border:"1px solid rgba(249,115,22,0.15)",padding:"18px 20px"}}>
                <div style={{fontFamily:"monospace",fontSize:9,color:"#f97316",letterSpacing:".14em",marginBottom:8}}>AI-NATIVE ARCHITECT</div>
                <p style={{color:C.muted,fontSize:mobile?12:13,lineHeight:1.75,fontWeight:300}}>I treat AI as a highly capable execution layer — not a replacement for creative direction. The concepts, critique, decisions are mine. The speed is AI's. That's the workflow.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact({mobile}){
  const[ref,v]=useReveal(.1);
  return(
    <section id="contact" style={{padding:mobile?"80px 20px":"120px 48px",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 60% at 50% 50%,rgba(168,85,247,0.05) 0%,transparent 70%)"}}/>
      <div ref={ref} style={{position:"relative",opacity:v?1:0,transform:v?"translateY(0)":"translateY(24px)",transition:"opacity .8s cubic-bezier(.4,0,.2,1),transform .8s cubic-bezier(.4,0,.2,1)",maxWidth:540,margin:"0 auto"}}>
        <div style={{fontFamily:"monospace",fontSize:mobile?9:10,color:"#a855f7",letterSpacing:".2em",textTransform:"uppercase",marginBottom:18}}>03 / GET IN TOUCH</div>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:mobile?"clamp(34px,9vw,52px)":"clamp(38px,6vw,64px)",fontWeight:800,letterSpacing:"-.03em",lineHeight:1.05,marginBottom:20,color:C.text}}>
          Let's build{" "}<span style={{background:"linear-gradient(135deg,#f97316,#a855f7,#06b6d4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>something real.</span>
        </h2>
        <p style={{color:C.muted,fontSize:mobile?13:15,maxWidth:360,margin:"0 auto 40px",fontWeight:300,lineHeight:1.7}}>Open to UI/UX roles, design-engineering collaborations, and projects worth caring about.</p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          {[{label:"EMAIL ↗",href:"mailto:pushan@duskdawn.xyz",primary:true},{label:"PORTFOLIO ↗",href:"http://duskdawn.xyz"},{label:"GITHUB ↗",href:"https://github.com/Ashborn-047"}].map(l=>{
            const[hov,setHov]=useState(false);
            return(
              <a key={l.label} href={l.href} target={l.href.startsWith("mailto")?undefined:"_blank"} rel="noopener noreferrer"
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                style={{fontFamily:"monospace",fontSize:mobile?10:11,padding:mobile?"11px 20px":"12px 24px",border:"1px solid",textDecoration:"none",letterSpacing:".1em",transition:"all .25s cubic-bezier(.4,0,.2,1)",
                  background:l.primary?(hov?"#c084fc":"#a855f7"):"transparent",
                  color:l.primary?"#06040f":(hov?C.text:C.muted),
                  borderColor:l.primary?"#a855f7":(hov?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.1)"),
                  transform:hov&&l.primary?"translateY(-2px)":"translateY(0)",
                  boxShadow:l.primary&&hov?"0 8px 30px rgba(168,85,247,0.35)":"none"}}>
                {l.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function App(){
  const[scrolled,setScrolled]=useState(false);
  const w=useW();const mobile=w<768;
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>40);window.addEventListener("scroll",f);return()=>window.removeEventListener("scroll",f);},[]);
  return(
    <div style={{background:C.bg,color:C.text,minHeight:"100vh",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#06040f;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#03020a;}
        ::-webkit-scrollbar-thumb{background:rgba(168,85,247,0.3);}
      `}</style>
      <ParticleCanvas/>
      <div style={{position:"relative",zIndex:1}}>
        <Nav scrolled={scrolled} mobile={mobile}/>
        <Hero mobile={mobile}/>
        <section id="work" style={{padding:mobile?"60px 20px":"100px 48px",maxWidth:1200,margin:"0 auto"}}>
          <Reveal style={{marginBottom:44}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <span style={{fontFamily:"monospace",fontSize:10,color:"#a855f7",letterSpacing:".15em",flexShrink:0}}>01 /</span>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:mobile?"clamp(22px,6vw,32px)":"clamp(26px,3.5vw,40px)",fontWeight:700,letterSpacing:"-.02em",margin:0,color:C.text,whiteSpace:"nowrap"}}>Projects</h2>
              <div style={{flex:1,height:1,background:"rgba(168,85,247,0.1)"}}/>
            </div>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:mobile?"1fr":"repeat(2,1fr)",gap:mobile?12:2}}>
            {PROJECTS.map((p,i)=><Card key={p.id} p={p} i={i} mobile={mobile}/>)}
          </div>
        </section>
        <About mobile={mobile}/>
        <Contact mobile={mobile}/>
        <footer style={{borderTop:"1px solid rgba(168,85,247,0.08)",padding:mobile?"18px 20px":"22px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <span style={{fontFamily:"monospace",fontSize:9,color:C.muted2,letterSpacing:".06em"}}>© 2026 Pushan — Ashborn-047</span>
          <span style={{fontFamily:"monospace",fontSize:9,color:C.muted2,fontStyle:"italic"}}>The interface is no longer waiting.</span>
          <a href="http://duskdawn.xyz" target="_blank" rel="noopener noreferrer" style={{fontFamily:"monospace",fontSize:9,color:"rgba(168,85,247,0.45)",letterSpacing:".08em",textDecoration:"none"}}>duskdawn.xyz ↗</a>
        </footer>
      </div>
    </div>
  );
}
