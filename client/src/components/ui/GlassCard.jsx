import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  tilt = true,
  glowOnHover = true,
  onClick,
  style = {},
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!tilt || !cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [tilt]);

  return (
    <motion.div
      ref={cardRef}
      className={`glass-card ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : {}}
      style={{ 
        ...style,
        transformStyle: 'preserve-3d',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {glowOnHover && (
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,212,170,0.06), transparent 40%)',
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
