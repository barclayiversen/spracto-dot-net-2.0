import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/components/loading";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BackgroundVideoSection from "@/components/backgroundVideoSection";
import AboutSection from "@/components/about";
import Releases from "@/components/releases";
import PhotoCarousel from "@/components/photoCarousel";

export default function Home() {
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  useEffect(() => {
    // Set a delay for the loading state
    const timer = setTimeout(() => {
      setIsBackgroundLoaded(true);
    }, 200); // Adjust this time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!isBackgroundLoaded && <LoadingSpinner />}
      <main style={{ display: isBackgroundLoaded ? "block" : "none" }}>
        <Header />
        <BackgroundVideoSection />
        <AboutSection />
        <Releases />
        <PhotoCarousel />
        <Footer />
      </main>
    </>
  );
}
