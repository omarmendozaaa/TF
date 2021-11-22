import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import Reportes from "./pages/Reportes";
import Training from "./pages/Training";
import Predict from "./pages/Predict";
import { EsEntrenamiento } from "./Helpers/Utils";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [RolId, setRolId] = useState(1);

  const showSidebar = () => setSidebar(!sidebar);
  const changeRol = (IdRol) => setRolId(IdRol);

  return (
    <BrowserRouter>
      <Sidebar sidebar={sidebar} showSidebar={showSidebar} />
      <Navbar showSidebar={showSidebar} changeRol = {changeRol}/>
      <Routes>
        <Route path="/registros" element={<Dashboard/>} />
        <Route path="/" element={EsEntrenamiento(Number(RolId)) ? <Training/> : <Predict/>}/>
        <Route path="/reportes" element={<Reportes/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
