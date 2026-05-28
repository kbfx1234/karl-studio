import { site } from '../data/site'

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 md:mix-blend-difference">
      <div className="flex items-center justify-between gap-3 px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        <a
          href="#top"
          className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest sm:text-xs"
        >
          <span className="text-base font-cn">{site.brand.nameCN}</span>
          <span className="hidden text-fg-muted sm:inline">/ {site.brand.studio}</span>
        </a>

        <nav className="flex items-center gap-4 sm:gap-8">
          <ul className="hidden gap-7 md:flex">
            {site.nav.map((item) => (
              <li key={item.label}>
                <a className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.cta.href}
            className="inline-flex items-center gap-2 bg-fg px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-bg transition-all hover:bg-fg-muted sm:gap-3 sm:px-5 sm:py-2.5 sm:text-xs"
          >
            <span className="hidden sm:inline">{site.cta.label}</span>
            <span className="sm:hidden">ENTER</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
