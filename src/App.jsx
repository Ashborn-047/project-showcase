import { useState, useEffect, useRef, useCallback } from "react";

const RUNES = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ".split("");

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "255,255,255";
}

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, w };
}

const STATUS_MAP = {
  live:          { label: "LIVE",        color: "#00FFB3" },
  "in-progress": { label: "IN PROGRESS", color: "#F59E0B" },
  "case-study":  { label: "CASE STUDY",  color: "#A78BFA" },
  archived:      { label: "ARCHIVED",    color: "#6B7280" },
};

const PROJECTS = [
  {
    id: "silverwall", title: "SilverWall",
    category: ["UI Design","Live Data","Systems"], status: "live", year: 2024,
    shortDescription: "Engineering-grade F1 telemetry dashboard. Real-time car positions, live race leaderboards, sector timing, and driver analytics — all within a custom design system.",
    fullDescription: "SilverWall is a full-stack F1 telemetry platform built to solve a real problem: existing F1 dashboards are cluttered, slow, and designed for broadcast — not engineers. The goal was mission control aesthetics: dense with information, architecturally calm. Every panel is a self-contained data unit. Every interaction is deliberate.",
    tags: ["Figma","React UI","TypeScript","TailwindCSS","FastAPI","WebSockets","Supabase"],
    links: { live: null, github: null, caseStudy: null }, accentColor: "#00FFB3",
    tech: [
      { name: "React + TypeScript", role: "Component architecture for the dashboard grid. Each telemetry panel subscribes to its own data slice independently.", badge: "Frontend" },
      { name: "WebSockets", role: "Real-time pipe from FastAPI backend. Sub-100ms latency for live car position and sector timing updates during a race.", badge: "Realtime" },
      { name: "FastAPI", role: "Python backend handling Ergast API integration, data normalization, and WebSocket broadcast to all connected clients.", badge: "Backend" },
      { name: "Supabase", role: "Stores historical race data, lap records, and driver season stats. Powers leaderboard and comparison views.", badge: "Database" },
      { name: "Figma", role: "Full design system built before a single line of code — token-based color scales, component library, and responsive grid spec.", badge: "Design" },
    ],
    usecases: [
      { title: "Live Race Monitoring", desc: "Track all 20 cars simultaneously on a circuit map with real-time gap intervals and sector splits. Built for fans who want engineer-level data." },
      { title: "Post-Race Analysis", desc: "Compare any two drivers across a full Grand Prix — lap-by-lap delta, tire strategy overlay, and pit stop impact visualization." },
      { title: "Season Standings", desc: "Dynamic championship table updating after each race weekend with points projection and gap-to-leader calculations." },
    ],
    built: ["Custom design system with 40+ reusable components and a token-based color scale","WebSocket room architecture supporting multiple concurrent race sessions","Circuit map renderer using SVG path interpolation from GPS coordinate data","Lap delta chart with animated playback scrubbing","Mobile-responsive layout that preserves data density"],
    metrics: [{ val: "<100ms", label: "WS latency" },{ val: "40+", label: "Components" },{ val: "20", label: "Cars tracked" },{ val: "3", label: "Race views" }],
  },
  {
    id: "terminal-os", title: "Terminal OS",
    category: ["Experience Design","Interaction"], status: "live", year: 2024,
    shortDescription: "A portfolio reimagined as a personal OS — navigated entirely through a terminal interface. Identity rendering, memory archives, encrypted comms, project dossiers.",
    fullDescription: "Terminal OS started as a question: what if a portfolio wasn't a page, but an operating system? Every interaction is a command. Every section is a filesystem path. The aesthetic is deliberate — a total rejection of the scroll-and-section format that every developer portfolio shares.",
    tags: ["React","TypeScript","Framer Motion","CLI UI","Remix"],
    links: { live: null, github: null, caseStudy: null }, accentColor: "#39FF14",
    tech: [
      { name: "React + Remix", role: "Server-side rendering for fast initial load, then full client-side interactivity. Each directory maps to a Remix route.", badge: "Framework" },
      { name: "TypeScript", role: "Full type safety on command parsing — every registered command has a typed signature, argument validator, and output renderer.", badge: "Language" },
      { name: "Framer Motion", role: "Orchestrates typewriter output animation, cursor blink, and screen flicker effects without fighting React's render cycle.", badge: "Animation" },
      { name: "Custom CLI Engine", role: "Hand-built command parser supporting flags, piped commands, history navigation, and tab completion.", badge: "Core" },
    ],
    usecases: [
      { title: "Developer Audience", desc: "Immediately signals technical depth. Building a terminal emulator in React is the portfolio as proof of work, not just proof of taste." },
      { title: "Encrypted Contact", desc: "The contact system uses a fake PGP-style encryption UX — type a message, watch it encrypt, send it. Theater, but memorable theater." },
      { title: "Project Dossiers", desc: "Each project lives at a filesystem path. cd /projects/silverwall opens a structured dossier with specs, screenshots, and links." },
    ],
    built: ["Hand-built CLI parser with command registry, flags, and piped output","Typewriter animation engine with variable speed based on output type","Filesystem abstraction layer mapping React routes to terminal paths","Tab completion using prefix matching against the command registry","Mobile fallback with touch-friendly command drawer"],
    metrics: [{ val: "30+", label: "Commands" },{ val: "0", label: "CLI deps" },{ val: "∞", label: "Easter eggs" }],
  },
  {
    id: "webtoon-redesign", title: "Webtoon Redesign",
    category: ["UX Strategy","Platform Redesign"], status: "case-study", year: 2024,
    shortDescription: "Full UX deconstruction and redesign of Webtoon's web platform. Modular homepage, creator visibility system, and improved discovery flow.",
    fullDescription: "Webtoon has a discovery problem. With 80M+ monthly readers, the platform's web experience still feels like 2015. This case study is a full UX audit and redesign — not a visual refresh, but a structural rethinking of how users find content and how creators get visibility against established titles.",
    tags: ["UX Research","Figma","React","TypeScript","Prototyping"],
    links: { live: null, github: null, caseStudy: null }, accentColor: "#FF4D6D",
    tech: [
      { name: "Figma", role: "Full redesign — component library, auto-layout grids, interactive prototype for usability testing, and a dev-ready design spec.", badge: "Design" },
      { name: "UX Research", role: "5 user interviews, competitive analysis of Tapas, Naver, and Lezhin, and a heuristic evaluation against Nielsen's 10 principles.", badge: "Research" },
      { name: "React Prototype", role: "High-fidelity interactive prototype to test the new discovery algorithm and homepage module behavior with real scroll physics.", badge: "Prototype" },
    ],
    usecases: [
      { title: "Creator Visibility", desc: "The algorithm buries new creators under established titles. Redesign introduces a Rising tier with editorial curation and genre spotlights." },
      { title: "Improved Discovery", desc: "Replaced single-scroll homepage with a modular feed — users see different layouts based on reading history and genre preferences." },
      { title: "Web-Native Reading", desc: "Reading experience was a direct port of the mobile app. Redesigned for horizontal viewport with keyboard navigation and progress persistence." },
    ],
    built: ["Full Figma component library with 60+ components across 3 breakpoints","Interactive prototype demonstrating the new discovery algorithm behavior","Annotated UX spec covering interaction patterns and edge cases","Competitive analysis report with gap mapping","Usability test script and synthesized findings from 5 participants"],
    metrics: [{ val: "80M+", label: "Monthly readers" },{ val: "5", label: "Interviews" },{ val: "60+", label: "Figma components" },{ val: "3", label: "Breakpoints" }],
  },
  {
    id: "evolution-atlas", title: "Evolution Atlas",
    category: ["Data Visualization","Editorial UI"], status: "in-progress", year: 2025,
    shortDescription: "Interactive data visualization mapping evolutionary relationships and timelines. Cinematic UI with animated data structures built for exploration and storytelling.",
    fullDescription: "Evolution Atlas is a data storytelling project — making the 4-billion-year history of life on Earth explorable and emotionally resonant. The core technical challenge: rendering a phylogenetic tree with hundreds of nodes at 60fps while supporting cinematic transitions between geological eras.",
    tags: ["D3.js","React","TypeScript","3D Animation","WebGL"],
    links: { live: null, github: null, caseStudy: null }, accentColor: "#7C3AED",
    tech: [
      { name: "D3.js", role: "Force-directed graph layout for the phylogenetic tree. Custom force functions prevent node overlap while maintaining biological clustering.", badge: "Visualization" },
      { name: "React", role: "Manages timeline state, era transitions, and the detail panel on node selection. D3 and React own separate DOM subtrees.", badge: "Framework" },
      { name: "WebGL / Three.js", role: "Background particle system representing geological time — each particle is a rendered era, animated by the active timeline position.", badge: "3D" },
      { name: "TypeScript", role: "Strict typing on the evolutionary data model — species, relationships, timestamps, and extinction events all validated against schema.", badge: "Language" },
    ],
    usecases: [
      { title: "Educational Exploration", desc: "Navigate from the origins of life through mass extinction events to modern species — all in one continuous interactive space." },
      { title: "Research Reference", desc: "Query the dataset for specific clades, filter by geological era, and export subgraphs for papers and presentations." },
      { title: "Storytelling Mode", desc: "A guided story mode narrates key moments in evolutionary history with cinematic camera moves and time-lapse era transitions." },
    ],
    built: ["Custom D3 force simulation with biological clustering constraints","Era transition system with morphing graph layouts and animated node paths","Species detail panel pulling from a structured JSON dataset of 400+ entries","Timeline scrubber with geological era markers and extinction annotations","WebGL particle background synchronized to the active era"],
    metrics: [{ val: "400+", label: "Species nodes" },{ val: "60fps", label: "Target render" },{ val: "4B yrs", label: "Timeline span" }],
  },
  {
    id: "lifesync", title: "LifeSync",
    category: ["Product Design","AI System"], status: "in-progress", year: 2025,
    shortDescription: "AI-powered personal OS. Behavioral analytics, adaptive user personas, cross-platform automation, and a full design system — unifying fragmented digital life.",
    fullDescription: "LifeSync is the most ambitious project here — a personal operating system powered by behavioral AI. Your digital life is fragmented across dozens of apps. LifeSync is the coherence layer. It learns your patterns, surfaces insights, and automates the connective tissue between tools you already use.",
    tags: ["Figma","Design System","React","TypeScript","FastAPI","LLM Integration"],
    links: { live: null, github: null, caseStudy: null }, accentColor: "#F59E0B",
    tech: [
      { name: "Figma Design System", role: "120+ component library with token-based theme system supporting light and dark modes. Built to scale across mobile, tablet, desktop.", badge: "Design" },
      { name: "React + TypeScript", role: "Frontend shell with plugin architecture — each integrated service renders into a standardized card with a consistent data contract.", badge: "Frontend" },
      { name: "FastAPI + LLM", role: "Backend orchestration: receives behavioral events, runs pattern analysis via LLM, generates personalized insight summaries and automation suggestions.", badge: "AI Backend" },
      { name: "Cross-platform Sync", role: "Webhook integrations with Notion, Google Calendar, Spotify, and GitHub. All events normalized into a single activity stream.", badge: "Integration" },
    ],
    usecases: [
      { title: "Daily Briefing", desc: "Every morning, LifeSync generates a personalized briefing — calendar context, tasks ranked by behavioral priority, and a focus recommendation." },
      { title: "Behavioral Patterns", desc: "Tracks when you're most productive, what music correlates with deep work, which task types you consistently defer — surfaces it as actionable cards." },
      { title: "Automation Suggestions", desc: "Notices you manually move every GitHub issue to Notion after merging — suggests and builds that automation with one tap." },
    ],
    built: ["120+ component Figma design system with token-based theming","Plugin architecture allowing new service integrations without core changes","LLM-powered pattern analysis pipeline with structured output schemas","Behavioral event stream normalizer across 4 integrated platforms","Adaptive persona engine that shifts UI density based on detected focus state"],
    metrics: [{ val: "120+", label: "DS components" },{ val: "4", label: "Integrations" },{ val: "1", label: "Coherence layer" }],
  },
  {
    id: "svg-forge", title: "SVG Forge",
    category: ["SVG","Animation Lab"], status: "live", year: 2024,
    shortDescription: "Zero-dependency SVG animation laboratory. Stroke draw-ons, shape morphing, glitch scramble, turbulence distortion, glow pulse — all live and editable.",
    fullDescription: "SVG Forge is a sandbox for pushing what is possible with pure SVG and CSS — no canvas, no WebGL, no JS animation libraries. Every effect is driven by SVG filters, SMIL animations, or CSS keyframes. It started as a personal reference tool and became a public laboratory.",
    tags: ["HTML5","CSS3","Vanilla JS","SVG SMIL","SVG Filters","Zero Deps"],
    links: { live: null, github: null, caseStudy: null }, accentColor: "#06B6D4",
    tech: [
      { name: "SVG Filters", role: "The core of every effect — feTurbulence for distortion, feGaussianBlur + feComposite for glow, feColorMatrix for glitch color shifts.", badge: "Core" },
      { name: "SMIL Animations", role: "Declarative SVG animations for stroke draw-on, shape morphing, and attribute interpolation — all in markup, no JS.", badge: "Animation" },
      { name: "CSS Keyframes", role: "Handles timing orchestration for multi-step effects and pulse/flicker loops that SMIL cannot express cleanly.", badge: "Styling" },
      { name: "Vanilla JS", role: "Powers the live editor — parsing input, regenerating SVG markup, and updating the preview in real time. Zero framework overhead.", badge: "Editor" },
    ],
    usecases: [
      { title: "Developer Reference", desc: "A living reference for SVG filter primitives and SMIL syntax — the thing you bookmark when deep in a CSS animation rabbit hole." },
      { title: "Design Prototyping", desc: "Designers tweak turbulence frequency, blur radius, and color matrices live and export the exact SVG markup to drop into their project." },
      { title: "Learning Resource", desc: "Every effect has its SVG markup exposed in an editable panel. Change a value, see it update instantly — the fastest way to understand feTurbulence." },
    ],
    built: ["12 distinct SVG animation effects with isolated markup and live controls","Live editor with real-time SVG regeneration and syntax-highlighted output panel","Export function generating clean minimal SVG files with no inline scripts","Zero-dependency architecture — the entire tool is a single HTML file","Filter primitive documentation panel with MDN-linked property references"],
    metrics: [{ val: "12", label: "Effects" },{ val: "0", label: "Dependencies" },{ val: "1", label: "HTML file" },{ val: "∞", label: "Combinations" }],
  },
];

