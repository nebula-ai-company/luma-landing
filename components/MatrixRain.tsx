
import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  className?: string;
  opacity?: number;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ className = "", opacity = 0.2 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // STRICT Brand colors only: Purple, Pink, Yellow
    // Removed Blue and Emerald/Green
    const colors = ['#DA8FFF', '#FF6482', '#FFB340']; 
    
    // Characters: Mix of numbers, latin, and code symbols for "Code Rain" look
    const chars = "010101<>{}[]/\\|*&^%$#@!ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    let animationId: number;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    
    const fontSize = 14;

    const init = () => {
      // Use parent dimensions if available, otherwise window
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;
      
      columns = Math.ceil(width / fontSize);
      drops = new Array(columns).fill(1);
    };

    const draw = () => {
      // Trail effect: semi-transparent dark background
      // Matches the app's dark theme (#0a0a0a)
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'; 
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Select random char
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Select color based on column index
        const color = colors[i % colors.length];
        
        // Randomly make some characters white/bright for "glint" effect
        const isHead = Math.random() > 0.98;
        
        ctx.fillStyle = isHead ? '#FFFFFF' : color;
        
        // Draw text
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly or if off screen
        // Randomness ensures drops don't fall in a straight line forever (matrix effect)
        if (drops[i] * fontSize > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        
        // Move drop down
        drops[i]++;
      }
    };

    init();
    
    // FPS Control
    const fps = 24; // Cinematic 24fps
    const interval = 1000 / fps;
    let then = Date.now();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const now = Date.now();
      const delta = now - then;
      
      if (delta > interval) {
        then = now - (delta % interval);
        draw();
      }
    };

    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none mix-blend-screen ${className}`}
      style={{ opacity }}
    />
  );
};

export default MatrixRain;
