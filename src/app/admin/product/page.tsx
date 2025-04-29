'use client';
import React from 'react';
import { Product } from '@/app/interface/Productinterface';
import { getALLProducts,deleteProduct } from '@/app/service/admin/product';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';

import css from "@/app/admin/style.module.css";
export default function AdminPage() {
  const router = useRouter();

 const [ products, setProduct] = useState<Product[]>([]);
 useEffect(()=>{
  const fetchData = async() =>{
    try {  
      let data: Product[] = await getALLProducts('http://localhost:3001/product');  
      console.log('Dữ liệu trả về:', data);  
      setProduct(data);  
    } catch (error) {  
      console.error('Lỗi khi gọi API:', error);  
    } 
  }
  fetchData();
 },[])

 const handleDelete = async (id: string) => {
  const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
  if (!isConfirmed) return;

  try {
    const result = await deleteProduct(`http://localhost:3001/product/deletepro/${id}`);
    console.log('Xóa thành công', result);
    setProduct(products.filter((product) => product._id !== id));
  } catch (error) {
    console.log('Lỗi khi xóa', error);
  }

}
const [editId,setEditId] = useState<string| null>(null);

const handleEdit = async (id:string)=>{
  setEditId(id);
    router.push(`/admin/updatepro/${id}`);
  console.log('danh muc ban dang sua la danh muc',id);
}
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
            <h4>Product</h4>
    </div>
    <div className={css.button_new}>
            <a href="/admin/addpro"><button id={css.button} type="submit"><i className="fa-solid fa-plus"></i>Add new</button></a>
    </div>
</div>

    <table className={css.table}>
<thead>
    <tr className={css.tr}>
      <th className={css.th}>ID</th>
      <th className={css.th}>Name</th>
      <th className={css.th}>Image</th>
      {/* <th className={css.th}>Category</th> */}
      <th className={css.th}>Price</th>
      {/* <th className={css.th}>Quantify</th> */}
      <th className={css.th}>Status</th>
      <th className={css.th}>Action</th>
    </tr>
</thead>
    <tbody id="listproadmin">
      {products.map((product: Product) => (
        <tr key={product._id}>
          <td className={css.td}>{product._id}</td>
          <td className={css.td}>{product.name}</td>
          <td className={css.td}><img src={`${product.image}`} alt="" width="50"/></td>
          {/* <td className={css.td}>{product.category}</td> */}
          <td className={css.td}>{product.price}</td>
          {/* <td className={css.td}>{product.quantity}</td> */}
          <td className={css.td}><button type="submit" className={css.status1} id={css.button}>Active</button></td>
          <td className={css.td}>
          <a href={`/admin/updatecate/${product._id}`}><button type="submit" className={css.but1} onClick={() => handleEdit(product._id)} id={css.button}>Edit</button></a>
          <a href=""><button type="submit" className={css.but2} id={css.button} onClick={() => handleDelete(product._id)}>Delete</button></a>
      </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
</div>
</>
  
  );
}
