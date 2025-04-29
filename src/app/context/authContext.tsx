// src/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { AuthContextType, IUser } from "../types";
import { fetchUsers } from "../service/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const login = async (
    identifier: string,
    password: string,
    keepLoggedIn: boolean
  ): Promise<boolean> => {
    try {
      const users = await fetchUsers();
      const matchedUser = users.find(
        (u: IUser) =>
          (u.email === identifier) &&
          u.password === password
      );

      if (!matchedUser) {
        throw new Error("Email hoặc mật khẩu không đúng.");
        // alert("Email/Số điện thoại hoặc mật khẩu không đúng.");
      }

      const userData: IUser = {
        id: matchedUser.id,
        name:matchedUser.name,
        email: matchedUser.email,
        phone: matchedUser.phone,
        role: matchedUser.role,
      };

      setUser(userData);
      const storage = keepLoggedIn ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(userData));
      // Lưu vào cookie để middleware có thể đọc (cho phân quyền)
      document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=${
        keepLoggedIn ? 86400 : 0
      }`;
      return true;
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      throw error;
    }
  };

  const register = async (
    identifier: string,
    password: string,
    keepLoggedIn: boolean
  ): Promise<boolean> => {
    try {
      const users = await fetchUsers();
      const isEmailOrPhoneExist = users.some(
        (u: IUser) => u.email === identifier || u.phone === identifier
      );

      if (isEmailOrPhoneExist) {
        throw new Error("Email hoặc số điện thoại đã được sử dụng.");
      }

      const newUser = {
        email: identifier.includes("@") ? identifier : "user@example.com",
        "số điện thoại": !identifier.includes("@") ? identifier : "0000000000",
        password,
        role: "user",
      };

      const response = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Không thể đăng ký tài khoản.");
      }

      const createdUser = await response.json();
      const userData: IUser = {
        id: createdUser.id,
        name:createdUser.name,
        email: createdUser.email,
        phone: createdUser.phone,
        role: createdUser.role,
      };

      setUser(userData);
      const storage = keepLoggedIn ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(userData));
      document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=${
        keepLoggedIn ? 86400 : 0
      }`;
      return true;
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    document.cookie = "user=; path=/; max-age=0";
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};