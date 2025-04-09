import { useState, useEffect } from "react";
import "./App.css";
import MainPage from "../components/mainpage";
import Home from "../components/home";
import {Routes,Route, useNavigate} from 'react-router-dom'
import { Navigate } from "react-router-dom";

function App() {
 
 return(
 <>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/course" element={<MainPage />} />
</Routes>
</>
)
}
export default App;
