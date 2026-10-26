import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CircleCheck, CircleX, TriangleAlert } from "lucide-react"

import { PrintButton } from "@/components/site/print-button"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { buttonVariants } from "@/components/ui/button"
import { DEMARCHES } from "@/lib/demo/data"
import { formatFcfa, formatHeures, formatNombre } from "@/lib/demo/format"
import {
  HYPOTHESES,
  MOYENNES,
  PARAMETRES_DEFAUT,
  SCENARIOS,
  calculerImpact,
} from "@/lib/demo/impact"

const impactPrudent = calculerImpact({
  ...PARAMETRES_DEFAUT,
  dossiersParAn: SCENARIOS.prudent.dossiers,
  partCouverture: 1,
})

export const metadata: Metadata = {
  title: "Dossier de candidature",
  description:
    "Dossier complet de candidature au Prix national de la simplification administrative : problème, solution, modèle d'impact, cadre juridique, budget du pilote et indicateurs.",
}

const SOMMAIRE = [
  { id: "resume", libelle: "Résumé exécutif" },
  { id: "probleme", libelle: "1. Le problème" },
  { id: "solution", libelle: "2. La solution" },
  { id: "parcours", libelle: "3. Les parcours" },
  { id: "prototype", libelle: "4. Le prototype" },
  { id: "impact", libelle: "5. Le modèle d’impact" },
  { id: "juridique", libelle: "6. Cadre juridique" },
  { id: "technique", libelle: "7. Architecture technique" },
  { id: "deploiement", libelle: "8. Déploiement" },
  { id: "annexe-budget", libelle: "9. Budget du pilote" },
  { id: "risques", libelle: "10. Risques et parades" },
  { id: "indicateurs", libelle: "11. Indicateurs" },
  { id: "demande", libelle: "12. Ce que nous demandons" },
  { id: "annexe-modele", libelle: "Annexe · Calcul" },
]

const BUDGET = [
  {
    poste: "Cadrage juridique et convention inter-administrations",
    montant: 12_000_000,
  },
  {
    poste: "Socle : coffre, consentement, journal d’accès, back-office",
    montant: 78_000_000,
  },
  {
    poste: "Intégrations : état civil, impôts, greffe, examens",
    montant: 45_000_000,
  },
  {
    poste: "Signature électronique et hébergement souverain (12 mois)",
    montant: 24_000_000,
  },
  {
    poste: "Formation des agents et déploiement dans trois communes",
    montant: 15_000_000,
  },
  {
    poste: "Mesure d’impact indépendante et audit de sécurité",
    montant: 6_000_000,
  },
]

const RISQUES = [
  {
    risque: "Résistance des administrations",
    parade:
      "Convention signée avant tout développement, périmètre limité à trois démarches, bénéfice agent démontré (temps et sécurité juridique).",
  },
  {
    risque: "Fuite ou détournement de données",
    parade:
      "Minimisation stricte, chiffrement, accès nominatif, journal inaltérable, audit externe avant ouverture, notification à l’APDP en cas d’incident.",
  },
  {
    risque: "Exclusion des personnes sans smartphone",
    parade:
      "Aucun droit conditionné au numérique : guichet assisté, SMS, USSD, et impression possible du document au guichet.",
  },
  {
    risque: "Faux documents fabriqués",
    parade:
      "Les pièces ne viennent pas de l’usager mais de l’émetteur, avec signature et empreinte vérifiables. Le faux devient structurellement plus difficile.",
  },
  {
    risque: "Dépassement budgétaire",
    parade:
      "Budget par lot, comité de pilotage trimestriel, clause de sortie et réversibilité contractuelle dès le premier jour.",
  },
  {
    risque: "Dépendance à un prestataire unique",
    parade:
      "Code source et données propriété de l’État, standards ouverts, réversibilité documentée et auditabilité du coffre.",
  },
]

