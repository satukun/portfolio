"use client";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LiquidSphereProps {
  width?: number;
  height?: number;
}

export default function LiquidSphere({ width = 400, height = 300 }: LiquidSphereProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // テーマ検知用のuseEffect
  useEffect(() => {
    const checkTheme = () => {
      // data-theme属性をチェック
      const htmlElement = document.documentElement;
      const dataTheme = htmlElement.getAttribute('data-theme');
      
      if (dataTheme === 'dark') {
        setIsDarkMode(true);
      } else if (dataTheme === 'light') {
        setIsDarkMode(false);
      } else {
        // data-themeが設定されていない場合はprefers-color-schemeを使用
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
    };

    // 初期チェック
    checkTheme();

    // MutationObserverでdata-theme属性の変更を監視
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // prefers-color-schemeの変更も監視
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkTheme);
    };
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const mountElement = mountRef.current; // Ref値をキャプチャ

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 6;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    rendererRef.current = renderer;

    mountElement.appendChild(renderer.domElement);

    // Create multiple spheres with metaball effect
    const sphereCount = 4;
    const spheres: Array<{
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      radius: number;
      phase: number;
    }> = [];

    // Initialize spheres with random positions and velocities (more centered and gentle)
    for (let i = 0; i < sphereCount; i++) {
      spheres.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 2.5, // Reduced from 4 to 2.5
          (Math.random() - 0.5) * 2.5, // Reduced from 4 to 2.5
          (Math.random() - 0.5) * 1.2  // Reduced from 2 to 1.2
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.008, // Reduced from 0.02 to 0.008
          (Math.random() - 0.5) * 0.008, // Reduced from 0.02 to 0.008
          (Math.random() - 0.5) * 0.004  // Reduced from 0.01 to 0.004
        ),
        radius: 0.9 + Math.random() * 0.2, // Slightly more uniform size
        phase: Math.random() * Math.PI * 2
      });
    }

    // Create geometry for metaball effect
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    
    // Create custom shader material for metaball effect
    const vertexShader = `
      uniform float time;
      uniform float amplitude;
      uniform vec3 spherePositions[4];
      uniform float sphereRadii[4];
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vMetaballValue;
      
      // Noise function for organic deformation
      vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }
      
      vec4 mod289(vec4 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }
      
      vec4 permute(vec4 x) {
        return mod289(((x*34.0)+1.0)*x);
      }
      
      vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
      }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
                   i.z + vec4(0.0, i1.z, i2.z, 1.0))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                 
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      void main() {
        vNormal = normal;
        vPosition = position;
        
        // Calculate metaball field value
        float metaballField = 0.0;
        for (int i = 0; i < 4; i++) {
          vec3 diff = position - spherePositions[i];
          float dist = length(diff);
          float influence = sphereRadii[i] * sphereRadii[i] / (dist * dist + 0.1);
          metaballField += influence;
        }
        vMetaballValue = metaballField;
        
        // Create organic deformation based on metaball field and noise
        float noise1 = snoise(position * 0.8 + time * 0.2) * amplitude;
        float noise2 = snoise(position * 1.2 + time * 0.15) * amplitude * 0.5;
        
        // Combine metaball influence with noise
        float deformation = (metaballField - 1.0) * 0.3 + noise1 + noise2;
        vec3 newPosition = position + normal * deformation;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vMetaballValue;
      
      void main() {
        // Create gradient based on position and normal
        float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
        fresnel = pow(1.0 - fresnel, 2.0);
        
        // Color mixing based on metaball field strength
        float colorMix = sin(vPosition.y * 1.5 + time * 1.0 + vMetaballValue * 2.0) * 0.5 + 0.5;
        vec3 finalColor = mix(color1, color2, colorMix);
        
        // Add metaball field influence to color
        float metaballInfluence = clamp(vMetaballValue * 0.5, 0.0, 1.0);
        finalColor = mix(finalColor, color3, metaballInfluence + fresnel * 0.5);
        
        // Dynamic transparency based on metaball field
        float alpha = 0.7 + metaballInfluence * 0.2 + fresnel * 0.1;
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // テーマに応じた色を定義
    const getThemeColors = (isDark: boolean) => {
      if (isDark) {
        return {
          color1: new THREE.Color(0x3b82f6), // Brighter blue for dark mode
          color2: new THREE.Color(0xa855f7), // Brighter purple for dark mode
          color3: new THREE.Color(0x06d6a0)  // Brighter teal for dark mode
        };
      } else {
        return {
          color1: new THREE.Color(0x1e40af), // Darker blue for light mode
          color2: new THREE.Color(0x7c3aed), // Darker purple for light mode
          color3: new THREE.Color(0x059669)  // Darker green for light mode
        };
      }
    };

    const themeColors = getThemeColors(isDarkMode);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        amplitude: { value: 0.2 },
        spherePositions: { value: spheres.map(s => s.position) },
        sphereRadii: { value: spheres.map(s => s.radius) },
        color1: { value: themeColors.color1 },
        color2: { value: themeColors.color2 },
        color3: { value: themeColors.color3 }
      },
      transparent: true,
      side: THREE.DoubleSide
    });

    materialRef.current = material;

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Physics simulation for metaballs (gentler parameters)
    const updateSpheres = () => {
      const attractionForce = 0.0002; // Reduced from 0.0005
      const repulsionForce = 0.004;   // Reduced from 0.01
      const damping = 0.95;           // Increased damping from 0.98
      const boundaryForce = 0.008;    // Increased from 0.002 for stronger boundaries
      const maxVelocity = 0.015;      // Maximum velocity limit

      spheres.forEach((sphere, i) => {
        // Update phase for organic movement (slower)
        sphere.phase += 0.008; // Reduced from 0.02
        
        // Add gentle organic oscillation
        const organicForce = new THREE.Vector3(
          Math.sin(sphere.phase) * 0.0003,      // Reduced from 0.001
          Math.cos(sphere.phase * 0.7) * 0.0003, // Reduced from 0.001
          Math.sin(sphere.phase * 0.5) * 0.0001  // Reduced from 0.0005
        );
        sphere.velocity.add(organicForce);

        // Calculate forces from other spheres
        spheres.forEach((other, j) => {
          if (i !== j) {
            const diff = new THREE.Vector3().subVectors(other.position, sphere.position);
            const distance = diff.length();
            
            if (distance > 0) {
              const force = diff.normalize();
              
              // Gentler attraction and repulsion with closer interaction distances
              if (distance > 1.5) { // Reduced from 2.0
                force.multiplyScalar(attractionForce / distance);
                sphere.velocity.add(force);
              } else if (distance < 1.0) { // Reduced from 1.5
                force.multiplyScalar(-repulsionForce / (distance * distance));
                sphere.velocity.add(force);
              }
            }
          }
        });

        // Stronger boundary forces to keep spheres well within canvas
        const boundary = 2.2; // Reduced from 3.0 for tighter bounds
        const softBoundary = 1.8; // Soft boundary for gradual force increase
        
        // X boundary
        if (Math.abs(sphere.position.x) > boundary) {
          sphere.velocity.x += -Math.sign(sphere.position.x) * boundaryForce * 2;
        } else if (Math.abs(sphere.position.x) > softBoundary) {
          const strength = (Math.abs(sphere.position.x) - softBoundary) / (boundary - softBoundary);
          sphere.velocity.x += -Math.sign(sphere.position.x) * boundaryForce * strength;
        }
        
        // Y boundary
        if (Math.abs(sphere.position.y) > boundary) {
          sphere.velocity.y += -Math.sign(sphere.position.y) * boundaryForce * 2;
        } else if (Math.abs(sphere.position.y) > softBoundary) {
          const strength = (Math.abs(sphere.position.y) - softBoundary) / (boundary - softBoundary);
          sphere.velocity.y += -Math.sign(sphere.position.y) * boundaryForce * strength;
        }
        
        // Z boundary (tighter)
        const zBoundary = 1.0; // Reduced from 1.5
        const zSoftBoundary = 0.8;
        if (Math.abs(sphere.position.z) > zBoundary) {
          sphere.velocity.z += -Math.sign(sphere.position.z) * boundaryForce * 2;
        } else if (Math.abs(sphere.position.z) > zSoftBoundary) {
          const strength = (Math.abs(sphere.position.z) - zSoftBoundary) / (zBoundary - zSoftBoundary);
          sphere.velocity.z += -Math.sign(sphere.position.z) * boundaryForce * strength;
        }

        // Apply damping
        sphere.velocity.multiplyScalar(damping);
        
        // Limit maximum velocity to prevent sudden movements
        if (sphere.velocity.length() > maxVelocity) {
          sphere.velocity.normalize().multiplyScalar(maxVelocity);
        }
        
        // Update position
        sphere.position.add(sphere.velocity);
      });

      // Update shader uniforms
      material.uniforms.spherePositions.value = spheres.map(s => s.position);
    };

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Update physics
      updateSpheres();

      // Update time uniform for animation
      material.uniforms.time.value += 0.005;

      // Gentle rotation of the entire system
      sphere.rotation.y += 0.001;
      sphere.rotation.x += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Fixed size - no resize handling needed

    // Cleanup function
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [width, height, isDarkMode]);

  // テーマ変更時に色を更新
  useEffect(() => {
    if (materialRef.current) {
      const getThemeColors = (isDark: boolean) => {
        if (isDark) {
          return {
            color1: new THREE.Color(0x3b82f6), // Brighter blue for dark mode
            color2: new THREE.Color(0xa855f7), // Brighter purple for dark mode
            color3: new THREE.Color(0x06d6a0)  // Brighter teal for dark mode
          };
        } else {
          return {
            color1: new THREE.Color(0x1e40af), // Darker blue for light mode
            color2: new THREE.Color(0x7c3aed), // Darker purple for light mode
            color3: new THREE.Color(0x059669)  // Darker green for light mode
          };
        }
      };

      const themeColors = getThemeColors(isDarkMode);
      
      // シェーダーの色を更新
      materialRef.current.uniforms.color1.value = themeColors.color1;
      materialRef.current.uniforms.color2.value = themeColors.color2;
      materialRef.current.uniforms.color3.value = themeColors.color3;
    }
  }, [isDarkMode]);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: `${width}px`, 
        height: `${height}px`, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }} 
    />
  );
}
