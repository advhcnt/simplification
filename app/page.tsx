import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Building2,
  CalendarDays,
  Check,
  CircleCheck,
  Clock,
  Coins,
  FileCheck2,
  Fingerprint,
  Layers3,
  Lock,
  MapPin,
  Network,
  Scale,
  ShieldCheck,
  Sparkles,
  Stamp,
  Users,
  X,
} from "lucide-react"

import { QrLien } from "@/components/demo/qr-code"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { buttonVariants } from "@/components/ui/button"
import { DEMARCHES, creerEtatInitial } from "@/lib/demo/data"
import { formatFcfaCourt, formatHeures, formatNombre } from "@/lib/demo/format"
import { PARAMETRES_DEFAUT, SCENARIOS, calculerImpact } from "@/lib/demo/impact"
import { construirePartage, encoderPartage } from "@/lib/demo/partage"
import { cn } from "@/lib/utils"

const impact = calculerImpact({
  ...PARAMETRES_DEFAUT,
  dossiersParAn: SCENARIOS.prudent.dossiers,
  partCouverture: 1,
})

const etatDemo = creerEtatInitial()
const tokenDemo = encoderPartage(
  construirePartage(etatDemo.consentements[0], etatDemo)
)

const CONSTAT = [
  {
    numero: "01",
    icone: Layers3,
    titre: "La valise de papiers",
    texte:
      "Jusqu’à onze pièces pour un permis de construire, neuf pour une entreprise. Les mêmes documents, photocopiés à chaque guichet, parfois pour la troisième fois de l’année.",
  },
  {
    numero: "02",
    icone: MapPin,
    titre: "La navette",
    texte:
      "Mairie, tribunal, direction, guichet : un dossier ordinaire se construit en trois à huit déplacements, souvent aux heures où l’on travaille.",
  },
  {
    numero: "03",
    icone: Clock,
    titre: "L’attente sans nouvelles",
    texte:
      "Sept à quatre-vingt-dix jours sans savoir où en est le dossier, ni quelle pièce manque. Le seul canal de suivi reste le retour au guichet.",
  },
  {
    numero: "04",
    icone: ShieldCheck,
    titre: "Le doute",
    texte:
      "Une pièce expirée, un cachet illisible, une signature contestée : tout recommence. Le papier ne prouve plus rien parce que personne ne peut le vérifier.",
  },
]

const PILIERS = [
  {
    icone: Fingerprint,
    titre: "Vérifié à la source",
    texte:
      "Chaque pièce est signée par son émetteur — état civil, impôts, greffe, examens — et vérifiable en un clic. Une photocopie ne prouve rien ; une signature électronique, si.",
    preuve: { libelle: "Voir une pièce vérifiée", href: "/mon-dossier" },
  },
  {
    icone: Lock,
    titre: "Partagé sous consentement",
    texte:
      "Vous choisissez l’administration, les pièces et la durée. Chaque accès est horodaté dans un journal que vous seul pouvez consulter, et chaque partage se révoque.",
    preuve: { libelle: "Tester le partage", href: "/mon-dossier#partage" },
  },
  {
    icone: Building2,
    titre: "Utilisé par les guichets",
    texte:
      "L’agent consulte un dossier authentifié au lieu de réclamer des papiers. Il instruit plus vite, sans archive à classer, sans risque de faux document.",
    preuve: { libelle: "Ouvrir la console agent", href: "/agent" },
  },
]

const ETAPES = [
  {
    titre: "Constituer, une fois",
    texte:
      "Identité vérifiée, pièces rattachées depuis les émetteurs. Rien à scanner, rien à faire certifier conforme.",
  },
  {
    titre: "Demander, sans joindre",
    texte:
      "Le formulaire est prérempli. L’administration ne reçoit que ce dont elle a besoin, pas une chemise entière.",
  },
  {
    titre: "Consentir, avec une limite",
    texte:
      "Un accès nominatif, limité aux pièces utiles, pour une durée choisie. Révocable à tout moment.",
  },
  {
    titre: "Suivre, jusqu’au document",
    texte:
      "Notification à chaque étape. Le document signé arrive dans le coffre, sans passage au guichet.",
  },
]

