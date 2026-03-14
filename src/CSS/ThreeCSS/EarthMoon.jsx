import * as THREE from "three";
import { useThreeScene } from "../../hooks/useThreeScene";
export function EarthMoon(){
    const { mountRef, animationRef, sceneRef} = useThreeScene(({scene, camera, renderer}) => {
      
        scene.background = new THREE.Color(0x000000);

        camera.position.set(0, 10, 0);
        camera.lookAt(0, 0, 0);
        scene

        // Light (required for MeshStandardMaterial)
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(5, 5, 5);
      scene.add(light);

        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const material = new THREE.MeshStandardMaterial({color: blue});
        const mesh = new THREE.Mesh(geometry, material);

        // Axial tilt (23.5 degrees)
        mesh.rotation.z = THREE.MathUtils.degToRad(23.5)

           // 1 full rotation in 24 seconds
    const ROTATION_SPEED = (2 * Math.PI) / 24
    const clock = new THREE.Clock()
        function animate() {
            animationRef.current = requestAnimationFrame(animate());

            const delta = clock.getDelta();
            mesh.rotation.y += ROTATION_SPEED * delta;
            renderer.render(scene, camera);
        }
        animate();


        return () => {
            cancelAnimationFrame(animationRef.current);
            geometry.dispose();
            material.dispose();
            
        }
    })

      return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
}