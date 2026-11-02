import { FlaskConical } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-md">
            <FlaskConical className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Methyl&nbsp;Orange
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <a href="#periodic-table" className="transition hover:text-foreground">
            Periodic table
          </a>
          <a href="#periodic-table" className="transition hover:text-foreground">
            How it works
          </a>
        </nav>

        <Button asChild size="sm">
          <a href="#periodic-table">Open table</a>
        </Button>
      </div>
    </header>
  )
}
