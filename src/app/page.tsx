'use client';  
  import Image from "next/image";
  import styles from "./page.module.css";
  import ProductItem from "./component/productItem";
  import ProductList from "./component/productList";
  import { Product } from "./interface/Productinterface";
  import css from "./style.module.css";
  import { useState, useEffect } from "react";
  
  export default  function Home() {
    
    let title = "List trái cây";
    // let allproduct =  await getProducts("http://localhost:3001/product");

    // let title1 = "Trái cây HOT";
    // let Hotproduct =  await getProducts("http://localhost:3001/product?hot=1");

    // let title2 = "Trái cây Hôm nay";
    // let Homnayproduct =  await getProducts("http://localhost:3001/product?categories=homnay ");


    const [allproduct, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
      const fetchData = async () => {
      let products: Product[] = await getProducts("http://localhost:3001/product");
      setProducts(products);
    }
      setLoading(false);
      fetchData();
  })

    return (  
      <div>  
          {/* Banner */}  
          <div className={css.header_banner}>  
            <img id="img" src="../image/slide_1_img.png" alt="" />  
          </div>  
        
          <ProductList prop={{ title, products: allproduct }} />  
          {/* <ProductList prop={{ title: title1, products: Hotproduct }} />  
          <ProductList prop={{ title: title2, products: Homnayproduct }} />  */}
      </div>  
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

    