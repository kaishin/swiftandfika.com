import React, { Component } from 'react';
import * as THREE from 'three';

export default class ThreeDeeView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.setupCamera();
    this.setupRenderer();
    this.setupScene();
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
    this.scene = new THREE.Scene();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x039b4f });
    var cube = new THREE.Mesh(geometry, material);

    this.scene.add(cube);
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return <canvas id="gl-view" className="3d-shape" />;
  }
}
