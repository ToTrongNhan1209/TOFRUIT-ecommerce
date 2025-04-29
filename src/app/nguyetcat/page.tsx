'use client';  
import { useState } from 'react'; 
import style from '../style.module.css';
// import '../globals.css';
export default function nguyetcat(){
    const [count, setCount] = useState(0);
    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
                 <p>{count}<i className="fa-solid fa-heart"  onClick={()=> setCount(count + 1)}/></p>

                 <a href=".../app1/overview/page.tsx">dsds</a>
        </div>
        

    );
}