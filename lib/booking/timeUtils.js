export const HUNGARIAN_WEEKDAYS = {
  sunday: "Vasárnap",
  monday: "Hétfő",
  tuesday: "Kedd",
  wednesday: "Szerda",
  thursday: "Csütörtök",
  friday: "Péntek",
  saturday: "Szombat"
};

const WEEKDAY_KEYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export function getWeekdayKey(dateValue) {
  return WEEKDAY_KEYS[new Date(`${dateValue}T12:00:00`).getDay()];
}

export function getOpeningHoursForDate(config, dateValue) {
  if (!dateValue) {
    return null;
  }

  return config.openingHours?.[getWeekdayKey(dateValue)] || null;
}

export function getUpcomingDays(count = 14) {
  const today = new Date();

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    const iso = toDateInputValue(date);
    const weekdayKey = WEEKDAY_KEYS[date.getDay()];

    return {
      date: iso,
      weekdayKey,
      weekdayLabel: HUNGARIAN_WEEKDAYS[weekdayKey],
      shortLabel: new Intl.DateTimeFormat("hu-HU", { month: "short", day: "numeric" }).format(date),
      isToday: index === 0
    };
  });
}

export function formatDateLabel(dateValue) {
  return new Intl.DateTimeFormat("hu-HU", { month: "long", day: "numeric" }).format(new Date(`${dateValue}T12:00:00`));
}

export function generateTimeSlots(openingHours, intervalMinutes) {
  if (!openingHours) {
    return [];
  }

  const slots = [];
  let current = toMinutes(openingHours.start);
  const end = toMinutes(openingHours.end);

  while (current < end) {
    slots.push(toTime(current));
    current += intervalMinutes;
  }

  return slots;
}

export function buildTimeSlotView({ slots, selectedStartTime, serviceDurationMinutes, blockedRanges, openingHours }) {
  return slots.map((time) => {
    const selectable = isRangeAvailable(time, serviceDurationMinutes, blockedRanges, openingHours);

    return {
      time,
      selectable,
      selected: selectedStartTime === time,
      blocked: !selectable
    };
  });
}

export function normalizeBlockedRanges(availability) {
  const bookedSlots = availability?.bookedSlots || [];
  const unavailableSlots = availability?.unavailableSlots || [];

  return [...bookedSlots, ...unavailableSlots].map((slot) => ({
    start: slot.start,
    end: slot.end
  }));
}

export function isRangeAvailable(startTime, durationMinutes, blockedRanges, openingHours) {
  if (!startTime || !openingHours) {
    return false;
  }

  const start = toMinutes(startTime);
  const end = start + durationMinutes;

  if (start < toMinutes(openingHours.start) || end > toMinutes(openingHours.end)) {
    return false;
  }

  return !blockedRanges.some((range) => {
    const blockedStart = toMinutes(range.start);
    const blockedEnd = toMinutes(range.end);
    return start < blockedEnd && end > blockedStart;
  });
}

export function addMinutes(time, minutes) {
  return toTime(toMinutes(time) + minutes);
}

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function toTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