function RuneCanvas() {
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

function ProjectVisual({project}) {
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
      } else if(project.id==="terminal-os"){
        const lines=["$ boot --identity pushan","Initializing...","✓ Memory loaded [147]","✓ Encryption active","$ ls ./projects","silverwall/ lifesync/","$ open silverwall/"];
        const vis=Math.floor(t/18);
        ["#ff5f57","#ffbd2e","#28ca41"].forEach((c,i)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(12+i*14,14,3.5,0,Math.PI*2);ctx.fill();});
        ctx.font=`${Math.min(W*.034,10)}px 'Courier New'`;
        lines.slice(0,Math.min(vis,lines.length)).forEach((l,i)=>{
          ctx.fillStyle=l.startsWith("$")?"#a78bfa":l.startsWith("✓")?"#4ade80":"rgba(138,154,170,.6)";
          ctx.fillText(l,12,32+i*Math.min(H*.12,16));
        });
      } else if(project.id==="webtoon-redesign"){
        [[.06,"255,107,107","BEFORE"],[.38,"0,212,255","REDESIGN"],[.68,rgb,"SYSTEM"]].forEach(([xf,c,label],ci)=>{
          const bx=xf*W,bw=W*.27,by=16+ci*14,bh=H-36-ci*14;
          ctx.fillStyle=`rgba(${c},.04)`;ctx.fillRect(bx,by,bw,bh);
          ctx.strokeStyle=`rgba(${c},.15)`;ctx.lineWidth=1;ctx.strokeRect(bx,by,bw,bh);
          ctx.fillStyle=`rgba(${c},.8)`;ctx.font="7px monospace";ctx.fillText(label,bx+6,by+13);
          for(let r=0;r<3;r++){ctx.fillStyle=`rgba(${c},${.12-r*.03})`;ctx.fillRect(bx+6,by+18+r*9,bw-12,4);}
        });
      } else if(project.id==="evolution-atlas"){
        const cx=W/2,cy=H/2;
        const g=ctx.createRadialGradient(cx,cy,0,cx,cy,W*.4);
        g.addColorStop(0,`rgba(${rgb},.12)`);g.addColorStop(1,"transparent");
        ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
        [.22,.34,.46].forEach((fr,i)=>{
          ctx.strokeStyle=`rgba(${rgb},${.35-i*.1})`;ctx.lineWidth=i===0?1.5:.8;
          ctx.beginPath();ctx.arc(cx,cy,W*fr,0,Math.PI*2);ctx.stroke();
        });
        ctx.fillStyle=`rgba(${rgb},.9)`;ctx.shadowColor=project.accentColor;ctx.shadowBlur=10;
        ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fill();
        [0,90,180,270].forEach((angle,i)=>{
          const r=W*.34,a=angle*Math.PI/180+t*.008;
          ctx.fillStyle=`rgba(${rgb},${.5+.3*Math.sin(t/12+i)})`;
          ctx.beginPath();ctx.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),2.5,0,Math.PI*2);ctx.fill();
        });ctx.shadowBlur=0;
      } else if(project.id==="lifesync"){
        const bars=[{l:"Behavioral",f:78},{l:"Personas",f:64},{l:"Sync",f:91}];
        const bh=Math.min(H*.22,38),gap=10,tot=bars.length*(bh+gap)-gap,sy=(H-tot)/2;
        bars.forEach((b,i)=>{
          const y=sy+i*(bh+gap);
          ctx.fillStyle=`rgba(${rgb},.05)`;ctx.fillRect(12,y,W-24,bh);
          ctx.strokeStyle=`rgba(${rgb},.14)`;ctx.lineWidth=1;ctx.strokeRect(12,y,W-24,bh);
          ctx.fillStyle=`rgba(${rgb},.7)`;ctx.font="8px monospace";ctx.fillText(b.l,20,y+13);
          const tw=W-44,ty2=y+bh-10;
          ctx.fillStyle="rgba(255,255,255,.05)";ctx.fillRect(20,ty2,tw,3);
          const lg=ctx.createLinearGradient(20,0,20+tw*(b.f/100),0);
          lg.addColorStop(0,`rgba(${rgb},.6)`);lg.addColorStop(1,`rgba(${rgb},.9)`);
          ctx.fillStyle=lg;ctx.fillRect(20,ty2,tw*(b.f/100),3);
          ctx.fillStyle=`rgba(${rgb},.8)`;ctx.font="8px monospace";ctx.fillText(`${b.f}%`,W-28,y+26);
        });
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

function StatusBadge({status,small=false}){
  const st=STATUS_MAP[status];
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:small?8:9,letterSpacing:"0.1em",padding:small?"2px 7px":"3px 9px",background:`rgba(${hexToRgb(st.color)},.1)`,flexShrink:0,fontFamily:"'Courier New',monospace"}}>
      <span style={{width:small?4:5,height:small?4:5,borderRadius:"50%",background:st.color,display:"inline-block",flexShrink:0}}/>
      <span style={{color:st.color}}>{st.label}</span>
    </span>
  );
}

