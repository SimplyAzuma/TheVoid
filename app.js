// app.js
(function () {
  const root = document.getElementById("root");
  if (!root) return;

  const { STATUS_MESSAGES, HUD_STATS, CONSOLES, PREVIEW_GAMES } = window.VOID_DATA || {};

  // --- helpers ---
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));

  const sectionDivider = () => `<div class="section-divider" aria-hidden="true"></div>`;

  const iconSvg = (type) => {
    // matches the simple icons from Features.tsx
    if (type === "circle") return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-16 h-16 drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]"><circle cx="12" cy="12" r="10"/></svg>`;
    if (type === "diamond") return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-16 h-16 drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]"><path d="M12 2L22 12L12 22L2 12L12 2Z"/></svg>`;
    if (type === "triangle") return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-16 h-16 drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]"><path d="M12 3L22 21H2L12 3Z"/></svg>`;
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-16 h-16 drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]"><rect x="3" y="3" width="18" height="18" rx="0"/></svg>`;
  };

  // --- components as HTML ---
  const Header = () => `
    <header class="fixed top-0 left-0 right-0 z-[100] bg-void/40 backdrop-blur-3xl border-b border-white/5" role="banner">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" class="flex items-center gap-6 cursor-pointer" aria-label="The Void Retro Gaming Home">
          <div class="relative w-12 h-12 flex items-center justify-center rotate-45 border-2 border-white" aria-hidden="true">
            <div class="w-3.5 h-3.5 bg-gradient-to-r from-voidAccent to-voidPurple"></div>
          </div>

          <div class="flex flex-col">
            <span class="text-3xl font-black tracking-tight uppercase text-white">The Void</span>
            <span class="text-[9px] font-mono tracking-[0.4em] uppercase font-black inline-block text-transparent bg-clip-text bg-gradient-to-r from-voidAccent to-voidPurple">
              Retro Gaming
            </span>
          </div>
        </a>

        <button
          id="mobile-menu-btn"
          class="lg:hidden inline-flex items-center justify-center w-12 h-12 border border-white/10 bg-white/5 text-white hover:border-voidAccent/50 transition-all duration-500"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6">
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <nav class="hidden lg:flex items-center gap-14 text-[10px] font-mono font-bold tracking-[0.25em] uppercase" aria-label="Main Navigation">
          ${[
            { label: "The Setup", href: "#services" },
            { label: "The Gear", href: "#consoles" },
            { label: "The Games", href: "#games" }
          ]
            .map(
              (x) => `
              <a href="${x.href}" class="text-white transition-all duration-500 flex items-center gap-3 group focus-visible:text-voidAccent">
                <div class="w-1 h-1 rounded-full bg-voidAccent shadow-[0_0_8px_#00F5FF] group-hover:scale-150 transition-all duration-500" aria-hidden="true"></div>
                <span class="hover:text-voidAccent transition-colors">${esc(x.label)}</span>
              </a>`
            )
            .join("")}
          <a href="#contact" class="btn-primary px-10 py-3.5 font-mono text-[10px] tracking-[0.15em] font-black uppercase shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            Let's Play!
          </a>
        </nav>
      </div>
    <!-- Mobile menu -->
<div id="mobile-menu-overlay" class="lg:hidden fixed inset-0 top-20 hidden bg-black/60 backdrop-blur-sm"></div>

<nav
  id="mobile-menu"
  class="lg:hidden fixed left-0 right-0 top-20 hidden border-b border-white/10 bg-void/90 backdrop-blur-3xl"
  aria-label="Mobile Navigation"
>
  <div class="max-w-7xl mx-auto px-6 py-6">
    <div class="flex flex-col gap-5 text-[10px] font-mono font-bold tracking-[0.25em] uppercase">
      <a href="#services" class="text-white hover:text-voidAccent transition-colors">The Setup</a>
      <a href="#consoles" class="text-white hover:text-voidAccent transition-colors">The Gear</a>
      <a href="#games" class="text-white hover:text-voidAccent transition-colors">The Games</a>
      <a href="#contact" class="btn-primary mt-2 px-10 py-4 text-center font-mono text-[10px] tracking-[0.15em] font-black uppercase">
        Let's Play!
      </a>
    </div>
  </div>
</nav>

</header>
  `;

  const Hero = () => `
    <section id="main-content" class="section-layer relative min-h-screen flex items-center pt-28 pb-16 px-6 overflow-x-hidden bg-void">
      <!-- Background Layering -->
      <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <video autoplay muted loop playsinline class="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-20 scale-125 saturate-0">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-star-field-in-outer-space-40351-large.mp4" type="video/mp4" />
        </video>
        <div class="absolute inset-0 bg-gradient-to-b from-void via-void/40 to-void"></div>
        <div class="absolute inset-0 retro-grid opacity-30"></div>
      </div>

      <!-- Atmospheric Glows -->
      <div class="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div class="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-voidAccent/10 blur-[150px] animate-pulse-slow"></div>
        <div class="absolute bottom-[10%] left-[10%] w-[700px] h-[700px] bg-voidPurple/5 blur-[200px] animate-pulse-slow delay-2000"></div>
      </div>

      <div class="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr,0.8fr] gap-12 items-center relative z-10 w-full">
        <div class="space-y-10">
          <div class="inline-flex items-center gap-6 px-6 py-2 bg-voidAccent/5 border-l-4 border-voidAccent backdrop-blur-sm" aria-live="polite">
            <div class="w-1.5 h-1.5 bg-voidAccent shadow-[0_0_10px_#00F5FF] animate-ping" aria-hidden="true"></div>
            <span id="hero-status" class="font-mono text-[10px] font-black tracking-[0.5em] text-voidAccent uppercase">
              ${esc((STATUS_MESSAGES && STATUS_MESSAGES[0]) || "System: Online")}
            </span>
          </div>

          <div class="space-y-8">
            <h1 class="text-8xl md:text-[11rem] font-black leading-[0.85] tracking-tighter uppercase text-white">
              Get Lost <br />
              <span class="inline-block text-transparent bg-clip-text bg-gradient-to-r from-voidAccent to-voidPurple italic pr-12 drop-shadow-[0_0_30px_rgba(0,245,255,0.3)]">
                In The Void.
              </span>
            </h1>
            <p class="text-lg md:text-xl text-voidWhite/70 font-mono leading-relaxed max-w-xl border-l border-white/10 pl-10">
              Bring the golden age of gaming to your next event. We provide authentic retro consoles, curated game libraries,
              and matching CRT displays for a truly immersive experience.
            </p>
          </div>

          <div class="flex flex-wrap gap-8 pt-4">
            <a href="#contact" class="btn-primary px-12 py-6 text-white font-black uppercase tracking-[0.4em] text-[10px]">
              Start Your Journey
            </a>
            <a href="#consoles" class="group px-12 py-6 border border-white/10 bg-white/5 text-white font-black uppercase tracking-[0.4em] text-[10px] hover:border-voidAccent/50 transition-all duration-500 relative overflow-hidden">
              <span class="relative z-10 group-hover:text-voidAccent transition-colors">View Consoles</span>
              <div class="absolute inset-0 bg-voidAccent/0 group-hover:bg-voidAccent/5 transition-colors"></div>
            </a>
          </div>
        </div>

        <!-- Holographic HUD Visual -->
        <div class="relative lg:block hidden">
          <div class="relative p-4 border border-white/10 bg-voidDark/40 backdrop-blur-xl group overflow-hidden">
            <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-voidAccent/40"></div>
            <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-voidAccent/40"></div>
            <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-voidAccent/40"></div>
            <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-voidAccent/40"></div>

            <div class="aspect-[4/5] relative overflow-hidden bg-black">
              <img
                id="hero-hardware-img"
                src="https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&q=80&w=1200"
                class="w-full h-full object-cover saturate-0 brightness-[0.7] group-hover:saturate-[0.5] group-hover:scale-105 transition-all duration-[3s] ease-out opacity-80"
                alt="Moody close-up of retro console hardware"
              />

              <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>

              <div class="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none font-mono">
                <div class="flex justify-between items-start">
                  <div class="space-y-1">
                    <div class="text-[9px] text-voidAccent font-black tracking-[0.3em] uppercase">Channel 04</div>
                    <div class="text-[8px] text-voidWhite/40 uppercase">Mode: Archival</div>
                  </div>
                  <div class="px-2 py-0.5 border border-voidAccent/40 text-[8px] text-voidAccent animate-pulse">REC ●</div>
                </div>

                <div class="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 bg-voidDark/40 backdrop-blur-md">
                  ${(HUD_STATS || []).map((stat) => `
                    <div class="text-center">
                      <div class="text-[7px] text-voidWhite/40 tracking-widest uppercase mb-1">${esc(stat.label)}</div>
                      <div class="text-[10px] text-voidAccent font-black">${esc(stat.value)}</div>
                    </div>
                  `).join("")}
                </div>
              </div>

              <div class="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-voidAccent/20 to-transparent -translate-y-full animate-scan opacity-30"></div>
            </div>

            <div class="absolute -right-12 top-1/2 -rotate-90 origin-center">
              <span class="text-[8px] font-mono text-voidWhite/20 tracking-[1em] uppercase">Deployment_Unit_09</span>
            </div>
          </div>

          <div class="absolute -bottom-8 -left-8 font-mono text-[8px] text-voidAccent/40 space-y-1">
            <div>POS: 44.6488° N, 63.5752° W</div>
            <div>STATUS: STANDBY_MODE</div>
          </div>
        </div>
      </div>
    </section>
  `;

  const Features = () => {
    const FEATURES = [
      { title: "The Main Event", desc: "We turn any corner into a spot where people actually talk, hang out, and mash buttons together.", tag: "VIBES", icon: "circle" },
      { title: "Couch Co-op", desc: "Remember playing side-by-side? No lag, no headsets, just you and your friends on the sofa.", tag: "CONNECTION", icon: "diamond" },
      { title: "Zero Hassle", desc: "We handle all the messy wires and controllers. You just show up and press Start.", tag: "EASY", icon: "triangle" },
      { title: "Your Favorites", desc: "From 8-bit Mario to 64-bit Mario Kart, we bring the games your crowd actually wants to play.", tag: "GAMES", icon: "square" }
    ];

    return `
      <section id="services" class="section-layer py-32 px-6 relative overflow-x-hidden" aria-labelledby="features-heading">
        <div class="absolute inset-0 retro-grid animate-grid-move opacity-20" aria-hidden="true"></div>
        <div class="grain-overlay" aria-hidden="true"></div>
        <div class="absolute top-1/2 left-0 w-[600px] h-[600px] bg-voidPurple/15 blur-[180px] -translate-y-1/2" aria-hidden="true"></div>

        <div class="max-w-7xl mx-auto relative z-10">
          <div class="mb-20 space-y-6">
            <div class="flex items-center gap-8">
              <div class="h-[1px] w-20 bg-gradient-to-r from-voidAccent to-transparent" aria-hidden="true"></div>
              <span class="text-voidAccent font-black text-xs tracking-[0.5em] uppercase">The Setup</span>
            </div>
            <h2 id="features-heading" class="text-7xl md:text-[10rem] font-black uppercase tracking-tighter text-white leading-[0.9]">
              Real Games. <br /><span class="inline-block text-transparent bg-clip-text bg-gradient-to-r from-voidAccent to-voidPurple italic pr-12">Real People.</span>
            </h2>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            ${FEATURES.map((f) => `
              <article class="group relative card-glow rounded-2xl">
                <div class="absolute inset-0 bg-gradient-to-br from-voidAccent/10 to-voidPurple/10 rounded-2xl pointer-events-none"></div>

                <div class="relative h-full space-y-8 p-10 bg-voidDark/80 backdrop-blur-3xl border border-voidAccent/30 transition-all duration-700 hover:border-voidAccent hover:-translate-y-4 rounded-2xl">
                  <div class="text-voidAccent transition-colors duration-700" aria-hidden="true">
                    ${iconSvg(f.icon)}
                  </div>
                  <div class="space-y-6">
                    <div class="text-xs font-bold text-voidAccent tracking-[0.4em] uppercase flex items-center gap-2">
                      <span class="w-1.5 h-1.5 bg-voidAccent rounded-full animate-pulse shadow-[0_0_8px_#00F5FF]" aria-hidden="true"></span>
                      ${esc(f.tag)}
                    </div>
                    <h3 class="text-2xl font-black uppercase tracking-tight text-white">${esc(f.title)}</h3>
                    <p class="text-voidWhite text-sm leading-relaxed font-mono italic opacity-90">${esc(f.desc)}</p>
                  </div>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  };

  const ConsoleShowcase = () => `
    <section id="consoles" class="section-layer py-32 px-6 relative bg-void/50 border-t border-white/10 overflow-x-hidden" aria-labelledby="consoles-heading">
      <div class="grain-overlay" aria-hidden="true"></div>
      <div class="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-voidAccent/5 blur-[120px] animate-pulse-slow" aria-hidden="true"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-voidPurple/5 blur-[150px] animate-pulse-slow delay-1000" aria-hidden="true"></div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
          <div class="space-y-8">
            <div class="flex items-center gap-8">
              <div class="h-[1px] w-20 bg-gradient-to-r from-voidAccent to-transparent" aria-hidden="true"></div>
              <span class="text-voidAccent font-black text-xs tracking-[0.5em] uppercase">The Consoles</span>
            </div>
            <h2 id="consoles-heading" class="text-7xl md:text-[10rem] font-black uppercase tracking-tighter text-white leading-[0.9]">
              Original<br /><span class="inline-block text-transparent bg-clip-text bg-gradient-to-r from-voidAccent to-voidPurple italic pr-12">Hardware.</span>
            </h2>
          </div>
          <p class="text-voidWhite font-mono text-sm leading-relaxed max-w-sm border-l border-voidAccent/40 pl-8 opacity-80 mb-4">
            Original machines from the glory days. No emulation, just the consoles you know and love.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          ${(CONSOLES || []).map((c) => `
            <article class="group relative card-glow rounded-2xl overflow-hidden min-h-[420px] flex flex-col">
              <div class="absolute inset-0 z-0 overflow-hidden">
                <img
                  src="${esc(c.image)}"
                  alt="${esc(c.name)} classic video game console"
                  class="console-img w-full h-full object-cover saturate-[0.8] contrast-110 brightness-[0.85] group-hover:brightness-100 group-hover:scale-110 group-hover:saturate-100 transition-all duration-1000 ease-out"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent opacity-90" aria-hidden="true"></div>
                <div class="absolute inset-0 border border-voidAccent/20 group-hover:border-voidAccent/50 transition-colors duration-700 rounded-2xl z-20" aria-hidden="true"></div>
              </div>

              <div class="relative z-10 mt-auto p-8 space-y-4">
                <div class="flex justify-between items-center text-[9px] font-bold text-voidAccent tracking-[0.4em] uppercase">
                  <span class="flex items-center gap-2">
                    <span class="w-2 h-2 bg-voidAccent rounded-full shadow-[0_0_10px_#00F5FF] animate-pulse" aria-hidden="true"></span>
                    HARDWARE
                  </span>
                  <span class="text-voidWhite/60 font-mono tracking-widest">${esc(c.manufacturer || "")}</span>
                </div>

                <h3 class="text-3xl font-black uppercase tracking-tighter text-white leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-voidAccent group-hover:to-voidPurple transition-all duration-500">
                  ${esc(c.name)}
                </h3>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;

  const GamesShowcase = () => `
    <section id="games" class="section-layer py-32 px-6 bg-void border-t border-white/10 relative overflow-x-hidden" aria-labelledby="games-heading">
      <div class="absolute inset-0 retro-grid opacity-10" aria-hidden="true"></div>
      <div class="grain-overlay" aria-hidden="true"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-voidAccent/[0.06] blur-[250px] pointer-events-none" aria-hidden="true"></div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="mb-20 space-y-6">
          <div class="flex items-center gap-8">
            <div class="h-[1px] w-20 bg-gradient-to-r from-voidAccent to-transparent" aria-hidden="true"></div>
            <span class="text-voidAccent font-black text-xs tracking-[0.5em] uppercase">The Games</span>
          </div>
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16">
            <h2 id="games-heading" class="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.9] text-white">
              Over 1,000 <br /><span class="inline-block text-transparent bg-clip-text bg-gradient-to-r from-voidAccent to-voidPurple italic pr-12">Hit Games</span>
            </h2>
            <p class="text-voidWhite font-mono text-sm leading-relaxed max-w-sm border-l border-voidAccent/40 pl-8 opacity-80 mb-4">
              Every pixel is a memory. We're just here to help you relive them.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          ${(PREVIEW_GAMES || []).map((g) => `
            <article class="group relative card-glow rounded-2xl overflow-hidden min-h-[420px] flex flex-col">
              <div class="absolute inset-0 z-0 overflow-hidden">
                <img
                  src="${esc(g.image)}"
                  alt="Screenshot or cover art for ${esc(g.title)}"
                  class="game-img w-full h-full object-cover grayscale-[0.4] brightness-[0.85] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-90" aria-hidden="true"></div>
                <div class="absolute inset-0 border border-voidAccent/20 group-hover:border-voidAccent/50 transition-colors duration-700 rounded-2xl z-20" aria-hidden="true"></div>
              </div>

              <div class="relative z-10 mt-auto p-8 space-y-4">
                <div class="flex justify-between items-center text-[9px] font-bold text-voidAccent tracking-[0.4em] uppercase">
                  <span class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-voidAccent rounded-full shadow-[0_0_8px_#00F5FF]" aria-hidden="true"></span>
                    ${esc(g.console)}
                  </span>
                  <span class="text-voidWhite/60 font-mono tracking-widest">${esc(g.year)}</span>
                </div>

                <div class="space-y-1">
                  <h3 class="text-2xl font-black uppercase tracking-tighter text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-voidAccent group-hover:to-voidPurple transition-all duration-500">
                    ${esc(g.title)}
                  </h3>
                  <div class="flex justify-between items-center">
                    <p class="text-voidWhite/50 text-[9px] font-mono tracking-[0.4em] uppercase">${esc(g.genre)}</p>
                    <div class="flex items-center gap-2 text-voidAccent/80">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3" aria-hidden="true">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <span class="text-[9px] font-mono font-bold tracking-widest">${esc(g.players)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          `).join("")}
        </div>

        <div class="flex justify-center">
          <button type="button" class="btn-primary px-24 py-10 font-black uppercase tracking-[0.4em] text-[11px] rounded-none transition-all duration-500">
            Browse the collection
          </button>
        </div>
      </div>
    </section>
  `;

  const Contact = () => `
    <section id="contact" class="section-layer py-40 px-6 relative overflow-x-hidden bg-void border-t border-white/10" aria-labelledby="contact-heading">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-voidAccent/10 blur-[280px] pointer-events-none" aria-hidden="true"></div>
      <div class="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-voidPurple/5 blur-[200px] pointer-events-none" aria-hidden="true"></div>

      <div class="max-w-7xl mx-auto grid lg:grid-cols-[1fr,1.1fr] gap-16 lg:gap-20 relative z-10">
        <div class="space-y-12">
          <div class="space-y-12">
            <h2 id="contact-heading" class="text-7xl md:text-[10rem] font-black uppercase tracking-tighter text-white leading-[0.9] break-words pr-4">
              Let's <br /><span class="inline-block text-transparent bg-clip-text bg-gradient-to-r from-voidAccent to-voidPurple italic pr-12">Play!</span>
            </h2>
            <p class="text-voidWhite/90 max-w-md leading-relaxed font-mono text-xl border-l-2 border-voidAccent/40 pl-14">
              Want a killer gaming setup for your next event? Drop us a line and let's make it happen.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-16 pt-20 border-t-2 border-white/10">
            <div>
              <span class="text-xs font-bold text-voidAccent uppercase tracking-[0.4em] block mb-5">Email</span>
              <a href="mailto:hello@void-games.com" class="text-2xl font-bold text-white transition-colors duration-500">hello@void-games.com</a>
            </div>
            <div>
              <span class="text-xs font-bold text-voidPurple uppercase tracking-[0.4em] block mb-5">Where we are</span>
              <span class="text-2xl font-bold text-white transition-colors duration-500">Halifax, Nova Scotia</span>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="absolute -inset-4 bg-voidAccent/5 blur-3xl rounded-3xl pointer-events-none"></div>

          <div class="relative group card-glow rounded-2xl">
            <div class="absolute inset-0 bg-gradient-to-br from-voidAccent/20 to-voidPurple/20 rounded-2xl pointer-events-none"></div>

            <div class="relative bg-voidDark/90 backdrop-blur-3xl border-2 border-voidAccent/30 p-12 md:p-16 shadow-[0_0_80px_rgba(0,0,0,0.5)] rounded-2xl">
              <!-- If you enable PHP, set action="contact.php". If not, action="#" and JS will show a success message. -->
              <form id="contact-form" method="post" action="contact.php" class="space-y-10">
                <div class="flex flex-col gap-8">
                  <div class="space-y-3">
                    <label for="user-name" class="text-[10px] font-bold text-voidAccent uppercase tracking-[0.3em]">Your Name</label>
                    <input required id="user-name" name="name" type="text"
                      class="w-full bg-void/60 border-2 border-white/10 p-4 text-white outline-none font-bold text-sm focus:border-voidAccent/80 focus:ring-1 focus:ring-voidAccent/50 transition-all duration-500 placeholder:text-voidWhite/20"
                      placeholder="Mario Sonic" />
                  </div>
                  <div class="space-y-3">
                    <label for="user-email" class="text-[10px] font-bold text-voidAccent uppercase tracking-[0.3em]">Email Address</label>
                    <input required id="user-email" name="email" type="email"
                      class="w-full bg-void/60 border-2 border-white/10 p-4 text-white outline-none font-bold text-sm focus:border-voidAccent/80 focus:ring-1 focus:ring-voidAccent/50 transition-all duration-500 placeholder:text-voidWhite/20"
                      placeholder="player1@thevoid.com" />
                  </div>
                </div>

                <div class="space-y-3">
                  <label for="event-details" class="text-[10px] font-bold text-voidAccent uppercase tracking-[0.3em]">Event Details</label>
                  <textarea id="event-details" name="message" rows="4"
                    class="w-full bg-void/60 border-2 border-white/10 p-4 text-white outline-none font-bold text-sm resize-none focus:border-voidAccent/80 focus:ring-1 focus:ring-voidAccent/50 transition-all duration-500 placeholder:text-voidWhite/20"
                    placeholder="A convention, birthday, wedding, or just a really big party?"></textarea>
                </div>

                <button type="submit" class="btn-primary w-full py-6 text-white font-black uppercase tracking-[0.5em] text-[11px] shadow-[0_0_30px_rgba(0,245,255,0.2)] hover:shadow-[0_0_50px_rgba(0,245,255,0.5)]">
                  Send Message
                </button>

                <p id="contact-result" class="hidden font-mono text-xs tracking-widest text-voidAccent/80"></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const Footer = () => `
    <footer class="section-layer py-24 px-6 border-t border-white/10 bg-void/80 backdrop-blur-md relative overflow-x-hidden" role="contentinfo">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20 relative z-10">
        <div class="space-y-8 text-center md:text-left">
          <div class="flex items-center justify-center md:justify-start gap-6">
            <div class="relative w-12 h-12 border-2 border-white rotate-45 flex items-center justify-center" aria-hidden="true">
              <div class="w-3 h-3 bg-gradient-to-r from-voidAccent to-voidPurple"></div>
            </div>
            <div class="flex flex-col text-left">
              <span class="text-3xl font-black tracking-tight uppercase text-white">The Void</span>
              <span class="text-[10px] font-mono tracking-[0.4em] uppercase font-black inline-block text-transparent bg-clip-text bg-gradient-to-r from-voidAccent to-voidPurple">Retro Gaming</span>
            </div>
          </div>
        </div>

        <nav class="flex flex-wrap justify-center gap-16 text-[10px] font-black font-mono uppercase tracking-[0.4em] text-voidWhite/80" aria-label="Footer Navigation">
          <a href="#services" class="hover:text-voidAccent focus-visible:text-voidAccent transition-colors duration-500">The Setup</a>
          <a href="#consoles" class="hover:text-voidAccent focus-visible:text-voidAccent transition-colors duration-500">The Gear</a>
          <a href="#games" class="hover:text-voidAccent focus-visible:text-voidAccent transition-colors duration-500">The Games</a>
          <a href="#contact" class="hover:text-voidAccent focus-visible:text-voidAccent transition-colors duration-500">Let's Play!</a>
        </nav>
      </div>
    </footer>
  `;

  // --- render ---
  root.innerHTML = `
    <main class="min-h-screen">
      ${Header()}
      ${Hero()}
      ${sectionDivider()}
      <div class="bg-voidDark/40 relative">
        ${Features()}
        ${sectionDivider()}
      </div>
      ${ConsoleShowcase()}
      ${sectionDivider()}
      <div class="bg-voidDark/20 relative">
        ${GamesShowcase()}
        ${sectionDivider()}
      </div>
      ${Contact()}
      ${Footer()}
    </main>
  `;

  // --- behaviors (replacing React state/effects) ---

  // 1) Hero rotating status text
  (function setupHeroStatusRotation() {
    const el = document.getElementById("hero-status");
    if (!el || !Array.isArray(STATUS_MESSAGES) || STATUS_MESSAGES.length === 0) return;
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % STATUS_MESSAGES.length;
      el.textContent = STATUS_MESSAGES[idx];
    }, 4000);
  
  // Mobile menu toggle
  (function setupMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("mobile-menu-overlay");
    if (!btn || !menu || !overlay) return;

    const open = () => {
      menu.classList.remove("hidden");
      overlay.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      menu.classList.add("hidden");
      overlay.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    btn.addEventListener("click", () => {
      btn.getAttribute("aria-expanded") === "true" ? close() : open();
    });

    overlay.addEventListener("click", close);

    menu.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", close);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) close();
    });
  })();
})();

  // 2) Smooth scroll with header offset (like your App.tsx useEffect)
  (function setupAnchorScrollOffset() {
    const headerOffset = 100;
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const rect = target.getBoundingClientRect();
        const offsetPosition = rect.top + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });

        // Accessibility: focus target
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  
  // Mobile menu toggle
  (function setupMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("mobile-menu-overlay");
    if (!btn || !menu || !overlay) return;

    const open = () => {
      menu.classList.remove("hidden");
      overlay.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      menu.classList.add("hidden");
      overlay.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    btn.addEventListener("click", () => {
      btn.getAttribute("aria-expanded") === "true" ? close() : open();
    });

    overlay.addEventListener("click", close);

    menu.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", close);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) close();
    });
  })();
})();

  // 3) Image fallbacks (replacing useState error handling)
  (function setupImageFallbacks() {
    const heroImg = document.getElementById("hero-hardware-img");
    if (heroImg) {
      heroImg.addEventListener("error", () => {
        const wrap = heroImg.parentElement;
        if (!wrap) return;
        heroImg.remove();
        wrap.insertAdjacentHTML(
          "afterbegin",
          `<div class="w-full h-full flex items-center justify-center bg-voidDark">
             <span class="text-voidAccent font-mono text-[10px] tracking-widest animate-pulse italic">HARDWARE_VISUAL_LOST</span>
           </div>`
        );
      });
    }

    document.querySelectorAll("img.console-img").forEach((img) => {
      img.addEventListener("error", () => {
        const wrap = img.parentElement;
        if (!wrap) return;
        img.remove();
        wrap.insertAdjacentHTML(
          "afterbegin",
          `<div class="w-full h-full flex items-center justify-center bg-voidDark/40 font-mono text-[10px] text-voidAccent/60 tracking-widest uppercase italic">
             Hardware_Feed_Lost
           </div>`
        );
      });
    });

    document.querySelectorAll("img.game-img").forEach((img) => {
      img.addEventListener("error", () => {
        const wrap = img.parentElement;
        if (!wrap) return;
        img.remove();
        wrap.insertAdjacentHTML(
          "afterbegin",
          `<div class="w-full h-full flex items-center justify-center bg-voidDark/40 font-mono text-[10px] text-voidAccent/60 tracking-widest uppercase italic">
             ROM_NOT_FOUND
           </div>`
        );
      });
    });
  
  // Mobile menu toggle
  (function setupMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("mobile-menu-overlay");
    if (!btn || !menu || !overlay) return;

    const open = () => {
      menu.classList.remove("hidden");
      overlay.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      menu.classList.add("hidden");
      overlay.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    btn.addEventListener("click", () => {
      btn.getAttribute("aria-expanded") === "true" ? close() : open();
    });

    overlay.addEventListener("click", close);

    menu.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", close);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) close();
    });
  })();
})();

  // 4) Contact form handling:
  // - If contact.php exists and works, it will submit normally.
  // - If PHP is not configured, prevent submit and show a fake success like your React alert.
  (function setupContactForm() {
    const form = document.getElementById("contact-form");
    const result = document.getElementById("contact-result");
    if (!form || !result) return;

    // If you *don't* want PHP, change index.html form action to "#" and this will handle it.
    form.addEventListener("submit", (e) => {
      const action = form.getAttribute("action") || "";
      const usesPhp = action.toLowerCase().endsWith(".php");

      if (!usesPhp) {
        e.preventDefault();
        result.textContent = "Thanks! We've got your message and we'll get back to you soon.";
        result.classList.remove("hidden");
        form.reset();
      }
    });
  
  // Mobile menu toggle
  (function setupMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("mobile-menu-overlay");
    if (!btn || !menu || !overlay) return;

    const open = () => {
      menu.classList.remove("hidden");
      overlay.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      menu.classList.add("hidden");
      overlay.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    btn.addEventListener("click", () => {
      btn.getAttribute("aria-expanded") === "true" ? close() : open();
    });

    overlay.addEventListener("click", close);

    menu.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", close);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) close();
    });
  })();
})();

  // Mobile menu toggle
  (function setupMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("mobile-menu-overlay");
    if (!btn || !menu || !overlay) return;

    const open = () => {
      menu.classList.remove("hidden");
      overlay.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      menu.classList.add("hidden");
      overlay.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    btn.addEventListener("click", () => {
      btn.getAttribute("aria-expanded") === "true" ? close() : open();
    });

    overlay.addEventListener("click", close);

    menu.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", close);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) close();
    });
  })();
})();
