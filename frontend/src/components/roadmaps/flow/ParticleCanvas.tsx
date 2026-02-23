import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
  type: 'ambient' | 'burst' | 'confetti';
  rotation?: number;
  rotationSpeed?: number;
}

export interface ParticleCanvasHandle {
  burst: (screenX: number, screenY: number, color: string) => void;
  confetti: (screenX: number, screenY: number) => void;
}

const CONFETTI_COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#22c55e', '#3b82f6', '#ef4444', '#8b5cf6'];

const ParticleCanvas = forwardRef<ParticleCanvasHandle>((_props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef(0);
  const lastTime = useRef(0);

  useImperativeHandle(ref, () => ({
    burst(screenX: number, screenY: number, color: string) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = screenX - rect.left;
      const y = screenY - rect.top;

      for (let i = 0; i < 28; i++) {
        const angle = (Math.PI * 2 * i) / 28 + (Math.random() - 0.5) * 0.5;
        const speed = 1.5 + Math.random() * 4;
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          life: 1,
          size: 2 + Math.random() * 3,
          color,
          type: 'burst',
        });
      }
    },

    confetti(screenX: number, screenY: number) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = screenX - rect.left;
      const y = screenY - rect.top;

      for (let i = 0; i < 80; i++) {
        const angle = Math.PI * 2 * Math.random();
        const speed = 2 + Math.random() * 7;
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 5,
          life: 1,
          size: 3 + Math.random() * 5,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          type: 'confetti',
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
        });
      }
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Ambient particle spawner
    const ambientInterval = setInterval(() => {
      const rect = canvas.getBoundingClientRect();
      if (particles.current.filter((p) => p.type === 'ambient').length < 18) {
        particles.current.push({
          x: Math.random() * rect.width,
          y: rect.height + 10,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.3 - Math.random() * 0.4,
          life: 1,
          size: 1 + Math.random() * 1.5,
          color: `hsla(${230 + Math.random() * 30}, 80%, 75%, 0.5)`,
          type: 'ambient',
        });
      }
    }, 400);

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime.current) / 16.67, 3);
      lastTime.current = time;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const alive: Particle[] = [];
      for (const p of particles.current) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.type === 'burst') {
          p.life -= 0.025 * dt;
          p.vx *= 0.97;
          p.vy *= 0.97;
          p.vy += 0.04 * dt;
        } else if (p.type === 'confetti') {
          p.life -= 0.012 * dt;
          p.vx *= 0.985;
          p.vy += 0.07 * dt;
          if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
            p.rotation += p.rotationSpeed * dt;
          }
        } else {
          p.life -= 0.004 * dt;
        }

        if (p.life <= 0) continue;
        alive.push(p);

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;

        if (p.type === 'confetti' && p.rotation !== undefined) {
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          // Glow for burst
          if (p.type === 'burst') {
            ctx.globalAlpha = p.life * 0.2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life * 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = p.life;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
      particles.current = alive;

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(ambientInterval);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 50 }}
    />
  );
});

ParticleCanvas.displayName = 'ParticleCanvas';
export default ParticleCanvas;
