import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Wordmark } from "@/components/site/wordmark"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const LIENS = [
  { href: "/#constat", libelle: "Le constat" },
  { href: "/#solution", libelle: "La solution" },
  { href: "/#impact", libelle: "Impact" },
  { href: "/#faisabilite", libelle: "Faisabilité" },
]

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="Dossier Unique, retour à l'accueil">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 text-[0.83rem] text-muted-foreground lg:flex">
          {LIENS.map((lien) => (
            <a
              key={lien.href}
              href={lien.href}
              className="transition-colors hover:text-foreground"
            >
              {lien.libelle}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/dossier"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden sm:inline-flex"
            )}
          >
            Le dossier
          </Link>
          <Link href="/mon-dossier" className={buttonVariants({ size: "sm" })}>
            Essayer la démo
            <ArrowRight data-icon="inline-end" />
          </Link>
        </div>
      </div>
    </header>
  )
}
