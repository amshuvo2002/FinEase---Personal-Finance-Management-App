import React, { useState, useContext } from "react";
import { Link } from "react-router";
import { Authcontext } from "../Provider/Authprovider";
import { auth, googleProvider } from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";

const Register = () => {
  const { setuser } = useContext(Authcontext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;
    return hasUppercase && hasLowercase && hasMinLength;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters long and include both uppercase and lowercase letters.",
      });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photoURL || "",
        }).then(() => userCredential.user);
      })
      .then((user) => {
        setuser(user);
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: `Welcome ${user.displayName}`,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };
  

  const handleGoogleRegister = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setuser(result.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${result.user.displayName}`,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Google login failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center text-black p-4">
         <title>FinEase-Register</title>
      <div className=" p-8 shadow-xl bg-gray-300 border-2 border-gray-400 w-full max-w-md">
        <h2 className="text-4xl font-bold  text-gray-700 text-center mb-6">Register 📝</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full bg-white px-4 py-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full bg-white px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Photo URL"
            className="w-full bg-white px-4 py-2 border rounded-lg"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
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
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="btn w-full mt-5 bg-white hover:bg-gray-400 text-black border-black flex items-center justify-center gap-2"
        >
          <FcGoogle size={24} />
          Google Login
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
