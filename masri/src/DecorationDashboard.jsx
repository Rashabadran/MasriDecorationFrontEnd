import React, { useEffect } from 'react';
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
import { useState } from 'react';

const DecorationDashboard = () => {

  
  const [threeimages, setthreeimages] = useState("");
  const [getimages,setImagess]=useState("")
  const [allImages,setAllImages]=useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [image,setImage]=useState("");

const handleImageChange = async (event) => {
    event.preventDefault();
    setImage(event.target.files[0]);
  };
const getallitems = async () => {
    try {
      const response = await axios.get("http://localhost:3030/decorationCat/");
     setAllImages(response.data)
     
      
    } catch (error) {
      console.error(error);
    }
    
  }
  useEffect(() => {
    getallitems();
  }, []);


   const addProduct = async () => {
    try{
     
    const formData = new FormData();
    formData.append("image", image);
    {console.log("rrrrr",formData)}
    
    await axios.post("http://localhost:3030/decorationCat/", formData)
     
     toast.success('Added successfully!', {
      position: toast.POSITION.TOP_RIGHT,
       
       onClose: () => {
        setTimeout(() => {
          window.location.reload();
        }, 3000); 
      },
    })
    setImage(null);
   
  }
  catch (error) {
    // Handle the error appropriately, such as displaying an error message
    console.error("Error adding product:", error);
    // Example: Display a toast error message
    toast.error("Failed to add product.", { position: toast.POSITION.TOP_RIGHT });
  }
 };


   const deleteCategory = async (id) => {
   
  try {
    await axios.delete(`http://localhost:3030/decorationCat/${id}`);
    toast.success('Deleted successfully!', {
      position: toast.POSITION.TOP_RIGHT,
       
       onClose: () => {
        setTimeout(() => {
          window.location.reload();
        }, 3000); 
      },
    })
   
  }
  catch (error) {
    // Handle the error appropriately, such as displaying an error message
    console.error("Error adding product:", error);
    // Example: Display a toast error message
    toast.error("Failed to add product.", { position: toast.POSITION.TOP_RIGHT });
  }
};


 const openAddFormPopup = () => {
    setShowAddForm(true);
  };

  const closeAddFormPopup = () => {
    setShowAddForm(false);
  };
  return (
    <div className="photo-grid2">
   <ToastContainer />
  <button type="submit" className="b-all addDeco" onClick={openAddFormPopup} >Add</button>
 
  <div className="gallery2">
  
   
    
      {Array.isArray(allImages) && allImages.map((photo,index) => (
        <div key={index} className="gallery-item2">
          <img src={allImages[index]?.image?.url} alt={photo.alt} />
          {console.log("mm",allImages)}
          {console.log("image",image)}
          
           <img src={trash} className='xtrash' onClick={() => {deleteCategory(photo._id)}}/>
        </div>
     
       
       
      ))}
      
       
    </div>
       {showAddForm && (
        <div className="res-popup">
          <div className="res-popup-content">
     <input className="textAdd" type="file" id="images" name="image" onChange={handleImageChange} />
     
     <button type="submit" className="b-all addb" onClick={() => { addProduct(); }}>Submit</button>
    </div>
        
       </div>
      
      
      )}
       
        
    </div>
  );
};

export default DecorationDashboard;
