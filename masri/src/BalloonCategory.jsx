import React, { useState, useEffect } from "react";
import axios from 'axios';
import './BalloonCategory.css';
import NavBar from "./NavBar";
import { useParams,Link } from 'react-router-dom';
import Loader from "./Loader/loader";
function Category() {
  const [category, setCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [productByCat, setProductbyCat] = useState("");
  const [isAllProductsSelected, setIsAllProductsSelected] = useState(true);
   

  const getcategories = async () => {
    try {
      const response = await axios.get(
        "https://masrishop.onrender.com/product/"
      );
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

 

  const getallitems = async () => {
    try {
      const response = await axios.get(
        "https://masrishop.onrender.com/allballoons/product"
      );
      setProducts(response.data);
      setImages(response.data.map((item) => item.image[0]));
    } catch (error) {
      console.error(error);
    }
  }

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


    if (!products) {
      return (
        <>
          <Loader />
        </>
      );
    }
    
  return (
    <div className="category-container">
    

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
            </button>
          ))}
      </div>
      <div className="allProductsBalloons">
        {filteredCategory.map((item, index) => {
          return (
            <div className="card" key={item._id}>
              
              <img
                className="card-details"
                src={item && item.image[0].url}
                alt={item.title}
              />
              <div className="priceandTitle">
                <div className="titlee">{item.title}</div>
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
                <div className="colors">
                  
                  <p>
                    <span>Colors : </span>
                    {item.color.join(", ")}
                  </p>
                </div>
              </div>

              <Link to={`/singleproduct/${item._id}`}>
                <button className="card-button">More info</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
