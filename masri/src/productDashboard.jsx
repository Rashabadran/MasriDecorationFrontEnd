import React, { useState, useEffect } from "react";
import axios from 'axios';
import './BalloonCategory.css';
import './productDashboard.css'
import NavBar from "./NavBar";
import { useParams,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import baskett from './images/xx.png'
import trash from './images/trash2.png'
import pencil from './images/edit.png'
import plus from './images/plus2.png'
import { useNavigate } from "react-router-dom";
function Category() {
  const [category, setCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [productByCat, setProductbyCat] = useState("");
  const [isAllProductsSelected, setIsAllProductsSelected] = useState(true);
  const [colors, setColors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addStudent,setAddStudent]=useState(false);
  const [cattitle,setTitle]=useState("");
  const [productsdata, setproductsdata] = useState()
  const [edittitle, setedittitle] = useState('')
  const [editprice, seteditPrice] = useState('')
  const [editcolor, seteditColor] = useState([])
  const [editDescription, seteditDescription] = useState('')
  const [color, setColor] = useState([])
  const [description, setDescription] = useState('')
  const [discount_per, setSale] = useState(0);
  const [price, setPrice] = useState("");
  const [title,setproductTitle]=useState("")
  const [productimage, setproductimage] = useState([]);
  const [category_id, setcategory_id] = useState(null);
  const [threeimages, setthreeimages] = useState([]);
  const [selectedCategory,setSelectedCategory]=useState("");
  const [Newsale, setNewsale] = useState(0);
  const [Products_id, setProducts_id] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [categoryForm,setCategoryForm]=useState(false);
  const getcategories = async () => {
    try {
      const response = await axios.get("http://localhost:3030/product/");
      {console.log(response.data)}
      setCategory(response.data);

    } catch (error) {
      console.error(error);
    }
  }


  //color
  const handleeditcolor = (event) => {
    seteditColor(event.target.value.split(","));
    
  };


   const handlecolor = (event) => {
    setColor(event.target.value.split(","));
   
  };

  const getproductsbyid = async (id) => {
    setProducts_id(id)
    const response = await axios.get(`http://localhost:3030/allballoons/productbyID/${id}`)
    setproductsdata(response.data)
    setedittitle(response.data.title)
    seteditColor(response.data.color)
    seteditDescription(response.data.description)
    seteditPrice(response.data.price)
    setSale(response.data.discount_per)
    openEditFormPopup();

  }



  const getallitems = async () => {
    try {
      const response = await axios.get("http://localhost:3030/allballoons/product");
      setProducts(response.data);
      setImages(response.data.map((item) => item.image[0]));
    } catch (error) {
      console.error(error);
    }
    
  }


    const addProduct = async () => {
    try{
     
    const formData = new FormData();
     
    formData.append("title", title);
    formData.append("price", price);
    for (let i = 0; i < color.length; i++) {
      formData.append("color", color[i]);
    }
    formData.append("description", description);
    formData.append("discount_per",discount_per)
    

    for (let i = 0; i < productimage.length; i++) {
      formData.append("image", productimage[i]);
    }

    formData.append("category", selectedCategory);

    
    await axios.post("http://localhost:3030/allballoons/product/", formData)
    
     toast.success('Added successfully!', {
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




//add Category
  const addCategory = async (e) => {
    e.preventDefault();
  const addTitle = {
    cattitle: cattitle,
  
  };
  

  try {
    
    await axios.post("http://localhost:3030/product", addTitle);
    // Handle success
    toast.success('Added successfully!', {
      position: toast.POSITION.TOP_RIGHT,
       
       onClose: () => {
        setTimeout(() => {
          window.location.reload();
        }, 3000); 
      },
    });
  } catch (error) {
    // Handle error
    console.error(error);

  }
};


//delete Category


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




const deleteProduct = async (id) => {

  try {
    await axios.delete(`http://localhost:3030/allballoons/product/${id}`);
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
  
 


 function handleProductImage(e) {
    const selectedFiles = e.target.files;
    const newImages = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Check if the file is an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = () => {
          newImages.push(file);
          setproductimage(newImages);
        };

        reader.readAsDataURL(file);
      }
    }
  }


  const editProduct = async () => {
   
    const editdata = {
      title: edittitle,
      price: editprice,
      color: [],
      description: editDescription,
      discount_per:discount_per,
    };

    

    for (let i = 0; i < editcolor.length; i++) {
      editdata.color.push(editcolor[i]);
    }

    const response = await axios.put(`http://localhost:3030/allballoons/productUpdate/${Products_id}`, editdata);

    toast.success('Updated successfully!', {
      position: toast.POSITION.TOP_RIGHT,
       
       onClose: () => {
        setTimeout(() => {
          window.location.reload();
        }, 3000); 
      },
    });
  };

  

  useEffect(() => {
    getcategories();
    getallitems();
  }, []);

  const handleButtonClick = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
    setIsAllProductsSelected(categoryId === "");
  }

 


  const filteredCategory = selectedCategoryId === "" || isAllProductsSelected
    ? products
    : products.filter((item) => item.category._id === selectedCategoryId);

  const openFormPopup = () => {
    setShowForm(true);
  };

  const closeFormPopup = () => {
    setShowForm(false);
  };


   const openEditFormPopup = () => {
    setShowEditForm(true);
  };

  const closeEditFormPopup = () => {
    setShowEditForm(false);
  };

   const openCategoryForm = () => {
     setCategoryForm(true);
   };

   const closeCategoryForm = () => {
     setCategoryForm(false);
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
    <div className="category-container">
      <ToastContainer />
      {checkUserRole()}
      <div className="flexCategory">
        <button class="c-button daily-button" onClick={openCategoryForm}>
          {" "}
          <img className="pluss" src={plus} />
        </button>

        <div className="category-buttons">
          <button
            value=""
            onClick={handleButtonClick}
            className={`category-button ${
              isAllProductsSelected ? "selected" : ""
            }`}
          >
            All Products
          </button>
          {Array.isArray(category) &&
            category.map((item, index) => (
              <button
                key={index}
                value={item._id}
                onClick={handleButtonClick}
                className={`category-button ${
                  selectedCategoryId === item._id ? "selected" : ""
                }`}
              >
                {item.cattitle}
              
                <img
                  className="basketImage "
                  src={baskett}
                  onClick={() => {
                    deleteCategory(item._id);
                  }}
                />
              </button>
            ))}
        </div>
      </div>
      <div className="buttonwithProduct">
        <div className="addProd">
          <button class=" daily-button productAdd" onClick={openFormPopup}>
            Add
          </button>
        </div>
        <div className="allProductsBalloons2">
          {filteredCategory.map((item, index) => {
            return (
              <div className="card2" key={item._id}>
                <img
                  className="card-details2"
                  src={item && item.image[0].url}
                  alt={item.title}
                />
                <div className="priceandTitle2">
                  <div className="titlee2">{item.title}</div>
                  <div className="price2">
                    {item.price === item.priceAfterDiscount ? (
                      <h3>{item.price}$</h3>
                    ) : (
                      <div className="price2">
                        <h3>{item.priceAfterDiscount}$</h3>
                        <h4>{item.price}$</h4>
                      </div>
                    )}
                  </div>
                  <div className="flexTrash">
                    <img
                      src={pencil}
                      className="pencil"
                      alt="edit"
                      onClick={() => {
                        getproductsbyid(item._id);
                      }}
                    />
                    <img
                      className="trash "
                      src={trash}
                      onClick={() => {
                        deleteProduct(item._id);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {categoryForm && (
        <div className="res-popupPro">
          <div className="res-popup-contentCat">
            <h1>Add Category Info</h1>

            <label className="alignForm">
              Category: &nbsp;&nbsp;
              <input
                className="textForm1 "
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                name="cattitle"
                required
              ></input>
            </label>
            <br />
            <input
              type="submit"
              onClick={(e) => {
                addCategory(e);
              }}
              className="button colle-btn daily-button daily-button"
            ></input>
            <br />

            <input
              type="submit"
              value="close"
              className="button colle-btn daily-button"
              onClick={() => closeCategoryForm()}
            ></input>

            <br />
          </div>
        </div>
      )}

      {showForm && (
        <div className="res-popupPro">
          <div className="res-popup-contentPro">
            <h1>Add Products </h1>

            <label>
              <b>Title</b>
            </label>
            <input
              className="textAdd"
              type="text"
              placeholder="Enter the product name"
              name="title"
              required
              onChange={(e) => setproductTitle(e.target.value)}
            />
            <br />

            <label>
              <b>Price</b>
            </label>
            <input
              className="textAdd"
              type="text"
              placeholder="Enter price"
              name="psw"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />

            <label className="textform">Sale</label>
            <br />
            <input
              className="textAdd"
              type="text"
              value={discount_per}
              onChange={(e) => setSale(e.target.value)}
            />
            <br />

            <label className="textform">color</label>
            <br />
            <input
              className="textAdd"
              type="text"
              value={color}
              onChange={handlecolor}
            />
            <br />

            <label className="textform">Description</label>
            <br />
            <input
              className="textAdd"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />

            <label>Select an option:</label>
            <select
              className="textAdd"
              value={category._id}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option></option>
              {Array.isArray(category) &&
                category.map((item) => (
                  <option value={item._id}>{item.cattitle}</option>
                ))}
            </select>
           
            <div>
              <label>Choose Images:</label>
              <br />
              <input
                className="textAdd"
                type="file"
                id="images"
                name="file"
                onChange={handleProductImage}
                multiple
              />
              <br />
              {threeimages.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index}`} />
              ))}
            </div>

            <button
              type="submit"
              className="daily-button addb"
              onClick={() => {
                addProduct();
              }}
            >
              Submit
            </button>
            <br />
            <br />
            <button
              type="close"
              className="daily-button addb"
              onClick={closeFormPopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="res-popupEdit">
          <div className="res-popup-contentEdit">
            <h1>Edit Products </h1>

            <label>
              <b>Title</b>
            </label>
            <input
              className="textAdd"
              type="text"
              placeholder={productsdata && productsdata.title}
              name="title"
              required
              onChange={(e) => {
                setedittitle(e.target.value);
              }}
            />
            <br />

            <label>
              <b>Price</b>
            </label>
            <input
              className="textAdd"
              type="text"
              placeholder={productsdata && productsdata.price}
              name="psw"
              required
              onChange={(e) => {
                seteditPrice(e.target.value);
              }}
            />
            <br />

            <label className="textform">
              <b>color</b>
            </label>
            <input
              className="textAdd"
              type="text"
              placeholder={productsdata && productsdata.color}
              onChange={handleeditcolor}
            />
            <br />

            <label className="textform">
              <b>Description</b>
            </label>
            <input
              className="textAdd"
              type="text"
              placeholder={productsdata && productsdata.description}
              onChange={(e) => seteditDescription(e.target.value)}
            />
            <br />
            <br />
            <button
              type="submit"
              className="daily-button addb"
              onClick={() => {
                editProduct();
              }}
            >
              Update
            </button>
            <br />
            <br />
            <button
              type="close"
              className="daily-button addb"
              onClick={closeEditFormPopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;
