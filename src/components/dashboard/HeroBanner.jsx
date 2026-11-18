/** HeroBanner.jsx - Gradient hero with grid overlay. Used by the broker dashboard and the admin overview. */
export default function HeroBanner({ eyebrow, title, name, subtitle, children }) {
  return (
    <section className="hero-grid relative overflow-hidden rounded-hero bg-hero p-8 shadow-hero sm:p-10">
      <p className="text-eyebrow uppercase text-hero-eyebrow">{eyebrow}</p>
      <h1 className="mt-3 text-hero-h1 text-white">
        {title} <em className="text-accent-name">{name}</em>
      </h1>
      {subtitle && <p className="mt-4 max-w-2xl text-hero-sub text-hero-subtitle">{subtitle}</p>}
      {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
    </section>
  );
}
