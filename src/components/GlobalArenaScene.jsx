import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./GlobalArenaScene.css";

// Lightweight ambient 3D layer shared by every route. Content remains above it.
export default function GlobalArenaScene() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(host.clientWidth || window.innerWidth, host.clientHeight || window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x83ffb2, 0.8));
    const glow = new THREE.PointLight(0x00ff83, 16, 30);
    glow.position.set(-5, 3, 5);
    scene.add(glow);

    const group = new THREE.Group();
    scene.add(group);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x16e879, transparent: true, opacity: 0.19, wireframe: true });
    for (let i = 0; i < 5; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.4 + i * 0.58, 0.006, 6, 100), ringMaterial.clone());
      ring.rotation.set(0.5 + i * 0.16, 0.3, i * 0.3);
      ring.position.set(i % 2 ? 5.2 : -5.2, i % 2 ? 2.5 : -2.5, -5 - i * 0.3);
      group.add(ring);
    }

    const count = 380;
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 24;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 16;
      coords[i * 3 + 2] = -2 - Math.random() * 13;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(coords, 3));
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0x6dffad, size: 0.025, transparent: true, opacity: 0.42 }));
    scene.add(particles);

    let frame = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.rotation.y = Math.sin(t * 0.08) * 0.08;
      group.rotation.x = Math.cos(t * 0.06) * 0.04;
      particles.rotation.y = t * 0.004;
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", resize);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      scene.traverse((obj) => {
        obj.geometry?.dispose();
        if (obj.material) (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach((m) => m.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="global-arena-scene" ref={hostRef} aria-hidden="true" />;
}
