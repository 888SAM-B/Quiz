import { useState, useEffect } from "react";
import {Routes,Route, useNavigate} from 'react-router-dom'

function home() {
  const navigate=useNavigate();
  const nav = (event) => {
    const course = event.target.value;
    navigate("/course", { state: { course } });
  };
 return(
 <>

<div className="firstpage">
  <button onClick={(event)=>nav(event) } value={"java"}>JAVA</button>
  <button onClick={(event)=>nav(event) } value={"python"}>PYTHON</button>
  <button onClick={(event)=>nav(event) } value={"c"}>C Language</button>
</div>
</>
)
}
export default home;
