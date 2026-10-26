import { DemoNav } from "@/components/demo/demo-nav"

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <DemoNav />
      <main className="flex-1">{children}</main>
      <footer className="no-print border-t py-5">
        <p className="mx-auto max-w-6xl px-5 text-[0.7rem] leading-relaxed text-muted-foreground sm:px-8">
          Prototype de démonstration — données fictives, aucune donnée réelle
          traitée. Les interactions sont enregistrées dans votre navigateur
          uniquement ; le bouton « Réinitialiser » efface vos essais.
        </p>
      </footer>
    </div>
  )
}
