'use client';  

import css from '../../style.module.css';  
import { useEffect, useState } from "react";  
import { useParams } from "next/navigation";  
import { useCart } from "../../context/cartcontext";  

interface Product {  
  id: string;  
  name: string;  
  description: string;  
  image: string;  
  price: string;  
  quantity?: number;  
  status: string;  
}  

export default function Chitiet() {  
  const params = useParams();  
  const id = params?.id as string; // Get product ID from params  
  const [product, setProduct] = useState<Product | null>(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  
  const { addToCart } = useCart(); // Use CartContext to access addToCart function  

  useEffect(() => {  
    const fetchProduct = async () => {  
      try {  
        const res = await fetch(`http://localhost:3001/product/${id}`);  
        if (!res.ok) {  
          const errorData = await res.json();  
          throw new Error(errorData.message || `Error fetching product: ${res.status}`);  
        }  
        const productData: Product = await res.json();  
        setProduct(productData);  
      } catch (error: any) {  
        console.error("Error fetching product:", error);  
        setError(error.message || "Could not load product details.");  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchProduct();  
  }, [id]);  

  if (loading) return <p>Đang tải...</p>;  
  if (error) return <p style={{ color: "red" }}>{error}</p>;  
  if (!product) return <p>Không tìm thấy sản phẩm.</p>;  

  // Handle add to cart functionality  
  const handleAddToCart = () => {  
    if (product) {  
      addToCart(product);  
      alert(`Đã thêm ${product.name} vào giỏ hàng!`); // Show alert or notification  
    }  
  };  

  return (   
    <div className={css.chitietsanpham}>  
      <div className={css.chitietsanpham_1}>  
        <div className={css.image_chinh}>  
          <img src={product.image} alt={product.name} width="200" height="200" />  
        </div>  
      </div>  
      <div className={css.chitietsanpham_2}>  
        <h4>{product.name}</h4>  
        <div className={css.tt_chitiet_sp}>  
          <div className={css.msp_tt_ct}>  
            <p>Mã sản phẩm: <span>{product.id}</span></p>  
          </div>  
          <div className={css.tinhtrang_tt_ct}>  
            <p>Tình trạng: <span>{product.status}</span></p>  
          </div>  
        </div>  
        <div className={css.price_chitiet}>  
          <h5>{product.price}</h5>  
        </div>  
        <div className={css.input_chitiet_ttt}>  
          <button   
            className={css.input_chitiet_themvaogio}  
            onClick={handleAddToCart} // Call addToCart on button click  
          >  
            THÊM VÀO GIỎ  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
}  