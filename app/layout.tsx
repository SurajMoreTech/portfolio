import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Suraj Mahesh More — Portfolio",
  description:
    "Computer Engineering student and software developer specializing in Java, Data Structures & Algorithms, and Full-Stack Development.",
  keywords: [
    "Suraj Mahesh More",
    "portfolio",
    "software developer",
    "computer engineering",
    "Java",
    "full stack",
  ],
  openGraph: {
    title: "Suraj Mahesh More — Portfolio",
    description:
      "Computer Engineering student and software developer specializing in Java, DSA, and modern web technologies.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{children}</body>
    </html>
  )
}
