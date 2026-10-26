const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
]

const JOUR_MS = 86_400_000

/**
 * Les dates du prototype sont des dates civiles (`AAAA-MM-JJ`) : aucune heure,
 * aucun fuseau, donc aucun écart entre le rendu serveur et le rendu client.
 */
export function jour(decalage = 0): string {
  const maintenant = new Date()
  const d = new Date(
    Date.UTC(
      maintenant.getFullYear(),
      maintenant.getMonth(),
      maintenant.getDate()
    )
  )
  d.setUTCDate(d.getUTCDate() + decalage)
  return d.toISOString().slice(0, 10)
}

function versMs(iso: string): number {
  return Date.parse(`${iso.slice(0, 10)}T00:00:00Z`)
}

export function formatDate(iso: string): string {
  const d = new Date(versMs(iso))
  return `${d.getUTCDate()} ${MOIS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

export function formatDateCourt(iso: string): string {
  const d = new Date(versMs(iso))
  const jour = String(d.getUTCDate()).padStart(2, "0")
  const mois = String(d.getUTCMonth() + 1).padStart(2, "0")
  return `${jour}/${mois}/${d.getUTCFullYear()}`
}

export function joursEntre(depuis: string, jusqua: string): number {
  return Math.round((versMs(jusqua) - versMs(depuis)) / JOUR_MS)
}

export function joursRestants(iso: string): number {
  return joursEntre(jour(), iso)
}

/** « dans 12 jours », « expire aujourd'hui », « expiré depuis 3 jours ». */
export function echeance(iso: string): string {
  const n = joursRestants(iso)
  if (n === 0) return "expire aujourd'hui"
  if (n === 1) return "expire demain"
  if (n > 1) return `expire dans ${n} jours`
  if (n === -1) return "expiré depuis hier"
  return `expiré depuis ${Math.abs(n)} jours`
}

export function formatNombre(valeur: number): string {
  const n = Math.round(valeur)
  const signe = n < 0 ? "-" : ""
  return (
    signe +
    Math.abs(n)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  )
}

export function formatFcfa(valeur: number): string {
  return `${formatNombre(valeur)} FCFA`
}

export function formatFcfaCourt(valeur: number): string {
  if (valeur >= 1_000_000_000)
    return `${(valeur / 1_000_000_000).toFixed(1).replace(".0", "")} Md`
  if (valeur >= 1_000_000)
    return `${(valeur / 1_000_000).toFixed(1).replace(".0", "")} M`
  if (valeur >= 1_000)
    return `${(valeur / 1_000).toFixed(1).replace(".0", "")} k`
  return formatNombre(valeur)
}

export function formatDelai(heures: number): string {
  if (heures < 24) return `${formatNombre(heures)} h`
  const jours = heures / 24
  if (jours < 30) return `${formatNombre(jours)} j`
  return `${formatNombre(jours / 30)} mois`
}

export function formatHeures(heures: number): string {
  if (heures >= 1_000_000) return `${formatNombre(heures / 1_000_000)} M h`
  return `${formatNombre(heures)} h`
}

export function pluraliser(
  n: number,
  singulier: string,
  pluriel = `${singulier}s`
): string {
  return `${formatNombre(n)} ${n > 1 ? pluriel : singulier}`
}
