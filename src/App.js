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
      //左のprevTodos(前のTodos(タスク))に右の新しいタスク{}を追加する
    });
    nameRef.current.value = null;
  }; 
   

  return (
    <div>
      <div>
        <MesPr mess={count} />
      </div>
      <input type="text" ref={nameRef}/>
      <button onClick={add_mes}>タスクを追加</button>
    </div>
  );
}

export default App;
