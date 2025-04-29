'use client'
import s from '@/app/admin/page.module.css';
// import { Product } from '../untils/ProductInterFace';
// import { getProductDetails } from '../services/admin/product';
import { useState,useEffect } from 'react';
import css from './style.module.css';
import HeaderAdmin from '../component/headeradmin';
export default function AdminPage() {
 
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


      </div>
      </div>
    



 
</>
  );
}
