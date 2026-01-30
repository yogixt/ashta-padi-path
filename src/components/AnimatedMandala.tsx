import { motion } from 'framer-motion';

interface AnimatedMandalaProps {
  className?: string;
  size?: number;
}

export function AnimatedMandala({ className = '', size = 600 }: AnimatedMandalaProps) {
  // Chakra-inspired colors with HSL values matching our design system
  const layers = [
    { radius: size * 0.95, color: 'hsl(270, 70%, 60%)', duration: 120, direction: 1, petals: 24 },    // Violet - Sahasrara
    { radius: size * 0.82, color: 'hsl(234, 70%, 60%)', duration: 100, direction: -1, petals: 20 },   // Indigo - Ajna
    { radius: size * 0.70, color: 'hsl(200, 70%, 55%)', duration: 80, direction: 1, petals: 16 },     // Blue - Vishuddha
    { radius: size * 0.58, color: 'hsl(142, 50%, 45%)', duration: 65, direction: -1, petals: 12 },    // Green - Anahata
    { radius: size * 0.46, color: 'hsl(45, 90%, 55%)', duration: 50, direction: 1, petals: 10 },      // Yellow - Manipura
    { radius: size * 0.34, color: 'hsl(25, 85%, 55%)', duration: 40, direction: -1, petals: 8 },      // Orange - Svadhisthana
    { radius: size * 0.22, color: 'hsl(0, 70%, 55%)', duration: 30, direction: 1, petals: 6 },        // Red - Muladhara
  ];

  // Generate petal path for lotus-like mandala
  const generatePetalPath = (cx: number, cy: number, radius: number, numPetals: number) => {
    const paths: string[] = [];
    for (let i = 0; i < numPetals; i++) {
      const angle = (i / numPetals) * Math.PI * 2;
      const nextAngle = ((i + 0.5) / numPetals) * Math.PI * 2;
      
      const innerRadius = radius * 0.3;
      const outerRadius = radius * 0.5;
      
      const x1 = cx + Math.cos(angle) * innerRadius;
      const y1 = cy + Math.sin(angle) * innerRadius;
      const x2 = cx + Math.cos(nextAngle) * outerRadius;
      const y2 = cy + Math.sin(nextAngle) * outerRadius;
      const x3 = cx + Math.cos(angle + (Math.PI / numPetals)) * innerRadius;
      const y3 = cy + Math.sin(angle + (Math.PI / numPetals)) * innerRadius;
      
      paths.push(`M ${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`);
    }
    return paths.join(' ');
  };

  // Generate geometric pattern
  const generateGeometricPattern = (cx: number, cy: number, radius: number, segments: number) => {
    const points: string[] = [];
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  const center = size / 2;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg 
        viewBox={`0 0 ${size} ${size}`} 
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.2))' }}
      >
        <defs>
          {/* Glow filters for each layer */}
          {layers.map((layer, i) => (
            <filter key={`glow-${i}`} id={`glow-${i}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* Rotating layers */}
        {layers.map((layer, index) => (
          <motion.g
            key={index}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 * layer.direction }}
            transition={{
              duration: layer.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ transformOrigin: `${center}px ${center}px` }}
          >
            {/* Outer circle */}
            <circle
              cx={center}
              cy={center}
              r={layer.radius / 2}
              fill="none"
              stroke={layer.color}
              strokeWidth="1"
              opacity="0.4"
            />

            {/* Geometric polygon */}
            <polygon
              points={generateGeometricPattern(center, center, layer.radius / 2 - 10, layer.petals)}
              fill="none"
              stroke={layer.color}
              strokeWidth="0.8"
              opacity="0.5"
            />

            {/* Inner polygon */}
            <polygon
              points={generateGeometricPattern(center, center, layer.radius / 3, layer.petals)}
              fill="none"
              stroke={layer.color}
              strokeWidth="0.5"
              opacity="0.3"
            />

            {/* Petal-like paths */}
            <path
              d={generatePetalPath(center, center, layer.radius, layer.petals)}
              fill="none"
              stroke={layer.color}
              strokeWidth="1.5"
              opacity="0.6"
              filter={`url(#glow-${index})`}
            />

            {/* Decorative dots */}
            {Array.from({ length: layer.petals }).map((_, i) => {
              const angle = (i / layer.petals) * Math.PI * 2;
              const x = center + Math.cos(angle) * (layer.radius / 2 - 5);
              const y = center + Math.sin(angle) * (layer.radius / 2 - 5);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="2"
                  fill={layer.color}
                  opacity="0.7"
                />
              );
            })}
          </motion.g>
        ))}

        {/* Central Om symbol with glow */}
        <motion.g
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
          transition={{ 
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 1 }
          }}
        >
          <circle
            cx={center}
            cy={center}
            r={size * 0.08}
            fill="hsl(var(--primary))"
            opacity="0.2"
          />
          <circle
            cx={center}
            cy={center}
            r={size * 0.05}
            fill="hsl(var(--primary))"
            opacity="0.4"
          />
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="central"
            className="font-sanskrit"
            fontSize={size * 0.08}
            fill="hsl(var(--primary))"
            style={{ filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.5))' }}
          >
            ॐ
          </text>
        </motion.g>

        {/* Bindu (central point) */}
        <motion.circle
          cx={center}
          cy={center}
          r="4"
          fill="hsl(var(--primary))"
          animate={{ 
            boxShadow: ['0 0 10px hsl(var(--primary))', '0 0 20px hsl(var(--primary))', '0 0 10px hsl(var(--primary))']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
