import Cta from "../components/Cta";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/hero";
import HowItWorks from "../components/HowItWorks";
import NavBar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="p-6 pt-10 md:p-16">
        <Hero />
        <Features />
        <HowItWorks />
        <Cta />
      </div>
      <Footer />
    </div>
  );
}
