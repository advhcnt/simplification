import { jour } from "./format"
import type {
  Consentement,
  Demande,
  Demarche,
  EtatDemo,
  Piece,
  Profil,
} from "./types"

export const PROFIL: Profil = {
  nom: "SOSSOU",
  prenoms: "Adjoa Clarisse",
  neLe: "1994-03-14",
  aCotonou: true,
  identifiant: "BJ-1994-0812-4471",
  telephone: "+229 97 12 34 56",
  adresse: "Fidjrossè, 12ᵉ arrondissement, Cotonou",
  entreprise: "Sossou Agrobusiness (immatriculation en cours)",
}

export const PIECES: Piece[] = [
  {
    id: "acte-naissance",
    nom: "Extrait d'acte de naissance sécurisé",
    emetteur: "ANIP · Mairie de Cotonou",
    numero: "EC-2025-114-8821",
    delivreLe: jour(-420),
    statut: "verifie",
    categorie: "etat-civil",
    empreinte: "a91f·3c72·e4b0",
    precision:
      "Registre d'état civil de Cotonou, authentifié par l'ANIP. Toute administration peut vérifier la signature en ligne.",
  },
  {
    id: "cni",
    nom: "Carte nationale d'identité (RAVIP)",
    emetteur: "ANIP",
    numero: "BJ-1994-0812-4471",
    delivreLe: jour(-1420),
    expireLe: jour(58),
    statut: "a_renouveler",
    categorie: "identite",
    empreinte: "d0c4·7a18·55fe",
    precision:
      "Photo et empreintes vérifiées. Le renouvellement peut être prérempli depuis ce dossier, sans nouvelle photo à fournir.",
  },
  {
    id: "residence",
    nom: "Certificat de résidence",
    emetteur: "Mairie de Cotonou · 12ᵉ arrondissement",
    numero: "CR-2026-0442",
    delivreLe: jour(-160),
    expireLe: jour(190),
    statut: "verifie",
    categorie: "domicile",
    empreinte: "6b2e·90aa·1fd3",
    precision:
      "Délivré après enquête de voisinage. Rattachement au quartier Fidjrossè confirmé par l'arrondissement.",
  },
  {
    id: "ifu",
    nom: "Attestation d'Identifiant Fiscal Unique",
    emetteur: "Direction générale des Impôts",
    numero: "IFU 3201 9876 5432 1",
    delivreLe: jour(-900),
    statut: "verifie",
    categorie: "fiscal",
    empreinte: "77ab·0e35·c9d1",
    precision:
      "Identifiant actif, sans dette déclarée. Utilisé par toutes les administrations fiscales et douanières.",
  },
  {
    id: "casier",
    nom: "Extrait de casier judiciaire (bulletin n° 3)",
    emetteur: "Tribunal de première instance de Cotonou",
    numero: "CJ-2026-0771",
    delivreLe: jour(-80),
    expireLe: jour(12),
    statut: "verifie",
    categorie: "judiciaire",
    empreinte: "c53d·8b41·2ae6",
    precision:
      "Bulletin n° 3, valable trois mois. Un nouveau bulletin peut être généré automatiquement à la demande.",
  },
  {
    id: "diplome",
    nom: "Attestation de réussite au baccalauréat",
    emetteur: "Direction des Examens et Concours",
    numero: "BAC-2013-5561",
    delivreLe: jour(-4400),
    statut: "verifie",
    categorie: "education",
    empreinte: "1e8f·b207·6d4a",
    precision:
      "Série D, session 2013. Vérifiée auprès du fichier national des examens.",
  },
  {
    id: "titre-foncier",
    nom: "Titre foncier",
    emetteur: "Direction générale des Domaines",
    numero: "—",
    delivreLe: jour(0),
    statut: "manquant",
    categorie: "domicile",
    empreinte: "—",
    absente: true,
    precision:
      "Cette pièce n'est pas encore dématérialisée au Bénin : elle reste à fournir en copie pour les démarches foncières.",
  },
]

