import * as THREE from "three";
import { useRef } from "react";
import raindropTexture from "../../assets/textures/particles/raindrop-3t.png";
import classes from "../../CSS/ThreeCSS/Sprite.module.css";
import { useThreeScene } from "../../hooks/useThreeScene";

export function Sprite() {
  const pointsRef = useRef(null);
  const { mountRef, animationRef, sceneRef } = useThreeScene(({ scene, camera, renderer  }) => {
    
    camera.position.set(-3, 2, 8);

    const count = 25000;
    const range = 20;

    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 2);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = Math.random() * range - range / 2;
      positions[i * 3 + 1] = Math.random() * range - range / 2;
      positions[i * 3 + 2] = Math.random() * range - range / 2;

      velocities[i * 2] = ((Math.random() - 0.5) / 5) * 0.01;
      velocities[i * 2 + 1] = Math.random() * 0.05 + 0.01;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 2));

    // const pointsRef = { current: null };

    new THREE.TextureLoader().load(raindropTexture, (texture) => {
      const material = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xffffff,
        map: texture,
        transparent: true,
        opacity: 0.8,
        alphaTest: 0.01,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      pointsRef.current = points;

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);

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

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (pointsRef.current) {
        scene.remove(pointsRef.current);
        pointsRef.current.geometry.dispose();
        pointsRef.current.material.dispose();
      }
      geometry.dispose();
    };
  });

  return (
    <div className={classes.container}>
      <div ref={mountRef} className={classes.threeCanvas} />
    </div>
  );
}
