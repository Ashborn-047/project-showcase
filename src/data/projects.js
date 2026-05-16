export const RUNES = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ".split("");

export const STATUS_MAP = {
  "LIVE":        { label: "LIVE",        color: "#10b981" },
  "IN PROGRESS": { label: "IN PROGRESS", color: "#f59e0b" },
  "CASE STUDY":  { label: "CASE STUDY",  color: "#8b5cf6" },
  "ARCHIVED":    { label: "ARCHIVED",    color: "#6b7280" },
};

export const PROJECTS = [
  {
    id: "webtoon-redesign",
    title: "Webtoon Redesign",
    category: "UI/UX TRANSFORMATION",
    status: "CASE STUDY",
    description: "A strategic UX transformation resolving layout bugs and clunky navigation within the Webtoon interface.",
    fullDescription: "Webtoon's interface suffered from jarring horizontal overflow issues and clunky navigation. This Next.js prototype addresses these flaws with a collapsible navigation rail and strict layout boundaries, emphasizing 'Webtoon Green' aesthetics.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Radix UI"],
    built: [
      "Smooth, fully collapsible navigation rail with 300ms transitions.",
      "Strict layout boundaries eliminating horizontal overflow bugs.",
      "Modernized profile tabs and intuitive scroll-navigation.",
      "High-fidelity design system utilizing 'Webtoon Green' as a primary token."
    ],
    exhibits: ["Collapsible Rail", "Layout Fixes", "Visual Feedback", "Profile Dash"],
    links: { github: "https://github.com/Ashborn-047/Webtoon-Ecosystem-Platform-Redesign-", live: "https://ashborn-047.github.io/Webtoon-Ecosystem-Platform-Redesign-/" },
    accentColor: "#00DC64",
    metrics: { speed: "Next 14", scale: "Radix UI", uptime: "Zustand" }
  },
  {
    id: "silverwall",
    title: "SilverWall Telemetry",
    category: "DATA & ANALYTICS",
    status: "IN PROGRESS",
    description: "Real-time F1 telemetry platform featuring live pit-wall dashboards and AI-powered race commentary.",
    fullDescription: "SilverWall is a high-performance Formula 1 telemetry engine that bridges the gap between raw track data and professional race strategy. Built with a custom UI inspired by the Mercedes-AMG SilverWall, it provides a real-time pit-wall experience for enthusiasts and engineers alike.",
    tech: ["SpacetimeDB", "FastAPI", "React", "TypeScript", "OpenF1 API", "Google Gemini"],
    built: [
      "Distributed backend situated in SpacetimeDB for ultra-low latency state management.",
      "Real-time telemetry ingestion using OpenF1 WebSocket streams.",
      "Custom Driver Performance Analysis engine with AI race strategy commentary.",
      "High-fidelity UI/UX design system inspired by official Mercedes-AMG telemetry interfaces."
    ],
    exhibits: ["Live Dashboards", "Track Geometry Maps", "AI Commentator", "Driver Standings"],
    links: { github: "https://github.com/Ashborn-047/Silverwall", live: "#" },
    accentColor: "#E10600",
    metrics: { speed: "20ms latency", scale: "20+ Drivers", uptime: "99.9%" }
  },
  {
    id: "terminal-os",
    title: "The Terminal",
    category: "SYSTEMS",
    status: "LIVE",
    description: "A POSIX-compliant Linux simulator with deep gamification and a real-time kernel.",
    fullDescription: "The Terminal is more than a shell—it's a fully-realized Linux-inspired ecosystem. It features a custom VFS, real-time signal propagation, and a sophisticated gamification engine that rewards users for mastering system administration and development tasks.",
    tech: ["React", "TypeScript", "Zustand", "Framer Motion", "Tailwind CSS"],
    built: [
      "Authentic boot-sequence architecture with identity verification and memory loading.",
      "Complex Gamification Engine featuring Daily Quests, Streak Freezes, and XP multipliers.",
      "Custom VFS (Virtual File System) supporting real-time navigation and manipulation.",
      "Interactive 'Lab Mode' for structured educational tracks with automated assessments."
    ],
    exhibits: ["Custom Kernel", "XP & Leveling System", "VFS Explorer", "Terminal Labs"],
    links: { github: "https://github.com/Ashborn-047/The-Terminal", live: "https://theterminal.vercel.app" },
    accentColor: "#28CA41",
    metrics: { commands: "50+ Built-ins", xp: "1M+ Points", users: "1.2k+" }
  },
  {
    id: "evolution-atlas",
    title: "Evolution Atlas",
    category: "CREATIVE COMPUTATION",
    status: "LIVE",
    description: "A Digital Museum of Interface Design exploring kinetic typography and ambient computing.",
    fullDescription: "Evolution Atlas is an interactive journey through the history of digital design. It features meticulously curated experiments tracing the evolution of interfaces from static tools to ambient computing, utilizing liquid shaders and advanced color theory.",
    tech: ["React", "Three.js", "WebGL", "GSAP", "Shaders"],
    built: [
      "Kinetic typography particles responding organically to user proximity.",
      "Custom GLSL liquid shaders simulating tangible UI surfaces.",
      "Aether Sync visualizing asynchronous data streams as curl noise.",
      "Shader Vault library with 30+ production-ready GLSL experiments."
    ],
    exhibits: ["Kinetic Typo", "Liquid Shaders", "Aether Sync", "Shader Vault"],
    links: { github: "https://github.com/Ashborn-047/evolution-atlas", live: "https://ashborn-047.github.io/evolution-atlas/" },
    accentColor: "#7C3AED",
    metrics: { fps: "60fps", shaders: "30+", exhibits: "7" }
  },
  {
    id: "svg-forge",
    title: "SVG Forge",
    category: "DEVELOPER TOOLING",
    status: "LIVE",
    description: "A zero-dependency animation laboratory for mastering pure SVG techniques.",
    fullDescription: "SVG Forge is an interactive laboratory dedicated to the art of vector motion. It serves as a comprehensive reference for mastering SVG techniques—from SMIL motion paths to complex filter distortions like feTurbulence.",
    tech: ["Vanilla JS", "SVG", "SMIL", "CSS3"],
    built: [
      "Real-time SVG template engine with live parameter controls.",
      "Integrated code editor for direct SMIL and filter markup manipulation.",
      "Fuzzy-search command palette for rapid workshop navigation.",
      "Native filter labs exploring displacement mapping and turbulence."
    ],
    exhibits: ["SMIL Motion", "Filter Lab", "Morph Engine", "Command Palette"],
    links: { github: "https://github.com/Ashborn-047/svg-forge", live: "https://ashborn-047.github.io/svg-forge/" },
    accentColor: "#00D4FF",
    metrics: { deps: "0", native: "100%", speed: "60fps" }
  },
  {
    id: "solar-core",
    title: "Solar Core",
    category: "PHYSICS SIMULATION",
    status: "LIVE",
    description: "A high-fidelity 3D solar system explorer featuring procedural planetary physics.",
    fullDescription: "Solar Core Explorer is a photorealistic WebGL simulation of the cosmos. It models celestial bodies using real NASA imagery and procedural noise, featuring accurate orbital physics and atmospheric scattering shaders.",
    tech: ["Three.js", "WebGL", "React", "Procedural Generation"],
    built: [
      "Procedural noise engine for high-resolution surface maps.",
      "Physically-based rendering pipeline optimized for browsers.",
      "Interactive orbital camera with seamless planetary scaling.",
      "Telemetry HUD synchronizing WebGL state with React UI."
    ],
    exhibits: ["Solar Surface", "Earth Observer", "Saturnian Rings", "Telemetry Feed"],
    links: { github: "https://github.com/Ashborn-047/Solar-Core-Explorer", live: "https://ashborn-047.github.io/Solar-Core-Explorer/" },
    accentColor: "#EAB308",
    metrics: { fps: "60fps", textures: "NASA", engine: "Physics" }
  },
  {
    id: "lifesync",
    title: "LifeSync",
    category: "AI & SYSTEMS",
    status: "IN PROGRESS",
    description: "A modular, AI-powered personal operating system for behavioral optimization.",
    fullDescription: "LifeSync is an ambitious personal orchestration system designed to unify behavioral analytics, adaptive personas, and seamless automation. It uses a vector-based personality engine to sync life goals with actionable daily habits.",
    tech: ["FastAPI", "Supabase", "React Native", "Vector DB", "OpenAI"],
    built: [
      "AI-powered Adaptive Persona Engine for personalized interaction.",
      "Vector-based behavioral scoring for high-fidelity life optimization.",
      "Cross-platform synchronization (Web/Mobile) via event-driven architecture.",
      "MindMesh integration for real-time mindfulness and focus tracking."
    ],
    exhibits: ["Persona Dashboard", "MindMesh Canvas", "Habit Tracker", "AI Assistant"],
    links: { github: "https://github.com/Ashborn-047/Lifesync", live: "#" },
    accentColor: "#A78BFA",
    metrics: { sync: "Real-time", memory: "1M+ Vectors", accuracy: "94%" }
  }
];