export const DEMARCHES: Demarche[] = [
  {
    slug: "extrait-acte-naissance",
    nom: "Extrait d'acte de naissance",
    administration: "Mairie de Cotonou · ANIP",
    cibles: ["citoyen", "entreprise"],
    resume:
      "Une copie fraîche et certifiée de votre acte de naissance, pour une inscription, un mariage ou un dossier professionnel.",
    avant: {
      pieces: 4,
      deplacements: 3,
      delaiJours: 7,
      coutFcfa: 3000,
      tempsUsagerHeures: 5,
      tempsAgentMinutes: 35,
    },
    apres: {
      pieces: 0,
      deplacements: 0,
      delaiHeures: 24,
      coutFcfa: 500,
      tempsUsagerHeures: 0.25,
      tempsAgentMinutes: 4,
    },
    piecesRequises: ["acte-naissance", "cni"],
    piecesPapier: [],
    etapes: [
      "La mairie reçoit la demande et retrouve la fiche d'état civil d'origine.",
      "L'agent vérifie l'identité du demandeur dans le dossier unique.",
      "L'extrait est généré, signé électroniquement et déposé dans votre coffre.",
      "Vous êtes notifié par SMS ; le retrait au guichet devient optionnel.",
    ],
  },
  {
    slug: "certificat-residence",
    nom: "Certificat de résidence",
    administration: "Mairie de Cotonou · 12ᵉ arrondissement",
    cibles: ["citoyen", "entreprise"],
    resume:
      "La preuve de domicile délivrée par votre arrondissement, sans repasser par l'enquête de voisinage à chaque fois.",
    avant: {
      pieces: 5,
      deplacements: 2,
      delaiJours: 5,
      coutFcfa: 2500,
      tempsUsagerHeures: 4,
      tempsAgentMinutes: 25,
    },
    apres: {
      pieces: 0,
      deplacements: 0,
      delaiHeures: 24,
      coutFcfa: 500,
      tempsUsagerHeures: 0.25,
      tempsAgentMinutes: 3,
    },
    piecesRequises: ["cni", "residence"],
    piecesPapier: [],
    etapes: [
      "L'arrondissement retrouve l'enquête de voisinage déjà validée dans votre dossier.",
      "Seul un contrôle de non-changement de domicile est effectué.",
      "Le certificat est signé et versé au coffre, valable un an.",
    ],
  },
  {
    slug: "casier-judiciaire",
    nom: "Extrait de casier judiciaire",
    administration: "Tribunal de première instance de Cotonou",
    cibles: ["citoyen", "entreprise"],
    resume:
      "Le bulletin n° 3 exigé pour un emploi, un concours ou un marché public, produit directement par le greffe.",
    avant: {
      pieces: 4,
      deplacements: 3,
      delaiJours: 10,
      coutFcfa: 3500,
      tempsUsagerHeures: 5,
      tempsAgentMinutes: 30,
    },
    apres: {
      pieces: 0,
      deplacements: 0,
      delaiHeures: 48,
      coutFcfa: 1000,
      tempsUsagerHeures: 0.5,
      tempsAgentMinutes: 4,
    },
    piecesRequises: ["cni", "acte-naissance"],
    piecesPapier: [],
    etapes: [
      "Le greffe identifie le demandeur par son identifiant unique.",
      "La consultation du casier se fait sans déplacement physique.",
      "Le bulletin est signé électroniquement, daté et déposé dans le coffre.",
    ],
  },
  {
    slug: "creation-entreprise",
    nom: "Immatriculation d'une entreprise",
    administration: "APIEx · Guichet unique de formalisation",
    cibles: ["entreprise"],
    resume:
      "RCCM, IFU et attestation d'immatriculation en une seule demande, avec les pièces déjà présentes dans votre dossier.",
    avant: {
      pieces: 9,
      deplacements: 5,
      delaiJours: 15,
      coutFcfa: 45000,
      tempsUsagerHeures: 14,
      tempsAgentMinutes: 90,
    },
    apres: {
      pieces: 1,
      deplacements: 0,
      delaiHeures: 72,
      coutFcfa: 15000,
      tempsUsagerHeures: 2,
      tempsAgentMinutes: 15,
    },
    piecesRequises: ["cni", "acte-naissance", "residence"],
    piecesPapier: ["Statuts de la société, signés par tous les associés"],
    etapes: [
      "Le guichet récupère l'identité et le domicile vérifiés du promoteur.",
      "Vous ne téléversez que les statuts de la société.",
      "RCCM et IFU sont générés ensemble, puis renvoyés dans le coffre.",
    ],
  },
  {
    slug: "permis-construire",
    nom: "Permis de construire",
    administration: "Mairie de Cotonou · Agence du cadre de vie",
    cibles: ["entreprise", "citoyen"],
    resume:
      "L'autorisation de bâtir, avec un circuit de validation partagé entre mairie, urbanisme et domaines.",
    avant: {
      pieces: 11,
      deplacements: 8,
      delaiJours: 90,
      coutFcfa: 75000,
      tempsUsagerHeures: 24,
      tempsAgentMinutes: 180,
    },
    apres: {
      pieces: 4,
      deplacements: 2,
      delaiHeures: 1080,
      coutFcfa: 25000,
      tempsUsagerHeures: 12,
      tempsAgentMinutes: 60,
    },
    piecesRequises: ["cni", "acte-naissance", "residence"],
    piecesPapier: [
      "Titre foncier (copie certifiée)",
      "Plans de construction visés",
      "Notice descriptive",
      "Justificatif de propriété",
    ],
    etapes: [
      "La mairie récupère vos pièces d'identité et de domicile depuis le dossier unique.",
      "Vous fournissez le titre foncier et les plans, encore papier.",
      "Les services d'urbanisme instruisent en parallèle, avec un suivi visible en ligne.",
      "L'arrêté est signé et notifié dans votre espace.",
    ],
  },
  {
    slug: "concours-fonction-publique",
    nom: "Inscription à un concours public",
    administration: "Ministère du Travail et de la Fonction publique",
    cibles: ["citoyen"],
    resume:
      "Candidater à un concours de la fonction publique sans constituer une chemise de pièces justificatives.",
    avant: {
      pieces: 6,
      deplacements: 3,
      delaiJours: 12,
      coutFcfa: 5000,
      tempsUsagerHeures: 7,
      tempsAgentMinutes: 40,
    },
    apres: {
      pieces: 0,
      deplacements: 0,
      delaiHeures: 24,
      coutFcfa: 500,
      tempsUsagerHeures: 0.25,
      tempsAgentMinutes: 4,
    },
    piecesRequises: ["cni", "acte-naissance", "diplome", "casier"],
    piecesPapier: [],
    etapes: [
      "Votre identité, votre diplôme et votre casier sont vérifiés à la source.",
      "Le dossier de candidature est généré et horodaté.",
      "La convocation arrive par SMS et dans le coffre.",
    ],
  },
]

