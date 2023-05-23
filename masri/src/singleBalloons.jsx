import React, { useState, useEffect } from 'react';
import './singleBalloons.css';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
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
  const {productId} = useParams();

  useEffect(() => {
    loadSingleProduct();
  }, [productId]);

  useEffect(() => {
    setColors(data.color || []);
  }, [data.color]);

  useEffect(() => {
    setImages(data.image || []);
  }, [data.image]);

  const loadSingleProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3030/allballoons/productbyID/${productId}`
      );
      setData(res.data);
      console.log(data)
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
              {/* <Link to={`/Order`}> <button className='cartButton' onClick={saveToLocalStorage}> Add to cart</button></Link> */}
            <button className='cartButton'> Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBalloons;
