"use client";
import { useState, useEffect } from 'react';
import styles from '../page.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const MarketCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Welcome to PipPioneers",
      description: "Start your trading journey with us and explore new opportunities.",
      color: "linear-gradient(135deg, #4f46e5, #7c3aed)"
    },
    {
      title: "Market Analysis",
      description: "Get real-time insights and analytics for informed trading decisions.",
      color: "linear-gradient(135deg, #0ea5e9, #3b82f6)"
    },
    {
      title: "Trade with Confidence",
      description: "Secure platform with advanced risk management tools.",
      color: "linear-gradient(135deg, #10b981, #059669)"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className={styles.carouselContainer}>
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          className={styles.carouselSlide}
          style={{ background: slides[currentSlide].color }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.carouselContent}>
            <h2 className={styles.carouselHeading}>{slides[currentSlide].title}</h2>
            <p className={styles.carouselParagraph}>{slides[currentSlide].description}</p>
            <button className={styles.carouselButton}>Learn More</button>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className={styles.carouselDots}>
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`${styles.carouselDot} ${currentSlide === index ? styles.activeDot : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketCarousel;
