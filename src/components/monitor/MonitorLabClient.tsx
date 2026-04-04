"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import BootSequence from "@/components/terminal/BootSequence";
import SecurityInit from "@/components/os/SecurityInit";
import LoginScreen from "@/components/os/LoginScreen";

type MonitorPhase = "boot" | "security" | "login";

type MonitorGLTF = {
  nodes: {
    Cube004: THREE.Mesh;
    Cube004_1: THREE.Mesh;
    Cube004_2: THREE.Mesh;
    Cube004_3: THREE.Mesh;
    Cube004_4: THREE.Mesh;
    Cube004_5: THREE.Mesh;
  };
  materials: {
    CRT_Screen: THREE.MeshStandardMaterial;
    CRT_Body: THREE.MeshStandardMaterial;
    CRT_Bezel: THREE.MeshStandardMaterial;
    CRT_DarkPlastic: THREE.MeshStandardMaterial;
    CRT_Button: THREE.MeshStandardMaterial;
    CRT_LED: THREE.MeshStandardMaterial;
  };
};

// Tuning cheatsheet for the CRT screen fit and scene framing.
const MONITOR_TUNING = {
  screenPixelWidth: 960,
  screenOffsetX: 0,
  screenOffsetY: 0,
  screenDepthOffset: -0.0001,
  screenWidthScale: -1,
  screenHeightScale: -1,
  htmlDistanceFactor: 0.415,
  powerButtonXRatio: 0.93,
  powerButtonYOffset: 0,
  powerButtonDepthOffset: -0.02,
  powerButtonHitRadius: 0.065,
  keyboardPosition: [0, -0.5, 0.9] as const,
  keyboardScale: 4.2,
  keyboardRotation: [0, 0, 0] as const,
  modelPosition: [0, -0.5, 0] as const,
  modelScale: 0.8,
  modelRotationY: Math.PI,
  overlayRotationY: Math.PI,
  cameraPosition: [0, 0.6,3.0] as const,
  cameraFov: 32.5,
  orbitTarget: [0, -0.14, 0] as const,
  orbitMinDistance: 1.35,
  orbitMaxDistance: 4.8,
  orbitMinPolarAngle: Math.PI / 4.6,
  orbitMaxPolarAngle: Math.PI / 1.72,
};

function MonitorSequenceDisplay() {
  const [phase, setPhase] = useState<MonitorPhase>("boot");

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(102, 243, 255, 0.06), transparent 58%)",
        }}
      />

      {phase === "boot" && (
        <BootSequence onComplete={() => setPhase("security")} allowSkip={false} />
      )}
      {phase === "security" && (
        <SecurityInit onComplete={() => setPhase("login")} allowSkip={false} />
      )}
      {phase === "login" && <LoginScreen onLogin={() => undefined} autoFocus={false} />}
    </div>
  );
}