const PERSONAS = [
  {
    icone: Users,
    role: "Citoyenne",
    nom: "Adjoa, 32 ans",
    avant: [
      "Quatre photocopies pour un extrait de naissance",
      "Trois déplacements, deux jours de congé",
      "Aucune idée de l’avancement du dossier",
    ],
    apres: [
      "Zéro pièce à fournir, formulaire prérempli",
      "Demande en ligne, réponse sous 24 h",
      "Suivi en temps réel et extrait signé dans le coffre",
    ],
  },
  {
    icone: Building2,
    role: "Entreprise",
    nom: "Sossou Agrobusiness",
    avant: [
      "Neuf pièces pour immatriculer la société",
      "Cinq déplacements entre guichets",
      "Quinze jours, parfois davantage",
    ],
    apres: [
      "Seuls les statuts sont à téléverser",
      "RCCM et IFU instruits ensemble",
      "72 heures, avec un suivi unique",
    ],
  },
  {
    icone: Stamp,
    role: "Agent de guichet",
    nom: "Guichet mairie",
    avant: [
      "Trente-cinq minutes de contrôle par dossier",
      "Photocopies à archiver et à classer",
      "Doutes permanents sur l’authenticité",
    ],
    apres: [
      "Quatre minutes, pièces déjà authentifiées",
      "Aucune photocopie à produire",
      "Décision motivée, horodatée, notifiée",
    ],
  },
]

const FAISABILITE = [
  {
    icone: Scale,
    titre: "Juridique",
    texte:
      "Le consentement est la clé de voûte : accès nominatif, finalité déclarée, durée limitée, journal d’accès, droit de retrait. Le dispositif s’inscrit dans le Code du numérique et sous le contrôle de l’APDP, avec minimisation stricte des données.",
  },
  {
    icone: Network,
    titre: "Technique",
    texte:
      "Pas de big bang. Une API d’échange avec les systèmes existants, une signature électronique, un coffre auditable. Le dossier reste accessible sans smartphone : SMS, USSD, guichet assisté.",
  },
  {
    icone: Users,
    titre: "Opérationnel",
    texte:
      "Trois démarches, trois communes, une trentaine d’agents formés au nouveau geste : vérifier au lieu de collecter. Extension décidée sur résultats mesurés, pas sur effet d’annonce.",
  },
  {
    icone: Banknote,
    titre: "Économique",
    texte:
      "Un pilote estimé à 180 millions FCFA, porté par les gains de temps et de transport dès 100 000 dossiers. Les frais de guichet en moins sont assumés : la simplification a un coût budgétaire réel.",
  },
]

