import React, { useEffect, useState } from 'react';
import './Name.css';
import IconLinks from "./IconLinks";
import Carousel from './Carousel';
import flappybird from '../media/flappybird2.mp4'
import SSVEP from '../media/SSVEP.mp4'
import beatslasher from '../media/beatslasher.mp4'
import abogo from '../media/abogo.jpeg'
import naruto from '../media/naruto.mp4'
import covid from '../media/covid.mp4'
import addressbook from '../media/addressbook.png'
import cugraph from '../media/cugraph.png'


function getRandomColor() {
  const letters = '89ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

  

function hueToRGB(hue, offset = 0) {
    const c = 1;
    hue = (hue + offset) % 360;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = 0;
  
    let r, g, b;
    if (hue < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (hue < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (hue < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (hue < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (hue < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }
  
    return `rgb(${(r + m) * 255}, ${(g + m) * 255}, ${(b + m) * 255})`;
  }

function Name({ text }) {
  const textOptions = [
    "CS @ UWaterloo",
    "Software Developer | Embedded @ smartARM",
    "Duck Father",
  ];
  const portfolioItems = [
    {
      image: addressbook,
      title: 'Address Book',
      description: 'Reactive address book to search through contacts',
      link: "https://github.com/yaxan/address_book",
      tech: "Angular, TypeScript, HTML, CSS"
    },
    {
      video: covid,
      title: 'Social Distance Simulator',
      description: 'Computer game using Ubisoft\'s SFML-based API HackersNest at Hack the North to gain practical experience in C++',
      link: "https://devpost.com/software/social-distance-simulator",
      tech: "C++, SFML"
    },
    {
      video: SSVEP,
      title: 'SSVEP Brain Wave Communication',
      description: 'Brain-Computer Interface to process process different frequency brain waves to communicate verbally',
      link: 'https://github.com/yaxan/EEG-gaming-and-speech',
      tech: "Python, Multiprocessing, Signal Processing, Analog Circuitry, Raspberry Pi, OpenAI API"
    },
    {
      video: flappybird,
      title: 'Brain Wave Flappy Bird',
      description: 'Brain-Computer Interface to process alpha and beta waves and allow user to play Flappy Bird with their brain.',
      link: 'https://github.com/yaxan/EEG-gaming-and-speech',
      tech: "Python, Signal Processing, Analog Circuitry, Raspberry Pi"
    },
    {
      video: naruto,
      title: 'Naruto Handseal Classification',
      description: 'Live camera image classifier for hand gestures using transfer learning based on anime series Naruto',
      link: "https://github.com/yaxan/Naruto_Handsign_Classification",
      tech: "Python, OpenCV, TensorFlow, Transfer Learning"
    },
    {
      image: abogo,
      title: 'AR Gallery Walk',
      description: 'Prototyped Android app for ArtsBuild Ontario at StarterHacks to allow for an interactive artgallery walk using OpenCV and SnapChat\'s SnapKit API',
      awards: "Major League Hacking Best Design Award\nStarerHacks Best Use of SnapKit API\n",
      link: "https://devpost.com/software/abogo",
      tech: "Java, Android Studio, SnapKit API"
    },
    {
      video: beatslasher,
      title: 'Beat Slasher',
      description: 'Designed and implemented all original graphics, sprites, scripts and prefabs for a mobile rhythm game for Android and IOS in Unity',
      link: "https://github.com/yaxan/BeatSlasher",
      tech: "C#, Unity"
    },
    {
      image: cugraph,
      title: 'Facebook Data cuGraph Visualization',
      description: 'GPU-accelerated graph analytics through RAPIDS cuGraph on a Facebook dataset',
      link: "https://github.com/yaxan/Facebook_RAPIDS_cuGraph",
      tech: "Python, CUDA, RAPIDS cuGraph, NetworkX, MatPlotLib"
    },
    // Add more items as needed
  ];
  
  const [currentText2, setCurrentText2] = useState(textOptions[0]);

  const updateText2 = () => {
    const newTextIndex = (textOptions.indexOf(currentText2) + 1) % textOptions.length;
    setCurrentText2(textOptions[newTextIndex]);
  };
  useEffect(() => {
    const updateColor = () => {
      const newColor = getRandomColor();
      const style = document.documentElement.style;
      style.setProperty('--random-color', newColor);
      style.setProperty('--random-shadow-color', newColor);
      style.setProperty('--random-color2', getRandomColor());
    };

    const intervalId = setInterval(updateColor, 4000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId2 = setInterval(() => {
        const textMain = document.querySelector(".text-main");
        textMain.classList.add("laser-animation");
        const newHue = Math.floor(Math.random() * 360);
        const newColor = hueToRGB(240, newHue);
        const style = document.documentElement.style;
        style.setProperty('--laser-text-color', newColor);
        style.setProperty('--laser-hue', `${newHue}deg`);
    
  
      setTimeout(() => {
        updateText2();
        textMain.classList.remove("laser-animation");
      }, 600); // Duration of the laser animation
    }, 2000); // Duration of the interval should be double the laser animation duration
  
    return () => {
      clearInterval(intervalId2);
    };
  });

  //  }, [currentText2]); this is what was there before
  

  return (
    <div className="sleek-text-container">
    <div className="sleek-text" data-text={text}>
        <span className="sleek-text-main">{text}</span>
    </div>
    <div className="subtitle-text">
        <span className="text-main">{currentText2}</span>
    </div>
    <div className='contacts'>
      <span className='contact'>+1 (289) 230-4946</span>
      <a className='email' href='mailto:ymasoud@uwaterloo.ca'>
      <span className='contact'>ymasoud@uwaterloo.ca</span>
      </a>

    </div>

        <IconLinks />

        <Carousel items={portfolioItems} />
    </div>
  );
}

export default Name;
