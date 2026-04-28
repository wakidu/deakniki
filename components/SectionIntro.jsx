export default function SectionIntro({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <p className="text-xs font-bold uppercase tracking-[.18em] text-clay">{eyebrow}</p> : null}
      <h1 className="mt-3 display-title text-5xl font-semibold text-ink sm:text-6xl">{title}</h1>
      {text ? <p className="mt-4 text-base leading-7 text-nude-700 sm:text-lg">{text}</p> : null}
    </div>
  );
}
