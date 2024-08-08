import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ConsultarPlaca from "./pages/Consultar/consultar";
import Cadastrar from "./pages/cadastrar/cadastro";
import Header from "./components/Header/header";

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/consultar' element={<ConsultarPlaca />} />
                <Route path='/cadastro' element={<Cadastrar />} />
            </Routes>
        </BrowserRouter>
    );
}