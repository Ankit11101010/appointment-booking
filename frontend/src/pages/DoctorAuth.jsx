import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaClinicMedical,
  FaStethoscope,
  FaUserMd,
  FaShieldAlt,
  FaBrain,
  FaHeartbeat,
  FaEye,
  FaEyeSlash,
  FaHospital,
} from "react-icons/fa";

const DoctorAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const API_URL = "http://localhost:5000/api/auth"; // adjust if deployed

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    // Validate passwords match for signup
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      if (isLogin) {
        const { data } = await axios.post(`${API_URL}/login`, {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("doctorToken", data.token);
        setMessage("Login successful ✅");
      } else {
        const { data } = await axios.post(`${API_URL}/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "doctor",
          specialization: formData.specialization,
        });
        localStorage.setItem("doctorToken", data.token);
        setMessage("Signup successful ✅");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error occurred");
    }
  };

  const specializations = [
    { value: "cardiologist", label: "Cardiologist" },
    { value: "neurologist", label: "Neurologist" },
    { value: "pediatrician", label: "Pediatrician" },
    { value: "dermatologist", label: "Dermatologist" },
    { value: "general", label: "General Physician" },
    { value: "surgeon", label: "Surgeon" },
    { value: "psychiatrist", label: "Psychiatrist" },
    { value: "radiologist", label: "Radiologist" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-500/10 animate-pulse animate-duration-[4000ms]"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 rounded-full bg-cyan-500/10 animate-float animate-duration-[15000ms]"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-emerald-500/10 animate-pulse animate-duration-[5000ms]"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-7xl bg-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-700 shadow-2xl overflow-hidden min-h-[600px] lg:min-h-[700px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Form Section */}
            <div className="p-6 sm:p-8 lg:p-12 flex items-center justify-center h-full">
              <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    {isLogin ? (
                      <FaStethoscope className="text-blue-400 text-3xl" />
                    ) : (
                      <FaClinicMedical className="text-blue-400 text-3xl" />
                    )}
                    <h1 className="text-2xl lg:text-3xl font-bold text-white">
                      {isLogin ? "Doctor Sign In" : "Doctor Registration"}
                    </h1>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {isLogin
                      ? "Access your medical dashboard"
                      : "Join our healthcare network"}
                  </p>
                </div>

                {message && (
                  <div className={`p-3 rounded-lg text-center text-sm ${
                    message.includes("✅") 
                      ? "bg-green-900/30 text-green-300" 
                      : "bg-red-900/30 text-red-300"
                  }`}>
                    {message}
                  </div>
                )}

                {/* Login Form */}
                {isLogin && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaUser />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-200"
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaLock />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-10 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-200"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-300"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-gray-400">Remember me</span>
                      </label>
                      <button
                        type="button"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-200"
                    >
                      Sign In
                    </button>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">
                        New to our platform?{" "}
                        <button
                          type="button"
                          onClick={() => setIsLogin(false)}
                          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                          Create Account
                        </button>
                      </p>
                    </div>
                  </form>
                )}

                {/* Sign Up Form */}
                {!isLogin && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaUserMd />
                        </div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-200"
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaEnvelope />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Professional Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-200"
                        />
                      </div>

                      <div className="relative">
                        <select 
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-white appearance-none"
                        >
                          <option value="">Select Specialization</option>
                          {specializations.map((spec) => (
                            <option key={spec.value} value={spec.value}>
                              {spec.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaLock />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Create Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-10 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-200"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-300"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                          <FaShieldAlt />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-10 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-200"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-300"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <input
                        id="terms"
                        type="checkbox"
                        required
                        className="mt-1 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="terms"
                        className="text-gray-400 text-sm leading-relaxed"
                      >
                        I agree to the{" "}
                        <button
                          type="button"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Terms of Service
                        </button>{" "}
                        and{" "}
                        <button
                          type="button"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Privacy Policy
                        </button>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-200"
                    >
                      Create Account
                    </button>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setIsLogin(true)}
                          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                          Sign In
                        </button>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Welcome Section */}
            <div className="hidden lg:flex relative bg-gradient-to-br from-blue-900/70 via-cyan-900/50 to-gray-900 p-12 h-full min-h-[calc(100vh-100px)]">
              <div className="relative z-10 flex flex-col justify-center text-white space-y-6 w-full">
                {isLogin ? (
                  <>
                    <div className="space-y-4">
                      <h2 className="text-4xl font-bold leading-tight">
                        Welcome Back,
                        <br />
                        <span className="text-blue-300">Doctor</span> 👨‍⚕️
                      </h2>
                      <p className="text-gray-200 leading-relaxed text-lg">
                        Access your AI-powered medical workspace. Manage patients,
                        collaborate with colleagues, and stay at the forefront of
                        healthcare innovation.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <FaHeartbeat className="text-blue-400 text-xl" />
                        <span>Real-time patient monitoring</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaBrain className="text-blue-400 text-xl" />
                        <span>AI-powered diagnostics</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaShieldAlt className="text-blue-400 text-xl" />
                        <span>Secure patient data</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsLogin(false)}
                      className="w-fit mt-6 px-6 py-2 border-2 border-white rounded-xl text-white hover:bg-white hover:text-gray-900 transition-all duration-200"
                    >
                      New Here? Register
                    </button>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <h2 className="text-4xl font-bold leading-tight">
                        Join Our
                        <br />
                        <span className="text-blue-300">Medical Network</span> 🌐
                      </h2>
                      <p className="text-gray-200 leading-relaxed text-lg">
                        Be part of the future of healthcare. Connect with a global
                        network of medical professionals and access cutting-edge tools.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-green-400">✓</span>
                        <span>AI-driven patient analytics</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-green-400">✓</span>
                        <span>Blockchain-secured records</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-green-400">✓</span>
                        <span>Global collaboration platform</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-green-400">✓</span>
                        <span>24/7 professional support</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsLogin(true)}
                      className="w-fit mt-6 px-6 py-2 border-2 border-white rounded-xl text-white hover:bg-white hover:text-gray-900 transition-all duration-200"
                    >
                      Already Registered? Sign In
                    </button>
                  </>
                )}
              </div>

              {/* Floating elements */}
              <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-blue-500/20 animate-pulse animate-duration-[4000ms]"></div>
              <div className="absolute bottom-32 right-32 w-12 h-12 rounded-full bg-cyan-500/20 animate-float animate-duration-[15000ms]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DoctorAuth;