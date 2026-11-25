import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./GamingScene.css";

export default function GamingScene() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2("#070b1b", 0.055);

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 0.25, 8.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight("#8294ff", 1.25));
    const cyanLight = new THREE.PointLight("#00d9ff", 42, 18);
    cyanLight.position.set(4, 3, 4);
    scene.add(cyanLight);
    const violetLight = new THREE.PointLight("#8b42ff", 48, 18);
    violetLight.position.set(-4, -2, 2);
    scene.add(violetLight);

    const arena = new THREE.Group();
    scene.add(arena);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 2),
      new THREE.MeshStandardMaterial({
        color: "#101b43", emissive: "#4d22d8", emissiveIntensity: 1.25,
        metalness: 0.82, roughness: 0.2, wireframe: true
      })
    );
    arena.add(core);

    const ringMaterialA = new THREE.MeshBasicMaterial({ color: "#00eaff" });
    const ringMaterialB = new THREE.MeshBasicMaterial({ color: "#a855f7" });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.018, 12, 140), ringMaterialA);
    ringA.rotation.x = Math.PI / 2.4;
    arena.add(ringA);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.012, 10, 140), ringMaterialB);
    ringB.rotation.set(0.75, 0.25, 0.4);
    arena.add(ringB);

    const crystalGeometry = new THREE.OctahedronGeometry(0.34, 0);
    const crystal = new THREE.Mesh(crystalGeometry, new THREE.MeshStandardMaterial({
      color: "#00d9ff", emissive: "#00aacc", emissiveIntensity: 2.2, metalness: 0.7
    }));
    crystal.position.set(2.45, 0.9, 0.1);
    arena.add(crystal);

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.48, 0.48),
      new THREE.MeshStandardMaterial({ color: "#9c5cff", emissive: "#762dff", emissiveIntensity: 1.6, wireframe: true })
    );
    cube.position.set(-2.25, -0.85, 0.2);
    arena.add(cube);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 550;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 13;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: "#8ceeff", size: 0.025, transparent: true, opacity: 0.85 })
    );
    scene.add(particles);

    const grid = new THREE.GridHelper(18, 34, "#174d91", "#12234a");
    grid.position.y = -2.35;
    grid.material.transparent = true;
    grid.material.opacity = 0.22;
    scene.add(grid);

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.42;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.28;
    };
    host.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    let frame = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;
      arena.rotation.y = elapsed * 0.12 + pointerX;
      arena.rotation.x = Math.sin(elapsed * 0.32) * 0.08 + pointerY;
      ringA.rotation.z += 0.0018;
      ringB.rotation.y -= 0.0013;
      crystal.position.y = 0.9 + Math.sin(elapsed * 1.7) * 0.16;
      crystal.rotation.x += 0.006;
      crystal.rotation.y += 0.009;
      cube.rotation.x += 0.006;
      cube.rotation.y -= 0.008;
      particles.rotation.y = elapsed * 0.012;
      camera.position.x += (pointerX * 1.3 - camera.position.x) * 0.012;
      camera.position.y += ((0.25 - pointerY * 1.3) - camera.position.y) * 0.012;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="gaming-scene" ref={hostRef} role="img" aria-label="Interactive futuristic neon 3D esports arena" />;
}
