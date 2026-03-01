import { useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import RAPIER from "@dimforge/rapier3d-compat";
import classes from "../../CSS/ThreeCSS/Dominos.module.css";
import { useThreeScene } from "../../hooks/useThreeScene";

// import { memo } from "react";

export function DominoPhysics() {
  // --- Animation reference used to cancel requestAnimationFrame ---
  const animationRef = useRef(null);

  // --- Physics world reference to reset / clean up physics ---
  const worldRef = useRef(null);

  // --- Reset trigger for scene ---
  const [resetFlag, setResetFlag] = useState(0);

  // --- Initialize scene via useThreeScene ---
  const initScene = useCallback(
    async ({ scene, camera, renderer, animationRef }) => {
      // --- Cancel previous animation ---
      // if (animationRef.current) cancelAnimationFrame(animationRef.current);

      // --- Dispose previous world ---
      // if (worldRef.current) worldRef.current = null;

      // --- Initialize physics ---
      await RAPIER.init();
      const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
      worldRef.current = world; // store reference for cleanup

      scene.background = new THREE.Color(0x202020);
      // --- Camera setup ---
      // camera.position.set(-1.5, 4, -4);
      camera.position.set(0, 5, 8);
      // camera.position.x = 3;
      // camera.position.y = 2;
      // camera.position.z = 7;
      // camera.lookAt(1, -1, -4)
      camera.lookAt(0, 0, 0);

      // --- Renderer setup ---
      renderer.physicallyCorrectLights = true;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // --- Lights ---
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(5, 10, 5);
      dirLight.castShadow = true;
      scene.add(dirLight);

      scene.add(new THREE.AmbientLight(0xffffff, 0.4));

      // --- Controls ---
      // new OrbitControls(camera, renderer.domElement);

      // --- Arena ---
      const arena = createArena();
      scene.add(arena);
      arena.children.forEach((mesh) => createFloor(mesh, world));

      // --- Dominos ---
      const dominosGroup = createDominos();
      scene.add(dominosGroup);
      dominosGroup.children.forEach((mesh, idx) =>
        createDomino(mesh, idx === 0, world, dominosGroup.children[idx + 1])
      );

      // --- Animate loop ---
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);

        world.step(); // step physics simulation

        // Update Three.js mesh positions from physics bodies
        dominosGroup.children.forEach((domino) => {
          const body = domino.userData.rigidBody;
          const pos = body.translation();
          const rot = body.rotation();
          domino.position.set(pos.x, pos.y, pos.z);
          domino.quaternion.set(rot.x, rot.y, rot.z, rot.w);
        });

        renderer.render(scene, camera);
      };
      animate();

      // --- Cleanup on unmount or reset ---
      return () => {
        cancelAnimationFrame(animationRef.current);

        // Dispose domino meshes
        dominosGroup.children.forEach((domino) => {
          scene.remove(domino);
          domino.geometry?.dispose?.();
          domino.material?.dispose?.();
        });

        // --- Dispose world ---
        worldRef.current = null;

        // --- Commented-out data you wanted to keep ---
        // if (animationRef.current) cancelAnimationFrame(animationRef.current);
        // if (worldRef.current) worldRef.current = null;
        // scene = new THREE.Scene();
        // camera = new THREE.PerspectiveCamera(...);
        // renderer = new THREE.WebGLRenderer(...);
      };
    },
    []
  );

  const { mountRef } = useThreeScene(initScene);

  return (
    <div className={classes.container }>
      {/* Reset button */}
      {/* <button
        className={classes.resize}
        onClick={
          () => setResetFlag((f) => f + 1)
        
        }
      >
        Reset
      </button> */}

      {/* Three.js container */}
      <div className={classes.threeCanvas} ref={mountRef}  />
    </div>
  );
}

// --- Helper functions ---
function createArena() {
  const mat = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(
      "/assets/textures/wood/floor-parquet-pattern-172292.jpg"
    ),
  });

  const arena = new THREE.Group();
  const ground = new THREE.Mesh(new THREE.BoxGeometry(6, 0.2, 6), mat);
  ground.castShadow = true;
  ground.receiveShadow = true;
  arena.add(ground);

  const walls = [
    new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 6), mat),
    new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 6), mat),
    new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.3, 0.2), mat),
    new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.3, 0.2), mat),
  ];

  walls[0].position.set(-3.1, 0.2, 0);
  walls[1].position.set(3.1, 0.2, 0);
  walls[2].position.set(0, 0.2, 3);
  walls[3].position.set(0, 0.22, -3);

  walls.forEach((w) => {
    w.castShadow = true;
    w.receiveShadow = true;
    arena.add(w);
  });

  return arena;
}

