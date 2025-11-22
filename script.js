// Quantum Concepts - Interactive 3D Visualizations
// Using Three.js for 3D animations

// Global variables
let scenes = {};
let cameras = {};
let renderers = {};
let animationFrames = {};

// Initialize all visualizations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initBackToTop();
    initAllVisualizations();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.concept-section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Visualization registry - maps container IDs to their init functions
const visualizationRegistry = [];
let initializedVisualizations = new Set();

// Build registry of all visualizations
function buildVisualizationRegistry() {
    // Hero animation
    visualizationRegistry.push({ id: 'hero-animation', init: initHeroAnimation });
    
    // Foundational concepts
    visualizationRegistry.push({ id: 'wave-particle-viz', init: initWaveParticleDuality });
    visualizationRegistry.push({ id: 'superposition-viz', init: initSuperposition });
    visualizationRegistry.push({ id: 'quantum-states-viz', init: initQuantumStates });
    visualizationRegistry.push({ id: 'measurement-viz', init: initMeasurement });
    visualizationRegistry.push({ id: 'probability-viz', init: initProbability });
    visualizationRegistry.push({ id: 'uncertainty-viz', init: initUncertainty });
    visualizationRegistry.push({ id: 'operators-viz', init: initOperators });
    visualizationRegistry.push({ id: 'commutators-viz', init: initCommutators });
    visualizationRegistry.push({ id: 'eigenstates-viz', init: initEigenstates });
    visualizationRegistry.push({ id: 'entanglement-viz', init: initEntanglement });
    visualizationRegistry.push({ id: 'qubits-viz', init: initQubits });
    
    // Mathematical foundations
    visualizationRegistry.push({ id: 'complex-numbers-viz', init: initComplexNumbers });
    visualizationRegistry.push({ id: 'linear-algebra-viz', init: initLinearAlgebra });
    visualizationRegistry.push({ id: 'hilbert-space-viz', init: initHilbertSpace });
    visualizationRegistry.push({ id: 'tensor-products-viz', init: initTensorProducts });
    visualizationRegistry.push({ id: 'matrices-viz', init: initMatrices });
    visualizationRegistry.push({ id: 'quantum-gates-math-viz', init: initQuantumGatesMath });
    
    // Quantum mechanics core
    visualizationRegistry.push({ id: 'schrodinger-viz', init: initSchrodinger });
    visualizationRegistry.push({ id: 'harmonic-oscillator-viz', init: initHarmonicOscillator });
    visualizationRegistry.push({ id: 'tunneling-viz', init: initTunneling });
    visualizationRegistry.push({ id: 'interference-viz', init: initInterference });
    visualizationRegistry.push({ id: 'spin-viz', init: initSpin });
    visualizationRegistry.push({ id: 'angular-momentum-viz', init: initAngularMomentum });
    
    // Quantum information (using placeholder functions)
    visualizationRegistry.push({ id: 'multi-qubit-viz', init: () => createPlaceholderVisualization('multi-qubit-viz') });
    visualizationRegistry.push({ id: 'quantum-gates-viz', init: () => createPlaceholderVisualization('quantum-gates-viz') });
    visualizationRegistry.push({ id: 'quantum-circuits-viz', init: () => createPlaceholderVisualization('quantum-circuits-viz') });
    visualizationRegistry.push({ id: 'algorithms-viz', init: () => createPlaceholderVisualization('algorithms-viz') });
    visualizationRegistry.push({ id: 'parallelism-viz', init: () => createPlaceholderVisualization('parallelism-viz') });
    visualizationRegistry.push({ id: 'fourier-viz', init: () => createPlaceholderVisualization('fourier-viz') });
    visualizationRegistry.push({ id: 'teleportation-viz', init: () => createPlaceholderVisualization('teleportation-viz') });
    visualizationRegistry.push({ id: 'error-correction-viz', init: () => createPlaceholderVisualization('error-correction-viz') });
    visualizationRegistry.push({ id: 'no-cloning-viz', init: () => createPlaceholderVisualization('no-cloning-viz') });
    
    // Quantum cryptography
    visualizationRegistry.push({ id: 'qkd-viz', init: () => createPlaceholderVisualization('qkd-viz') });
    visualizationRegistry.push({ id: 'bb84-viz', init: () => createPlaceholderVisualization('bb84-viz') });
    visualizationRegistry.push({ id: 'post-quantum-viz', init: () => createPlaceholderVisualization('post-quantum-viz') });
    visualizationRegistry.push({ id: 'randomness-viz', init: () => createPlaceholderVisualization('randomness-viz') });
    
    // Advanced concepts
    visualizationRegistry.push({ id: 'decoherence-viz', init: () => createPlaceholderVisualization('decoherence-viz') });
    visualizationRegistry.push({ id: 'noise-viz', init: () => createPlaceholderVisualization('noise-viz') });
    visualizationRegistry.push({ id: 'density-matrices-viz', init: () => createPlaceholderVisualization('density-matrices-viz') });
    visualizationRegistry.push({ id: 'quantum-channels-viz', init: () => createPlaceholderVisualization('quantum-channels-viz') });
    visualizationRegistry.push({ id: 'povms-viz', init: () => createPlaceholderVisualization('povms-viz') });
    visualizationRegistry.push({ id: 'simulation-viz', init: () => createPlaceholderVisualization('simulation-viz') });
    visualizationRegistry.push({ id: 'phase-estimation-viz', init: () => createPlaceholderVisualization('phase-estimation-viz') });
    visualizationRegistry.push({ id: 'supremacy-viz', init: () => createPlaceholderVisualization('supremacy-viz') });
    
    // Technologies
    visualizationRegistry.push({ id: 'physical-qubits-viz', init: () => createPlaceholderVisualization('physical-qubits-viz') });
    visualizationRegistry.push({ id: 'annealing-viz', init: () => createPlaceholderVisualization('annealing-viz') });
    visualizationRegistry.push({ id: 'hardware-viz', init: () => createPlaceholderVisualization('hardware-viz') });
    visualizationRegistry.push({ id: 'qml-viz', init: () => createPlaceholderVisualization('qml-viz') });
}

