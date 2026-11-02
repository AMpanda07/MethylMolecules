import { cn } from '@/lib/utils'
import { CATEGORIES } from '@/data/elements'

export function getCategoryMeta(categoryKey) {
  return CATEGORIES[categoryKey]
}

export function tileColors(categoryKey) {
  const meta = getCategoryMeta(categoryKey)
  if (!meta) {
    return {
      style: {},
      className: 'bg-muted text-muted-foreground',
    }
  }
  return {
    style: {
      '--el-color': meta.color,
      '--el-color-dark': meta.colorDark,
      backgroundColor: `color-mix(in oklab, ${meta.color} 22%, transparent)`,
      borderColor: `color-mix(in oklab, ${meta.color} 55%, transparent)`,
    },
    className: 'text-[color:var(--el-color-dark)]',
  }
}

export function CategoryChip({ categoryKey, className }) {
  const meta = getCategoryMeta(categoryKey)
  if (!meta) return null
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium',
        className
      )}
      style={{
        backgroundColor: `color-mix(in oklab, ${meta.color} 18%, transparent)`,
        borderColor: `color-mix(in oklab, ${meta.color} 50%, transparent)`,
        color: meta.colorDark,
      }}
    >
      <span
        className="size-2 rounded-full"
        style={{ backgroundColor: meta.color }}
      />
      {meta.label}
    </span>
  )
}
