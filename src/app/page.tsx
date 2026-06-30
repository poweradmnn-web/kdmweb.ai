import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import MobileContactBar from "@/components/sections/MobileContactBar";

export default function Home() {
  return (
    <>
      <Header />
      {/* pb-24 on mobile keeps content clear of the sticky contact bar. */}
      <main className="pb-24 md:pb-0">
        <Hero />
        <Services />
        <ProblemSolution />
        <Process />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
      <MobileContactBar />
    </>
  );
}