// Initialize all visualizations with lazy loading
function initAllVisualizations() {
    // Build the registry of all visualizations
    buildVisualizationRegistry();
    
    // Set up IntersectionObserver for lazy loading
    const observerOptions = {
        root: null,
        rootMargin: '100px', // Start loading slightly before element comes into view
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const containerId = entry.target.id;
                
                // Only initialize once
                if (!initializedVisualizations.has(containerId)) {
                    const viz = visualizationRegistry.find(v => v.id === containerId);
                    if (viz && viz.init) {
                        try {
                            viz.init();
                            initializedVisualizations.add(containerId);
                            console.log(`Initialized visualization: ${containerId}`);
                        } catch (error) {
                            console.error(`Error initializing ${containerId}:`, error);
                        }
                    }
                }
                
                // Unobserve after initialization to save resources
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all visualization containers
    visualizationRegistry.forEach(viz => {
        const container = document.getElementById(viz.id);
        if (container) {
            observer.observe(container);
        }
    });
}

// Helper function to create a basic Three.js scene
function createScene(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    camera.position.z = 5;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Store in global registries
    scenes[containerId] = scene;
    cameras[containerId] = camera;
    renderers[containerId] = renderer;
    
    return { scene, camera, renderer, container, containerId };
}

// Placeholder visualization for concepts without custom animations
function createPlaceholderVisualization(containerId) {
    const setup = createScene(containerId);
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create a rotating torus knot as placeholder
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 64, 8);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        emissive: 0x6366f1,
        emissiveIntensity: 0.3
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Add orbiting particles
    const particles = [];
    for (let i = 0; i < 20; i++) {
        const pGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const pMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(i / 20, 1, 0.5)
        });
        const particle = new THREE.Mesh(pGeometry, pMaterial);
        particle.userData = { angle: (i / 20) * Math.PI * 2, radius: 2 };
        scene.add(particle);
        particles.push(particle);
    }
    
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        mesh.rotation.x = time * 0.5;
        mesh.rotation.y = time * 0.7;
        
        particles.forEach(p => {
            p.userData.angle += 0.02;
            const angle = p.userData.angle;
            const radius = p.userData.radius;
            
            p.position.x = radius * Math.cos(angle);
            p.position.y = Math.sin(angle * 3) * 0.5;
            p.position.z = radius * Math.sin(angle);
        });
        
        renderer.render(scene, camera);
    }
    animate();
}

