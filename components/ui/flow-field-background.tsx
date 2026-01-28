
import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface NeuralBackgroundProps {
  className?: string;
  /**
   * Color of the particles. Can be a single string or an array of hex colors.
   * Defaults to a cyan/indigo mix if not specified.
   */
  color?: string | string[];
  /**
   * The opacity of the trails (0.0 to 1.0).
   * Lower = longer trails. Higher = shorter trails.
   * Default: 0.1
   */
  trailOpacity?: number;
  /**
   * Number of particles. Default: 800
   */
  particleCount?: number;
  /**
   * Speed multiplier. Default: 1
   */
  speed?: number;
}

export default function NeuralBackground({
  className,
  color = "#6366f1", // Default Indigo
  trailOpacity = 0.15,
  particleCount = 600,
  speed = 1,
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 }; // Start off-screen
    
    // Track dimensions
    let width = 0;
    let height = 0;

    const colors = Array.isArray(color) ? color : [color];

    // --- PARTICLE CLASS ---
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      age: number;
      life: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // 1. Flow Field Math
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
        
        // 2. Add force from flow field
        this.vx += Math.cos(angle) * 0.2 * speed;
        this.vy += Math.sin(angle) * 0.2 * speed;

        // 3. Mouse Repulsion
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 250;

        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          // Reduced force further to 0.0125 (very subtle)
          this.vx -= dx * force * 0.0125;
          this.vy -= dy * force * 0.0125;
        }

        // 4. Apply Velocity & Friction
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;

        // 5. Aging
        this.age++;
        if (this.age > this.life) {
          this.reset();
        }

        // 6. Wrap around screen (using current width/height)
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
        context.globalAlpha = alpha;
        // Increased size slightly for better visibility
        context.fillRect(this.x, this.y, 2, 2);
      }
    }

    let particles: Particle[] = [];

    // --- INITIALIZATION ---
    const init = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Handle High-DPI screens (Retina)
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      // CSS handles display size (w-full h-full)
      // We do NOT set style.width/height here to avoid conflicts

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // --- ANIMATION LOOP ---
    const animate = () => {
      // Change to destination-out to fade existing trails to transparent
      // This allows the CSS blobs behind the canvas to show through
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

    // --- EVENT LISTENERS ---
    
    // Use ResizeObserver for accurate sizing
    const resizeObserver = new ResizeObserver(() => {
        init();
    });
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };

    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    }

    // Start
    init();
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [JSON.stringify(color), trailOpacity, particleCount, speed]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 w-full h-full bg-[#0a0a0a] overflow-hidden", className)}>
      {/* Background Animated Blobs - Size Increased, Opacity Lowered to 20% */}
      <motion.div 
        className="absolute top-[-25%] left-[-25%] w-[80%] h-[80%] rounded-full mix-blend-screen filter blur-[120px] opacity-20"
        style={{ backgroundColor: '#DA8FFF' }} // Purple
        animate={{ 
          x: ['0%', '40%', '0%'],
          y: ['0%', '20%', '0%'],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-25%] right-[-25%] w-[80%] h-[80%] rounded-full mix-blend-screen filter blur-[120px] opacity-20"
        style={{ backgroundColor: '#FF6482' }} // Pink
        animate={{ 
          x: ['0%', '-40%', '0%'],
          y: ['0%', '-30%', '0%'],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full mix-blend-screen filter blur-[100px] opacity-20"
        style={{ backgroundColor: '#FFB340' }} // Yellow
        animate={{ 
          x: ['-30%', '30%', '-30%'],
          y: ['-20%', '20%', '-20%'],
          scale: [0.9, 1.3, 0.9]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Reverted mix-blend-mode to overlay as requested */}
      <canvas ref={canvasRef} className="block w-full h-full relative z-10 mix-blend-overlay" />
    </div>
  );
}
