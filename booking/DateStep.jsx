import { getUpcomingDays } from "@/lib/booking/timeUtils";

export default function DateStep({ config, selectedDate, onSelect, primaryColorClass, primaryTextClass }) {
  const days = getUpcomingDays(config.daysAhead || 14);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
      {days.map((day) => {
        const openingHours = config.openingHours?.[day.weekdayKey];
        const isClosed = !openingHours;
        const isSelected = selectedDate === day.date;

        return (
          <button
            key={day.date}
            type="button"
            onClick={() => onSelect(day.date)}
            disabled={isClosed}
            className={`min-h-28 rounded-2xl border p-4 text-left transition focus-ring disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 ${
              isSelected
                ? `${primaryColorClass} border-transparent text-white shadow-soft`
                : "border-nude-200 bg-white text-ink hover:border-nude-300 hover:shadow-sm"
            }`}
            aria-pressed={isSelected}
          >
            <span className="block text-sm font-bold">{day.weekdayLabel}</span>
            <span className="mt-2 block text-lg font-bold">{day.shortLabel}</span>
            {day.isToday ? (
              <span className={`mt-2 inline-block text-xs font-bold ${isSelected ? "text-white" : primaryTextClass}`}>
                Ma
              </span>
            ) : null}
            {isClosed ? <span className="mt-2 block text-xs font-semibold">Zárva</span> : null}
          </button>
        );
      })}
    </div>
  );
}
