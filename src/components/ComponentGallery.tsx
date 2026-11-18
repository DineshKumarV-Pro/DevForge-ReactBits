'use client';

import { Component, lazy, type ComponentType, type ReactNode, Suspense } from 'react';
import { useEffect, useRef, useState } from 'react';

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
      className="flex min-h-64 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h2 className="font-mono text-sm text-white">{name}</h2>
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">React</span>
      </div>
      <div className="flex flex-1 items-center justify-center overflow-hidden p-4 text-white">
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
  return (
    <section id="components" className="mx-auto w-full max-w-7xl px-6 pb-24 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-violet-300">
            Component library
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Every interaction, ready to use.
          </h2>
        </div>
        <p className="hidden max-w-xs text-right text-sm leading-6 text-zinc-400 sm:block">
          {componentNames.length} animated building blocks for expressive interfaces.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {componentNames.map((name) => (
          <ComponentCard key={name} name={name} />
        ))}
      </div>
    </section>
  );
}
