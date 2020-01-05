import React, { Component } from 'react';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

var OrbitControls = require('three-orbit-controls')(THREE);

export default class ThreeDeeView extends Component {
  constructor(props) {
    super(props);
    this.scene = new THREE.Scene();
  }

  componentDidMount = () => {
    this.setupCamera();
    this.setupRenderer();
    this.setupScene();
    this.setupControls();
    this.setupLights();
    this.animate();
  };

  setupCamera = () => {
    let fov = 75;
    let aspect = 2;
    let near = 0.2;
    let far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 3.5;
  };

  setupLights = () => {
    this.light1 = new THREE.PointLight(0x43009b, 2, 40);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0x0040ff, 2, 40);
    this.scene.add(this.light2);
  };

  setupRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      canvas: document.querySelector('#gl-view'),
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: true,
    });
  };

  setupScene = () => {
    this.loader = new GLTFLoader();

    this.loader.load(
      'mug-1.glb',
      (gltf) => {
        this.cup = gltf.scene;
        this.scene.add(this.cup);
      },
      undefined,
      function(error) {
        console.error(error);
      },
    );
  };

  applyMaterial = (scene) => {
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    scene.traverse(function(child) {
      if (child.isMesh) {
        child.material = material;
      }
    });
  };

  setupControls = () => {
    this.controls = new OrbitControls(this.camera);
    this.controls.enableDamping = true;
    this.controls.enablePan = true;
    this.controls.enableZoom = false;
    this.controls.minPolarAngle = Math.PI / 2.5;
    this.controls.maxPolarAngle = Math.PI / 2.5;
  };

  resizeRendererToDisplaySize = () => {
    const canvas = this.renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const isResizeNeeded = canvas.width !== width || canvas.height !== height;

    if (isResizeNeeded) {
      this.renderer.setSize(width, height, false);
    }

    return isResizeNeeded;
  };

  animate = () => {
    this.controls.update();

    if (this.cup) {
      this.cup.rotation.x = 0.1;
      this.cup.rotation.y += 0.005;
    }

    var time = Date.now() * 0.0005;
    this.light1.position.x = Math.sin(time * 0.7) * 30;
    this.light1.position.y = Math.cos(time * 0.5) * 40;
    this.light1.position.z = Math.cos(time * 0.3) * 30;
    this.light2.position.x = Math.cos(time * 0.3) * 30;
    this.light2.position.y = Math.sin(time * 0.5) * 40;
    this.light2.position.z = Math.sin(time * 0.7) * 30;

    if (this.resizeRendererToDisplaySize()) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return <canvas id="gl-view" className="3d-shape" />;
  }
}

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize( window.innerWidth, window.innerHeight );
// }