// function createDominos() {
//   const group = new THREE.Group();

//   const r = 2.8;
//   let circleOffset = 0;

//   for (let i = 0; i < 1200; i += 6 + circleOffset) {
//     circleOffset = 1.5 * (i / 360);
//     const x = (r / 1440) * (1440 - i) * Math.cos((i * Math.PI) / 180);
//     const z = (r / 1440) * (1440 - i) * Math.sin((i * Math.PI) / 180);

//     const geom = new THREE.BoxGeometry(0.05, 0.5, 0.2);
//     const mesh = new THREE.Mesh(
//       geom,
//       new THREE.MeshStandardMaterial({
//         color: i % 2 === 0 ? 0x66ff00 : 0x6600ff,
//         transparent: true,
//         opacity: 0.8,
//       })
//     );
//     mesh.position.set(x, 0.35, z);
//     mesh.lookAt(0, 0, 0);
//     mesh.castShadow = true;
//     mesh.receiveShadow = true;

//     group.add(mesh);
//   }

//   return group;
// }

  // function createDominos() {
  //     const group = new THREE.Group();
  //     const geometry = new THREE.BoxGeometry(0.05, 0.5, 0.2);

  //     const count = 120;
  //     const radius = 2.8;

  //     for (let i = 0; i < count; i++) {
  //       const angle = (i / count) * Math.PI * 2;

  //       const x = radius * Math.cos(angle);
  //       const z = radius * Math.sin(angle);

  //       const mesh = new THREE.Mesh(
  //         geometry,
  //         new THREE.MeshStandardMaterial({
  //           color: i % 2 === 0 ? 0x66ff00 : 0x6600ff,
  //         }),
  //       );

  //       mesh.position.set(x, 0.35, z);

  //       // Make domino face center
  //       mesh.lookAt(0, 0, 0);

  //       mesh.castShadow = true;

  //       group.add(mesh);
  //     }

  //     return group;
  //   }
  function createDominos() {
  const group = new THREE.Group();
  const r = 2.8;
  const points = [];
  let circleOffset = 0;

  for (let i = 0; i < 1200; i += 6 + circleOffset) {
    circleOffset = 1.5 * (i / 360);
    const x = (r / 1440) * (1440 - i) * Math.cos((i * Math.PI) / 180);
    const z = (r / 1440) * (1440 - i) * Math.sin((i * Math.PI) / 180);
    points.push(new THREE.Vector3(x, 0, z));
  }

  points.forEach((p, idx) => {
    const geom = new THREE.BoxGeometry(0.05, 0.5, 0.2);
    const mesh = new THREE.Mesh(
      geom,
      new THREE.MeshStandardMaterial({
        color: idx % 2 === 0 ? 0x66ff00 : 0x6600ff,
        transparent: true,
        opacity: 0.8,
      })
    );
    mesh.position.copy(p);
    mesh.lookAt(0, 0, 0);
    mesh.position.y = 0.35;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  });

  return group;
}

function createFloor(mesh, world) {
  const pos = mesh.position;
  const body = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(pos.x, pos.y, pos.z)
  );
  const { width, height, depth } = mesh.geometry.parameters;
  const collider = RAPIER.ColliderDesc.cuboid(width / 2, height / 2, depth / 2);
  world.createCollider(collider, body);
  mesh.userData.rigidBody = body;
}

function createDomino(mesh, isFirst, world, nextDomino) {
  const pos = mesh.position;
  const quat = new THREE.Quaternion().setFromEuler(mesh.rotation);

  const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(pos.x, pos.y, pos.z)
    .setRotation({ x: quat.x, y: quat.y, z: quat.z, w: quat.w })
    .setGravityScale(1)
    .setCanSleep(true);

  const body = world.createRigidBody(bodyDesc);
  const { width, height, depth } = mesh.geometry.parameters;
  const collider = RAPIER.ColliderDesc.cuboid(width / 2, height / 2, depth / 2);
  world.createCollider(collider, body);

  mesh.userData.rigidBody = body;

  if (isFirst && nextDomino) {
    const tangent = new THREE.Vector3()
      .subVectors(nextDomino.position, pos)
      .normalize();
    body.applyImpulse({ x: tangent.x * 0.03, y: 0, z: tangent.z * 0.03 }, true);
  }
}
// export default memo(DominoPhysics);