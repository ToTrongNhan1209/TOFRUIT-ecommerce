export const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Sai thông tin đăng nhập. Vui lòng thử lại.");
      }
  
      return await response.json(); // Trả về dữ liệu user nếu đăng nhập thành công
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  