export function creerDemandesInitiales(): Demande[] {
  return [
    {
      id: "DU-2026-0148",
      demarcheSlug: "extrait-acte-naissance",
      demandeur: "Sossou Adjoa Clarisse",
      statut: "en_traitement",
      creeLe: jour(-2),
      majLe: jour(-1),
      pieces: ["acte-naissance", "cni"],
      agent: "Mairie de Cotonou",
    },
    {
      id: "DU-2026-0141",
      demarcheSlug: "creation-entreprise",
      demandeur: "Sossou Adjoa Clarisse",
      statut: "piece_demandee",
      creeLe: jour(-6),
      majLe: jour(-4),
      pieces: ["cni", "acte-naissance", "residence"],
      motif:
        "Les statuts de la société sont illisibles. Merci de téléverser une version nette, signée par tous les associés.",
      agent: "APIEx — Guichet unique",
    },
    {
      id: "DU-2026-0136",
      demarcheSlug: "certificat-residence",
      demandeur: "Sossou Adjoa Clarisse",
      statut: "validee",
      creeLe: jour(-9),
      majLe: jour(-8),
      pieces: ["cni", "residence"],
      agent: "Mairie de Cotonou",
    },
  ]
}

export function creerConsentementsInitiaux(): Consentement[] {
  return [
    {
      id: "CS-2026-0302",
      administration: "Mairie de Cotonou — État civil",
      motif: "Délivrance d'un extrait d'acte de naissance",
      pieces: ["acte-naissance", "cni"],
      creeLe: jour(-2),
      expireLe: jour(5),
      statut: "actif",
      code: "DU-4F7K-92AB",
    },
    {
      id: "CS-2026-0298",
      administration: "APIEx — Guichet unique",
      motif: "Instruction du dossier d'immatriculation",
      pieces: ["cni", "acte-naissance", "residence"],
      creeLe: jour(-6),
      expireLe: jour(9),
      statut: "actif",
      code: "DU-8P1M-33CD",
    },
    {
      id: "CS-2026-0261",
      administration: "Direction générale des Impôts",
      motif: "Contrôle de l'Identifiant Fiscal Unique",
      pieces: ["ifu"],
      creeLe: jour(-41),
      expireLe: jour(-11),
      statut: "expire",
      code: "DU-2Q6Z-70EF",
    },
  ]
}

export function creerEtatInitial(): EtatDemo {
  return {
    version: 1,
    profil: PROFIL,
    pieces: PIECES.map((p) => ({ ...p })),
    demandes: creerDemandesInitiales(),
    consentements: creerConsentementsInitiaux(),
  }
}

export function trouverDemarche(slug: string): Demarche | undefined {
  return DEMARCHES.find((d) => d.slug === slug)
}

export function piecesUtilisables(etat: EtatDemo, ids: string[]): Piece[] {
  return etat.pieces.filter((p) => ids.includes(p.id) && !p.absente)
}

export function piecesBloquantes(etat: EtatDemo, ids: string[]): Piece[] {
  return etat.pieces.filter((p) => ids.includes(p.id) && p.absente)
}
