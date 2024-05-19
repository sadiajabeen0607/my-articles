import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth } from "../../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleSignUp = async() => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser, {displayName:name});
    navigate("/");
    } catch (error) {
        toast(error.code, {type: "error"});
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center mt-20">
      <div className="md:w-[35%]">
        <form className=" w-full border border-gray-300 rounded-lg p-6 px-10">
          <p className="text-3xl text-slate-800 font-bold flex items-center justify-center mb-5">
            Register Form
          </p>
          <div className="my-2 w-full">
            <label htmlFor="" className="text-lg font-medium">
              Username
            </label>
            <div className="w-full py-2 border border-gray-300 flex items-center gap-2 rounded-md">
              <input
                type="text"
                required
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="w-full h-full bg-transparent text-lg px-2 outline-none border-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="my-2 w-full">
            <label htmlFor="" className="text-lg font-medium">
              Email
            </label>
            <div className="w-full py-2 border border-gray-300 flex items-center gap-2 rounded-md">
              <input
                type="email"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-full bg-transparent text-lg px-2 outline-none border-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="my-2 w-full">
            <label htmlFor="" className="text-lg font-medium">
              Password
            </label>
            <div className="w-full py-2 border border-gray-300 flex items-center gap-2 rounded-md">
              <input
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-full bg-transparent text-lg px-2 outline-none border-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-6">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 focus:outline-none"
              onClick={handleSignUp}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
