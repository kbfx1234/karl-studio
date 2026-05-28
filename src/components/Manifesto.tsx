import { manifesto } from '../data/site'

export function Manifesto() {
  return (
    <section aria-label="Manifesto" className="relative flex h-full flex-col justify-center px-8 lg:px-12">
      <h2 className="text-display mx-auto max-w-6xl text-[clamp(1.6rem,3.6vw,3.4rem)]">
        {manifesto.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      <div className="mx-auto mt-24 grid max-w-6xl gap-10 lg:grid-cols-2">
        {manifesto.columns.map((col) => (
          <div key={col.title} className="max-w-md">
            <h3 className="font-display text-lg font-semibold">{col.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{col.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
