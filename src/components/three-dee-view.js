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
    this.animate();
  };

  setupCamera = () => {
    this.camera = new THREE.PerspectiveCamera(80, 1 / 0.6, 0.2, 800);
    this.camera.position.z = 3.5;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  };

  setupRenderer = () => {
    let { innerWidth: width, innerHeight: height } = window;
    let availableWidth = Math.min(800, width);
    let customHeight = availableWidth * 0.6;

    this.renderer = new THREE.WebGLRenderer({
      // alpha: true,
      antialias: false,
      canvas: document.querySelector('#gl-view'),
      clearAlpha: 0.25,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: true,
    });

    this.renderer.setPixelRatio(Math.min(1.25, window.devicePixelRatio));
    this.renderer.setSize(availableWidth, customHeight);
  };

  setupScene = () => {
    this.loader = new GLTFLoader();

    this.loader.load(
      'coffee/scene.gltf',
      (gltf) => {
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        gltf.scene.traverse(function(child) {
          if (child.isMesh) {
            child.material = material;
          }
        });

        this.cup = gltf.scene;
        this.scene.add(this.cup);
      },
      undefined,
      function(error) {
        console.error(error);
      },
    );
  };

  setupControls = () => {
    this.controls = new OrbitControls(this.camera);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.minPolarAngle = Math.PI / 2.5;
    this.controls.maxPolarAngle = Math.PI / 2.5;
  };

  animate = () => {
    this.controls.update();

    if (this.cup) {
      this.cup.rotation.x = 0.2;
      this.cup.rotation.y += 0.005;
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
