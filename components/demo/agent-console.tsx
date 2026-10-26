"use client"

import { useState } from "react"
import {
  CircleCheck,
  CircleX,
  Clock,
  FileText,
  Inbox,
  ShieldCheck,
  Timer,
} from "lucide-react"

import { AssistancePanel } from "@/components/demo/assistance-panel"
import { BadgeDemande } from "@/components/demo/badges"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { trouverDemarche } from "@/lib/demo/data"
import { formatDateCourt, formatDelai } from "@/lib/demo/format"
import { deciderDemande, useDemo } from "@/lib/demo/store"
import type { Demande } from "@/lib/demo/types"
import { cn } from "@/lib/utils"

export function AgentConsole() {
  const [mode, setMode] = useState<"file" | "assistance">("file")

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        aria-label="Mode de travail du guichet"
        className="flex w-fit gap-1 rounded-xl border bg-card p-1 shadow-sm"
      >
        {[
          { cle: "file" as const, libelle: "File d'attente" },
          { cle: "assistance" as const, libelle: "Guichet assisté" },
        ].map((onglet) => (
          <button
            key={onglet.cle}
            role="tab"
            type="button"
            aria-selected={mode === onglet.cle}
            onClick={() => setMode(onglet.cle)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-[0.78rem] font-medium transition-colors",
              mode === onglet.cle
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {onglet.libelle}
          </button>
        ))}
      </div>

      {mode === "file" ? <FileAttente /> : <AssistancePanel />}
    </div>
  )
}

