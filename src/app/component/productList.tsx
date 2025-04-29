import { describe } from "node:test";
import { Product } from "../interface/Productinterface";
import ProductItem from "./productItem";
import { title } from "process";
import css from "../style.module.css";
export default function ProductList(
    { prop }: {
        prop: {
            products: Product[],
            title: string
        }
    }
) {
    return (  
        <section className={css.section_sanpham_full}>  
        <section className={css.section_sanpham}>
            <div className={css.heading_sanpham}>  
                <h2><a href="">{prop.title}</a></h2>  
            </div>  
            <div className={css.sanpham_homnay}>
                {prop.products.map((product: Product) => (  
                    <ProductItem key={product._id} product={product} />  
                ))}  
            </div>  
        </section>  
        </section>
    );  
} 