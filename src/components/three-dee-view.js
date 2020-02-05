import React, { Component } from 'react';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class ThreeDeeView extends Component {
  constructor(props) {
    super(props);
    this.scene = new THREE.Scene();
    this.rotationUp = true;
  }

  componentDidMount = () => {
    this.setupCamera();
    this.setupRenderer();
    this.setupScene();
    this.setupLights();
    this.animate();
  };

  setupCamera = () => {
    let fov = 75;
    let aspect = 2;
    let near = 0.1;
    let far = 500;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 4.5;
    this.camera.lookAt(this.scene.position);
  };

  setupLights = () => {
    this.light1 = new THREE.PointLight(0x43009b, 2, 80);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0x0040ff, 2, 60);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(0xdb493b, 2, 50);
    this.scene.add(this.light3);
  };

  setupRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: document.querySelector('#gl-view'),
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: true,
    });
  };

  setupScene = () => {
    this.loader = new GLTFLoader();

    this.loader.load(
      'mug-3.glb',
      (gltf) => {
        this.cup = gltf.scene;
        this.cup.rotation.z = 0.1;
        this.cup.rotation.x = 0.5;
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
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
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
    if (this.cup) {
      if (this.rotationUp) {
        if (this.cup.rotation.x < 0.4) {
          this.cup.rotation.x += 0.001;
        } else {
          this.rotationUp = false;
        }
      } else {
        if (this.cup.rotation.x > 0) {
          this.cup.rotation.x -= 0.001;
        } else {
          this.rotationUp = true;
        }
      }

      this.cup.rotation.y += 0.005;
      this.cup.rotation.z += 0.0001 * (this.rotationUp ? -1 : 1);
    }

    var time = Date.now() * 0.001;
    this.light1.position.x = Math.sin(time * 0.7) * 30;
    this.light1.position.y = Math.cos(time * 0.5) * 40;
    this.light1.position.z = Math.cos(time * 0.3) * 30;

    this.light2.position.x = Math.cos(time * 0.3) * 30;
    this.light2.position.y = Math.sin(time * 0.5) * 40;
    this.light2.position.z = Math.sin(time * 0.7) * 30;

    this.light3.position.x = Math.cos(time * 0.3) * -30;
    this.light3.position.y = Math.sin(time * 0.5) * -10;
    this.light3.position.z = Math.sin(time * 0.7) * -30;

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
