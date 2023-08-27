/* eslint-disable no-unused-vars */
import Navbar from './component/Navbar';
import Hero from './component/Hero';
// import About from './component/About';
import Skills from './component/Skills';
import Project from './component/Project';
import Footer from './component/Footer';



export default function App() {
  return (
    <div className='bg-green-100'>
    <Navbar />
    <Hero />
    {/* <About /> */}
    <Skills />
    <Project />
    <Footer />
    </div>
  )
}