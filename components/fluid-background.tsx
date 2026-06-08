"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uDistortion;
  uniform vec2 uPointer;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vNoise;
  varying float vElevation;

  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x) {
    return mod289(((x * 34.0) + 1.0) * x);
  }

  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  float snoise(vec3 v) {
    const vec2 c = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 d = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, c.yyy));
    vec3 x0 = v - i + dot(i, c.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + c.xxx;
    vec3 x2 = x0 - i2 + c.yyy;
    vec3 x3 = x0 - d.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * d.wyz - d.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
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
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    float time = uTime * uSpeed;
    vec3 noisePosition = position * 0.68 + vec3(time * 0.28, time * 0.2, time * 0.14);
    float noise = snoise(noisePosition);
    float secondaryNoise = snoise(position * 1.42 - vec3(time * 0.16));
    float tertiaryNoise = snoise(position * 2.1 + vec3(time * 0.08, -time * 0.12, time * 0.06));
    float pointerLift = length(uPointer) * 0.08;
    float displacement = (noise * 0.34 + secondaryNoise * 0.1 + tertiaryNoise * 0.06 + pointerLift) * uDistortion;
    vec3 transformed = position + normal * displacement;
    vNormal = normal;
    vPosition = transformed;
    vNoise = noise;
    vElevation = displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uOpacity;
  uniform float uColorShift;
  uniform float uPhase;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vNoise;
  varying float vElevation;

  vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }

  vec3 phaseColor(float phase, float offset, float fresnel, float noise) {
    float hue = 0.0;
    float sat = 0.0;
    float lit = 0.0;

    if (phase < 1.0) {
      hue = mix(0.75 + offset, 0.85 + offset, noise * 0.5 + 0.5);
      sat = mix(0.55, 0.8, fresnel);
      lit = mix(0.72, 0.9, noise * 0.5 + 0.5);
    } else if (phase < 2.0) {
      hue = mix(0.05 + offset, 0.12 + offset, noise * 0.5 + 0.5);
      sat = mix(0.6, 0.85, fresnel);
      lit = mix(0.68, 0.85, noise * 0.5 + 0.5);
    } else if (phase < 3.0) {
      hue = mix(0.7 + offset, 0.78 + offset, noise * 0.5 + 0.5);
      sat = mix(0.65, 0.9, fresnel);
      lit = mix(0.6, 0.82, noise * 0.5 + 0.5);
    } else if (phase < 4.0) {
      hue = mix(0.9 + offset, 0.98 + offset, noise * 0.5 + 0.5);
      sat = mix(0.55, 0.8, fresnel);
      lit = mix(0.65, 0.85, noise * 0.5 + 0.5);
    } else {
      hue = mix(0.12 + offset, 0.18 + offset, noise * 0.5 + 0.5);
      sat = mix(0.7, 0.95, fresnel);
      lit = mix(0.55, 0.78, noise * 0.5 + 0.5);
    }

    return hsl2rgb(vec3(fract(hue), sat, lit));
  }

  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.1);
    float wave = sin(vPosition.y * 2.4 + uTime * 0.22 + uPointer.x * 1.5) * 0.5 + 0.5;
    float blend = clamp(wave * 0.52 + vNoise * 0.22 + fresnel * 0.5, 0.0, 1.0);

    float phaseFloor = floor(uPhase);
    float phaseFract = fract(uPhase);

    float hueOffset = uTime * 0.02;

    vec3 colorCurrent = phaseColor(phaseFloor, hueOffset, fresnel, vNoise);
    vec3 colorNext = phaseColor(mod(phaseFloor + 1.0, 5.0), hueOffset, fresnel, vNoise);
    vec3 phaseBlended = mix(colorCurrent, colorNext, phaseFract);

    vec3 baseColor = mix(uColorA, uColorB, blend);
    vec3 color = mix(baseColor, phaseBlended, uColorShift);

    color = mix(color, uColorC, clamp(fresnel + length(uPointer) * 0.16, 0.0, 1.0) * (1.0 - uColorShift * 0.5));

    float iridescence = sin(vPosition.x * 3.0 + vPosition.y * 2.0 + uTime * 0.3) * 0.5 + 0.5;
    vec3 iridColor = hsl2rgb(vec3(fract(iridescence * 0.3 + hueOffset), 0.4, 0.82));
    color = mix(color, iridColor, fresnel * 0.25);

    float alpha = uOpacity * (0.64 + fresnel * 0.34);
    gl_FragColor = vec4(color, alpha);
  }
