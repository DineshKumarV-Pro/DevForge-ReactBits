import ComponentGallery from "@/components/ComponentGallery";
import Orb from "@/components/Orb";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#08070d] font-sans text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#08070d]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="React Bits home">
            <span className="grid size-8 place-items-center rounded-lg border border-violet-300/30 bg-violet-300/10 text-sm font-semibold text-violet-200">
              RB
            </span>
            <span className="font-semibold tracking-tight">React Bits</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-white" href="#components">Components</a>
            <a className="transition-colors hover:text-white" href="#features">Features</a>
            <a className="transition-colors hover:text-white" href="https://github.com/DineshKumarV-Pro/DevForge-ReactBits" target="_blank" rel="noreferrer">GitHub</a>
          </nav>
          <a
            href="#components"
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.07]"
          >
            Browse all
          </a>
        </div>
      </header>

      <main>
        <section className="relative mx-auto min-h-[78vh] max-w-7xl px-6 pb-16 pt-32 lg:px-8 lg:pt-36">
          <div className="pointer-events-none absolute left-1/2 top-24 size-[620px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
          <div className="grid min-h-[560px] items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
            <div className="relative z-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/[0.07] px-3 py-1.5 text-xs text-violet-200">
                <span className="size-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(196,181,253,.9)]" />
                219 animated components
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-7xl lg:text-[5.5rem]">
                Make the web
                <span className="mt-2 block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  feel alive.
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">
                Copy-ready React components for backgrounds, typography, cards,
                navigation, and interactions that leave a lasting impression.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#components"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-violet-100"
                >
                  Explore components
                </a>
                <a
                  href="https://github.com/DineshKumarV-Pro/DevForge-ReactBits"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/[0.07]"
                >
                  View on GitHub
                </a>
              </div>
            </div>

            <div className="relative mx-auto h-[440px] w-full max-w-[520px]">
              <div className="absolute inset-8 rounded-[50%] border border-white/[0.08]" />
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] shadow-[0_35px_100px_rgba(0,0,0,.45)]">
                <Orb
                  colors={["#7c3aed", "#c084fc", "#22d3ee"]}
                  hue={230}
                  backgroundColor="#08070d"
                  size={1}
                  glow={1}
                  speed={0.7}
                  followCursor
                  rotateOnHover
                  className="h-full w-full"
                />
                <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-xl border border-white/10 bg-[#0c0a12]/80 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="text-xs text-zinc-500">Preview</p>
                    <p className="mt-0.5 text-sm font-medium text-white">Aurora / Orb</p>
                  </div>
                  <span className="flex items-center gap-2 text-xs text-emerald-300">
                    <span className="size-1.5 rounded-full bg-emerald-300" />
                    Live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-y border-white/[0.07] bg-white/[0.018]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/[0.07] sm:grid-cols-4">
            {[
              ["219+", "Components"],
              ["React", "TypeScript"],
              ["WebGL", "Effects"],
              ["MIT", "Open source"],
            ].map(([value, label]) => (
              <div key={label} className="px-5 py-7 text-center sm:px-8">
                <p className="text-lg font-semibold text-white">{value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <ComponentGallery />
      </main>
    </div>
  );
}
