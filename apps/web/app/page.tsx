import BookmarksBroken from "../components/BookmarksBroken";
import FAQSection from "../components/FAQ";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/hero";
import HowItWorks from "../components/HowItWorks";
import NavBar from "../components/Navbar";

export default function Home() {
  return (
    <div className="">
      <NavBar />
      <Hero />
      <HowItWorks />
      <BookmarksBroken/>
      <Features/>
      <FAQSection />
    </div>
  );
}
