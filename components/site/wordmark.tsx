import { FileCheck2 } from "lucide-react"

import { cn } from "@/lib/utils"

export function Wordmark({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[0.6rem] bg-primary text-primary-foreground shadow-sm">
        <FileCheck2 className="size-4" strokeWidth={2.2} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.06rem] font-semibold tracking-tight">
          Dossier Unique
        </span>
        {!compact && (
          <span className="mt-1 text-[0.62rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Simplification administrative
          </span>
        )}
      </span>
    </span>
  )
}
