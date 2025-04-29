"use client";
import { useState } from "react";
import s from "@/app/components/css/Nav.module.css";

import { useRouter } from "next/navigation"; // Import useRouter
import css from "../style.module.css";
import Link from "next/link";
import { useCart } from "../context/cartcontext"; // Import useCart from your context 
export default function Header() {
  const { cartCount } = useCart();
   
    return (
        <>
                <div className={css.container}>
              <div className={css.header}>
              <div className={css.image}>
                <a href="/">
                  <img src="../image/2-removebg-preview.png" />
                </a>
              </div>
              <div className={css.tt_tt}>
                <div className={css.wrap_seach}>
                  <input placeholder="Tìm kiếm sản phẩm..." />
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
              <div className={css.phone}>
                <div className={css.icon_phone}>
                  <i className="fa-solid fa-phone-volume"></i>
                </div>
                <div className={css.host_phone}>
                  <span>Hotline: 123456789</span>
                </div>
              </div>
              <div className={css.user}>
                <div className={css.icon_user}>
                  <a href="/login"><i className="fa-regular fa-user" id="icon-user"></i></a>
                </div>
                <div className={css.name_user}>
                  <span>Tài khoản</span>
                </div>
                <div
                  className={css.hien_user_full}
                  id="hien-user"
                  style={{ display: "none" }}
                >
                  <div className={css.hien_user}>
                    <div className={css.hien_user_1}>
                      <h3>ĐĂNG NHẬP TÀI KHOẢN</h3>
                      <p>Nhập email và mất khẩu của bạn</p>
                    </div>
                    <div className={css.hien_user_2}>
                      <input type="text" placeholder="Email" id="email1" />
                    </div>
                    <div className={css.hien_user_3}>
                      <input type="text" placeholder="Mật khẩu" id="pass1" />
                    </div>
                    <div className={css.hien_user_4}>
                      <p>
                        This site is protected by reCAPTCHA and the <br />
                        Google{" "}
                        <strong>
                          <a href="https://policies.google.com/privacy">
                            Privacy Policy
                          </a>
                        </strong>{" "}
                        and{" "}
                        <strong>
                          <a href="https://policies.google.com/terms">
                            Terms of Service
                          </a>
                        </strong>{" "}
                        <br />
                        apply.
                      </p>
                    </div>
                    <div className={css.hien_user_5}>
                      <a href="">
                        <p>ĐĂNG NHẬP</p>
                      </a>
                    </div>
                    <div className={css.hien_user_6}>
                      <p>
                        Khách hàng mới?{" "}
                        <strong>
                          <a href="dangki.html">Tạo tài khoản</a>
                        </strong>
                      </p>
                    </div>
                    <div className={css.hien_user_7}>
                      <p>
                        Quên mật khẩu?{" "}
                        <strong>
                          <a href="">Khôi phục mật khẩu</a>
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={css.cart}>
                <div className={css.icon_cart}>
                <Link href="/giohang">
                <i className="fa-solid fa-cart-shopping" id="icon-cart" >
                <span id="cart-count" >
                {cartCount}
                </span>
                </i>
              </Link>
                </div>
                <div className={css.name_cart}>
                  <span>Giỏ hàng</span>
                </div>
                <div
                  className={css.hien_cart_full}
                  style={{ display: "none" }}
                  id="hien-cart"
                >
                  <div className={css.hien_cart}>
                    <div className={css.hien_cart_1}>
                      <h3>GIỎ HÀNG</h3>
                    </div>
                    <div className={css.hien_full_cart_2}>
                      <div id="mycart" style={{ display: "none" }}></div>
                    </div>
                    <button>
                      <a href="giohang.html">XEM GIỎ HÀNG </a>
                    </button>
                  </div>
                </div>
              </div>
              <button className={css.logout} style={{ display: "none" }}>
                Đăng xuất
              </button>
            </div>
            {/* menu */}
            <div className={css.header_menu}>
            <ul className={css.menu}>
                <li>
                    <a href="/">Trang chủ</a>
                </li>
                <li>
                    <a href="/homnay">Trái ngon<br/> hôm nay</a>
                </li>
                <li>
                    <a href="/vietnam">Trái cây<br/> Việt Nam</a>
                </li>
                <li>
                    <a href="/nhapkhau">Trái cây <br/> nhập khẩu</a>
                </li>
                <li>
                    <a href="/catsan">Trái cây<br/> cắt sẵn</a>
                </li>
                <li>
                    <a href="/quatang">Quà tặng <br/> trái cây</a>
                </li>
                <li>
                    <a href="/nguyetcat">Hộp quà <br/> Nguyệt Cát</a>
                </li>
                <li>
                    <a href="/mamnguqua">Mâm <br/> Ngũ Quả</a>
                </li>
                <li>
                    <a href="/cauchuyen">Câu chuyện <br/> thương hiệu</a>
                </li>
                <li>
                    <a href="/lienhe">Liên hệ</a>
                </li>
            </ul>
        </div>
        </div>
        </>
    );
}
