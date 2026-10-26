"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowRight,
  CalendarDays,
  CircleCheck,
  FileUp,
  Send,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  formatDate,
  formatDateCourt,
  formatDelai,
  formatFcfa,
  jour,
} from "@/lib/demo/format"
import { creerConsentement, creerDemande, useDemo } from "@/lib/demo/store"
import type { Demarche, Piece } from "@/lib/demo/types"
import { cn } from "@/lib/utils"

const ETAPES = ["Vous", "Pièces", "Consentement", "Envoi"]

const DUREES = [
  { jours: 1, libelle: "24 heures" },
  { jours: 7, libelle: "7 jours" },
  { jours: 30, libelle: "30 jours" },
]

export function DemandeWizard({ demarche }: { demarche: Demarche }) {
  const etat = useDemo()
  const [etape, setEtape] = useState(0)
  const [deposees, setDeposees] = useState<string[]>([])
  const [duree, setDuree] = useState(7)
  const [accepte, setAccepte] = useState(false)
  const [demandeId, setDemandeId] = useState<string | null>(null)

  const piecesDossier = demarche.piecesRequises
    .map((id) => etat.pieces.find((piece) => piece.id === id))
    .filter((piece): piece is Piece => piece !== undefined && !piece.absente)

  const papier = demarche.piecesPapier
  const toutDepose = papier.every((piece) => deposees.includes(piece))
  const peutContinuer =
    etape === 0 ||
    (etape === 1 && toutDepose) ||
    (etape === 2 && accepte) ||
    etape === 3

  function envoyer() {
    if (demandeId) return
    const demande = creerDemande({
      demarcheSlug: demarche.slug,
      pieces: piecesDossier.map((piece) => piece.id),
      demandeur: `${etat.profil.prenoms} ${etat.profil.nom}`,
    })
    creerConsentement({
      administration: demarche.administration,
      motif: `Instruction de la demande ${demande.id}`,
      pieces: piecesDossier.map((piece) => piece.id),
      dureeJours: duree,
    })
    setDemandeId(demande.id)
  }

  if (demandeId) {
    return (
      <div className="rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-9">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CircleCheck className="size-7" strokeWidth={1.8} />
        </span>
        <h2 className="mt-4 font-display text-2xl tracking-tight">
          Demande transmise
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Référence{" "}
          <span className="font-mono text-[0.82rem] font-medium text-foreground">
            {demandeId}
          </span>
        </p>

        <div className="mx-auto mt-5 max-w-md rounded-xl bg-secondary/60 p-4 text-left text-[0.8rem] leading-relaxed">
          <p>
            La{" "}
            <strong className="font-medium">{demarche.administration}</strong> a
            reçu un dossier complet.{" "}
            {papier.length === 0
              ? "Aucune pièce supplémentaire ne vous sera demandée."
              : `${papier.length} pièce${papier.length > 1 ? "s" : ""} jointe${papier.length > 1 ? "s" : ""} au dossier.`}{" "}
            Délai annoncé : {formatDelai(demarche.apres.delaiHeures)}.
          </p>
          <p className="mt-2 text-muted-foreground">
            Un consentement d&apos;accès de{" "}
            {duree === 1 ? "24 heures" : `${duree} jours`} a été enregistré dans
            votre journal, jusqu&apos;au {formatDate(jour(duree))}. Révocable à
            tout moment.
          </p>
        </div>

        <ol className="mx-auto mt-6 max-w-md space-y-2.5 text-left">
          {demarche.etapes.slice(0, 3).map((texte, index) => (
            <li key={texte} className="flex gap-3 text-[0.78rem]">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[0.62rem] font-semibold text-primary">
                {index + 1}
              </span>
              <span className="text-muted-foreground">{texte}</span>
            </li>
          ))}
        </ol>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <Link href="/mon-dossier">
            <Button size="sm">
              Suivre dans Mon Dossier
              <ArrowRight data-icon="inline-end" />
            </Button>
          </Link>
          <Link href="/demarches">
            <Button variant="outline" size="sm">
              Nouvelle démarche
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border bg-card shadow-sm">
      <div className="border-b p-5 sm:p-6">
        <ol className="flex items-center gap-2">
          {ETAPES.map((libelle, index) => (
            <li key={libelle} className="flex-1">
              <div
                className={cn(
                  "h-1 rounded-full transition-colors",
                  index <= etape ? "bg-primary" : "bg-muted"
                )}
              />
              <p
                className={cn(
                  "mt-1.5 hidden text-[0.66rem] sm:block",
                  index === etape
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {index + 1}. {libelle}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="p-5 sm:p-6">
        {etape === 0 && (
          <div>
            <h2 className="font-display text-xl tracking-tight">
              Vos informations
            </h2>
            <p className="mt-1 text-[0.8rem] text-muted-foreground">
              Préremplies depuis votre dossier vérifié. Aucune ressaisie, aucune
              photocopie de pièce d&apos;identité.
            </p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Nom et prénoms", `${etat.profil.prenoms} ${etat.profil.nom}`],
                ["Date de naissance", formatDate(etat.profil.neLe)],
                ["Identifiant unique", etat.profil.identifiant],
                ["Téléphone", etat.profil.telephone],
                ["Adresse", etat.profil.adresse],
                ["Compte entreprise", etat.profil.entreprise ?? "—"],
              ].map(([libelle, valeur]) => (
                <div
                  key={libelle}
                  className="rounded-lg border bg-secondary/40 px-3 py-2"
                >
                  <dt className="text-[0.68rem] text-muted-foreground">
                    {libelle}
                  </dt>
                  <dd className="mt-0.5 text-[0.82rem] font-medium">
                    {valeur}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {etape === 1 && (
          <div>
            <h2 className="font-display text-xl tracking-tight">Vos pièces</h2>
            <p className="mt-1 text-[0.8rem] text-muted-foreground">
              Le guichet ne reçoit que les pièces nécessaires, et les vérifie à
              la source plutôt que sur une photocopie.
            </p>

            <div className="mt-4">
              <p className="text-[0.7rem] font-medium tracking-[0.1em] text-muted-foreground uppercase">
                Récupérées dans votre dossier
              </p>
              <ul className="mt-2 space-y-2">
                {piecesDossier.map((piece) => (
                  <li
                    key={piece.id}
                    className="flex items-center gap-2.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2"
                  >
                    <CircleCheck className="size-4 shrink-0 text-primary" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.8rem] font-medium">
                        {piece.nom}
                      </span>
                      <span className="text-[0.68rem] text-muted-foreground">
                        {piece.emetteur} · vérifiée le{" "}
                        {formatDateCourt(piece.delivreLe)}
                      </span>
                    </span>
                    <span className="shrink-0 text-[0.62rem] font-medium text-primary">
                      0 action
                    </span>
                  </li>
                ))}
                {piecesDossier.length === 0 && (
                  <li className="rounded-lg border border-dashed px-3 py-2 text-[0.78rem] text-muted-foreground">
                    Aucune pièce d&apos;identité requise pour cette démarche.
                  </li>
                )}
              </ul>
            </div>

            {papier.length > 0 && (
              <div className="mt-5">
                <p className="text-[0.7rem] font-medium tracking-[0.1em] text-muted-foreground uppercase">
                  Encore à fournir
                </p>
                <ul className="mt-2 space-y-2">
                  {papier.map((libelle) => {
                    const fait = deposees.includes(libelle)
                    return (
                      <li
                        key={libelle}
                        className="flex items-center gap-2.5 rounded-lg border px-3 py-2"
                      >
                        {fait ? (
                          <CircleCheck className="size-4 shrink-0 text-primary" />
                        ) : (
                          <FileUp className="size-4 shrink-0 text-muted-foreground" />
                        )}
                        <span className="min-w-0 flex-1 text-[0.8rem]">
                          {libelle}
                        </span>
                        <Button
                          variant={fait ? "ghost" : "outline"}
                          size="xs"
                          onClick={() =>
                            setDeposees((precedent) =>
                              fait
                                ? precedent.filter((item) => item !== libelle)
                                : [...precedent, libelle]
                            )
                          }
                        >
                          {fait ? "Retirer" : "Déposer"}
                        </Button>
                      </li>
                    )
                  })}
                </ul>
                <p className="mt-2 text-[0.68rem] text-muted-foreground">
                  Simulation : aucun fichier n&apos;est réellement envoyé.
                </p>
              </div>
            )}

            {papier.length === 0 && (
              <p className="mt-4 rounded-lg bg-primary/8 px-3 py-2.5 text-[0.78rem] font-medium text-primary">
                Aucun justificatif à fournir : votre dossier suffit.
              </p>
            )}
          </div>
        )}

        {etape === 2 && (
          <div>
            <h2 className="font-display text-xl tracking-tight">
              Votre consentement
            </h2>
            <p className="mt-1 text-[0.8rem] text-muted-foreground">
              L&apos;administration n&apos;accède qu&apos;aux pièces listées
              ci-dessous, et seulement pendant la durée choisie.
            </p>

            <ul className="mt-4 space-y-1.5">
              {piecesDossier.map((piece) => (
                <li
                  key={piece.id}
                  className="flex items-center gap-2 text-[0.8rem]"
                >
                  <ShieldCheck className="size-3.5 text-primary" />
                  {piece.nom}
                </li>
              ))}
            </ul>

            <p className="mt-4 mb-2 text-[0.8rem] font-medium">
              Durée d&apos;accès
            </p>
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
                      : "hover:bg-muted"
                  )}
                >
                  {option.libelle}
                </button>
              ))}
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-2.5 rounded-lg border bg-secondary/50 p-3 text-[0.78rem] leading-relaxed">
              <input
                type="checkbox"
                checked={accepte}
                onChange={(event) => setAccepte(event.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-[var(--primary)]"
              />
              <span>
                J&apos;autorise{" "}
                <strong className="font-medium">
                  {demarche.administration}
                </strong>{" "}
                à consulter ces {piecesDossier.length} pièce
                {piecesDossier.length > 1 ? "s" : ""} jusqu&apos;au{" "}
                {formatDate(jour(duree))}. Je peux révoquer cet accès à tout
                moment.
              </span>
            </label>
          </div>
        )}

        {etape === 3 && (
          <div>
            <h2 className="font-display text-xl tracking-tight">
              Vérifier et envoyer
            </h2>
            <p className="mt-1 text-[0.8rem] text-muted-foreground">
              Tout est déjà rempli. Vous n&apos;avez plus qu&apos;à confirmer.
            </p>
            <dl className="mt-4 divide-y rounded-xl border">
              {[
                ["Démarche", demarche.nom],
                ["Administration", demarche.administration],
                [
                  "Pièces transmises",
                  `${piecesDossier.length} pièce${piecesDossier.length > 1 ? "s" : ""} du dossier`,
                ],
                [
                  "Pièces jointes",
                  papier.length === 0
                    ? "Aucune"
                    : `${papier.length} déposée${papier.length > 1 ? "s" : ""}`,
                ],
                ["Délai annoncé", formatDelai(demarche.apres.delaiHeures)],
                ["Frais", formatFcfa(demarche.apres.coutFcfa)],
                ["Consentement", duree === 1 ? "24 heures" : `${duree} jours`],
              ].map(([libelle, valeur]) => (
                <div
                  key={libelle}
                  className="flex items-start justify-between gap-4 px-3 py-2 text-[0.8rem]"
                >
                  <dt className="text-muted-foreground">{libelle}</dt>
                  <dd className="text-right font-medium">{valeur}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-secondary/60 p-3 text-[0.72rem] leading-relaxed text-muted-foreground">
              <CalendarDays className="mt-0.5 size-3.5 shrink-0 text-primary" />
              Comparaison avec le parcours papier : {demarche.avant.pieces}{" "}
              pièces demandées, {demarche.avant.deplacements} déplacements,{" "}
              {formatDelai(demarche.avant.delaiJours * 24)} de délai. Ici : zéro
              déplacement.
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3 border-t pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEtape((valeur) => Math.max(0, valeur - 1))}
            disabled={etape === 0}
          >
            Retour
          </Button>
          {etape < 3 ? (
            <Button
              size="sm"
              disabled={!peutContinuer}
              onClick={() => setEtape((valeur) => valeur + 1)}
            >
              Continuer
              <ArrowRight data-icon="inline-end" />
            </Button>
          ) : (
            <Button size="sm" onClick={envoyer} disabled={!peutContinuer}>
              <Send />
              Envoyer la demande
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
