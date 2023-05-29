import React, { useEffect,useState } from 'react';
import Image1 from './images/a1.png';
import Image2 from './images/a11.jpg';
import Image3 from './images/a11.jpg';
import Image4 from './images/a11.jpg';
import Image5 from './images/a11.jpg';
import './Decoration.css'
import axios from 'axios';
import { Gallery } from "react-grid-gallery";
const Decoration = () => {

const [threeimages, setthreeimages] = useState([]);
  const [getimages,setImagess]=useState([])
  const [allImages,setAllImages]=useState([])
  const [showAddForm, setShowAddForm] = useState(false);

const getallitems = async () => {
    try {
      const response = await axios.get("http://localhost:3030/decorationCat/");
     setAllImages(response.data)
      setImagess(response.data.map((item) => item.image));
      
    } catch (error) {
      console.error(error);
    }
    
  }
  useEffect(() => {
    getallitems();
  }, []);

  return (
    <div className="photo-grid">
   
  <div className="gallery">
       {allImages.map((photo,index) => (
        <div key={index} className="gallery-item2">
          <img src={getimages[index].url} alt={photo.alt} />
          
        </div>
     
       
       
      ))}
    </div>
     
    </div>
  );
};

export default Decoration;
 