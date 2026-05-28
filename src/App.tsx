import { SmoothScroll } from './lib/lenis'
import { Navbar } from './components/Navbar'
import { StageBackground } from './components/StageBackground'
import { IdCard } from './components/IdCard'
import { Stage } from './components/Stage'
import { FeaturedWork } from './components/FeaturedWork'
import { FooterCta } from './components/FooterCta'

export default function App() {
  return (
    <SmoothScroll>
      <StageBackground />
      <IdCard />
      <div className="relative z-10">
        <Navbar />
        <Stage />
        <FeaturedWork />
        <FooterCta />
      </div>
    </SmoothScroll>
  )
}