`

const scrollState = {
  progress: 0,
  colorShift: 0,
  distortion: 1.0,
  targetScale: 1.0,
  targetRotationY: 0,
  phase: 0,
  opacityMod: 1.0,
}

type BlobProps = {
  colors: [string, string, string]
  opacity: number
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
  pointer: React.RefObject<THREE.Vector2 | null>
  reducedMotion: boolean
  scrollIndex: number
}

function FluidBlob({
  colors,
  opacity,
  position,
  rotation,
  scale,
  speed,
  pointer,
  reducedMotion,
  scrollIndex,
}: BlobProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const material = useRef<THREE.ShaderMaterial>(null)
  const easedPointer = useMemo(() => new THREE.Vector2(), [])
  const basePosition = useMemo(() => new THREE.Vector3(...position), [position])
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uDistortion: { value: 1.0 },
      uPointer: { value: easedPointer },
      uColorA: { value: new THREE.Color(colors[0]) },
      uColorB: { value: new THREE.Color(colors[1]) },
      uColorC: { value: new THREE.Color(colors[2]) },
      uOpacity: { value: opacity },
      uColorShift: { value: 0 },
      uPhase: { value: 0 },
    }),
    [colors, easedPointer, opacity, speed]
  )

  useFrame(({ clock }, delta) => {
    if (!material.current || !mesh.current) {
      return
    }

    if (pointer.current) {
      easedPointer.lerp(pointer.current, reducedMotion ? 0.018 : 0.045)
    }

    material.current.uniforms.uTime.value = reducedMotion
      ? clock.elapsedTime * 0.15
      : clock.elapsedTime

    material.current.uniforms.uColorShift.value = THREE.MathUtils.lerp(
      material.current.uniforms.uColorShift.value,
      scrollState.colorShift,
      0.04
    )

    material.current.uniforms.uPhase.value = THREE.MathUtils.lerp(
      material.current.uniforms.uPhase.value,
      scrollState.phase,
      0.03
    )

    const distortionCurve = 1.0 + Math.pow(scrollState.progress, 1.5) * 2.0
    material.current.uniforms.uDistortion.value = THREE.MathUtils.lerp(
      material.current.uniforms.uDistortion.value,
      distortionCurve,
      0.04
    )

    material.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      material.current.uniforms.uOpacity.value,
      opacity * scrollState.opacityMod,
      0.05
    )

    const scrollOffset = scrollState.progress * (scrollIndex === 0 ? 2.4 : scrollIndex === 1 ? -1.8 : 0.9)
    const targetY = basePosition.y + scrollOffset * 0.8
    const targetX = basePosition.x + Math.sin(scrollState.progress * Math.PI * 2) * scrollIndex * 0.6

    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, targetX, 0.03)
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, 0.03)

    const breathe = 1.0 + Math.sin(scrollState.progress * Math.PI * 3) * 0.12
    const scaleTarget = scale * scrollState.targetScale * breathe
    mesh.current.scale.setScalar(
      THREE.MathUtils.lerp(mesh.current.scale.x, scaleTarget, 0.03)
    )

    mesh.current.rotation.x += delta * speed * (reducedMotion ? 0.004 : 0.014)
    mesh.current.rotation.y +=
      delta * speed * (reducedMotion ? 0.006 : 0.02) +
      scrollState.targetRotationY * delta * 0.15
  })

  return (
    <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
      <icosahedronGeometry args={[1, 5]} />
      <shaderMaterial
        ref={material}
        args={[{ uniforms, vertexShader, fragmentShader }]}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  )
}

function ScrollUpdater() {
  const { invalidate } = useThree()

  useEffect(() => {
    if (typeof window === "undefined") return

    const mainEl = document.querySelector("main")
    if (!mainEl) return

    ScrollTrigger.create({
      trigger: mainEl,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      onUpdate: (self) => {
        scrollState.progress = self.progress
        scrollState.colorShift = Math.min(self.progress * 1.5, 1.0)
        scrollState.phase = self.progress * 5.0
        scrollState.targetScale = 1.0 + Math.sin(self.progress * Math.PI) * 0.22
        scrollState.targetRotationY = (self.progress - 0.5) * 4.0

        if (self.progress > 0.85) {
          scrollState.opacityMod = 0.7
        } else {
          scrollState.opacityMod = 1.0
        }

        invalidate()
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [invalidate])

  return null
}

export function FluidBackground() {
  const pointer = useRef(new THREE.Vector2())
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    const updateMotionPreference = () =>
      setReducedMotion(mediaQuery?.matches ?? false)
    const updatePointer = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      )
    }

    updateMotionPreference()
    mediaQuery?.addEventListener("change", updateMotionPreference)
    window.addEventListener("pointermove", updatePointer, { passive: true })

    return () => {
      mediaQuery?.removeEventListener("change", updateMotionPreference)
      window.removeEventListener("pointermove", updatePointer)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#F5F5F7]"
      data-testid="fluid-background"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 44 }}
        dpr={[1, 1.6]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />
        <ScrollUpdater />
        <FluidBlob
          colors={["#F8A8DD", "#8FCBFF", "#A891FF"]}
          opacity={0.78}
          pointer={pointer}
          position={[-2.6, 1.45, -0.5]}
          reducedMotion={reducedMotion}
          rotation={[0.2, 0.1, -0.2]}
          scale={2.6}
          speed={0.9}
          scrollIndex={0}
        />
        <FluidBlob
          colors={["#FCD8A4", "#B0F0DE", "#BBA5FF"]}
          opacity={0.62}
          pointer={pointer}
          position={[2.85, -0.4, -1.4]}
          reducedMotion={reducedMotion}
          rotation={[-0.2, 0.8, 0.16]}
          scale={2.9}
          speed={0.72}
          scrollIndex={1}
        />
        <FluidBlob
          colors={["#9ED9FF", "#F0B7E8", "#E9E0FF"]}
          opacity={0.42}
          pointer={pointer}
          position={[0.2, -3.15, -2.8]}
          reducedMotion={reducedMotion}
          rotation={[0.1, -0.4, 0.5]}
          scale={2.4}
          speed={0.58}
          scrollIndex={2}
        />
      </Canvas>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,245,247,0.06)_0%,rgba(245,245,247,0.18)_46%,rgba(245,245,247,0.75)_100%)]" />
      <div className="noise-layer absolute inset-0 opacity-[0.03] mix-blend-multiply" />
    </div>
  )
}
