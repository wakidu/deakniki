"use client";

import Link from "next/link";
import { Instagram, Menu, Scissors, X } from "lucide-react";
import { useState } from "react";
import { contact } from "@/data/site";

const navItems = [
  { href: "/", label: "Főoldal" },
  { href: "/szolgaltatasok", label: "Szolgáltatások" },
  { href: "/galeria", label: "Galéria" },
  { href: "/kapcsolat", label: "Kapcsolat" }
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b soft-divider bg-cream/86 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3 font-semibold text-ink" aria-label="Deák Niki Fodrász főoldal">
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
          className="hidden size-10 place-items-center rounded-full border soft-divider bg-white/70 text-ink transition hover:border-clay hover:text-clay md:grid"
          aria-label="Instagram"
        >
          <Instagram size={18} strokeWidth={1.8} />
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="grid size-10 place-items-center rounded-full border soft-divider bg-white/72 text-ink transition hover:border-clay md:hidden"
          aria-label={menuOpen ? "Menü bezárása" : "Menü megnyitása"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
        </button>
      </div>

      <div className={`border-t soft-divider bg-cream/96 px-4 pb-5 pt-3 shadow-soft md:hidden ${menuOpen ? "block" : "hidden"}`}>
        <nav className="mx-auto flex w-full max-w-[1120px] flex-col gap-1 text-base font-semibold text-ink">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu} className="rounded-2xl px-4 py-3 transition hover:bg-white/80">
              {item.label}
            </Link>
          ))}
          <a
            href={contact.instagramUrl}
            onClick={closeMenu}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-cream transition hover:bg-clay"
          >
            <Instagram size={18} strokeWidth={1.8} />
            Instagram
          </a>
        </nav>
      </div>
    </header>
  );
}