function MonitorModel() {
  const { nodes, materials } = useGLTF("/models/monitor.glb") as unknown as MonitorGLTF;
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [isPowerButtonHovered, setIsPowerButtonHovered] = useState(false);

  const screenPlane = useMemo(() => {
    const geo = nodes.Cube004.geometry;
    geo.computeBoundingBox();
    const box = geo.boundingBox!;
    return {
      cx: (box.min.x + box.max.x) / 2 + MONITOR_TUNING.screenOffsetX,
      cy: (box.min.y + box.max.y) / 2 + MONITOR_TUNING.screenOffsetY,
      z: box.min.z + MONITOR_TUNING.screenDepthOffset,
      w: (box.max.x - box.min.x) * MONITOR_TUNING.screenWidthScale,
      h: (box.max.y - box.min.y) * MONITOR_TUNING.screenHeightScale,
    };
  }, [nodes.Cube004.geometry]);

  const powerButtonTarget = useMemo(() => {
    const geo = nodes.Cube004_4.geometry;
    geo.computeBoundingBox();
    const box = geo.boundingBox!;

    return {
      x: box.min.x + (box.max.x - box.min.x) * MONITOR_TUNING.powerButtonXRatio,
      y: (box.min.y + box.max.y) / 2 + MONITOR_TUNING.powerButtonYOffset,
      z: box.min.z + MONITOR_TUNING.powerButtonDepthOffset,
      radius: MONITOR_TUNING.powerButtonHitRadius,
    };
  }, [nodes.Cube004_4.geometry]);

  const screenMaterial = useMemo(() => {
    const mat = materials.CRT_Screen.clone();
    mat.color = new THREE.Color(isPoweredOn ? "#061118" : "#020406");
    mat.emissive = new THREE.Color(isPoweredOn ? "#0b2028" : "#000000");
    mat.emissiveIntensity = isPoweredOn ? 0.15 : 0;
    mat.roughness = isPoweredOn ? 0.18 : 0.3;
    mat.metalness = 0.02;
    mat.needsUpdate = true;
    return mat;
  }, [isPoweredOn, materials.CRT_Screen]);

  const ledMaterial = useMemo(() => {
    const mat = materials.CRT_LED.clone();
    mat.color = new THREE.Color(isPoweredOn ? "#dfffc4" : "#26311e");
    mat.emissive = new THREE.Color(isPoweredOn ? "#d7ff92" : "#12180d");
    mat.emissiveIntensity = isPoweredOn ? 1.5 : 0.08;
    mat.needsUpdate = true;
    return mat;
  }, [isPoweredOn, materials.CRT_LED]);

  const htmlHeight = useMemo(
    () => Math.round((MONITOR_TUNING.screenPixelWidth * screenPlane.h) / screenPlane.w),
    [screenPlane.h, screenPlane.w],
  );

  useEffect(() => {
    return () => {
      screenMaterial.dispose();
    };
  }, [screenMaterial]);

  useEffect(() => {
    return () => {
      ledMaterial.dispose();
    };
  }, [ledMaterial]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.body.style.cursor = isPowerButtonHovered ? "pointer" : "";

    return () => {
      document.body.style.cursor = "";
    };
  }, [isPowerButtonHovered]);

  const handlePowerToggle = () => {
    setIsPoweredOn((currentState) => !currentState);
  };

  return (
    <group
      position={MONITOR_TUNING.modelPosition}
      scale={MONITOR_TUNING.modelScale}
      rotation={[0, MONITOR_TUNING.modelRotationY, 0]}
    >
      {/* CRT glass (dark) */}
      <mesh geometry={nodes.Cube004.geometry} material={screenMaterial} />

      {/* Live UI rendered via drei Html */}
      {isPoweredOn && (
        <Html
          transform
          occlude="blending"
          position={[screenPlane.cx, screenPlane.cy, screenPlane.z]}
          rotation={[0, MONITOR_TUNING.overlayRotationY, 0]}
          distanceFactor={MONITOR_TUNING.htmlDistanceFactor}
          style={{
            width: `${MONITOR_TUNING.screenPixelWidth}px`,
            height: `${htmlHeight}px`,
            overflow: "hidden",
            pointerEvents: "none",
            background: "#000",
          }}
        >
          <div
            style={{
              width: MONITOR_TUNING.screenPixelWidth,
              height: htmlHeight,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <MonitorSequenceDisplay />
          </div>
        </Html>
      )}

      {/* Body / bezel / structural parts */}
      <mesh geometry={nodes.Cube004_1.geometry} material={materials.CRT_Body} castShadow receiveShadow />
      <mesh geometry={nodes.Cube004_2.geometry} material={materials.CRT_Bezel} castShadow receiveShadow />
      <mesh geometry={nodes.Cube004_3.geometry} material={materials.CRT_DarkPlastic} castShadow receiveShadow />
      <mesh geometry={nodes.Cube004_4.geometry} material={materials.CRT_Button} castShadow receiveShadow />
      <mesh geometry={nodes.Cube004_5.geometry} material={ledMaterial} castShadow receiveShadow />

      <mesh
        position={[powerButtonTarget.x, powerButtonTarget.y, powerButtonTarget.z]}
        onClick={(event) => {
          event.stopPropagation();
          handlePowerToggle();
        }}
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setIsPowerButtonHovered(true);
        }}
        onPointerOut={() => {
          setIsPowerButtonHovered(false);
        }}
      >
        <sphereGeometry args={[powerButtonTarget.radius, 20, 20]} />
        <meshBasicMaterial transparent opacity={0.001} depthWrite={false} />
      </mesh>
    </group>
  );
}

function KeyboardModel() {
  const { scene } = useGLTF("/models/KeyboardFIX.glb");

  const keyboardScene = useMemo(() => {
    const clonedScene = clone(scene);

    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }

      child.castShadow = true;
      child.receiveShadow = true;
    });

    return clonedScene;
  }, [scene]);

  return (
    <primitive
      object={keyboardScene}
      position={MONITOR_TUNING.keyboardPosition}
      scale={MONITOR_TUNING.keyboardScale}
      rotation={MONITOR_TUNING.keyboardRotation}
    />
  );
}

export default function MonitorLabClient() {
  return (
    <div className="h-screen w-screen bg-[#02060b]">
      <div className="h-full w-full">
        <Canvas
          shadows
          camera={{ position: MONITOR_TUNING.cameraPosition, fov: MONITOR_TUNING.cameraFov }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#02060b"]} />
          <fog attach="fog" args={["#02060b", 2.6, 7.2]} />

          <ambientLight intensity={0.44} />
          <directionalLight
            position={[2.2, 3.15, 1.9]}
            intensity={1.15}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <spotLight position={[-2.2, 2.2, 2.4]} intensity={0.62} angle={0.38} penumbra={0.45} />

          <MonitorModel />
          <KeyboardModel />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.02, 0]} receiveShadow>
            <planeGeometry args={[8, 8]} />
            <meshStandardMaterial color="#09131d" roughness={0.92} metalness={0.06} />
          </mesh>

          <OrbitControls
            target={MONITOR_TUNING.orbitTarget}
            minDistance={MONITOR_TUNING.orbitMinDistance}
            maxDistance={MONITOR_TUNING.orbitMaxDistance}
            minPolarAngle={MONITOR_TUNING.orbitMinPolarAngle}
            maxPolarAngle={MONITOR_TUNING.orbitMaxPolarAngle}
            enablePan={false}
          />
        </Canvas>
      </div>
    </div>
  );
}

useGLTF.preload("/models/monitor.glb");
useGLTF.preload("/models/KeyboardFIX.glb");
