import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PHONE_CONFIG } from './phoneConfig';
import { createPhoneMaterials } from './materials';

gsap.registerPlugin(ScrollTrigger);

export class ThreeScene {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private phoneGroup: THREE.Group;
  private scrollProgress: number = 0;
  private animationId: number = 0;
  private videoElement: HTMLVideoElement | null = null;
  private refs: {
    screen: THREE.Mesh | null;
    cameraModule: THREE.Group | null;
  } = { screen: null, cameraModule: null };

  constructor(private container: HTMLElement) {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 8);

    // Lumières
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    this.scene.add(dirLight);
    const dirLight2 = new THREE.DirectionalLight(0x4444ff, 0.5);
    dirLight2.position.set(-5, 3, -5);
    this.scene.add(dirLight2);

    // Groupe téléphone
    this.phoneGroup = new THREE.Group();
    this.scene.add(this.phoneGroup);

    // Resize
    window.addEventListener('resize', this.handleResize);
  }

  async loadModel(modelPath: string, videoPath: string): Promise<void> {
    // Vidéo
    this.videoElement = document.createElement('video');
    this.videoElement.src = videoPath;
    this.videoElement.crossOrigin = 'anonymous';
    this.videoElement.loop = true;
    this.videoElement.muted = true;
    this.videoElement.playsInline = true;
    this.videoElement.preload = 'auto';

    await new Promise<void>((resolve) => {
      this.videoElement!.addEventListener('loadeddata', () => resolve(), { once: true });
      // Fallback timeout
      setTimeout(resolve, 3000);
    });

    // Charger GLB
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(modelPath);
    const scene = gltf.scene;

    // Matériaux
    const { materials, videoTexture } = createPhoneMaterials(this.videoElement);

    // Traverser et configurer
    scene.traverse((child) => {
      const name = child.name;

      if (child instanceof THREE.Mesh && name === PHONE_CONFIG.screen.meshName) {
        this.refs.screen = child;
        child.material = materials.screen;
        child.scale.y = PHONE_CONFIG.screen.scaleY;
      } else if (name === PHONE_CONFIG.camera.groupName) {
        const cameraGroup = child as THREE.Group;
        this.refs.cameraModule = cameraGroup;
        cameraGroup.traverse((c) => {
          if (c instanceof THREE.Mesh) c.material = materials.cameraMat;
        });
      } else if (child instanceof THREE.Mesh && Object.values(PHONE_CONFIG.buttons).some(b => b.mesh === name)) {
        child.material = materials.metallic;
      } else if (child instanceof THREE.Mesh && name === PHONE_CONFIG.connector.mesh) {
        child.material = materials.metallic;
      } else if (child instanceof THREE.Mesh) {
        child.material = materials.schwarzGlass;
      }
    });

    // Configurer le groupe root
    this.phoneGroup.add(scene);
    this.phoneGroup.scale.setScalar(PHONE_CONFIG.root.scale);
    this.phoneGroup.rotation.y = Math.PI / 2;
    this.phoneGroup.position.set(
      PHONE_CONFIG.root.position.x,
      PHONE_CONFIG.root.position.y,
      PHONE_CONFIG.root.position.z
    );

    // Animation d'entrée
    gsap.from(this.phoneGroup.scale, {
      x: 0, y: 0, z: 0,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)',
    });

    // Timeline scroll
    this.createScrollTimeline();

    // Démarrer la boucle
    this.animate();
  }

  private createScrollTimeline(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          this.scrollProgress = self.progress;
        },
      },
    });

    // Séquence 1 : Apparition (0-25%)
    tl.fromTo(this.phoneGroup.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, ease: 'back.out(1.7)', duration: 0.25 }, 0);
    tl.fromTo(this.phoneGroup.position, { y: -2 }, { y: 0, ease: 'power2.out', duration: 0.25 }, 0);

    // Séquence 2 : Réduction + gauche (25-50%)
    tl.to(this.phoneGroup.scale, { x: 0.6, y: 0.6, z: 0.6, ease: 'power2.inOut', duration: 0.25 }, 0.25);
    tl.to(this.phoneGroup.position, { x: -2.5, y: 0, z: 0, ease: 'power2.inOut', duration: 0.25 }, 0.25);
    tl.to(this.phoneGroup.rotation, { x: Math.PI / 2 + Math.PI * 2, y: 0, z: 0, ease: 'power2.inOut', duration: 0.25 }, 0.25);

    // Séquence 3 : Basculement (50-75%)
    tl.to(this.phoneGroup.position, { x: 2.5, y: 0, z: 0, ease: 'power2.inOut', duration: 0.25 }, 0.5);
    tl.to(this.phoneGroup.rotation, { x: Math.PI / 2, y: Math.PI, z: 0, ease: 'power2.inOut', duration: 0.25 }, 0.5);

    // Séquence 4 : Retour + disparition (75-100%)
    tl.to(this.phoneGroup.position, { x: 0, y: 0, z: 0, ease: 'power2.inOut', duration: 0.25 }, 0.75);
    tl.to(this.phoneGroup.rotation, { x: Math.PI / 2, y: Math.PI * 2, z: 0, ease: 'power2.inOut', duration: 0.25 }, 0.75);
    tl.to(this.phoneGroup.scale, { x: 1, y: 1, z: 1, ease: 'power2.inOut', duration: 0.25 }, 0.75);
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    // Synchroniser vidéo
    if (this.videoElement && this.refs.screen) {
      const progress = this.scrollProgress;
      if (progress > 0.05 && progress < 0.95) {
        if (this.videoElement.paused) this.videoElement.play().catch(() => {});
        if (this.videoElement.duration) {
          this.videoElement.currentTime = progress * this.videoElement.duration;
        }
      } else {
        if (!this.videoElement.paused) this.videoElement.pause();
      }
    }

    this.renderer.render(this.scene, this.camera);
  };

  private handleResize = (): void => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  destroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.handleResize);
    ScrollTrigger.getAll().forEach(t => t.kill());
    this.renderer.dispose();
    this.container.removeChild(this.renderer.domElement);
  }
}