const INDICATEURS = [
  {
    indicateur: "Part des dossiers traités sans pièce redemandée",
    cible: "≥ 80 %",
    mesure: "Échantillon mensuel par guichet",
  },
  {
    indicateur: "Délai médian sur les trois démarches pilotes",
    cible: "≤ 48 h",
    mesure: "Horodatage du dépôt et de la décision",
  },
  {
    indicateur: "Accès hors consentement ou hors périmètre",
    cible: "0",
    mesure: "Audit du journal d’accès",
  },
  {
    indicateur: "Satisfaction des usagers",
    cible: "≥ 4 / 5",
    mesure: "Enquête SMS après clôture",
  },
  {
    indicateur: "Temps agent par dossier",
    cible: "− 70 %",
    mesure: "Chronométrage sur poste",
  },
]

export default function DossierPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex flex-col gap-5 border-b pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.68rem] font-medium tracking-[0.16em] text-primary uppercase">
                Prix national de la simplification administrative · 2026
              </p>
              <h1 className="mt-2 font-display text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-[2.9rem]">
                Dossier de candidature
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Dossier Unique — le dossier unique du citoyen, vérifié à la
                source, partagé sous consentement.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <PrintButton />
              <Link
                href="/mon-dossier"
                className={buttonVariants({ size: "sm" })}
              >
                Ouvrir le prototype
                <ArrowRight data-icon="inline-end" />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:items-start">
            <nav className="no-print hidden lg:sticky lg:top-24 lg:block">
              <p className="text-[0.64rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Sommaire
              </p>
              <ul className="mt-3 space-y-1.5 border-l">
                {SOMMAIRE.map((entree) => (
                  <li key={entree.id}>
                    <a
                      href={`#${entree.id}`}
                      className="-ml-px block border-l border-transparent pl-3 text-[0.76rem] leading-snug text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                    >
                      {entree.libelle}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <article className="max-w-3xl min-w-0 space-y-12 pb-8">
              <Section id="resume" numero="Résumé" titre="L’idée en une page">
                <div className="rounded-2xl border-l-2 border-primary bg-primary/5 p-5">
                  <p className="font-display text-[1.05rem] leading-relaxed">
                    Aujourd’hui, chaque administration redemande les mêmes
                    papiers. Dossier Unique inverse la logique : la pièce reste
                    chez son émetteur, l’administration la vérifie à la source,
                    et l’usager autorise l’accès pour une durée limitée.
                  </p>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {[
                    "Un coffre unique par personne : acte de naissance, identité, domicile, IFU, casier, diplômes.",
                    "Trois engagements : pièces vérifiées à la source, partage sous consentement, usage réel par les guichets.",
                    `Un gain modélisé sur 100 000 démarches : ${formatNombre(impactPrudent.gainHeuresUsager)} heures rendues, ${formatNombre(impactPrudent.deplacementsEvites)} déplacements évités, ${formatNombre(impactPrudent.piecesEvitees)} pièces non redemandées.`,
                    "Un cadre juridique explicite : consentement, minimisation, journal d’accès, contrôle de l’APDP.",
                    "Un pilote de douze mois pour 180 millions FCFA, sur trois démarches et trois communes.",
                    "Un prototype déjà fonctionnel, auditable dès aujourd’hui, sans donnée réelle.",
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-[0.88rem] leading-relaxed"
                    >
                      <CircleCheck className="mt-1 size-4 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid gap-2 rounded-xl border bg-card p-4 text-[0.8rem] sm:grid-cols-2">
                  <Fiche libelle="Titre du projet" valeur="Dossier Unique" />
                  <Fiche
                    libelle="Catégorie"
                    valeur="Citoyens · Entreprises · Agents de l’État"
                  />
                  <Fiche
                    libelle="Territoire"
                    valeur="Bénin — pilote Cotonou, Porto-Novo, Abomey-Calavi"
                  />
                  <Fiche
                    libelle="Stade"
                    valeur="Prototype fonctionnel et démonstrable"
                  />
                  <Fiche
                    libelle="Porteur de la candidature"
                    valeur="À compléter avant dépôt"
                    aCompleter
                  />
                  <Fiche
                    libelle="Contact"
                    valeur="À compléter avant dépôt"
                    aCompleter
                  />
                </div>
              </Section>

              <Section id="probleme" numero="1" titre="Le problème">
                <p>
                  Le Bénin a numérisé des guichets, mais pas la relation entre
                  administrations. Un extrait d’acte de naissance imprimé reste
                  la preuve d’identité, même quand l’administration qui l’exige
                  pourrait consulter le registre qui l’a produit.
                </p>
                <p>
                  Le coût est double. Pour l’usager : des journées perdues, des
                  transports, des frais de dossier répétés, et parfois des
                  intermédiaires payés pour accélérer. Pour l’État : des agents
                  qui contrôlent des cachets au lieu d’instruire, des archives
                  papier coûteuses, et une fraude documentaire difficile à
                  détecter.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      titre: "Des pièces redondantes",
                      texte:
                        "Six à onze pièces par démarche, dont la majorité est déjà détenue par une administration.",
                    },
                    {
                      titre: "Une confiance absente",
                      texte:
                        "Faute de canal de vérification, le guichet exige la copie, le cachet et le déplacement.",
                    },
                    {
                      titre: "Des guichets non connectés",
                      texte:
                        "Chaque système ignore les autres : l’information circule par la poche du citoyen.",
                    },
                    {
                      titre: "Des frais et des délais opaques",
                      texte:
                        "Le prix et le délai varient selon le guichet, sans trace ni recours simple.",
                    },
                  ].map((cause) => (
                    <div
                      key={cause.titre}
                      className="rounded-xl border bg-card p-4"
                    >
                      <p className="text-[0.84rem] font-medium">
                        {cause.titre}
                      </p>
                      <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted-foreground">
                        {cause.texte}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-5 rounded-xl bg-secondary/60 p-4 text-[0.8rem] leading-relaxed">
                  <strong className="font-medium">La cause commune :</strong>{" "}
                  aucune administration ne peut vérifier seule ce qu’une autre
                  affirme. Tant que cette confiance n’existe pas, le papier
                  reste le seul langage commun — et le citoyen paie la
                  traduction.
                </p>
              </Section>

              <Section id="solution" numero="2" titre="La solution">
                {" "}
                <p>
                  Dossier Unique n’est pas un portail de plus. C’est une couche
                  de confiance installée entre les émetteurs de documents et les
                  guichets qui les exigent, avec trois engagements contractuels.
                </p>
                <div className="mt-4 space-y-3">
                  <Pilier
                    numero="01"
                    titre="Vérifié à la source, jamais photocopié"
                    texte="Chaque pièce est produite et signée par son émetteur (état civil, ANIP, impôts, greffe, examens). Le guichet ne contrôle plus un cachet : il vérifie une signature électronique et une empreinte. Une pièce expirée est signalée avant même le dépôt du dossier."
                  />
                  <Pilier
                    numero="02"
                    titre="Partagé sous consentement, jamais par défaut"
                    texte="L’usager choisit l’administration destinataire, les pièces exactes et la durée d’accès. Rien n’est ouvert par défaut, rien n’est visible au-delà du périmètre, et chaque consultation apparaît dans un journal consultable et révocable."
                  />
                  <Pilier
                    numero="03"
                    titre="Utilisé par le guichet, pas seulement par l’usager"
                    texte="La valeur naît dans la console de l’agent : dossier pré-instrué, pièces authentifiées, décision motivée et notifiée. Sans adoption par l’agent, un coffre de documents n’est qu’un joli tiroir."
                  />
                </div>
                <h3 className="mt-7 font-display text-lg font-semibold tracking-tight">
                  Ce qui existe déjà, ce qui manque
                </h3>
                <div className="mt-3 overflow-hidden rounded-xl border">
                  <table className="w-full text-left text-[0.78rem]">
                    <thead className="bg-secondary/70 text-[0.66rem] tracking-[0.06em] text-muted-foreground uppercase">
                      <tr>
                        <th className="px-3 py-2.5 font-medium">Brique</th>
                        <th className="px-3 py-2.5 font-medium">Existant</th>
                        <th className="px-3 py-2.5 font-medium">
                          À construire
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {[
                        [
                          "Registres et fichiers",
                          "État civil, identité, impôts, greffe, examens",
                          "Connecteurs d’échange et disponibilité de service",
                        ],
                        [
                          "Identité",
                          "Identifiant unique et vérification biométrique",
                          "Rattachement des pièces à l’identifiant",
                        ],
                        [
                          "Coffre et consentement",
                          "—",
                          "Cœur du projet : stockage signé, périmètre, journal",
                        ],
                        [
                          "Guichet",
                          "Procédures et agents en place",
                          "Console d’instruction et nouveau geste métier",
                        ],
                      ].map((ligne) => (
                        <tr key={ligne[0]}>
                          <td className="px-3 py-2.5 font-medium">
                            {ligne[0]}
                          </td>
                          <td className="px-3 py-2.5 text-muted-foreground">
                            {ligne[1]}
                          </td>
                          <td className="px-3 py-2.5 text-muted-foreground">
                            {ligne[2]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              <Section id="parcours" numero="3" titre="Les parcours">
                <p>
                  Trois parcours sont démontrés dans le prototype, avec le même
                  dossier et les mêmes règles.
                </p>
                <ol className="mt-4 space-y-3">
                  {[
                    [
                      "Citoyen",
                      "Adjoa constitue son dossier une fois. Pour chaque démarche, l’administration ne reçoit que les pièces utiles, pour une durée qu’elle choisit. Le document signé revient dans son coffre.",
                      "/mon-dossier",
                    ],
                    [
                      "Entreprise",
                      "Sossou Agrobusiness demande son immatriculation : seuls les statuts sont téléversés, le reste est vérifié à la source. RCCM et IFU sont instruits ensemble.",
                      "/demarches/creation-entreprise",
                    ],
                    [
                      "Agent",
                      "Le guichetier ouvre la console, voit un dossier déjà vérifié, valide ou demande une pièce avec un motif. Chaque décision est horodatée et notifiée.",
                      "/agent",
                    ],
                  ].map(([titre, texte, href], index) => (
                    <li
                      key={titre}
                      className="flex gap-4 rounded-xl border bg-card p-4"
                    >
                      <span className="font-display text-lg font-semibold text-primary/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[0.86rem] font-medium">{titre}</p>
                        <p className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground">
                          {texte}
                        </p>
                        <Link
                          href={href}
                          className="no-print mt-2 inline-flex items-center gap-1 text-[0.74rem] font-medium text-primary hover:underline"
                        >
                          Voir ce parcours
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ol>
              </Section>

              <Section
                id="prototype"
                numero="4"
                titre="Ce que le prototype démontre"
              >
                <p>
                  Le prototype joint n’est pas une maquette : chaque écran est
                  interactif et relié aux autres. Il tourne sur des données
                  fictives, sans connexion à un système réel.
                </p>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {[
                    "Un coffre de six pièces vérifiées, avec empreinte et fiche détaillée",
                    "Un partage nominatif : administration, pièces, durée, QR scannable et page de vérification",
                    "Un journal d’accès horodaté, avec révocation immédiate",
                    "Un parcours de demande en quatre étapes, sans ressaisie",
                    "Une console agent qui valide ou demande une pièce, avec effet immédiat",
                    "Un simulateur d’impact aux hypothèses modifiables",
                  ].map((element) => (
                    <p
                      key={element}
                      className="flex items-start gap-2 rounded-lg border bg-card p-3 text-[0.8rem] leading-snug"
                    >
                      <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                      {element}
                    </p>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-dashed p-4">
                  <p className="flex items-center gap-2 text-[0.8rem] font-medium">
                    <TriangleAlert className="size-4 text-chart-2" />
                    Ce qui est simulé, et ne doit pas être présenté autrement
                  </p>
                  <ul className="mt-2 space-y-1.5 text-[0.78rem] leading-relaxed text-muted-foreground">
                    <li className="flex gap-2">
                      <CircleX className="mt-0.5 size-3.5 shrink-0" />
                      Aucune connexion réelle aux fichiers de l’ANIP, de la DGI
                      ou des tribunaux.
                    </li>
                    <li className="flex gap-2">
                      <CircleX className="mt-0.5 size-3.5 shrink-0" />
                      Aucune signature électronique qualifiée : le code de
                      partage et le QR sont des visuels de démonstration.
                    </li>
                    <li className="flex gap-2">
                      <CircleX className="mt-0.5 size-3.5 shrink-0" />
                      Les données et les personnes sont fictives, stockées
                      uniquement dans le navigateur du visiteur.
                    </li>
                  </ul>
                </div>
              </Section>

              <Section id="impact" numero="5" titre="Le modèle d’impact">
                <p>
                  Le modèle est linéaire et auditable : dossiers × gain
                  unitaire. Les gains unitaires proviennent des six démarches du
                  catalogue, chacune modélisée séparément. Toutes les hypothèses
                  sont publiques et modifiables dans le simulateur.
                </p>

                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  Valeurs moyennes retenues par dossier
                </h3>
                <ul className="mt-2 grid gap-2 text-[0.8rem] sm:grid-cols-2">
                  <li className="rounded-lg border bg-card px-3 py-2">
                    Temps rendu à l’usager :{" "}
                    <strong className="font-medium">
                      {MOYENNES.heuresGagneesUsager.toFixed(1)} h
                    </strong>
                  </li>
                  <li className="rounded-lg border bg-card px-3 py-2">
                    Déplacements évités :{" "}
                    <strong className="font-medium">
                      {MOYENNES.deplacementsEvites.toFixed(1)}
                    </strong>
                  </li>
                  <li className="rounded-lg border bg-card px-3 py-2">
                    Pièces non redemandées :{" "}
                    <strong className="font-medium">
                      {MOYENNES.piecesEvitees.toFixed(1)}
                    </strong>
                  </li>
                  <li className="rounded-lg border bg-card px-3 py-2">
                    Temps agent économisé :{" "}
                    <strong className="font-medium">
                      {MOYENNES.minutesGagneesAgent.toFixed(0)} min
                    </strong>
                  </li>
                </ul>

                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                  Trois scénarios
                </h3>
                <div className="mt-2 overflow-x-auto rounded-xl border">
                  <table className="w-full min-w-[560px] text-left text-[0.78rem]">
                    <thead className="bg-secondary/70 text-[0.66rem] tracking-[0.06em] text-muted-foreground uppercase">
                      <tr>
                        <th className="px-3 py-2.5 font-medium">Scénario</th>
                        <th className="px-3 py-2.5 text-right font-medium">
                          Dossiers
                        </th>
                        <th className="px-3 py-2.5 text-right font-medium">
                          Heures rendues
                        </th>
                        <th className="px-3 py-2.5 text-right font-medium">
                          Valeur temps + transport
                        </th>
                        <th className="px-3 py-2.5 text-right font-medium">
                          Pièces évitées
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
                            <td className="px-3 py-2.5 font-medium">
                              {scenario.libelle}
                            </td>
                            <td className="px-3 py-2.5 text-right tabular">
                              {formatNombre(scenario.dossiers)}
                            </td>
                            <td className="px-3 py-2.5 text-right tabular">
                              {formatHeures(resultat.gainHeuresUsager)}
                            </td>
                            <td className="px-3 py-2.5 text-right tabular">
                              {formatFcfa(resultat.economieHorsFrais)}
                            </td>
                            <td className="px-3 py-2.5 text-right tabular">
                              {formatNombre(resultat.piecesEvitees)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 space-y-2">
                  {HYPOTHESES.map((hypothese) => (
                    <p
                      key={hypothese.libelle}
                      className="text-[0.78rem] leading-relaxed text-muted-foreground"
                    >
                      <strong className="font-medium text-foreground">
                        {hypothese.libelle} — {hypothese.valeur}.
                      </strong>{" "}
                      {hypothese.note}
                    </p>
                  ))}
                </div>

                <p className="mt-5 rounded-xl border-l-2 border-chart-2 bg-accent/40 p-4 text-[0.8rem] leading-relaxed">
                  <strong className="font-medium">Honnêteté du calcul :</strong>{" "}
                  les frais officiels en moins sont un transfert, pas une
                  création de richesse : ce que l’usager ne paie plus,
                  l’administration ne l’encaisse plus. Le gain sociétal net
                  retenu ici est le temps et le transport. Nous ne prétendons
                  pas mesurer la corruption évitée, faute de données fiables —
                  ce sera un objet du pilote.
                </p>
              </Section>

              <Section
                id="juridique"
                numero="6"
                titre="Cadre juridique et données personnelles"
              >
                <p>
                  Le dispositif traite des données d’identité, d’état civil, de
                  domicile, fiscales et judiciaires. Il ne peut fonctionner que
                  sur une base légale explicite et un consentement réellement
                  libre.
                </p>
                <ul className="mt-4 space-y-2.5">
                  {[
                    "Base légale et finalité : chaque catégorie de donnée est rattachée à une finalité précise, définie par convention et non par habitude technique. Le cadre est celui du Code du numérique (loi n° 2017-20 du 20 avril 2018).",
                    "Consentement granulaire : l’usager choisit administration, pièces et durée. Aucun accès par défaut, aucune case pré-cochée.",
                    "Minimisation : le guichet ne voit que les pièces nécessaires à la démarche engagée, jamais le dossier complet.",
                    "Journal d’accès : chaque consultation est tracée, horodatée et lisible par la personne concernée ; tout partage est révocable.",
                    "Durées de conservation : les consentements expirent automatiquement ; les traces d’accès sont conservées pour l’audit, sans contenu de pièce.",
                    "Contrôle et recours : l’APDP est saisie en amont, un audit indépendant précède l’ouverture, et toute personne peut demander rectification ou suppression.",
                    "Sécurité : chiffrement au repos et en transit, séparation des rôles, authentification forte des agents, tests d’intrusion avant mise en service.",
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-[0.84rem] leading-relaxed"
                    >
                      <CircleCheck className="mt-1 size-4 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 rounded-xl bg-secondary/60 p-4 text-[0.8rem] leading-relaxed">
                  <strong className="font-medium">Point de vigilance :</strong>{" "}
                  un tel coffre concentre des données sensibles. C’est
                  précisément pourquoi le projet ne prévoit ni accès global des
                  agents, ni interconnexion automatique entre administrations :
                  chaque accès doit être justifié par une démarche et un
                  consentement.
                </p>
              </Section>

              <Section id="technique" numero="7" titre="Architecture technique">
                <p>
                  L’objectif n’est pas de remplacer les systèmes existants, mais
                  de les relier avec un contrat d’échange lisible.
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    [
                      "Coffre de pièces",
                      "Stockage chiffré des documents signés et de leurs empreintes. Chaque pièce pointe vers son émetteur et sa date de validité.",
                    ],
                    [
                      "Moteur de consentement",
                      "Un objet signé : demandeur, administration, pièces, finalité, date d’expiration. Vérifié à chaque consultation, révocable en un clic.",
                    ],
                    [
                      "API d’échange",
                      "Interfaces de lecture auprès des émetteurs (état civil, identité, impôts, greffe, examens), avec journalisation et quotas par administration.",
                    ],
                    [
                      "Console agent",
                      "Instruction du dossier, contrôle des pièces, décision motivée. Fonctionne en mode dégradé si un connecteur est indisponible.",
                    ],
                    [
                      "Canaux inclusifs",
                      "Web, SMS, USSD et guichet assisté. Le document doit rester accessible et imprimable sans smartphone.",
                    ],
                    [
                      "Auditabilité",
                      "Journal inaltérable, export des traces pour l’autorité de contrôle, tests d’intrusion et revue de code indépendante.",
                    ],
                  ].map(([titre, texte]) => (
                    <div key={titre} className="rounded-xl border bg-card p-4">
                      <p className="text-[0.84rem] font-medium">{titre}</p>
                      <p className="mt-1 text-[0.78rem] leading-relaxed text-muted-foreground">
                        {texte}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section
                id="deploiement"
                numero="8"
                titre="Déploiement et gouvernance"
              >
                <p>
                  Le pilote est volontairement étroit : trois démarches, trois
                  communes, douze mois. Il vise à prouver trois choses — que
                  l’administration gagne du temps, que l’usager en gagne aussi,
                  et que les données restent sous contrôle.
                </p>
                <ol className="mt-4 space-y-2.5">
                  {[
                    "Mois 1 à 3 — Convention inter-administrations, base légale, désignation d’un responsable de traitement et d’un comité de pilotage.",
                    "Mois 4 à 6 — Socle technique et connecteurs, tests à blanc sur données fictives, audit de sécurité initial.",
                    "Mois 7 à 9 — Ouverture aux usagers, formation des agents, mesure dossier par dossier, rapport public à mi-parcours.",
                    "Mois 10 à 12 — Comparaison des gains mesurés aux hypothèses, correction du modèle, décision d’extension argumentée.",
                  ].map((etape, index) => (
                    <li
                      key={etape}
                      className="flex gap-3 text-[0.84rem] leading-relaxed"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[0.62rem] font-semibold text-primary">
                        {index + 1}
                      </span>
                      {etape}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-[0.8rem] leading-relaxed text-muted-foreground">
                  La gouvernance associe une administration pilote (état civil),
                  un émetteur de données (identification), un guichet économique
                  (formalisation d’entreprise) et la société civile pour le
                  suivi des indicateurs. Le code source et les données restent
                  propriété de l’État ; la réversibilité est contractuelle.
                </p>
              </Section>

              <Section id="annexe-budget" numero="9" titre="Budget du pilote">
                <p>
                  Estimation de travail sur douze mois, hors coûts internes des
                  administrations. Elle sera affinée lors du cadrage, lot par
                  lot.
                </p>
                <div className="mt-4 overflow-hidden rounded-xl border">
                  <table className="w-full text-left text-[0.8rem]">
                    <thead className="bg-secondary/70 text-[0.66rem] tracking-[0.06em] text-muted-foreground uppercase">
                      <tr>
                        <th className="px-3 py-2.5 font-medium">Poste</th>
                        <th className="px-3 py-2.5 text-right font-medium">
                          Montant
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {BUDGET.map((ligne) => (
                        <tr key={ligne.poste}>
                          <td className="px-3 py-2.5">{ligne.poste}</td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap tabular">
                            {formatFcfa(ligne.montant)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-secondary/50 font-medium">
                        <td className="px-3 py-2.5">Total</td>
                        <td className="px-3 py-2.5 text-right tabular">
                          {formatFcfa(
                            BUDGET.reduce(
                              (total, ligne) => total + ligne.montant,
                              0
                            )
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-[0.78rem] leading-relaxed text-muted-foreground">
                  À titre de comparaison, le scénario prudent (100 000 dossiers)
                  représente {formatFcfa(impactPrudent.economieHorsFrais)} de
                  temps et de transport rendus aux usagers. Le budget du pilote
                  est donc amorti dès les premiers dizaines de milliers de
                  dossiers — sans compter les recettes non perçues, assumées.
                </p>
              </Section>

              <Section id="risques" numero="10" titre="Risques et parades">
                <div className="mt-2 overflow-x-auto rounded-xl border">
                  <table className="w-full min-w-[560px] text-left text-[0.78rem]">
                    <thead className="bg-secondary/70 text-[0.66rem] tracking-[0.06em] text-muted-foreground uppercase">
                      <tr>
                        <th className="px-3 py-2.5 font-medium">Risque</th>
                        <th className="px-3 py-2.5 font-medium">Parade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {RISQUES.map((ligne) => (
                        <tr key={ligne.risque} className="align-top">
                          <td className="px-3 py-2.5 font-medium">
                            {ligne.risque}
                          </td>
                          <td className="px-3 py-2.5 leading-relaxed text-muted-foreground">
                            {ligne.parade}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              <Section
                id="indicateurs"
                numero="11"
                titre="Indicateurs de réussite"
              >
                <div className="mt-2 overflow-x-auto rounded-xl border">
                  <table className="w-full min-w-[520px] text-left text-[0.78rem]">
                    <thead className="bg-secondary/70 text-[0.66rem] tracking-[0.06em] text-muted-foreground uppercase">
                      <tr>
                        <th className="px-3 py-2.5 font-medium">Indicateur</th>
                        <th className="px-3 py-2.5 font-medium">Cible</th>
                        <th className="px-3 py-2.5 font-medium">Mesure</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {INDICATEURS.map((ligne) => (
                        <tr key={ligne.indicateur}>
                          <td className="px-3 py-2.5">{ligne.indicateur}</td>
                          <td className="px-3 py-2.5 font-medium whitespace-nowrap">
                            {ligne.cible}
                          </td>
                          <td className="px-3 py-2.5 text-muted-foreground">
                            {ligne.mesure}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              <Section id="demande" numero="12" titre="Ce que nous demandons">
                <ul className="space-y-2.5">
                  {[
                    "Un accès au dispositif du Prix pour présenter le prototype devant le jury, et non seulement un dossier écrit.",
                    "L’ouverture d’un dialogue avec une administration pilote pour confronter les hypothèses à ses données réelles.",
                    "Quatre-vingt-dix jours pour transformer ce prototype en pilote contractualisé, avec un audit de sécurité indépendant.",
                    "La publication, à l’issue du pilote, des résultats mesurés — y compris s’ils sont inférieurs à nos hypothèses.",
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-[0.86rem] leading-relaxed"
                    >
                      <CircleCheck className="mt-1 size-4 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="no-print mt-6 flex flex-wrap gap-2.5">
                  <Link
                    href="/mon-dossier"
                    className={buttonVariants({ size: "lg" })}
                  >
                    Essayer le prototype
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                  <a
                    href="https://prix-simplification.gouv.bj/"
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({
                      variant: "outline",
                      size: "lg",
                    })}
                  >
                    Plateforme officielle du concours
                  </a>
                </div>
              </Section>

              <Section
                id="annexe-modele"
                numero="Annexe"
                titre="Détail du calcul d’impact"
              >
                <div className="rounded-xl border bg-card p-4 font-mono text-[0.76rem] leading-relaxed">
                  <p>dossiers = volume annuel × part couverte</p>
                  <p>heures rendues = dossiers × gain horaire moyen</p>
                  <p>
                    déplacements évités = dossiers × déplacements évités moyens
                  </p>
                  <p>valeur temps = heures rendues × valeur horaire</p>
                  <p>transport = déplacements évités × coût unitaire</p>
                  <p>
                    pièces évitées = dossiers × pièces × part effectivement
                    évitée
                  </p>
                  <p>
                    agents libérés = dossiers × minutes gagnées ÷ 60 ÷ 1 800
                  </p>
                </div>
                <p className="mt-3 text-[0.78rem] leading-relaxed text-muted-foreground">
                  Les gains unitaires sont des moyennes simples sur les{" "}
                  {DEMARCHES.length} démarches du catalogue, sans pondération :
                  un permis de construire ne pèse pas comme un extrait de
                  naissance. C’est une limite assumée du modèle, corrigée au
                  pilote par une pondération réelle des volumes.
                </p>
              </Section>
            </article>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

function Section({
  id,
  numero,
  titre,
  children,
}: {
  id: string
  numero: string
  titre: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <p className="text-[0.66rem] font-semibold tracking-[0.14em] text-primary uppercase">
        {numero}
      </p>
      <h2 className="mt-1.5 font-display text-[1.65rem] leading-tight font-semibold tracking-tight text-balance">
        {titre}
      </h2>
      <div className="mt-4 space-y-3 text-[0.88rem] leading-relaxed">
        {children}
      </div>
    </section>
  )
}

function Fiche({
  libelle,
  valeur,
  aCompleter = false,
}: {
  libelle: string
  valeur: string
  aCompleter?: boolean
}) {
  return (
    <div>
      <p className="text-[0.66rem] text-muted-foreground">{libelle}</p>
      <p
        className={
          aCompleter
            ? "text-[0.8rem] font-medium text-destructive/80 italic"
            : "text-[0.8rem] font-medium"
        }
      >
        {valeur}
      </p>
    </div>
  )
}

function Pilier({
  numero,
  titre,
  texte,
}: {
  numero: string
  titre: string
  texte: string
}) {
  return (
    <div className="flex gap-4 rounded-xl border bg-card p-4">
      <span className="font-mono text-[0.68rem] font-medium text-primary">
        {numero}
      </span>
      <div>
        <p className="text-[0.86rem] font-medium">{titre}</p>
        <p className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground">
          {texte}
        </p>
      </div>
    </div>
  )
}
