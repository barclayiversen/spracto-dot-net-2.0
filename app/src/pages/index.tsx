import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/components/loading";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BackgroundVideoSection from "@/components/backgroundVideoSection";
import AboutSection from "@/components/about";
import Releases from "@/components/releases";
import PhotoCarousel from "@/components/photoCarousel";
import { useLoadStatus } from "@/context/loadStatusContext";

export default function Home() {
  const { loadStatus } = useLoadStatus();
  const allComponentsLoaded = Object.values(loadStatus).every(
    (status) => status
  );
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (allComponentsLoaded) {
      setStartAnimation(true);
      setTimeout(() => setIsBackgroundLoaded(true), 30);
    }
  }, [allComponentsLoaded]);

  return (
    <>
      {!isBackgroundLoaded && (
        <div
          className={
            startAnimation ? "opacity-0 transition-opacity duration-500" : ""
          }
        >
          <LoadingSpinner />
        </div>
      )}
      <main
        className={`${
          isBackgroundLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
        style={{ display: isBackgroundLoaded ? "block" : "none" }}
      >
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
