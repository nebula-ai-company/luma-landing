
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface NeuralBackgroundProps {
  className?: string;
  /**
   * Color of the particles. Can be a single string or an array of hex colors.
   */
  color?: string | string[];
  /**
   * The opacity of the trails (0.0 to 1.0).
   */
  trailOpacity?: number;
  /**
   * Number of particles. Default: 600
   */
  particleCount?: number;
  /**
   * Speed multiplier. Default: 1
   */
  speed?: number;
  /**
   * Explicit pause control (e.g. when parent component is off-screen)
   */
  isPaused?: boolean;
}

export default function NeuralBackground({
  className,
  color = "#6366f1",
  trailOpacity = 0.15,
  particleCount = 600,
  speed = 1,
  isPaused = false,
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(true);

  // IntersectionObserver to auto-pause when component scrolled offscreen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let mouse = { x: -1000, y: -1000 };
    
    let width = 0;
    let height = 0;

    const colors = Array.isArray(color) ? color : [color];

    // Detect mobile / constrained devices
    const isMobile = typeof window !== 'undefined' && (
      window.innerWidth < 768 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
    );

    // Adjust effective particle count based on device profile
    const effectiveParticleCount = shouldReduceMotion
      ? Math.min(particleCount, 80)
      : isMobile
      ? Math.min(particleCount, 250)
      : particleCount;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      age: number;
      life: number;
      color: string;

      constructor() {
        this.x = Math.random() * (width || 800);
        this.y = Math.random() * (height || 600);
        this.vx = 0;
        this.vy = 0;
        this.age = Math.random() * 100;
        this.life = Math.random() * 200 + 100;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
        
        this.vx += Math.cos(angle) * 0.2 * speed;
        this.vy += Math.sin(angle) * 0.2 * speed;

        if (!isMobile) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = 250;

          if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            this.vx -= dx * force * 0.0125;
            this.vy -= dy * force * 0.0125;
          }
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;

        this.age++;
        if (this.age > this.life) {
          this.reset();
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        const alpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2;
        context.globalAlpha = Math.max(0, Math.min(1, alpha));
        context.fillRect(this.x, this.y, 2, 2);
      }
    }

    let particles: Particle[] = [];

    const init = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      particles = [];
      for (let i = 0; i < effectiveParticleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Render single frame for static/reduced motion
    const drawStaticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => p.draw(ctx));
    };

    const animate = () => {
      if (isPaused || !isInView || document.hidden) {
        animationFrameId = null;
        return;
      }

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`; 
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();

    if (shouldReduceMotion) {
      drawStaticFrame();
    } else if (!isPaused && isInView && !document.hidden) {
      animate();
    }

    const resizeObserver = new ResizeObserver(() => {
      init();
      if (shouldReduceMotion) {
        drawStaticFrame();
      }
    });
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile && canvas) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else if (!shouldReduceMotion && !isPaused && isInView && !animationFrameId) {
        animate();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [JSON.stringify(color), trailOpacity, particleCount, speed, isPaused, isInView, shouldReduceMotion]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 w-full h-full bg-[#FAFAFA] dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-300", className)}>
      {/* Background Animated Blobs */}
      <motion.div 
        className="absolute top-[-25%] left-[-25%] w-[80%] h-[80%] rounded-full dark:mix-blend-screen mix-blend-multiply filter blur-[120px] opacity-10 dark:opacity-20"
        style={{ backgroundColor: '#DA8FFF' }}
        animate={shouldReduceMotion || isPaused || !isInView ? false : { 
          x: ['0%', '40%', '0%'],
          y: ['0%', '20%', '0%'],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-25%] right-[-25%] w-[80%] h-[80%] rounded-full dark:mix-blend-screen mix-blend-multiply filter blur-[120px] opacity-10 dark:opacity-20"
        style={{ backgroundColor: '#FF6482' }}
        animate={shouldReduceMotion || isPaused || !isInView ? false : { 
          x: ['0%', '-40%', '0%'],
          y: ['0%', '-30%', '0%'],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full dark:mix-blend-screen mix-blend-multiply filter blur-[100px] opacity-10 dark:opacity-20"
        style={{ backgroundColor: '#FFB340' }}
        animate={shouldReduceMotion || isPaused || !isInView ? false : { 
          x: ['-30%', '30%', '-30%'],
          y: ['-20%', '20%', '-20%'],
          scale: [0.9, 1.3, 0.9]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <canvas ref={canvasRef} className="block w-full h-full relative z-10 dark:mix-blend-overlay mix-blend-normal" />
    </div>
  );
}
