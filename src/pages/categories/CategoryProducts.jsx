import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './categoryproduct.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/products/category/${id}`);
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [id]);

  const navigate = useNavigate()
  const back = () => {
    navigate('/')
  }

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.post(`https://ecommerce-node4-five.vercel.app/cart`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      if (data.message == 'success') {
        toast.success('Added Successfully')
      }
    } catch (error) {
      // console.error('Error adding to cart:', error);
      console.log(error)
      toast.error(error.message)
    }
  };

  return (
    <div className="container">
      {/* <h1>Men's Clothes</h1> */}
      {products.map((product) => (
        <div className='product7' key={product._id}>
          <h2>{product.name}</h2>
          <img src={product.mainImage.secure_url} alt={product.name} />

          <Link to={`/products/${product._id}`} className="lineWord">Click Here To More Details</Link>
          {/* <button onClick={() => addToCart(product._id)}>ADD </button> */}
        </div>
      ))}
    </div>
  );

}

