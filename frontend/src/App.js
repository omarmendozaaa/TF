import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import Registros from "./pages/Registros";
import Reportes from "./pages/Reportes";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [RolId, setRolId] = useState(1);
  
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <BrowserRouter>
      <Sidebar sidebar={sidebar} showSidebar={showSidebar} />
      <Navbar showSidebar={showSidebar} setRolId = {setRolId}/>
      <Routes>
        <Route path="/" element={<Dashboard RolId = {RolId}/>} />
        <Route path="/registros" element={<Registros RolId = {RolId}/>} />
        <Route path="/reportes" element={<Reportes RolId = {RolId}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