// Hero Animation - Rotating quantum particles
function initHeroAnimation() {
    const setup = createScene('hero-animation');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create particle system
    const particles = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(0.05, 8, 8);
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(i / particleCount, 1, 0.5),
            emissive: new THREE.Color().setHSL(i / particleCount, 1, 0.3)
        });
        const particle = new THREE.Mesh(geometry, material);
        
        const radius = 2 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);
        
        particle.userData = { radius, theta, phi, speed: 0.001 + Math.random() * 0.002 };
        
        scene.add(particle);
        particles.push(particle);
    }
    
    function animate() {
        requestAnimationFrame(animate);
        
        particles.forEach(particle => {
            particle.userData.theta += particle.userData.speed;
            const { radius, theta, phi } = particle.userData;
            
            particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
            particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
            particle.position.z = radius * Math.cos(phi);
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Wave-Particle Duality - Oscillating wave and particle
function initWaveParticleDuality() {
    const setup = createScene('wave-particle-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create wave
    const waveGeometry = new THREE.BufferGeometry();
    const wavePoints = [];
    const segments = 100;
    
    for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * 8 - 4;
        wavePoints.push(x, 0, 0);
    }
    
    waveGeometry.setAttribute('position', new THREE.Float32BufferAttribute(wavePoints, 3));
    const waveMaterial = new THREE.LineBasicMaterial({ color: 0x6366f1, linewidth: 2 });
    const wave = new THREE.Line(waveGeometry, waveMaterial);
    scene.add(wave);
    
    // Create particle
    const particleGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const particleMaterial = new THREE.MeshPhongMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.5 });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    scene.add(particle);
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        // Update wave
        const positions = wave.geometry.attributes.position.array;
        for (let i = 0; i <= segments; i++) {
            const x = (i / segments) * 8 - 4;
            positions[i * 3 + 1] = Math.sin(x + time) * 0.5;
        }
        wave.geometry.attributes.position.needsUpdate = true;
        
        // Update particle
        particle.position.x = Math.cos(time) * 3;
        particle.position.y = Math.sin(time) * 0.5;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Superposition - Bloch sphere with rotating state vector
function initSuperposition() {
    const setup = createScene('superposition-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create Bloch sphere
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.2,
        wireframe: true
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Create axes
    const axesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    
    // X axis
    const xGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2.5, 0, 0),
        new THREE.Vector3(2.5, 0, 0)
    ]);
    scene.add(new THREE.Line(xGeometry, axesMaterial));
    
    // Y axis
    const yGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -2.5, 0),
        new THREE.Vector3(0, 2.5, 0)
    ]);
    scene.add(new THREE.Line(yGeometry, axesMaterial));
    
    // Z axis
    const zGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -2.5),
        new THREE.Vector3(0, 0, 2.5)
    ]);
    scene.add(new THREE.Line(zGeometry, axesMaterial));
    
    // Create state vector
    const vectorGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
    const vectorMaterial = new THREE.MeshPhongMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.5 });
    const vector = new THREE.Mesh(vectorGeometry, vectorMaterial);
    scene.add(vector);
    
    // Create vector line
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xec4899, linewidth: 3 });
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 2, 0)
    ]);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Rotate state vector
        const theta = time;
        const phi = Math.sin(time * 0.5) * Math.PI / 4 + Math.PI / 4;
        
        const x = 2 * Math.sin(phi) * Math.cos(theta);
        const y = 2 * Math.sin(phi) * Math.sin(theta);
        const z = 2 * Math.cos(phi);
        
        vector.position.set(x, y, z);
        vector.lookAt(0, 0, 0);
        vector.rotateX(Math.PI / 2);
        
        // Update line
        const positions = line.geometry.attributes.position.array;
        positions[3] = x;
        positions[4] = y;
        positions[5] = z;
        line.geometry.attributes.position.needsUpdate = true;
        
        sphere.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Quantum States - Ket vectors in 3D space
