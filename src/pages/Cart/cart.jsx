import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../Products/products";
import { CartItem } from "../Cart/cart-items";
import { useNavigate } from "react-router-dom";
import './cart.css'
export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <h2> Subtotal: ${totalAmount} </h2>
          <button onClick={() => navigate("/shop")} className="continue"> Continue Shopping </button>
          <button onClick={() => { checkout(); navigate("/orderPage");}} className='continue'> Checkout</button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};