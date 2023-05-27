'use client'
import React from 'react'
import Link from 'next/link'
import SignInButton from './SignInButton'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
    const { data: session, status } = useSession();
    // console.log(status,session?.user?.email);
    // console.log(session?.user.user_id)
    // return (
    //     <div className="flex gap-4 ml-auto">
    //         <p className="text-sky-600">{session?.user?.user_id}</p>
    //         <button onClick={() => signOut()} className="text-red-600">
    //             Sign Out
    //         </button>
    //     </div>
    // );
    if (status === 'authenticated') {
        console.log('na: ', session)
        return (
            <nav className='bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10'>
                <div className='prose prose-xl mx-auto flex justify-between flex-col sm:flex-row'>
                    <Link href='/' className='text-white/90 no-underline hover:text-white'></Link>
                </div>
                <div className="flex gap-4 ml-auto">
                    <p className="text-sky-600">{session?.user?.name}</p>
                    <button onClick={() => signOut()} className="text-red-600">
                        Sign Out
                    </button>
                </div>
                {/* <SignInButton></SignInButton> */}
            </nav>
        )
    }
}