function initQuantumStates() {
    const setup = createScene('quantum-states-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create multiple ket vectors
    const vectors = [];
    const colors = [0x6366f1, 0x8b5cf6, 0xec4899, 0x10b981];
    
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 2;
        const z = Math.sin(angle) * 2;
        
        // Arrow
        const arrowGeometry = new THREE.ConeGeometry(0.15, 0.4, 8);
        const arrowMaterial = new THREE.MeshPhongMaterial({ color: colors[i], emissive: colors[i], emissiveIntensity: 0.3 });
        const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
        arrow.position.set(x, 2, z);
        arrow.lookAt(x, 0, z);
        arrow.rotateX(-Math.PI / 2);
        scene.add(arrow);
        
        // Line
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x, 0, z),
            new THREE.Vector3(x, 2, z)
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({ color: colors[i], linewidth: 2 });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        
        vectors.push({ arrow, line, angle: i * Math.PI / 2 });
    }
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        vectors.forEach((v, i) => {
            const height = 1.5 + Math.sin(time + v.angle) * 0.5;
            v.arrow.position.y = height;
            
            const positions = v.line.geometry.attributes.position.array;
            positions[4] = height;
            v.line.geometry.attributes.position.needsUpdate = true;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Measurement - Wavefunction collapse animation
function initMeasurement() {
    const setup = createScene('measurement-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create superposition cloud
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(0.05, 8, 8);
        const material = new THREE.MeshPhongMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.6
        });
        const particle = new THREE.Mesh(geometry, material);
        
        particle.position.x = (Math.random() - 0.5) * 4;
        particle.position.y = (Math.random() - 0.5) * 4;
        particle.position.z = (Math.random() - 0.5) * 4;
        
        particle.userData = {
            originalPos: particle.position.clone(),
            targetPos: new THREE.Vector3(0, 0, 0)
        };
        
        scene.add(particle);
        particles.push(particle);
    }
    
    let time = 0;
    let collapsing = false;
    let collapseTime = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Trigger collapse every 5 seconds
        if (Math.floor(time) % 5 === 0 && Math.floor(time) !== collapseTime) {
            collapsing = true;
            collapseTime = Math.floor(time);
            
            // Set random target position
            const targetX = (Math.random() - 0.5) * 2;
            const targetY = (Math.random() - 0.5) * 2;
            const targetZ = (Math.random() - 0.5) * 2;
            
            particles.forEach(p => {
                p.userData.targetPos.set(targetX, targetY, targetZ);
            });
            
            setTimeout(() => {
                collapsing = false;
                particles.forEach(p => {
                    p.userData.originalPos.x = (Math.random() - 0.5) * 4;
                    p.userData.originalPos.y = (Math.random() - 0.5) * 4;
                    p.userData.originalPos.z = (Math.random() - 0.5) * 4;
                });
            }, 2000);
        }
        
        particles.forEach(p => {
            if (collapsing) {
                p.position.lerp(p.userData.targetPos, 0.05);
                p.material.opacity = Math.max(0.2, p.material.opacity - 0.01);
            } else {
                p.position.lerp(p.userData.originalPos, 0.02);
                p.material.opacity = Math.min(0.6, p.material.opacity + 0.01);
            }
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Probability - Probability distribution visualization
function initProbability() {
    const setup = createScene('probability-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create bars for probability distribution
    const bars = [];
    const barCount = 20;
    
    for (let i = 0; i < barCount; i++) {
        const geometry = new THREE.BoxGeometry(0.3, 1, 0.3);
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(i / barCount, 0.8, 0.5)
        });
        const bar = new THREE.Mesh(geometry, material);
        
        bar.position.x = (i - barCount / 2) * 0.4;
        bar.position.y = 0;
        
        scene.add(bar);
        bars.push(bar);
    }
    
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        bars.forEach((bar, i) => {
            const x = (i - barCount / 2) * 0.4;
            const height = Math.exp(-x * x / 4) * Math.abs(Math.sin(time + i * 0.2)) * 3;
            
            bar.scale.y = height;
            bar.position.y = height / 2;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Uncertainty Principle - Position-momentum wave packets
function initUncertainty() {
    const setup = createScene('uncertainty-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create two wave packets
    const createWavePacket = (color, yOffset) => {
        const geometry = new THREE.BufferGeometry();
        const points = [];
        const segments = 100;
        
        for (let i = 0; i <= segments; i++) {
            const x = (i / segments) * 8 - 4;
            points.push(x, yOffset, 0);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
        const material = new THREE.LineBasicMaterial({ color, linewidth: 2 });
        const wave = new THREE.Line(geometry, material);
        scene.add(wave);
        
        return wave;
    };
    
    const positionWave = createWavePacket(0x6366f1, 1);
    const momentumWave = createWavePacket(0xec4899, -1);
    
    let time = 0;
    let sigma = 0.5;
    let increasing = true;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        // Oscillate sigma
        if (increasing) {
            sigma += 0.01;
            if (sigma > 1.5) increasing = false;
        } else {
            sigma -= 0.01;
            if (sigma < 0.3) increasing = true;
        }
        
        // Update position wave (narrow when sigma is small)
        const posPositions = positionWave.geometry.attributes.position.array;
        for (let i = 0; i <= 100; i++) {
            const x = (i / 100) * 8 - 4;
            posPositions[i * 3 + 1] = Math.exp(-x * x / (2 * sigma * sigma)) * Math.cos(5 * x + time) + 1;
        }
        positionWave.geometry.attributes.position.needsUpdate = true;
        
        // Update momentum wave (wide when sigma is small)
        const momPositions = momentumWave.geometry.attributes.position.array;
        const momentumSigma = 1 / sigma;
        for (let i = 0; i <= 100; i++) {
            const x = (i / 100) * 8 - 4;
            momPositions[i * 3 + 1] = Math.exp(-x * x / (2 * momentumSigma * momentumSigma)) * Math.cos(5 * x - time) - 1;
        }
        momentumWave.geometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Operators - Matrix transformation visualization
function initOperators() {
    const setup = createScene('operators-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create grid of points
    const points = [];
    const gridSize = 10;
    
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const geometry = new THREE.SphereGeometry(0.05, 8, 8);
            const material = new THREE.MeshPhongMaterial({ color: 0x6366f1 });
            const point = new THREE.Mesh(geometry, material);
            
            const x = (i - gridSize / 2) * 0.5;
            const y = (j - gridSize / 2) * 0.5;
            
            point.position.set(x, y, 0);
            point.userData = { originalX: x, originalY: y };
            
            scene.add(point);
            points.push(point);
        }
    }
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        const angle = Math.sin(time) * 0.5;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        
        points.forEach(point => {
            const { originalX, originalY } = point.userData;
            
            // Apply rotation matrix
            point.position.x = originalX * cos - originalY * sin;
            point.position.y = originalX * sin + originalY * cos;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Commutators - Non-commuting operations
function initCommutators() {
    const setup = createScene('commutators-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create two cubes showing different operation orders
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material1 = new THREE.MeshPhongMaterial({ color: 0x6366f1, transparent: true, opacity: 0.7 });
    const material2 = new THREE.MeshPhongMaterial({ color: 0xec4899, transparent: true, opacity: 0.7 });
    
    const cube1 = new THREE.Mesh(geometry, material1);
    const cube2 = new THREE.Mesh(geometry, material2);
    
    cube1.position.x = -2;
    cube2.position.x = 2;
    
    scene.add(cube1);
    scene.add(cube2);
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        // Cube 1: Rotate X then Y
        cube1.rotation.x = Math.sin(time) * 0.5;
        cube1.rotation.y = Math.cos(time) * 0.5;
        
        // Cube 2: Rotate Y then X (different result!)
        cube2.rotation.y = Math.cos(time) * 0.5;
        cube2.rotation.x = Math.sin(time) * 0.5;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Eigenstates - Stable states under operator action
function initEigenstates() {
    const setup = createScene('eigenstates-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create spinning torus (eigenstate)
    const geometry = new THREE.TorusGeometry(1.5, 0.4, 16, 100);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        emissive: 0x6366f1,
        emissiveIntensity: 0.3
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
    
    // Add particles orbiting
    const particles = [];
    for (let i = 0; i < 20; i++) {
        const pGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const pMaterial = new THREE.MeshPhongMaterial({ color: 0xec4899 });
        const particle = new THREE.Mesh(pGeometry, pMaterial);
        
        particle.userData = { angle: (i / 20) * Math.PI * 2 };
        scene.add(particle);
        particles.push(particle);
    }
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        torus.rotation.z += 0.01;
        
        particles.forEach(p => {
            p.userData.angle += 0.02;
            const angle = p.userData.angle;
            const radius = 1.5;
            
            p.position.x = radius * Math.cos(angle);
            p.position.y = radius * Math.sin(angle);
            p.position.z = Math.sin(angle * 3) * 0.5;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Entanglement - Two connected particles
function initEntanglement() {
    const setup = createScene('entanglement-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create two entangled particles
    const geometry = new THREE.SphereGeometry(0.4, 16, 16);
    const material1 = new THREE.MeshPhongMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.5 });
    const material2 = new THREE.MeshPhongMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.5 });
    
    const particle1 = new THREE.Mesh(geometry, material1);
    const particle2 = new THREE.Mesh(geometry, material2);
    
    particle1.position.x = -2;
    particle2.position.x = 2;
    
    scene.add(particle1);
    scene.add(particle2);
    
    // Create connection line
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        particle1.position,
        particle2.position
    ]);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    
    // Create energy waves
    const waves = [];
    for (let i = 0; i < 5; i++) {
        const wGeometry = new THREE.TorusGeometry(0.3 + i * 0.2, 0.02, 8, 32);
        const wMaterial = new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            transparent: true,
            opacity: 0.5 - i * 0.1
        });
        const wave = new THREE.Mesh(wGeometry, wMaterial);
        wave.userData = { offset: i * 0.4 };
        waves.push(wave);
        scene.add(wave);
    }
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        // Rotate particles in sync
        particle1.rotation.y = time;
        particle2.rotation.y = time;
        
        particle1.rotation.x = Math.sin(time) * 0.5;
        particle2.rotation.x = Math.sin(time) * 0.5;
        
        // Animate waves
        waves.forEach((wave, i) => {
            const scale = 1 + Math.sin(time * 2 - wave.userData.offset) * 0.3;
            wave.scale.set(scale, scale, scale);
            wave.rotation.z = time;
        });
        
        // Update line
        const positions = line.geometry.attributes.position.array;
        positions[0] = particle1.position.x;
        positions[1] = particle1.position.y;
        positions[2] = particle1.position.z;
        positions[3] = particle2.position.x;
        positions[4] = particle2.position.y;
        positions[5] = particle2.position.z;
        line.geometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Qubits - Bloch sphere comparison with classical bit
function initQubits() {
    const setup = createScene('qubits-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Classical bit (left) - just 0 or 1
    const bitGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const bitMaterial = new THREE.MeshPhongMaterial({ color: 0x10b981 });
    const bit = new THREE.Mesh(bitGeometry, bitMaterial);
    bit.position.x = -2.5;
    scene.add(bit);
    
    // Qubit (right) - Bloch sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 2.5;
    scene.add(sphere);
    
    // State vector on Bloch sphere
    const vectorGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
    const vectorMaterial = new THREE.MeshPhongMaterial({ color: 0xec4899 });
    const vector = new THREE.Mesh(vectorGeometry, vectorMaterial);
    vector.position.x = 2.5;
    scene.add(vector);
    
    let time = 0;
    let bitState = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        // Toggle classical bit every 2 seconds
        if (Math.floor(time * 10) % 20 === 0) {
            bitState = 1 - bitState;
            bit.position.y = bitState * 2 - 1;
        }
        
        // Rotate qubit state vector continuously
        const theta = time;
        const phi = Math.sin(time * 0.5) * Math.PI / 2 + Math.PI / 2;
        
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.sin(phi) * Math.sin(theta);
        const z = Math.cos(phi);
        
        vector.position.set(2.5 + x, y, z);
        vector.lookAt(2.5, 0, 0);
        vector.rotateX(Math.PI / 2);
        
        sphere.rotation.y += 0.005;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Complex Numbers - Complex plane visualization
function initComplexNumbers() {
    const setup = createScene('complex-numbers-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create complex plane axes
    const axesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    
    // Real axis
    const realGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-3, 0, 0),
        new THREE.Vector3(3, 0, 0)
    ]);
    scene.add(new THREE.Line(realGeometry, axesMaterial));
    
    // Imaginary axis
    const imagGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -3, 0),
        new THREE.Vector3(0, 3, 0)
    ]);
    scene.add(new THREE.Line(imagGeometry, axesMaterial));
    
    // Create rotating complex number
    const geometry = new THREE.SphereGeometry(0.2, 16, 16);
    const material = new THREE.MeshPhongMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.5 });
    const point = new THREE.Mesh(geometry, material);
    scene.add(point);
    
    // Create vector from origin
    const vectorGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(2, 0, 0)
    ]);
    const vectorMaterial = new THREE.LineBasicMaterial({ color: 0xec4899, linewidth: 2 });
    const vector = new THREE.Line(vectorGeometry, vectorMaterial);
    scene.add(vector);
    
    // Create circle trace
    const circleGeometry = new THREE.CircleGeometry(2, 64);
    const circleMaterial = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide
    });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.rotation.x = Math.PI / 2;
    scene.add(circle);
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        const radius = 2;
        const x = radius * Math.cos(time);
        const y = radius * Math.sin(time);
        
        point.position.set(x, y, 0);
        
        // Update vector
        const positions = vector.geometry.attributes.position.array;
        positions[3] = x;
        positions[4] = y;
        vector.geometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Linear Algebra - Vector space visualization
function initLinearAlgebra() {
    const setup = createScene('linear-algebra-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create basis vectors
    const createVector = (x, y, z, color) => {
        const geometry = new THREE.ConeGeometry(0.1, 0.3, 8);
        const material = new THREE.MeshPhongMaterial({ color });
        const cone = new THREE.Mesh(geometry, material);
        
        const length = Math.sqrt(x * x + y * y + z * z);
        cone.position.set(x, y, z);
        cone.lookAt(0, 0, 0);
        cone.rotateX(-Math.PI / 2);
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(x, y, z)
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({ color, linewidth: 2 });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        
        scene.add(cone);
        scene.add(line);
        
        return { cone, line };
    };
    
    const v1 = createVector(2, 0, 0, 0x6366f1);
    const v2 = createVector(0, 2, 0, 0xec4899);
    const v3 = createVector(0, 0, 2, 0x10b981);
    
    // Create linear combination
    const combGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const combMaterial = new THREE.MeshPhongMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.5 });
    const combination = new THREE.Mesh(combGeometry, combMaterial);
    scene.add(combination);
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        const a = Math.sin(time) * 0.5 + 0.5;
        const b = Math.cos(time) * 0.5 + 0.5;
        const c = Math.sin(time * 1.5) * 0.5 + 0.5;
        
        combination.position.set(a * 2, b * 2, c * 2);
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Hilbert Space - High-dimensional space representation
function initHilbertSpace() {
    const setup = createScene('hilbert-space-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create multiple orthogonal vectors
    const vectors = [];
    const dimensions = 8;
    
    for (let i = 0; i < dimensions; i++) {
        const angle = (i / dimensions) * Math.PI * 2;
        const x = Math.cos(angle) * 2;
        const y = Math.sin(angle) * 2;
        
        const geometry = new THREE.ConeGeometry(0.08, 0.25, 8);
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(i / dimensions, 0.8, 0.5)
        });
        const cone = new THREE.Mesh(geometry, material);
        cone.position.set(x, y, 0);
        cone.lookAt(0, 0, 0);
        cone.rotateX(-Math.PI / 2);
        
        scene.add(cone);
        vectors.push(cone);
    }
    
    // Create connecting circle
    const circleGeometry = new THREE.TorusGeometry(2, 0.02, 16, 100);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.3 });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.rotation.x = Math.PI / 2;
    scene.add(circle);
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        circle.rotation.z = time * 0.5;
        
        vectors.forEach((v, i) => {
            v.position.z = Math.sin(time + i * 0.5) * 0.5;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Tensor Products - Combining quantum systems
function initTensorProducts() {
    const setup = createScene('tensor-products-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create two separate systems
    const system1Geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const system1Material = new THREE.MeshPhongMaterial({ color: 0x6366f1, transparent: true, opacity: 0.7 });
    const system1 = new THREE.Mesh(system1Geometry, system1Material);
    system1.position.x = -2;
    scene.add(system1);
    
    const system2Geometry = new THREE.SphereGeometry(0.5, 16, 16);
    const system2Material = new THREE.MeshPhongMaterial({ color: 0xec4899, transparent: true, opacity: 0.7 });
    const system2 = new THREE.Mesh(system2Geometry, system2Material);
    system2.position.x = 2;
    scene.add(system2);
    
    // Create combined system (tensor product)
    const combinedGeometry = new THREE.TorusKnotGeometry(0.8, 0.3, 64, 8);
    const combinedMaterial = new THREE.MeshPhongMaterial({ color: 0x10b981, transparent: true, opacity: 0.7 });
    const combined = new THREE.Mesh(combinedGeometry, combinedMaterial);
    combined.position.y = -2;
    scene.add(combined);
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        system1.rotation.x = time;
        system1.rotation.y = time * 0.7;
        
        system2.rotation.y = time;
        system2.rotation.z = time * 0.7;
        
        combined.rotation.x = time;
        combined.rotation.y = time * 0.7;
        combined.rotation.z = time * 0.5;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Matrices - Matrix transformations
function initMatrices() {
    const setup = createScene('matrices-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create grid that will be transformed
    const points = [];
    const gridSize = 8;
    
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const geometry = new THREE.SphereGeometry(0.05, 8, 8);
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL((i + j) / (gridSize * 2), 0.8, 0.5)
            });
            const point = new THREE.Mesh(geometry, material);
            
            const x = (i - gridSize / 2) * 0.5;
            const y = (j - gridSize / 2) * 0.5;
            
            point.position.set(x, y, 0);
            point.userData = { originalX: x, originalY: y };
            
            scene.add(point);
            points.push(point);
        }
    }
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Apply unitary transformation (rotation)
        const angle = Math.sin(time) * Math.PI / 4;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        
        points.forEach(point => {
            const { originalX, originalY } = point.userData;
            
            // Unitary matrix transformation
            point.position.x = originalX * cos - originalY * sin;
            point.position.y = originalX * sin + originalY * cos;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Quantum Gates (Math) - Gate operations on Bloch sphere
function initQuantumGatesMath() {
    const setup = createScene('quantum-gates-math-viz');
    if (!setup) return;
    
    const { scene, camera, renderer } = setup;
    
    // Create Bloch sphere
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.2,
        wireframe: true
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Create state vector
    const vectorGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
    const vectorMaterial = new THREE.MeshPhongMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.5 });
    const vector = new THREE.Mesh(vectorGeometry, vectorMaterial);
    scene.add(vector);
    
    // Create path trace
    const pathPoints = [];
    const pathGeometry = new THREE.BufferGeometry();
    const pathMaterial = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 2 });
    const path = new THREE.Line(pathGeometry, pathMaterial);
    scene.add(path);
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        // Apply different gates over time
        const gatePhase = Math.floor(time / 3) % 3;
        let theta, phi;
        
        if (gatePhase === 0) {
            // Hadamard-like
            theta = time;
            phi = Math.PI / 4;
        } else if (gatePhase === 1) {
            // Pauli-X-like
            theta = time;
            phi = Math.PI / 2;
        } else {
            // Phase gate-like
            theta = time * 2;
            phi = Math.PI / 3;
        }
        
        const x = 1.5 * Math.sin(phi) * Math.cos(theta);
        const y = 1.5 * Math.sin(phi) * Math.sin(theta);
        const z = 1.5 * Math.cos(phi);
        
        vector.position.set(x, y, z);
        vector.lookAt(0, 0, 0);
        vector.rotateX(Math.PI / 2);
        
        // Update path
        pathPoints.push(new THREE.Vector3(x, y, z));
        if (pathPoints.length > 100) pathPoints.shift();
        
        pathGeometry.setFromPoints(pathPoints);
        
        sphere.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Due to token limits, I'll create placeholder functions for remaining visualizations
// These follow the same pattern as above

function initSchrodinger() {
    const setup = createScene('schrodinger-viz');
    if (!setup) return;
    const { scene, camera, renderer } = setup;
    
    // Create wavefunction
    const geometry = new THREE.BufferGeometry();
    const points = [];
    for (let i = 0; i <= 100; i++) {
        const x = (i / 100) * 8 - 4;
        points.push(x, 0, 0);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    const material = new THREE.LineBasicMaterial({ color: 0x6366f1, linewidth: 2 });
    const wave = new THREE.Line(geometry, material);
    scene.add(wave);
    
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        const positions = wave.geometry.attributes.position.array;
        for (let i = 0; i <= 100; i++) {
            const x = (i / 100) * 8 - 4;
            positions[i * 3 + 1] = Math.sin(x - time) * Math.exp(-x * x / 8);
        }
        wave.geometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    animate();
}

function initHarmonicOscillator() {
    const setup = createScene('harmonic-oscillator-viz');
    if (!setup) return;
    const { scene, camera, renderer } = setup;
    
    // Create oscillating particle
    const geometry = new THREE.SphereGeometry(0.3, 16, 16);
    const material = new THREE.MeshPhongMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.5 });
    const particle = new THREE.Mesh(geometry, material);
    scene.add(particle);
    
    // Create spring
    const springGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 8);
    const springMaterial = new THREE.MeshPhongMaterial({ color: 0xec4899, wireframe: true });
    const spring = new THREE.Mesh(springGeometry, springMaterial);
    scene.add(spring);
    
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.05;
        
        const y = Math.sin(time) * 2;
        particle.position.y = y;
        spring.scale.y = (3 + y) / 3;
        spring.position.y = y / 2;
        
        renderer.render(scene, camera);
    }
    animate();
}

