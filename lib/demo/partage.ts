import type { Consentement, EtatDemo, Piece } from "./types"

export type PiecePartagee = {
  nom: string
  emetteur: string
  empreinte: string
}

export type Partage = {
  code: string
  administration: string
  motif: string
  beneficiaire: string
  creeLe: string
  expireLe: string
  pieces: PiecePartagee[]
}

const VERSION = 1

export function construirePartage(
  consentement: Consentement,
  etat: EtatDemo
): Partage {
  return {
    code: consentement.code,
    administration: consentement.administration,
    motif: consentement.motif,
    beneficiaire: `${etat.profil.prenoms} ${etat.profil.nom}`,
    creeLe: consentement.creeLe,
    expireLe: consentement.expireLe,
    pieces: consentement.pieces
      .map((id) => etat.pieces.find((piece) => piece.id === id))
      .filter((piece): piece is Piece => piece !== undefined && !piece.absente)
      .map((piece) => ({
        nom: piece.nom,
        emetteur: piece.emetteur,
        empreinte: piece.empreinte,
      })),
  }
}

/**
 * Le partage est autoportant : le lien contient le périmètre exact du
 * consentement, encodé en base64url. Aucun serveur, aucune donnée hors du
 * périmètre, et le lien peut être scanné depuis n'importe quel appareil.
 */
export function encoderPartage(partage: Partage): string {
  const charge = JSON.stringify({
    v: VERSION,
    c: partage.code,
    a: partage.administration,
    m: partage.motif,
    b: partage.beneficiaire,
    d: partage.creeLe,
    e: partage.expireLe,
    p: partage.pieces.map((piece) => [
      piece.nom,
      piece.emetteur,
      piece.empreinte,
    ]),
  })
  const octets = new TextEncoder().encode(charge)
  let binaire = ""
  octets.forEach((octet) => {
    binaire += String.fromCharCode(octet)
  })
  return btoa(binaire)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

export function decoderPartage(token: string): Partage | null {
  try {
    const base64 = token.replace(/-/g, "+").replace(/_/g, "/")
    const binaire = atob(base64)
    const octets = Uint8Array.from(binaire, (caractere) =>
      caractere.charCodeAt(0)
    )
    const brut = JSON.parse(new TextDecoder().decode(octets)) as Record<
      string,
      unknown
    >
    if (brut.v !== VERSION) return null
    if (typeof brut.c !== "string" || typeof brut.a !== "string") return null
    if (!Array.isArray(brut.p)) return null

    const texte = (valeur: unknown, limite = 200) =>
      typeof valeur === "string" ? valeur.slice(0, limite) : ""

    const pieces: PiecePartagee[] = brut.p
      .filter((piece): piece is unknown[] => Array.isArray(piece))
      .slice(0, 20)
      .map((piece) => ({
        nom: texte(piece[0]),
        emetteur: texte(piece[1]),
        empreinte: texte(piece[2], 80),
      }))
      .filter((piece) => piece.nom.length > 0)

    return {
      code: texte(brut.c, 40),
      administration: texte(brut.a),
      motif: texte(brut.m, 300),
      beneficiaire: texte(brut.b),
      creeLe: texte(brut.d, 10),
      expireLe: texte(brut.e, 10),
      pieces,
    }
  } catch {
    return null
  }
}

export function lienVerification(token: string, origine: string): string {
  return `${origine}/verification/${token}`
}
