import {Category} from '@/app/interface/Categoryinterface';
export const getAllCategories = async(url: string)=>{
    let res = await fetch(url);
    let data = await res.json();
    let categories = data.map((category: any) =>{
        return{
            _id: category.id,
            name: category.name,
            description: category.description??'',
        }
    })
    return categories;
}

// export const getCategoryDetails = async (url:string, id:number) =>{
//     let response = await fetch(url+id);
//     let data = await response.json();
//     let category:Category ={
//         _id:data._id,
//         name: data.name,
//         description : data.description??'',
//     }
//     return category;

// }
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
        return data;  
    } catch (error) {  
        console.error('Có lỗi xảy ra khi cập nhật danh mục:', error);  
        throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm  
    }  
};

export const deleteCategory = async (url:string, id:string)=>{
    let response = await fetch(url+id,{
        method:'DELETE',
    })
    let data = await response.json();
    return data;
}