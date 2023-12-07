"use client"

import { useUser } from '@/contexts/userContext'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import logo from "../../../public/PlayLogo.png"
import { ContactList } from '@/components/UserCardList'

import { IoMdExit } from "react-icons/io";
import { LuUserPlus } from "react-icons/lu";

export default function Dashboard() {

  const { getUser, user, setUser, loading, GetAllRooms, userRooms} = useUser()

  const [seach, setSeach] = useState<string>("")

  const router = useRouter()

  useEffect(() => {
    getUser()
    GetAllRooms()
    let tokennow = localStorage.getItem("@TokenPlay")
    if(!tokennow) {
          redirect("/")
      }
  }, [])

  const list = userRooms.filter((room: any) => {
    if (room.users[0].users.name.toLowerCase().includes(seach.toLowerCase())){
      if(user?.email !== room.users[0].users.email) {
        return room
      }
    }
    if (room.users[1].users.name.toLowerCase().includes(seach.toLowerCase())){ 
      if(user?.email !== room.users[1].users.email) {
        return room
      }
    }
  }) 
  

  const logout = () => {
    localStorage.removeItem("@TokenPlay")
    setUser(null)

    router.push('/')
  }

  return (
    <>
      <header className='flex justify-between px-4 shadow-md'>
        <Image src={logo} alt='Logo da Play for a cause' className='w-1/3 w-24 max-h-44 max-w-min'></Image>
        <button onClick={logout} className='font-bold hover:text-emerald-500 focus:outline-0'><IoMdExit size="2rem" /></button>
      </header>
      <main className="flex min-h-screen flex-col items-center gap-4 p-4 lg:p-24">
        <nav className='flex gap-8 items-center w-full justify-evenly border-0 border-b-2 border-gray-200 py-8' >
          <input type="search" onChange={(event) => setSeach(event.target.value)} value={seach}
            placeholder='Buscar...' className="py-1 px-3 bg-gray-100 outline-0 focus:ring-0 w-full max-w-md"
          />
          <button><LuUserPlus size="2rem" /></button>
        </nav>
        <div className="max-w-5xl w-full flex flex-col items-start">
          {user ? <ContactList userRooms={list} user={user} /> : null}
        </div>
      </main>
      <footer className='hidden'></footer>
    </>
  )
}
