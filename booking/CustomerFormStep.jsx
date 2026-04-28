const fieldClass =
  "mt-2 w-full rounded-2xl border border-nude-200 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition placeholder:text-nude-300 focus:border-nude-300";

export default function CustomerFormStep({ customer, errors, onChange }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <label className="text-sm font-bold text-ink">
        Név *
        <input
          className={fieldClass}
          value={customer.name}
          onChange={(event) => onChange("name", event.target.value)}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "booking-name-error" : undefined}
        />
        {errors.name ? <span id="booking-name-error" className="mt-2 block text-xs text-red-600">{errors.name}</span> : null}
      </label>

      <label className="text-sm font-bold text-ink">
        Email *
        <input
          className={fieldClass}
          type="email"
          value={customer.email}
          onChange={(event) => onChange("email", event.target.value)}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "booking-email-error" : undefined}
        />
        {errors.email ? <span id="booking-email-error" className="mt-2 block text-xs text-red-600">{errors.email}</span> : null}
      </label>

      <label className="text-sm font-bold text-ink">
        Telefonszám *
        <input
          className={fieldClass}
          type="tel"
          value={customer.phone}
          onChange={(event) => onChange("phone", event.target.value)}
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "booking-phone-error" : undefined}
        />
        {errors.phone ? <span id="booking-phone-error" className="mt-2 block text-xs text-red-600">{errors.phone}</span> : null}
      </label>

      <label className="text-sm font-bold text-ink md:row-span-2">
        Megjegyzés
        <textarea
          className={`${fieldClass} min-h-32 resize-y`}
          value={customer.note}
          onChange={(event) => onChange("note", event.target.value)}
          rows={5}
        />
      </label>
    </div>
  );
}
