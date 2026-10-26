import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock, Coins, Files, MapPin } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { DEMARCHES } from "@/lib/demo/data"
import { formatDelai, formatFcfa, formatNombre } from "@/lib/demo/format"

export const metadata: Metadata = {
  title: "Démarches disponibles",
  description:
    "Six démarches courantes, comparées entre le parcours actuel et le parcours avec Dossier Unique.",
}

const CIBLES: Record<string, string> = {
  citoyen: "Citoyens",
  entreprise: "Entreprises",
  agent: "Agents",
}

export default function DemarchesPage() {
  const sansJustificatif = DEMARCHES.filter((d) => d.apres.pieces === 0).length

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-9 sm:px-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-[0.68rem] font-medium tracking-[0.16em] text-primary uppercase">
          Le catalogue
        </p>
        <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
          Six démarches, un seul dossier
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Chaque fiche compare ce que coûte la démarche aujourd&apos;hui et ce
          qu&apos;elle coûte quand l&apos;administration vérifie vos pièces à la
          source. Les montants et délais sont des ordres de grandeur de travail,
          détaillés dans le modèle d&apos;impact.
        </p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1.5 text-[0.72rem] font-medium text-primary">
          <span className="tabular">{sansJustificatif}</span> démarches sans
          aucun justificatif à fournir
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {DEMARCHES.map((demarche) => {
          const sansPapier = demarche.apres.pieces === 0
          return (
            <article
              key={demarche.slug}
              className="group flex flex-col rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.66rem] font-medium tracking-[0.1em] text-muted-foreground uppercase">
                    {demarche.administration}
                  </p>
                  <h2 className="mt-1.5 font-display text-[1.22rem] leading-tight font-semibold tracking-tight">
                    {demarche.nom}
                  </h2>
                </div>
                {sansPapier && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-[0.62rem] font-semibold text-primary">
                    0 justificatif
                  </span>
                )}
              </div>

              <p className="mt-2 flex-1 text-[0.82rem] leading-relaxed text-muted-foreground">
                {demarche.resume}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-[0.72rem]">
                <Comparaison
                  icone={<Files className="size-3.5" />}
                  avant={`${formatNombre(demarche.avant.pieces)} pièces`}
                  apres={
                    demarche.apres.pieces === 0
                      ? "Aucune"
                      : `${formatNombre(demarche.apres.pieces)} pièce`
                  }
                />
                <Comparaison
                  icone={<Clock className="size-3.5" />}
                  avant={formatDelai(demarche.avant.delaiJours * 24)}
                  apres={formatDelai(demarche.apres.delaiHeures)}
                />
                <Comparaison
                  icone={<MapPin className="size-3.5" />}
                  avant={`${formatNombre(demarche.avant.deplacements)} dépl.`}
                  apres={
                    demarche.apres.deplacements === 0
                      ? "Aucun"
                      : `${formatNombre(demarche.apres.deplacements)} dépl.`
                  }
                />
                <Comparaison
                  icone={<Coins className="size-3.5" />}
                  avant={formatFcfa(demarche.avant.coutFcfa)}
                  apres={formatFcfa(demarche.apres.coutFcfa)}
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3.5">
                <p className="text-[0.68rem] text-muted-foreground">
                  {demarche.cibles.map((cible) => CIBLES[cible]).join(" · ")}
                </p>
                <Link
                  href={`/demarches/${demarche.slug}`}
                  className={buttonVariants({ size: "sm" })}
                >
                  Ouvrir la demande
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      <p className="mt-6 rounded-xl border border-dashed bg-card/50 p-4 text-[0.72rem] leading-relaxed text-muted-foreground">
        <strong className="font-medium text-foreground">Lecture :</strong> la
        colonne de gauche décrit le parcours papier observé (pièces demandées,
        déplacements, délai, frais), la colonne de droite le parcours cible une
        fois les pièces vérifiées disponibles. Le prototype simule le parcours
        cible ; les valeurs de gauche sont des hypothèses de travail, pas des
        statistiques officielles.
      </p>
    </div>
  )
}

function Comparaison({
  icone,
  avant,
  apres,
}: {
  icone: React.ReactNode
  avant: string
  apres: string
}) {
  return (
    <div className="rounded-lg bg-secondary/60 px-2.5 py-2">
      <p className="flex items-center gap-1.5 text-muted-foreground">
        {icone}
        <span className="line-through decoration-muted-foreground/40">
          {avant}
        </span>
      </p>
      <p className="mt-0.5 flex items-center gap-1 font-medium text-primary">
        <ArrowRight className="size-3" />
        {apres}
      </p>
    </div>
  )
}
