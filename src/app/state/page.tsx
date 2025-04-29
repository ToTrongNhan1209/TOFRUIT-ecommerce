import { useState } from "react";
export default function Home(){
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>You click {count} TIME</p>
            <button onClick={()=> setCount(count + 1)}>Click me</button>
        </div>
    );
}