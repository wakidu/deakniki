import {
  buildTimeSlotView,
  generateTimeSlots,
  getOpeningHoursForDate,
  normalizeBlockedRanges
} from "@/lib/booking/timeUtils";

export default function TimeSlotStep({
  config,
  selectedDate,
  selectedService,
  selectedStartTime,
  availability,
  loading,
  error,
  onSelect,
  onRetry,
  primaryColorClass
}) {
  const openingHours = getOpeningHoursForDate(config, selectedDate);
  const intervalMinutes = config.slotIntervalMinutes || 30;
  const blockedRanges = normalizeBlockedRanges(availability);
  const slots = generateTimeSlots(openingHours, intervalMinutes);
  const slotView = buildTimeSlotView({
    slots,
    selectedStartTime,
    serviceDurationMinutes: selectedService.durationMinutes,
    blockedRanges,
    openingHours,
    intervalMinutes
  });

  if (!openingHours) {
    return <p className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">Erre a napra nincs nyitvatartás.</p>;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-nude-700">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-nude-200 bg-white" />
          Szabad
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-slate-200" />
          Nem elérhető
        </span>
        <span className="inline-flex items-center gap-2">
          <span className={`h-3 w-3 rounded ${primaryColorClass}`} />
          Kijelölve
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="h-12 animate-pulse rounded-xl bg-nude-100" />
          ))}
        </div>
      ) : null}

      {error && !loading ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <p className="font-bold">Nem sikerült lekérni az elérhető időpontokat.</p>
          <button type="button" onClick={onRetry} className="mt-3 font-bold underline underline-offset-4">
            Újrapróbálom
          </button>
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {slotView.map((slot) => {
            const isDisabled = !slot.selectable;
            const selectedClass = slot.selected ? `${primaryColorClass} border-transparent text-white shadow-soft` : "";
            const disabledClass = isDisabled && !slot.selected ? "border-slate-200 bg-slate-100 text-slate-400" : "";
            const freeClass = !isDisabled && !slot.selected ? "border-nude-200 bg-white text-ink hover:border-nude-300 hover:shadow-sm" : "";

            return (
              <button
                key={slot.time}
                type="button"
                onClick={() => onSelect(slot.time)}
                disabled={isDisabled}
                className={`h-12 rounded-xl border text-sm font-bold transition focus-ring disabled:cursor-not-allowed ${selectedClass} ${disabledClass} ${freeClass}`}
                aria-pressed={slot.selected}
                title={slot.blocked ? "Foglalt vagy nem elérhető időpont" : undefined}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
