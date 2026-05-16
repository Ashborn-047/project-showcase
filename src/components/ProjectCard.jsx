import { useState } from "react";
import { hexToRgb } from "../utils";
import { ProjectVisual } from "./Visuals";
import StatusBadge from "./StatusBadge";

export default function ProjectCard({project,index,onOpen,isMobile}){
  const [hov,setHov]=useState(false);
  const rgb=hexToRgb(project.accentColor);
  const isEven = index % 2 === 0;

  const visualBlock = (
      <div style={{borderRight:isMobile?"none":(isEven ? "1px solid rgba(255,255,255,.05)" : "none"),borderLeft:isMobile?"none":(!isEven ? "1px solid rgba(255,255,255,.05)" : "none"),borderBottom:isMobile?"1px solid rgba(255,255,255,.05)":"none",position:"relative",overflow:"hidden",height:isMobile?180:"auto"}}>
        <ProjectVisual project={project}/>
      </div>
  );

  const textBlock = (
      <div style={{padding:isMobile?"18px 16px 22px":"28px 32px",display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:10}}>
          <span style={{fontSize:isMobile?8:9,letterSpacing:"0.12em",color:project.accentColor,lineHeight:1.4}}>
            {project.category.toUpperCase()}
          </span>
          <StatusBadge status={project.status} small={isMobile}/>
        </div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:isMobile?19:24,fontWeight:400,color:"#e8edf2",marginBottom:8,letterSpacing:"-0.01em",lineHeight:1.2}}>
          {project.title}
        </h2>
        <p style={{fontSize:12,lineHeight:1.7,color:"rgba(138,154,170,.75)",marginBottom:14,flex:1}}>
          {project.description}
        </p>
        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>
          {project.tech.slice(0,isMobile?3:project.tech.length).map(t=>(
            <span key={t} style={{fontSize:9,letterSpacing:"0.08em",color:project.accentColor,background:`rgba(${rgb},.04)`,padding:"3px 8px",border:`1px solid rgba(${rgb},.1)`}}>
              {t}
            </span>
          ))}
          {isMobile&&project.tech.length>3&&(
            <span style={{fontSize:9,color:"rgba(138,154,170,.3)",padding:"3px 6px"}}>+{project.tech.length-3}</span>
          )}
        </div>
        <div style={{display:"flex",justifyContent:isEven ? "flex-end" : "flex-start"}}>
          <span style={{fontSize:9,letterSpacing:"0.12em",color:`rgba(${rgb},.8)`,opacity:isMobile?1:hov?1:0,transform:(isMobile||hov)?"translateX(0)":"translateX(-6px)",transition:"all .25s",fontFamily:"'Courier New',monospace"}}>
            VIEW DETAILS →
          </span>
        </div>
      </div>
  );

  return(
    <div
      onClick={()=>onOpen(project)}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        display:"grid",
        gridTemplateColumns:isMobile?"1fr":(isEven ? "260px 1fr" : "1fr 260px"),
        gridTemplateRows:isMobile?"180px auto":undefined,
        minHeight:isMobile?"auto":230,
        border:`1px solid ${hov?`rgba(${rgb},.3)`:"rgba(255,255,255,.05)"}`,
        background:hov?`rgba(${rgb},.022)`:"rgba(255,255,255,.012)",
        cursor:"pointer",position:"relative",overflow:"hidden",
        transition:"border-color .3s,background .3s",
      }}
    >
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 60% 80% at ${isMobile?"50% 0%":(isEven ? "0% 50%" : "100% 50%")},rgba(${rgb},.05),transparent)`,opacity:hov?1:0,transition:"opacity .4s",pointerEvents:"none"}}/>
      
      {isMobile ? <>{visualBlock}{textBlock}</> : (isEven ? <>{visualBlock}{textBlock}</> : <>{textBlock}{visualBlock}</>)}
      
      <div style={{position:"absolute",bottom:14,right: isEven ? 16 : undefined, left: isEven ? undefined : 16, fontSize:10,color:"rgba(255,255,255,.06)",letterSpacing:"0.1em",fontFamily:"'Courier New',monospace"}}>
        0{index+1}
      </div>
    </div>
  );
}
