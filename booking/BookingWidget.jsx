"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import BookingSummary from "@/booking/BookingSummary";
import CustomerFormStep from "@/booking/CustomerFormStep";
import DateStep from "@/booking/DateStep";
import ServiceStep from "@/booking/ServiceStep";
import TimeSlotStep from "@/booking/TimeSlotStep";
import { addMinutes, getOpeningHoursForDate, isRangeAvailable, normalizeBlockedRanges } from "@/lib/booking/timeUtils";
import { hasValidationErrors, validateCustomer } from "@/lib/booking/bookingValidation";

const EMPTY_CUSTOMER = {
  name: "",
  email: "",
  phone: "",
  note: ""
};

const STEPS = ["Kezelés", "Nap", "Időpont", "Adatok"];

export default function BookingWidget({ config, fetchAvailability, createBooking }) {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [availability, setAvailability] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
  const [availabilityRequestKey, setAvailabilityRequestKey] = useState(0);
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successPayload, setSuccessPayload] = useState(null);

  const primaryColorClass = config.primaryColorClass || "bg-ink";
  const primaryHoverClass = config.primaryHoverClass || "hover:bg-nude-700";
  const primaryTextClass = config.primaryTextClass || "text-ink";
  const primaryBorderClass = config.primaryBorderClass || "border-ink";
  const primaryRingClass = config.primaryRingClass || "focus-visible:outline-ink";

  const blockedRanges = useMemo(() => normalizeBlockedRanges(availability), [availability]);

  const reloadAvailability = useCallback(() => {
    setAvailabilityRequestKey((value) => value + 1);
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      setAvailability(null);
      return;
    }

    let ignore = false;

    async function loadAvailability() {
      setAvailabilityLoading(true);
      setAvailabilityError("");

      try {
        const data = await fetchAvailability(selectedDate);
        if (!ignore) {
          setAvailability(data || { bookedSlots: [], unavailableSlots: [] });
        }
      } catch (error) {
        if (!ignore) {
          setAvailability(null);
          setAvailabilityError(error?.message || "Availability request failed");
        }
      } finally {
        if (!ignore) {
          setAvailabilityLoading(false);
        }
      }
    }

    loadAvailability();

    return () => {
      ignore = true;
    };
  }, [fetchAvailability, selectedDate, availabilityRequestKey]);

  useEffect(() => {
    setSelectedStartTime("");
  }, [selectedService?.id, selectedDate]);

  const canContinue = [
    Boolean(selectedService),
    Boolean(selectedDate),
    Boolean(selectedStartTime) && !availabilityLoading && !availabilityError,
    true
  ];

  function handleNext() {
    if (step === 3) {
      handleSubmit();
      return;
    }

    if (canContinue[step]) {
      setStep((current) => Math.min(current + 1, STEPS.length - 1));
    }
  }

  function handleBack() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function handleCustomerChange(field, value) {
    setCustomer((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: "" }));
  }

  async function handleSubmit() {
    const errors = validateCustomer(customer);
    setFormErrors(errors);
    setSubmitError("");

    if (hasValidationErrors(errors) || !selectedService || !selectedDate || !selectedStartTime) {
      return;
    }

    const currentRangeStillAvailable = isRangeAvailable(
      selectedStartTime,
      selectedService.durationMinutes,
      blockedRanges,
      getOpeningHoursForDate(config, selectedDate)
    );

    if (!currentRangeStillAvailable) {
      setSubmitError("A kiválasztott időpont időközben nem elérhető. Válassz másik kezdési időt.");
      setSelectedStartTime("");
      reloadAvailability();
      setStep(2);
      return;
    }

    setSubmitting(true);

    try {
      const latestAvailability = await fetchAvailability(selectedDate);
      const latestBlockedRanges = normalizeBlockedRanges(latestAvailability);
      const latestRangeStillAvailable = isRangeAvailable(
        selectedStartTime,
        selectedService.durationMinutes,
        latestBlockedRanges,
        getOpeningHoursForDate(config, selectedDate)
      );

      setAvailability(latestAvailability || { bookedSlots: [], unavailableSlots: [] });

      if (!latestRangeStillAvailable) {
        setSubmitError("A kiválasztott időpont időközben nem elérhető. Válassz másik kezdési időt.");
        setSelectedStartTime("");
        setStep(2);
        return;
      }

      const payload = {
        businessName: config.businessName,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        date: selectedDate,
        startTime: selectedStartTime,
        endTime: addMinutes(selectedStartTime, selectedService.durationMinutes),
        customer: {
          name: customer.name.trim(),
          email: customer.email.trim(),
          phone: customer.phone.trim(),
          note: customer.note.trim()
        }
      };

      const result = await createBooking(payload);
      if (result?.success === false) {
        throw new Error(result?.message || "Booking request failed");
      }

      setSuccessPayload(payload);
    } catch (error) {
      setSubmitError(error?.message || "Nem sikerült elküldeni a foglalást.");
    } finally {
      setSubmitting(false);
    }
  }

  if (successPayload) {
    return (
      <section className="rounded-[2rem] border border-nude-200 bg-white p-6 shadow-petal sm:p-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className={`text-sm font-bold ${primaryTextClass}`}>Sikeres foglalás</p>
          <h2 className="mt-3 font-[var(--font-display)] text-4xl font-semibold text-ink">Köszönjük, rögzítettük az időpontot.</h2>
          <p className="mt-4 text-sm leading-7 text-nude-700">
            {successPayload.date} · {successPayload.startTime} - {successPayload.endTime} · {successPayload.serviceName}
          </p>
          <button
            type="button"
            onClick={() => {
              setStep(0);
              setSelectedService(null);
              setSelectedDate("");
              setSelectedStartTime("");
              setCustomer(EMPTY_CUSTOMER);
              setSuccessPayload(null);
            }}
            className={`mt-8 rounded-full px-6 py-3 text-sm font-bold text-white transition focus-ring ${primaryColorClass} ${primaryHoverClass} ${primaryRingClass}`}
          >
            Új foglalás
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-nude-200 bg-white/86 p-4 shadow-petal backdrop-blur sm:p-6 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex flex-wrap gap-2">
            {STEPS.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => index <= step && setStep(index)}
                disabled={index > step}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition focus-ring disabled:cursor-not-allowed disabled:opacity-45 ${
                  index === step ? `${primaryColorClass} border-transparent text-white` : "border-nude-200 bg-white text-nude-700"
                }`}
              >
                {index + 1}. {label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <StepHeader step={step} primaryTextClass={primaryTextClass} />

            <div className="mt-6">
              {step === 0 ? (
                <ServiceStep
                  services={config.services || []}
                  selectedService={selectedService}
                  onSelect={setSelectedService}
                  primaryTextClass={primaryTextClass}
                  primaryBorderClass={primaryBorderClass}
                />
              ) : null}

              {step === 1 ? (
                <DateStep
                  config={config}
                  selectedDate={selectedDate}
                  onSelect={setSelectedDate}
                  primaryColorClass={primaryColorClass}
                  primaryTextClass={primaryTextClass}
                />
              ) : null}

              {step === 2 ? (
                <TimeSlotStep
                  config={config}
                  selectedDate={selectedDate}
                  selectedService={selectedService}
                  selectedStartTime={selectedStartTime}
                  availability={availability}
                  loading={availabilityLoading}
                  error={availabilityError}
                  onSelect={setSelectedStartTime}
                  onRetry={reloadAvailability}
                  primaryColorClass={primaryColorClass}
                />
              ) : null}

              {step === 3 ? (
                <CustomerFormStep customer={customer} errors={formErrors} onChange={handleCustomerChange} />
              ) : null}
            </div>
          </div>

          {submitError ? <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{submitError}</p> : null}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0 || submitting}
              className="rounded-full border border-nude-200 bg-white px-6 py-3 text-sm font-bold text-nude-700 transition hover:border-nude-300 focus-ring disabled:cursor-not-allowed disabled:opacity-45"
            >
              Vissza
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canContinue[step] || submitting}
              className={`rounded-full px-6 py-3 text-sm font-bold text-white transition focus-ring disabled:cursor-not-allowed disabled:opacity-45 ${primaryColorClass} ${primaryHoverClass} ${primaryRingClass}`}
            >
              {step === 3 ? (submitting ? "Küldés..." : "Foglalás elküldése") : "Tovább"}
            </button>
          </div>
        </div>

        <BookingSummary
          businessName={config.businessName}
          service={selectedService}
          date={selectedDate}
          startTime={selectedStartTime}
          customer={customer}
          primaryTextClass={primaryTextClass}
        />
      </div>
    </section>
  );
}

function StepHeader({ step, primaryTextClass }) {
  const titles = [
    "Válassz kezelést",
    "Válassz napot",
    "Válassz kezdési időpontot",
    "Add meg az adataidat"
  ];

  return (
    <div>
      <p className={`text-sm font-bold ${primaryTextClass}`}>Lépés {step + 1} / 4</p>
      <h2 className="mt-2 font-[var(--font-display)] text-4xl font-semibold text-ink">{titles[step]}</h2>
    </div>
  );
}
