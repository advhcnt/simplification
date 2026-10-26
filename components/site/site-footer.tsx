import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Wordmark } from "@/components/site/wordmark"

const COLONNES = [
  {
    titre: "Le projet",
    liens: [
      { href: "/#constat", libelle: "Le constat" },
      { href: "/#solution", libelle: "La solution" },
      { href: "/#parcours", libelle: "Le parcours" },
      { href: "/#impact", libelle: "Le modèle d'impact" },
    ],
  },
  {
    titre: "Le prototype",
    liens: [
      { href: "/mon-dossier", libelle: "Mon Dossier" },
      { href: "/demarches", libelle: "Démarches disponibles" },
      { href: "/agent", libelle: "Console agent" },
      { href: "/impact", libelle: "Simulateur d'impact" },
    ],
  },
  {
    titre: "La candidature",
    liens: [
      { href: "/dossier", libelle: "Dossier complet" },
      { href: "/depot", libelle: "Déposer la proposition" },
      { href: "/note-de-synthese", libelle: "Note de synthèse" },
      { href: "/pitch", libelle: "Script de présentation" },
      { href: "/dossier#annexe-budget", libelle: "Budget du pilote" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="no-print border-t bg-secondary/40">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Un dossier unique par personne, des documents vérifiés à la source
              et partagés sous consentement. Candidature au Prix national de la
              simplification administrative.
            </p>
            <a
              href="https://prix-simplification.gouv.bj/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              prix-simplification.gouv.bj
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          {COLONNES.map((colonne) => (
            <div key={colonne.titre}>
              <h3 className="text-[0.7rem] font-semibold tracking-[0.14em] text-foreground uppercase">
                {colonne.titre}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {colonne.liens.map((lien) => (
                  <li key={lien.href}>
                    <Link
                      href={lien.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {lien.libelle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            Prototype de démonstration — les personnes, documents et
            administrations affichés sont fictifs. Aucune donnée réelle
            n&apos;est traitée.
          </p>
          <p className="shrink-0">
            Candidatures : 29 octobre → 12 novembre 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
