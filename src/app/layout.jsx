import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
const inter = Inter({ subsets: ["latin"] })
import { Providers } from "./Providers"
import PageTransition from "./components/PageTransition"

export const metadata = {
  title: "Agenda Personal",
  description: "Organiza tu vida, gestiona tus hábitos y tareas de manera eficiente",
}
import { unstable_noStore as noStore } from "next/cache"

export default function RootLayout({ children }) {
  noStore()
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <main className="flex-grow">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
