import React, { useContext } from "react";
import {ShopContext} from '../../context/shop-context.jsx';
export const Product = (props) => {
    const { id, productName, price, Number, productImage } = props.data;
    const {addToCart , cartItems} = useContext(ShopContext);
    const cartItemAmount =cartItems[id]

    return (
        <div className="product">
            <img src={productImage} />
            <div className="description">
                <p>
                    <b>{productName}</b>
                </p>
                <p> ${price}</p>
                <p> {Number}</p>
            </div>
            <button className="addToCartBttn" onClick={() => addToCart(id)}> Add To Cart
            {cartItemAmount >0  && <>({cartItemAmount})</>} 
            {/* by this if the number of th item is greater than zero then show the number of the item */}
            </button>  
        </div>
    );
};