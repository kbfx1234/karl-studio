import { manifesto } from '../data/site'

type ManifestoProps = {
  id?: string
  variant?: 'cinematic' | 'fallback'
}

export function Manifesto({ id, variant = 'cinematic' }: ManifestoProps) {
  const isFallback = variant === 'fallback'

  return (
    <section
      id={id}
      aria-label="Manifesto"
      className={
        isFallback
          ? 'relative flex min-h-[100svh] flex-col justify-center px-6 py-24 sm:px-8'
          : 'relative flex h-full flex-col justify-center px-8 lg:px-12'
      }
    >
      <h2
        className={
          isFallback
            ? 'text-display mx-auto max-w-[36rem] break-words text-[clamp(1.75rem,8vw,3rem)] [text-wrap:balance]'
            : 'text-display mx-auto max-w-6xl text-[clamp(1.6rem,3.6vw,3.4rem)]'
        }
      >
        {manifesto.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      <div
        className={
          isFallback
            ? 'mx-auto mt-16 grid max-w-[36rem] gap-10'
            : 'mx-auto mt-24 grid max-w-6xl gap-10 lg:grid-cols-2'
        }
      >
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
