import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Html, useTexture } from "@react-three/drei";
import ColorContext from './ColorContext';
import * as THREE from "three";

const Shape = ({ textureURL, position, rotationDirection, text }) => {
    const mesh = useRef();
    const [decal] = useTexture([textureURL]);
    const [isHovered, setIsHovered] = React.useState(false);


    const rotationState = useRef({ time: 0, positionTime: 0 });
    const rotationAmplitude = 0.3;
    const rotationSpeed = 1.5;
    
    useFrame((state, delta) => {
      rotationState.current.time += delta;
      rotationState.current.time %= 2 * Math.PI;
    
      rotationState.current.positionTime += delta * rotationSpeed;
      rotationState.current.positionTime %= 2 * Math.PI;
      
      mesh.current.rotation.y = Math.sin(rotationState.current.time * rotationSpeed) * rotationAmplitude * rotationDirection;
      mesh.current.rotation.x = Math.sin(rotationState.current.time * rotationSpeed) * rotationAmplitude * rotationDirection;
      mesh.current.position.y += Math.sin(rotationState.current.positionTime) * 0.002 * rotationDirection;
      mesh.current.position.x += Math.sin(rotationState.current.positionTime) * 0.002 * rotationDirection;
      mesh.current.position.z += Math.sin(rotationState.current.positionTime) * 0.002 * rotationDirection;
    });
    
  

  return (
    <mesh
      castShadow
      receiveShadow
      ref={mesh}
      position={position}
      scale={[0.5, 0.5, 0.5]}
      onPointerOver={(e) => setIsHovered(true)}
      onPointerOut={(e) => setIsHovered(false)}
      onPointerDown={(e) => setIsHovered(true)}
      onPointerUp={(e) => setIsHovered(false)}
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#000000"
        polygonOffset
        polygonOffsetFactor={-5}
        flatShading
      />
      <Decal
        position={[0, 0, 1]}
        rotation={[2 * Math.PI, 0, 6.25]}
        scale={1}
        map={decal}
        flatShading
      />
      {isHovered && (
        <Html distanceFactor={10} zIndexRange={[100, 0]} style={{ pointerEvents: "none" }}>
            <div
            className={`mesh-text ${isHovered ? 'show' : 'hide'}`}
            >
            <style>
            {`
            @keyframes slideBg {
                0% {
                background-position: 200% 0;
                }
                100% {
                background-position: -200% 0;
                }
            }

            @keyframes fadeInRotate {
                0% {
                opacity: 0;
                transform: translateY(10px) rotate(-10deg);
                }
                100% {
                opacity: 1;
                transform: translateY(0) rotate(0);
                }
            }

            @keyframes fadeOutRotate {
                0% {
                opacity: 1;
                transform: translateY(0) rotate(0);
                }
                100% {
                opacity: 0;
                transform: translateY(10px) rotate(10deg);
                }
            }

            .mesh-text {
                color: white;
                background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(128, 128, 128, 0.6));
                background-size: 200% 100%;
                border-radius: 12px;
                padding: 16px;
                font-size: 2rem;
                font-weight: bold;
                font-family: 'Montserrat', sans-serif;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                pointer-events: none;
                animation: slideBg 5s linear infinite;
            }

            .mesh-text.show {
                animation: fadeInRotate 0.5s forwards;
            }

            .mesh-text.hide {
                animation: fadeOutRotate 0.5s forwards;
            }
            `}
            </style>


            {text}
            </div>

        </Html>
      )}
    </mesh>
  );
};

const FloatingShapes = ({ decals }) => {
  const { color } = React.useContext(ColorContext);
  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight * 0.6,
  });

  const [gridSize, setGridSize] = React.useState(5);
  const [gridSpacing, setGridSpacing] = React.useState(2.5);
  const [offsetY, setOffsetY] = React.useState(4);
  const [offsetX, setOffsetX] = React.useState(1.3);

  

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight * 0.6,
      });

      // Update gridSize and gridSpacing based on window width
      if (window.innerWidth < 768) {
        setGridSize(4);
        setGridSpacing(1.5);
        setOffsetY(0.5);
        setOffsetX(0.8);
      } else {
        setGridSize(5);
        setGridSpacing(2.5);
        setOffsetY(4);
        setOffsetX(1.3);
      }
    };

    handleResize(); // Call handleResize initially to set the correct gridSize and gridSpacing
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const shapesData = decals.flatMap((decal, index) => {
    const position = [
      (index % gridSize) * gridSpacing - (gridSize * gridSpacing) / 2 + offsetX,
      (gridSize * gridSpacing) / 2 - Math.floor(index / gridSize) * gridSpacing - offsetY,
      0,
    ];
    return {
      textureURL: decal.url,
      position,
      rotationDirection: index % 2 === 0 ? 1 : -1, // Change the rotation direction based on the index
      text: decal.text, // Assuming the 'text' property is available in the 'decal' object
    };
  });

  return (
    <Canvas
      style={{
        position: "relative",
        margin: 0,
        top: 0,
        left: 0,
        right: 0,
        transform: "translate(0%, 10%)",
        width: dimensions.width,
        height: dimensions.height,
        flexWrap: "wrap",
        alignContent: "flex-start",
        display: "flex",


      }}
      camera={{
        fov: 80,
        position: [0, 0, 4.5], // Change the camera position
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, -1, 0.05] } intensity={0.7} color={new THREE.Color(color)}/>
      <directionalLight color={new THREE.Color(color)} position={[0, -0.5, -2]}  />
      {shapesData.map((shapeData, index) => (
        <Shape key={index} {...shapeData} />
      ))}
    </Canvas>
  );
};

export default FloatingShapes;
