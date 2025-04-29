'use client';  
import { useState } from 'react';  
import css from '@/app/admin/style.module.css';  
import { Category } from '@/app/interface/Categoryinterface';  
import { updateCategory } from '@/app/service/admin/category';  

export default function UpdateCategory({ params }: { params: { id: string } }) {  
    const { id } = params;  
    const [name, setName] = useState('');  
    const [description, setDescription] = useState(''); 
    // const [id, setId] = useState(''); // Thêm state để lưu ID danh mục cần cập nhật  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
        e.preventDefault();  
        const updatedCategory: Category = {  
            id,  // ID danh mục cần cập nhật  
            name,  
            description,  
        };  
        console.log("Gửi ID:", updatedCategory.id, updatedCategory.name); // Log ID để kiểm tra  
        try {  
            const res = await updateCategory(`http://localhost:3001/category/${id}`, updatedCategory); // Gọi hàm updateCategory  
            console.log('Cập nhật thành công:', res);  
            alert('Cập nhật danh mục thành công!');  
            location.href = '/admin/category';  
        } catch (error) {  
            console.error('Lỗi khi cập nhật:', error);  
            alert('Cập nhật danh mục thất bại!');  
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
                            <h4>Cập nhật Danh mục</h4>  
                        </div>  
                    </div>  
                    <div className={css.update}>  
                        <div className={css.capnhat_content}>  
                            <form onSubmit={handleSubmit}>  
                                {/* <input type="text" name="id"  value={id} onChange={(e) => setId(e.target.value)} />   */}
                                <label>Tên Danh mục</label>  
                                <input   
                                    type="text"   
                                    name="name"   
                                    id="name"   
                                    className={css.update_input}   
                                    value={name}   
                                    onChange={(e) => setName(e.target.value)}   
                                />   
                                <label>Mô tả</label>  
                                <input   
                                    type="text"   
                                    name="description"   
                                    id="description"   
                                    className={css.update_input}   
                                    value={description}   
                                    onChange={(e) => setDescription(e.target.value)}   
                                />   
                                <input   
                                    type="submit"   
                                    className={css.submit}   
                                    value="Cập nhật danh mục"   
                                    name="sub"  
                                />  
                            </form>  
                        </div>  
                    </div>  
                </div>  
            </div>  
        </>  
    );  
}  