import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Anand Pharma - Your Trusted Medical Store",
  description:
    "Anand Pharma has been serving the community since 1993 with quality medical products, healthcare essentials, and expert pharmaceutical consultation. Browse our extensive catalog of 600+ products.",
  keywords: "pharmacy, medical store, healthcare, medicines, Anand Pharma, pharmaceutical",
  authors: [{ name: "Anand Pharma" }],
  openGraph: {
    title: "Anand Pharma - Your Trusted Medical Store",
    description: "Quality medical products and healthcare essentials since 1993",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
