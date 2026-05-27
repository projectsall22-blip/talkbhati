import Hero from '../components/home/Hero'
import About from '../components/home/About'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Courses from '../components/home/Courses'
import Stats from '../components/home/Stats'
import Testimonials from '../components/home/Testimonials'
import ContactQuick from '../components/home/ContactQuick'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Courses />
      <WhyChooseUs />
      <Testimonials />
      <ContactQuick />
    </>
  )
}
