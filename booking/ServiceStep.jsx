export default function ServiceStep({ services, selectedService, onSelect, primaryTextClass, primaryBorderClass }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const isSelected = selectedService?.id === service.id;

        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service)}
            className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft focus-ring ${
              isSelected ? primaryBorderClass : "border-nude-200"
            }`}
            aria-pressed={isSelected}
          >
            <span className={`block text-lg font-bold text-ink ${isSelected ? primaryTextClass : ""}`}>
              {service.name}
            </span>
            <span className="mt-3 block text-sm font-semibold text-nude-700">{service.durationMinutes} perc</span>
            {service.price ? <span className="mt-1 block text-sm text-nude-500">{service.price}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
