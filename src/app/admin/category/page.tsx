"use client"; // Thêm dòng này ở đầu file
import { useRouter } from "next/navigation";
import s from "@/app/admin/category/page.module.css";
import {
  getAllCategories,
  deleteCategory,
} from "@/app/service/admin/category";
import { useEffect, useState } from "react";
import { Category } from "@/app/interface/Categoryinterface";
import css from "@/app/admin/style.module.css";
export default function CategoryPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      let data: Category[] = await getAllCategories(
        "http://localhost:3001/category"
      );
      setCategories(data);
      console.log("data", data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const result = await deleteCategory(
        `http://localhost:3001/category/${id}`
      );
      console.log("Xóa thành công", result);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa", error);
    }
  };

  const [editId, setEditId] = useState<string | null>(null);

  const handleEdit = async (id: string) => {
    setEditId(id);
    router.push(`/admin/updatecate/${id}`);
    console.log("danh muc ban dang sua la danh muc", id);
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
            <h4>Categories</h4>
    </div>
    <div className={css.button_new}>
            <a href="/admin/addcate"><button id={css.button} type="submit"><i className="fa-solid fa-plus"></i>Add new</button></a>
    </div>
</div>

<table className={css.table}>
  <thead>
      <tr className={css.tr}>
        <th className={css.th}>ID</th>
        <th className={css.th}>Name</th>
        {/* <th className={css.th}>Image</th> */}
        <th className={css.th}>Description</th>
        <th className={css.th}>Action</th>
      </tr>
  </thead>
        <tbody>
          {categories.map((category: Category) => (
            <tr className={css.tr} key={category.id}>
            <td className={css.td}>{category.id}</td>
            <td className={css.td}>{category.name}</td>
            {/* <td className={css.td}><img src="image/buoidaxanh.png" alt="" width="50" /></td> */}
            <td className={css.thdescription}>{category.description}</td>
            <td className={css.td}>
                <a href={`/admin/updatecate/${category.id}`}><button id={css.button} type="submit"  onClick={() => handleEdit(category.id)} className={css.but1}>Edit</button></a>
                <a href=""><button id={css.button} type="submit"  onClick={() => handleDelete(category.id)} className={css.but2}>Delete</button></a>
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
