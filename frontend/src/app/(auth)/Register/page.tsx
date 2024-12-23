"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

const RegisterPage = () => { 
    const [email,setEmail] = useState("")
    const [password,setPassword] =useState("")
    const router = useRouter()

    
    const handleRegister = async () => {
      if (!email || !password) {
        alert("please fill in all fields")
        return
      }
      try{
        const response = await fetch("api/register",{
          method : "POST",
          headers :{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email,password}),

        })
        if(response.ok){
        const data = await response.json()
        Swal.fire({
          title: "Good job!",
          text: data.message,
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false // Tamam butonunu gizler
        }).then(()=> {
          router.push('/Login') 
        })

        }else{
          Swal.fire({
            title: "Error!",
            text: 'An error occurred',
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
       }
    }

      return (
        <div className="min-h-screen bg-blue-100 flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">Register</h3>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Enter your email"

              />
            </div>
    
            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
               Create Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
    
            {/* Register Button */}
            <button 
            className="w-full bg-bg1 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handleRegister}
            >
             
              Create account
            </button>
    
            <hr className="my-6" />
    
            {/* Social Buttons */}
            <button className="w-full bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition mb-2">
              <i className="fab fa-google"></i> Sign in with Google
            </button>
            <span className="text-gray-700">
              Have an account?{' '}
              <Link href="/Login" className="text-blue-500 ml-3 hover:text-blue-700">
              Login
              </Link>
            </span>
          </div>
        </div>
      );
    }
 

export default RegisterPage