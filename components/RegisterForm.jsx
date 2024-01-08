'use client'
import {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const router=useRouter();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  const handleSubmit=async(e)=>{
      e.preventDefault();
      if(!name ||!email || !password){
        setError("All field are required.")
        return;
      }

      try{

        const res=await fetch('/api/userexists',{
          method:'POST',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({email})
        })
        const {user}=await res.json();
        if(user){
          setError("User Already Exists!");
          console.log(user);
          return;
        }

        const response=await fetch('/api/register',{
          method:'POST',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({name,email,password})
        })
        if(response.ok){
          // const form=e.target;
          // form.reset();
          window.alert("User Registeration Success!")
          setName("");
          setEmail("");
          setPassword("");
          router.push('/');
          e.target.reset();
        }else{
          console.log("User Registeration failed!")
        }
      }catch(error){
          console.log(error);
      }

  }

  return (
    <div className='grid place-items-center h-screen'>
      <div className='showdow-lg p-5 rounded-lg border-t-4'>
        <h1 className='text-xl font-bold my-4'>Enter Your Credentials!</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'> 
            <input type="text" placeholder='Your Name' onChange={(e)=>setName(e.target.value)} value={name}/>
            <input type="email" placeholder='Your Email' onChange={(e)=>setEmail(e.target.value)} value={email} />
            <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password} />
            <button className='bg-green-500 text-white font-bold cursor-pointer px-6 py-2'>Register</button>

            {error && (
              <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>{error}</div>
            )}  
            <Link className='text-sm mt-3 text-right' href={'/'}>Already have an account? <span>Login!</span> </Link>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
