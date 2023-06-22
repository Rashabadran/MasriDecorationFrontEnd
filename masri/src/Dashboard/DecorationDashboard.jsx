import React, { useEffect } from 'react';
import './DecorationDashboard.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import trash from '../images/trash2.png';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DecorationDashboard = () => {

  
  const [threeimages, setthreeimages] = useState("");
  const [getimages,setImagess]=useState("")
  const [allImages,setAllImages]=useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [image,setImage]=useState("");
  const [userId, setUserId] = useState("");
  
const handleImageChange = async (event) => {
    event.preventDefault();
    setImage(event.target.files[0]);
  };
const getallitems = async () => {
    try {
      const response = await axios.get(
        "https://masrishop.onrender.com/decorationCat/"
      );
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
    
    
    await axios.post("https://masrishop.onrender.com/decorationCat/", formData);
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
    await axios.delete(`https://masrishop.onrender.com/decorationCat/${id}`);
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



   const navigate = useNavigate();

   function checkUserRole() {
     const userRole = sessionStorage.getItem("role");
     const token = sessionStorage.getItem("token");

     // Get the user's role from session storage
     if (!token || userRole === "user") {
       // User has the 'user' role, so navigate to the desired page

       navigate("/Login", { replace: true });
     }
   }

  return (
    <div className="photo-grid2">
      <ToastContainer />
      {checkUserRole()}
      <button
        type="submit"
        className="daily-button addDeco"
        onClick={openAddFormPopup}
      >
        Add
      </button>

      <div className="gallery2">
        {Array.isArray(allImages) &&
          allImages.map((photo, index) => (
            <div key={index} className="gallery-item2">
              <img src={allImages[index]?.image?.url} alt={photo.alt} />
              

              <img
                src={trash}
                className="xtrash"
                onClick={() => {
                  deleteCategory(photo._id);
                }}
              />
            </div>
          ))}
      </div>
      {showAddForm && (
        <div className="res-popup">
          <div className="res-popup-content">
            <h1 className="titleIma">Add Image</h1>
            <input
              className="textAdd"
              type="file"
              id="images"
              name="image"
              onChange={handleImageChange}
            />

            <button
              type="submit"
              className="daily-button addb"
              onClick={() => {
                addProduct();
              }}
            >
              Submit
            </button>
            <br/>
            <br/>
            <button
              type="submit"
              className="daily-button addb"
              onClick={() => {
                closeAddFormPopup();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecorationDashboard;
