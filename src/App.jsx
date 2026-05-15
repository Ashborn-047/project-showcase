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
    id: "webtoon-redesign", title: "Webtoon Ecosystem Redesign",
    category: ["Frontend Architecture", "UX Transformation"], status: "case-study", year: 2025,
    shortDescription: "A strategic UX transformation of Webtoon's web platform, featuring a modular homepage, enhanced profile management, and a robust Canvas creator discovery engine.",
    fullDescription: "This project is a comprehensive UX demonstration prototype of the Webtoon platform built with Next.js and Tailwind CSS. It prioritizes aesthetic fidelity, behavioral depth, and storytelling polish. Key features include a fully collapsible navigation rail, an enhanced homepage with personalized recommendations and progress indicators, and dedicated profile and creator discovery pages. The UI replaces static lists with dynamic, responsive grid layouts to balance editorial curation with algorithmic discovery.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Radix UI"],
    links: { live: "https://ashborn-047.github.io/Webtoon-Ecosystem-Platform-Redesign-/", github: "https://github.com/Ashborn-047/Webtoon-Ecosystem-Platform-Redesign-", caseStudy: null }, accentColor: "#00DC64",
    tech: [
      { name: "Next.js & React", role: "Leveraged the App Router and React hooks for a robust, performant foundation with static export capabilities.", badge: "Framework" },
      { name: "Tailwind & Radix UI", role: "Built a highly accessible, responsive design system emphasizing 'Webtoon Green' and soft UI aesthetics.", badge: "UI/UX" },
      { name: "Zustand", role: "Managed complex cross-component state, specifically for the collapsible navigation and user progress tracking.", badge: "State" },
    ],
    usecases: [
      { title: "Collapsible Navigation Rail", desc: "A smooth sidebar with logo toggle and 300ms transition animations, maintaining visual hierarchy across devices." },
      { title: "Enhanced Homepage", desc: "Features a hero carousel, 'Continue Reading' sections with progress bars, and daily updates filterable by day of the week." },
      { title: "Creator Discovery", desc: "Includes dedicated Canvas sections, creator activity feeds, and refined follow mechanisms to boost indie visibility." },
    ],
    built: ["Responsive Next.js application tailored for mobile, tablet, and desktop viewports","Complex UI state management using Zustand and custom hooks","Aesthetic layout using Radix UI primitives and Tailwind utility classes","Automated GitHub Pages deployment pipeline using GitHub Actions"],
    metrics: [{ val: "Next 14", label: "App Router" },{ val: "Tailwind", label: "Styling" },{ val: "Zustand", label: "State Layer" },{ val: "Radix", label: "Primitives" }],
  },
  {
    id: "silverwall", title: "SilverWall Telemetry",
    category: ["Frontend Architecture", "Real-Time Data"], status: "in-progress", year: 2024,
    shortDescription: "A live F1 telemetry dashboard featuring real-time car tracking on dynamic circuit maps, instant leaderboard updates, and driver data visualization.",
    fullDescription: "SilverWall is a high-performance telemetry interface built to ingest and visualize live Formula 1 race data. Designed with strict 'mission control' aesthetics, it strips away visual noise to deliver incredibly dense, actionable data. It integrates with the OpenF1 API via a FastAPI Python backend, pushing sub-second updates to a responsive React frontend interface.",
    tags: ["React", "FastAPI", "Python", "TailwindCSS", "OpenF1 API", "WebSockets", "Data Visualization"],
    links: { live: "https://ashborn-047.github.io/silverwall/", github: "https://github.com/Ashborn-047/silverwall", caseStudy: null }, accentColor: "#00FFB3",
    tech: [
      { name: "React + Tailwind", role: "Architected a highly decoupled component grid where individual telemetry panels manage their own real-time state independently.", badge: "Frontend" },
      { name: "FastAPI", role: "Built a robust Python backend that ingests OpenF1 API data, normalizes it, and broadcasts to the connected frontend clients.", badge: "Backend" },
      { name: "Simulation Engine", role: "Developed a demo mode with simulated race data to allow the dashboard to be fully interactive even outside of active race weekends.", badge: "Testing" },
      { name: "SVG Interpolation", role: "Renders real-time GPS coordinates directly onto dynamically generated SVG circuit maps.", badge: "Graphics" },
    ],
    usecases: [
      { title: "Live Race Tracking", desc: "Monitor all 20 cars simultaneously on a dynamic circuit map with real-time interval gaps and sector splits." },
      { title: "Driver Analytics Engine", desc: "Perform deep post-race comparisons with lap-by-lap delta charts and strategic impact visualizations." },
      { title: "Demo Mode Availability", desc: "Allows recruiters and users to experience the live telemetry environment completely offline using simulated session data." },
    ],
    built: ["Custom UI component library completely optimized for extreme high-density data visualization","FastAPI backend bridging the gap between OpenF1 endpoints and client websockets","Live circuit map renderer interpolating complex SVG paths from raw GPS arrays","Simulated race engine for offline demonstration and testing"],
    metrics: [{ val: "<100ms", label: "Latency Target" },{ val: "OpenF1", label: "Data Source" },{ val: "20", label: "Live Entities" },{ val: "3", label: "Data Views" }],
  },
  {
    id: "terminal-os", title: "The Terminal Simulator",
    category: ["System Engineering", "Gamification"], status: "in-progress", year: 2024,
    shortDescription: "A gamified, browser-based Linux terminal simulator featuring a sandboxed Virtual File System, 30+ native commands, and guided learning labs.",
    fullDescription: "The Terminal is an ambitious dive into unconventional web architecture. It is not just a visual gimmick; it is a fully functioning, POSIX-inspired Linux terminal built entirely in React. Users can navigate a deeply sandboxed Virtual File System, run over 30 interactive commands (including pipes and flags), and complete guided gamified labs to master Linux from the inside out.",
    tags: ["React", "TypeScript", "VFS", "OS Simulation", "Framer Motion", "Gamification"],
    links: { live: "https://ashborn-047.github.io/the-terminal/", github: "https://github.com/Ashborn-047/the-terminal", caseStudy: null }, accentColor: "#39FF14",
    tech: [
      { name: "React Ecosystem", role: "Leveraged React's component model to build a highly responsive, state-driven terminal emulator with strict render constraints.", badge: "Framework" },
      { name: "Virtual File System", role: "Implemented a robust, completely sandboxed VFS in memory, allowing users to safely create, read, and delete directories.", badge: "Architecture" },
      { name: "Framer Motion", role: "Crafted subtle typewriter effects, blinking cursors, and authentic Neo-Brutalist screen transitions to deeply enhance immersion.", badge: "Animation" },
      { name: "Custom CLI Parser", role: "Developed an entirely bespoke parser to handle piped commands, history traversal, complex flag parsing, and directory state management.", badge: "Core" },
    ],
    usecases: [
      { title: "Interactive Exploration", desc: "Encourages users to engage natively, using standard POSIX commands like `cd`, `ls`, and `cat` to discover content." },
      { title: "Educational Labs", desc: "Includes integrated, gamified tutorials that guide users through complex Linux concepts in a safe, browser-based environment." },
      { title: "Gamified Progression", desc: "Users earn XP and unlock levels by successfully executing commands and completing hidden puzzle objectives.", },
    ],
    built: ["Robust command parser fully supporting arguments, flags, and advanced command chaining","Virtual filesystem state manager seamlessly syncing with React's concurrent render lifecycle","Typewriter animation engine heavily calibrated for variable and natural read speeds","A fully featured gamification loop tracking user XP and command proficiency"],
    metrics: [{ val: "30+", label: "Native Commands" },{ val: "VFS", label: "Architecture" },{ val: "POSIX", label: "Compliance" }],
  },
  {
    id: "evolution-atlas", title: "Evolution Atlas",
    category: ["Creative Computation", "Digital Museum"], status: "live", year: 2024,
    shortDescription: "A curated digital museum of Interface Design. An interactive showcase exploring how UI/UX, typography, and shaders have transformed across decades.",
    fullDescription: "Evolution Atlas is an interactive journey through the history of digital design. It features 7 meticulously curated experiments that trace the evolution of interfaces—from static tools to ambient computing. The project combines kinetic typography, liquid shaders, and advanced color theory systems to create a deeply immersive, educational experience about the medium we use every day.",
    tags: ["React", "Three.js", "WebGL", "GSAP", "Creative Coding", "Shaders"],
    links: { live: "https://ashborn-047.github.io/evolution-atlas/", github: "https://github.com/Ashborn-047/evolution-atlas", caseStudy: null }, accentColor: "#7C3AED",
    tech: [
      { name: "Three.js + WebGL", role: "Powers the highly complex background environments, including custom liquid shaders and particle-based time representations.", badge: "3D Graphics" },
      { name: "GSAP", role: "Orchestrates buttery-smooth, cinematic timeline animations for kinetic typography and era transitions.", badge: "Animation" },
      { name: "React", role: "Manages the overarching application state, route transitions, and the deeply interactive exhibit panels.", badge: "Framework" },
      { name: "Shader Programming", role: "Written custom GLSL shaders to simulate organic, fluid interfaces that react in real-time to user input.", badge: "Core" },
    ],
    usecases: [
      { title: "Design Education", desc: "Serves as an interactive textbook for young designers to understand the historical context of modern UX paradigms." },
      { title: "Shader Exploration", desc: "Provides an isolated environment to study the performance characteristics of complex fragment shaders on the web." },
      { title: "Cinematic Showcase", desc: "Acts as a technical flex, demonstrating the absolute limits of browser-based real-time rendering and GSAP orchestration." },
    ],
    built: ["Seven entirely distinct, deeply interactive experiments representing different eras of UI design","Custom-tuned liquid fragment shaders capable of hitting 60fps on mobile devices","Complex GSAP timelines perfectly synchronized with WebGL camera pans","A robust, accessible React shell wrapping deeply experimental canvas contexts"],
    metrics: [{ val: "7", label: "Curated Exhibits" },{ val: "60fps", label: "Render Target" },{ val: "WebGL", label: "Rendering Core" }],
  },
  {
    id: "svg-forge", title: "SVG Forge",
    category: ["Creative Coding", "Developer Tooling"], status: "live", year: 2024,
    shortDescription: "An interactive animation lab for mastering pure SVG techniques. Live previews, real-time parameter tweaking, editable code, and zero dependencies.",
    fullDescription: "Born from the frustration of bloated animation libraries, SVG Forge is a pure, unadulterated sandbox for vector manipulation. It relies entirely on native SVG filters, declarative SMIL animations, and CSS keyframes—bypassing external dependencies entirely. It features live previews and step-by-step tutorials, making it the ultimate tool for developers looking to master low-level SVG graphics.",
    tags: ["SVG SMIL", "SVG Filters", "Vanilla JS", "Zero Dependencies", "CSS3", "Interactive Tutorials"],
    links: { live: "https://ashborn-047.github.io/svg-forge/", github: "https://github.com/Ashborn-047/svg-forge", caseStudy: null }, accentColor: "#06B6D4",
    tech: [
      { name: "Advanced SVG Filters", role: "Exploits low-level primitives like `feTurbulence` for distortion, `feColorMatrix` for glitches, and `feDisplacementMap` for fluid liquid effects.", badge: "Core" },
      { name: "Native SMIL Animations", role: "Utilizes highly performant native declarative syntax for complex path morphing and stroke orchestration without relying on heavy JavaScript loops.", badge: "Animation" },
      { name: "CSS Keyframes", role: "Handles intricate macro-timing and infinite loop orchestration where standard SMIL falls short.", badge: "Styling" },
      { name: "Vanilla JS Engine", role: "Drives the live-editing interface, parsing user input and regenerating complex DOM nodes instantaneously with absolutely zero framework overhead.", badge: "Editor" },
    ],
    usecases: [
      { title: "Rapid Visual Prototyping", desc: "Designers can visually tweak turbulence frequencies and color matrices in real-time, instantly exporting production-ready markup." },
      { title: "Interactive Tutorials", desc: "Acts as an interactive textbook for highly obscure SVG primitives, guiding the user step-by-step through complex filter chains." },
      { title: "Lightweight Asset Generation", desc: "Creates incredibly lightweight, resolution-independent glitch and glow effects that vastly outperform traditional raster assets." },
    ],
    built: ["A dedicated suite of highly customizable, deeply isolated SVG animation templates","A pure zero-dependency live code editor featuring instant visual feedback loops","A robust step-by-step tutorial engine teaching low-level SMIL and filter concepts","Interactive, comprehensive documentation for highly complex filter primitives"],
    metrics: [{ val: "100%", label: "Native Markup" },{ val: "0", label: "Dependencies" },{ val: "Live", label: "Editing Env" }],
  },
  {
    id: "solar-core", title: "Solar Core Explorer",
    category: ["Web3D", "Physics Simulation"], status: "live", year: 2024,
    shortDescription: "A high-fidelity, interactive 3D solar system explorer featuring procedural planetary physics, orbital mechanics, and a deep telemetry HUD.",
    fullDescription: "Solar Core Explorer is a robust WebGL simulation modeling planetary bodies with procedural textures, atmospheric scattering, and accurate orbital physics. Beyond being a visual spectacle, it includes a deep telemetry Head-Up Display (HUD) that tracks real-time planetary metrics—orbit velocities, atmospheric composition, and axial tilt—in a beautiful, sci-fi inspired interface.",
    tags: ["Three.js", "WebGL", "Procedural Generation", "Physics", "React", "Shaders"],
    links: { live: "https://ashborn-047.github.io/Solar-Core-Explorer/", github: "https://github.com/Ashborn-047/Solar-Core-Explorer", caseStudy: null }, accentColor: "#EAB308",
    tech: [
      { name: "Three.js", role: "Handles the entire 3D scenegraph, camera controllers, and rendering pipeline for the complex planetary bodies.", badge: "3D Engine" },
      { name: "Procedural Textures", role: "Generates high-resolution surface maps and cloud layers dynamically using noise algorithms, reducing total asset payload.", badge: "Graphics" },
      { name: "Orbital Mechanics", role: "Simulates physically accurate planetary rotations and orbital paths relative to a central light source.", badge: "Physics" },
      { name: "React Telemetry HUD", role: "Overlays the 3D canvas with a highly reactive, sci-fi inspired telemetry dashboard tracking live physics variables.", badge: "Interface" },
    ],
    usecases: [
      { title: "Procedural Exploration", desc: "Fly seamlessly between planetary bodies, observing unique, mathematically generated surface details up close." },
      { title: "Educational Simulation", desc: "View real-time telemetry data regarding orbital speeds and atmospheric composition in an engaging format." },
      { title: "Performance Profiling", desc: "Showcases techniques for managing massive polygon counts and complex shaders while maintaining 60fps in the browser." },
    ],
    built: ["Procedural noise generation engine for mapping planet surfaces and atmospheres","Physically-based rendering (PBR) pipeline optimized for browser environments","Interactive orbital camera system allowing seamless zoom from macro to micro scale","A deep, data-rich telemetry dashboard built in React that syncs with WebGL state"],
    metrics: [{ val: "Procedural", label: "Texturing" },{ val: "60fps", label: "Render Target" },{ val: "WebGL", label: "API Base" }],
  },
  {
    id: "lifesync", title: "LifeSync",
    category: ["AI Orchestration", "Systems Architecture"], status: "in-progress", year: 2025,
    shortDescription: "A modular, AI-powered personal operating system unifying behavioral analytics, adaptive personas, and seamless cross-platform automation.",
    fullDescription: "LifeSync acts as the ultimate coherence layer over modern digital fragmentation. Built to scale from prototype to production with a clean, event-driven architecture, it leverages Large Language Models to identify deep patterns, generate highly actionable insights, and automate repetitive tasks across various platforms. It completely transcends the concept of an app, acting instead as an adaptive digital assistant.",
    tags: ["React", "TypeScript", "FastAPI", "LLM Integration", "Event-Driven", "System Design"],
    links: { live: "https://ashborn-047.github.io/Lifesync/", github: "https://github.com/Ashborn-047/Lifesync", caseStudy: null }, accentColor: "#F59E0B",
    tech: [
      { name: "Adaptive Design System", role: "A highly robust, multi-theme component library explicitly built to ensure visual consistency across incredibly diverse data representations.", badge: "Design" },
      { name: "Event-Driven Architecture", role: "Built to scale from prototype to production by relying on a decoupled event bus to handle cross-platform triggers.", badge: "Architecture" },
      { name: "FastAPI + LLM Engine", role: "The critical orchestration layer that rapidly processes webhook events, queries the LLM for behavioral insights, and returns highly structured actions.", badge: "Backend" },
      { name: "Cross-Platform Sync Layer", role: "Aggregates massive data streams from platforms like Notion, GitHub, and calendars into a single, beautifully normalized timeline.", badge: "Integration" },
    ],
    usecases: [
      { title: "Intelligent Morning Briefings", desc: "Automatically synthesizes overnight activity and upcoming deadlines into a concise, highly actionable morning summary dashboard." },
      { title: "Deep Pattern Recognition", desc: "Identifies incredibly subtle productivity trends, correlating variables like time-of-day and application usage with actual output quality." },
      { title: "Proactive Workflow Automation", desc: "Actively observes repetitive manual actions across apps and proactively suggests automated macros to instantly replace them." },
    ],
    built: ["A completely unified, plugin-agnostic frontend dashboard fully capable of handling diverse data streams","A highly sophisticated LLM prompt pipeline designed to extract structured JSON insights from chaotic unstructured activity logs","A perfectly normalized event architecture seamlessly handling high-volume webhooks from 4 distinct APIs","An adaptive UI engine that dynamically shifts visual density based on the user's inferred focus state"],
    metrics: [{ val: "120+", label: "UI Components" },{ val: "Event", label: "Driven" },{ val: "1", label: "Unified Layer" }],
  }
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
      } else if(project.id==="solar-core"){
        const cx=W/2,cy=H/2;
        const g=ctx.createRadialGradient(cx,cy,0,cx,cy,W*.4);
        g.addColorStop(0,`rgba(${rgb},.15)`);g.addColorStop(1,"transparent");
        ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
        ctx.fillStyle=`rgba(${rgb},.9)`;ctx.shadowColor=project.accentColor;ctx.shadowBlur=15;
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
  const isEven = index % 2 === 0;

  const visualBlock = (
      <div style={{borderRight:isMobile?"none":(isEven ? "1px solid rgba(255,255,255,.05)" : "none"),borderLeft:isMobile?"none":(!isEven ? "1px solid rgba(255,255,255,.05)" : "none"),borderBottom:isMobile?"1px solid rgba(255,255,255,.05)":"none",position:"relative",overflow:"hidden",height:isMobile?180:"auto"}}>
        <ProjectVisual project={project}/>
      </div>
  );

  const textBlock = (
      <div style={{padding:isMobile?"18px 16px 22px":"28px 32px",display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:10}}>
          <span style={{fontSize:isMobile?8:9,letterSpacing:"0.12em",color:"rgba(216,180,254,1)",lineHeight:1.4}}>
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

function Section({label,children,mt=0}){
  return(
    <div style={{marginBottom:40,marginTop:mt}}>
      <div style={{fontSize:9,letterSpacing:"0.22em",color:"rgba(216,180,254,0.9)",marginBottom:18,paddingBottom:10,borderBottom:"1px solid rgba(255,255,255,.04)",fontFamily:"'Courier New',monospace"}}>
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

export default function App(){
  const {isMobile,isTablet}=useBreakpoint();
  const [filter,setFilter]=useState("all");
  const [selected,setSelected]=useState(null);
  const closeDetail=useCallback(()=>setSelected(null),[]);
  const filtered=filter==="all"?PROJECTS:PROJECTS.filter(p=>p.status===filter);
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
