import { ELEMENTS, CATEGORIES, getLayoutPosition } from '@/data/elements'
import ElementTile from '@/components/periodic-table/ElementTile'

const LEGEND_ORDER = [
  'alkali',
  'alkaline',
  'transition',
  'post-transition',
  'metalloid',
  'nonmetal',
  'halogen',
  'noble',
  'lanthanide',
  'actinide',
]

function FBlockMarker({ label, y }) {
  return (
    <div
      style={{ gridArea: `${y} / 1` }}
      className="flex items-center justify-center pr-2 text-[10px] font-semibold text-muted-foreground"
    >
      {label}
    </div>
  )
}

export default function PeriodicTableSection() {
  return (
    <section id="periodic-table" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">
            The periodic table
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Every element, one click away
          </h2>
          <p className="mt-3 text-muted-foreground">
            Hover any element and click to open its full story — properties,
            electron configuration and where it belongs.
          </p>
        </div>

        <div className="overflow-x-auto pt-2 pb-6">
          <div className="periodic-table-grid mx-auto w-max">
            {ELEMENTS.map((element) => {
              const { x, y } = getLayoutPosition(element[0])
              return (
                <ElementTile key={element[0]} element={element} x={x} y={y} />
              )
            })}
            <FBlockMarker label="57–71" y={9} />
            <FBlockMarker label="89–103" y={10} />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          {LEGEND_ORDER.map((key) => {
            const meta = CATEGORIES[key]
            return (
              <span key={key} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                {meta.label}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
