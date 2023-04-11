import React, { useRef, useEffect } from 'react';
import * as twgl from 'twgl.js';
import { vertexShader, fragmentShader } from './WaveyFooterShaders';



import './WaveyFooter.css';

const WaveyFooter = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const programInfo = twgl.createProgramInfo(gl, [vertexShader, fragmentShader]);


    const arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

    let mouseX = 0, mouseY = 0;

    canvas.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function render(time) {
      twgl.resizeCanvasToDisplaySize(gl.canvas, 0.5); 
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      const uniforms = {
        u_time: (time) * 0.002,
        u_resolution: [gl.canvas.width, gl.canvas.height],
        u_mouse: [mouseX, mouseY],
      };

      gl.useProgram(programInfo.program);
      twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
      twgl.setUniforms(programInfo, uniforms);
      twgl.drawBufferInfo(gl, bufferInfo);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }, []);

  return (
    <>

      <canvas ref={canvasRef} className="wavey-footer-canvas"></canvas>
    </>
  );
};

export default WaveyFooter;
