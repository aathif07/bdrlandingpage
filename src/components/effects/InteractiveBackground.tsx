
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Particle properties
    const particlesArray: Particle[] = [];
    const numberOfParticles = 75; // Increased number of particles
    
    // Mouse position tracking
    let mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 200, // Increased interaction radius
    };
    
    // Track mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    
    // Reset mouse position when mouse leaves
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      isDark: boolean;
      speedX: number;
      speedY: number;
      
      constructor(x: number, y: number, isDark: boolean) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.baseX = x;
        this.baseY = y;
        this.density = Math.random() * 30 + 1;
        this.isDark = isDark;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      
      draw() {
        if (!ctx) return;
        
        // Set color based on theme
        if (this.isDark) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        } else {
          ctx.fillStyle = 'rgba(10, 132, 255, 0.6)';
        }
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      
      update() {
        // Add gentle movement even when mouse is not present
        if (!mouse.x || !mouse.y) {
          this.x += this.speedX;
          this.y += this.speedY;
          
          // Boundary check
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
          
          // Slow return to original position
          const dx = this.baseX - this.x;
          const dy = this.baseY - this.y;
          
          if (Math.abs(dx) > 50 || Math.abs(dy) > 50) {
            this.x += dx * 0.01;
            this.y += dy * 0.01;
          }
        } else {
          // Enhanced mouse interaction
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          
          // Dynamic force calculation based on distance
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;
            
            this.x -= directionX;
            this.y -= directionY;
          } else {
            // Gentle floating when outside mouse influence
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Boundary check
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            
            // Return to original position
            if (Math.abs(this.x - this.baseX) > 100 || Math.abs(this.y - this.baseY) > 100) {
              this.x += (this.baseX - this.x) * 0.02;
              this.y += (this.baseY - this.y) * 0.02;
            }
          }
        }
      }
    }
    
    // Initialize particles
    const init = (isDark: boolean) => {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y, isDark));
      }
    };
    
    // Animate particles
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      // Connect nearby particles with lines
      connect();
    };
    
    // Connect nearby particles with lines
    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) { // Increased connection distance
            // Set line color based on theme
            if (theme === 'dark') {
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - distance/400})`; // Enhanced visibility
            } else {
              ctx.strokeStyle = `rgba(10, 132, 255, ${0.3 - distance/400})`;
            }
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Initialize and start animation
    init(theme === 'dark');
    animate();
    
    // Update particles when theme changes - this effect will re-run when theme changes
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none"
    />
  );
};

export default InteractiveBackground;
