import './App.css';
import {useState,useRef} from "react"
import MesPr from './MesPr';



function App() {
  const [count, setCount] = useState([]);

  const nameRef = useRef();
  
  const add_mes = () => {
    const name = nameRef.current.value;
    if(name === "") return;
    
    setCount((prev) =>{
      let a = [...prev] 
      a.push(name)
      return(
        [...a]
      )
    });
    nameRef.current.value = null;
  }; 
   

  return (
    <div>
      <div>
        <MesPr mess={count} />
      </div>
      <input type="text" ref={nameRef}/>
      <button onClick={add_mes}>送信 ＞ </button>
    </div>
  );
}

export default App;
