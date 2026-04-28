import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import BookingSection from "@/components/BookingSection";
import GalleryGrid from "@/components/GalleryGrid";
import ServiceGrid from "@/components/ServiceGrid";

export default function HomePage() {
  return (
    <>
      <section className="page-shell grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-[1.02fr_.98fr] lg:py-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border soft-divider bg-white/62 px-4 py-2 text-sm font-semibold text-nude-700">
            <MapPin size={16} />
            Tatabánya
          </p>
          <h1 className="mt-7 display-title text-6xl font-semibold text-ink sm:text-7xl lg:text-8xl">
            Fodrászat Tatabányán – Deák Niki
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-nude-700">
            Hajvágás, festés és megújulás barátságos környezetben.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#foglalas"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-cream shadow-soft transition hover:bg-clay"
            >
              <CalendarDays size={18} />
              Időpont foglalás
            </Link>
            <Link
              href="/galeria"
              className="inline-flex items-center justify-center rounded-full border soft-divider bg-white/70 px-6 py-3 text-sm font-bold text-ink transition hover:border-clay"
            >
              Galéria
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-[.78fr_1fr] gap-3 sm:gap-4">
          <div className="space-y-3 pt-12 sm:space-y-4">
            <HeroImage src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=85" alt="Frissen elkészült női haj" />
            <HeroImage src="https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=900&q=85" alt="Fodrász eszközök" small />
          </div>
          <div className="space-y-3 sm:space-y-4">
            <HeroImage src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=85" alt="Fodrász munka közben" tall />
            <div className="rounded-[1.4rem] border soft-divider bg-white/78 p-5 shadow-soft">
              <p className="font-display text-3xl font-semibold text-ink">szia, Niki vagyok</p>
              <p className="mt-2 text-sm leading-6 text-nude-700">
                Tatabányán dolgozom. Szeretem, ha a haj nem csak a szalonban jó, hanem másnap reggel is.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-clay">Bemutatkozás</p>
            <h2 className="mt-3 display-title text-5xl font-semibold text-ink">Nyugis szalon, egyszerű egyeztetés.</h2>
          </div>
          <p className="text-base leading-8 text-nude-700">
            Női, férfi és gyermek hajvágással, festéssel és melírral foglalkozom. Ha időpontot szeretnél, válassz szolgáltatást, napot és szabad időpontot, így nem kell Messengerben oda-vissza írni.
          </p>
        </div>
      </section>

      <section className="page-shell py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-clay">Szolgáltatások</p>
            <h2 className="mt-3 display-title text-5xl font-semibold text-ink">A legtöbben ezekre jönnek.</h2>
          </div>
          <Link href="/szolgaltatasok" className="hidden rounded-full border soft-divider bg-white/70 px-5 py-3 text-sm font-bold text-ink transition hover:border-clay sm:inline-flex">
            Összes szolgáltatás
          </Link>
        </div>
        <ServiceGrid compact />
      </section>

      <section className="page-shell py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-clay">Galéria</p>
            <h2 className="mt-3 display-title text-5xl font-semibold text-ink">Kicsit Instagram, kicsit inspiráció.</h2>
          </div>
          <Link href="/galeria" className="hidden rounded-full border soft-divider bg-white/70 px-5 py-3 text-sm font-bold text-ink transition hover:border-clay sm:inline-flex">
            Több kép
          </Link>
        </div>
        <GalleryGrid limit={6} />
      </section>

      <section id="foglalas" className="page-shell scroll-mt-24 py-12">
        <div className="mb-6 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-clay">Időpontfoglalás</p>
          <h2 className="mt-3 display-title text-5xl font-semibold text-ink">Válassz egy szabad időpontot.</h2>
          <p className="mt-4 text-base leading-7 text-nude-700">A foglalás után Niki visszajelzést ad, ha bármit pontosítani kell.</p>
        </div>
        <BookingSection />
      </section>
    </>
  );
}

function HeroImage({ src, alt, tall = false, small = false }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.6rem] bg-mist shadow-soft ${tall ? "aspect-[4/5]" : small ? "aspect-[5/4]" : "aspect-[4/4.8]"}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 1024px) 42vw, 92vw" priority={tall} />
    </div>
  );
}
