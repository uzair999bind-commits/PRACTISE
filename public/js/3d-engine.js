/**
 * 3D Engine - Full Page Interactive 3D WebGL Showroom Renderer for UZair Showroom
 */

class Engine3D {
  constructor() {
    this.heroContainer = null;
    this.heroScene = null;
    this.heroCamera = null;
    this.heroRenderer = null;
    this.heroBikeGroup = null;
    this.heroParticles = null;

    // Global Background 3D Animation State
    this.globalCanvas = null;
    this.globalScene = null;
    this.globalCamera = null;
    this.globalRenderer = null;
    this.globalParticles = null;
    this.globalGrid = null;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollY = 0;
    this.isInitialized = false;
  }

  initHero() {
    this.heroContainer = document.getElementById('hero-3d-container');
    if (!this.heroContainer || typeof THREE === 'undefined') return;

    this.heroContainer.innerHTML = '';
    const width = this.heroContainer.clientWidth || window.innerWidth;
    const height = this.heroContainer.clientHeight || window.innerHeight;

    // 1. Scene & Atmosphere Fog
    this.heroScene = new THREE.Scene();
    this.heroScene.fog = new THREE.FogExp2(0x050508, 0.02);

    // 2. Camera
    this.heroCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    this.heroCamera.position.set(0, 1.8, 6.8);
    this.heroCamera.lookAt(0, 0.6, 0);

    // 3. WebGL Renderer with Precision Shadowing
    this.heroRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.heroRenderer.setSize(width, height);
    this.heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.heroRenderer.shadowMap.enabled = true;
    this.heroRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.heroContainer.appendChild(this.heroRenderer.domElement);

    // 4. Luxury Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.heroScene.add(ambientLight);

    // Warm Gold Spotlight (Key)
    const goldLight = new THREE.SpotLight(0xc5a059, 5);
    goldLight.position.set(5, 8, 6);
    goldLight.angle = Math.PI / 4;
    goldLight.penumbra = 0.8;
    goldLight.castShadow = true;
    this.heroScene.add(goldLight);

    // Cyan Rim Light
    const cyanLight = new THREE.SpotLight(0x00f0ff, 4);
    cyanLight.position.set(-6, 7, -5);
    cyanLight.angle = Math.PI / 4;
    cyanLight.penumbra = 0.9;
    this.heroScene.add(cyanLight);

    // Overhead Studio Soft Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(0, 10, 8);
    this.heroScene.add(keyLight);

    // 5. Polished Black Marble Floor Disc & Grid
    const floorGeo = new THREE.CircleGeometry(14, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x060608,
      roughness: 0.08,
      metalness: 0.92
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    this.heroScene.add(floor);

    const gridHelper = new THREE.GridHelper(30, 40, 0xc5a059, 0x181b22);
    gridHelper.position.y = 0;
    this.heroScene.add(gridHelper);

    // 6. Photorealistic High-Definition 3D Studio Showcase Object
    this.heroBikeGroup = this.createPhotorealisticHeroMesh();
    this.heroScene.add(this.heroBikeGroup);

    // 7. Floating Dust Particles
    this.heroParticles = this.createParticleSystem();
    this.heroScene.add(this.heroParticles);

    // Also initialize full page background 3D WebGL animation
    this.initGlobalBackgroundAnimation();

    // Mouse Parallax & Scroll Listeners
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY || window.pageYOffset;
    });

    window.addEventListener('resize', () => this.onWindowResize());

