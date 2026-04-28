import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const cormorant = Cormorant_Garamond({
  subsets: ["latin-ext"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const manrope = Manrope({
  subsets: ["latin-ext"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata = {
  title: {
    default: "Deák Niki Fodrász | Fodrászat Tatabányán",
    template: "%s | Deák Niki Fodrász"
  },
  description: "Fodrászat Tatabányán: női, férfi és gyermek hajvágás, hajfestés és melír Deák Nikinél, egyszerű online időpontfoglalással.",
  keywords: ["fodrászat Tatabánya", "hajvágás Tatabánya", "hajfestés Tatabánya", "Deák Niki fodrász"],
  openGraph: {
    title: "Deák Niki Fodrász | Fodrászat Tatabányán",
    description: "Hajvágás, festés és megújulás barátságos környezetben.",
    locale: "hu_HU",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="hu" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
