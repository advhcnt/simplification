"use client"

import { useState } from "react"
import {
  Check,
  Copy,
  ExternalLink,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  X,
} from "lucide-react"

import { QrLien, useOrigine } from "@/components/demo/qr-code"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatDate, jour } from "@/lib/demo/format"
import {
  construirePartage,
  encoderPartage,
  lienVerification,
} from "@/lib/demo/partage"
import {
  creerConsentement,
  revoquerConsentement,
  useDemo,
} from "@/lib/demo/store"
import { cn } from "@/lib/utils"

const ADMINISTRATIONS = [
  "Mairie de Cotonou — État civil",
  "Mairie de Cotonou — 12ᵉ arrondissement",
  "APIEx — Guichet unique",
  "Direction générale des Impôts",
  "Tribunal de première instance de Cotonou",
  "Ministère du Travail et de la Fonction publique",
]

const DUREES = [
  { jours: 1, libelle: "24 heures" },
  { jours: 7, libelle: "7 jours" },
  { jours: 30, libelle: "30 jours" },
]

export function SharePanel({
  selection,
  onSelection,
}: {
  selection: string[]
  onSelection: (ids: string[]) => void
}) {
  const etat = useDemo()
  const [administration, setAdministration] = useState(ADMINISTRATIONS[0])
  const [motif, setMotif] = useState("")
  const [duree, setDuree] = useState(7)
  const [cree, setCree] = useState<string | null>(null)
  const [copie, setCopie] = useState(false)
  const origine = useOrigine()

  const piecesDisponibles = etat.pieces.filter((piece) => !piece.absente)
  const consentement = etat.consentements.find((c) => c.id === cree)
  const pret = selection.length > 0 && motif.trim().length > 3 && !consentement

  const token = consentement
    ? encoderPartage(construirePartage(consentement, etat))
    : null
  const lien = token && origine ? lienVerification(token, origine) : null

  async function copier() {
    if (!lien) return
    try {
      await navigator.clipboard.writeText(lien)
      setCopie(true)
      window.setTimeout(() => setCopie(false), 2000)
    } catch {
      // Le champ reste lisible et sélectionnable si le presse-papiers est bloqué.
    }
  }

  function basculer(id: string) {
    onSelection(
      selection.includes(id)
        ? selection.filter((x) => x !== id)
        : [...selection, id]
    )
  }

  return (
    <section
      id="partage"
      className="scroll-mt-28 rounded-2xl border bg-card p-5 shadow-sm sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl tracking-tight">
            Partager sous consentement
          </h2>
          <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Vous choisissez l&apos;administration, les pièces et la durée. Aucun
            agent ne voit le reste de votre dossier, et vous pouvez tout
            révoquer.
          </p>
        </div>
        <span className="hidden size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:flex">
          <LockKeyhole className="size-4" />
        </span>
      </div>

      {consentement ? (
        <div className="mt-6 grid gap-6 rounded-xl bg-secondary/70 p-5 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="justify-self-center">
            {token && <QrLien token={token} taille={168} />}
          </div>
          <div className="min-w-0">
            <p className="text-[0.7rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              Code de partage
            </p>
            <p className="mt-1 font-mono text-2xl font-semibold tracking-tight">
              {consentement.code}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {consentement.administration} peut consulter{" "}
              {consentement.pieces.length} pièce
              {consentement.pieces.length > 1 ? "s" : ""} jusqu&apos;au{" "}
              <strong className="font-medium text-foreground">
                {formatDate(consentement.expireLe)}
              </strong>
              . Scannez le QR ou transmettez le lien : l&apos;administration
              verra exactement ces pièces, et rien d&apos;autre.
            </p>

            {lien && (
              <div className="mt-3">
                <p className="text-[0.66rem] font-medium tracking-[0.1em] text-muted-foreground uppercase">
                  Lien de vérification
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <Input
                    readOnly
                    value={lien}
                    onFocus={(event) => event.currentTarget.select()}
                    aria-label="Lien de vérification du partage"
                    className="h-8 min-w-0 flex-1 bg-background font-mono text-[0.64rem]"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    onClick={copier}
                  >
                    {copie ? <Check /> : <Copy />}
                    {copie ? "Copié" : "Copier"}
                  </Button>
                  <a
                    href={lien}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Ouvrir la page de vérification"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon-sm" }),
                      "shrink-0"
                    )}
                  >
                    <ExternalLink />
                  </a>
                </div>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => revoquerConsentement(consentement.id)}
                disabled={consentement.statut === "revoque"}
              >
                <X />
                {consentement.statut === "revoque"
                  ? "Partage révoqué"
                  : "Révoquer maintenant"}
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setCree(null)
                  onSelection([])
                  setMotif("")
                }}
              >
                <QrCode />
                Nouveau partage
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <form
          className="mt-6 grid gap-5"
          onSubmit={(event) => {
            event.preventDefault()
            if (!pret) return
            const nouveau = creerConsentement({
              administration,
              motif: motif.trim(),
              pieces: selection,
              dureeJours: duree,
            })
            setCree(nouveau.id)
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="administration">
                Administration destinataire
              </Label>
              <select
                id="administration"
                value={administration}
                onChange={(event) => setAdministration(event.target.value)}
                className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                {ADMINISTRATIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="motif">Motif de la demande</Label>
              <Input
                id="motif"
                value={motif}
                onChange={(event) => setMotif(event.target.value)}
                placeholder="Ex. instruction du dossier d'immatriculation"
                className="h-9"
              />
            </div>
          </div>

          <fieldset>
            <legend className="mb-2 text-[0.8rem] font-medium">
              Pièces à transmettre
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {piecesDisponibles.map((piece) => {
                const actif = selection.includes(piece.id)
                return (
                  <label
                    key={piece.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-2.5 rounded-lg border p-2.5 text-[0.78rem] transition-colors",
                      actif
                        ? "border-primary/40 bg-primary/5"
                        : "hover:bg-muted/60"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border",
                        actif
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input"
                      )}
                    >
                      {actif && <Check className="size-3" strokeWidth={3} />}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={actif}
                      onChange={() => basculer(piece.id)}
                    />
                    <span className="min-w-0">
                      <span className="block leading-snug font-medium">
                        {piece.nom}
                      </span>
                      <span className="text-[0.7rem] text-muted-foreground">
                        {piece.emetteur}
                      </span>
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <div>
            <p className="mb-2 text-[0.8rem] font-medium">Durée d&apos;accès</p>
            <div className="flex flex-wrap gap-2">
              {DUREES.map((option) => (
                <button
                  key={option.jours}
                  type="button"
                  onClick={() => setDuree(option.jours)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-[0.78rem] transition-colors",
                    duree === option.jours
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background hover:bg-muted"
                  )}
                >
                  {option.libelle}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2 text-[0.72rem] text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-primary" />
              Accès limité aux pièces cochées, valable jusqu&apos;au{" "}
              {formatDate(jour(duree))}. Révocable à tout moment.
            </p>
            <Button type="submit" disabled={!pret} className="shrink-0">
              <QrCode />
              Générer le code
            </Button>
          </div>
        </form>
      )}
    </section>
  )
}