    this.animateHero();
    this.isInitialized = true;
  }

  initGlobalBackgroundAnimation() {
    this.globalCanvas = document.getElementById('global-3d-bg-canvas');
    if (!this.globalCanvas || typeof THREE === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.globalScene = new THREE.Scene();
    this.globalScene.fog = new THREE.FogExp2(0x050508, 0.015);

    this.globalCamera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.globalCamera.position.set(0, 5, 15);
    this.globalCamera.lookAt(0, 0, 0);

    this.globalRenderer = new THREE.WebGLRenderer({ canvas: this.globalCanvas, alpha: true, antialias: true });
    this.globalRenderer.setSize(width, height);
    this.globalRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Full Page 3D Animated Metallic Grid
    this.globalGrid = new THREE.GridHelper(80, 80, 0xc5a059, 0x1c202b);
    this.globalGrid.position.y = -2;
    this.globalScene.add(this.globalGrid);

    // Ambient Floating Gold & Silver Particles
    const pCount = 500;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 40;
      pPos[i + 1] = (Math.random() - 0.5) * 30;
      pPos[i + 2] = (Math.random() - 0.5) * 40;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xc5a059,
      size: 0.08,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });

    this.globalParticles = new THREE.Points(pGeo, pMat);
    this.globalScene.add(this.globalParticles);

    const goldSpot = new THREE.PointLight(0xc5a059, 3, 30);
    goldSpot.position.set(0, 10, 0);
    this.globalScene.add(goldSpot);
  }

  createPhotorealisticHeroMesh() {
    const group = new THREE.Group();

    // 3D Metallic Pedestal Platform Ring
    const ringGeo = new THREE.RingGeometry(1.4, 1.6, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc5a059,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(0, 0.01, 0);
    group.add(ring);

    // Inner Glowing Specular Disc
    const innerDiscGeo = new THREE.CircleGeometry(1.35, 64);
    const innerDiscMat = new THREE.MeshStandardMaterial({
      color: 0x11131a,
      metalness: 0.95,
      roughness: 0.05
    });
    const innerDisc = new THREE.Mesh(innerDiscGeo, innerDiscMat);
    innerDisc.rotation.x = -Math.PI / 2;
    innerDisc.position.set(0, 0.02, 0);
    group.add(innerDisc);

    return group;
  }

  // Safeguard: legacy method re-alias so blocky shapes can NEVER be created
  createDetailedMotorcycleMesh() {
    return this.createPhotorealisticHeroMesh();
  }

  createParticleSystem() {
    const particleCount = 300;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = Math.random() * 9;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xc5a059,
      size: 0.06,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    return new THREE.Points(geometry, material);
  }

  animateHero() {
    requestAnimationFrame(() => this.animateHero());

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // 1. Hero 3D Scene Animation
    if (this.heroScene && this.heroRenderer) {
      if (this.heroBikeGroup) {
        this.heroBikeGroup.rotation.y = this.mouse.x * 0.3;
        this.heroBikeGroup.rotation.x = this.mouse.y * 0.1;
      }
      if (this.heroParticles) {
        this.heroParticles.rotation.y += 0.0012;
      }
      this.heroRenderer.render(this.heroScene, this.heroCamera);
    }

    // 2. Global Background 3D Canvas Animation across the full website!
    if (this.globalScene && this.globalRenderer) {
      if (this.globalParticles) {
        this.globalParticles.rotation.y += 0.0008;
        this.globalParticles.rotation.x = Math.sin(Date.now() * 0.0005) * 0.05;
      }
      if (this.globalGrid) {
        this.globalGrid.position.z = (Date.now() * 0.002) % 1;
        this.globalGrid.rotation.y = this.mouse.x * 0.08;
      }
      this.globalCamera.position.y = 5 + (this.scrollY * 0.002);
      this.globalRenderer.render(this.globalScene, this.globalCamera);
    }
  }

  initModalBGCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof THREE === 'undefined') return;

    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 5);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);

    const particles = this.createParticleSystem();
    scene.add(particles);

    const grid = new THREE.GridHelper(10, 20, 0xc5a059, 0x181b22);
    grid.position.y = -0.5;
    scene.add(grid);

    const render = () => {
      if (!document.getElementById(canvasId)) return;
      particles.rotation.y += 0.003;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };
    render();
  }

  onWindowResize() {
    if (this.heroContainer && this.heroCamera && this.heroRenderer) {
      const width = this.heroContainer.clientWidth;
      const height = this.heroContainer.clientHeight;
      this.heroCamera.aspect = width / height;
      this.heroCamera.updateProjectionMatrix();
      this.heroRenderer.setSize(width, height);
    }

    if (this.globalCanvas && this.globalCamera && this.globalRenderer) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.globalCamera.aspect = width / height;
      this.globalCamera.updateProjectionMatrix();
      this.globalRenderer.setSize(width, height);
    }
  }
}

window.engine3D = new Engine3D();
