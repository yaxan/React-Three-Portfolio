import React, { useMemo, useRef, useEffect, useCallback, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { Sprite, SpriteMaterial, TextureLoader } from 'three';
import ColorContext from './ColorContext';

function Stars() {
  const { setColor } = React.useContext(ColorContext);
  const glow = useLoader(TextureLoader, 'glow.png');
  const groupRef = useRef();

  const isLowPerformanceDevice = () => {
    const hasFewCores = window.navigator.hardwareConcurrency <= 4;
    const isSmallScreen = Math.min(window.innerWidth, window.innerHeight) <= 480;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return hasFewCores || isSmallScreen || isTouchDevice;
  };

  const meshCount = isLowPerformanceDevice() ? 75 : 500;

  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0); // New state variable to track last scroll position

  const meshes = useMemo(() => {
    const tempMeshes = [];
    for (let i = 0; i < meshCount; i++) {
      const x = Math.random() * 600 - 300;
      const y = Math.random() * 600 - 300;
      const z = Math.random() * 1000 - 500;
      tempMeshes.push({ position: [x, y, z] });
    }
    return tempMeshes;
  }, [meshCount]);

  function useScroll(callback) {
    const onScroll = useCallback(() => {
      requestAnimationFrame(callback); // Use requestAnimationFrame for scroll events
    }, [callback]);

    useEffect(() => {
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);
  }

  const throttledUseFrame = useCallback(() => {
    let frame = 0;
    return ({ camera }) => {
      frame++;
      if (frame % 2 === 0) {
        return;
      }

      const d = new Date();

      groupRef.current.children.forEach((star) => {
        star.position.y -= 0.04;
        const distance = camera.position.z - star.position.z;
        const acceleration = Math.max(0.05, Math.pow(-distance / 120, 2));
        star.position.y -= acceleration;
        groupRef.current.rotation.z += Math.atan(d.getTime()) * 0.000001;
        groupRef.current.rotation.y += Math.atan(d.getTime()) * 0.000001;
        groupRef.current.rotation.x += Math.atan(d.getTime()) * 0.000001;
        if (star.position.y < -200) {
          star.position.y = 200;
        }
      });
    };
  }, []);

  useFrame(throttledUseFrame());

  useScroll(() => {
    if (!groupRef.current) {
      return;
    }
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercentage =
      scrollPos / (document.documentElement.scrollHeight - window.innerHeight);

    const scrollDirection = scrollPos > lastScrollPos ? 1 : -1; // Calculate the scroll direction
    setLastScrollPos(scrollPos); // Update the last scroll position

    let firstChildColor;

    groupRef.current.children.forEach((star, index) => {

      const glow = star.children[0];
      if (!glow) {
        return;
      }
      if (scrollPos === 0) {
        glow.material.color.set(0x00ffff); // Set the color to 0xFFFF cyan when at the top
      } else {
        const hue = scrollPercentage * 360;
        glow.material.color.setHSL(hue, 1, 0.5);
      }

      // Adjust the rotation based on the scroll direction
      groupRef.current.rotation.x -= scrollDirection * scrollPercentage * 0.000025;
      groupRef.current.rotation.z -= scrollDirection * scrollPercentage * 0.000025;
      groupRef.current.rotation.y -= scrollDirection * scrollPercentage * 0.000025;
      const scale = 1 + scrollPercentage * 0.5;
      star.scale.set(scale, scale, scale);
    
      if (index === 0) {
        firstChildColor = glow.material.color.getHex();
      }
    });
    
    // Set the color to white when scrolling starts
    if (!isScrolling) {
      setColor(0xffffff);
    }
    
    // Set scrolling state to true and clear the previous timeout if any
    setIsScrolling(true);
    clearTimeout(window.scrollFinishedTimeout);
    
    // Set a timeout to check if scrolling has stopped after 100ms
    window.scrollFinishedTimeout = setTimeout(() => {
      setIsScrolling(false);
      setColor(firstChildColor);
    }, 20);});

    useEffect(() => {
      if (groupRef.current) {
        groupRef.current.children.forEach((mesh) => {
        const sprite = new Sprite(
          new SpriteMaterial({
            map: glow,
            color: 0xffff,
            transparent: true,
          }),
        );
        sprite.scale.set(3, 3, 1);
        mesh.add(sprite);
        });
      }
    }, [groupRef, glow]);
    
    return (
      <group ref={groupRef}>
        {meshes.map((mesh, index) => (
          <mesh key={index} position={mesh.position} renderOrder={-10}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color={0xffffff} />
          </mesh>
        ))}
      </group>
      );
    }
    
    export default Stars;
      
