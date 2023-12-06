"use client"

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import logo from "../../public/PlayLogo.png"
import wall from "../../public/wallpaperPlay.jpeg"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  // console.log("connectou")

  const router = useRouter()

  return (
    <main className="flex h-screen flex-col p-12">
      <div className="items-center justify-between flex flex-col h-screen gap-12 lg:flex-row">
        <div className='items-center flex gap-4 flex-col text-center text-lg'>
          <Image src={logo} alt='Logo da Play for a cause' className='w-2/3 sm:w-full max-h-44 max-w-min'></Image>
          <h1 className='text-4xl sm:text-6xl font-bold'>Play For a Cause</h1>
          <h2 className='sm:text-2xl'>Seja bem vindo ao nosso primerio app de chat em tempo real.</h2> 
          <p className='sm:text-2xl'>A Play for a Cause faz do esporte e do entretenimento uma grande ferramenta de transformação social.</p> 
        </div>
        <div className=' w-full items-center flex gap-4 flex-col text-center text-lg lg:gap-6'>
          <Image src={wall} alt='arte da Play for a cause' className='max-w-sm hidden lg:block rounded-2xl'></Image>
          <button 
            className='bg-emerald-600 text-white p-2 rounded-2xl w-full max-w-xs mt-8'
            onClick={() => router.push('/Register')}
            >Sign Up</button>
          <span className='flex gap-1'>
            <p>Existing account?</p><Link href={'/Login'} className='font-bold'>Log in</Link>
          </span>
        </div>
      </div>
    </main>
  )
}
