import Link from "next/link";
import ServiceGrid from "@/components/ServiceGrid";
import SectionIntro from "@/components/SectionIntro";

export const metadata = {
  title: "Szolgáltatások",
  description: "Női, férfi és gyermek hajvágás, hajfestés és melír Tatabányán Deák Nikinél."
};

export default function ServicesPage() {
  return (
    <section className="page-shell py-12 sm:py-16">
      <SectionIntro
        eyebrow="Szolgáltatások"
        title="Hajvágás, festés, melír."
        text="Röviden leírtam, mire számíthatsz. A pontos ár hajhossztól és anyaghasználattól is függ."
      />
      <div className="mt-10">
        <ServiceGrid />
      </div>
      <Link href="/#foglalas" className="mt-10 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-cream transition hover:bg-clay">
        Időpont foglalás
      </Link>
    </section>
  );
}
