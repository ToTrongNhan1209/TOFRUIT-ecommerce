import { Product } from "@/app/interface/Productinterface";
export const getALLProducts = async (url: string): Promise<Product[]> => {
     let response = await fetch(url);
     let data = await response.json();
 
     let product:Product[]= data.map((product:Product)=>{
         return {
             _id: product.id,
             name: product.name,
             image: product.image, // Đảm bảo API trả về mảng hình ảnh
             price: product.price,
             old_price: product.price,
             quantity: product.quantity,
             description: product.description,
             category: product.category, // Đảm bảo kiểu dữ liệu khớp với `Category`
         };
     });
 
     return product;
 };


export const postProduct = async (url: string, product: Product): Promise<Product> => {
const response = await fetch(url, {
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
 },
 body: JSON.stringify(product),
});
if (!response.ok) {
 throw new Error(`Failed to post product: ${response.statusText}`);
}
const data: Product = await response.json();
return data;
};
export const deleteProduct = async (url:string)=>{
let response = await fetch(url,{
   method:'DELETE',
})
let data = await response.json();
return data;
}

export const updateProduct = async (url: string, product: FormData) => {
const response = await fetch(url, {
 method: 'PUT',
 body: product,
});

if (!response.ok) {
 throw new Error(`HTTP error! status: ${response.status}`);
}

return await response.json();
};


export const getProductDetails = async (url: string): Promise<Product> => {
 let response = await fetch(url);
 let data = await response.json();
 let result = data.result; // Điều chỉnh nếu API không dùng `result`

 let product: Product = {
     id: result.id,
     name: result.name,
     image: result.image ?? [],
     price: result.price,
     quantity: result.quantity,
     description: result.description ?? '',
     category: result.category,
   
 };

 return product;
};
