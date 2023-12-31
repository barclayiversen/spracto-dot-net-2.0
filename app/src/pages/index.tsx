import Image from "next/image";

import Header from "@/components/header";
import Footer from "@/components/footer";
import BackgroundVideoSection from "@/components/backgroundVideoSection";
import AboutSection from "@/components/about";
import Releases from "@/components/releases";
import PhotoCarousel from "@/components/photoCarousel";
import { Link } from "react-scroll"; // Assuming you're using react-scroll
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <main>
      <Header />
      <BackgroundVideoSection />
      <AboutSection />
      <Releases />
      <PhotoCarousel />
      <Footer />
    </main>
  );
}
