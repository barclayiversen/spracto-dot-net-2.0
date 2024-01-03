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
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // Simulate a loading process
    const timer = setTimeout(() => {
      setStartAnimation(true); // Start fade-out animation
      // After animation duration, hide spinner and show content
      setTimeout(() => {
        setIsBackgroundLoaded(true);
      }, 500); // Match this with your fade-out animation duration
    }, 250); // Adjust this time as needed

    return () => clearTimeout(timer);
  }, []);

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
