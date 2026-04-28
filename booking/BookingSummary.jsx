import { addMinutes, formatDateLabel, getWeekdayKey, HUNGARIAN_WEEKDAYS } from "@/lib/booking/timeUtils";

export default function BookingSummary({ businessName, service, date, startTime, customer, primaryTextClass }) {
  const endTime = service && startTime ? addMinutes(startTime, service.durationMinutes) : null;
  const weekday = date ? HUNGARIAN_WEEKDAYS[getWeekdayKey(date)] : null;

  return (
    <aside className="rounded-3xl border border-nude-200 bg-white p-5 shadow-soft lg:sticky lg:top-24">
      <p className={`text-sm font-bold ${primaryTextClass}`}>Összefoglaló</p>
      <h3 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-ink">{businessName}</h3>
      <dl className="mt-5 space-y-4 text-sm">
        <SummaryRow label="Kezelés" value={service ? `${service.name} · ${service.durationMinutes} perc` : "Nincs kiválasztva"} />
        <SummaryRow label="Nap" value={date ? `${weekday}, ${formatDateLabel(date)}` : "Nincs kiválasztva"} />
        <SummaryRow label="Időpont" value={startTime && endTime ? `${startTime} - ${endTime}` : "Nincs kiválasztva"} />
        <SummaryRow label="Vendég" value={customer?.name || "Nincs megadva"} />
      </dl>
    </aside>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div>
      <dt className="font-bold text-nude-500">{label}</dt>
      <dd className="mt-1 font-semibold text-ink">{value}</dd>
    </div>
  );
}
