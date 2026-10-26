import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckSquare,
  CircleCheck,
  ClipboardList,
  FileText,
  Printer,
} from "lucide-react"

import { CopyBlock } from "@/components/site/copy-block"
import { PrintButton } from "@/components/site/print-button"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Déposer la proposition",
  description:
    "Le parcours officiel en cinq étapes, avec les textes prêts à coller dans le formulaire du Prix national de la simplification administrative.",
}

const ETAPES = [
  {
    numero: "01",
    titre: "Identifiez la difficulté",
    consigne:
      "Repérez une démarche à simplifier et le service public concerné.",
    texte:
      "Les démarches administratives béninoises exigent encore de l’usager qu’il fournisse des pièces que l’État détient déjà : état civil, identité, domicile, identifiant fiscal, casier judiciaire. Chaque guichet redemande, photocopie et archive ces documents, sans pouvoir vérifier leur authenticité à la source. Services concernés : état civil et identification (mairies, ANIP), formalisation d’entreprise (APIEx), greffes et services fiscaux.",
  },
  {
    numero: "02",
    titre: "Décrivez la situation",
    consigne:
      "Expliquez la procédure actuelle, les difficultés rencontrées et leurs conséquences.",
    texte:
      "Pour un extrait d’acte de naissance, un certificat de résidence, un casier judiciaire ou l’immatriculation d’une entreprise, il faut réunir entre 4 et 11 pièces, se déplacer 2 à 8 fois et attendre de 5 jours à 3 mois. Les mêmes documents sont redemandés d’une démarche à l’autre. Conséquences : journées de travail perdues, frais de transport et de dossier répétés, files d’attente et recours à des intermédiaires ; côté administration, des agents mobilisés sur le contrôle de cachets plutôt que sur l’instruction, et une fraude documentaire difficile à détecter.",
  },
  {
    numero: "03",
    titre: "Présentez votre solution",
    consigne:
      "Décrivez votre idée, ses bénéfices et les éventuelles contraintes de mise en œuvre.",
    texte:
      "Dossier Unique : un coffre numérique par personne, alimenté par les émetteurs eux-mêmes (état civil, identification, impôts, greffe, examens), consultable par les administrations sous consentement limité — administration destinataire, pièces exactes, durée — avec journal d’accès révocable. Le guichet instruit un dossier déjà vérifié au lieu de réclamer des photocopies. Bénéfices attendus : zéro pièce redemandée, délais ramenés à 24–72 h sur les démarches pilotes, 2 à 8 déplacements supprimés par dossier, agents libérés. Contraintes : interconnexion des systèmes existants, signature électronique qualifiée, convention inter-administrations, inclusion numérique (guichet assisté, SMS, USSD) et conformité au Code du numérique sous le contrôle de l’APDP.",
  },
]

const DOCUMENTS = [
  "Note de synthèse (2 pages, PDF)",
  "Dossier complet (problème, solution, impact, cadre juridique, budget, risques)",
  "Captures du prototype : Mon Dossier, parcours de demande, console agent, page de vérification",
  "Lien de démonstration du prototype",
  "Pièce d’identité ou justificatif du porteur, si la plateforme le demande",
]

