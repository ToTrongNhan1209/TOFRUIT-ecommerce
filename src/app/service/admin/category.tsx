import { Category } from "@/app/interface/Categoryinterface";

export const getAllCategories = async(url: string)=>{
    let res = await fetch(url);
    let data = await res.json();
    let categories = data.map((category:Category) =>{
        return{
            id: category.id,
            name: category.name,
            description: category.description??'',
        }
    })
    return categories;
}
export const postCategory = async (url:string,category:Category)=>{
    let response = await fetch(url, {
        method : 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(category)
    });
    let data = await response.json();
    return data;
}

export const deleteCategory = async (url:string)=>{
    let response = await fetch(url,{
        method:'DELETE',
    })
    let data = await response.json();
    return data;
}
    export const updateCategory = async (url: string, category: Category) => {  
        try {  
            const response = await fetch(url, {  
                method: 'PUT',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify(category),  
            });  

            // Kiểm tra nếu có lỗi  
            if (!response.ok) {  
                const errorText = await response.text(); // Lấy thông báo lỗi từ server  
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);  
            }  

            const data = await response.json(); 
            console.log('Category updated successfully:', data); // Thêm log để kiểm tra dữ liệu trả về
            return data;  
        } catch (error) {  
            console.error('Có lỗi xảy ra khi cập nhật danh mục:', error);  
            throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm  
        }  
    };

// export const getCategoryDetails = async (url: string) => {
//     let response = await fetch(url);
//     let data = await response.json();
//     let result = data.result; // Điều chỉnh theo cấu trúc thật của API
//     let category: Category = {
//         id: result._id,
//         name: result.name,
//         description: result.description ?? '',
//     };
//     return category;
// };
