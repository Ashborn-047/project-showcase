export const RUNES = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ".split("");

export const STATUS_MAP = {
  live:          { label: "LIVE",        color: "#00FFB3" },
  "in-progress": { label: "IN PROGRESS", color: "#F59E0B" },
  "case-study":  { label: "CASE STUDY",  color: "#A78BFA" },
  archived:      { label: "ARCHIVED",    color: "#6B7280" },
};

export const PROJECTS = [
  {
    id: "webtoon-redesign", title: "Webtoon Ecosystem Redesign",
    category: ["Frontend Architecture", "UX Transformation"], status: "case-study", year: 2025,
    shortDescription: "A strategic UX transformation resolving critical layout bugs, horizontal overflow issues, and clunky navigation within the Webtoon interface.",
    fullDescription: "Webtoon's previous interface suffered from jarring horizontal overflow issues, an inflexible navigation structure, and a severe lack of visual feedback. This Next.js prototype directly addresses these UX flaws. It implements a smooth, fully collapsible navigation rail to optimize screen real estate and enforces strict layout boundaries to eliminate horizontal scrolling bugs. Furthermore, it enhances behavioral depth by introducing clear 'Webtoon Green' hover states, intuitive scroll-navigation for the 'Continue Reading' sections, and modernized profile tabs featuring rounded edges and subtle glows.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Radix UI"],
    links: { live: "https://ashborn-047.github.io/Webtoon-Ecosystem-Platform-Redesign-/", github: "https://github.com/Ashborn-047/Webtoon-Ecosystem-Platform-Redesign-", caseStudy: null }, accentColor: "#00DC64",
    tech: [
      { name: "Next.js & React", role: "Leveraged the App Router and React hooks for a robust, performant foundation with static export capabilities.", badge: "Framework" },
      { name: "Tailwind & Radix UI", role: "Built a highly accessible, responsive design system emphasizing 'Webtoon Green' and soft UI aesthetics.", badge: "UI/UX" },
      { name: "Zustand", role: "Managed complex cross-component state, specifically for the collapsible navigation and user progress tracking.", badge: "State" },
    ],
    usecases: [
      { title: "Resolving Navigation Flow", desc: "Fixed clunky static sidebars by introducing a fully collapsible navigation rail with 300ms smooth transitions and logo-toggle functionality." },
      { title: "Fixing Layout Overflow", desc: "Completely eliminated horizontal overflow issues that previously broke the layout on smaller viewports, ensuring a strict responsive grid." },
      { title: "Enhancing Visual Feedback", desc: "Added missing interactive states, including 'Webtoon Green' hover effects, refined profile tab glows, and active-state indicators." },
    ],
    beforeAfter: [
      { aspect: "Navigation & Discovery", before: "Infinite vertical scroll prioritizing established titles, leading to indie creator suppression.", after: "Horizontal modular carousels and 'Continue Reading' sections, significantly boosting discovery for new Canvas creators." },
      { aspect: "Layout Constraints", before: "Unrestricted width causing horizontal overflow bugs and broken responsiveness on smaller screens.", after: "Strict max-width wrappers with fluid grid layouts, ensuring a perfect responsive experience across all viewports." },
      { aspect: "Visual Feedback", before: "Static text links and missing hover states resulting in a lifeless, confusing user journey.", after: "Dynamic 'Webtoon Green' hover effects, active tab indicators, and subtle glows for a premium, tactile feel." },
      { aspect: "Content Organization", before: "Scattered profile settings and disorganized 'My Series' lists without clear progress tracking.", after: "A unified Profile dashboard with clear categorization, rounded-edge tabs, and built-in reading progress bars." }
    ],
    built: ["Responsive Next.js application tailored for mobile, tablet, and desktop viewports","Complex UI state management using Zustand and custom hooks","Aesthetic layout using Radix UI primitives and Tailwind utility classes","Automated GitHub Pages deployment pipeline using GitHub Actions"],
    metrics: [{ val: "Next 14", label: "App Router" },{ val: "Tailwind", label: "Styling" },{ val: "Zustand", label: "State Layer" },{ val: "Radix", label: "Primitives" }],
  },
  {
    id: "silverwall", title: "SilverWall Telemetry",
    category: ["Frontend Architecture", "Real-Time Data"], status: "in-progress", year: 2025,
    shortDescription: "A high-performance F1 telemetry dashboard inspired by the Mercedes AMG pit-wall, powered by a SpacetimeDB reactive engine.",
    fullDescription: "SilverWall is an engineering-grade F1 telemetry dashboard inspired by the Mercedes-AMG Petronas 'Silver Wall' pit-wall interface. It has recently undergone a major architectural pivot, migrating from a legacy Python/Supabase stack to a Full TypeScript + SpacetimeDB architecture. This transition ensures ultra-low latency state synchronization, allowing for real-time car tracking, sub-second leaderboard updates, and seamless multi-user data parity without the overhead of traditional polling.",
    tags: ["React", "TypeScript", "SpacetimeDB", "TailwindCSS", "OpenF1 API", "Real-Time Sync", "Data Visualization"],
    links: { live: "https://ashborn-047.github.io/silverwall/", github: "https://github.com/Ashborn-047/silverwall", caseStudy: null }, accentColor: "#00FFB3",
    tech: [
      { name: "React + Tailwind", role: "Architected a high-density 'mission control' interface inspired by the Mercedes AMG Silverwall design system.", badge: "Frontend" },
      { name: "SpacetimeDB", role: "Migrated the core telemetry engine to SpacetimeDB, enabling ultra-low latency state synchronization and eliminating legacy polling bottlenecks.", badge: "Database" },
      { name: "TS Ingestor Worker", role: "Developed a high-performance worker that ingests live data from the OpenF1 API and pushes verified telemetry directly into the SpacetimeDB core.", badge: "Backend" },
      { name: "SVG Vertex Rendering", role: "Implementing high-fidelity circuit map rendering using vertex-based SVG paths for extreme accuracy during live tracking.", badge: "Graphics" },
    ],
    usecases: [
      { title: "Low Latency Sync", desc: "Achieve sub-second parity between the OpenF1 API source and all connected clients via SpacetimeDB's reactive engine." },
      { title: "Mission Control UI", desc: "Experience F1 sessions through a professional-grade interface optimized for density, readability, and immediate data access." },
      { title: "Demo Mode Availability", desc: "Allows recruiters and users to experience the live telemetry environment completely offline using simulated session data." },
    ],
    architecture: [
      { step: "Data Ingestion", desc: "High-performance TypeScript workers poll the OpenF1 API, normalizing raw telemetry into relational entities." },
      { step: "SpacetimeDB Core", desc: "The relational engine handles state synchronization, enabling real-time push without the lag of traditional polling." },
      { step: "Multiplexed Sync", desc: "React clients utilize the SpacetimeDB SDK for direct state subscriptions, ensuring sub-50ms data parity." },
    ],
    built: ["Full migration to a SpacetimeDB-powered reactive architecture for ultra-low latency telemetry sync","Custom UI component library inspired by Mercedes AMG Petronas pit-wall aesthetics","High-performance TypeScript ingestor bridging OpenF1 API streams with SpacetimeDB","Real-time circuit geometry renderer with interpolated car positions"],
    metrics: [{ val: "<50ms", label: "Latency Target" },{ val: "Reactive", label: "Engine" },{ val: "20", label: "Live Entities" },{ val: "OpenF1", label: "Source" }],
  },
  {
    id: "the-terminal", title: "The Terminal Simulator",
    category: ["System Engineering", "Gamification"], status: "in-progress", year: 2025,
    shortDescription: "A professional-grade Linux terminal simulator with a POSIX-compliant VFS, 70+ commands, and a gamified dual-track curriculum.",
    fullDescription: "The Terminal is a professional-grade educational platform designed to transform users into command-line experts. It is not just a visual gimmick; it is a fully functioning, POSIX-inspired Linux terminal built entirely in React. Users can navigate a deeply sandboxed Virtual File System with Inode management, run over 70 interactive commands (including pipes, redirections, and job control), and complete guided gamified labs. The system features a dual-track curriculum: a 15-chapter Foundational Track and an Advanced Mastery Track focusing on task scheduling and server analysis.",
    tags: ["React", "TypeScript", "POSIX VFS", "OS Simulation", "Framer Motion", "Gamification", "SpacetimeDB"],
    links: { live: "https://ashborn-047.github.io/the-terminal/", github: "https://github.com/Ashborn-047/the-terminal", caseStudy: null }, accentColor: "#39FF14",
    tech: [
      { name: "React Ecosystem", role: "Leveraged React's component model to build a highly responsive, state-driven terminal emulator with strict render constraints.", badge: "Framework" },
      { name: "Hardened VFS", role: "Implemented a POSIX-compliant Inode-based filesystem in memory, supporting octal permissions and true path resolution.", badge: "Architecture" },
      { name: "Framer Motion", role: "Crafted subtle typewriter effects, blinking cursors, and authentic Neo-Brutalist screen transitions to deeply enhance immersion.", badge: "Animation" },
      { name: "Custom CLI Parser", role: "Developed a bespoke parser supporting 70+ commands, pipelines ( | ), I/O redirection ( > , >> ), and job control.", badge: "Core" },
    ],
    usecases: [
      { title: "Interactive Exploration", desc: "Encourages users to engage natively, using standard POSIX commands like `cd`, `ls`, and `cat` to discover content." },
      { title: "Educational Labs", desc: "Includes integrated, gamified tutorials that guide users through complex Linux concepts in a safe, browser-based environment." },
      { title: "Gamified Progression", desc: "Users earn XP and unlock levels by successfully executing commands and completing hidden puzzle objectives.", },
    ],
    architecture: [
      { step: "Shell Engine", desc: "Custom-built parser supporting pipelines, I/O redirection, and environment variables." },
      { step: "VFS (Inode)", desc: "POSIX-compliant filesystem mapping directories to Inodes with true permission bitmasks." },
      { step: "Lab Engine", desc: "Automated verification system that audits the terminal's environment state to validate challenge completion." },
    ],
    built: [
      "Custom POSIX-compliant shell engine supporting 70+ commands, pipes, and redirections",
      "Hardened in-memory VFS with Inode management and octal permission support (chmod/chown)",
      "Gamified 'Challenge Arena' with 40+ broken system scenarios for diagnostic training",
      "Real-time multiplayer leaderboards and co-op mentor mode powered by SpacetimeDB",
      "Multi-track curriculum registry with automated verification of terminal states"
    ],
    metrics: [{ val: "70+", label: "Native Commands" },{ val: "POSIX", label: "Compliance" },{ val: "Inode", label: "VFS" },{ val: "Wave 4", label: "Status" }],
  },
  {
    id: "evolution-atlas", title: "Evolution Atlas",
    category: ["Creative Computation", "Digital Museum"], status: "live", year: 2024,
    shortDescription: "A Digital Museum of Interface Design — exploring 7 interactive experiments in kinetic typography, liquid shaders, and ambient computing.",
    fullDescription: "Evolution Atlas is an interactive journey through the history of digital design. It features 7 meticulously curated experiments that trace the evolution of interfaces—from static tools to ambient computing. The project combines kinetic typography, liquid shaders, and advanced color theory systems to create a deeply immersive, educational experience. It serves as a digital sanctuary for the art of interaction, archiving seismic shifts in computational aesthetics—from rigid, deterministic grids to the fluid, predictive interfaces of the coming decade.",
    tags: ["React", "Three.js", "WebGL", "GSAP", "Creative Coding", "Shaders"],
    links: { live: "https://ashborn-047.github.io/evolution-atlas/", github: "https://github.com/Ashborn-047/evolution-atlas", caseStudy: null }, accentColor: "#7C3AED",
    tech: [
      { name: "Three.js + WebGL", role: "Powers high-fidelity background environments, including custom liquid shaders and particle-based time representations.", badge: "3D Graphics" },
      { name: "GSAP", role: "Orchestrates cinematic timeline animations for kinetic typography and era-specific transitions.", badge: "Animation" },
      { name: "React", role: "Manages overarching application state, route transitions, and deeply interactive exhibit panels.", badge: "Framework" },
      { name: "Shader Programming", role: "Written custom GLSL shaders to simulate organic, fluid interfaces that react in real-time to user presence.", badge: "Core" },
    ],
    usecases: [
      { title: "Design Education", desc: "Serves as an interactive reference for designers to study the historical context of modern UX paradigms." },
      { title: "Shader Exploration", desc: "Provides an isolated environment to study the performance of 30+ complex fragment shaders in-browser." },
      { title: "Ambient Computing", desc: "Explores interfaces that don't wait for input but instead actively participate in the digital environment." },
    ],
    exhibits: [
      { title: "Kinetic Typography", desc: "Treating letterforms as particles subject to physical forces that respond organically to user proximity.", link: "https://ashborn-047.github.io/evolution-atlas/#kinetic-typography" },
      { title: "Liquid Shader", desc: "Simulating fluid viscosity in shaders to create UI surfaces that feel tangible and living.", link: "https://ashborn-047.github.io/evolution-atlas/#liquid-shader-ui" },
      { title: "Aether Sync", desc: "Visualizing asynchronous data streams as turbulent curl noise particle systems—data as weather.", link: "https://ashborn-047.github.io/evolution-atlas/#aether-sync" },
      { title: "Shader Vault", desc: "An open-source library of 30+ production-ready GLSL shaders with an integrated Monaco code editor.", link: "https://ashborn-047.github.io/evolution-atlas/#shader-vault" },
      { title: "Chroma Kinetics", desc: "Temporal color perception mapped to scroll progress, creating chromatic navigation muscle memory.", link: "https://ashborn-047.github.io/evolution-atlas/#chroma-kinetics" },
      { title: "UI Atlas", desc: "Spatial interface design using shared layout transitions to create persistent relational memory.", link: "https://ashborn-047.github.io/evolution-atlas/#ui-atlas" }
    ],
    built: [
      "Seven distinct, deeply interactive experiments representing different eras of UI design",
      "Curated library of over 30 high-performance fragment shaders and WebGL experiments",
      "Complex GSAP timelines perfectly synchronized with WebGL camera pans and 3D scenes",
      "Robust, accessible React shell utilizing Zustand for minimalist, reactive state management"
    ],
    metrics: [{ val: "7", label: "Curated Exhibits" },{ val: "30+", label: "Custom Shaders" },{ val: "60fps", label: "Render Target" },{ val: "WebGL", label: "Rendering Core" }],
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
