// api.ts
import { IProduct, IMemberBenefit, IUser, IFeaturedProducts } from "../types";

// Định nghĩa kiểu dữ liệu cho User

const API_BASE_URL = "http://localhost:3001";
const USER_API_BASE_URL = "http://localhost:3001";

export async function fetchProducts(): Promise<IProduct[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/product`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    let temp = await res.json();
    let data: IProduct[] = temp.map((e: any) => ({
      id: e.id,
      name: e.name,
      category: e.category,
      price: e.price,
      image: e.image,
    }));
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchMemberBenefits(): Promise<IMemberBenefit[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/memberBenefits`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching member benefits:", error);
    return [];
  }
}

export async function fetchFeaturedSection(): Promise<IFeaturedProducts[]> {
  try {
    const res = await fetch(`${USER_API_BASE_URL}/memberBenefit`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    let temp = await res.json();
    let data: IFeaturedProducts[] = temp.map((e: any) => ({
      id: e.id,
      banner: e.banner,
      gender: e.gender,
    }));
    return data;
  } catch (error) {
    console.error("Error fetching featured section:", error);
    return [];
  }
}

export async function fetchUsers(): Promise<IUser[]> {
  try {
    const res = await fetch(`${USER_API_BASE_URL}/user`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    let temp = await res.json();
    let data: IUser[] = temp
      .filter((e: any) => e.role === "admin" || e.role === "user") // Lọc bỏ user có role không hợp lệ
      .map((e: any) => ({
        id: e.id,
        email: e.email,
        name: e.name,
        phone: e.phone,
        role: e.role,
        password: e.password,
      }));
      console.log(data);
      
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export type { IUser };
