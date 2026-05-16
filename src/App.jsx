import { useState, useCallback } from "react";
import { useBreakpoint } from "./utils";
import { PROJECTS } from "./data/projects";
import { RuneCanvas } from "./components/Visuals";
import ProjectCard from "./components/ProjectCard";
import DetailOverlay from "./components/DetailOverlay";

export default function App(){
  const {isMobile,isTablet}=useBreakpoint();
  const [filter,setFilter]=useState("all");
  const [selected,setSelected]=useState(null);
  const closeDetail=useCallback(()=>setSelected(null),[]);
  const filtered=filter==="all"?PROJECTS:PROJECTS.filter(p=>p.status.toLowerCase()===filter.toLowerCase());
  const px=isMobile?"16px":isTablet?"28px":"44px";
  const FILTERS=[{key:"all",label:"ALL"},{key:"live",label:"LIVE"},{key:"in-progress",label:"IN PROGRESS"},{key:"case-study",label:"CASE STUDY"}];

  return(
    <div style={{minHeight:"100vh",background:"#060409",fontFamily:"'Courier New',monospace",overflowX:"hidden"}}>
      <RuneCanvas/>
      <div style={{position:"relative",zIndex:1,maxWidth:980,margin:"0 auto",padding:`0 ${px} 100px`}}>

        {/* nav */}
        <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:isMobile?"16px 0 28px":"22px 0 40px",borderBottom:"1px solid rgba(168,85,247,.12)",marginBottom:isMobile?32:48}}>
          <span style={{fontSize:isMobile?10:11,letterSpacing:"0.18em",color:"#a855f7"}}>PUSHAN_047</span>
          <a href="https://duskdawn.xyz" target="_blank" rel="noreferrer" style={{fontSize:isMobile?9:10,letterSpacing:"0.1em",color:"rgba(138,154,170,.6)",border:"1px solid rgba(255,255,255,.08)",padding:isMobile?"6px 11px":"7px 16px",textDecoration:"none"}}>
            ← PORTFOLIO ↗
          </a>
        </nav>

        {/* header */}
        <div style={{marginBottom:isMobile?28:40}}>
          <div style={{fontSize:isMobile?9:10,letterSpacing:"0.2em",color:"rgba(168,85,247,.7)",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
            <span style={{display:"block",width:20,height:1,background:"#a855f7",flexShrink:0}}/>
            SELECTED WORKS · 2024–2025
          </div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:isMobile?"clamp(26px,8vw,36px)":"clamp(28px,5vw,44px)",fontWeight:400,color:"#e8edf2",letterSpacing:"-0.01em",lineHeight:1.1,marginBottom:8}}>
            All <em style={{fontStyle:"italic",color:"#a855f7"}}>Projects</em>
          </h1>
          <p style={{fontSize:isMobile?11:13,color:"rgba(138,154,170,.6)",letterSpacing:"0.04em"}}>
            {filtered.length} project{filtered.length!==1?"s":""} · interfaces, systems, visualizations
          </p>
        </div>

        {/* filters — horizontal scroll on mobile */}
        <div style={{display:"flex",gap:isMobile?5:8,overflowX:isMobile?"auto":"visible",flexWrap:isMobile?"nowrap":"wrap",marginBottom:isMobile?28:44,paddingBottom:isMobile?2:0,scrollbarWidth:"none"}}>
          {FILTERS.map(f=>(
            <button key={f.key} onClick={()=>setFilter(f.key)} style={{
              fontFamily:"'Courier New',monospace",fontSize:isMobile?9:10,letterSpacing:"0.1em",
              padding:isMobile?"5px 11px":"6px 16px",
              background:filter===f.key?"rgba(168,85,247,.08)":"transparent",
              border:filter===f.key?"1px solid #a855f7":"1px solid rgba(255,255,255,.08)",
              color:filter===f.key?"#a855f7":"rgba(138,154,170,.6)",
              cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,
            }}>{f.label}</button>
          ))}
        </div>

        {/* cards */}
        <div style={{display:"flex",flexDirection:"column",gap:isMobile?16:40}}>
          {filtered.map((p,i)=>(
            <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} isMobile={isMobile}/>
          ))}
        </div>

        {/* footer */}
        <div style={{marginTop:isMobile?52:68,padding:isMobile?"28px 0":"44px 0",borderTop:"1px solid rgba(168,85,247,.12)",display:"flex",flexDirection:isMobile?"column":"row",justifyContent:"space-between",alignItems:isMobile?"flex-start":"center",gap:isMobile?18:0}}>
          <div>
            <div style={{fontSize:isMobile?9:10,letterSpacing:"0.16em",color:"rgba(138,154,170,.4)"}}>PUSHAN_047 · PORTFOLIO</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:isMobile?12:13,color:"rgba(138,154,170,.45)",marginTop:4}}>
              More about me, process, and contact → duskdawn.xyz
            </div>
          </div>
          <a href="https://duskdawn.xyz" target="_blank" rel="noreferrer" style={{fontSize:isMobile?9:10,letterSpacing:"0.1em",color:"rgba(138,154,170,.6)",border:"1px solid rgba(255,255,255,.08)",padding:isMobile?"7px 14px":"8px 16px",textDecoration:"none",alignSelf:isMobile?"flex-start":"auto"}}>
            VISIT PORTFOLIO ↗
          </a>
        </div>
      </div>

      <DetailOverlay project={selected} onClose={closeDetail} isMobile={isMobile}/>
    </div>
  );
}
