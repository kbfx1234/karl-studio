/**
 * Fixed full-viewport background image.
 * Sits below all content (z-0); content sits above (z-10).
 * In P4 this element gets dolly-zoomed via Stage's ScrollTrigger.
 *
 * Uses responsive srcset so a 2K screen doesn't download the 5000w image.
 */
export function StageBackground() {
  return (
    <div
      className="stage-bg pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      data-stage-bg
    >
      <img
        src="/images/main-stage-1920w.webp"
        srcSet="
          /images/main-stage-1024w.webp 1024w,
          /images/main-stage-1920w.webp 1920w,
          /images/main-stage-3000w.webp 3000w,
          /images/main-stage-5000w.webp 5000w
        "
        sizes="100vw"
        alt=""
        loading="eager"
        fetchPriority="high"
        className="h-full w-full object-cover will-change-transform"
        style={{ transformOrigin: '55% 55%' }}
      />
      {/* darken */}
      <div className="absolute inset-0 bg-black/40" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.65)_100%)]" />
    </div>
  )
}
