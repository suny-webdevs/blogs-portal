import type { Metadata } from "next"
import { Open_Sans, Geist_Mono } from "next/font/google"
import "./globals.css"

const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Blogs News Portal",
  description: "A online blogs news portal",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${geistMono.variable} antialiased container mx-auto px-2 md:px-0 scroll-smooth`}
      >
        {children}
      </body>
    </html>
  )
}
