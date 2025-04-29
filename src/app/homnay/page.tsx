'use client';
import Image from "next/image";
import styles from "./page.module.css";
import ProductItem from "../component/productItem";
import ProductList from "../component/productList";
import { Product } from "../interface/Productinterface";
import css from "./style.module.css";
export default async function Homnay(){
    
    let title = "Trái cây hôm nay";
    let allproduct =  await getProducts("http://localhost:3001/product?categories=homnay");
    return (
        <ProductList prop={{ title, products: allproduct }} />  
    );
}

    async function getProducts(url:string){
      const res = await fetch(url)
      const data = await res.json()


      let products:Product[] = data.map((item:any) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          category: item.category
        }
      })
      return products;
    }