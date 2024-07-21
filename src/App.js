import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
//import { Html } from '@react-three/drei';
import Stars from './components/Stars';
import Name from './components/Name';
//import TestComponent from './components/TestComponent';
import FloatingShapes from './components/FloatingShapes';
import ColorContext from './components/ColorContext';
import WorkExperienceTimeline from './components/WorkExperienceTimeline';
import WaveyFooter from './components/WaveyFooter';
import cpp from './media/Cpp.png'
import clogo from './media/C_Logo.png'
import python from './media/python.png'
import Git from './media/Git.png'
import Linux from './media/Linux.png'
import webdev from './media/webdev.png'
import pytorch from './media/pytorch.png'
import Angular from './media/Angular.png'
import Reactlogo from './media/React.png'
import SQL from './media/SQL.png'
import CSharp from './media/CSharp.png'
import dotNET from './media/dotNET.png'
import TS from './media/TS.png'
import node from './media/node.png'
import threejslogo from './media/threejs.png'
import AWS from './media/aws.png'
import kubernetes from './media/kubernetes.png'
import cuda from './media/cuda.png'

const decals = [
  { url: cpp, text: "C++"},
  { url: clogo, text: "C" },
  { url: CSharp, text: "C#" },
  { url: webdev, text: "HTML/CSS/JavaScript" },
  { url: python, text: "Python" },
  { url: threejslogo, text: "Three.js" },
  { url: Linux, text: "Linux Development" },
  { url: Git, text: "Git" },
  { url: pytorch, text: "PyTorch" },
  { url: Angular, text: "Angular" },
  { url: Reactlogo, text: "React" },
  { url: SQL, text: "SQL" },
  { url: dotNET, text: ".NET" },
  { url: TS, text: "TypeScript" },
  { url: node, text: "Node.js" },
  { url: AWS, text: "AWS" },
  { url: kubernetes, text: "Kubernetes" },
  { url: cuda, text: "CUDA" },

  // Add more decals here
];

function hexToRGBA(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function App() {
  const [dpr, setDpr] = useState(window.devicePixelRatio);
  const [color, setColor] = useState(0x00ffff);

  useEffect(() => {
    const handleResize = () => {
      setDpr(window.devicePixelRatio);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app-container">
    <div style={{position: 'absolute',height: '100%', width: '100%'}} >
    <ColorContext.Provider value={{ color, setColor }}>

      <div style={{
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',

          paddingTop: '20px', // Add padding to the top
        }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          top: -700,
          bottom: 0,
          right: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          position: 'inherit',
          overflow: 'hidden',
        }}>
          <div style={{position: 'static', "--text-shadow-color": color}}>
            <Name text={"Yazan Masoud"} />
          </div>
          <div className='Skills' style={{ '--text-shadow-color': hexToRGBA(`#${color.toString(16).padStart(6, '0')}`, 1) }}>
            <span>Skills</span>
          </div>
          <div style={{ width: "100vw", height: "100%",}}>
          <FloatingShapes decals={decals} />
          </div>

          <div style={{zIndex: 10, width: '100%', height: '100%'}}> 
            <WorkExperienceTimeline />
          </div>

          <div style={{width:'100vw',   height: '15vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}> 
            <WaveyFooter />
  
          </div>
          <footer className='footer'>Made by Yazan Masoud</footer>
        </div>
        

      </div>
      <div style={{position: 'fixed', width: "100vw", height: "100vh"}}>
      <Canvas
        camera={{
          fov: 120,
          aspect: window.innerWidth / window.innerHeight,
          near: 1,
          far: 1000,
          position: [0, 0, 1],
          rotation: [Math.PI/2, 0, 0],
        }}
        dpr={dpr}
      >
        <Stars />        
      </Canvas>
      </div>

    </ColorContext.Provider>
    

    </div>

    </div>
  );
}
          
export default App;
