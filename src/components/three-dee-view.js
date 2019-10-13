import React, { Component } from 'react';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

export default class ThreeDeeView extends Component {
  constructor(props) {
    super(props);

    this.scene = new THREE.Scene();
  }
  componentDidMount = () => {
    this.setupCamera();
    this.setupRenderer();
    this.setupScene();
    this.setupLights();
    this.animate();
  };

  setupCamera = () => {
    let { innerWidth: width, innerHeight: height } = window;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;
  };

  setupRenderer = () => {
    let { innerWidth: width, innerHeight: height } = window;

    this.renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: false,
      canvas: document.querySelector('#gl-view'),
      clearAlpha: 0.25,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: true
    });

    this.renderer.setClearColor(0xebebeb);
    this.renderer.setPixelRatio(Math.min(1.25, window.devicePixelRatio));
    this.renderer.setSize(width, height);
  };

  setupScene = () => {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x039b4f });
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.background = new THREE.Color(0xc4d0cc);

    this.loader = new GLTFLoader();

    this.loader.load(
      'coffee/scene.gltf',
      (gltf) => {
        this.cup = gltf.scene;
        this.scene.add(this.cup);
      },
      undefined,
      function(error) {
        console.error(error);
      }
    );

    // this.scene.add(this.cube);
  };

  setupLights = () => {
    let aLight = new THREE.AmbientLight(0xebebeb);
    let dLight = new THREE.DirectionalLight(0x6695f7, 1, 100);
    dLight.position.set(0, 0, 100);

    this.scene.add(aLight);
    this.scene.add(dLight);
  };

  animate = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    if (this.cup) {
      this.cup.rotation.x = 1;
      this.cup.rotation.y += 0.01;
    }

    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return <canvas id="gl-view" className="3d-shape" />;
  }
}
