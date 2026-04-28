import { services } from "@/data/site";

export default function ServiceGrid({ compact = false }) {
  const visibleServices = compact ? services.slice(0, 3) : services;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visibleServices.map((service) => (
        <article key={service.id} className="rounded-[1.5rem] border soft-divider bg-white/68 p-5 shadow-soft">
          <p className="font-semibold text-ink">{service.name}</p>
          <p className="mt-3 min-h-16 text-sm leading-6 text-nude-700">{service.text}</p>
          <p className="mt-5 text-sm font-bold text-clay">{service.price}</p>
        </article>
      ))}
    </div>
  );
}
