"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MOYENNES, PARAMETRES_DEFAUT, calculerImpact } from "@/lib/demo/impact"
import type { ParametresImpact } from "@/lib/demo/impact"
import {
  formatFcfa,
  formatFcfaCourt,
  formatHeures,
  formatNombre,
} from "@/lib/demo/format"

type Cle = keyof ParametresImpact

const REGLAGES: {
  cle: Cle
  libelle: string
  min: number
  max: number
  pas: number
  format: (valeur: number) => string
}[] = [
  {
    cle: "dossiersParAn",
    libelle: "Dossiers traités par an",
    min: 50_000,
    max: 1_500_000,
    pas: 25_000,
    format: (v) => `${formatNombre(v)} dossiers`,
  },
  {
    cle: "partCouverture",
    libelle: "Part couverte par le dispositif",
    min: 0.05,
    max: 1,
    pas: 0.01,
    format: (v) => `${Math.round(v * 100)} %`,
  },
  {
    cle: "partPiecesEvitees",
    libelle: "Part des pièces réellement évitées",
    min: 0.3,
    max: 1,
    pas: 0.01,
    format: (v) => `${Math.round(v * 100)} %`,
  },
  {
    cle: "valeurHeureFcfa",
    libelle: "Valeur d'une heure rendue",
    min: 500,
    max: 5000,
    pas: 100,
    format: (v) => `${formatFcfa(v)} / h`,
  },
  {
    cle: "coutDeplacementFcfa",
    libelle: "Coût d'un déplacement évité",
    min: 200,
    max: 3000,
    pas: 100,
    format: (v) => formatFcfa(v),
  },
]

export function ImpactSimulator() {
  const [parametres, setParametres] =
    useState<ParametresImpact>(PARAMETRES_DEFAUT)
  const resultat = calculerImpact(parametres)

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-start">
      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg tracking-tight">
              Vos hypothèses
            </h2>
            <p className="mt-0.5 text-[0.72rem] text-muted-foreground">
              Bougez les curseurs : le modèle se recalcule instantanément.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Revenir aux hypothèses par défaut"
            onClick={() => setParametres(PARAMETRES_DEFAUT)}
          >
            <RotateCcw />
          </Button>
        </div>

        <div className="mt-4 space-y-4">
          {REGLAGES.map((reglage) => (
            <div key={reglage.cle}>
              <div className="flex items-baseline justify-between gap-2">
                <label
                  htmlFor={reglage.cle}
                  className="text-[0.76rem] leading-snug"
                >
                  {reglage.libelle}
                </label>
                <span className="shrink-0 text-[0.72rem] font-medium text-primary tabular">
                  {reglage.format(parametres[reglage.cle])}
                </span>
              </div>
              <input
                id={reglage.cle}
                type="range"
                min={reglage.min}
                max={reglage.max}
                step={reglage.pas}
                value={parametres[reglage.cle]}
                onChange={(event) =>
                  setParametres((precedent) => ({
                    ...precedent,
                    [reglage.cle]: Number(event.target.value),
                  }))
                }
                className="mt-1.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
                style={{ accentColor: "var(--primary)" }}
              />
            </div>
          ))}
        </div>

        <p className="mt-4 rounded-lg bg-secondary/60 p-2.5 text-[0.68rem] leading-relaxed text-muted-foreground">
          Valeurs moyennes par dossier retenues :{" "}
          {MOYENNES.heuresGagneesUsager.toFixed(1)} h rendues à l&apos;usager,{" "}
          {MOYENNES.deplacementsEvites.toFixed(1)} déplacements évités,{" "}
          {MOYENNES.piecesEvitees.toFixed(1)} pièces non redemandées,{" "}
          {MOYENNES.minutesGagneesAgent.toFixed(0)} min d&apos;agent
          économisées.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Resultat
            libelle="Temps rendu aux usagers"
            valeur={formatHeures(resultat.gainHeuresUsager)}
            detail={`soit ${formatNombre(resultat.joursPersonne)} journées de 8 h`}
            principal
          />
          <Resultat
            libelle="Déplacements évités"
            valeur={formatNombre(resultat.deplacementsEvites)}
            detail="visites de guichet supprimées"
            principal
          />
          <Resultat
            libelle="Valeur rendue aux usagers"
            valeur={`${formatFcfaCourt(resultat.economieHorsFrais)} FCFA`}
            detail={`temps + transport ; plus ${formatFcfaCourt(resultat.fraisDirects)} FCFA de frais en moins`}
            principal
          />
          <Resultat
            libelle="Pièces non redemandées"
            valeur={formatNombre(resultat.piecesEvitees)}
            detail={`${formatNombre(resultat.ramettes)} ramettes de papier évitées`}
            principal
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Resultat
            libelle="Dossiers couverts"
            valeur={formatNombre(resultat.dossiers)}
            detail="par an, dans ce scénario"
          />
          <Resultat
            libelle="Agents libérés"
            valeur={`${formatNombre(resultat.equivalentsAgent)} ETP`}
            detail={`${formatNombre(resultat.heuresAgent)} h d'instruction`}
          />
          <Resultat
            libelle="Frais directs évités"
            valeur={`${formatFcfaCourt(resultat.fraisDirects)} FCFA`}
            detail="hors valeur du temps"
          />
        </div>

        <p className="rounded-xl border border-dashed bg-card/50 p-3.5 text-[0.7rem] leading-relaxed text-muted-foreground">
          <strong className="font-medium text-foreground">
            Modèle ouvert :
          </strong>{" "}
          dossiers × gain moyen par dossier, sans effet de bord. Les gains
          unitaires proviennent des six démarches du catalogue et restent des
          hypothèses de travail à confronter aux données des administrations
          pendant le pilote. Les frais officiels en moins sont un transfert (ce
          que l&apos;usager ne paie plus, l&apos;administration ne
          l&apos;encaisse plus) : la valeur rendue les exclut volontairement.
        </p>
      </div>
    </div>
  )
}

function Resultat({
  libelle,
  valeur,
  detail,
  principal = false,
}: {
  libelle: string
  valeur: string
  detail: string
  principal?: boolean
}) {
  return (
    <div
      className={
        principal
          ? "rounded-xl border bg-card p-4 shadow-sm"
          : "rounded-xl border bg-card p-3.5"
      }
    >
      <p className="text-[0.68rem] leading-snug text-muted-foreground">
        {libelle}
      </p>
      <p
        className={
          principal
            ? "mt-1.5 font-display text-2xl leading-none font-semibold tracking-tight text-foreground tabular"
            : "mt-1 font-display text-lg leading-none font-semibold tracking-tight tabular"
        }
      >
        {valeur}
      </p>
      <p className="mt-1.5 text-[0.66rem] leading-snug text-muted-foreground">
        {detail}
      </p>
    </div>
  )
}
