import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CircleCheck } from "lucide-react"

import { PrintButton } from "@/components/site/print-button"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { buttonVariants } from "@/components/ui/button"
import { formatFcfa, formatNombre } from "@/lib/demo/format"
import { PARAMETRES_DEFAUT, SCENARIOS, calculerImpact } from "@/lib/demo/impact"

export const metadata: Metadata = {
  title: "Note de synthèse",
  description:
    "Note de synthèse en deux pages : problème, solution, prototype, impact, faisabilité et budget du dossier unique du citoyen.",
}

const BUDGET_TOTAL = 180_000_000

const impactPrudent = calculerImpact({
  ...PARAMETRES_DEFAUT,
  dossiersParAn: SCENARIOS.prudent.dossiers,
  partCouverture: 1,
})

const COUT_PAR_DOSSIER =
  impactPrudent.economieHorsFrais / impactPrudent.dossiers
const DOSSIERS_AMORTISSEMENT = Math.round(BUDGET_TOTAL / COUT_PAR_DOSSIER)

export default function NoteDeSynthesePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-3 pl-4">
            <p className="text-[0.78rem] text-muted-foreground">
              Note de synthèse — conçue pour tenir sur deux pages A4 à
              l&apos;impression.
            </p>
            <div className="flex gap-2">
              <PrintButton />
              <Link href="/dossier" className={buttonVariants({ size: "sm" })}>
                Dossier complet
                <ArrowRight data-icon="inline-end" />
              </Link>
            </div>
          </div>

          <article className="space-y-5 text-[0.84rem] leading-relaxed print:text-[0.79rem] print:leading-[1.45]">
            <header className="border-b pb-4">
              <p className="text-[0.66rem] font-semibold tracking-[0.14em] text-primary uppercase">
                Prix national de la simplification administrative · 2026
              </p>
              <h1 className="mt-2 font-display text-[2rem] leading-tight font-semibold tracking-tight">
                Dossier Unique
              </h1>
              <p className="mt-1.5 font-display text-[1.05rem] text-muted-foreground">
                Le dossier unique du citoyen : vérifié à la source, partagé sous
                consentement.
              </p>
              <dl className="mt-4 grid gap-x-6 gap-y-1.5 text-[0.72rem] sm:grid-cols-2">
                <div className="flex gap-1.5">
                  <dt className="text-muted-foreground">Catégorie :</dt>
                  <dd>Citoyens, entreprises, agents de l’État</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="text-muted-foreground">Territoire :</dt>
                  <dd>Bénin</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="text-muted-foreground">Stade :</dt>
                  <dd>Prototype fonctionnel, données fictives</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="text-muted-foreground">Porteur :</dt>
                  <dd className="text-destructive/80 italic">à compléter</dd>
                </div>
              </dl>
            </header>
            <section>
              <h2 className="font-display text-[1.15rem] font-semibold tracking-tight">
                Le problème
              </h2>
              <p className="mt-2">
                Chaque administration redemande ce qu’une autre a déjà délivré.
                Un extrait d’acte de naissance est photocopié pour un concours,
                un mariage, puis un permis de construire. Un dossier
                d’entreprise contient neuf pièces, dont la plupart sont déjà
                détenues par l’État. Le citoyen devient le coursier de sa propre
                administration ; l’agent passe son temps à vérifier des cachets
                au lieu d’instruire ; la fraude documentaire reste difficile à
                détecter.
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {[
                  "Des pièces redondantes : six à onze par démarche, souvent les mêmes.",
                  "Des déplacements : deux à huit par dossier, entre mairie, tribunal et guichets.",
                  "Des délais opaques : de cinq jours à trois mois, sans suivi ni recours simple.",
                ].map((point) => (
                  <li key={point} className="flex gap-2">
                    <CircleCheck className="mt-1 size-3.5 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-display text-[1.15rem] font-semibold tracking-tight">
                La solution
              </h2>
              <p className="mt-2">
                Un coffre de documents officiels par personne, alimenté par les
                émetteurs eux-mêmes et consultable par les guichets avec
                l’autorisation de l’intéressé. Trois engagements structurent le
                dispositif.
              </p>
              <ol className="mt-2.5 space-y-2">
                {[
                  [
                    "Vérifié à la source",
                    "chaque pièce est signée par son émetteur (état civil, identification, impôts, greffe, examens) et vérifiable en un clic. Le guichet ne contrôle plus un cachet, il vérifie une signature.",
                  ],
                  [
                    "Partagé sous consentement",
                    "l’usager choisit l’administration, les pièces exactes et la durée. Aucun accès par défaut, tout accès est horodaté dans un journal qu’il peut consulter, et tout partage se révoque.",
                  ],
                  [
                    "Utilisé par le guichet",
                    "l’agent instruit un dossier pré-vérifié, décide et notifie. Sans adoption par l’agent, un coffre de documents n’est qu’un tiroir fermé.",
                  ],
                ].map(([titre, texte], index) => (
                  <li key={titre} className="flex gap-2.5">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[0.62rem] font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span>
                      <strong className="font-medium">{titre} —</strong> {texte}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <h2 className="font-display text-[1.15rem] font-semibold tracking-tight">
                Ce que le prototype démontre déjà
              </h2>
              <ul className="mt-2 grid gap-x-5 gap-y-1.5 sm:grid-cols-2">
                {[
                  "Un coffre de six pièces vérifiées, avec empreinte et fiche",
                  "Un partage nominatif : code, QR scannable, page de vérification",
                  "Un journal d’accès horodaté, lisible et révocable",
                  "Un parcours de demande en quatre étapes, sans pièce",
                  "Une console agent qui valide ou demande une pièce",
                  "Un guichet assisté pour les personnes sans smartphone",
                  "Un simulateur d’impact aux hypothèses modifiables",
                  "Un dossier complet : juridique, budget, risques",
                ].map((point) => (
                  <li key={point} className="flex gap-2">
                    <CircleCheck className="mt-1 size-3.5 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[0.78rem] text-muted-foreground">
                Prototype interactif, sans donnée réelle : connexions aux
                fichiers de l’État, signature qualifiée et téléversements sont
                simulés et signalés comme tels.
              </p>
            </section>
            <section className="print:break-before-page">
              <h2 className="font-display text-[1.15rem] font-semibold tracking-tight">
                Impact attendu
              </h2>{" "}
              <p className="mt-2">
                Modèle linéaire et auditable (dossiers × gain unitaire), à
                partir de six démarches modélisées séparément. Hypothèses
                publiques et modifiables dans le simulateur.
              </p>
              <div className="mt-3 overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[460px] text-left text-[0.76rem]">
                  <thead className="bg-secondary/70 text-[0.64rem] tracking-[0.06em] text-muted-foreground uppercase">
                    <tr>
                      <th className="px-2.5 py-2 font-medium">Scénario</th>
                      <th className="px-2.5 py-2 text-right font-medium">
                        Dossiers
                      </th>
                      <th className="px-2.5 py-2 text-right font-medium">
                        Heures rendues
                      </th>
                      <th className="px-2.5 py-2 text-right font-medium">
                        Pièces évitées
                      </th>
                      <th className="px-2.5 py-2 text-right font-medium">
                        Temps + transport
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {Object.values(SCENARIOS).map((scenario) => {
                      const resultat = calculerImpact({
                        ...PARAMETRES_DEFAUT,
                        dossiersParAn: scenario.dossiers,
                        partCouverture: 1,
                      })
                      return (
                        <tr key={scenario.libelle}>
                          <td className="px-2.5 py-1.5 font-medium">
                            {scenario.libelle}
                          </td>
                          <td className="px-2.5 py-1.5 text-right tabular">
                            {formatNombre(scenario.dossiers)}
                          </td>
                          <td className="px-2.5 py-1.5 text-right tabular">
                            {formatNombre(resultat.gainHeuresUsager)}
                          </td>
                          <td className="px-2.5 py-1.5 text-right tabular">
                            {formatNombre(resultat.piecesEvitees)}
                          </td>
                          <td className="px-2.5 py-1.5 text-right tabular">
                            {formatFcfa(resultat.economieHorsFrais)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>{" "}
              <p className="mt-2 text-[0.76rem] text-muted-foreground">
                Les frais officiels en moins sont un transfert, pas une richesse
                créée : la valeur rendue ne compte que le temps et le transport.
                La corruption évitée n’est pas chiffrée, faute de données
                fiables.
              </p>
            </section>
            <section>
              <h2 className="font-display text-[1.15rem] font-semibold tracking-tight">
                Faisabilité
              </h2>
              <ul className="mt-2 space-y-1.5">
                {[
                  [
                    "Juridique",
                    "consentement granulaire, minimisation, journal d’accès, durée limitée, contrôle de l’APDP, cadre du Code du numérique (loi n° 2017-20 du 20 avril 2018).",
                  ],
                  [
                    "Technique",
                    "API d’échange avec les systèmes existants, signature électronique, coffre auditable, canaux SMS et USSD pour ne pas dépendre du smartphone.",
                  ],
                  [
                    "Opérationnel",
                    "trois démarches, trois communes, une trentaine d’agents formés au nouveau geste : vérifier au lieu de collecter.",
                  ],
                  [
                    "Économique",
                    `pilote estimé à ${formatFcfa(BUDGET_TOTAL)} sur douze mois, soit l’équivalent de la valeur rendue par environ ${formatNombre(DOSSIERS_AMORTISSEMENT)} dossiers.`,
                  ],
                ].map(([titre, texte]) => (
                  <li key={titre}>
                    <strong className="font-medium">{titre} —</strong> {texte}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-display text-[1.15rem] font-semibold tracking-tight">
                Ce que nous demandons
              </h2>
              <ul className="mt-2 space-y-1.5">
                {[
                  "Présenter le prototype au jury, et pas seulement un dossier écrit.",
                  "Quatre-vingt-dix jours et une administration pilote pour transformer le prototype en pilote contractualisé, avec audit de sécurité indépendant.",
                  "Publier les résultats mesurés à l’issue du pilote, y compris s’ils sont inférieurs à nos hypothèses.",
                ].map((point) => (
                  <li key={point} className="flex gap-2">
                    <CircleCheck className="mt-1 size-3.5 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </section>{" "}
            <footer className="border-t pt-3 text-[0.72rem] text-muted-foreground">
              <p>
                Prototype en ligne : Mon Dossier, Démarches, Console agent,
                Impact. Porteur et contact à compléter avant le dépôt sur
                prix-simplification.gouv.bj.
              </p>
            </footer>
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
