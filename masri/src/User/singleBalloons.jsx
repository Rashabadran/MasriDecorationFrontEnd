import React, { useState, useEffect } from 'react';
import './singleBalloons.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Carousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const goToNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  return (
    <div className="carousel">
      <button className="carousel-btn" onClick={goToPreviousImage}>
        &lt;
      </button>
      <img
        src={images[currentImage]}
        alt="Carousel Image"
        className="carousel-image"
      />
      <button className="carousel-btn" onClick={goToNextImage}>
        &gt;
      </button>
    </div>
  );
};

const SingleBalloons = () => {
  const [quantity, setQuantity] = useState(1);
  const [valueQuantity, setValueQuantity] = useState();
  const [data, setData] = useState({});
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const { productId } = useParams();
  const [valueColors, setValueColors] = useState([]);
   const [canorder, setcanorder] = useState(true);


  function checkUserRole() {
    const userRole = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    // Get the user's role from session storage
    if (!token || !userRole) {
      // User has the 'user' role, so navigate to the desired page
      localStorage.clear();
      setcanorder(false);
    } else {
      setcanorder(true);
    }
  }
  useEffect(() => {
    loadSingleProduct();
  }, [productId]);

  useEffect(() => {
    setColors(data.color || []);
  }, [data.color]);

  useEffect(() => {
    setImages(data.image || []);
  }, [data.image]);

  function handleColorClick(event) {
    setValueColors(event.target.value);
  }
  useEffect(() => {
    checkUserRole();
   
  }, []);

  const saveToLocalStorage = () => {
    if(canorder){
    // Get the existing cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the product is already in the cart
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item._id === data._id
    );

    if (existingCartItemIndex !== -1) {
      // If the product is already in the cart, increment its quantity
      cartItems[existingCartItemIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it as a new item
      const firstImage = images[0]?.url;
      cartItems.push({
        _id: data._id,
        title: data.title,
        price: data.price,
        priceAfterDiscount: data.priceAfterDiscount,
        color: valueColors,
        quantity: quantity,
        image: firstImage, // Add the first image URL to the cart item
      });
    }

    // Save the updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.location.href="/order"
  }
  else{
    toast.error("please sign in to continue this order", {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => {
        setTimeout(() => {
          window.location.reload();
        }, 3000); 
      },
   
      });
  }
}

  const loadSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://masrishop.onrender.com/allballoons/productbyID/${productId}`
      );
      setData(res.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const carouselImages = images.map((image) => image?.url);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="app">
      <ToastContainer />
      <div className="both">
        <div className="first">
          <Carousel images={carouselImages} />
        </div>
        <div className="second">
          <div className="details">
            <p className="title">{data.title}</p>
            <br />
            <div className="price">
              Price:
              {data.price === data.priceAfterDiscount ? (
                <h3>{data.price}$</h3>
              ) : (
                <div className="price">
                  <h3>{data.priceAfterDiscount}$</h3>
                  <h4>{data.price}$</h4>
                </div>
              )}
            </div>

            <p className="size">
              Color:
              <div className="colorDetails">
                {colors.map((color, index) => (
                  <button
                    className={
                      valueColors === color
                        ? "colorDetailsName colorDetailsNameActive"
                        : "colorDetailsName"
                    }
                    key={index}
                    value={color}
                    onClick={handleColorClick}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </p>
            <div className="quantity-button">
              <p className="quantityText">Quantity</p>
              <p className="borderr">
                <button
                  className="quantity-button__decrease"
                  onClick={handleDecrease}
                >
                  -
                </button>
                <span className="quantity-button__quantity">{quantity}</span>
                <button
                  className="quantity-button__increase"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </p>
            </div>
            <div className="description">
              <p className="descriptionTitle">Description</p>
              <ul className="descriptionDetails">
                <li>{data.description}</li>
              </ul>
            </div>
            <div>
              <button
                className=" daily-button cartButton"
                onClick={saveToLocalStorage}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBalloons;
