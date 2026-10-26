import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Dossier Unique — Plus jamais deux fois le même papier",
    template: "%s · Dossier Unique",
  },
  description:
    "Candidature au Prix national de la simplification administrative du Bénin : le dossier unique du citoyen, un coffre de documents vérifiés à la source et partagés sous consentement avec toutes les administrations.",
  keywords: [
    "simplification administrative",
    "Bénin",
    "dossier unique",
    "once-only",
    "démarches en ligne",
    "Prix national de la simplification administrative",
  ],
  openGraph: {
    title: "Dossier Unique — Plus jamais deux fois le même papier",
    description:
      "Vos documents officiels une seule fois, vérifiés à la source, partagés sous consentement. Candidature au Prix national de la simplification administrative 2026.",
    locale: "fr_BJ",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
