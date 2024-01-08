'use client'

import {useState} from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const LoginForm = () => {

  const router=useRouter();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault();
      // if(!email || !password){
      //   setError("All field are required.")
      //   return;
      // }

      try {
            const res=await signIn("credentials",{
              email,
              password,
              redirect:false
            });
            if(res.error){
              setError("Invalid Credentials");
              return;
            }
            router.replace("dashboard")
          } catch (error) {
            console.log(error);
          }
  };

  return (
    <div className='grid place-items-center h-screen'>
      <div className='showdow-lg p-5 rounded-lg border-t-4'>
        <h1 className='text-xl font-bold my-4'>Login Here!</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'> 
            <input type="email" placeholder='Your Email' onChange={(e)=>setEmail(e.target.value)}  />
            <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
            <button className='bg-green-500 text-white font-bold cursor-pointer px-6 py-2'>Login</button>

            {error && (
              <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>{error}</div>
            )}
            <Link className='text-sm mt-3 text-right' href={'/register'}>Don't have an account? <span>Register!</span> </Link>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
