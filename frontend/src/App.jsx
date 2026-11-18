import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ReportRoute } from "./pages/Report";


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
      </Routes>
    </Router>
  );
}

export default App;
