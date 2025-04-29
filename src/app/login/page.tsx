'use client'

import React, { useState } from 'react';
import css from "../style.module.css";  
import '../globals.css';
import { useParams } from 'react-router-dom'; 
import { useRouter } from 'next/navigation';
import { loginUser } from "@/app/service/authService"; // Import service
import { useAuth } from "../context/authContext"; // Import context

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}


export default function Login({
  isOpen,
  onClose,
  onOpenRegister,
}: LoginPopupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    keepLoggedIn: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.classList.add("overflow-hidden");
  //   } else {
  //     document.body.classList.remove("overflow-hidden");
  //   }
  //   return () => {
  //     document.body.classList.remove("overflow-hidden");
  //   };
  // }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const success = await login(
        formData.identifier,
        formData.password,
        formData.keepLoggedIn
      );
      if (success) {
        alert("Đăng nhập thành công!");
        window.location.href = "/"; // Redirect to home page after login
        onClose();
      }
      
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // if (!isOpen) return null;

  return (
    <>
      <div className={css.header_title_dk}>
        <div className={css.title_dk}>
          <h2>Login</h2>  
        </div>

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className={css.input_email}>
            <input 
              type="email" 
              placeholder="Email" 
              id="email"
              className={css.input} 
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required 
            />
          </div>

          <div className={css.input_pass}>
            <input 
               type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu" 
              className={css.input} 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <div className={css.input_bbt}>
            <div className={css.input_button} >
              <button type="submit" id={css.button} className={css.input_button} >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                {/* ĐĂNG NHẬP */}
              </button>
            </div>
          </div>
        </form>

   
        {error && <div className={css.error}>{error }</div>}
      </div>

    
      <div className={css.quaylai}>
        <div className={css.icon_quaylai}>
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className={css.title_quaylai}>
          <a href="/register"><p>Đăng kí</p></a>
        </div>
      </div>
    </>
  );
}
