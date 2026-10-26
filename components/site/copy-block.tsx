"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CopyBlock({
  texte,
  libelle = "Copier le texte",
}: {
  texte: string
  libelle?: string
}) {
  const [copie, setCopie] = useState(false)

  function confirmer() {
    setCopie(true)
    window.setTimeout(() => setCopie(false), 2000)
  }

  async function copier() {
    try {
      await navigator.clipboard.writeText(texte)
      confirmer()
      return
    } catch {
      // Repli pour les navigateurs qui bloquent le presse-papiers.
    }

    const zone = document.createElement("textarea")
    zone.value = texte
    zone.setAttribute("readonly", "")
    zone.style.position = "fixed"
    zone.style.opacity = "0"
    document.body.appendChild(zone)
    zone.select()
    try {
      document.execCommand("copy")
      confirmer()
    } finally {
      document.body.removeChild(zone)
    }
  }

  return (
    <Button
      variant="ghost"
      size="xs"
      onClick={copier}
      className="no-print text-muted-foreground"
    >
      {copie ? <Check /> : <Copy />}
      {copie ? "Copié" : libelle}
    </Button>
  )
}
