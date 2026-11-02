import { getLayoutPosition } from '@/data/elements'
import {
  MorphingDialogClose,
  MorphingDialogContent,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
} from '@/components/motion-primitives/morphing-dialog'
import { CategoryChip, getCategoryMeta } from './CategoryChip'

function Fact({ label, value }) {
  return (
    <div className="rounded-xl border bg-muted/40 p-4">
      <div className="text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-1 text-base font-semibold break-words">{value}</div>
    </div>
  )
}

const PHASE_ICON = { solid: '●', liquid: '◐', gas: '○' }

export default function ElementDetailsDialog({ element }) {
  const [z, symbol, name, mass, category, phase, config, shells, summary] =
    element
  const meta = getCategoryMeta(category)
  const pos = getLayoutPosition(z)
  const group = pos.y <= 7 ? pos.x : '—'
  const period = pos.y === 9 ? 6 : pos.y === 10 ? 7 : Math.min(pos.y, 7)

  return (
    <MorphingDialogContent
      className="h-[100svh] w-screen rounded-none border-none bg-background/95 shadow-2xl backdrop-blur-md"
      style={{ ['--el-color']: meta?.color, ['--el-color-dark']: meta?.colorDark }}
    >      <div className="flex h-full w-full flex-col overflow-y-auto md:flex-row">
        <div
          className="relative flex min-h-[40%] shrink-0 flex-col justify-between overflow-hidden p-8 md:w-[38%] md:p-12"
          style={{
            background: `linear-gradient(160deg, color-mix(in oklab, ${meta.color} 85%, white) 0%, ${meta.color} 55%, color-mix(in oklab, ${meta.colorDark} 90%, black) 100%)`,
          }}
        >
          <div className="text-2xl font-semibold text-white/80">#{z}</div>
          <div className="mt-auto">
            <div
              className="text-[clamp(4rem,14vw,11rem)] leading-none font-black tracking-tighter text-white"
              style={{ textShadow: '0 10px 40px rgb(0 0 0 / 0.25)' }}
            >
              {symbol}
            </div>
            <MorphingDialogTitle className="mt-4 text-2xl font-semibold text-white md:text-3xl">
              {name}
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className="mt-2">
              <span className="text-sm font-medium text-white/85">
                {meta.label}
              </span>
            </MorphingDialogSubtitle>
          </div>
          <div
            className="pointer-events-none absolute -right-24 -bottom-24 size-72 rounded-full opacity-40 blur-3xl"
            style={{ background: 'rgba(255,255,255,0.35)' }}
          />
        </div>

        <div className="flex-1 space-y-8 p-8 md:overflow-y-auto md:p-12">
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {summary}
          </p>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            <Fact label="Atomic number" value={z} />
            <Fact label="Atomic mass" value={`${mass} u`} />
            <Fact
              label="Phase at STP"
              value={`${PHASE_ICON[phase] ?? '●'} ${phase[0].toUpperCase()}${phase.slice(1)}`}
            />
            <Fact label="Group" value={group} />
            <Fact label="Period" value={period} />
            <Fact label="Family" value={<CategoryChip categoryKey={category} />} />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Electron configuration
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-xl border px-4 py-2 font-mono text-sm font-semibold">
                {config}
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Electron shells
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {shells.map((count, i) => {
                const shellLetters = ['K', 'L', 'M', 'N', 'O', 'P', 'Q']
                return (
                  <span
                    key={i}
                    className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
                    style={{
                      backgroundColor: `color-mix(in oklab, ${meta.color} 14%, transparent)`,
                      borderColor: `color-mix(in oklab, ${meta.color} 45%, transparent)`,
                    }}
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {shellLetters[i]}n{i + 1}
                    </span>
                    <span className="font-bold">{count}</span>
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <MorphingDialogClose
        className="absolute top-5 right-5 z-10 flex size-10 items-center justify-center rounded-full border bg-background/80 shadow-md backdrop-blur transition hover:scale-105 hover:bg-background"
        variants={{
          initial: { opacity: 0, rotate: -90, scale: 0.5 },
          animate: { opacity: 1, rotate: 0, scale: 1 },
          exit: { opacity: 0, rotate: 90, scale: 0.5 },
        }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </MorphingDialogContent>
  )
}
