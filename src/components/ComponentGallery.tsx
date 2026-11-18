'use client';

import { Component, lazy, type ComponentType, type ReactNode, Suspense } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

const componentNames = [
  'ASCIIText', 'AccordionGallery', 'AcidSquares', 'AeroShards', 'AnimatedContent',
  'AnimatedList', 'Antigravity', 'Aurora', 'Balatro', 'Ballpit', 'Beams', 'BellToggle',
  'BlobCursor', 'BlurText', 'BorderGlow', 'BounceCards', 'BranchedMenu', 'BubbleMenu',
  'CRTWarp', 'CallChip', 'CardNav', 'CardSwap', 'Carousel', 'ChromaGrid',
  'CircularCarousel', 'CircularGallery', 'CircularText', 'ClickSpark', 'CodeSlots',
  'ColorBends', 'CometDial', 'CountUp', 'Counter', 'Crosshair', 'CrystalizedBall',
  'Cubes', 'CursorGrid', 'CurvedInput', 'CurvedLoop', 'DarkVeil', 'DecayCard',
  'DecryptedText', 'DepthCarousel', 'DepthText', 'Dither', 'DitherVeil', 'Dock',
  'DodgeField', 'DomeGallery', 'DotField', 'DotGrid', 'DriftWall', 'EchoText',
  'ElasticMesh', 'ElasticSlider', 'ElectricBorder', 'ElectricLogo', 'EvilEye',
  'FadeContent', 'FallingText', 'FaultyTerminal', 'Ferrofluid', 'FlexCarousel',
  'FlipCard', 'FloatingLines', 'FlowingMenu', 'FluidGlass', 'FluxLines', 'FlyingButton',
  'FlyingPosters', 'FoldText', 'Folder', 'FolderFloat', 'FuseButton', 'FuzzyText',
  'Galaxy', 'GhostCursor', 'GhostFibers', 'GlareHover', 'GlassIcons', 'GlassSurface',
  'GlideSelect', 'GlitchText', 'GlowCursor', 'GooeyNav', 'GradientASCII',
  'GradientBlinds', 'GradientText', 'GradientWaves', 'GradualBlur', 'Grainient',
  'GridDistortion', 'GridMotion', 'GridScan', 'HalftoneReveal', 'HoldButton',
  'HoloCard', 'HoloMosaic', 'Hyperspeed', 'ImageTrail', 'InfiniteMenu', 'InfiniteSpiral',
  'Iridescence', 'JellyRadio', 'Lanyard', 'LaserFlow', 'LatticeLoader', 'LetterGlitch',
  'LightPillar', 'LightRays', 'LightTunnel', 'Lightfall', 'Lightning', 'LineSidebar',
  'LineWaves', 'LiquidChrome', 'LiquidEther', 'LogoLoop', 'MagicBento', 'MagicRings',
  'Magnet', 'MagnetLines', 'MaskedHeading', 'Masonry', 'MetaBalls', 'MetallicPaint',
  'MicroSlats', 'ModelViewer', 'MoltenMetal', 'MorphSlider', 'Noise', 'OptionWheel',
  'Orb', 'OrbitImages', 'PaperCrumple', 'ParticleText', 'Particles', 'PatternWaves',
  'PeekRating', 'PillNav', 'PixelBlast', 'PixelCard', 'PixelSnow', 'PixelSwap',
  'PixelTrail', 'PixelTransition', 'Plasma', 'PlasmaWave', 'Prism', 'PrismaticBurst',
  'ProfileCard', 'PromptBar', 'PulseHeart', 'Radar', 'RefineFrame', 'ReflectiveCard',
  'Ribbons', 'RippleDistortion', 'RippleGrid', 'RotatingText', 'RubberSegment',
  'Scanner', 'ScrambledText', 'ScrollExpand', 'ScrollFloat', 'ScrollReveal',
  'ScrollStack', 'ScrollVelocity', 'ScrubField', 'ShapeBlur', 'ShapeGrid', 'ShapeWaves',
  'ShinyText', 'Shredder', 'Shuffle', 'SideRays', 'Silk', 'SlicedWaves', 'SlideCommit',
  'SlingButton', 'SloshGauge', 'SoftAurora', 'SpecularButton', 'SplashCursor',
  'SplitFlapText', 'SplitText', 'SpotlightCard', 'SpringCheck', 'SquishSwitch', 'Stack',
  'StaggeredMenu', 'StarBorder', 'StatusMark', 'Stepper', 'StickerPeel', 'Strands',
  'StrokeText', 'SwarmCursor', 'SwipeRow', 'SwipeToast', 'TargetCursor', 'TearTicket',
  'TechText', 'TextCursor', 'TextLoop', 'TextPressure', 'TextType', 'ThoughtLine',
  'Threads', 'TiltedCard', 'Topography', 'TrueFocus', 'VariableProximity', 'VoicePill',
  'WakeSlider', 'WarmTooltip', 'WarpText', 'Waves', 'WebThreads'
] as const;

