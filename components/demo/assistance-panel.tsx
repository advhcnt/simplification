"use client"

import { useState } from "react"
import {
  Check,
  CircleAlert,
  CircleCheck,
  Copy,
  Fingerprint,
  Printer,
  Search,
  Smartphone,
} from "lucide-react"

import { QrLien, useOrigine } from "@/components/demo/qr-code"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DEMARCHES, trouverDemarche } from "@/lib/demo/data"
import { formatDate, formatDelai, formatFcfa, jour } from "@/lib/demo/format"
import {
  construirePartage,
  encoderPartage,
  lienVerification,
} from "@/lib/demo/partage"
import { creerConsentement, creerDemande, useDemo } from "@/lib/demo/store"
import type { Piece } from "@/lib/demo/types"

const MOTIFS = [
  "Ne dispose pas d'un smartphone",
  "Ne maîtrise pas l'écrit",
  "Personne âgée ou en situation de handicap",
  "Autre situation",
]

type Recu = {
  demandeId: string
  nom: string
  administration: string
  code: string
  token: string
}

export function AssistancePanel() {
  const etat = useDemo()
  const [recherche, setRecherche] = useState("")
  const [identifie, setIdentifie] = useState(false)
  const [erreur, setErreur] = useState<string | null>(null)
  const [slug, setSlug] = useState(DEMARCHES[0].slug)
  const [motif, setMotif] = useState(MOTIFS[0])
  const [precision, setPrecision] = useState("")
  const [accord, setAccord] = useState(false)
  const [recu, setRecu] = useState<Recu | null>(null)
  const [copie, setCopie] = useState(false)
  const origine = useOrigine()

  const lien = recu && origine ? lienVerification(recu.token, origine) : null

  async function copier() {
    if (!lien) return
    try {
      await navigator.clipboard.writeText(lien)
      setCopie(true)
      window.setTimeout(() => setCopie(false), 2000)
    } catch {
      // Le QR reste scannable même si le presse-papiers est bloqué.
    }
  }

  const demarche = trouverDemarche(slug) ?? DEMARCHES[0]
  const pieces = demarche.piecesRequises
    .map((id) => etat.pieces.find((piece) => piece.id === id))
    .filter((piece): piece is Piece => piece !== undefined && !piece.absente)

  function rechercher(event?: React.FormEvent) {
    event?.preventDefault()
    const requete = recherche.trim().toLowerCase().replace(/\s/g, "")
    if (requete.length < 3) {
      setErreur("Saisissez au moins trois caractères (nom, NPI ou téléphone).")
      return
    }
    const profil = etat.profil
    const correspond =
      profil.identifiant.toLowerCase().replace(/\s/g, "").includes(requete) ||
      `${profil.prenoms} ${profil.nom}`
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(requete) ||
      profil.nom.toLowerCase().includes(requete) ||
      profil.telephone.replace(/\s/g, "").includes(requete)
    if (correspond) {
      setIdentifie(true)
      setErreur(null)
    } else {
      setIdentifie(false)
      setErreur("Aucun dossier ne correspond. Vérifiez le NPI ou le nom.")
    }
  }

  function deposer() {
    const demande = creerDemande({
      demarcheSlug: demarche.slug,
      pieces: pieces.map((piece) => piece.id),
      demandeur: `${etat.profil.prenoms} ${etat.profil.nom}`,
      canal: "guichet",
      assistance: precision.trim() ? `${motif} — ${precision.trim()}` : motif,
    })
    const consentement = creerConsentement({
      administration: demarche.administration,
      motif: `Assistance au guichet — demande ${demande.id}`,
      pieces: pieces.map((piece) => piece.id),
      dureeJours: 1,
    })
    setRecu({
      demandeId: demande.id,
      nom: demarche.nom,
      administration: demarche.administration,
      code: consentement.code,
      token: encoderPartage(construirePartage(consentement, etat)),
    })
  }

  if (recu) {
    return (
      <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
          <div>
            <p className="text-[0.66rem] font-medium tracking-[0.12em] text-primary uppercase">
              Reçu d&apos;assistance
            </p>
            <h2 className="mt-1 font-display text-xl tracking-tight">
              Demande déposée au nom de l&apos;usager
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setRecu(null)
              setIdentifie(false)
              setRecherche("")
              setAccord(false)
              setPrecision("")
            }}
          >
            Nouvelle assistance
          </Button>
        </div>

        <div className="mt-4 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
          <QrLien token={recu.token} taille={156} />
          <div className="min-w-0">
            <p className="font-mono text-[0.7rem] text-muted-foreground">
              {recu.demandeId}
            </p>
            <p className="mt-0.5 font-display text-lg leading-tight font-semibold">
              {recu.nom}
            </p>
            <p className="mt-0.5 text-[0.76rem] text-muted-foreground">
              {recu.administration}
            </p>
            <p className="mt-2 text-[0.72rem] text-muted-foreground">
              Code de suivi à remettre :{" "}
              <span className="font-mono font-medium text-foreground">
                {recu.code}
              </span>
            </p>
            <p className="mt-1 text-[0.7rem] text-muted-foreground">
              Le QR ouvre la page de vérification du partage : le guichet y voit
              les pièces autorisées, la durée et le motif d&apos;assistance.
            </p>
            {lien && (
              <Button
                variant="outline"
                size="xs"
                className="mt-2"
                onClick={copier}
              >
                {copie ? <Check /> : <Copy />}
                {copie ? "Lien copié" : "Copier le lien de vérification"}
              </Button>
            )}
            <ul className="mt-3 space-y-1.5 text-[0.74rem]">
              <li className="flex items-start gap-2">
                <Smartphone className="mt-0.5 size-3.5 shrink-0 text-primary" />
                Un SMS de confirmation a été envoyé au {etat.profil.telephone}.
              </li>
              <li className="flex items-start gap-2">
                <Printer className="mt-0.5 size-3.5 shrink-0 text-primary" />
                Le reçu papier permet de suivre la demande et de retirer le
                document au guichet.
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-0.5 size-3.5 shrink-0 text-primary" />
                Elle apparaît déjà dans la file d&apos;attente et dans le
                journal de l&apos;usager.
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-4 rounded-lg bg-secondary/60 p-3 text-[0.72rem] leading-relaxed text-muted-foreground">
          La demande et le consentement d&apos;accès sont tracés au nom de
          l&apos;agent qui a assisté l&apos;usager. L&apos;accord oral recueilli
          est consigné, et l&apos;usager peut le révoquer depuis son journal,
          par SMS ou en repassant au guichet.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <Fingerprint className="size-4" />
        </span>
        <div>
          <h2 className="font-display text-lg tracking-tight">
            Guichet assisté
          </h2>
          <p className="mt-0.5 max-w-xl text-[0.78rem] leading-relaxed text-muted-foreground">
            Pour une personne sans smartphone, sans compte ou qui ne lit pas
            l&apos;écrit : l&apos;agent dépose avec elle, au guichet. Aucun
            droit n&apos;est conditionné à l&apos;usage du numérique.
          </p>
        </div>
      </div>

      {!identifie ? (
        <form className="mt-5 max-w-xl" onSubmit={rechercher}>
          <Label htmlFor="recherche">Retrouver l&apos;usager</Label>
          <div className="mt-1.5 flex gap-2">
            <Input
              id="recherche"
              value={recherche}
              onChange={(event) => setRecherche(event.target.value)}
              placeholder="Nom, NPI ou numéro de téléphone"
              className="h-9"
            />
            <Button type="submit" size="sm" className="shrink-0">
              <Search />
              Rechercher
            </Button>
          </div>
          {erreur && (
            <p className="mt-2 flex items-start gap-1.5 text-[0.74rem] text-destructive">
              <CircleAlert className="mt-0.5 size-3.5 shrink-0" />
              {erreur}
            </p>
          )}
          <button
            type="button"
            className="mt-3 text-[0.74rem] font-medium text-primary hover:underline"
            onClick={() => {
              setRecherche(etat.profil.identifiant)
              setIdentifie(true)
              setErreur(null)
            }}
          >
            Utiliser l&apos;usager de démonstration — {etat.profil.identifiant}
          </button>
          <p className="mt-3 rounded-lg border border-dashed p-2.5 text-[0.7rem] leading-relaxed text-muted-foreground">
            Démonstration : un seul dossier existe. Le NPI ci-dessus, le nom «
            Sossou » ou le téléphone déclaré ouvrent ce dossier.
          </p>
        </form>
      ) : (
        <div className="mt-5 space-y-5">
          <div className="rounded-xl bg-secondary/60 p-3.5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[0.82rem] font-medium">
                  {etat.profil.prenoms} {etat.profil.nom}
                </p>
                <p className="mt-0.5 text-[0.72rem] text-muted-foreground">
                  Née le {formatDate(etat.profil.neLe)} · {etat.profil.adresse}
                </p>
                <p className="mt-0.5 font-mono text-[0.68rem] text-muted-foreground">
                  {etat.profil.identifiant} · {etat.profil.telephone}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[0.62rem] font-medium text-primary">
                <CircleCheck className="size-3" />
                Dossier vérifié
              </span>
            </div>
            <Button
              variant="ghost"
              size="xs"
              className="mt-2 -ml-1.5 text-muted-foreground"
              onClick={() => {
                setIdentifie(false)
                setRecherche("")
              }}
            >
              Changer d&apos;usager
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="demarche">Démarche à déposer</Label>
              <select
                id="demarche"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                {DEMARCHES.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="precision">Précision (facultatif)</Label>
              <Input
                id="precision"
                value={precision}
                onChange={(event) => setPrecision(event.target.value)}
                placeholder="Ex. accompagnée par sa fille"
                className="h-9"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-[0.8rem] font-medium">
              Motif de l&apos;assistance
            </p>
            <div className="flex flex-wrap gap-2">
              {MOTIFS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMotif(option)}
                  className={
                    motif === option
                      ? "rounded-full border border-primary bg-primary px-3 py-1.5 text-[0.74rem] text-primary-foreground"
                      : "rounded-full border px-3 py-1.5 text-[0.74rem] hover:bg-muted"
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border p-3.5 text-[0.76rem]">
            <p className="font-medium">Ce que le guichet va faire</p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>
                · Utiliser {pieces.length} pièce
                {pieces.length > 1 ? "s" : ""} déjà vérifiée
                {pieces.length > 1 ? "s" : ""} dans le dossier
              </li>
              <li>
                · Ne rien redemander, sauf{" "}
                {demarche.piecesPapier.length === 0
                  ? "aucune pièce complémentaire"
                  : `${demarche.piecesPapier.length} pièce${demarche.piecesPapier.length > 1 ? "s" : ""} papier`}
              </li>
              <li>
                · Annoncer un délai de {formatDelai(demarche.apres.delaiHeures)}{" "}
                et des frais de {formatFcfa(demarche.apres.coutFcfa)}
              </li>
              <li>
                · Ouvrir un accès d&apos;un jour, expirant le{" "}
                {formatDate(jour(1))}
              </li>
            </ul>
          </div>

          <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border bg-secondary/40 p-3 text-[0.76rem] leading-relaxed">
            <input
              type="checkbox"
              checked={accord}
              onChange={(event) => setAccord(event.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-[var(--primary)]"
            />
            <span>
              J&apos;atteste avoir recueilli l&apos;accord de la personne pour
              déposer cette demande en son nom. Le motif et mon identité
              d&apos;agent sont consignés dans son journal.
            </span>
          </label>

          <div className="flex items-center justify-between gap-3 border-t pt-4">
            <p className="text-[0.7rem] text-muted-foreground">
              Simulation : aucune donnée réelle n&apos;est enregistrée.
            </p>
            <Button size="sm" disabled={!accord} onClick={deposer}>
              <Printer />
              Déposer et remettre le reçu
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
