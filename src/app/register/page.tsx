'use client';
import css from "../style.module.css";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext"; // Import context
import { loginUser } from "@/app/service/authService"; // Import service  
import '../globals.css';

interface RegisterPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenLogin: () => void;
    }
export default function register({ isOpen, onClose, onOpenLogin }: RegisterPopupProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
      identifier: "",
      password: "",
      confirmPassword: "",
      keepLoggedIn: false,
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
  

  
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
  
      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu và xác nhận mật khẩu không khớp.");
        setLoading(false);
        return;
      }
  
      try {
        const success = await register(
          formData.identifier,
          formData.password,
          formData.keepLoggedIn
        );
        if (success) {
          alert("Đăng ký thành công!");
          window.location.href = "/login";
          onClose();
        }
      } catch (err: any) {
        setError(err.message || "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
        <>
            <div className={css.header_title_dk}>
                <div className={css.title_dk}>
                    <h2>Tạo tài khoản</h2>
                </div>
                <form id="registrationForm" onSubmit={handleSubmit}>
                    {/* <div className={css.input_name}>
                        <input type="text" placeholder="Họ và tên" id="name" name="name" required />
                    </div> */}
                    <div className={css.input_email}>
                        <input type="email"  className={css.input}  placeholder="Email" id="email"  name="identifier"
                value={formData.identifier}
                onChange={handleChange} required />
                    </div>
                    <div className={css.input_pass}>
                        <input type="password" className={css.input}  placeholder="Mật khẩu" id="pass" name="password" value={formData.password}
                onChange={handleChange} required />
                    </div>
                    <div className={css.input_repass}>
                        <input type="password"  className={css.input}  placeholder="Nhập lại mật khẩu" id="repass"  name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange} required />
                    </div>

                    <div className={css.input_bbt}>
                        <div className={css.input_button}>
                            <button type="submit" disabled={loading} className={css.input_button} id="submit">   {loading ? "Đang đăng ký..." : "Đăng ký"}</button>
                        </div>
                    </div>
                </form>
                <p id="responseMessage"></p>
            </div>

            <div className={css.quaylai}>
                <div className={css.icon_quaylai}>
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className={css.title_quaylai}>
                    <a href="/"><p>Quay lại trang chủ</p></a>
                </div>
            </div>
        </>
    );
}