"use client"

import { useState } from "react"
import { CalendarClock, ShieldCheck, Sparkles } from "lucide-react"

import { DocumentCard } from "@/components/demo/document-card"
import { DemandesList } from "@/components/demo/demandes-list"
import { JournalAcces } from "@/components/demo/journal"
import { SharePanel } from "@/components/demo/share-panel"
import { formatDate } from "@/lib/demo/format"
import { useDemo } from "@/lib/demo/store"

export default function MonDossierPage() {
  const etat = useDemo()
  const [selection, setSelection] = useState<string[]>([
    "acte-naissance",
    "cni",
  ])

  const pieces = etat.pieces
  const verifiees = pieces.filter((piece) => piece.statut === "verifie").length
  const aRenouveler = pieces.filter((piece) => piece.statut === "a_renouveler")
  const completes = verifiees + aRenouveler.length
  const progression = Math.round((completes / pieces.length) * 100)

  function partager(id: string) {
    setSelection((precedent) =>
      precedent.includes(id) ? precedent : [...precedent, id]
    )
    document.getElementById("partage")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-9 sm:px-8 sm:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.68rem] font-medium tracking-[0.16em] text-primary uppercase">
            Compte de démonstration
          </p>
          <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
            Mon Dossier
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Vos documents officiels sont conservés ici une seule fois, vérifiés
            auprès de leur émetteur. Vous décidez qui les consulte, et pour
            combien de temps.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-[0.72rem] text-muted-foreground shadow-sm">
          <ShieldCheck className="size-3.5 text-primary" />
          Identité vérifiée par l&apos;ANIP
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="space-y-6">
          <section className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 font-display text-lg font-semibold text-primary">
                  AS
                </span>
                <div>
                  <p className="font-display text-lg leading-tight font-semibold">
                    {etat.profil.prenoms} {etat.profil.nom}
                  </p>
                  <p className="mt-0.5 text-[0.76rem] text-muted-foreground">
                    Née le {formatDate(etat.profil.neLe)} ·{" "}
                    {etat.profil.adresse}
                  </p>
                </div>
              </div>
              <dl className="flex flex-wrap gap-x-6 gap-y-2 text-[0.72rem]">
                <div>
                  <dt className="text-muted-foreground">Identifiant unique</dt>
                  <dd className="mt-0.5 font-mono">
                    {etat.profil.identifiant}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Téléphone</dt>
                  <dd className="mt-0.5 tabular">{etat.profil.telephone}</dd>
                </div>
              </dl>
            </div>
            {etat.profil.entreprise && (
              <p className="mt-4 flex items-center gap-2 rounded-lg bg-secondary/70 px-3 py-2 text-[0.74rem] text-muted-foreground">
                <Sparkles className="size-3.5 shrink-0 text-chart-2" />
                Compte entreprise rattaché : {etat.profil.entreprise}
              </p>
            )}
          </section>

          <section>
            <div className="mb-3 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-xl tracking-tight">
                  Mes pièces
                </h2>
                <p className="mt-0.5 text-[0.78rem] text-muted-foreground">
                  {completes} pièces disponibles · {verifiees} vérifiées à la
                  source
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[0.68rem] font-medium text-primary">
                {progression} % complet
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {pieces.map((piece) => (
                <DocumentCard
                  key={piece.id}
                  piece={piece}
                  onPartager={partager}
                />
              ))}
            </div>
          </section>

          <SharePanel selection={selection} onSelection={setSelection} />
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28">
          <section className="rounded-xl border bg-card p-4">
            <h2 className="text-[0.8rem] font-semibold">Santé du dossier</h2>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progression}%` }}
              />
            </div>
            <p className="mt-2 text-[0.72rem] text-muted-foreground">
              {progression} % de vos pièces sont utilisables immédiatement par
              une administration.
            </p>
            {aRenouveler.length > 0 && (
              <p className="mt-3 flex items-start gap-2 rounded-lg bg-chart-2/12 p-2.5 text-[0.72rem] leading-relaxed text-accent-foreground">
                <CalendarClock className="mt-0.5 size-3.5 shrink-0" />
                {aRenouveler.length} pièce
                {aRenouveler.length > 1 ? "s demandent" : " demande"} une
                attention : {aRenouveler.map((p) => p.nom).join(", ")}.
              </p>
            )}
          </section>

          <section className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[0.8rem] font-semibold">Mes demandes</h2>
              <span className="text-[0.68rem] text-muted-foreground">
                {etat.demandes.length} au total
              </span>
            </div>
            <div className="mt-3">
              <DemandesList demandes={etat.demandes} compact />
            </div>
          </section>

          <section className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[0.8rem] font-semibold">
                Journal d&apos;accès
              </h2>
              <span className="text-[0.68rem] text-muted-foreground">
                {etat.consentements.length} accès
              </span>
            </div>
            <p className="mt-1 text-[0.7rem] text-muted-foreground">
              Qui a consulté quoi, et jusqu&apos;à quand.
            </p>
            <div className="mt-3">
              <JournalAcces consentements={etat.consentements} />
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
