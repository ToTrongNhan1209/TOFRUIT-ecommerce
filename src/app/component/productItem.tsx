import React from 'react';  
import { Product } from '../interface/Productinterface';  
import css from "../style.module.css";  
import { useCart } from "../context/cartcontext";  

export default function ProductItem({ product }: { product: Product }) {  
  const { addToCart } = useCart(); // Use CartContext to access addToCart function  

  const handleAddToCart = () => {  
    addToCart(product); // Add the product to the cart  
    alert(`Đã thêm ${product.name} vào giỏ hàng!`); // Show confirmation message  
  }; 
    return (  
        <div className={css.content_sanpham}>  
            <div className={css.content_sanpham_image}>  
                <a href={`/chitiet/${product.id}`}>  
                    <img src={product.image} alt={product.name} />  
                </a>  
            </div>  
            <div className={css.content_sanpham_thongtin}>  
                <span>{product.name}</span><br />  
                <div className={css.heart}>  
                    <h4>{product.price.toLocaleString()} đ</h4>  
                    {/* <p>{product.description}</p> Display product description   */}
                </div>  
                <div className={css.button}>  
                    <i className="fa-solid fa-cart-shopping"></i>  
                    <button onClick={handleAddToCart}>CHỌN MUA</button>  
                </div>  
            </div>  
        </div>  
    );  
}  

