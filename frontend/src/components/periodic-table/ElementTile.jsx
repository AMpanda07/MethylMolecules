import { FlaskConical } from 'lucide-react'
import { Cursor } from '@/components/motion-primitives/cursor'
import {
  MorphingDialog,
  MorphingDialogTrigger,
} from '@/components/motion-primitives/morphing-dialog'
import { cn } from '@/lib/utils'
import { tileColors } from './CategoryChip'
import ElementDetailsDialog from './ElementDetailsDialog'

export default function ElementTile({ element, x, y }) {
  const [z, symbol, name, mass, category] = element
  const colors = tileColors(category)

  return (
    <div style={{ gridArea: `${y} / ${x}` }} className="relative">
      <MorphingDialog>
        <MorphingDialogTrigger
          className={cn(
            'group/tile relative h-full w-full overflow-hidden rounded-lg border text-left transition duration-200 hover:z-10 hover:scale-110 hover:shadow-lg focus-visible:outline-none',
            colors.className
          )}
          style={colors.style}
          aria-label={`Open details for ${name} (${symbol}), element number ${z}`}
        >
          <span className="absolute left-1 top-0.5 text-[9px] leading-none font-medium opacity-70">
            {z}
          </span>
          <span className="flex h-full w-full items-end justify-center pb-2">
            <span className="text-base leading-none font-semibold tracking-tight md:text-lg">
              {symbol}
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-px flex justify-center text-[8px] leading-none font-medium opacity-60 transition-opacity duration-200 group-hover/tile:opacity-0 max-sm:hidden">
            {mass}
          </span>
        </MorphingDialogTrigger>
        <ElementDetailsDialog element={element} />
      </MorphingDialog>
      <Cursor
        attachToParent
        springConfig={{ stiffness: 400, damping: 30, mass: 0.6 }}
        variants={{
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0, opacity: 0 },
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        <div className="flex items-center gap-2 rounded-full border bg-background py-1! pr-3! pl-1.5! shadow-lg">
          <span
            className="flex size-6 items-center justify-center rounded-full"
            style={{
              backgroundColor: `color-mix(in oklab, ${colors.style['--el-color']} 30%, white)`,
            }}
          >
            <FlaskConical className="size-3.5" style={{ color: colors.style['--el-color-dark'] }} />
          </span>
          <span className="text-xs font-medium whitespace-nowrap">
            {symbol} · click for details
          </span>
        </div>
      </Cursor>
    </div>
  )
}