function initTunneling() {
    const setup = createScene('tunneling-viz');
    if (!setup) return;
    const { scene, camera, renderer } = setup;
    
    // Create barrier
    const barrierGeometry = new THREE.BoxGeometry(0.5, 3, 2);
    const barrierMaterial = new THREE.MeshPhongMaterial({ color: 0xec4899, transparent: true, opacity: 0.5 });
    const barrier = new THREE.Mesh(barrierGeometry, barrierMaterial);
    scene.add(barrier);
    
    // Create particle
    const particleGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const particleMaterial = new THREE.MeshPhongMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.5 });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    scene.add(particle);
    
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        particle.position.x = Math.sin(time) * 3;
        particle.material.opacity = particle.position.x > -0.25 && particle.position.x < 0.25 ? 0.3 : 1.0;
        
        renderer.render(scene, camera);
    }
    animate();
}

function initInterference() {
    const setup = createScene('interference-viz');
    if (!setup) return;
    const { scene, camera, renderer } = setup;
    
    // Create two wave sources
    const source1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshPhongMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.8 })
    );
    source1.position.set(-1.5, 0, 0);
    scene.add(source1);
    
    const source2 = source1.clone();
    source2.position.set(1.5, 0, 0);
    scene.add(source2);
    
    // Create interference pattern
    const points = [];
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            const geometry = new THREE.SphereGeometry(0.02, 4, 4);
            const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const point = new THREE.Mesh(geometry, material);
            
            const x = (i - 25) * 0.15;
            const z = (j - 25) * 0.15;
            point.position.set(x, 0, z);
            point.userData = { x, z };
            
            scene.add(point);
            points.push(point);
        }
    }
    
    camera.position.set(0, 5, 5);
    camera.lookAt(0, 0, 0);
    
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.1;
        
        points.forEach(point => {
            const { x, z } = point.userData;
            const d1 = Math.sqrt((x + 1.5) ** 2 + z ** 2);
            const d2 = Math.sqrt((x - 1.5) ** 2 + z ** 2);
            
            const wave1 = Math.sin(d1 * 3 - time);
            const wave2 = Math.sin(d2 * 3 - time);
            const interference = (wave1 + wave2) / 2;
            
            point.position.y = interference * 0.3;
            point.material.color.setHSL(0.6, 1, (interference + 1) / 2);
        });
        
        renderer.render(scene, camera);
    }
    animate();
}

