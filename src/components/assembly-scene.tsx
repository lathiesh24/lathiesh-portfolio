'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { Group, MathUtils } from 'three';
function Sculpture({expanded,moving}:{expanded:boolean;moving:boolean}){
 const root=useRef<Group>(null);const layers=useRef<(Group|null)[]>([]);
 useFrame(({pointer,clock},delta)=>{if(root.current&&moving){root.current.rotation.y=MathUtils.damp(root.current.rotation.y,-.45+pointer.x*.25,3,delta);root.current.rotation.x=MathUtils.damp(root.current.rotation.x,.24-pointer.y*.15,3,delta);root.current.position.y=Math.sin(clock.elapsedTime*.6)*.06;}layers.current.forEach((layer,i)=>{if(layer)layer.position.y=MathUtils.damp(layer.position.y,(i-1)*(expanded?.95:.36),6,delta);});});
 return <group ref={root} rotation={[.24,-.45,-.14]}>{[0,1,2].map(i=><group key={i} ref={el=>{layers.current[i]=el;}} position={[0,(i-1)*.95,0]}><RoundedBox args={[2.8,.26,1.85]} radius={.075} smoothness={3}><meshStandardMaterial color={i===1?'#ff6b35':i===0?'#647176':'#d9dedb'} metalness={.65} roughness={.3}/></RoundedBox>{Array.from({length:8},(_,n)=><mesh key={n} position={[-1.1+n*.31,.145,.72]}><boxGeometry args={[.12,.025,.08]}/><meshStandardMaterial color={i===1?'#32160e':'#252b2c'}/></mesh>)}{i===1&&<mesh position={[0,.19,0]}><boxGeometry args={[.8,.12,.8]}/><meshStandardMaterial color="#161b1c" metalness={.7} roughness={.28}/></mesh>}{[[-1.2,-.65],[1.2,-.65],[-1.2,.65],[1.2,.65]].map(([x,z],n)=><mesh key={n} position={[x,.15,z]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.045,.012,6,12]}/><meshStandardMaterial color="#141819"/></mesh>)}</group>)}{[-1.1,1.1].map(x=><mesh key={x} position={[x,0,0]}><cylinderGeometry args={[.018,.018,2.5,8]}/><meshStandardMaterial color="#6b7679" metalness={.8} roughness={.4}/></mesh>)}</group>;
}
function Fallback(){return <div className="assembly-fallback"><span/><span/><span/></div>}
class Boundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true};}render(){return this.state.failed?<Fallback/>:this.props.children;}}
export default function Assembly({expanded,moving}:{expanded:boolean;moving:boolean}){
 const ref=useRef<HTMLDivElement>(null);const [visible,setVisible]=useState(true);const [supported,setSupported]=useState(false);
 useEffect(()=>{const c=document.createElement('canvas');setSupported(!!c.getContext('webgl2'));const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));if(ref.current)observer.observe(ref.current);return()=>observer.disconnect();},[]);
 return <div ref={ref} className="assembly-canvas" aria-hidden="true"><Boundary>{supported?<Canvas dpr={[1,1.5]} frameloop={visible?'always':'never'} camera={{position:[0,1.7,5.5],fov:42}}><ambientLight intensity={1.4}/><directionalLight position={[2,5,4]} intensity={4}/><directionalLight position={[-4,1,-2]} intensity={3} color="#b1c8dd"/><Sculpture expanded={expanded} moving={moving}/></Canvas>:<Fallback/>}</Boundary></div>;
}