const ROADMAP = [
  {
    periode: "Mois 1 → 3",
    titre: "Cadrage et convention",
    texte:
      "Convention inter-administrations, base légale, choix des trois démarches pilotes et des communes.",
  },
  {
    periode: "Mois 4 → 6",
    titre: "Socle technique",
    texte:
      "Coffre, signature électronique, API d’échange avec l’état civil et les impôts. Test à blanc sur données fictives.",
  },
  {
    periode: "Mois 7 → 9",
    titre: "Pilote réel",
    texte:
      "Ouverture aux usagers, agents formés, mesure dossier par dossier. Un rapport public à mi-parcours.",
  },
  {
    periode: "Mois 10 → 12",
    titre: "Décision d’extension",
    texte:
      "Comparaison des gains mesurés aux hypothèses, correction du modèle, généralisation aux démarches suivantes.",
  },
]

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden border-b">
          <div className="pointer-events-none absolute inset-0 rule-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)] opacity-40" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-[0.68rem] font-medium tracking-[0.08em] text-primary uppercase">
                <Sparkles className="size-3.5" />
                Prix national de la simplification administrative · 2026
              </p>
              <h1 className="mt-5 font-display text-[2.6rem] leading-[1.03] font-semibold tracking-tight text-balance sm:text-[3.4rem]">
                Plus jamais deux fois
                <br />
                le même papier.
              </h1>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-muted-foreground">
                <strong className="font-medium text-foreground">
                  Dossier Unique
                </strong>{" "}
                réunit vos documents officiels une seule fois, les fait vérifier
                auprès de leur émetteur, puis les partage — avec votre accord et
                pour une durée limitée — avec toutes les administrations.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <Link
                  href="/mon-dossier"
                  className={buttonVariants({ size: "lg" })}
                >
                  Essayer le prototype
                  <ArrowRight data-icon="inline-end" />
                </Link>
                <Link
                  href="/dossier"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Lire le dossier de candidature
                </Link>
              </div>
              <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CircleCheck className="size-3.5 text-primary" />
                  Prototype fonctionnel
                </span>
                <span aria-hidden>·</span>
                <span>Données fictives</span>
                <span aria-hidden>·</span>
                <span>4 minutes de démonstration</span>
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="absolute inset-x-8 top-5 h-full rotate-2 rounded-2xl border bg-card/50" />
              <div className="absolute inset-x-4 top-2.5 h-full -rotate-1 rounded-2xl border bg-card/75" />
              <div className="relative rounded-2xl border bg-card p-5 shadow-xl shadow-primary/5">
                <div className="flex items-start justify-between gap-3 border-b pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileCheck2 className="size-4" />
                    </span>
                    <div>
                      <p className="text-[0.82rem] leading-tight font-medium">
                        Extrait d’acte de naissance
                      </p>
                      <p className="mt-0.5 text-[0.66rem] text-muted-foreground">
                        ANIP · Mairie de Cotonou
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[0.6rem] font-medium text-primary">
                    <Check className="size-2.5" strokeWidth={3} />
                    Vérifié
                  </span>
                </div>

                <div className="flex items-center gap-4 py-4">
                  <QrLien token={tokenDemo} taille={120} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.62rem] tracking-[0.1em] text-muted-foreground uppercase">
                      Code de partage
                    </p>
                    <p className="mt-0.5 font-mono text-[0.95rem] font-semibold">
                      DU-4F7K-92AB
                    </p>
                    <p className="mt-2 text-[0.68rem] leading-relaxed text-muted-foreground">
                      Accès ouvert à la Mairie de Cotonou pour 7 jours.
                      Révocable à tout instant.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 border-t pt-3.5">
                  {[
                    "Identité authentifiée par l’ANIP",
                    "Signature vérifiée en un clic",
                  ].map((texte) => (
                    <p
                      key={texte}
                      className="flex items-center gap-2 text-[0.7rem] text-muted-foreground"
                    >
                      <CircleCheck className="size-3.5 shrink-0 text-primary" />
                      {texte}
                    </p>
                  ))}
                </div>
              </div>

              <div className="absolute -top-3 -right-3 rotate-3 rounded-lg bg-chart-2 px-2.5 py-1 text-[0.62rem] font-semibold text-accent-foreground shadow-sm">
                Zéro photocopie
              </div>
            </div>
          </div>
        </section>

        {/* CHIFFRES */}
        <section className="border-b bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Chiffre
                valeur={formatHeures(impact.gainHeuresUsager)}
                libelle="de temps rendu aux usagers"
              />
              <Chiffre
                valeur={formatNombre(impact.deplacementsEvites)}
                libelle="déplacements au guichet évités"
              />
              <Chiffre
                valeur={formatNombre(impact.piecesEvitees)}
                libelle="pièces qui ne sont plus redemandées"
              />
              <Chiffre
                valeur={`${formatFcfaCourt(impact.economieHorsFrais)} FCFA`}
                libelle="de temps et de transport rendus"
              />
            </div>
            <p className="mt-6 text-[0.68rem] leading-relaxed text-primary-foreground/70">
              Pour 100 000 démarches traitées avec Dossier Unique. Modèle
              ouvert, hypothèses affichées et modifiables — aucune statistique
              officielle n’est ici détournée.
            </p>
          </div>
        </section>

        {/* CONSTAT */}
        <section id="constat" className="scroll-mt-20 border-b py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <div>
                <Eyebrow>Le constat</Eyebrow>
                <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-balance sm:text-[2.4rem]">
                  Le papier coûte plus cher que le service.
                </h2>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-muted-foreground">
                  Chaque guichet redemande ce que l’État possède déjà. Le
                  citoyen devient le coursier de sa propre administration, et
                  l’agent passe son temps à vérifier des cachets plutôt qu’à
                  instruire.
                </p>
                <div className="mt-6 rounded-xl border-l-2 border-primary bg-secondary/60 p-4">
                  <p className="font-display text-[1.02rem] leading-relaxed">
                    « Le problème n’est pas le manque de numérisation : c’est le
                    manque de confiance entre guichets. »
                  </p>
                  <p className="mt-2 text-[0.72rem] text-muted-foreground">
                    Dossier Unique traite la cause, pas l’écran.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {CONSTAT.map((item) => {
                  const Icone = item.icone
                  return (
                    <div
                      key={item.numero}
                      className="rounded-xl border bg-card p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-primary">
                          <Icone className="size-4" />
                        </span>
                        <span className="font-mono text-[0.66rem] text-muted-foreground">
                          {item.numero}
                        </span>
                      </div>
                      <h3 className="mt-3 text-[0.88rem] font-medium">
                        {item.titre}
                      </h3>
                      <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted-foreground">
                        {item.texte}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section
          id="solution"
          className="scroll-mt-20 border-b bg-secondary/40 py-16 sm:py-20"
        >
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <Eyebrow>La solution</Eyebrow>
              <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-balance sm:text-[2.4rem]">
                Un dossier, trois engagements.
              </h2>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-muted-foreground">
                Ni super-app, ni nouveau guichet : une couche de confiance entre
                les administrations qui existent déjà, et un droit de regard
                complet pour la personne concernée.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {PILIERS.map((pilier) => {
                const Icone = pilier.icone
                return (
                  <div
                    key={pilier.titre}
                    className="flex flex-col rounded-2xl border bg-card p-5 shadow-sm"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icone className="size-[1.15rem]" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                      {pilier.titre}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.82rem] leading-relaxed text-muted-foreground">
                      {pilier.texte}
                    </p>
                    <Link
                      href={pilier.preuve.href}
                      className="mt-4 inline-flex items-center gap-1 text-[0.76rem] font-medium text-primary hover:underline"
                    >
                      {pilier.preuve.libelle}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 rounded-2xl border bg-card p-5 shadow-sm">
              <p className="text-[0.68rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                L’architecture en une ligne
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1.05fr_auto_1fr] md:items-center">
                <Bloc
                  titre="Émetteurs"
                  items={[
                    "ANIP · identité",
                    "Mairies · état civil",
                    "Impôts · IFU",
                    "Tribunaux · casier",
                    "Examens · diplômes",
                  ]}
                />
                <Fleche />
                <Bloc
                  principal
                  titre="Dossier Unique"
                  items={[
                    "Coffre de pièces signées",
                    "Consentement horodaté",
                    "Journal d’accès révocable",
                  ]}
                />
                <Fleche />
                <Bloc
                  titre="Guichets"
                  items={[
                    "Mairie · état civil",
                    "APIEx · entreprises",
                    "Trésor · paiements",
                    "Marchés publics",
                    "Concours",
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* PARCOURS */}
        <section id="parcours" className="scroll-mt-20 border-b py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <Eyebrow>Le parcours</Eyebrow>
                <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-balance sm:text-[2.4rem]">
                  Quatre étapes, aucune file d’attente.
                </h2>
              </div>
              <Link
                href="/demarches"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Voir les six démarches
                <ArrowRight data-icon="inline-end" />
              </Link>
            </div>

            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ETAPES.map((etape, index) => (
                <li
                  key={etape.titre}
                  className="relative rounded-xl border bg-card p-5 shadow-sm"
                >
                  <span className="font-display text-2xl font-semibold text-primary/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-[0.9rem] font-medium">
                    {etape.titre}
                  </h3>
                  <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted-foreground">
                    {etape.texte}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PERSONAS */}
        <section className="border-b bg-secondary/40 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <Eyebrow>Ce que ça change</Eyebrow>
              <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-balance sm:text-[2.4rem]">
                Le même dossier, trois points de vue.
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {PERSONAS.map((persona) => {
                const Icone = persona.icone
                return (
                  <div
                    key={persona.nom}
                    className="rounded-2xl border bg-card p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                        <Icone className="size-4" />
                      </span>
                      <div>
                        <p className="text-[0.62rem] tracking-[0.1em] text-muted-foreground uppercase">
                          {persona.role}
                        </p>
                        <p className="text-[0.84rem] font-medium">
                          {persona.nom}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      {persona.avant.map((ligne) => (
                        <p
                          key={ligne}
                          className="flex items-start gap-2 text-[0.76rem] leading-snug text-muted-foreground"
                        >
                          <X className="mt-0.5 size-3.5 shrink-0 text-destructive/70" />
                          {ligne}
                        </p>
                      ))}
                    </div>

                    <div className="my-3 border-t border-dashed" />

                    <div className="space-y-2">
                      {persona.apres.map((ligne) => (
                        <p
                          key={ligne}
                          className="flex items-start gap-2 text-[0.76rem] leading-snug font-medium"
                        >
                          <CircleCheck className="mt-0.5 size-3.5 shrink-0 text-primary" />
                          {ligne}
                        </p>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section id="impact" className="scroll-mt-20 border-b py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
              <div>
                <Eyebrow>L’impact</Eyebrow>
                <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-balance sm:text-[2.4rem]">
                  Un chiffre que vous pouvez contester.
                </h2>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-muted-foreground">
                  Nous ne publions pas un pourcentage magique : nous publions le
                  calcul. Six démarches, des gains unitaires, une hypothèse de
                  volume — et un simulateur pour tout changer.
                </p>
                <div className="mt-6 space-y-2.5">
                  {[
                    `${formatNombre(impact.dossiers)} dossiers dans le scénario prudent`,
                    `${formatNombre(DEMARCHES.length)} démarches modélisées séparément`,
                    "Zéro gain caché : chaque ligne est recalculable à la main",
                  ].map((texte) => (
                    <p
                      key={texte}
                      className="flex items-start gap-2 text-[0.82rem] text-muted-foreground"
                    >
                      <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                      {texte}
                    </p>
                  ))}
                </div>
                <Link
                  href="/impact"
                  className={cn(buttonVariants({ size: "sm" }), "mt-6")}
                >
                  Manipuler le modèle
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <CarteImpact
                  icone={Clock}
                  valeur={formatHeures(impact.gainHeuresUsager)}
                  libelle="rendues aux usagers"
                  detail={`${formatNombre(impact.joursPersonne)} journées de 8 h`}
                />
                <CarteImpact
                  icone={MapPin}
                  valeur={formatNombre(impact.deplacementsEvites)}
                  libelle="déplacements évités"
                  detail="visites de guichet supprimées"
                />
                <CarteImpact
                  icone={Coins}
                  valeur={`${formatFcfaCourt(impact.economieHorsFrais)} FCFA`}
                  libelle="de temps et de transport"
                  detail={`${formatFcfaCourt(impact.fraisDirects)} FCFA de frais en moins`}
                />
                <CarteImpact
                  icone={FileCheck2}
                  valeur={formatNombre(impact.piecesEvitees)}
                  libelle="pièces non redemandées"
                  detail={`${formatNombre(impact.ramettes)} ramettes de papier`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAISABILITÉ */}
        <section
          id="faisabilite"
          className="scroll-mt-20 border-b bg-secondary/40 py-16 sm:py-20"
        >
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <Eyebrow>La faisabilité</Eyebrow>
              <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-balance sm:text-[2.4rem]">
                Faisable sans réinventer l’État.
              </h2>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-muted-foreground">
                Le projet ne demande ni nouvelle administration, ni nouveau
                bâtiment. Il demande une convention, une API et une poignée de
                guichets volontaires.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {FAISABILITE.map((item) => {
                const Icone = item.icone
                return (
                  <div
                    key={item.titre}
                    className="rounded-2xl border bg-card p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icone className="size-4" />
                      </span>
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {item.titre}
                      </h3>
                    </div>
                    <p className="mt-3 text-[0.82rem] leading-relaxed text-muted-foreground">
                      {item.texte}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 rounded-2xl border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  Douze mois, quatre jalons
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[0.66rem] font-medium text-primary">
                  <CalendarDays className="size-3" />
                  Objectif : pilote ouvert en 2027
                </span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {ROADMAP.map((jalon, index) => (
                  <div key={jalon.periode} className="relative pl-4">
                    <span className="absolute top-1 left-0 flex size-2 rounded-full bg-primary" />
                    {index < ROADMAP.length - 1 && (
                      <span className="absolute top-3 left-[3px] hidden h-[calc(100%-0.6rem)] w-px bg-border lg:block" />
                    )}
                    <p className="text-[0.64rem] font-medium tracking-[0.08em] text-primary uppercase">
                      {jalon.periode}
                    </p>
                    <p className="mt-1 text-[0.82rem] font-medium">
                      {jalon.titre}
                    </p>
                    <p className="mt-1 text-[0.74rem] leading-relaxed text-muted-foreground">
                      {jalon.texte}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CANDIDATURE */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
              <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <Eyebrow>Candidature</Eyebrow>
                  <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-balance sm:text-[2.2rem]">
                    Le concours récompense des idées.
                    <br />
                    Nous avons livré un prototype.
                  </h2>
                  <p className="mt-4 max-w-xl text-[0.9rem] leading-relaxed text-muted-foreground">
                    Les propositions sont reçues du 29 octobre au 12 novembre
                    2026 sur la plateforme officielle. Le dossier ci-dessous
                    détaille le problème, la solution, le modèle d’impact, le
                    cadre juridique et le budget du pilote.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <Link
                      href="/dossier"
                      className={buttonVariants({ size: "lg" })}
                    >
                      Ouvrir le dossier complet
                      <ArrowRight data-icon="inline-end" />
                    </Link>
                    <Link
                      href="/agent"
                      className={buttonVariants({
                        variant: "outline",
                        size: "lg",
                      })}
                    >
                      Voir la console agent
                    </Link>
                  </div>
                  <Link
                    href="/depot"
                    className="mt-4 inline-flex items-center gap-1 text-[0.78rem] font-medium text-primary hover:underline"
                  >
                    Parcours de dépôt officiel, en cinq étapes
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>

                <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
                  <p className="text-[0.66rem] font-medium tracking-[0.12em] text-primary-foreground/70 uppercase">
                    Dépôt officiel
                  </p>
                  <p className="mt-2 font-display text-xl leading-snug font-semibold">
                    Prix national de la simplification administrative
                  </p>
                  <dl className="mt-4 space-y-2.5 text-[0.8rem]">
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-primary-foreground/70">Ouverture</dt>
                      <dd className="font-medium">15 octobre 2026</dd>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-primary-foreground/70">
                        Candidatures
                      </dt>
                      <dd className="font-medium">29 oct. → 12 nov. 2026</dd>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-primary-foreground/70">Plateforme</dt>
                      <dd className="font-medium">
                        prix-simplification.gouv.bj
                      </dd>
                    </div>
                  </dl>
                  <a
                    href="https://prix-simplification.gouv.bj/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary-foreground px-3 py-2 text-[0.78rem] font-medium text-primary transition-opacity hover:opacity-90"
                  >
                    Déposer sur la plateforme
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-primary uppercase">
      {children}
    </p>
  )
}

function Chiffre({ valeur, libelle }: { valeur: string; libelle: string }) {
  return (
    <div className="border-primary-foreground/15 sm:border-l sm:pl-5 sm:first:border-l-0 sm:first:pl-0">
      <p className="font-display text-[1.9rem] leading-none font-semibold tracking-tight tabular sm:text-[2.1rem]">
        {valeur}
      </p>
      <p className="mt-1.5 max-w-[15rem] text-[0.72rem] leading-snug text-primary-foreground/75">
        {libelle}
      </p>
    </div>
  )
}

function Bloc({
  titre,
  items,
  principal = false,
}: {
  titre: string
  items: string[]
  principal?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        principal ? "border-primary/30 bg-primary/8" : "bg-secondary/50"
      )}
    >
      <p
        className={cn(
          "text-[0.66rem] font-semibold tracking-[0.1em] uppercase",
          principal ? "text-primary" : "text-muted-foreground"
        )}
      >
        {titre}
      </p>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item} className="text-[0.74rem] leading-snug">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Fleche() {
  return (
    <div className="flex items-center justify-center">
      <ArrowRight className="hidden size-4 rotate-90 text-muted-foreground md:block md:rotate-0" />
    </div>
  )
}

function CarteImpact({
  icone: Icone,
  valeur,
  libelle,
  detail,
}: {
  icone: typeof Clock
  valeur: string
  libelle: string
  detail: string
}) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-primary">
        <Icone className="size-4" />
      </span>
      <p className="mt-3 font-display text-xl leading-none font-semibold tracking-tight tabular">
        {valeur}
      </p>
      <p className="mt-1.5 text-[0.74rem] leading-snug font-medium">
        {libelle}
      </p>
      <p className="text-[0.68rem] text-muted-foreground">{detail}</p>
    </div>
  )
}