function FileAttente() {
  const etat = useDemo()
  const [selectionId, setSelectionId] = useState<string | null>(null)
  const [motif, setMotif] = useState("")

  const demandes = etat.demandes
  const selectionnee: Demande | undefined =
    demandes.find((demande) => demande.id === selectionId) ?? demandes[0]

  const enAttente = demandes.filter(
    (demande) =>
      demande.statut === "transmise" || demande.statut === "en_traitement"
  ).length

  if (!selectionnee) {
    return (
      <div className="rounded-2xl border border-dashed bg-card/50 p-8 text-center">
        <Inbox className="mx-auto size-6 text-muted-foreground" />
        <p className="mt-3 font-medium">Aucune demande dans la file</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Ouvrez une démarche côté citoyen pour la voir arriver ici.
        </p>
      </div>
    )
  }

  const demarche = trouverDemarche(selectionnee.demarcheSlug)
  const pieces = selectionnee.pieces
    .map((id) => etat.pieces.find((piece) => piece.id === id))
    .filter((piece) => piece !== undefined)
  const peutDemander = motif.trim().length > 3

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start">
      <div className="rounded-2xl border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <h2 className="text-[0.82rem] font-semibold">File d&apos;attente</h2>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.66rem] font-semibold text-primary">
            {enAttente} à traiter
          </span>
        </div>
        <ul className="divide-y">
          {demandes.map((demande) => {
            const active = demande.id === selectionnee.id
            const nom =
              trouverDemarche(demande.demarcheSlug)?.nom ?? demande.demarcheSlug
            return (
              <li key={demande.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectionId(demande.id)
                    setMotif("")
                  }}
                  className={cn(
                    "w-full px-4 py-3 text-left transition-colors",
                    active ? "bg-primary/6" : "hover:bg-muted/60"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[0.8rem] leading-snug font-medium">
                      {nom}
                    </p>
                    <BadgeDemande statut={demande.statut} />
                  </div>
                  <p className="mt-1 font-mono text-[0.66rem] text-muted-foreground">
                    {demande.id} · {formatDateCourt(demande.creeLe)}
                  </p>
                  <p className="mt-1 text-[0.7rem] text-muted-foreground">
                    {demande.demandeur}
                    {demande.canal === "guichet" && (
                      <span className="ml-1.5 rounded-full bg-secondary px-1.5 py-0.5 text-[0.6rem] font-medium text-secondary-foreground">
                        guichet assisté
                      </span>
                    )}
                  </p>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b p-4">
          <div>
            <p className="font-mono text-[0.68rem] text-muted-foreground">
              {selectionnee.id}
            </p>
            <h2 className="mt-0.5 font-display text-lg leading-tight font-semibold tracking-tight">
              {demarche?.nom ?? selectionnee.demarcheSlug}
            </h2>
            <p className="mt-0.5 text-[0.72rem] text-muted-foreground">
              {demarche?.administration}
            </p>
          </div>
          <BadgeDemande statut={selectionnee.statut} className="mt-1" />
        </div>

        <div className="space-y-5 p-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <Info libelle="Demandeur" valeur={selectionnee.demandeur} />
            <Info
              libelle="Déposée le"
              valeur={formatDateCourt(selectionnee.creeLe)}
            />
            <Info
              libelle="Délai cible"
              valeur={demarche ? formatDelai(demarche.apres.delaiHeures) : "—"}
            />
            <Info
              libelle="Temps agent estimé"
              valeur={
                demarche ? `${demarche.apres.tempsAgentMinutes} min` : "—"
              }
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[0.78rem] font-semibold">
                Pièces vérifiées à la source
              </h3>
              <span className="inline-flex items-center gap-1 text-[0.66rem] text-primary">
                <ShieldCheck className="size-3.5" />
                Aucun contrôle manuel
              </span>
            </div>
            <ul className="mt-2 space-y-1.5">
              {pieces.map((piece) => (
                <li
                  key={piece.id}
                  className="flex items-center gap-2.5 rounded-lg border bg-secondary/40 px-3 py-2"
                >
                  <CircleCheck className="size-4 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.78rem] font-medium">
                      {piece.nom}
                    </span>
                    <span className="text-[0.66rem] text-muted-foreground">
                      {piece.emetteur} · empreinte {piece.empreinte}
                    </span>
                  </span>
                  <span className="shrink-0 text-[0.62rem] font-medium text-primary">
                    Authentique
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 flex items-center gap-1.5 text-[0.68rem] text-muted-foreground">
              <Clock className="size-3" />
              Consultation effectuée dans le cadre du consentement{" "}
              {etat.consentements.find((c) => c.motif.includes(selectionnee.id))
                ?.code ?? "du dossier"}
              .
            </p>
          </div>

          {selectionnee.statut === "piece_demandee" && selectionnee.motif && (
            <div className="rounded-lg bg-destructive/8 p-3 text-[0.75rem] leading-relaxed text-destructive">
              <strong className="font-semibold">Pièce demandée :</strong>{" "}
              {selectionnee.motif}
            </div>
          )}
          {selectionnee.statut === "validee" && (
            <div className="rounded-lg bg-primary/8 p-3 text-[0.75rem] leading-relaxed text-primary">
              <strong className="font-semibold">Dossier validé.</strong> Le
              document signé a été déposé dans le coffre du demandeur et la
              notification SMS a été envoyée.
            </div>
          )}

          <div className="rounded-xl border bg-secondary/40 p-3">
            <p className="text-[0.72rem] font-medium">Décision</p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <Input
                value={motif}
                onChange={(event) => setMotif(event.target.value)}
                placeholder="Motif, si une pièce est demandée…"
                className="h-9 bg-background"
                aria-label="Motif de la demande de pièce"
              />
              <Button
                variant="outline"
                size="sm"
                className="shrink-0"
                disabled={!peutDemander}
                onClick={() => {
                  deciderDemande(
                    selectionnee.id,
                    "piece_demandee",
                    motif.trim()
                  )
                  setMotif("")
                }}
              >
                <CircleX />
                Demander une pièce
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() => deciderDemande(selectionnee.id, "validee")}
              >
                <CircleCheck />
                Valider le dossier
              </Button>
              {selectionnee.statut !== "en_traitement" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    deciderDemande(selectionnee.id, "en_traitement")
                  }
                >
                  <Timer />
                  Remettre en traitement
                </Button>
              )}
            </div>
            <p className="mt-2 flex items-start gap-1.5 text-[0.66rem] leading-relaxed text-muted-foreground">
              <FileText className="mt-0.5 size-3 shrink-0" />
              Chaque décision est motivée, horodatée et notifiée au demandeur.
              L&apos;agent ne voit que les pièces couvertes par le consentement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Info({ libelle, valeur }: { libelle: string; valeur: string }) {
  return (
    <div className="rounded-lg border px-3 py-2">
      <p className="text-[0.66rem] text-muted-foreground">{libelle}</p>
      <p className="mt-0.5 text-[0.78rem] font-medium">{valeur}</p>
    </div>
  )
}
