import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CircleAlert, MousePointerClick, Timer } from "lucide-react"

import { PrintButton } from "@/components/site/print-button"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Script de présentation",
  description:
    "Déroulé minuté de cinq minutes : ce qu'on montre à l'écran, ce qu'on dit, et les réponses aux questions probables du jury.",
}

const DEROULE = [
  {
    temps: "0:00 → 0:30",
    titre: "L’accroche",
    ecran:
      "Page d’accueil, en haut. Ne pas encore faire défiler. Laisser lire le titre.",
    dire: "« Aujourd’hui, pour un extrait de naissance, il faut quatre pièces, trois déplacements et une semaine d’attente. Le problème n’est pas le papier : c’est qu’aucune administration ne peut vérifier ce qu’une autre affirme. Dossier Unique règle ce problème de confiance. »",
  },
  {
    temps: "0:30 → 1:30",
    titre: "Le constat",
    ecran:
      "Défiler jusqu’aux quatre cartes du constat, puis s’arrêter sur la citation.",
    dire: "« La valise de papiers, la navette, l’attente sans nouvelles, le doute sur l’authenticité. Chaque guichet redemande. Le citoyen devient le coursier de sa propre administration, et l’agent vérifie des cachets au lieu d’instruire. »",
  },
  {
    temps: "1:30 → 2:30",
    titre: "Le coffre et le consentement",
    ecran:
      "Ouvrir Mon Dossier. Cliquer « Voir la fiche » sur l’acte de naissance. Puis, dans le panneau de partage : garder la Mairie, taper « contrôle de conformité », générer le code.",
    dire: "« Six pièces, toutes vérifiées à la source, avec une empreinte. Je partage deux pièces avec la mairie, pour sept jours, avec un motif. L’agent ne verra rien d’autre — et mon journal garde la trace. »",
  },
  {
    temps: "2:30 → 3:30",
    titre: "La démarche sans justificatif",
    ecran:
      "Aller sur Démarches → Immatriculation d’une entreprise. Continuer. Montrer les pièces marquées « 0 action ». Déposer les statuts, cocher le consentement, envoyer.",
    dire: "« Neuf pièces demandées aujourd’hui. Ici, une seule à joindre : les statuts. Le reste est déjà vérifié, donc plus de photocopie, plus de « certifié conforme ». »",
  },
  {
    temps: "3:30 → 4:15",
    titre: "Le guichet, et ceux qui n’ont pas de smartphone",
    ecran:
      "Console agent : le dossier vient d’arriver en haut de la file. Cliquer « Valider le dossier ». Puis onglet « Guichet assisté », utiliser l’usager de démonstration, déposer une demande.",
    dire: "« Quatre minutes d’instruction au lieu de trente-cinq. Et pour ceux qui n’ont pas de smartphone, l’agent dépose avec eux : le numérique ne doit pas créer de nouveaux exclus. »",
  },
  {
    temps: "4:15 → 5:00",
    titre: "L’impact et la demande",
    ecran:
      "Ouvrir Impact. Bouger un curseur (couverture ou volume) pour montrer le recalcul. Terminer sur le dossier de candidature.",
    dire: "« Nous ne demandons pas de nous croire : voici le modèle, les hypothèses sont modifiables. Cent quatre-vingts millions pour un pilote de douze mois, trois démarches, trois communes. Nous demandons quatre-vingt-dix jours et une administration pilote. »",
  },
]

const QUESTIONS = [
  {
    question: "Combien ça coûte vraiment ?",
    reponse:
      "180 millions FCFA pour le pilote, détaillés en six lots. Ce n’est pas un coût net : la valeur du temps et du transport rendus représente déjà plus d’un milliard pour 100 000 dossiers. Nous assumons en revanche une baisse des recettes de guichet.",
  },
  {
    question: "Et la protection des données ?",
    reponse:
      "Consentement granulaire, périmètre limité aux pièces utiles, expiration automatique, journal d’accès révocable, contrôle de l’APDP en amont. Aucun accès global d’un agent à un dossier complet.",
  },
  {
    question: "Les administrations vont-elles jouer le jeu ?",
    reponse:
      "C’est le vrai risque, et il est traité en premier : convention signée avant le code, périmètre étroit, bénéfice visible pour l’agent. Le pilote est volontaire, pas imposé.",
  },
  {
    question: "Quelle différence avec le portail service-public.bj ?",
    reponse:
      "Le portail informe et oriente ; il ne permet pas à un guichet de vérifier une pièce détenue par un autre. Dossier Unique est une couche de vérification et de consentement entre administrations, pas un site d’information.",
  },
  {
    question: "Et les personnes sans smartphone ?",
    reponse:
      "Guichet assisté, SMS, USSD, document imprimable au guichet. Aucun droit n’est conditionné à l’usage du numérique.",
  },
  {
    question: "Qu’est-ce qui est réel dans votre démonstration ?",
    reponse:
      "Le logiciel, les parcours et le calcul, oui. Les données, les connexions aux fichiers de l’État et la signature électronique, non : tout est simulé et signalé dans les pages.",
  },
]

