import ComponentGallery from "@/components/ComponentGallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#08070d] font-sans">
      <main>
        <section className="mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-center px-6 py-24 lg:px-8">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-violet-300">
            React Bits
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-7xl">
            Motion that makes
            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              interfaces unforgettable.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            A living collection of animated React components for bold, playful, and
            polished digital experiences.
          </p>
          <a
            href="#components"
            className="mt-10 inline-flex w-fit items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
          >
            Explore the collection
          </a>
        </section>
        <ComponentGallery />
      </main>
    </div>
  );
}
