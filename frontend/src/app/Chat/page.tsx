"use client"

import { useEffect, useRef } from 'react'
import { io , Manager} from 'socket.io-client'

export default function Chat() {
  // console.log("connectou")

  const socketIORef = useRef<any>()
  
  useEffect(() => {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">

      </div>
    </main>
  )
}
