import GalleryGrid from "@/components/GalleryGrid";
import SectionIntro from "@/components/SectionIntro";

export const metadata = {
  title: "Galéria",
  description: "Fodrász galéria Deák Niki munkáihoz és haj inspirációkhoz Tatabányán."
};

export default function GalleryPage() {
  return (
    <section className="page-shell py-12 sm:py-16">
      <SectionIntro
        eyebrow="Galéria"
        title="Hajak, hangulatok, kis átalakulások."
        text="Nem minden kép műtermi. Pont ez a lényeg: legyen valódi, hordható, emberi."
      />
      <div className="mt-10">
        <GalleryGrid />
      </div>
    </section>
  );
}
