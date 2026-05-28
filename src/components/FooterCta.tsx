import { useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap'
import { footerCta, site } from '../data/site'

export function FooterCta() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const titleEls = gsap.utils.toArray<HTMLElement>('[data-footer-title]')
      const splits = titleEls.map((el) => new SplitText(el, { type: 'chars,words' }))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
      splits.forEach((s, i) => {
        tl.from(
          s.chars,
          {
            opacity: 0,
            y: 30,
            filter: 'blur(10px)',
            stagger: 0.025,
            duration: 0.7,
            ease: 'power3.out',
          },
          i * 0.1
        )
      })
      tl.from('[data-footer-cta]', { opacity: 0, x: -16, duration: 0.5, ease: 'power2.out' }, '<+0.1')
        .from(
          '[data-footer-bottom] > *',
          { opacity: 0, y: 8, stagger: 0.06, duration: 0.4, ease: 'power2.out' },
          '<+0.1'
        )

      return () => {
        splits.forEach((s) => s.revert())
        ScrollTrigger.getAll().forEach((s) => {
          if (s.trigger === root.current) s.kill()
        })
      }
    },
    { scope: root }
  )

  function scrollToTop(e: React.MouseEvent) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" ref={root} className="relative bg-bg px-8 pb-12 pt-40 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95]">
            <span data-footer-title className="block">
              Ready to
            </span>
            <span data-footer-title className="block">
              look again?
            </span>
          </h2>
          <a
            data-footer-cta
            href={footerCta.cta.href}
            onClick={scrollToTop}
            className="cta-button-light self-start lg:self-end"
          >
            {footerCta.cta.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div
          data-footer-bottom
          className="mt-24 grid gap-6 border-t border-fg/10 pt-10 text-meta md:grid-cols-3"
        >
          <p className="md:col-span-2">{footerCta.signature}</p>
          <div className="flex gap-6 md:justify-end">
            <a href={site.social.github} target="_blank" rel="noreferrer" className="nav-link">
              GITHUB
            </a>
            <a href={site.social.email} className="nav-link">
              EMAIL
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
