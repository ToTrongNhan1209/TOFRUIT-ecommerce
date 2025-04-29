'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import css from "@/app/admin/style.module.css";

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await fetch('http://localhost:3001/order').then(res => res.json());
        console.log('Đơn hàng:', data);
        setOrders(data);
      } catch (error) {
        console.error('Lỗi khi lấy đơn hàng:', error);
      }
    };
    fetchData();
  }, []);
  const handleStatusChange = (orderIndex: number, newStatus: string) => {
    setOrders((prevOrders) => {
      const updated = [...prevOrders];
      updated[orderIndex].status = newStatus;
      return updated;
    });
  
    // TODO: Gửi lên server nếu cần
    // fetch(`http://localhost:3001/order/${orderId}`, { method: "PUT", body: JSON.stringify({ status: newStatus }) });
  };
  return (
    <>
      <div className={css.containerAdmin}>
           <div className={css.menu}>
            <div className={css.image_logo}>
            <a href=""><img src="../image/2-removebg-preview.png" alt="" width="100"/></a>
            </div>
            <div className={css.text_content}>
                <h4>ĐIỀU HƯỚNG</h4>
            </div>
            <ul className={css.side_nav}>
                <li>
                    <a href="/admin/overview">
                        <i className="fa-solid fa-house-chimney-window" style={{fontSize: "13px"}}></i>
                        <span>Overview</span>
                    </a>
                </li>
                <li>
                    <a href="/admin/users">
                        <i className="fa-solid fa-user" style={{fontSize: "16px"}}></i>
                        <span>Users</span>
                    </a>
                </li>
                <li>
                    <a href="/admin/category">
                        <i className="fa-solid fa-layer-group" style={{fontSize: "12px"}}></i>
                        <span>Categories</span>
                    </a>
                </li>
                <li>
                    <a href="/admin/product">
                        <i className="fa-solid fa-bag-shopping" style={{fontSize: "15px"}}></i>
                        <span>Product</span>
                    </a>
                </li>
                <li>
                    <a href="/admin/order">
                        <i className="fa-solid fa-cart-shopping" style={{fontSize: "13px"}}></i>
                        <span>Orders</span>
                    </a>
                </li>
                <li>
                    <a href="/admin/setting">
                        <i className="fa-solid fa-gear" style={{fontSize: "13px"}}></i>
                        <span>Setting</span>
                    </a>
                </li>
            </ul>
        </div>
            <div className={css.wrapp}>

<div className={css.topbar}>
    <div className={css.bar_icon}>
        <i className="fa-solid fa-bars" style={{fontSize: "20px"}}></i>
    </div>
    <div className={css.search}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="search" placeholder="Search..." className={css.timkiem}/>
        <button type="submit" id={css.button}>Search</button>
    </div>
    <div className={css.users}>
        <div className={css.user_image}>
            <img src="../image/avatar.jpg" alt="" width="100%" />
        </div>
        <div className={css.user_name}>
            <h4>Admin</h4>
        </div>
    </div>
</div>
    <div className={css.page_title}>
    <div className={css.title}>
            <h4>Order</h4>
    </div>
    {/* <div className={css.button_new}>
            <a href="/admin/addpro"><button id={css.button} type="submit"><i className="fa-solid fa-plus"></i>Add new</button></a>
    </div> */}
</div>

<table className={css.table}>
            <thead>
              <tr className={css.tr}>
                <th className={css.th}>Order ID</th>
                <th className={css.th}>Sản phẩm</th>
                <th className={css.th}>Status</th>
                <th className={css.th}>Tổng tiền</th>

              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className={css.tr}>
                  <td className={css.td}>{order.id}</td>
                  <td className={css.td}>
                    {order.cartItems?.map((item: any, idx: number) => (
                      <div key={idx} style={{ marginTop: '8px' , display: 'flex' }}>
                        <img src={item.image} alt={item.name} width="40" style={{ marginRight: '10px' }} />
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>

                 <td className={css.td}>
  <select
    value={order.status || "Processing"}
    onChange={(e) => handleStatusChange(index, e.target.value)}
    className={css.status_order}
  >
    <option value="Processing" className={css.status_order}>Processing</option>
    <option value="Shipped" className={css.status_order}>Shipped</option>
    <option value="Delivered" className={css.status_order}>Delivered</option>
    <option value="Cancelled" className={css.status_order}>Cancelled</option>
  </select>
</td>
                  <td className={css.td}>{order.total} đ</td>

                </tr>
              ))}
            </tbody>
          </table>
  </div>
</div>
</>
  
  );
}
