"use client"

import { useUser } from '@/contexts/userContext'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import logo from "../../../public/PlayLogo.png"
import { ContactList } from '@/components/UserCardList'

export default function Dashboard() {

  const { getUser, user, setUser, loading, logout, countContacts } = useUser()

  const socketIORef = useRef<any>()

  let result = false
  useEffect(() => {
    getUser()
    let tokennow = localStorage.getItem("@TokenPlay")
    if(!tokennow) {
          redirect("/")
      }

    try {
      socketIORef.current = io("http://localhost:3001");

      socketIORef.current.on("connect", () => {
        console.log("connectou")
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <header className='flex justify-between px-4 shadow-md'>
        <Image src={logo} alt='Logo da Play for a cause' className='w-1/3 w-24 max-h-44 max-w-min'></Image>
        <button onClick={() => logout} className='font-bold hover:text-emerald-500 focus:outline-0'>Logout</button>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:p-24">
        <div className="max-w-5xl w-full flex gap-4 flex-col">
          <ContactList />
        </div>
      </main>
      <footer className='hidden'></footer>
    </>
  )
}
