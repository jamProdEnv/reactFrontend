import * as THREE from "three";

let renderer;

export function ThreeRenderer(){
    
        renderer = new THREE.WebGLRenderer({ antialias: true });
        // renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.setClearColor(0x000000, 0);
    return renderer;
}   