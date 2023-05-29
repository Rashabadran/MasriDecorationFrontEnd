import React, { useState, useEffect } from 'react';
import './singleBalloons.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

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

  const saveToLocalStorage = () => {
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
  };

  const loadSingleProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3030/allballoons/productbyID/${productId}`
      );
      setData(res.data);
      console.log(data);
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
      <div className="both">
        <div className="first">
          <Carousel images={carouselImages} />
        </div>
        <div className="second">
          <div className="details">
            <p className="title">{data.title}</p>
            <div className="price">
              {data.price === data.priceAfterDiscount ? (
                <h3>{data.price}$</h3>
              ) : (
                <div className="price">
                  <h3>{data.priceAfterDiscount}$</h3>
                  <h4>{data.price}$</h4>
                </div>
              )}
            </div>
            <p className="size">Color</p>
            <div className="colorDetails">
              {colors.map((color, index) => (
                <button
                  className="colorDetailsName"
                  key={index}
                  value={color}
                  onClick={handleColorClick}
                >
                  {color}
                </button>
              ))}
            </div>
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
              <Link to={`/Order`}>
                <button className="cartButton" onClick={saveToLocalStorage}>
                  Add to cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBalloons;
