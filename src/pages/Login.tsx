import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BriefcaseBusiness, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LocationState {
  selectedRole?: string;
  from?: Location;
}

const Login = () => {
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Registration state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerRole, setRegisterRole] = useState<
    "admin" | "candidate" | "interviewer"
  >("candidate");

  const [activeTab, setActiveTab] = useState("login");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { login, register, isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    if (state?.selectedRole) {
      setSelectedRole(state.selectedRole);
      switch (state.selectedRole) {
        case "admin":
          setEmail("admin@example.com");
          break;
        case "candidate":
          setEmail("candidate@example.com");
          break;
        case "interviewer":
          setEmail("interviewer@example.com");
          break;
        default:
          break;
      }
      setRegisterRole(state.selectedRole as any);
    }

    if (isAuthenticated && user) {
      redirectToAppropriateRoute();
    }
  }, [state, isAuthenticated, user]);

  const redirectToAppropriateRoute = () => {
    if (!user) return;
    const from = state?.from?.pathname || "";

    if (from && from !== "/login" && from !== "/") {
      navigate(from);
    } else {
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "candidate":
          navigate("/candidate/dashboard");
          break;
        case "interviewer":
          navigate("/interviewer/dashboard");
          break;
        default:
          navigate("/");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description:
          "Invalid email or password. Please check the demo credentials below.",
      });
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!registerName || !registerEmail || !registerPassword) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Passwords do not match.",
      });
      return;
    }

    try {
      const nameParts = registerName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      await register(
        registerEmail,
        registerPassword,
        firstName,
        lastName,
        registerRole
      );

      toast({
        title: "Registration successful",
        description: "Your account has been created!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Could not create account. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Branding */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-8 flex flex-col items-center justify-center">
          <BriefcaseBusiness className="h-16 w-16 mb-4 animate-pulse" />
          <h1 className="text-3xl font-extrabold mb-2">SkillMatcherAi</h1>
          <p className="text-sm text-indigo-100 text-center max-w-xs">
            Connect your skills with the right opportunities. Sign in or create an account to get started.
          </p>
        </div>

        {/* Right Side - Forms */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === "login" ? "" : ""}
            </h2>
          </div>

          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-2 text-center font-medium transition-colors ${activeTab === "login"
                    ? "border-b-2 border-indigo-600 text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                  }`}
                onClick={() => setActiveTab("login")}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-2 text-center font-medium transition-colors ${activeTab === "register"
                    ? "border-b-2 border-indigo-600 text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                  }`}
                onClick={() => setActiveTab("register")}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form Container with Fixed Height */}
          <div className="h-[400px] flex flex-col">
            {/* Login Form */}
            {activeTab === "login" && (
              <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label> */}
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    required
                  />
                </div>
                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label> */}
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    required
                  />
                </div>
                <div className="flex-1" /> {/* Spacer to maintain height */}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </button>
              </form>
            )}

            {/* Register Form */}
            {activeTab === "register" && (
              <form onSubmit={handleRegister} className="space-y-4 flex-1">
                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label> */}
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    required
                  />
                </div>
                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label> */}
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    required
                  />
                </div>
                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label> */}
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    required
                  />
                </div>
                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label> */}
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Role
                  </label>
                  <div className="flex space-x-4">
                    {["admin", "candidate", "interviewer"].map((role) => (
                      <label key={role} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={role}
                          checked={registerRole === role}
                          onChange={(e) =>
                            setRegisterRole(
                              e.target.value as "admin" | "candidate" | "interviewer"
                            )
                          }
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {role}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;