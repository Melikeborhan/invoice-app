'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try{
  const response =await fetch('api/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({email,password}),
  });

  if(response.ok){
    const data = await response.json();
    Swal.fire({
      title: "Good job!",
      text: data.message,
      icon: "success",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false // Tamam butonunu gizler
    }).then(()=> {
      router.push('/') 
    })
  }else{
      const errorData = await response.json();
      Swal.fire({
        title: "Error!",
        text:  'An error occurred',
        icon: "error",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false // Tamam butonunu gizler
      })
    }
    }catch(error){
      
      Swal.fire({
        title: "Error!",
        text: 'An unexpected error occurred',
        icon: "error",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false // Tamam butonunu gizler
      })
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-semibold mb-6 text-center">Login</h3>
        <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md p-3  border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
            placeholder="Enter your password"
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-center mb-4">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-0 border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
            Remember password
          </label>
        </div>

        {/* Login Button */}
        <button className="w-full bg-bg1 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Login
        </button>
         
        <hr className="my-6" />

        {/* Social Buttons */}
        <button className="w-full bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition mb-2">
          <i className="fab fa-google"></i> Sign in with Google
        </button>
        <span className="text-gray-700">
         Don't have an account?{' '}
          <Link href="/Register" className="text-blue-500 ml-3 hover:text-blue-700">
            Create account
          </Link>
        </span>
        </form>
        
      </div>
    </div>
  );
}
