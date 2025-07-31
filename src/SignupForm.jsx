import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ FIX: Added
import image from './images.jpg';

const SignupForm = ({ onSwitch }) => {
  const navigate = useNavigate(); // ✅ FIX: Added navigate

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/, "Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, "Password must include uppercase, lowercase, number, and special character"),
    cPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm your password"),
    country: yup.string().required("Select a country"),
    language: yup.string().required("Select a language"),
    aboutYou: yup.string().required("This field is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const emailKey = data.email.toLowerCase();
    const existingUser = JSON.parse(localStorage.getItem(emailKey));
    if (existingUser) {
      alert("Email is already registered!");
    } else {
      const userData = {
        fname: data.firstName,
        lname: data.lastName,
        email: emailKey,
        password: data.password,
      };
      localStorage.setItem(emailKey, JSON.stringify(userData));
      alert(`${data.firstName} ${data.lastName} has been successfully registered`);
      localStorage.setItem("token", data.email);
      navigate("/dashboard");
    }
  };

  const countries = ["Pakistan", "India", "USA", "UK","Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
    "Egypt"];
    const languages = [
    "English", "Urdu", "Hindi", "French", "German", "Spanish", "Mandarin", "Arabic", "Japanese", "Russian",
    "Portuguese", "Bengali", "Punjabi", "Turkish", "Korean", "Vietnamese", "Italian", "Persian (Farsi)", "Swahili", "Tamil",
    "Telugu", "Marathi", "Gujarati", "Malay", "Thai", "Polish", "Dutch", "Greek", "Czech", "Romanian",
    "Hungarian", "Ukrainian", "Hebrew", "Indonesian", "Filipino (Tagalog)", "Pashto", "Kannada", "Amharic", "Sinhala", "Zulu"
  ];

  return (
    <div style={{ backgroundImage: `url(${image})` }} className="bg-center p-10 bg-cover">
      <form className="bg-white shadow-md rounded-lg p-6 space-y-4 border bg-opacity-70 max-w-xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}>

        <h2 className="text-2xl font-bold text-center mb-4">SignUp Form</h2>
        <div>
          <label className="font-medium">First Name:</label>
          <input {...register("firstName")} placeholder="First name" className="border p-2 rounded w-full mt-1" />
          <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
        </div>

        <div>
          <label className="font-medium">Last Name:</label>
          <input {...register("lastName")} placeholder="Last name" className="border p-2 rounded w-full mt-1" />
          <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
        </div>

        <div>
          <label className="font-medium">Email:</label>
          <input type="email" {...register("email")} placeholder="Email" className="border p-2 rounded w-full mt-1" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label className="font-medium">Password:</label>
          <input type="password" {...register("password")} placeholder="Enter Password" className="border p-2 rounded w-full mt-1" />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <div>
          <label className="font-medium">Confirm Password:</label>
          <input type="password" {...register("cPassword")} placeholder="Confirm Password" className="border p-2 rounded w-full mt-1" />
          <p className="text-red-500 text-sm">{errors.cPassword?.message}</p>
        </div>

        <div>
          <label className="font-medium">Country:</label>
          <select {...register("country")} className="border p-2 rounded w-full mt-1">
            <option value="">Select Country...</option>
            {countries.map((c, i) => (<option key={i} value={c}>{c}</option>))}
          </select>
          <p className="text-red-500 text-sm">{errors.country?.message}</p>
        </div>

        <div>
          <label className="font-medium">Language:</label>
          <select {...register("language")} className="border p-2 rounded w-full mt-1">
            <option value="">Select Language...</option>
            {languages.map((lang, i) => (<option key={i} value={lang}>{lang}</option>))}
          </select>
          <p className="text-red-500 text-sm">{errors.language?.message}</p>
        </div>

        <div>
          <label className="font-medium">About You:</label>
          <textarea {...register("aboutYou")} placeholder="About you" rows={4} className="border p-2 rounded w-full mt-1" />
          <p className="text-red-500 text-sm">{errors.aboutYou?.message}</p>
        </div>

        <button type="submit" className="w-60 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition block mx-auto">
          Sign Up
        </button>
        <p className="text-center mt-4 text-sm">Already have an account?</p>
        <button type="button" onClick={onSwitch} className="w-60 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition block mx-auto">
          Login
        </button>
      </form>
      {/* {data && (
        <pre className="mt-6 p-4 bg-gray-100 rounded border text-sm overflow-x-auto">{data}</pre>
      )} */}
    </div>
  );
};

export default SignupForm;
