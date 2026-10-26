import { cn } from "@/lib/utils"
import type { StatutDemande, StatutPiece } from "@/lib/demo/types"

const PIECE: Record<StatutPiece, { libelle: string; classes: string }> = {
  verifie: {
    libelle: "Vérifié à la source",
    classes: "bg-primary/10 text-primary ring-primary/20",
  },
  a_renouveler: {
    libelle: "À renouveler",
    classes: "bg-chart-2/20 text-accent-foreground ring-chart-2/40",
  },
  manquant: {
    libelle: "Non dématérialisé",
    classes: "bg-muted text-muted-foreground ring-border",
  },
}

const DEMANDE: Record<StatutDemande, { libelle: string; classes: string }> = {
  transmise: {
    libelle: "Transmise",
    classes: "bg-secondary text-secondary-foreground ring-border",
  },
  en_traitement: {
    libelle: "En traitement",
    classes: "bg-chart-2/20 text-accent-foreground ring-chart-2/40",
  },
  validee: {
    libelle: "Validée",
    classes: "bg-primary/10 text-primary ring-primary/20",
  },
  piece_demandee: {
    libelle: "Pièce demandée",
    classes: "bg-destructive/10 text-destructive ring-destructive/20",
  },
}

const BASE =
  "inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[0.68rem] font-medium ring-1 ring-inset"

export function BadgePiece({
  statut,
  className,
}: {
  statut: StatutPiece
  className?: string
}) {
  const config = PIECE[statut]
  return (
    <span className={cn(BASE, config.classes, className)}>
      {config.libelle}
    </span>
  )
}

export function BadgeDemande({
  statut,
  className,
}: {
  statut: StatutDemande
  className?: string
}) {
  const config = DEMANDE[statut]
  return (
    <span className={cn(BASE, config.classes, className)}>
      {config.libelle}
    </span>
  )
}

export const LIBELLE_DEMANDE = DEMANDE
export const LIBELLE_PIECE = PIECE
