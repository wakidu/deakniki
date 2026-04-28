import Image from "next/image";
import { galleryImages } from "@/data/site";

export default function GalleryGrid({ limit }) {
  const images = typeof limit === "number" ? galleryImages.slice(0, limit) : galleryImages;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {images.map((image, index) => (
        <figure key={image.src} className="group relative aspect-square overflow-hidden rounded-[1.35rem] bg-mist">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 768px) 31vw, 46vw"
            priority={index < 2}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/48 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
            <p className="text-xs font-semibold text-white">Deák Niki Fodrász</p>
          </div>
        </figure>
      ))}
    </div>
  );
}
