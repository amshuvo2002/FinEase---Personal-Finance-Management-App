import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Authcontext } from "../Provider/Authprovider";
import { auth, googleProvider } from "../Firebase/firebase.config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; 
import Swal from "sweetalert2";

const Login = () => {
  const { setuser } = useContext(Authcontext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setuser(result.user);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${result.user.displayName || ""}`,
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setuser(result.user);

        Swal.fire({
          icon: "success",
          title: "Google Login Successful!",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
        });
      });
  };

  return (
    <div className="min-h-screen text-black flex items-center justify-center p-4">
         <title>FinEase-Login</title>
      <div className="bg-gray-300 p-8 border-2 border-gray-400 shadow-xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-gray-700 text-center mb-6">Login 📝</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full bg-white px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative"> 
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full bg-white px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-700"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn w-full mt-5 bg-white hover:bg-gray-400 text-black border-black flex items-center justify-center gap-2"
        >
          <FcGoogle /> Google Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
