import * as THREE from "three";

let renderer;

export function ThreeRenderer(){
    
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
    
    return renderer;
}   