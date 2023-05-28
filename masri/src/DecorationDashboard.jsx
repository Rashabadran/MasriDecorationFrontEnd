import React from 'react';
import Image1 from './images/a1.png';
import Image2 from './images/a11.jpg';
import Image3 from './images/a11.jpg';
import Image4 from './images/a11.jpg';
import Image5 from './images/a11.jpg';
import './DecorationDashboard.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import trash from './images/x2.png';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Gallery } from "react-grid-gallery";
const DecorationDashboard = () => {
  const imagePaths = [
    { id:1,src: Image1 },
    { id:2,src: Image2 },
    { id:3,src: Image3 },
    {id:4, src: Image4 },
    {id:5, src: Image5 },
    // Add more image paths as needed
  ];


   const deleteCategory = async (id) => {

  try {
    await axios.delete(`http://localhost:3030/product/${id}`);
    toast.success('Deleted successfully!', {
      position: toast.POSITION.TOP_RIGHT,
       
       onClose: () => {
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Delay the reload for 3 seconds after the toast notification is closed
      },
    });
    
  } catch (error) {
    // Handle the error
    console.log(error);
  }
};

  return (
    <div className="photo-grid2">
   
  <div className="gallery2">
     
      {imagePaths.map(photo => (
        <div key={photo.id} className="gallery-item2">
          <img src={photo.src} alt={photo.alt} />
           <img src={trash} className='xtrash'/>
        </div>
        
        
       
      ))}
      
        
        
       
      
      
      
    </div>

     
    </div>
  );
};

export default DecorationDashboard;
