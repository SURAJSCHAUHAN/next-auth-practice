'use client';

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react";

const UserInfo = () => {

  const {data:session}=useSession();

  return (
    <div className='grid place-items-center h-screen rounded-lg'>
        <div className='showdow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6'>User Info
            <div>
                Name: <span className='font-bold'>{session?.user?.name}</span>
            </div>
            <div>
                Email: <span className='font-bold'>{session?.user?.email}</span>
            </div>
            <button onClick={()=>signOut()} className='bg-red-500 text-white font-bold px-6 py-2 mt-3'>LogOut</button>
        </div>
    </div>
  )
}

export default UserInfo
