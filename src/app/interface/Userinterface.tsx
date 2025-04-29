export interface IUser {
    id?: number|string;
    username: string;
    email?: string;
    password?: string;
    role?: "user" | "admin";
 }
 
 
 export interface AuthContextType {
  user: IUser | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; user?: IUser; message?: string }>;
  logout: () => void;
  isAdmin: () => boolean;
}
 
 
  
export interface Billdetail{
    id: number|string;
    billid: number;
    productid: number;
    quantity: number;
    price: number;
}


    export interface BillContextType{
    billdetail: Billdetail[];
    addBillDetail: (billdetail: Billdetail) => void;
    removeBillDetail: (id: number|string) => void;
    updateBillDetail: (id: number|string, billdetail: Billdetail) => void;
    increaseQuantity: (id: number|string) => void;
    decreaseQuantity: (id: number|string) => void;
    getTotalPrice: () => number;
    }
