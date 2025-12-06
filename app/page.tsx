import Hero from "@/components/Hero";
import About from "@/components/About";
import Interior from "@/components/Interior";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import AfconWatch from "@/components/AfconWatch";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Interior />
      <Menu />
      <Gallery />
      <AfconWatch />
      <Contact />
      <Footer />
    </main>
  );
}
