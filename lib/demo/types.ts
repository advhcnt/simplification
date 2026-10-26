export type StatutPiece = "verifie" | "a_renouveler" | "manquant"

export type CategoriePiece =
  "etat-civil" | "identite" | "domicile" | "fiscal" | "judiciaire" | "education"

export type Piece = {
  id: string
  nom: string
  emetteur: string
  numero: string
  delivreLe: string
  expireLe?: string
  statut: StatutPiece
  categorie: CategoriePiece
  empreinte: string
  precision: string
  /** Une pièce absente du coffre mais exigée par certaines démarches. */
  absente?: boolean
}

export type PublicCible = "citoyen" | "entreprise" | "agent"

export type Profil = {
  nom: string
  prenoms: string
  neLe: string
  aCotonou: boolean
  identifiant: string
  telephone: string
  adresse: string
  entreprise?: string
}

export type Demarche = {
  slug: string
  nom: string
  administration: string
  cibles: PublicCible[]
  resume: string
  avant: {
    pieces: number
    deplacements: number
    delaiJours: number
    coutFcfa: number
    tempsUsagerHeures: number
    tempsAgentMinutes: number
  }
  apres: {
    pieces: number
    deplacements: number
    delaiHeures: number
    coutFcfa: number
    tempsUsagerHeures: number
    tempsAgentMinutes: number
  }
  /** Pièces déjà présentes dans le coffre, vérifiées à la source. */
  piecesRequises: string[]
  /** Pièces encore papier, que l'usager doit fournir lui-même. */
  piecesPapier: string[]
  etapes: string[]
}

export type StatutDemande =
  "transmise" | "en_traitement" | "validee" | "piece_demandee"

export type Demande = {
  id: string
  demarcheSlug: string
  demandeur: string
  statut: StatutDemande
  creeLe: string
  majLe: string
  pieces: string[]
  motif?: string
  agent?: string
  /** Dépôt en ligne par l'usager, ou au guichet avec l'assistance d'un agent. */
  canal?: "en-ligne" | "guichet"
  /** Motif de l'assistance, quand la demande a été déposée au guichet. */
  assistance?: string
}

export type Consentement = {
  id: string
  administration: string
  motif: string
  pieces: string[]
  creeLe: string
  expireLe: string
  statut: "actif" | "revoque" | "expire"
  code: string
}

export type EtatDemo = {
  version: 1
  profil: Profil
  pieces: Piece[]
  demandes: Demande[]
  consentements: Consentement[]
}
