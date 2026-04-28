import Link from "next/link";
import { Instagram } from "lucide-react";
import { contact } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t soft-divider bg-white/44 py-10">
      <div className="page-shell flex flex-col gap-6 text-sm text-nude-700 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-ink">Deák Niki Fodrász</p>
          <p>Tatabánya · hajvágás, festés, melír</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/kapcsolat" className="hover:text-ink">Kapcsolat</Link>
          <Link href="/#foglalas" className="hover:text-ink">Időpont foglalás</Link>
          <a href={contact.instagramUrl} className="inline-flex items-center gap-2 font-semibold text-clay hover:text-ink">
            <Instagram size={16} />
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
