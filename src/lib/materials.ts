import * as THREE from 'three';

export function createPhoneMaterials(videoElement?: HTMLVideoElement) {
  const materials = {
    metallic: new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 1.0,
      roughness: 0.684,
    }),
    schwarzGlass: new THREE.MeshStandardMaterial({
      color: 0x1e1818,
      metalness: 1.0,
      roughness: 0.684,
    }),
    screen: new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.1,
      metalness: 0.1,
    }),
    cameraMat: new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 1.0,
      roughness: 0.684,
    }),
    default: new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0,
      roughness: 1.0,
    }),
  };

  let videoTexture: THREE.VideoTexture | null = null;

  if (videoElement) {
    videoTexture = new THREE.VideoTexture(videoElement);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;
    videoTexture.colorSpace = THREE.SRGBColorSpace;

    materials.screen = new THREE.MeshStandardMaterial({
      map: videoTexture,
      roughness: 0.1,
      metalness: 0.1,
      emissive: 0xffffff,
      emissiveMap: videoTexture,
      emissiveIntensity: 0.3,
    });
  }

  return { materials, videoTexture };
}