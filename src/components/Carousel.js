import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';
import ColorContext from './ColorContext';

function hexToRGBA(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [dragStart, setDragStart] = useState(null);
  const width = 400; // Width of each card
  const gap = 30; // Gap between cards
  const itemRefs = useRef([]);
  const { color } = React.useContext(ColorContext);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items]);

  const handleDragStart = (clientX) => {
    setDragStart(clientX);
  };

  const handleDragEnd = (clientX) => {
    if (dragStart !== null) {
      const delta = clientX - dragStart;
      if (Math.abs(delta) > width / 40) {
        setActiveIndex((prev) => (prev + (delta > 0 ? -1 : 1) + items.length) % items.length);
      }
      setDragStart(null);
    }
  };

  const handleDragMove = (clientX) => {
    if (dragStart !== null) {
      const currentItem = itemRefs.current[activeIndex];
      const delta = clientX - dragStart;
      currentItem.style.transform = `translateX(${delta}px) scale(1.1)`;
    }
  };

  const renderItem = (item, index) => {
    const isActive = index === activeIndex;
    const offset = (index - activeIndex) * (width + gap);
  
    const tiltDirection = index < activeIndex ? 20 : index > activeIndex ? -20 : 0;
    const zIndex = isActive ? items.length : items.length - Math.abs(activeIndex - index);
  
    const tilt = (e) => {
      if (isActive) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xOffset = ((y / rect.height) * 2 - 1) * -10;
        const yOffset = ((x / rect.width) * 2 - 1) * 10;
        e.currentTarget.style.transform = `perspective(800px) translateX(${offset}px) scale(${isActive ? 1.1 : 0.9}) rotateY(${yOffset}deg) rotateX(${xOffset}deg)`;
      }
    };
    
    
  
    const resetTilt = (e) => {
      e.currentTarget.style.transform = `perspective(800px) translateX(${offset}px) scale(${isActive ? 1.1 : 0.9}) rotateY(${isActive ? 0 : tiltDirection}deg)`;
    };
  
    return (
      <div
        key={index}
        ref={(el) => (itemRefs.current[index] = el)}
        className={`carousel-item${isActive ? ' active' : ''}`}
        style={{
          transform: `perspective(800px) translateX(${offset}px) scale(${isActive ? 1.1 : 0.9}) rotateY(${isActive ? 0 : tiltDirection}deg)`,
          zIndex: zIndex,
        }}
        onMouseMove={tilt}
        onMouseLeave={resetTilt}
      >
        {item.video ? (
          <video src={item.video} alt={item.title} draggable={false} muted loop autoPlay />
        ) : (
          <img src={item.image} alt={item.title} draggable={false} />
        )}
        <div className="carousel-item-content">
          <h3>{item.title}</h3>
          <h4>{item.awards}</h4>
          <p>{item.description}</p>
          <h4>{item.tech}</h4>
          <a href={item.link} target="_blank" className="cta" rel="noreferrer noopener">View Details</a>
        </div>
      </div>
    );
  };

  return <div 
  className="carousel-container"
  onMouseDown={(e) => handleDragStart(e.clientX)}
  onMouseUp={(e) => handleDragEnd(e.clientX)}
  onMouseMove={(e) => handleDragMove(e.clientX)}
  onMouseLeave={(e) => handleDragEnd(e.clientX)}
  onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
  onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
  onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}>
  {items.map(renderItem)}<span className='Projects' style={{ '--text-shadow-color': hexToRGBA(`#${color.toString(16).padStart(6, '0')}`, 1) }}>Projects</span></div>;
};

export default Carousel;