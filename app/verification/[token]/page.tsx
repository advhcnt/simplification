import type { Metadata } from "next"
import Link from "next/link"
import {
  CircleCheck,
  CircleX,
  Clock,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react"

import { Wordmark } from "@/components/site/wordmark"
import { buttonVariants } from "@/components/ui/button"
import { formatDate, joursRestants } from "@/lib/demo/format"
import { decoderPartage } from "@/lib/demo/partage"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Vérification d'un partage",
  description:
    "Page de vérification d'un partage de documents entre un usager et une administration.",
  robots: { index: false, follow: false },
}

type Params = { params: Promise<{ token: string }> }

export default async function VerificationPage({ params }: Params) {
  const { token } = await params
  const partage = decoderPartage(token)

  return (
    <div className="flex min-h-svh flex-col bg-secondary/40">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-5 sm:px-6">
          <Link href="/" aria-label="Dossier Unique">
            <Wordmark compact />
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-2.5 py-1 text-[0.64rem] font-medium tracking-[0.1em] text-primary uppercase">
            <ShieldCheck className="size-3" />
            Vérification d&apos;un partage
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-6 sm:py-14">
        {!partage ? (
          <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <CircleX className="size-6" />
            </span>
            <h1 className="mt-4 font-display text-2xl tracking-tight">
              Lien de vérification invalide
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Ce lien est incomplet ou a été modifié. Demandez à la personne
              concernée de générer un nouveau partage depuis son dossier.
            </p>
            <Link
              href="/mon-dossier"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-5"
              )}
            >
              Retour au dossier
            </Link>
          </div>
        ) : (
          <PartageCard partage={partage} />
        )}

        <p className="mt-5 text-center text-[0.7rem] leading-relaxed text-muted-foreground">
          Prototype de démonstration : le contenu de ce lien n&apos;est pas
          signé électroniquement et n&apos;a aucune valeur juridique.
        </p>
      </main>
    </div>
  )
}

function PartageCard({
  partage,
}: {
  partage: NonNullable<ReturnType<typeof decoderPartage>>
}) {
  const restant = joursRestants(partage.expireLe)
  const actif = restant >= 0

  return (
    <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b p-5 sm:p-6">
        <div>
          <p className="text-[0.64rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            Partage
          </p>
          <p className="mt-1 font-mono text-[0.95rem] font-semibold">
            {partage.code}
          </p>
          <p className="mt-1 text-[0.72rem] text-muted-foreground">
            Délivré le {formatDate(partage.creeLe)}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.66rem] font-medium ring-1 ring-inset",
            actif
              ? "bg-primary/10 text-primary ring-primary/20"
              : "bg-destructive/10 text-destructive ring-destructive/20"
          )}
        >
          {actif ? (
            <CircleCheck className="size-3" />
          ) : (
            <CircleX className="size-3" />
          )}
          {actif ? "Accès actif" : "Accès expiré"}
        </span>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <p className="text-[0.66rem] tracking-[0.1em] text-muted-foreground uppercase">
            Administration destinataire
          </p>
          <h1 className="mt-1 font-display text-[1.6rem] leading-tight font-semibold tracking-tight text-balance">
            {partage.administration}
          </h1>
          <p className="mt-1.5 text-[0.82rem] text-muted-foreground">
            Autorisée par{" "}
            <strong className="font-medium text-foreground">
              {partage.beneficiaire}
            </strong>{" "}
            pour le motif suivant : {partage.motif || "non précisé"}.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[0.66rem] tracking-[0.1em] text-muted-foreground uppercase">
              Pièces couvertes par le consentement
            </p>
            <span className="text-[0.66rem] text-muted-foreground">
              {partage.pieces.length} pièce
              {partage.pieces.length > 1 ? "s" : ""}
            </span>
          </div>
          <ul className="mt-2 divide-y rounded-xl border">
            {partage.pieces.map((piece) => (
              <li key={`${piece.nom}-${piece.empreinte}`} className="p-3">
                <div className="flex items-start gap-2.5">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-[0.84rem] leading-snug font-medium">
                      {piece.nom}
                    </p>
                    <p className="mt-0.5 text-[0.7rem] text-muted-foreground">
                      {piece.emetteur}
                    </p>
                    <p className="mt-1 font-mono text-[0.66rem] text-muted-foreground">
                      empreinte {piece.empreinte}
                    </p>
                  </div>
                </div>
              </li>
            ))}
            {partage.pieces.length === 0 && (
              <li className="p-3 text-[0.8rem] text-muted-foreground">
                Aucune pièce listée dans ce partage.
              </li>
            )}
          </ul>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <Info
            libelle="Valable jusqu'au"
            valeur={formatDate(partage.expireLe)}
            icone={<Clock className="size-3.5" />}
          />
          <Info
            libelle="Reste"
            valeur={
              actif
                ? `${restant} jour${restant > 1 ? "s" : ""}`
                : `expiré depuis ${Math.abs(restant)} j`
            }
            icone={<LockKeyhole className="size-3.5" />}
          />
          <Info
            libelle="Périmètre"
            valeur="Pièces listées uniquement"
            icone={<ShieldCheck className="size-3.5" />}
          />
        </div>

        {!actif && (
          <p className="rounded-lg bg-destructive/8 p-3 text-[0.76rem] leading-relaxed text-destructive">
            Cet accès a expiré. Si la démarche est toujours en cours, la
            personne concernée doit générer un nouveau partage depuis son
            dossier.
          </p>
        )}

        <div className="rounded-lg bg-secondary/60 p-3 text-[0.72rem] leading-relaxed text-muted-foreground">
          <p className="flex items-start gap-2">
            <LockKeyhole className="mt-0.5 size-3.5 shrink-0 text-primary" />
            Ce lien donne accès aux seules pièces listées ci-dessus,
            jusqu&apos;à la date indiquée. Toute consultation est journalisée
            côté usager, qui peut révoquer l&apos;accès à tout moment. Le reste
            de son dossier n&apos;est ni visible ni transmissible.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-secondary/30 px-5 py-3.5 sm:px-6">
        <p className="text-[0.7rem] text-muted-foreground">
          Vérification à présenter au guichet.
        </p>
        <Link
          href="/agent"
          className={cn(buttonVariants({ variant: "outline", size: "xs" }))}
        >
          Ouvrir la console agent
        </Link>
      </div>
    </article>
  )
}

function Info({
  libelle,
  valeur,
  icone,
}: {
  libelle: string
  valeur: string
  icone: React.ReactNode
}) {
  return (
    <div className="rounded-lg border px-3 py-2">
      <p className="flex items-center gap-1.5 text-[0.64rem] text-muted-foreground">
        {icone}
        {libelle}
      </p>
      <p className="mt-0.5 text-[0.78rem] font-medium">{valeur}</p>
    </div>
  )
}
