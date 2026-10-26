import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  CircleCheck,
  Clock,
  Coins,
  Files,
  MapPin,
} from "lucide-react"

import { DemandeWizard } from "@/components/demo/demande-wizard"
import { DEMARCHES, trouverDemarche } from "@/lib/demo/data"
import { formatDelai, formatFcfa, formatNombre } from "@/lib/demo/format"

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return DEMARCHES.map((demarche) => ({ slug: demarche.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const demarche = trouverDemarche(slug)
  return {
    title: demarche ? demarche.nom : "Démarche introuvable",
    description: demarche?.resume,
  }
}

export default async function DemarchePage({ params }: Params) {
  const { slug } = await params
  const demarche = trouverDemarche(slug)
  if (!demarche) notFound()

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <Link
        href="/demarches"
        className="inline-flex items-center gap-1.5 text-[0.78rem] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Toutes les démarches
      </Link>

      <div className="mt-4 max-w-2xl">
        <p className="text-[0.66rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
          {demarche.administration}
        </p>
        <h1 className="mt-1.5 font-display text-3xl tracking-tight text-balance sm:text-4xl">
          {demarche.nom}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {demarche.resume}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:items-start">
        <DemandeWizard demarche={demarche} />

        <aside className="space-y-4 lg:sticky lg:top-28">
          <div className="rounded-xl border bg-card p-4">
            <p className="text-[0.66rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              Parcours actuel
            </p>
            <ul className="mt-2.5 space-y-2 text-[0.8rem]">
              <Ligne
                icone={<Files className="size-3.5" />}
                texte={`${formatNombre(demarche.avant.pieces)} pièces à fournir`}
              />
              <Ligne
                icone={<MapPin className="size-3.5" />}
                texte={`${formatNombre(demarche.avant.deplacements)} déplacements`}
              />
              <Ligne
                icone={<Clock className="size-3.5" />}
                texte={formatDelai(demarche.avant.delaiJours * 24)}
              />
              <Ligne
                icone={<Coins className="size-3.5" />}
                texte={formatFcfa(demarche.avant.coutFcfa)}
              />
            </ul>
            <div className="my-3 border-t border-dashed" />
            <p className="text-[0.66rem] font-medium tracking-[0.12em] text-primary uppercase">
              Avec Dossier Unique
            </p>
            <ul className="mt-2.5 space-y-2 text-[0.8rem]">
              <Ligne
                icone={<CircleCheck className="size-3.5 text-primary" />}
                texte={
                  demarche.apres.pieces === 0
                    ? "Aucun justificatif à fournir"
                    : `${formatNombre(demarche.apres.pieces)} pièces à joindre`
                }
                accent
              />
              <Ligne
                icone={<CircleCheck className="size-3.5 text-primary" />}
                texte={
                  demarche.apres.deplacements === 0
                    ? "Aucun déplacement"
                    : `${formatNombre(demarche.apres.deplacements)} déplacements`
                }
                accent
              />
              <Ligne
                icone={<CircleCheck className="size-3.5 text-primary" />}
                texte={formatDelai(demarche.apres.delaiHeures)}
                accent
              />
              <Ligne
                icone={<CircleCheck className="size-3.5 text-primary" />}
                texte={formatFcfa(demarche.apres.coutFcfa)}
                accent
              />
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h2 className="text-[0.8rem] font-semibold">Après l&apos;envoi</h2>
            <ol className="mt-3 space-y-2.5">
              {demarche.etapes.map((etape, index) => (
                <li key={etape} className="flex gap-2.5 text-[0.75rem]">
                  <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.6rem] font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed text-muted-foreground">
                    {etape}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Ligne({
  icone,
  texte,
  accent = false,
}: {
  icone: React.ReactNode
  texte: string
  accent?: boolean
}) {
  return (
    <li
      className={
        accent
          ? "flex items-center gap-2 font-medium text-foreground"
          : "flex items-center gap-2 text-muted-foreground"
      }
    >
      {icone}
      {texte}
    </li>
  )
}
