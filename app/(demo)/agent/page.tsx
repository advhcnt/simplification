import type { Metadata } from "next"
import { Building2, Clock, Files, ShieldCheck } from "lucide-react"

import { AgentConsole } from "@/components/demo/agent-console"

export const metadata: Metadata = {
  title: "Console agent",
  description:
    "Le guichet vu de l'agent : une file d'attente, des pièces authentifiées à la source, des décisions traçables.",
}

const INDICATEURS = [
  {
    icone: Clock,
    valeur: "4 min",
    libelle: "de contrôle par dossier, au lieu de 35",
  },
  {
    icone: Files,
    valeur: "0",
    libelle: "photocopie à archiver ou à classer",
  },
  {
    icone: ShieldCheck,
    valeur: "100 %",
    libelle: "des pièces authentifiées par l'émetteur",
  },
]

export default function AgentPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-9 sm:px-8 sm:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.68rem] font-medium tracking-[0.16em] text-primary uppercase">
            Côté administration
          </p>
          <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
            Console agent
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Le même dossier, vu du guichet : l&apos;agent instruit à partir de
            pièces authentifiées, sans réclamer de photocopie ni faire revenir
            l&apos;usager.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-[0.72rem] text-muted-foreground shadow-sm">
          <Building2 className="size-3.5 text-primary" />
          Guichet connecté · Mairie de Cotonou
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {INDICATEURS.map((indicateur) => {
          const Icone = indicateur.icone
          return (
            <div
              key={indicateur.valeur}
              className="flex items-start gap-3 rounded-xl border bg-card p-4"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icone className="size-4" />
              </span>
              <div>
                <p className="font-display text-xl leading-none font-semibold tracking-tight">
                  {indicateur.valeur}
                </p>
                <p className="mt-1 text-[0.72rem] leading-snug text-muted-foreground">
                  {indicateur.libelle}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-6">
        <AgentConsole />
      </div>{" "}
      <p className="mt-5 rounded-xl border border-dashed bg-card/50 p-4 text-[0.72rem] leading-relaxed text-muted-foreground">
        <strong className="font-medium text-foreground">À essayer :</strong>{" "}
        validez un dossier, puis retournez dans « Mon Dossier » : la demande
        passe en validée et le document signé apparaît. Vous pouvez aussi
        demander une pièce : le motif est aussitôt visible côté usager. Dans
        l&apos;onglet « Guichet assisté », déposez une demande pour une personne
        sans smartphone : elle rejoint la file et le journal de l&apos;usager.
      </p>
    </div>
  )
}
