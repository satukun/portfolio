"use client";
import { useEffect, useRef, useState } from 'react';

interface TechSkill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'design';
}

const techSkills: TechSkill[] = [
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'Next.js', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 88, category: 'frontend' },
  { name: 'Tailwind CSS', level: 85, category: 'frontend' },
  { name: 'Node.js', level: 80, category: 'backend' },
  { name: 'GraphQL', level: 75, category: 'backend' },
  { name: 'Vite', level: 82, category: 'tools' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Figma', level: 70, category: 'design' },
  { name: 'Three.js', level: 65, category: 'frontend' }
];

export default function TechStackChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Intersection Observer for triggering animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isVisible]);

  // Animation progress
  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const duration = 2000; // 2 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      setAnimationProgress(easeOutCubic(progress));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, 400);
      canvas.width = size * window.devicePixelRatio;
      canvas.height = size * window.devicePixelRatio;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawChart();
    };

    const drawChart = () => {
      const centerX = canvas.width / (2 * window.devicePixelRatio);
      const centerY = canvas.height / (2 * window.devicePixelRatio);
      const radius = Math.min(centerX, centerY) - 60;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      // Animated background circles with gradient
      const levels = [20, 40, 60, 80, 100];
      levels.forEach((level, index) => {
        const animatedRadius = (radius * level * animationProgress) / 100;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, animatedRadius, 0, 2 * Math.PI);
        
        // Use site's color scheme
        if (index === levels.length - 1) {
          ctx.strokeStyle = 'color-mix(in oklab, #2563eb 30%, transparent)';
          ctx.lineWidth = 2;
        } else {
          ctx.strokeStyle = 'color-mix(in oklab, #64748b 15%, transparent)';
          ctx.lineWidth = 1;
        }
        ctx.stroke();
        
        // Add subtle glow effect for outer circle
        if (index === levels.length - 1 && animationProgress > 0.8) {
          ctx.shadowColor = '#2563eb';
          ctx.shadowBlur = 10;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      // Draw skill polygons by category with animation
      const categories = ['frontend', 'backend', 'tools', 'design'] as const;
      const categoryColors = {
        frontend: '#2563eb', // Primary blue from site
        backend: '#10b981',  // Accent green from site
        tools: '#f59e0b',    // Amber
        design: '#8b5cf6'    // Accent purple from site
      };

      categories.forEach((category, categoryIndex) => {
        const categorySkills = techSkills.filter(skill => skill.category === category);
        if (categorySkills.length === 0) return;

        const angleStep = (2 * Math.PI) / categorySkills.length;
        
        // Stagger animation by category
        const categoryDelay = categoryIndex * 0.2;
        const categoryProgress = Math.max(0, Math.min(1, (animationProgress - categoryDelay) / 0.8));
        
        if (categoryProgress > 0) {
          // Draw skill polygon with animation
          ctx.beginPath();
          categorySkills.forEach((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const targetRadius = (radius * skill.level) / 100;
            const animatedRadius = targetRadius * categoryProgress;
            const x = centerX + animatedRadius * Math.cos(angle);
            const y = centerY + animatedRadius * Math.sin(angle);
            
            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });
          ctx.closePath();
          
          // Fill with category color and gradient effect
          const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
          gradient.addColorStop(0, categoryColors[category] + '25');
          gradient.addColorStop(1, categoryColors[category] + '05');
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Stroke with glow effect
          ctx.strokeStyle = categoryColors[category];
          ctx.lineWidth = 2;
          ctx.shadowColor = categoryColors[category];
          ctx.shadowBlur = 5;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Draw skill points and labels with animation
        categorySkills.forEach((skill, index) => {
          const skillDelay = categoryDelay + (index * 0.1);
          const skillProgress = Math.max(0, Math.min(1, (animationProgress - skillDelay) / 0.6));
          
          if (skillProgress > 0) {
            const angle = index * angleStep - Math.PI / 2;
            const targetRadius = (radius * skill.level) / 100;
            const animatedRadius = targetRadius * categoryProgress;
            const x = centerX + animatedRadius * Math.cos(angle);
            const y = centerY + animatedRadius * Math.sin(angle);
            
            // Draw skill point with pulse effect
            const pointSize = 4 * skillProgress;
            ctx.beginPath();
            ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
            ctx.fillStyle = categoryColors[category];
            ctx.shadowColor = categoryColors[category];
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Draw skill label with fade-in
            const labelRadius = radius + 25;
            const labelX = centerX + labelRadius * Math.cos(angle);
            const labelY = centerY + labelRadius * Math.sin(angle);
            
            const labelAlpha = skillProgress;
            ctx.fillStyle = `rgba(55, 65, 81, ${labelAlpha})`;
            ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
            ctx.textAlign = labelX > centerX ? 'left' : 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(skill.name, labelX, labelY);
            
            // Draw level percentage with gradient
            ctx.font = '10px system-ui, -apple-system, sans-serif';
            ctx.fillStyle = `rgba(107, 114, 128, ${labelAlpha * 0.8})`;
            ctx.fillText(`${skill.level}%`, labelX, labelY + 15);
          }
        });
      });

      // Draw center point with glow
      if (animationProgress > 0.1) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 3 * animationProgress, 0, 2 * Math.PI);
        ctx.fillStyle = '#2563eb';
        ctx.shadowColor = '#2563eb';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw level labels with fade-in
      levels.forEach(level => {
        if (level < 100 && animationProgress > 0.5) {
          const labelAlpha = (animationProgress - 0.5) * 2;
          ctx.fillStyle = `rgba(156, 163, 175, ${labelAlpha})`;
          ctx.font = '10px system-ui, -apple-system, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const labelY = centerY - (radius * level * animationProgress) / 100 - 5;
          ctx.fillText(`${level}%`, centerX, labelY);
        }
      });
    };

    updateCanvasSize();

    return () => {
      // Cleanup is handled in the animation useEffect
    };
  }, [animationProgress]);

  const categoryStats = {
    frontend: techSkills.filter(s => s.category === 'frontend'),
    backend: techSkills.filter(s => s.category === 'backend'),
    tools: techSkills.filter(s => s.category === 'tools'),
    design: techSkills.filter(s => s.category === 'design')
  };

  const categoryLabels = {
    frontend: 'フロントエンド',
    backend: 'バックエンド',
    tools: 'ツール',
    design: 'デザイン'
  };

  const categoryColors = {
    frontend: '#2563eb', // Primary blue from site
    backend: '#10b981',  // Accent green from site
    tools: '#f59e0b',    // Amber
    design: '#8b5cf6'    // Accent purple from site
  };

  return (
    <div className="tech-stack-chart">
      <div className="chart-container" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
      
      <div className="chart-legend" style={{ opacity: animationProgress }}>
        {Object.entries(categoryStats).map(([category, skills], index) => {
          if (skills.length === 0) return null;
          const avgLevel = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length);
          const itemDelay = index * 0.1;
          const itemProgress = Math.max(0, Math.min(1, (animationProgress - 0.6 - itemDelay) / 0.4));
          
          return (
            <div 
              key={category} 
              className="legend-item"
              style={{ 
                transform: `translateY(${(1 - itemProgress) * 20}px)`,
                opacity: itemProgress
              }}
            >
              <div 
                className="legend-color" 
                style={{ 
                  backgroundColor: categoryColors[category as keyof typeof categoryColors],
                  transform: `scale(${0.5 + itemProgress * 0.5})`,
                  boxShadow: `0 0 10px ${categoryColors[category as keyof typeof categoryColors]}40`
                }}
              />
              <div className="legend-content">
                <span className="legend-label">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </span>
                <span className="legend-average">{avgLevel}%平均</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
