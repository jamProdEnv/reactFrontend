import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ThreeRenderer } from "../component/threeComponent/ThreeRenderer";

export function useThreeScene(initScene) {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = ThreeRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    sceneRef.current = { scene, camera, renderer };

    // Resize observer
    const resize = () => {
    //   const { width, height } = container.getBoundingClientRect();
    const width = container.clientWidth;
    const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

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
    };

    setup();

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();

      if (typeof cleanupFn === "function") {
        cleanupFn();
      }

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      sceneRef.current = null;
      animationRef.current = null;
      mountRef.current = null;
    };
  }, [initScene]);

  return { mountRef, animationRef, sceneRef };
}