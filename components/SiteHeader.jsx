import Link from "next/link";
import { Instagram, Scissors } from "lucide-react";
import { contact } from "@/data/site";

const navItems = [
  { href: "/", label: "Főoldal" },
  { href: "/szolgaltatasok", label: "Szolgáltatások" },
  { href: "/galeria", label: "Galéria" },
  { href: "/kapcsolat", label: "Kapcsolat" }
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b soft-divider bg-cream/86 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 font-semibold text-ink" aria-label="Deák Niki Fodrász főoldal">
          <span className="grid size-9 place-items-center rounded-full bg-ink text-cream">
            <Scissors size={17} strokeWidth={1.8} />
          </span>
          <span className="leading-tight">
            Deák Niki
            <span className="block text-xs font-medium text-nude-500">fodrász · Tatabánya</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border soft-divider bg-white/58 p-1 text-sm font-medium text-nude-700 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 transition hover:bg-cream hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={contact.instagramUrl}
          className="grid size-10 place-items-center rounded-full border soft-divider bg-white/70 text-ink transition hover:border-clay hover:text-clay"
          aria-label="Instagram"
        >
          <Instagram size={18} strokeWidth={1.8} />
        </a>
      </div>
    </header>
  );
}
