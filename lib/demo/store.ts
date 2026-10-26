"use client"

import { useSyncExternalStore } from "react"

import { creerEtatInitial } from "./data"
import { jour } from "./format"
import type { Consentement, Demande, EtatDemo, StatutDemande } from "./types"

const CLE = "dossier-unique.demo.v1"

const etatServeur: EtatDemo = creerEtatInitial()
let etatClient: EtatDemo | null = null
const abonnes = new Set<() => void>()

function charger(): EtatDemo {
  if (typeof window === "undefined") return etatServeur
  try {
    const brut = window.localStorage.getItem(CLE)
    if (brut) {
      const analyse = JSON.parse(brut) as EtatDemo
      if (analyse?.version === 1 && Array.isArray(analyse.pieces))
        return analyse
    }
  } catch {
    // Données illisibles : on repart de la démonstration.
  }
  return creerEtatInitial()
}

function instantane(): EtatDemo {
  if (!etatClient) etatClient = charger()
  return etatClient
}

function instantaneServeur(): EtatDemo {
  return etatServeur
}

function souscrire(rappel: () => void): () => void {
  abonnes.add(rappel)
  return () => {
    abonnes.delete(rappel)
  }
}

function definir(suivant: EtatDemo) {
  etatClient = suivant
  try {
    window.localStorage.setItem(CLE, JSON.stringify(suivant))
  } catch {
    // Mode navigation privée ou stockage plein : la démo continue en mémoire.
  }
  abonnes.forEach((rappel) => rappel())
}

function prochainId(prefixe: string, existants: string[]): string {
  const annee = jour().slice(0, 4)
  const numero =
    existants.reduce((max, id) => {
      const partie = Number.parseInt(id.split("-").at(-1) ?? "0", 10)
      return Number.isNaN(partie) ? max : Math.max(max, partie)
    }, 0) + 1
  return `${prefixe}-${annee}-${String(numero).padStart(4, "0")}`
}
export function creerDemande(params: {
  demarcheSlug: string
  pieces: string[]
  demandeur: string
  canal?: "en-ligne" | "guichet"
  assistance?: string
}): Demande {
  const etat = instantane()
  const demande: Demande = {
    id: prochainId(
      "DU",
      etat.demandes.map((d) => d.id)
    ),
    demarcheSlug: params.demarcheSlug,
    demandeur: params.demandeur,
    statut: "transmise",
    creeLe: jour(),
    majLe: jour(),
    pieces: params.pieces,
    canal: params.canal ?? "en-ligne",
    assistance: params.assistance,
  }
  definir({ ...etat, demandes: [demande, ...etat.demandes] })
  return demande
}

export function deciderDemande(
  id: string,
  statut: StatutDemande,
  motif?: string
): void {
  const etat = instantane()
  definir({
    ...etat,
    demandes: etat.demandes.map((demande) =>
      demande.id === id
        ? { ...demande, statut, motif, majLe: jour(), agent: demande.agent }
        : demande
    ),
  })
}

export function creerConsentement(params: {
  administration: string
  motif: string
  pieces: string[]
  dureeJours: number
}): Consentement {
  const etat = instantane()
  const code = genererCode()
  const consentement: Consentement = {
    id: prochainId(
      "CS",
      etat.consentements.map((c) => c.id)
    ),
    administration: params.administration,
    motif: params.motif,
    pieces: params.pieces,
    creeLe: jour(),
    expireLe: jour(params.dureeJours),
    statut: "actif",
    code,
  }
  definir({
    ...etat,
    consentements: [consentement, ...etat.consentements],
  })
  return consentement
}

export function revoquerConsentement(id: string): void {
  const etat = instantane()
  definir({
    ...etat,
    consentements: etat.consentements.map((c) =>
      c.id === id ? { ...c, statut: "revoque" } : c
    ),
  })
}

export function reinitialiserDemo(): void {
  const initial = creerEtatInitial()
  definir(initial)
}

function genererCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789"
  const bloc = () =>
    Array.from(
      { length: 4 },
      () => alphabet[Math.floor(Math.random() * alphabet.length)]
    ).join("")
  return `DU-${bloc()}-${bloc()}`
}

export function useDemo(): EtatDemo {
  return useSyncExternalStore(souscrire, instantane, instantaneServeur)
}
