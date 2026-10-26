"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowLeft,
  Building2,
  FileText,
  FolderLock,
  TrendingUp,
} from "lucide-react"

import { Wordmark } from "@/components/site/wordmark"
import { Button } from "@/components/ui/button"
import { reinitialiserDemo } from "@/lib/demo/store"
import { cn } from "@/lib/utils"

const ONGLETS = [
  { href: "/mon-dossier", libelle: "Mon Dossier", icone: FolderLock },
  { href: "/demarches", libelle: "Démarches", icone: FileText },
  { href: "/agent", libelle: "Console agent", icone: Building2 },
  { href: "/impact", libelle: "Impact", icone: TrendingUp },
]

export function DemoNav() {
  const chemin = usePathname()

  return (
    <header className="no-print sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/" aria-label="Retour à la candidature">
              <Wordmark compact />
            </Link>
            <span className="hidden items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.1em] text-primary uppercase sm:inline-flex">
              <span className="size-1.5 rounded-full bg-primary" />
              Prototype
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (
                  window.confirm(
                    "Réinitialiser la démonstration et effacer vos actions ?"
                  )
                ) {
                  reinitialiserDemo()
                }
              }}
            >
              Réinitialiser
            </Button>
            <Link
              href="/"
              className="hidden text-[0.8rem] text-muted-foreground transition-colors hover:text-foreground sm:flex sm:items-center sm:gap-1.5"
            >
              <ArrowLeft className="size-3.5" />
              Candidature
            </Link>
          </div>
        </div>

        <nav className="-mx-1 flex gap-1 overflow-x-auto pb-2">
          {ONGLETS.map((onglet) => {
            const actif =
              chemin === onglet.href ||
              (onglet.href === "/demarches" && chemin.startsWith("/demarches"))
            const Icone = onglet.icone
            return (
              <Link
                key={onglet.href}
                href={onglet.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[0.82rem] font-medium transition-colors",
                  actif
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icone className="size-4" />
                {onglet.libelle}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
