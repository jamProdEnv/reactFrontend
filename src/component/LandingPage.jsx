import { useEffect, useRef } from "react";
import * as THREE from "three";
export function LandingPage() {
  const mountRef = useRef(null);
  const initialized = useRef(false); // ⬅️ flag
  const sceneRef = useRef(null); // store scene globally for the button
  useEffect(() => {
    if (initialized.current) return; // already ran
    initialized.current = true;
    const container = mountRef.current;
    //  Create A Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      // container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );

    // NEW: Move the camera back and up so it can actually see the floor
    camera.position.set(0, 5, 8);

    // NEW: Aim the camera at the center of the scene
    camera.lookAt(0, 0, 0);
    // camera.aspect = container.clientWidth / container.clientHeight;
    // camera.updateProjectionMatrix();

    //  Create A Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // NEW: Set the renderer size to fill the window
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setSize(container.clientWidth, container.clientHeight);

    // NEW: Improve sharpness on high-DPI displays
    renderer.setPixelRatio(window.devicePixelRatio);
    // container.appendChild(renderer.domElement);

    // NEW: Attach the renderer's <canvas> to the DOM
    // Without this, nothing will appear on screen
    mountRef.current.appendChild(renderer.domElement);

    //  Create a scene
    const scene = new THREE.Scene();
    new THREE.WebGLRenderer({ alpha: true });
    sceneRef.current = scene;
    //  Remove any background by setting the background to null
    scene.background = null;
    //  If you want a simple color, just set the background to a color
    scene.background = new THREE.Color(0x44ff44);

    const textureLoader = new THREE.TextureLoader();

    //  Create The lights
    scene.add(new THREE.AmbientLight(0x666666));
    scene.add(new THREE.DirectionalLight(0xaaaaaa));

    //  Create the floor
    // const geo = new THREE.BoxBufferGeometry(10, 0.25, 10, 10, 10, 10);
    const geo = new THREE.BoxGeometry(10, 0.25, 10, 10, 10, 10);
    // const geo = new THREE.PlaneGeometry(10, 10);

    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geo, mat);
    // mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    // NEW: Animation loop
    // This runs every frame (~60 times per second)
    // Even for a static scene, Three.js must be told to render repeatedly
    const animate = () => {
      renderer.render(scene, camera); // Draw the scene from the camera's view
      requestAnimationFrame(animate); // Schedule the next frame
    };
    animate();

    // NEW: Cleanup when the component unmounts
    // Prevents memory leaks when navigating away
    return () => {
      // if (container && renderer.domElement.parentNode === container) {
      //   container.removeChild(renderer.domElement);
      // }
      if (
        mountRef.current &&
        renderer.domElement.parentNode === mountRef.current
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  const addCube = () => {
    const scene = sceneRef.current;

    if (!scene) return;

    // const color = randomColor();
    const color = new THREE.Color(Math.random(), Math.random(), Math.random());

    // const pos = randomVector({
    //   xRange: { fromX: -4, toX: 4 },
    //   yRangge: { fromY: -3, toY: 3 },
    //   zRange: { fromZ: -4, toZ: 4 },
    // });

    // const rotation = randomVector({
    //   xRange: { fromX: 0, toX: Math.PI * 2 },
    //   yRange: { fromY: 0, toY: Math.PI * 2 },
    //   zRange: { fromZ: 0, toZ: Math.PI * 2 },
    // });

    const pos = new THREE.Vector3(
      Math.random() * 8 - 4,
      Math.random() * 4,
      Math.random() * 8 - 4,
    );
    const rotation = new THREE.Vector3(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    );

    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.1,
      metalness: 0.9,
    });
    const cube = new THREE.Mesh(geometry, cubeMaterial);
    cube.position.copy(pos);
    cube.rotation.setFromVector3(rotation);
    cube.castShadow = true;
    scene.add(cube);
  };

  const removeCube = () => {
    const scene = sceneRef.current;

    scene.children.pop();
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={addCube}>Add Cube</button>
      <button onClick={removeCube}>Remove Cube</button>
      <div ref={mountRef} />
    </div>
  );
}
