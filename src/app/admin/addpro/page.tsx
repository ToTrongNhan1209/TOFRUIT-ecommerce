"use client";
import { useState, useEffect } from "react";
import s from "@/app/admin/addpro/product.module.css";
import { Category } from "@/app/interface/Categoryinterface";
import { getAllCategories } from "@/app/service/Scategory";
import { postProduct } from "@/app/service/admin/product";
import { Product } from "@/app/interface/Productinterface";
import React from "react";
import css from '@/app/admin/style.module.css';

export default function AddProduct() {
  const [categories,setCategories] = useState<Category[]>([]);
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState('');
  const [quantity,setQuantity] = useState('');
  useEffect(()=>{
    const fetchCategories = async()=>{
      try {
        const data = await getAllCategories("http://localhost:3001/category");
        setCategories(data);
      } catch (error) {
        console.log('lỗi kgi lấy dữ liệu danh mục',error);
        
      }

    };
    fetchCategories();
  },[])

  const [image, setImage] = useState<File[]>([]);
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const response = await fetch('http://localhost:3001/product', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Lỗi: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Thêm sản phẩm thành công:', result);
      alert('Thêm sản phẩm thành công!');
      location.href ='/admin/product'
    } catch (error) {
      console.error('Thêm sản phẩm thất bại:', error);
      alert('Thêm sản phẩm thất bại!');
    }
    
  
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
                <h4>Add product</h4>
            </div>
    </div>
    <div className={css.update}>
        <div className={css.capnhat_content}>
                <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
                    <label>Danh mục sản phẩm</label>
                    <select className={css.update_input} id="category" name="category">
                    <option value="">Chọn danh mục</option>
          {categories.map((cate: Category) => (
            <option key={cate.id} value={cate.id}>
              {cate.name}
            </option>
          ))}
                    </select>
                    <label >Tên Sản Phẩm</label>
                    <input type="text" name="name" id="name" className={css.update_input} value={name} onChange={(e)=>setName(e.target.value)} /> 
                    <label >Mô tả</label>
                    <input type="text" name="description" id="description" className={css.update_input} value={description} onChange={(e)=>setDescription(e.target.value)}/> 
                    <label >GIÁ</label>
                    <input type="number" name="price" id="price" className={css.update_input} value={price} onChange={(e)=>setPrice(e.target.value)} /> 
                    <label >SỐ LƯỢNG</label>
                    <input type="number" name="quantify" id="quantify" className={css.update_input} value={quantity} onChange={(e)=>setQuantity(e.target.value)}/> 
                    {/* <label >TRẠNG THÁI</label> */}
                    {/* <select className={css.update_input}>
                        <option value="">Chọn trạng thái</option>
                    </select> */}
                    <label >Hình ảnh</label>
                    <input type="file" name="image" id="image" className={css.update_input} accept="image/*"onChange={handleImage}/>
                    <div>
          {image.map((img, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt="Preview"
              style={{ width: 100 }}
            />
          ))}
        </div>
                    <input type="submit" className={css.submit} value="Thêm sản phẩm"  name="sub"/>
                    </form>
            </div>
        </div>
       </div>
        </div>
       </>
  );
}
