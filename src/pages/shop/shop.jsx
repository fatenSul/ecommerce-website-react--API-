import React from "react";
import { PRODUCTS } from "../Products/products";
import { Product } from "../shop/Product";
import './shop.css'
export const Shop = () => {
    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>PedroBaeuty Shop</h1>
            </div>

            <div className="products">
                {PRODUCTS.map((product) => (  // we loop for every element and grap the data that we want to display
                    <Product data={product} />
                ))}
            </div>
        </div>
    );
};