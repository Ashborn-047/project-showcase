import { useEffect, useRef } from "react";
import { hexToRgb } from "../utils";
import { STATUS_MAP } from "../data/projects";
import { ProjectVisual } from "./Visuals";
import StatusBadge from "./StatusBadge";
import Section from "./Section";

export default function DetailOverlay({project,onClose,isMobile}){
  const open=!!project;
  const scrollRef=useRef(null);
  useEffect(()=>{
    if(open){document.body.style.overflow="hidden";if(scrollRef.current)scrollRef.current.scrollTop=0;}
    else document.body.style.overflow="";
    return()=>{document.body.style.overflow="";};
  },[open,project]);
  useEffect(()=>{
    const fn=e=>{if(e.key==="Escape")onClose();};
    window.addEventListener("keydown",fn);
    return()=>window.removeEventListener("keydown",fn);
  },[onClose]);

  const p=project;
  const rgb=p?hexToRgb(p.accentColor):"255,255,255";
  const sidePad=isMobile?"18px":"44px";

  return(
    <div style={{position:"fixed",inset:0,zIndex:500,pointerEvents:open?"all":"none"}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(6,4,9,.82)",backdropFilter:"blur(10px)",opacity:open?1:0,transition:"opacity .4s"}}/>
      <div style={{
        position:"absolute",bottom:0,left:0,right:0,
        height:isMobile?"96vh":"92vh",
        background:"#080511",
        borderTop:p?`1px solid rgba(${rgb},.25)`:"1px solid rgba(216,180,254,.4)",
        transform:open?"translateY(0)":"translateY(100%)",
        transition:"transform .45s cubic-bezier(.16,1,.3,1)",
        display:"flex",flexDirection:"column",overflow:"hidden",
      }}>
        {/* top bar */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:`14px ${sidePad}`,borderBottom:"1px solid rgba(255,255,255,.05)",flexShrink:0,gap:12}}>
          <span style={{fontSize:isMobile?9:10,letterSpacing:"0.14em",color:"rgba(138,154,170,.4)",fontFamily:"'Courier New',monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
            PROJECTS {p&&<>/ <span style={{color:"rgba(216,180,254,1)"}}>{p.title.toUpperCase()}</span></>}
          </span>
          <button onClick={onClose} style={{background:"none",border:"1px solid rgba(255,255,255,.08)",color:"rgba(138,154,170,.6)",fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:"0.12em",padding:isMobile?"6px 10px":"7px 16px",cursor:"pointer",flexShrink:0}}>
            {isMobile?"✕":"✕ CLOSE"}
          </button>
        </div>

        {/* scrollable body */}
        <div ref={scrollRef} style={{flex:1,overflowY:"auto",padding:`${isMobile?"24px":"48px"} ${sidePad} 100px`,scrollbarWidth:"thin",scrollbarColor:"rgba(168,85,247,.2) transparent"}}>
          {p&&(
            <>
              {/* hero */}
              <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 300px",gap:isMobile?24:48,marginBottom:isMobile?32:52,alignItems:"start"}}>
                <div>
                  <div style={{fontSize:9,letterSpacing:"0.2em",color:"rgba(216,180,254,1)",marginBottom:12,fontFamily:"'Courier New',monospace"}}>
                    {p.category.join(" · ").toUpperCase()} · {p.year}
                  </div>
                  <h1 style={{fontFamily:"Georgia,serif",fontSize:isMobile?"clamp(24px,7vw,34px)":"clamp(32px,4vw,48px)",fontWeight:400,color:"#e8edf2",letterSpacing:"-0.02em",lineHeight:1.05,marginBottom:14}}>
                    {p.title}
                  </h1>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18,flexWrap:"wrap"}}>
                    <StatusBadge status={p.status}/>
                    <span style={{fontSize:10,letterSpacing:"0.1em",color:"rgba(138,154,170,.35)",fontFamily:"'Courier New',monospace"}}>{p.year}</span>
                  </div>
                  <p style={{fontSize:isMobile?13:15,lineHeight:1.8,color:"rgba(138,154,170,.85)"}}>
                    {p.fullDescription}
                  </p>
                  <div style={{display:"flex",gap:8,marginTop:20,flexWrap:"wrap"}}>
                    {p.links.live&&<a href={p.links.live} target="_blank" rel="noreferrer" style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:"0.12em",padding:"9px 18px",border:`1px solid rgba(${rgb},.4)`,color:p.accentColor,textDecoration:"none"}}>LIVE ↗</a>}
                    {p.links.github&&<a href={p.links.github} target="_blank" rel="noreferrer" style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:"0.12em",padding:"9px 18px",border:"1px solid rgba(255,255,255,.1)",color:"rgba(138,154,170,.7)",textDecoration:"none"}}>GITHUB ↗</a>}
                    {p.links.caseStudy&&<a href={p.links.caseStudy} target="_blank" rel="noreferrer" style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:"0.12em",padding:"9px 18px",border:"1px solid rgba(255,255,255,.1)",color:"rgba(138,154,170,.7)",textDecoration:"none"}}>CASE STUDY ↗</a>}
                    {!p.links.live&&!p.links.github&&<span style={{fontFamily:"'Courier New',monospace",fontSize:10,letterSpacing:"0.12em",padding:"9px 18px",border:"1px solid rgba(255,255,255,.06)",color:"rgba(138,154,170,.28)"}}>IN DEVELOPMENT</span>}
                  </div>
                </div>
                <div style={{height:isMobile?190:250,border:"1px solid rgba(255,255,255,.06)",background:"rgba(255,255,255,.02)",position:"relative",overflow:"hidden",marginTop:isMobile?4:0}}>
                  <ProjectVisual project={p}/>
                </div>
              </div>

              {/* metrics */}
              {p.metrics&&(
                <Section label="METRICS_">
                  <div style={{display:"grid",gridTemplateColumns:`repeat(auto-fill,minmax(${isMobile?"90px":"120px"},1fr))`,gap:8}}>
                    {p.metrics.map(m=>(
                      <div key={m.label} style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",padding:isMobile?"12px 10px":"18px 14px"}}>
                        <div style={{fontFamily:"Georgia,serif",fontSize:isMobile?20:26,color:p.accentColor,lineHeight:1,marginBottom:5}}>{m.val}</div>
                        <div style={{fontSize:9,letterSpacing:"0.12em",color:"rgba(138,154,170,.5)",fontFamily:"'Courier New',monospace"}}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* tech stack */}
              <Section label="TECH_STACK_">
                <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(auto-fill,minmax(200px,1fr))",gap:8}}>
                  {p.tech.map(t=>(
                    <div key={t.name} style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",padding:isMobile?"12px":"16px"}}>
                      <span style={{display:"inline-block",fontSize:8,letterSpacing:"0.1em",padding:"2px 7px",background:`rgba(${rgb},.1)`,color:p.accentColor,marginBottom:7,fontFamily:"'Courier New',monospace"}}>{t.badge}</span>
                      <div style={{fontSize:isMobile?10:11,letterSpacing:"0.06em",color:"#e8edf2",marginBottom:4}}>{t.name}</div>
                      <div style={{fontSize:isMobile?10:11,lineHeight:1.6,color:"rgba(138,154,170,.6)"}}>{t.role}</div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* use cases */}
              {p.usecases && p.usecases.length > 0 && (
                <Section label="USE_CASES_">
                  <div style={{display:"flex",flexDirection:"column",gap:isMobile?16:20}}>
                    {p.usecases.map((u,i)=>(
                      <div key={u.title} style={{display:"grid",gridTemplateColumns:"22px 1fr",gap:12}}>
                        <span style={{fontSize:10,letterSpacing:"0.1em",color:"rgba(168,85,247,.4)",fontFamily:"'Courier New',monospace",paddingTop:2}}>0{i+1}</span>
                        <div>
                          <div style={{fontSize:isMobile?12:13,letterSpacing:"0.04em",color:p.accentColor,marginBottom:4}}>{u.title}</div>
                          <div style={{fontSize:isMobile?11.5:12.5,lineHeight:1.7,color:"rgba(138,154,170,.65)"}}>{u.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* before and after */}
              {p.beforeAfter && p.beforeAfter.length > 0 && (
                <Section label="BEFORE_&_AFTER_">
                  <div style={{display:"flex",flexDirection:"column",gap:16}}>
                    {p.beforeAfter.map((item,i)=>(
                      <div key={i} style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",padding:"14px",fontSize:isMobile?11.5:12.5}}>
                        <div style={{color:p.accentColor,marginBottom:8,letterSpacing:"0.05em",textTransform:"uppercase"}}>{item.aspect}</div>
                        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isMobile?8:16}}>
                          <div>
                            <span style={{color:"#ef4444",fontSize:10,letterSpacing:"0.1em",fontFamily:"'Courier New',monospace",display:"block",marginBottom:4}}>[BEFORE]</span>
                            <span style={{color:"rgba(138,154,170,.6)"}}>{item.before}</span>
                          </div>
                          <div>
                            <span style={{color:"#10b981",fontSize:10,letterSpacing:"0.1em",fontFamily:"'Courier New',monospace",display:"block",marginBottom:4}}>[AFTER]</span>
                            <span style={{color:"rgba(138,154,170,.85)"}}>{item.after}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* architecture flow */}
              {p.architecture && p.architecture.length > 0 && (
                <Section label="ARCHITECTURAL_FLOW_">
                  <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(auto-fit, minmax(240px, 1fr))",gap:12}}>
                    {p.architecture.map((item,i)=>(
                      <div key={i} style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",padding:"16px",position:"relative"}}>
                        <div style={{fontSize:10,letterSpacing:"0.12em",color:p.accentColor,fontFamily:"'Courier New',monospace",marginBottom:8,textTransform:"uppercase"}}>0{i+1} // {item.step}</div>
                        <div style={{fontSize:isMobile?11.5:12.5,lineHeight:1.6,color:"rgba(138,154,170,.65)"}}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* what i built */}
              <Section label="WHAT_I_BUILT_">
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {p.built.map((b,i)=>(
                    <div key={i} style={{display:"flex",gap:12,fontSize:isMobile?11.5:12.5,lineHeight:1.7,color:"rgba(138,154,170,.75)"}}>
                      <span style={{color:"rgba(168,85,247,.4)",flexShrink:0}}>—</span>{b}
                    </div>
                  ))}
                </div>
              </Section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