export default function DepotPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.68rem] font-medium tracking-[0.16em] text-primary uppercase">
                Dépôt sur la plateforme officielle
              </p>
              <h1 className="mt-2 font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
                Votre parcours en cinq étapes
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                De la difficulté rencontrée à la solution proposée. Chaque étape
                reprend ce que demande la plateforme, avec le texte prêt à
                coller et les pièces à joindre.
              </p>
            </div>
            <div className="no-print flex gap-2">
              <PrintButton />
              <Link href="/dossier" className={buttonVariants({ size: "sm" })}>
                Dossier complet
                <ArrowRight data-icon="inline-end" />
              </Link>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border bg-card px-4 py-3 text-[0.74rem]">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <CalendarDays className="size-3.5 text-primary" />
              Plateforme ouverte depuis le 15 octobre 2026
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              Candidatures : 29 octobre → 12 novembre 2026
            </span>
            <a
              href="https://prix-simplification.gouv.bj/"
              target="_blank"
              rel="noreferrer"
              className="no-print ml-auto inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              prix-simplification.gouv.bj
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          <ol className="mt-6 space-y-4">
            {ETAPES.map((etape) => (
              <li
                key={etape.numero}
                className="rounded-2xl border bg-card p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <span className="font-mono text-[0.7rem] font-medium text-primary">
                    {etape.numero}
                  </span>
                  <h2 className="font-display text-lg font-semibold tracking-tight">
                    {etape.titre}
                  </h2>
                </div>
                <p className="mt-1 text-[0.76rem] text-muted-foreground">
                  {etape.consigne}
                </p>
                <div className="mt-3 rounded-xl bg-secondary/50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[0.62rem] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                      Texte à coller dans le formulaire
                    </p>
                    <CopyBlock texte={etape.texte} />
                  </div>
                  <p className="mt-2 text-[0.83rem] leading-relaxed">
                    {etape.texte}
                  </p>
                </div>
              </li>
            ))}

            <li className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-baseline gap-2.5">
                <span className="font-mono text-[0.7rem] font-medium text-primary">
                  04
                </span>
                <h2 className="font-display text-lg font-semibold tracking-tight">
                  Déposez votre proposition
                </h2>
              </div>
              <p className="mt-1 text-[0.76rem] text-muted-foreground">
                Connectez-vous, complétez le formulaire, choisissez le prix visé
                et joignez les documents utiles. Relisez avant d’envoyer.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border p-4">
                  <h3 className="flex items-center gap-2 text-[0.8rem] font-semibold">
                    <ClipboardList className="size-4 text-primary" />
                    Checklist avant envoi
                  </h3>
                  <ul className="mt-2.5 space-y-2">
                    {[
                      "Compte créé et courriel vérifié sur la plateforme",
                      "Trois textes ci-dessus collés et relus",
                      "Prix visé sélectionné (voir le règlement)",
                      "Documents joints et nommés clairement",
                      "Coordonnées du porteur complétées",
                    ].map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-[0.78rem] leading-snug"
                      >
                        <CheckSquare className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border p-4">
                  <h3 className="flex items-center gap-2 text-[0.8rem] font-semibold">
                    <FileText className="size-4 text-primary" />
                    Documents à joindre
                  </h3>
                  <ul className="mt-2.5 space-y-2">
                    {DOCUMENTS.map((document) => (
                      <li
                        key={document}
                        className="flex items-start gap-2 text-[0.78rem] leading-snug"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {document}
                      </li>
                    ))}
                  </ul>
                  <div className="no-print mt-3 flex flex-wrap gap-1.5">
                    <Link
                      href="/note-de-synthese"
                      className={buttonVariants({
                        variant: "outline",
                        size: "xs",
                      })}
                    >
                      <Printer />
                      Note à imprimer
                    </Link>
                    <Link
                      href="/dossier"
                      className={buttonVariants({
                        variant: "outline",
                        size: "xs",
                      })}
                    >
                      Dossier à imprimer
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-primary/6 p-4">
                <p className="text-[0.78rem] leading-relaxed">
                  <strong className="font-medium">Prix visé :</strong> la
                  plateforme demande de choisir un prix. Notre proposition
                  concerne les trois publics (citoyens, entreprises, agents de
                  l’État) ; vérifiez la liste exacte des catégories dans le
                  règlement du concours et retenez celle qui couvre la
                  simplification des démarches pour les usagers.
                </p>
              </div>

              <div className="no-print mt-4 flex flex-wrap gap-2">
                <a
                  href="https://prix-simplification.gouv.bj/"
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ size: "sm" })}
                >
                  Ouvrir la plateforme de dépôt
                  <ArrowUpRight data-icon="inline-end" />
                </a>
                <Link
                  href="/pitch"
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Préparer l’oral de 5 minutes
                </Link>
              </div>
            </li>

            <li className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-baseline gap-2.5">
                <span className="font-mono text-[0.7rem] font-medium text-primary">
                  05
                </span>
                <h2 className="font-display text-lg font-semibold tracking-tight">
                  Suivez l’évolution de votre proposition
                </h2>
              </div>
              <p className="mt-1 max-w-2xl text-[0.78rem] leading-relaxed text-muted-foreground">
                Retrouvez la proposition dans votre compte et consultez
                l’avancement de son traitement. Notez la référence de dépôt et
                gardez une copie du formulaire envoyé : c’est elle qui fera foi
                en cas de question du jury.
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  ["Référence de dépôt", ""],
                  ["Date d’envoi", ""],
                  ["Statut affiché sur la plateforme", ""],
                  ["Prochaine action / échéance", ""],
                ].map(([libelle]) => (
                  <div
                    key={libelle}
                    className="rounded-lg border border-dashed px-3 py-2.5"
                  >
                    <p className="text-[0.66rem] text-muted-foreground">
                      {libelle}
                    </p>
                    <p className="mt-2 border-b border-dotted pb-1 text-[0.78rem] text-muted-foreground">
                      &nbsp;
                    </p>
                  </div>
                ))}
              </div>

              <ul className="mt-4 space-y-1.5">
                {[
                  "Le prototype et ses chiffres sont prêts : plus rien ne dépend d’un développement à venir.",
                  "Les deux documents imprimables se génèrent depuis ce site (PDF via l’impression du navigateur).",
                  "En cas de question, la réponse courte est dans le script de présentation.",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-[0.78rem] text-muted-foreground"
                  >
                    <CircleCheck className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          </ol>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