export default function PitchPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.68rem] font-medium tracking-[0.16em] text-primary uppercase">
                Préparation orale
              </p>
              <h1 className="mt-2 font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
                Cinq minutes, six mouvements
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Déroulé minuté pour le jury : ce qui apparaît à l&apos;écran, ce
                qui se dit, et ce qu&apos;il faut avoir préparé avant
                d&apos;entrer.
              </p>
            </div>
            <div className="no-print flex gap-2">
              <PrintButton />
              <Link
                href="/mon-dossier"
                className={buttonVariants({ size: "sm" })}
              >
                Ouvrir la démo
                <ArrowRight data-icon="inline-end" />
              </Link>
            </div>
          </div>

          <section className="mt-6 rounded-xl border bg-card p-4">
            <h2 className="flex items-center gap-2 text-[0.82rem] font-semibold">
              <MousePointerClick className="size-4 text-primary" />
              Avant de commencer
            </h2>
            <ul className="mt-2 grid gap-1.5 text-[0.8rem] text-muted-foreground sm:grid-cols-2">
              {[
                "Quatre onglets ouverts : Mon Dossier, Immatriculation, Console agent, Impact.",
                "Cliquer « Réinitialiser » sur la démo pour repartir à zéro.",
                "Zoom à 110 %, notifications coupées, favoris masqués.",
                "Note de synthèse imprimée, prête à laisser au jury.",
                "Ne jamais lire l’écran : le jury regarde la démo, pas le curseur.",
                "Garder une copie locale du site en cas de coupure réseau.",
              ].map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <ol className="mt-6 space-y-3">
            {DEROULE.map((etape, index) => (
              <li
                key={etape.temps}
                className="rounded-xl border bg-card p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[0.68rem] font-medium text-primary">
                    <Timer className="size-3" />
                    {etape.temps}
                  </span>
                  <h2 className="text-[0.9rem] font-semibold">
                    {index + 1}. {etape.titre}
                  </h2>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-[0.95fr_1.05fr]">
                  <div>
                    <p className="text-[0.62rem] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                      À l&apos;écran
                    </p>
                    <p className="mt-1 text-[0.78rem] leading-relaxed">
                      {etape.ecran}
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <p className="text-[0.62rem] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                      À dire
                    </p>
                    <p className="mt-1 font-display text-[0.86rem] leading-relaxed">
                      {etape.dire}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <section className="mt-7 rounded-xl border border-dashed bg-card/60 p-4">
            <h2 className="text-[0.84rem] font-semibold">
              Si vous n&apos;avez que deux minutes
            </h2>
            <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted-foreground">
              Faites uniquement le partage sous consentement (1:30) et la
              console agent (3:30). Ce sont les deux moments qui prouvent que le
              dispositif n&apos;est ni un portail d&apos;information, ni un
              simple coffre-fort : le guichet s&apos;en sert. Terminez par une
              phrase sur le modèle d&apos;impact et par la demande de pilote.
            </p>
          </section>

          <section className="mt-7">
            <h2 className="font-display text-xl tracking-tight">
              Questions probables du jury
            </h2>
            <div className="mt-3 space-y-2.5">
              {QUESTIONS.map((item) => (
                <div
                  key={item.question}
                  className="rounded-xl border bg-card p-4"
                >
                  <p className="text-[0.82rem] font-medium">{item.question}</p>
                  <p className="mt-1 text-[0.78rem] leading-relaxed text-muted-foreground">
                    {item.reponse}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-7 rounded-xl border-l-2 border-chart-2 bg-accent/40 p-4">
            <h2 className="flex items-center gap-2 text-[0.84rem] font-semibold">
              <CircleAlert className="size-4" />
              Trois pièges à éviter
            </h2>
            <ul className="mt-2 space-y-1.5 text-[0.8rem] leading-relaxed">
              <li>
                Ne pas affirmer que la signature électronique qualifiée existe
                déjà partout : elle fait partie des briques à contractualiser.
              </li>
              <li>
                Ne pas promettre la suppression de toutes les pièces : le titre
                foncier et les plans restent papier au pilote, et le prototype
                l&apos;affiche.
              </li>
              <li>
                Ne pas vendre de l&apos;intelligence artificielle : le projet
                est un problème de confiance et de processus, pas de modèle
                prédictif.
              </li>
            </ul>
          </section>

          <div className="no-print mt-7 flex flex-wrap gap-2">
            <Link
              href="/note-de-synthese"
              className={buttonVariants({ size: "sm" })}
            >
              Note de synthèse à imprimer
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="/dossier"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Dossier complet
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
