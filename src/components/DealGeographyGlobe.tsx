import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface Location {
  name: string;
  lat: number;
  lng: number;
  dealValue: number;
  deals: number;
  color: string;
}

interface Connection {
  from: Location;
  to: Location;
}

const locations: Location[] = [
  { name: 'UK', lat: 51.5074, lng: -0.1278, dealValue: 35, deals: 3, color: '#FBBF24' }, // Yellow
  { name: 'Germany', lat: 52.5200, lng: 13.4050, dealValue: 18, deals: 2, color: '#34D399' }, // Green
  { name: 'Australia', lat: -33.8688, lng: 151.2093, dealValue: 12, deals: 1, color: '#60A5FA' }, // Blue
  { name: 'Thailand', lat: 13.7563, lng: 100.5018, dealValue: 8, deals: 1, color: '#F472B6' }, // Pink
  { name: 'Japan', lat: 35.6762, lng: 139.6503, dealValue: 22, deals: 2, color: '#A78BFA' }, // Purple
  { name: 'Saudi Arabia', lat: 24.7136, lng: 46.6753, dealValue: 15, deals: 1, color: '#FB923C' }, // Orange
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, dealValue: 10, deals: 1, color: '#2DD4BF' }, // Teal
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const globeMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: 0x0a1929,
      emissive: 0x112240,
      shininess: 20,
      transparent: true,
      opacity: 0.85,
    });
  }, []);

  const gridMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({ color: 0x1e3a5f, transparent: true, opacity: 0.3 });
  }, []);

  const gridLines = useMemo(() => {
    const lines = [];
    const radius = 2;
    const segments = 64;

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const phi = (90 - lat) * (Math.PI / 180);
      const circleRadius = radius * Math.sin(phi);
      const y = radius * Math.cos(phi);

      const points = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(
          circleRadius * Math.cos(theta),
          y,
          circleRadius * Math.sin(theta)
        ));
      }
      lines.push(points);
    }

    // Longitude lines
    for (let lng = 0; lng < 360; lng += 20) {
      const points = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        points.push(latLngToVector3(lat, lng, radius));
      }
      lines.push(points);
    }

    return lines;
  }, []);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <primitive object={globeMaterial} />
      </mesh>

      {gridLines.map((points, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
              args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <primitive object={gridMaterial} />
        </line>
      ))}
    </group>
  );
}

function PulsingMarker({ location }: { location: Location }) {
  const markerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 1;
    if (markerRef.current) {
      markerRef.current.scale.set(pulse, pulse, pulse);
    }
    if (glowRef.current) {
      glowRef.current.scale.set(pulse * 1.5, pulse * 1.5, pulse * 1.5);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 / pulse;
    }
  });

  const position = latLngToVector3(location.lat, location.lng, 2.05);

  return (
    <group position={position}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={location.color} transparent opacity={0.3} />
      </mesh>

      {/* Main marker */}
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={location.color} />
      </mesh>

      {/* Pillar of light */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
        <meshBasicMaterial color={location.color} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function ConnectionLine({ from, to }: { from: Location; to: Location }) {
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    setProgress((state.clock.elapsedTime * 0.5) % 1);
  });

  const curve = useMemo(() => {
    const start = latLngToVector3(from.lat, from.lng, 2.05);
    const end = latLngToVector3(to.lat, to.lng, 2.05);

    const midPoint = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(2.8);

    return new THREE.QuadraticBezierCurve3(start, midPoint, end);
  }, [from, to]);

  const points = useMemo(() => curve.getPoints(50), [curve]);

  const gradientColors = useMemo(() => {
    const colors = [];
    for (let i = 0; i <= 50; i++) {
      const color = new THREE.Color(from.color);
      colors.push(color.r, color.g, color.b);
    }
    return new Float32Array(colors);
  }, [from.color]);

  return (
    <>
      {/* Static line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
            args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={gradientColors.length / 3}
            array={gradientColors}
            itemSize={3}
            args={[gradientColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.3} linewidth={2} />
      </line>

      {/* Animated traveling pulse */}
      <mesh position={curve.getPoint(progress)}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={from.color} />
      </mesh>
    </>
  );
}

export function DealGeographyGlobe() {
  const connections = useMemo(() => {
    const conns: Connection[] = [];
    // Create connections from UK to all other locations
    const uk = locations.find(l => l.name === 'UK')!;
    locations.forEach(loc => {
      if (loc.name !== 'UK') {
        conns.push({ from: uk, to: loc });
      }
    });
    return conns;
  }, []);

  return (
    <div className="w-full h-[600px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-lg overflow-hidden relative">
      {/* Stats overlay */}
      <div className="absolute top-6 left-6 z-10 space-y-3">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4">
          <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">Global Coverage</div>
          <div className="text-white text-3xl font-bold">{locations.length}</div>
          <div className="text-slate-400 text-xs mt-1">Active Markets</div>
        </div>
        <div className="bg-slate-900/80 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4">
          <div className="text-yellow-400 text-xs font-mono uppercase tracking-wider mb-1">Total Deal Value</div>
          <div className="text-white text-3xl font-bold">£120M</div>
          <div className="text-slate-400 text-xs mt-1">Pipeline + Active</div>
        </div>
      </div>

      {/* Location list */}
      <div className="absolute top-6 right-6 z-10 space-y-2 max-w-xs">
        {locations.map((loc) => (
          <div key={loc.name} className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: loc.color }}
              />
              <div>
                <div className="text-white text-sm font-semibold">{loc.name}</div>
                <div className="text-slate-400 text-xs">{loc.deals} deal{loc.deals > 1 ? 's' : ''}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-sm font-bold">£{loc.dealValue}M</div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 z-10">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
          <div className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-3">Network Status</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-slate-300 text-xs">Active Connection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-cyan-400/30" />
              <span className="text-slate-300 text-xs">Data Flow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Time display - Bloomberg style */}
      <div className="absolute bottom-6 right-6 z-10">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded px-3 py-2">
          <div className="text-slate-400 text-xs font-mono">
            {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} GMT
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0EA5E9" />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <Globe />

        {locations.map((location) => (
          <PulsingMarker key={location.name} location={location} />
        ))}

        {connections.map((conn, i) => (
          <ConnectionLine key={i} from={conn.from} to={conn.to} />
        ))}

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
