import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom"; // ✅ FIX: Added
import image from './images.jpg';

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  email: yup.string()
    .required("Email is required")
    .email("Invalid email")
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/, "Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, "Password must include uppercase, lowercase, number, and special character"),
});

function LoginForm({ onSwitch }) {
  const navigate = useNavigate(); // ✅ FIX: Added navigate
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) }); // ✅ FIX: Added reset

  const onSubmit = (data) => {
    const userData = JSON.parse(localStorage.getItem(data.email.toLowerCase())); // Case-insensitive email
    if (userData) {
      if (userData.password === data.password) {
        alert(`${userData.fname} ${userData.lname}, you are successfully logged in!`);
        localStorage.setItem("token",  data.email);
        reset();
        navigate("/dashboard");
      } else {
        alert("Password is incorrect!");
      }
    } else {
      alert("Email or Password is incorrect!");
    }
  };

  return (
    <div style={{ backgroundImage: `url(${image})` }} className="h-screen w-screen bg-no-repeat bg-center bg-cover p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 bg-opacity-70 space-y-8 border max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Login Form</h1>

        <div>
          <label className="font-medium text-xl">First Name:</label>
          <input {...register("firstName")} placeholder="First name" className="border p-2 rounded w-full mt-1" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="font-medium text-xl">Email:</label>
          <input {...register("email")} type="email" placeholder="Enter valid email" className="border p-2 rounded w-full mt-1" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="font-medium text-xl">Password:</label>
          <input {...register("password")} type="password" placeholder="Enter strong password" className="border p-2 rounded w-full mt-1" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button type="submit" className="w-60 bg-green-600 text-white text-xl py-2 rounded hover:bg-green-700 transition block mx-auto">
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <button type="button" onClick={onSwitch} className="w-60 bg-blue-600 text-white mt-4 py-2 text-xl rounded hover:bg-blue-700 transition block mx-auto">
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
