import Link from "next/link"
import { ArrowRight, Inbox } from "lucide-react"

import { BadgeDemande } from "@/components/demo/badges"
import { buttonVariants } from "@/components/ui/button"
import { trouverDemarche } from "@/lib/demo/data"
import { formatDateCourt } from "@/lib/demo/format"
import type { Demande } from "@/lib/demo/types"
import { cn } from "@/lib/utils"

export function DemandesList({
  demandes,
  compact = false,
}: {
  demandes: Demande[]
  compact?: boolean
}) {
  if (demandes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        <p className="flex items-center gap-2 font-medium text-foreground">
          <Inbox className="size-4" />
          Aucune demande en cours
        </p>
        <p className="mt-1">
          Choisissez une démarche pour voir le dossier unique à l&apos;œuvre.
        </p>
        <Link
          href="/demarches"
          className={cn(
            buttonVariants({ variant: "outline", size: "xs" }),
            "mt-3"
          )}
        >
          Voir les démarches
          <ArrowRight />
        </Link>
      </div>
    )
  }

  return (
    <ul className="space-y-2.5">
      {demandes.map((demande) => {
        const demarche = trouverDemarche(demande.demarcheSlug)
        return (
          <li key={demande.id} className="rounded-lg border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[0.8rem] leading-snug font-medium">
                  {demarche?.nom ?? demande.demarcheSlug}
                </p>
                <p className="mt-0.5 font-mono text-[0.68rem] text-muted-foreground">
                  {demande.id} · déposée le {formatDateCourt(demande.creeLe)}
                </p>
              </div>
              <BadgeDemande statut={demande.statut} />
            </div>
            {demande.canal === "guichet" && (
              <p className="mt-1 text-[0.68rem] text-muted-foreground">
                Déposée au guichet avec assistance
                {demande.assistance ? ` — ${demande.assistance}` : ""}.
              </p>
            )}
            {demande.statut === "piece_demandee" && demande.motif && (
              <p className="mt-2 rounded-md bg-destructive/8 p-2 text-[0.72rem] leading-relaxed text-destructive">
                {demande.motif}
              </p>
            )}
            {!compact && demande.statut === "validee" && (
              <p className="mt-2 text-[0.72rem] text-muted-foreground">
                Document signé disponible dans votre coffre.
              </p>
            )}
          </li>
        )
      })}
    </ul>
  )
}