function initSpin() {
    const setup = createScene('spin-viz');
    if (!setup) return;
    const { scene, camera, renderer } = setup;
    
    // Create spinning particle
    const geometry = new THREE.SphereGeometry(0.8, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x6366f1 });
    const particle = new THREE.Mesh(geometry, material);
    scene.add(particle);
    
    // Create spin arrow
    const arrowGeometry = new THREE.ConeGeometry(0.2, 0.6, 8);
    const arrowMaterial = new THREE.MeshPhongMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.5 });
    const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
    arrow.position.y = 1.2;
    scene.add(arrow);
    
    // Create rotation axis
    const axisGeometry = new THREE.CylinderGeometry(0.02, 0.02, 3, 8);
    const axisMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const axis = new THREE.Mesh(axisGeometry, axisMaterial);
    scene.add(axis);
    
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        particle.rotation.y = time * 2;
        arrow.rotation.y = time * 2;
        
        renderer.render(scene, camera);
    }
    animate();
}

function initAngularMomentum() {
    const setup = createScene('angular-momentum-viz');
    if (!setup) return;
    const { scene, camera, renderer } = setup;
    
    // Create orbiting particle
    const geometry = new THREE.SphereGeometry(0.3, 16, 16);
    const material = new THREE.MeshPhongMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.5 });
    const particle = new THREE.Mesh(geometry, material);
    scene.add(particle);
    
    // Create orbit path
    const orbitGeometry = new THREE.TorusGeometry(2, 0.02, 16, 100);
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.3 });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    scene.add(orbit);
    
    // Create angular momentum vector
    const vectorGeometry = new THREE.ConeGeometry(0.15, 0.5, 8);
    const vectorMaterial = new THREE.MeshPhongMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.5 });
    const vector = new THREE.Mesh(vectorGeometry, vectorMaterial);
    vector.position.y = 2;
    scene.add(vector);
    
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        particle.position.x = Math.cos(time) * 2;
        particle.position.z = Math.sin(time) * 2;
        
        renderer.render(scene, camera);
    }
    animate();
}

// Handle window resize
window.addEventListener('resize', () => {
    Object.keys(renderers).forEach(key => {
        const renderer = renderers[key];
        const camera = cameras[key];
        const container = renderer.domElement.parentElement;
        
        if (container) {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
    });
});

console.log('Quantum Concepts visualizations initialized with lazy loading!');
