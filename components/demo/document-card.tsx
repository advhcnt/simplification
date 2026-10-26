"use client"

import { useState } from "react"
import {
  ChevronDown,
  FileText,
  Fingerprint,
  Landmark,
  MapPin,
  Share2,
  Stamp,
} from "lucide-react"

import { BadgePiece } from "@/components/demo/badges"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { echeance, formatDateCourt } from "@/lib/demo/format"
import type { CategoriePiece, Piece } from "@/lib/demo/types"
import { cn } from "@/lib/utils"

const ICONES: Record<CategoriePiece, typeof FileText> = {
  "etat-civil": FileText,
  identite: Fingerprint,
  domicile: MapPin,
  fiscal: Landmark,
  judiciaire: Stamp,
  education: FileText,
}

export function DocumentCard({
  piece,
  onPartager,
}: {
  piece: Piece
  onPartager: (id: string) => void
}) {
  const [ouvert, setOuvert] = useState(false)
  const Icone = ICONES[piece.categorie]
  const absente = piece.absente === true

  return (
    <Card
      size="sm"
      className={cn(
        "gap-3 transition-shadow hover:shadow-sm",
        absente && "border border-dashed border-border bg-transparent ring-0"
      )}
    >
      <CardHeader className="gap-3">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg",
              absente
                ? "bg-muted text-muted-foreground"
                : "bg-secondary text-primary"
            )}
          >
            <Icone className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-[0.86rem] leading-snug font-medium text-balance">
              {piece.nom}
            </h3>
            <p className="mt-0.5 truncate text-[0.72rem] text-muted-foreground">
              {piece.emetteur}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <BadgePiece statut={piece.statut} />
          {piece.expireLe && !absente && (
            <span className="text-[0.7rem] text-muted-foreground">
              {echeance(piece.expireLe)}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[0.72rem]">
          <div>
            <dt className="text-muted-foreground">Référence</dt>
            <dd className="mt-0.5 font-mono text-[0.7rem] break-all">
              {piece.numero}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Délivrée le</dt>
            <dd className="mt-0.5 tabular">
              {formatDateCourt(piece.delivreLe)}
            </dd>
          </div>
        </dl>

        {ouvert && (
          <div className="space-y-2 rounded-lg bg-secondary/60 p-3 text-[0.75rem] leading-relaxed">
            <p className="text-muted-foreground">{piece.precision}</p>
            <p className="font-mono text-[0.68rem] text-muted-foreground">
              Empreinte : {piece.empreinte}
            </p>
          </div>
        )}

        <div className="flex items-center gap-1.5 pt-0.5">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setOuvert((v) => !v)}
            aria-expanded={ouvert}
          >
            {ouvert ? "Masquer" : "Voir la fiche"}
            <ChevronDown
              className={cn("transition-transform", ouvert && "rotate-180")}
            />
          </Button>
          {!absente && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onPartager(piece.id)}
            >
              <Share2 />
              Partager
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
