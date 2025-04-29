"use client";
import css from '../style.module.css';  
import { useState } from "react";
import Link from "next/link";
// import styles from "./giohang.module.css";
import { useCart } from "../context/cartcontext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [error] = useState<string | null>(null);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", "")) || 0;
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleProceedToCheckout = () => {
    const orderData = {
      cartItems,
      total: calculateTotal(),
    };
    localStorage.setItem("orderData", JSON.stringify(orderData));
    window.location.href = "/thanhtoan"; // Điều hướng sang trang thanh toán
  };

  const handleIncreaseQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };
  
    return (
      <>
      <div className={css.cart_col2}>
        <div className={css.cart_col_1}>
          <div className={css.cart_col_1_1}>
            <h3>Giỏ hàng của bạn</h3>
          </div>
          <div className={css.cart_col_1_2} id="mycart1">
            {error ? (
              <div className={css.error}>
                <p style={{ color: "red" }}>{error}</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className={css.emptyCart}>
                <p>Giỏ hàng của bạn đang trống</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div className={css.showcart} key={item.id}>
                  <div className={css.cart_content1}>
                    <div className={css.cart_image}>
                      <img src={item.image} alt={item.name} width="100" />
                    </div>
                    <div className={css.cart_content1_1}>
                      <div className={css.cart_ten}>
                        <p>{item.name}</p>
                      </div>
                      <div className={css.cart_gia}>
                        <p>{item.price} đ</p>
                      </div>
                    </div>
                  </div>
                  <div className={css.cart_content2}>
                    <div className={css.cart_price}>
                      <p>{item.price} đ</p>
                    </div>
                    <div className={css.cart_sl}>
                      <div className={css.input_chitiet_ttt}>
                        <div className={css.input_button_sl}>
                          <input
                            type="button"
                            value="-"
                            className={css.inputcong}
                            onClick={() => handleDecreaseQuantity(item.id)}
                          />
                          <input
                            type="number"
                            value={item.quantity}
                            readOnly
                            className={css.input_sl}
                          />
                          <input
                            type="button"
                            value="+"
                            className={css.inputtru}
                            onClick={() => handleIncreaseQuantity(item.id)}
                          />
                        </div>
                        <i className="fa-solid fa-trash-can" onClick={() => handleRemoveItem(item.id)}></i>
                        {/* <button onClick={() => handleRemoveItem(item.id)}>Xóa</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className={css.cart_col_2}>
          <div className={css.cart_col2_content}>
            <h3>Thông tin đơn hàng</h3>
          </div>
          <div className={css.cart_col2_tongtien}>
            <div className={css.cart_col2_tt}>
              <h4>Tổng tiền:</h4>
            </div>
            <div className={css.cart_col2_gia}>
              <h2>{calculateTotal()} đ</h2>
            </div>
          </div>
          <div className={css.cart_col2_button}>
            <button onClick={handleProceedToCheckout}>
              <h3>THANH TOÁN</h3>
            </button>
          </div>
          <Link href="/" className={css.continueShopping}>
        Tiếp tục mua sắm
      </Link>
        </div>
      </div>
   
      </>
    );
  }
