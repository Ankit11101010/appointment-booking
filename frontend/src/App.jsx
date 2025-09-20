import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Outlet /> {/* Renders Landing or Home */}
    </div>
  );
}
