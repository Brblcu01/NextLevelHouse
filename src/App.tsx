import { useState } from "react";
import { Audience } from "./components/Audience";
import { Benefits } from "./components/Benefits";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { LeadForm } from "./components/LeadForm";
import { Navigation } from "./components/Navigation";
import { Pricing } from "./components/Pricing";
import { Process } from "./components/Process";
import { Transformation } from "./components/Transformation";
import type { PackageId } from "./data/siteData";

function App() {
  const [selectedPackage, setSelectedPackage] = useState<PackageId>("combo");

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Transformation />
        <Process />
        <Benefits />
        <Audience />
        <Pricing selectedPackage={selectedPackage} onSelectPackage={setSelectedPackage} />
        <Faq />
        <LeadForm selectedPackage={selectedPackage} />
      </main>
      <Footer />
    </>
  );
}

export default App;
