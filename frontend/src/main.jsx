import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Landing from "./pages/Landing";
import Booking from "./pages/Booking";
import DoctorAuth from "./pages/DoctorAuth";
import "./index.css";
import Home from "./pages/Home";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* All routes that include Navbar are inside App */}
      <Route path="/" element={<App />}>
        <Route index element={<Landing />} /> {/* Default page */}
        <Route path="/booking" element={<Booking />} />
      </Route>
      <Route path="/doctor-auth" element={<DoctorAuth />} />
     
     <Route path="/dash" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
