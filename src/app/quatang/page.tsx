'use client';  
import { useState } from 'react';  


export default function Quatang() {  
  const [isLiked, setIsLiked] = useState(false);  


  const handleLikeToggle = () => {  
    setIsLiked(!isLiked);  
  };  

  return (  
    <div>
      <i  
        className={`fa-heart ${isLiked ? 'fa-solid' : 'fa-regular'}`}   
        onClick={handleLikeToggle}  
        style={{ color: isLiked ? 'red' : 'red',  fontSize: '24px' }}  
      />  
    </div>  
  );  
};  

const styles = {  
  container: {  
    textAlign: 'center' as 'center',
    margin: '20px',  
  }  
};   