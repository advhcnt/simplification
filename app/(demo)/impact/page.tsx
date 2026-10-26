import type { Metadata } from "next"

import { ImpactSimulator } from "@/components/demo/impact-simulator"
import { DEMARCHES } from "@/lib/demo/data"
import {
  formatDelai,
  formatFcfa,
  formatNombre,
  pluraliser,
} from "@/lib/demo/format"
import { HYPOTHESES } from "@/lib/demo/impact"

export const metadata: Metadata = {
  title: "Simulateur d'impact",
  description:
    "Combien de temps, d'argent et de déplacements le dossier unique rend-il ? Modèle ouvert, hypothèses modifiables.",
}

export default function ImpactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-9 sm:px-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-[0.68rem] font-medium tracking-[0.16em] text-primary uppercase">
          Le modèle
        </p>
        <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
          Ce que la simplification rapporte
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Un modèle d&apos;impact ouvert : toutes les hypothèses sont visibles
          et modifiables. Nous préférons un calcul contestable et vérifiable à
          un chiffre spectaculaire et invérifiable.
        </p>
      </div>

      <div className="mt-8">
        <ImpactSimulator />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl tracking-tight">
          D&apos;où viennent les gains unitaires
        </h2>
        <p className="mt-1 max-w-2xl text-[0.8rem] text-muted-foreground">
          Chaque démarche est modélisée séparément, puis moyennée. Les valeurs
          de gauche sont des ordres de grandeur constatés sur le terrain, à
          confronter aux données de chaque administration.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[720px] text-left text-[0.76rem]">
            <thead className="bg-secondary/70 text-[0.66rem] tracking-[0.06em] text-muted-foreground uppercase">
              <tr>
                <th className="px-3 py-2.5 font-medium">Démarche</th>
                <th className="px-3 py-2.5 text-right font-medium">Pièces</th>
                <th className="px-3 py-2.5 text-right font-medium">Délai</th>
                <th className="px-3 py-2.5 text-right font-medium">Frais</th>
                <th className="px-3 py-2.5 text-right font-medium">
                  Temps usager
                </th>
                <th className="px-3 py-2.5 text-right font-medium">
                  Temps agent
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {DEMARCHES.map((demarche) => (
                <tr key={demarche.slug} className="align-top">
                  <td className="px-3 py-2.5">
                    <span className="font-medium">{demarche.nom}</span>
                    <span className="mt-0.5 block text-[0.66rem] text-muted-foreground">
                      {demarche.administration}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right whitespace-nowrap tabular">
                    <span className="text-muted-foreground line-through">
                      {formatNombre(demarche.avant.pieces)}
                    </span>{" "}
                    → {formatNombre(demarche.apres.pieces)}
                  </td>
                  <td className="px-3 py-2.5 text-right whitespace-nowrap tabular">
                    <span className="text-muted-foreground line-through">
                      {formatDelai(demarche.avant.delaiJours * 24)}
                    </span>{" "}
                    → {formatDelai(demarche.apres.delaiHeures)}
                  </td>
                  <td className="px-3 py-2.5 text-right whitespace-nowrap tabular">
                    <span className="text-muted-foreground line-through">
                      {formatFcfa(demarche.avant.coutFcfa)}
                    </span>{" "}
                    → {formatFcfa(demarche.apres.coutFcfa)}
                  </td>
                  <td className="px-3 py-2.5 text-right whitespace-nowrap tabular">
                    {formatNombre(demarche.avant.tempsUsagerHeures)} h →{" "}
                    {formatNombre(demarche.apres.tempsUsagerHeures)} h
                  </td>
                  <td className="px-3 py-2.5 text-right whitespace-nowrap tabular">
                    {pluraliser(demarche.avant.tempsAgentMinutes, "min")} →{" "}
                    {pluraliser(demarche.apres.tempsAgentMinutes, "min")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-9">
        <h2 className="font-display text-xl tracking-tight">
          Hypothèses, sans boîte noire
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {HYPOTHESES.map((hypothese) => (
            <div
              key={hypothese.libelle}
              className="rounded-xl border bg-card p-4"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[0.78rem] font-medium">
                  {hypothese.libelle}
                </p>
                <p className="shrink-0 font-display text-base font-semibold text-primary tabular">
                  {hypothese.valeur}
                </p>
              </div>
              <p className="mt-1.5 text-[0.72rem] leading-relaxed text-muted-foreground">
                {hypothese.note}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-dashed bg-card/50 p-4 text-[0.72rem] leading-relaxed text-muted-foreground">
          Ce simulateur ne prédit rien : il rend le raisonnement manipulable.
          Pendant le pilote, les gains réels seront mesurés dossier par dossier,
          puis publiés dans un tableau de bord public. Un modèle qui ne peut pas
          être faux ne prouve rien.
        </p>
      </section>
    </div>
  )
}