type ComponentName = (typeof componentNames)[number];
type PreviewProps = Record<string, unknown>;
type PreviewComponent = ComponentType<PreviewProps>;
type GalleryCategory = 'All' | 'Text' | 'Cards' | 'Navigation' | 'Backgrounds' | 'Effects';

const categories: GalleryCategory[] = ['All', 'Text', 'Cards', 'Navigation', 'Backgrounds', 'Effects'];

function getCategory(name: ComponentName): GalleryCategory {
  const value = name.toLowerCase();
  if (/(text|ascii|glitch|blur|split|fold|scramble|shuffle|decrypted|rotating|count|scrollfloat|scrollreveal)/.test(value)) return 'Text';
  if (/(card|carousel|gallery|bento|tilt|masonry|bounce|swap|stack)/.test(value)) return 'Cards';
  if (/(nav|menu|dock|sidebar|tabs|stepper|breadcrumb|pill)/.test(value)) return 'Navigation';
  if (/(aurora|waves|silk|liquid|plasma|grainient|threads|grid|light|dark|galaxy|particles|ribbons|beams|blur)/.test(value)) return 'Backgrounds';
  return 'Effects';
}

const componentCache = new Map<ComponentName, PreviewComponent>();

function getComponent(name: ComponentName) {
  const cached = componentCache.get(name);
  if (cached) return cached;

  const preview = lazy(() =>
    import(`./${name}`).then((module) => ({
      default: module.default as PreviewComponent,
    }))
  );
  componentCache.set(name, preview);
  return preview;
}

class PreviewErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex w-full max-w-xs flex-col items-center gap-3 text-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-400/40 via-fuchsia-400/20 to-cyan-300/40 blur-[1px]" />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-violet-300/70 to-transparent" />
        </div>
      );
    }

    return this.props.children;
  }
}

function ComponentCard({ name }: { name: ComponentName }) {
  const cardRef = useRef<HTMLElement>(null);
  const [Preview, setPreview] = useState<PreviewComponent | null>(null);
  const previewProps: PreviewProps = {
    children: <span>React Bits</span>,
    text: 'React Bits',
    texts: ['React Bits', 'Motion'],
    items: ['One', 'Two', 'Three'],
    images: [],
    width: '100%',
    height: 180,
  };

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPreview(getComponent(name));
          observer.disconnect();
        }
      },
      { rootMargin: '240px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [name]);

  return (
    <article
      ref={cardRef}
      className="group flex min-h-72 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0b14] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/20 hover:shadow-[0_20px_60px_rgba(76,29,149,.14)]"
    >
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
        <h2 className="font-mono text-sm text-zinc-100">{name}</h2>
        <span className="rounded-full border border-white/[0.08] px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-zinc-500">React</span>
      </div>
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,.09),transparent_55%)] p-5 text-white">
        {Preview ? (
          <PreviewErrorBoundary>
            <Suspense
              fallback={
                <div className="h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-violet-400/30 via-fuchsia-400/20 to-cyan-300/30" />
              }
            >
              <Preview {...previewProps} />
            </Suspense>
          </PreviewErrorBoundary>
        ) : (
          <span className="text-xs text-zinc-600">Scroll to preview</span>
        )}
      </div>
    </article>
  );
}

export default function ComponentGallery() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GalleryCategory>('All');

  const filteredNames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return componentNames.filter((name) => {
      const matchesCategory = category === 'All' || getCategory(name) === category;
      const matchesQuery = !normalizedQuery || name.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <section id="components" className="mx-auto w-full max-w-7xl px-6 pb-24 lg:px-8">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-violet-300">
            Component library
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Find your next interaction.
          </h2>
        </div>
        <label className="relative block w-full sm:w-72">
          <span className="sr-only">Search components</span>
          <svg className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components"
            className="h-11 w-full rounded-full border border-white/[0.09] bg-white/[0.04] pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-300/40 focus:ring-2 focus:ring-violet-400/10"
          />
        </label>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1" aria-label="Component categories">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              category === item
                ? 'bg-white text-black'
                : 'border border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
        <span className="ml-auto hidden self-center text-xs text-zinc-600 sm:block">
          {filteredNames.length} results
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredNames.map((name) => (
          <ComponentCard key={name} name={name} />
        ))}
      </div>
    </section>
  );
}
