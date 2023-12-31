import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/components/loading";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BackgroundVideoSection from "@/components/backgroundVideoSection";
import AboutSection from "@/components/about";
import Releases from "@/components/releases";
import PhotoCarousel from "@/components/photoCarousel";

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
