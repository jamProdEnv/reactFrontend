import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ThreeRenderer } from "../component/threeComponent/ThreeRenderer";

export function useThreeScene(initScene) {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const sceneRef = useRef(null);

  // store the resize function
  const resizeRef = useRef(() => {});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = ThreeRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
    //   container.clientWidth / container.clientHeight,
    1,
      0.1,
      1000
    );

    sceneRef.current = { scene, camera, renderer };

    // Resize function
    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
    //   camera.aspect = width / height;
    camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(400, 400, false);
    };
    resizeRef.current = resize;

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let cleanupFn;

    // Async scene setup
    const setup = async () => {
      cleanupFn = await initScene({
        scene,
        camera,
        renderer,
        animationRef,
      });
      resize(); // ensure correct size after scene is ready
    };

    setup();

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();

      if (typeof cleanupFn === "function") cleanupFn();

      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);

      renderer.dispose();
      sceneRef.current = null;
      animationRef.current = null;
      mountRef.current = null;
    };
  }, [initScene]);

  // Expose manual resize
  const triggerResize = () => resizeRef.current?.();

  return { mountRef, animationRef, sceneRef, triggerResize };
}