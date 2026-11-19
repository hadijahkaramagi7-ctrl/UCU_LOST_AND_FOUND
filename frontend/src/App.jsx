import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ReportRoute } from "./pages/Report";
import Items from "./pages/Items";
import ItemDetail from "./pages/ItemDetail";
import Claims from "./pages/Claims";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      {/* This puts the Navbar on every single page */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report" element={<ReportRoute />} />
        <Route path="/report/:type" element={<ReportRoute />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
