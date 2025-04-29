'use client';
import style from '../style.module.css';
import css from "../style.module.css";
import { useEffect, useState } from "react";

export default function Thanhtoan() {
  const [order, setOrder] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem("orderData");
    if (storedData) {
      setOrder(JSON.parse(storedData));
    }
  }, []);

  const handlePlaceOrder = async () => {
    // Kiểm tra xem các trường đã được nhập chưa
    if (!fullName || !email || !phone || !address) {
      alert("Vui lòng nhập đầy đủ thông tin giao hàng.");
      return;
    }

    if (!order) return;

    const completeOrder = {
      ...order,
      customer: {
        fullName,
        email,
        phone,
        address
      }
    };

    try {
      const response = await fetch("http://localhost:3001/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeOrder),
      });

      if (response.ok) {
        alert("Đơn hàng đã được gửi thành công!");
        localStorage.removeItem("orderData");
        window.location.href = "/";
      } else {
        alert("Gửi đơn hàng thất bại!");
      }
    } catch (error) {
      console.error("Lỗi gửi đơn hàng:", error);
      alert("Đã xảy ra lỗi khi gửi đơn hàng.");
    }
  };

  return (
    <>
      <div className={css.thanhtoan}>
        <div className={css.thanhtoan_col1}>
          <div className={css.col1_header}>
            <h2>TO FRUIT - Trái Cây Chất Lượng Cao</h2>
          </div>
          <div className={css.col1_header_1}>
            <h4>Thông tin giao hàng</h4>
          </div>
          <div className={css.col1_tt}>
            <p>Bạn đã có tài khoản</p>
            <a href="">Đăng nhập</a>
          </div>
          <div className={css.col1_input}>
            <input
              type="text"
              placeholder="Họ và tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <div className={css.col1_input_col2}>
              <input
                type="text"
                className={css.input1}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className={css.input2}
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className={css.col1_done}>
            <p>Giỏ hàng</p>
            <button id={css.button} onClick={handlePlaceOrder}>
              Hoàn tất đơn hàng
            </button>
          </div>
        </div>

        <div className={css.thanhtoan_col2}>
          {order?.cartItems?.map((item: any) => (
            <div className={css.col2_tt} key={item.id}>
              <img src={item.image} alt={item.name} width="80" />
              <span>{item.name} x {item.quantity}</span>
              <span className={css.span2}>{item.price}</span>
            </div>
          ))}
          <div className={css.col2_tt_1}>
            <div className={css.col2_tt_1_1}>
              <span>Tạm tính</span>
              <span className={css.span3}>{order?.total} đ</span>
            </div>
          </div>
          <div className={css.col2_tt_2}>
            <div className={css.col2_tt_2_1}>
              <p>Tổng cộng</p>
            </div>
            <div className={css.col2_tt_2_2}>
              <span>VND</span><p>{order?.total} đ</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
