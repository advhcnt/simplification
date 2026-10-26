"use client"

import { Clock, ShieldCheck, Undo2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatDateCourt, joursRestants } from "@/lib/demo/format"
import { revoquerConsentement } from "@/lib/demo/store"
import type { Consentement } from "@/lib/demo/types"
import { cn } from "@/lib/utils"

function statutEffectif(consentement: Consentement): Consentement["statut"] {
  if (consentement.statut === "revoque") return "revoque"
  return joursRestants(consentement.expireLe) < 0 ? "expire" : "actif"
}

const STYLES: Record<Consentement["statut"], string> = {
  actif: "bg-primary/10 text-primary ring-primary/20",
  revoque: "bg-destructive/10 text-destructive ring-destructive/20",
  expire: "bg-muted text-muted-foreground ring-border",
}

const LIBELLES: Record<Consentement["statut"], string> = {
  actif: "Actif",
  revoque: "Révoqué",
  expire: "Expiré",
}

export function JournalAcces({
  consentements,
}: {
  consentements: Consentement[]
}) {
  if (consentements.length === 0) {
    return (
      <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        Aucun accès enregistré pour le moment.
      </p>
    )
  }

  return (
    <ol className="space-y-2.5">
      {consentements.map((consentement) => {
        const statut = statutEffectif(consentement)
        return (
          <li
            key={consentement.id}
            className="rounded-lg border bg-card/60 p-3 text-[0.78rem]"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="leading-snug font-medium">
                {consentement.administration}
              </p>
              <span
                className={cn(
                  "shrink-0 rounded-full px-1.5 py-0.5 text-[0.62rem] font-medium ring-1 ring-inset",
                  STYLES[statut]
                )}
              >
                {LIBELLES[statut]}
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">{consentement.motif}</p>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="size-3" />
                {consentement.pieces.length} pièce
                {consentement.pieces.length > 1 ? "s" : ""}
              </span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" />
                {formatDateCourt(consentement.creeLe)} →{" "}
                {formatDateCourt(consentement.expireLe)}
              </span>
            </p>
            {statut === "actif" && (
              <Button
                variant="ghost"
                size="xs"
                className="mt-2 -ml-1.5 text-muted-foreground"
                onClick={() => revoquerConsentement(consentement.id)}
              >
                <Undo2 />
                Révoquer
              </Button>
            )}
          </li>
        )
      })}
    </ol>
  )
}
