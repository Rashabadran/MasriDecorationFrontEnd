import React from 'react';
import Image1 from './images/a1.png';
import Image2 from './images/a11.jpg';
import Image3 from './images/a11.jpg';
import Image4 from './images/a11.jpg';
import Image5 from './images/a11.jpg';
import './Decoration.css'
import { Gallery } from "react-grid-gallery";
const Decoration = () => {
  const imagePaths = [
    { id:1,src: Image1 },
    { id:2,src: Image2 },
    { id:3,src: Image3 },
    {id:4, src: Image4 },
    {id:5, src: Image5 },
    // Add more image paths as needed
  ];

  return (
    <div className="photo-grid">
   
  <div className="gallery">
      {imagePaths.map(photo => (
        <div key={photo.id} className="gallery-item">
          <img src={photo.src} alt={photo.alt} />
        </div>
      ))}
    </div>
     
    </div>
  );
};

export default Decoration;
