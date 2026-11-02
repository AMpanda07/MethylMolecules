import { ArrowDown, BookOpen, MousePointerClick } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FEATURES = [
  {
    icon: MousePointerClick,
    title: 'Click any element',
    body: 'A fullscreen morphing dialog reveals mass, phase, group, period and electron shells.',
  },
  {
    icon: BookOpen,
    title: '101+ curated stories',
    body: 'Every tile hides a one-line summary that makes chemistry memorable, not intimidating.',
  },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60rem 30rem at 15% -10%, color-mix(in oklab, var(--color-primary) 14%, transparent), transparent), radial-gradient(50rem 26rem at 85% 20%, color-mix(in oklab, oklch(0.72 0.17 30) 16%, transparent), transparent)',
        }}
      />
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 pt-16 pb-10 text-center md:px-8 md:pt-24">
        <span className="animate-in fade-in slide-in-from-top-2 duration-700 mb-6 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
          <span className="size-2 animate-pulse rounded-full bg-primary" />
          118 elements · interactive · zero fluff
        </span>

        <h1 className="animate-in fade-in slide-in-from-top-4 duration-700 max-w-4xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">
          Don't just memorize the periodic table —{' '}
          <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-violet-500 bg-clip-text text-transparent">
            explore it
          </span>
        </h1>

        <p className="animate-in fade-in slide-in-from-top-4 duration-700 delay-100 mt-6 max-w-2xl text-lg text-muted-foreground">
          Methyl Orange turns the modern periodic table into an interactive
          playground. Hover to feel every tile react, click to morph open its
          identity — one story at a time.
        </p>

        <div className="animate-in fade-in slide-in-from-top-4 duration-700 delay-150 mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <a href="#periodic-table">
              Explore the table
              <ArrowDown className="size-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#periodic-table">How it works</a>
          </Button>
        </div>

        <div className="mt-14 grid w-full max-w-3xl gap-4 text-left sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-2xl border bg-background/60 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                <Icon className="size-5" />
              </span>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
