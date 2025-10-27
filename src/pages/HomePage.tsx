import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import Sponsors from '../components/sections/Sponsors';
import MusicSection from '../components/sections/MusicSection';
import AboutSection from '../components/sections/AboutSection';
import TourSection from '../components/sections/TourSection';
import ContactSection from '../components/sections/ContactSection';
import GallerySection from '../components/sections/GallerySection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Sponsors />
      <MusicSection />
      <AboutSection />
      <GallerySection />
      <TourSection />
      <ContactSection />
    </>
  );
};

export default HomePage;