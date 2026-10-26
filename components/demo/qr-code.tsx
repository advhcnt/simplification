"use client"

import { useSyncExternalStore } from "react"
import { QRCodeSVG } from "qrcode.react"

const nePasSAbonner = () => () => {}

/**
 * L'origine n'existe que côté navigateur : `""` au rendu serveur, l'URL réelle
 * après hydratation, sans effet ni changement d'état.
 */
export function useOrigine(): string {
  return useSyncExternalStore(
    nePasSAbonner,
    () => window.location.origin,
    () => ""
  )
}

export function QrCode({
  valeur,
  taille = 132,
  className,
}: {
  valeur: string
  taille?: number
  className?: string
}) {
  return (
    <QRCodeSVG
      value={valeur}
      size={taille}
      level="L"
      marginSize={2}
      bgColor="#ffffff"
      fgColor="#0f2417"
      title="QR de vérification du partage"
      className={className}
    />
  )
}

/** QR qui encode l'URL absolue du partage ; l'origine n'est connue qu'au client. */
export function QrLien({
  token,
  taille = 132,
  className,
}: {
  token: string
  taille?: number
  className?: string
}) {
  const origine = useOrigine()

  if (origine.length === 0) {
    return (
      <div
        aria-hidden
        className="rounded-[6px] border border-dashed bg-muted/40"
        style={{ width: taille, height: taille }}
      />
    )
  }

  return (
    <QrCode
      valeur={`${origine}/verification/${token}`}
      taille={taille}
      className={className}
    />
  )
}
