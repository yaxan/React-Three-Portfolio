// src/IconLinks.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import './IconLinks.css';

function IconLinks() {
  return (
    <div className="icon-container">
      <a href="https://www.linkedin.com/in/yaxan/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} className="icon" />
      </a>
      <a href="https://github.com/yaxan" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} className="icon" />
      </a>
      <a href={`${process.env.PUBLIC_URL}/resume.pdf`} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFileAlt} className="icon" />
      </a>
    </div>
  );
}

export default IconLinks;
