import { DEMARCHES } from "./data"
import type { Demarche } from "./types"

export type ParametresImpact = {
  dossiersParAn: number
  partCouverture: number
  partPiecesEvitees: number
  valeurHeureFcfa: number
  coutDeplacementFcfa: number
}

export type ResultatImpact = {
  dossiers: number
  gainHeuresUsager: number
  joursPersonne: number
  deplacementsEvites: number
  fraisDirects: number
  valeurTemps: number
  fraisTransport: number
  /** Valeur du temps et du transport : le gain sociétal net, hors frais officiels. */
  economieHorsFrais: number
  economieTotale: number
  piecesEvitees: number
  heuresAgent: number
  equivalentsAgent: number
  ramettes: number
}

export const PARAMETRES_DEFAUT: ParametresImpact = {
  dossiersParAn: 450_000,
  partCouverture: 0.25,
  partPiecesEvitees: 0.75,
  valeurHeureFcfa: 1_000,
  coutDeplacementFcfa: 800,
}

export const SCENARIOS = {
  prudent: { dossiers: 100_000, libelle: "Prudent" },
  central: { dossiers: 112_500, libelle: "Central" },
  ambitieux: { dossiers: 225_000, libelle: "Ambitieux" },
} as const

function moyenne(valeur: (d: Demarche) => number): number {
  return DEMARCHES.reduce((total, d) => total + valeur(d), 0) / DEMARCHES.length
}

export const MOYENNES = {
  heuresGagneesUsager: moyenne(
    (d) => d.avant.tempsUsagerHeures - d.apres.tempsUsagerHeures
  ),
  minutesGagneesAgent: moyenne(
    (d) => d.avant.tempsAgentMinutes - d.apres.tempsAgentMinutes
  ),
  deplacementsEvites: moyenne(
    (d) => d.avant.deplacements - d.apres.deplacements
  ),
  fraisEvites: moyenne((d) => d.avant.coutFcfa - d.apres.coutFcfa),
  piecesEvitees: moyenne((d) => d.avant.pieces - d.apres.pieces),
}

/**
 * Modèle volontairement linéaire et auditable : chaque ligne du résultat se
 * recalcule à la main à partir des hypothèses affichées.
 */
export function calculerImpact(params: ParametresImpact): ResultatImpact {
  const dossiers = Math.max(0, params.dossiersParAn * params.partCouverture)
  const gainHeuresUsager = dossiers * MOYENNES.heuresGagneesUsager
  const deplacementsEvites = dossiers * MOYENNES.deplacementsEvites
  const fraisDirects = dossiers * MOYENNES.fraisEvites
  const valeurTemps = gainHeuresUsager * params.valeurHeureFcfa
  const fraisTransport = deplacementsEvites * params.coutDeplacementFcfa
  const heuresAgent = (dossiers * MOYENNES.minutesGagneesAgent) / 60
  const piecesEvitees =
    dossiers * MOYENNES.piecesEvitees * params.partPiecesEvitees

  return {
    dossiers,
    gainHeuresUsager,
    joursPersonne: gainHeuresUsager / 8,
    deplacementsEvites,
    fraisDirects,
    valeurTemps,
    fraisTransport,
    economieHorsFrais: valeurTemps + fraisTransport,
    economieTotale: fraisDirects + valeurTemps + fraisTransport,
    piecesEvitees,
    heuresAgent,
    equivalentsAgent: heuresAgent / 1_800,
    ramettes: piecesEvitees / 500,
  }
}

export const HYPOTHESES: { libelle: string; valeur: string; note: string }[] = [
  {
    libelle: "Dossiers annuels sur le périmètre",
    valeur: "450 000",
    note: "Hypothèse de travail : démarches courantes des 6 procédures retenues, tous guichets confondus.",
  },
  {
    libelle: "Part couverte par le dispositif",
    valeur: "25 %",
    note: "Scénario central à 3 ans, après déploiement dans les grandes communes.",
  },
  {
    libelle: "Part des pièces réellement évitées",
    valeur: "75 %",
    note: "Les pièces non dématérialisées (titre foncier, plans) restent fournies par l'usager.",
  },
  {
    libelle: "Valeur du temps rendu",
    valeur: "1 000 FCFA / h",
    note: "Approche prudente, proche du coût horaire moyen observé dans le secteur informel urbain.",
  },
  {
    libelle: "Coût d'un déplacement évité",
    valeur: "800 FCFA",
    note: "Transport aller-retour en zone urbaine, hors temps d'attente déjà compté.",
  },
]
