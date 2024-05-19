import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import coverimg from '../../../assets/10.jpeg'


export default function Home() {
  const images = [
    'https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/61CiqVTRBEL._SX3000_.jpg',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch(`https://ecommerce-node4-five.vercel.app/categories/active?page=1&limit=10`);
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:');
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="slideshow-container">
        <div className="slideshow">
          <button className="button" onClick={goToPreviousImage}>{'<'}</button>
          <img className="swapimage" src={images[currentImageIndex]} alt="Current"/>
          <button className="button" onClick={goToNextImage}>{'>'}</button>
        </div>
      </div>
      <div className='hero'>
        <h1> WELCOME TO OUR STORE</h1>
        <h2>❀❀❀Where style meets convenience❀❀❀</h2>
      </div>
      <div className="card">
        <div className="container">
          <img src={coverimg} />
          <div className="card-content">
            <p>{`Welcome to our online store, where every click opens a door to endless possibilities. Dive into a curated collection of products designed to inspire and elevate your everyday. From fashion to home essentials, we're here to make shopping a joyous journey. Discover, indulge, and make every purchase a story worth telling. Happy shopping!`}</p>
          </div>
        </div>
      </div>

      <div className='categories-container'>
  {categories.map(category => (
    <div className='category' key={category._id}>
      <h3>{category.name}</h3>
      <img src={category.image.secure_url} alt={category.name} />
      <Link to={`/categories/${category._id}`} className="lineWord">Click Here To More Details</Link>
    </div>
  ))}
</div>


    </>
  );
}