function ProjectCard({project,index,onOpen,isMobile}){
  const [hov,setHov]=useState(false);
  const rgb=hexToRgb(project.accentColor);
  return(
    <div
      onClick={()=>onOpen(project)}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        display:"grid",
        gridTemplateColumns:isMobile?"1fr":"260px 1fr",
        gridTemplateRows:isMobile?"180px auto":undefined,
        minHeight:isMobile?"auto":230,
        border:`1px solid ${hov?`rgba(${rgb},.3)`:"rgba(255,255,255,.05)"}`,
        background:hov?`rgba(${rgb},.022)`:"rgba(255,255,255,.012)",
        cursor:"pointer",position:"relative",overflow:"hidden",
        transition:"border-color .3s,background .3s",
      }}
    >
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 60% 80% at ${isMobile?"50% 0%":"0% 50%"},rgba(${rgb},.05),transparent)`,opacity:hov?1:0,transition:"opacity .4s",pointerEvents:"none"}}/>
      <div style={{borderRight:isMobile?"none":"1px solid rgba(255,255,255,.05)",borderBottom:isMobile?"1px solid rgba(255,255,255,.05)":"none",position:"relative",overflow:"hidden",height:isMobile?180:"auto"}}>
        <ProjectVisual project={project}/>
      </div>
      <div style={{padding:isMobile?"18px 16px 22px":"28px 32px",display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:10}}>
          <span style={{fontSize:isMobile?8:9,letterSpacing:"0.12em",color:"rgba(168,85,247,.7)",lineHeight:1.4}}>
            {project.category.join(" · ").toUpperCase()}
          </span>
          <StatusBadge status={project.status} small={isMobile}/>
        </div>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:isMobile?19:24,fontWeight:400,color:"#e8edf2",marginBottom:8,letterSpacing:"-0.01em",lineHeight:1.2}}>
          {project.title}
        </h2>
        <p style={{fontSize:12,lineHeight:1.7,color:"rgba(138,154,170,.75)",marginBottom:14,flex:1}}>
          {project.shortDescription}
        </p>
        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>
          {project.tags.slice(0,isMobile?3:project.tags.length).map(t=>(
            <span key={t} style={{fontSize:9,letterSpacing:"0.08em",color:"rgba(138,154,170,.5)",background:"rgba(255,255,255,.03)",padding:"3px 8px",border:"1px solid rgba(255,255,255,.05)"}}>
              {t}
            </span>
          ))}
          {isMobile&&project.tags.length>3&&(
            <span style={{fontSize:9,color:"rgba(138,154,170,.3)",padding:"3px 6px"}}>+{project.tags.length-3}</span>
          )}
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <span style={{fontSize:9,letterSpacing:"0.12em",color:`rgba(${rgb},.8)`,opacity:isMobile?1:hov?1:0,transform:(isMobile||hov)?"translateX(0)":"translateX(-6px)",transition:"all .25s",fontFamily:"'Courier New',monospace"}}>
            VIEW DETAILS →
          </span>
        </div>
      </div>
      <div style={{position:"absolute",bottom:14,right:16,fontSize:10,color:"rgba(255,255,255,.06)",letterSpacing:"0.1em",fontFamily:"'Courier New',monospace"}}>
        0{index+1}
      </div>
    </div>
  );
}

function Section({label,children,mt=0}){
  return(
    <div style={{marginBottom:40,marginTop:mt}}>
      <div style={{fontSize:9,letterSpacing:"0.22em",color:"rgba(168,85,247,.5)",marginBottom:18,paddingBottom:10,borderBottom:"1px solid rgba(255,255,255,.04)",fontFamily:"'Courier New',monospace"}}>
        {label}
      </div>
      {children}
    </div>
  );
}

function DetailOverlay({project,onClose,isMobile}){
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
  const st=p?STATUS_MAP[p.status]:null;
  const sidePad=isMobile?"18px":"44px";

  return(
    <div style={{position:"fixed",inset:0,zIndex:500,pointerEvents:open?"all":"none"}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(6,4,9,.82)",backdropFilter:"blur(10px)",opacity:open?1:0,transition:"opacity .4s"}}/>
      <div style={{
        position:"absolute",bottom:0,left:0,right:0,
        height:isMobile?"96vh":"92vh",
        background:"#080511",
        borderTop:p?`1px solid rgba(${rgb},.25)`:"1px solid rgba(168,85,247,.2)",
        transform:open?"translateY(0)":"translateY(100%)",
        transition:"transform .45s cubic-bezier(.16,1,.3,1)",
        display:"flex",flexDirection:"column",overflow:"hidden",
      }}>
        {/* top bar */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:`14px ${sidePad}`,borderBottom:"1px solid rgba(255,255,255,.05)",flexShrink:0,gap:12}}>
          <span style={{fontSize:isMobile?9:10,letterSpacing:"0.14em",color:"rgba(138,154,170,.4)",fontFamily:"'Courier New',monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
            PROJECTS {p&&<>/ <span style={{color:"rgba(168,85,247,.8)"}}>{p.title.toUpperCase()}</span></>}
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
                  <div style={{fontSize:9,letterSpacing:"0.2em",color:"rgba(168,85,247,.6)",marginBottom:12,fontFamily:"'Courier New',monospace"}}>
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
