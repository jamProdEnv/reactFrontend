import { useEffect, useRef } from "react";
import raindropTexture from "../../assets/textures/particles/raindrop-3t.png";
import * as THREE from "three";
import classes from "../../CSS/ThreeCSS/Sprite.module.css";

// --- Module-level persistent references ---
// These survive React Fast Refresh & Strict Mode remounts
let scene, camera, renderer;
let points, geometry, material;
let animationId;

export function Sprite() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null); // persistent scene + camera + renderer
  const pointsRef = useRef(null); // persistent points
  const animationIdRef = useRef(null); // store requestAnimationFrame id

  useEffect(() => {
    // --- Only create scene, camera, renderer once ---
    const container = mountRef.current;
    if (!sceneRef.current) {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      scene.fog = new THREE.Fog(0x000000, 5, 25);

      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        100,
      );
      camera.position.set(-3, 2, 8);

      //  Create The Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      sceneRef.current = { scene, camera, renderer };
    }

    const { scene, camera, renderer } = sceneRef.current;

    // --- Only create points once ---
    if (!pointsRef.current) {
      const count = 25000;
      const range = 20;

      // Geometry + velocity
      //
      const positions = new Float32Array(count * 3);
      //  Defines how a particle moves horizontally and vertically
      //  Take x and y and use them to change the current position of the particle
      const velocities = new Float32Array(count * 2);
      for (let i = 0; i < count; i++) {
        //  posiiton below 0, regernate the sprite
        positions[i * 3] = Math.random() * range - range / 2;
        positions[i * 3 + 1] = Math.random() * range - range / 2;
        positions[i * 3 + 2] = Math.random() * range - range / 2;
        //  vertical velocity
        velocities[i * 2] = ((Math.random() - 0.5) / 5) * 0.01;
        //  horizontal velocity
        velocities[i * 2 + 1] = Math.random() * 0.05 + 0.01;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      geometry.setAttribute(
        "velocity",
        new THREE.BufferAttribute(velocities, 2),
      );

      // --- Load texture ---
      const loader = new THREE.TextureLoader();
      loader.load(raindropTexture, (texture) => {
        texture.needsUpdate = true;

        const material = new THREE.PointsMaterial({
          size: 0.1,
          color: 0xffffff,
          map: texture,
          transparent: true,
          opacity: 0.8,
          //  Ensure there are no weird artifacts
          alphaTest: 0.01,
          depthWrite: false,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);
        pointsRef.current = { points, geometry, material };

        // --- Animation loop ---
        const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate);

          const pos = geometry.attributes.position.array;
          const vel = geometry.attributes.velocity.array;
          for (let i = 0; i < count; i++) {
            pos[i * 3] += vel[i * 2];
            pos[i * 3 + 1] -= vel[i * 2 + 1];

            if (pos[i * 3] < -range / 2) pos[i * 3] = range / 2;
            if (pos[i * 3] > range / 2) pos[i * 3] = -range / 2;
            if (pos[i * 3 + 1] < -range / 2) pos[i * 3 + 1] = range / 2;
          }

          geometry.attributes.position.needsUpdate = true;
          renderer.render(scene, camera);
        };

        animate();
      });
    }

    // --- Responsive ---
    const onResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationIdRef.current);
      //   container.removeEventListener("resize", onResize);
      resizeObserver.disconnect();

      if (pointsRef.current) {
        pointsRef.current.geometry.dispose();
        pointsRef.current.material.dispose();
        scene.remove(pointsRef.current.points);
      }

      if (sceneRef.current) {
        sceneRef.current.renderer.dispose();
        if (
          container &&
          sceneRef.current.renderer.domElement.parentNode === container
        ) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
      }
      //    Inside of Container, These are absolutely necessary
      pointsRef.current = null;
      sceneRef.current = null;
    };
  }, []);

  return (
    <div className={classes.container}>
      <div ref={mountRef} className={classes.threeCanvas} />
    </div>
  );
}
