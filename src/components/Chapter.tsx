interface ChapterProps {
  index: string
  total: string
  object: string
  period: string
  title: string
  titleCN: string
  subtitle: string
  tagline: string
  body: string
  variant?: 'cinematic' | 'fallback'
}

export function Chapter(props: ChapterProps) {
  const isFallback = props.variant === 'fallback'

  return (
    <section
      aria-label={`Chapter ${props.index} of ${props.total}: ${props.title}`}
      className={
        isFallback
          ? 'relative flex min-h-[100svh] flex-col justify-between px-6 pb-20 pt-28 sm:px-8'
          : 'relative flex h-full flex-col justify-between px-8 pb-24 pt-32 lg:px-12 lg:pb-28'
      }
    >
      {/* Top meta row */}
      <div
        className={
          isFallback
            ? 'flex items-start justify-between gap-6 font-mono text-[10px] uppercase tracking-widest text-fg-muted'
            : 'flex items-start justify-between font-mono text-[11px] uppercase tracking-widest text-fg-muted'
        }
      >
        <div>
          <p className="text-3xl font-light text-fg-dim">{props.index}</p>
          <p className="mt-2 text-fg-dim">
            CHAPTER · {props.index} / {props.total}
          </p>
          <p className="text-fg-dim">{props.object}</p>
        </div>
        <div className="text-right">
          <p className="text-fg-dim">{props.period}</p>
        </div>
      </div>

      {/* Massive title — vertically centered in the band */}
      <div className="relative my-auto">
        <h2
          className={
            isFallback
              ? 'text-display max-w-full break-words text-[clamp(2.75rem,13vw,4.5rem)] uppercase [text-wrap:balance]'
              : 'text-display text-[clamp(4rem,12vw,11rem)] uppercase'
          }
        >
          {props.title}
        </h2>
        <p className="mt-4 font-cn text-sm tracking-wide text-fg-muted">
          {props.titleCN} · {props.subtitle}
        </p>
      </div>

      {/* Tagline + body bottom */}
      <div className={isFallback ? 'max-w-[36rem]' : 'max-w-2xl'}>
        <p className="font-display text-xl text-fg lg:text-2xl">{props.tagline}</p>
        <p className="mt-5 text-sm leading-relaxed text-fg-muted">{props.body}</p>
      </div>
    </section>
  )
}
