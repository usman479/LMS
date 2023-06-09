// 'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Context } from '@/lib/context'
import { useSession } from 'next-auth/react'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LMS',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const {data:session} = useSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        {/* <Context.Provider value={session?.user}> */}
          {/* <Navbar/> */}
          {children}
      {/* </Context.Provider> */}
        </Providers>
      </body>
    </html>
  )
}
