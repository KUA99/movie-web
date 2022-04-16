import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Detail from "./pages/detail/Detail";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Catalog />} />
        <Route path="/:category/:id" element={<Detail />} />
        <Route path="/:category/search/:keyword" element={<Catalog />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
