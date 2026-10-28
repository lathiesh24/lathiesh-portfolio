'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line, OrbitControls, RoundedBox } from '@react-three/drei';
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import { projects } from '@/lib/projects';

const positions: [number, number, number][] = [[-2.65, 1.15, .35], [2.4, 1.4, -.1], [-1.9, -1.5, .6], [2.3, -1.3, .9]];

function Core({ color, moving }: { color: string; moving: boolean }) {
  const object = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (object.current && moving) { object.current.rotation.y += delta * .12; object.current.rotation.z += delta * .035; } });
  return <group ref={object}>
    <mesh rotation={[.5, .3, .2]}><icosahedronGeometry args={[1.03, 0]} /><meshPhysicalMaterial color="#364337" metalness={.8} roughness={.23} clearcoat={1} /></mesh>
    <mesh scale={1.014} rotation={[.5, .3, .2]}><icosahedronGeometry args={[1.03, 0]} /><meshBasicMaterial color={color} wireframe transparent opacity={.85} /></mesh>
    {[0, 1, 2].map(i => <mesh key={i} rotation={[Math.PI / 2 + i * .45, i * .8, i * .55]}><torusGeometry args={[1.34 + i * .15, .012, 8, 100]} /><meshBasicMaterial color={color} transparent opacity={i === 0 ? .65 : .2} /></mesh>)}
    <mesh><sphereGeometry args={[.25, 16, 16]} /><meshBasicMaterial color={color} /></mesh>
  </group>;
}

function Signal({ end, color, moving, offset }: { end: [number, number, number]; color: string; moving: boolean; offset: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = moving ? (clock.elapsedTime * .17 + offset) % 1 : .6;
    mesh.current.position.set(end[0] * t, end[1] * t, end[2] * t);
  });
  return <mesh ref={mesh}><sphereGeometry args={[.045, 8, 8]} /><meshBasicMaterial color={color} /></mesh>;
}

function Network({ selected, onSelect, moving }: { selected: number; onSelect: (i: number) => void; moving: boolean }) {
  const color = projects[selected].color;
  const stars = useMemo(() => {
    const data = new Float32Array(75 * 3);
    for (let i = 0; i < 75; i++) { data[i * 3] = Math.sin(i * 41.2) * 5; data[i * 3 + 1] = Math.cos(i * 23.7) * 3.3; data[i * 3 + 2] = -2 - (i % 9) * .3; }
    return data;
  }, []);
  return <>
    <ambientLight intensity={1.3} />
    <pointLight position={[3, 5, 5]} intensity={35} color="#deffd1" />
    <pointLight position={[-5, -2, 3]} intensity={15} color="#7394ff" />
    <group rotation={[.08, -.16, 0]}>
      <Core color={color} moving={moving} />
      {positions.map((position, i) => <group key={i}>
        <Line points={[[0, 0, 0], position]} color={i === selected ? color : '#52605a'} transparent opacity={i === selected ? .65 : .3} lineWidth={1} dashed dashSize={.07} gapSize={.07} />
        <Signal end={position} color={i === selected ? color : '#64766a'} moving={moving} offset={i * .23} />
        <group position={position}>
          <RoundedBox args={[.57, .57, .57]} radius={.09} smoothness={3} rotation={[.4, .5, .2]} onClick={event => { event.stopPropagation(); onSelect(i); }} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}>
            <meshStandardMaterial color={i === selected ? color : '#3c4840'} emissive={i === selected ? color : '#000000'} emissiveIntensity={.12} metalness={.55} roughness={.3} />
          </RoundedBox>
          <Html center position={[0, -.66, 0]} style={{ pointerEvents: 'none' }}><span className={`node-label ${i === selected ? 'selected' : ''}`}>{projects[i].name}<span>{projects[i].label}</span></span></Html>
        </group>
      </group>)}
      <Html center position={[0, -1.85, -.2]} style={{ pointerEvents: 'none' }}><span className="core-label">LM / SYSTEMS</span></Html>
    </group>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[stars, 3]} /></bufferGeometry><pointsMaterial size={.015} color="#94a49b" sizeAttenuation transparent opacity={.5} /></points>
    <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.6} minAzimuthAngle={-.65} maxAzimuthAngle={.65} enableDamping dampingFactor={.06} />
  </>;
}

export function SceneFallback() {
  return <div className="scene-fallback" aria-hidden="true"><div className="fallback-ring ring-one" /><div className="fallback-ring ring-two" /><div className="fallback-ring ring-three" /><div className="fallback-core">LM</div><span className="fallback-tag tag-one">AGENTS</span><span className="fallback-tag tag-two">RETRIEVAL</span><span className="fallback-tag tag-three">PRODUCT</span></div>;
}
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <SceneFallback /> : this.props.children; }
}

export default function SystemScene({ selected, onSelect, paused }: { selected: number; onSelect: (i: number) => void; paused: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [contextLost, setContextLost] = useState(false);
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2');
    setSupported(Boolean(context));
    context?.getExtension('WEBGL_lose_context')?.loseContext();
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '100px' });
    if (container.current) observer.observe(container.current);
    return () => { observer.disconnect(); document.body.style.cursor = ''; };
  }, []);
  return <div ref={container} className="scene-canvas" role="img" aria-label={`Interactive 3D system map. Selected project: ${projects[selected].name}. Use the project buttons below to explore.`}>
    {supported && !contextLost ? <SceneBoundary><Canvas dpr={[1, 1.5]} camera={{ position: [0, .4, 8.6], fov: 44 }} frameloop={visible && !paused ? 'always' : 'demand'} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} onCreated={({ gl }) => { gl.domElement.addEventListener('webglcontextlost', () => setContextLost(true), { once: true }); }} fallback={<SceneFallback />}>
      <Network selected={selected} onSelect={onSelect} moving={visible && !paused} />
    </Canvas></SceneBoundary> : <SceneFallback />}
  </div>;
}
