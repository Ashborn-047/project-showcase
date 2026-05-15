import { useRef, useEffect } from "react";
import { RUNES } from "../data/projects";
import { hexToRgb } from "../utils";

export function RuneCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W, H, pts, raf;
    const init = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      pts = Array.from({ length: 45 }, () => ({
        x: Math.random()*W, y: Math.random()*H,
        vx: (Math.random()-.5)*.16, vy: (Math.random()-.5)*.16,
        size: Math.random()*9+6,
        rune: RUNES[Math.floor(Math.random()*RUNES.length)],
        op: Math.random()*.15+.03,
        pulse: Math.random()*Math.PI*2,
        drift: Math.random()*.004+.002,
      }));
    };
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      [[W*.15,H*.25,W*.45,"rgba(168,85,247,0.04)"],[W*.85,H*.7,W*.35,"rgba(0,212,255,0.018)"],[W*.5,H*.5,W*.3,"rgba(168,85,247,0.018)"]].forEach(([x,y,r,c])=>{
        const g=ctx.createRadialGradient(x,y,0,x,y,r);
        g.addColorStop(0,c); g.addColorStop(1,"transparent");
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
      });
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy; p.pulse+=p.drift;
        if(p.x<-30)p.x=W+20; if(p.x>W+30)p.x=-20;
        if(p.y<-30)p.y=H+20; if(p.y>H+30)p.y=-20;
        ctx.font=`${p.size}px serif`;
        ctx.fillStyle=`rgba(168,85,247,${p.op*(.5+.5*Math.sin(p.pulse))})`;
        ctx.fillText(p.rune,p.x,p.y);
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(168,85,247,${(1-d/110)*.025})`;ctx.lineWidth=.5;ctx.stroke();}
      }
      raf=requestAnimationFrame(draw);
    };
    window.addEventListener("resize",init);
    init(); draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",init);};
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
}

export function ProjectVisual({project}) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);
  useEffect(()=>{
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext("2d");
    const rgb=hexToRgb(project.accentColor);
    const resize=()=>{canvas.width=canvas.offsetWidth||260;canvas.height=canvas.offsetHeight||200;};
    const ro=new ResizeObserver(resize); ro.observe(canvas); resize();
    const draw=()=>{
      const W=canvas.width,H=canvas.height,t=tRef.current++;
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle="rgba(6,4,9,0.96)"; ctx.fillRect(0,0,W,H);
      if(project.id==="silverwall"){
        const cx=W/2-10,cy=H/2,rx=W*.32,ry=H*.3;
        const g=ctx.createRadialGradient(cx,cy,0,cx,cy,rx);
        g.addColorStop(0,`rgba(${rgb},.1)`);g.addColorStop(1,"transparent");
        ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
        ctx.strokeStyle=`rgba(${rgb},.2)`;ctx.lineWidth=1.5;
        ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);ctx.stroke();
        ctx.strokeStyle=`rgba(${rgb},.05)`;ctx.lineWidth=12;
        ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);ctx.stroke();
        const a=(t*.007)*Math.PI*2,px=cx+rx*Math.cos(a-Math.PI/2),py=cy+ry*Math.sin(a-Math.PI/2);
        ctx.fillStyle="rgba(225,6,0,.9)";ctx.shadowColor="#e10600";ctx.shadowBlur=8;
        ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);ctx.fill();
        const a2=a+1.1,p2x=cx+rx*Math.cos(a2-Math.PI/2),p2y=cy+ry*Math.sin(a2-Math.PI/2);
        ctx.fillStyle=`rgba(${rgb},.9)`;ctx.shadowColor=project.accentColor;ctx.shadowBlur=6;
        ctx.beginPath();ctx.arc(p2x,p2y,3,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
      } else if(project.id==="the-terminal"){
        const lines=[
          { t: "$ boot --identity pushan", c: "#39FF14" },
          { t: "Initializing...", c: "rgba(138,154,170,.6)" },
          { t: "✓ Memory loaded [147]", c: "rgba(138,154,170,.6)", check: true },
          { t: "✓ Encryption active", c: "rgba(138,154,170,.6)", check: true },
          { t: "$ ls ./projects", c: "#39FF14" },
          { t: "silverwall/ lifesync/", c: "rgba(138,154,170,.6)" },
          { t: "$ open the-terminal/", c: "#39FF14" }
        ];
        const lineTime = 25;
        const vis=Math.floor(t/lineTime);
        ["#ff5f57","#ffbd2e","#28ca41"].forEach((c,i)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(12+i*14,14,3.5,0,Math.PI*2);ctx.fill();});
        ctx.font=`${Math.min(W*.034,10)}px 'Courier New', monospace`;
        lines.forEach((l,i)=>{
          if(i<=vis){
            const charCount = i < vis ? l.t.length : Math.floor((t % lineTime) * (l.t.length / lineTime));
            const text = l.t.slice(0, charCount);
            if(l.check && text.startsWith("✓")){
              ctx.fillStyle="#28ca41"; ctx.fillText("✓", 12, 34+i*15);
              ctx.fillStyle=l.c; ctx.fillText(text.slice(1), 12+ctx.measureText("✓").width, 34+i*15);
            } else {
              ctx.fillStyle=l.c; ctx.fillText(text, 12, 34+i*15);
            }
          }
        });
        if(vis<lines.length && t%30<15){
          const curr = lines[vis];
          const charCount = Math.floor((t % lineTime) * (curr.t.length / lineTime));
          ctx.fillStyle="#a855f7"; 
          ctx.fillRect(12+ctx.measureText(curr.t.slice(0, charCount)).width, 34+vis*15-8, 5, 10);
        }
      } else if(project.id==="webtoon-redesign"){
        ctx.strokeStyle=`rgba(${rgb},.15)`;ctx.lineWidth=1;
        for(let i=0;i<6;i++){const y=20+i*30;ctx.beginPath();ctx.moveTo(10,y);ctx.lineTo(W-10,y);ctx.stroke();}
        const shift=(t*.4)%(W-20);
        ctx.fillStyle=`rgba(${rgb},.4)`;ctx.beginPath();ctx.roundRect(10+shift,45,W*.3,H*.4,4);ctx.fill();
        ctx.fillStyle=`rgba(${rgb},.1)`;ctx.beginPath();ctx.roundRect(10+shift-W*.35,45,W*.3,H*.4,4);ctx.fill();
        ctx.fillStyle=`rgba(${rgb},.1)`;ctx.beginPath();ctx.roundRect(10+shift+W*.35,45,W*.3,H*.4,4);ctx.fill();
        ctx.fillStyle=project.accentColor;ctx.beginPath();ctx.roundRect(10,10,30,6,2);ctx.fill();
      } else if(project.id==="evolution-atlas"){
        const count=6;
        for(let i=0;i<count;i++){
          const r=30+i*15,a=t*.01+i*.5;
          ctx.strokeStyle=`rgba(${rgb},${.4-i*.06})`;ctx.lineWidth=1;
          ctx.beginPath();ctx.arc(W/2,H/2,r+Math.sin(a)*5,0,Math.PI*2);ctx.stroke();
        }
        ctx.fillStyle=project.accentColor;ctx.beginPath();ctx.arc(W/2,H/2,4,0,Math.PI*2);ctx.fill();
      } else if(project.id==="lifesync"){
        const cx=W/2,cy=H/2;
        ctx.fillStyle=`rgba(${rgb},.06)`;
        ctx.beginPath();ctx.arc(cx,cy,12,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(${rgb},.3)`;ctx.lineWidth=1;
        ctx.beginPath();ctx.ellipse(cx,cy,W*.3,H*.2,Math.PI/6,0,Math.PI*2);ctx.stroke();
        const a=t*.015,px=cx+Math.cos(a)*W*.3*Math.cos(Math.PI/6)-Math.sin(a)*H*.2*Math.sin(Math.PI/6),py=cy+Math.cos(a)*W*.3*Math.sin(Math.PI/6)+Math.sin(a)*H*.2*Math.cos(Math.PI/6);
        ctx.fillStyle="rgba(255,255,255,.9)";ctx.shadowColor="#fff";ctx.shadowBlur=5;
        ctx.beginPath();ctx.arc(px,py,3,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
      } else if(project.id==="svg-forge"){
        ctx.strokeStyle=`rgba(${rgb},.7)`;ctx.lineWidth=2;ctx.setLineDash([6,3]);
        ctx.beginPath();ctx.moveTo(W*.06,H*.85);ctx.bezierCurveTo(W*.3,H*.1,W*.55,H*.9,W*.94,H*.2);ctx.stroke();
        ctx.setLineDash([]);ctx.strokeStyle=`rgba(${rgb},.28)`;ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(W*.1,H*.95);ctx.bezierCurveTo(W*.35,H*.2,W*.6,H*.85,W*.9,H*.15);ctx.stroke();
        [[W*.06,H*.85],[W*.94,H*.2],[W*.5,H*.5]].forEach(([x,y])=>{
          ctx.fillStyle=`rgba(${rgb},.9)`;ctx.shadowColor=project.accentColor;ctx.shadowBlur=8;
          ctx.beginPath();ctx.arc(x,y,4.5,0,Math.PI*2);ctx.fill();
        });ctx.shadowBlur=0;
      }
      rafRef.current=requestAnimationFrame(draw);
    };
    rafRef.current=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(rafRef.current);ro.disconnect();};
  },[project.id]);
  return <canvas ref={ref} style={{width:"100%",height:"100%",display:"block"}}/>;
}
