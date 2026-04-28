import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import SectionIntro from "@/components/SectionIntro";
import { contact } from "@/data/site";

export const metadata = {
  title: "Kapcsolat",
  description: "Deák Niki Fodrász elérhetőségek Tatabányán, Instagram, Facebook és online időpontfoglalás."
};

export default function ContactPage() {
  return (
    <section className="page-shell py-12 sm:py-16">
      <SectionIntro
        eyebrow="Kapcsolat"
        title="Tatabánya, időponttal."
        text="A leggyorsabb az online foglalás. Ha kérdésed van, írj Instagramon vagy Facebookon."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-[.88fr_1.12fr]">
        <div className="rounded-[1.6rem] border soft-divider bg-white/72 p-6 shadow-soft">
          <div className="space-y-5 text-sm text-nude-700">
            <ContactRow icon={<MapPin size={18} />} label="Helyszín" value={contact.city} />
            <ContactRow icon={<Phone size={18} />} label="Telefon" value={contact.phone} />
            <a href={contact.instagramUrl} className="flex items-center gap-4 rounded-2xl bg-ink p-4 font-semibold text-cream transition hover:bg-clay">
              <Instagram size={20} />
              Instagram
            </a>
            <a href={contact.facebookUrl} className="flex items-center gap-4 rounded-2xl border soft-divider bg-white/80 p-4 font-semibold text-ink transition hover:border-clay">
              <Facebook size={20} />
              Facebook
            </a>
          </div>
          <Link href="/#foglalas" className="mt-6 inline-flex w-full justify-center rounded-full bg-clay px-6 py-3 text-sm font-bold text-white transition hover:bg-ink">
            Időpont foglalás
          </Link>
        </div>

        <div className="overflow-hidden rounded-[1.6rem] border soft-divider bg-mist shadow-soft">
          <iframe
            title="Deák Niki Fodrász térkép"
            src={contact.mapsEmbedUrl}
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border soft-divider bg-white/72 p-4">
      <span className="text-clay">{icon}</span>
      <span>
        <span className="block text-xs font-bold uppercase tracking-[.14em] text-nude-500">{label}</span>
        <span className="mt-1 block font-semibold text-ink">{value}</span>
      </span>
    </div>
  );
}
