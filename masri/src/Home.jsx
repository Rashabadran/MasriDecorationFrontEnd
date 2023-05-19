import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import NavBar from './NavBar';
import Footer from './footer';
import Balloons from './images/BALLOONS-removebg-preview.png';
import slide1 from './images/birth.png';
import slider2 from './images/baa1.jpg';
import slider3 from './images/baa2.jpg';
import b222 from './images/b222.jpg';
import b44 from './images/b44.jpg';
import balloon111 from './images/balloon111.jpg';
import balloon222 from './images/balloon222.jpg';
import balloon333 from './images/balloon333.jpg'
import balloon3333 from './images/ballooon33333.jpg'
function Home() {
  const imagesss = [
    { src: balloon111, alt: 'Image 1' },
    { src: balloon3333, alt: 'Image 3' },
    { src: balloon222, alt: 'Image 2' },
  ];

  const delay = 8000;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === imagesss.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  const scroll = () => {
    var left = document.querySelector('.scroll-devs');
    left.scrollBy(280, 0);
  };

  const scrollr = () => {
    var right = document.querySelector('.scroll-devs');
    right.scrollBy(-280, 0);
  };

  const scrollsec = () => {
    var left = document.querySelector('.scroll-devos');
    left.scrollBy(280, 0);
  };

  const scrollrsec = () => {
    var right = document.querySelector('.scroll-devos');
    right.scrollBy(-280, 0);
  };

  // Carousel
  

  return (
    <div className="App">
      
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {imagesss.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="slideP"
            />
          ))}
        </div>

        <div className="slideshowDots">
          {imagesss.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? ' active' : ''}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="catballoons">
        <div className="parag">
          <h1>Our Products</h1>
          <h3>
            Make birthdays extra special with our fantastic range of birthday
            products. From decorations to party supplies, we have everything
            you need to create a fun and memorable birthday celebration.
            Explore our collection of themed party supplies, including plates,
            cups, napkins, and tablecloths featuring popular characters and
            designs. Discover colorful banners, balloons, and streamers to
            create an eye-catching backdrop for the festivities.
          </h3>
          <button className="daily-button">Shop now!</button>
        </div>
        <div className="carousel">
          <ul className="carousel__list">
            <li
              className="carousel__item"
              data-pos="-2"
              
            >
              <img className="imagesinCarousel" src={b222} alt="Image1" />
            </li>
           
          </ul>
         
        </div>
        
      </div>

     
      <div className="catballoons1">
        <div className="carousel">
          <ul className="carousel__list">
            <li
              className="carousel__item"
              data-pos="-2"
             
            >
              <img className="imagesinCarousel" src={b222} alt="Image1" />
            </li>
            <li
              className="carousel__item"
              data-pos="-1"
            
            >
              <img className="imagesinCarousel" src={b44} alt="Image1" />
            </li>
           
          </ul>
        </div>

        <div className="parags">
          <h1>Our Decoration</h1>
          <h3>
            Immerse yourself in a world of vibrant colors, whimsical shapes,
            and awe-inspiring arrangements. Our talented team of balloon artists
            brings your vision to life, crafting bespoke decorations that
            perfectly match your theme, style, and preferences. From elegant
            and sophisticated to fun and playful, we have the creativity and
            expertise to exceed your expectations.
          </h3>
          <button className="daily-button">See more!</button>
        </div>
      </div>

      <div className="catballoons">
        <div className="parag">
          <h1>About Us</h1>
          <h3>
            Your one-stop destination for all things celebratory! 
            Step into our vibrant world of balloons and prepare to be dazzled.
            At Masri Decoration Shop, we specialize in curating an enchanting collection
             of balloons and decorations for every occasion. Whether you're throwing
              a birthday bash, hosting a bridal shower, or commemorating a special milestone, 
              we have the perfect products to add a touch of magic to your festivities.
          </h3>
        </div>
        <div className="carousel">
          <ul className="carousel__list">
            <li
              className="carousel__item"
              data-pos="-2"
              
            >
              <img className="imagesinCarousel" src={b222} alt="Image1" />
            </li>
           
          </ul>
        </div>
      </div>
     
    </div>
  );
}

export default Home;
