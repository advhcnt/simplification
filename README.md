# Dossier Unique

Candidature au **Prix national de la simplification administrative** du Bénin :
le dossier unique du citoyen — des documents officiels vérifiés à la source et
partagés avec les administrations sous consentement, pour une durée limitée.

> « Plus jamais deux fois le même papier. »

## Ce que contient le dépôt

- **Site de candidature** (`/`) : constat, solution, parcours, modèle d’impact,
  faisabilité, feuille de route.
- **Dossier complet** (`/dossier`) : document imprimable, du résumé exécutif au
  budget du pilote, en passant par le cadre juridique et les risques.
- **Note de synthèse** (`/note-de-synthese`) : deux pages A4 à joindre au dépôt.
- **Script de présentation** (`/pitch`) : déroulé de cinq minutes, actions de
  démonstration, réponses aux questions du jury.
- **Dépôt** (`/depot`) : parcours officiel en cinq étapes, avec les textes prêts
  à copier dans le formulaire et la checklist des pièces à joindre.
- **Prototype fonctionnel** (navigation « Prototype ») :
  - `/mon-dossier` — coffre de pièces, santé du dossier, partage sous
    consentement avec code, QR scannable et lien de vérification, journal
    d’accès révocable, suivi des demandes.
  - `/demarches` — six démarches comparées avant/après.
  - `/demarches/[slug]` — parcours en quatre étapes, sans ressaisie ni
    justificatif, avec consentement et confirmation.
  - `/agent` — console du guichet : file d’attente, pièces authentifiées,
    validation ou demande de pièce, effet immédiat côté usager ; onglet
    « Guichet assisté » pour déposer une demande au nom d’une personne sans
    smartphone, avec motif d’assistance et reçu à remettre.
  - `/impact` — simulateur d’impact aux hypothèses modifiables.
  - `/verification/[token]` — page ouverte par le QR : périmètre exact du
    partage, durée et pièces autorisées. Le lien est autoportant (le contenu du
    consentement est encodé dans l’URL), donc scannable depuis n’importe quel
    appareil, sans serveur ni donnée hors périmètre.

## Démarrer

```bash
npm install
npm run dev
```

Autres scripts : `npm run typecheck`, `npm run lint`, `npm run build`.

## Règles du prototype

- **Toutes les données sont fictives.** Les personnes, documents, codes et
  administrations affichés sont inventés.
- Les interactions sont conservées dans le `localStorage` du navigateur
  (clé `dossier-unique.demo.v1`). Le bouton « Réinitialiser » efface les essais.
- Aucun appel réseau, aucun fichier réellement téléversé, aucune signature
  électronique réelle : le QR et le code de partage sont des visuels.
- Les chiffres d’impact sont des **hypothèses de travail**, explicitées et
  modifiables dans le simulateur ; ce ne sont pas des statistiques officielles.

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, composants shadcn/ui sur
Base UI, icônes lucide-react.
