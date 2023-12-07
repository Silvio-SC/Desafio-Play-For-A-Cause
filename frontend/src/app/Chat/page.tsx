"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Socket, io , } from 'socket.io-client'
import { IoIosSend } from "react-icons/io";
import { useUser } from '@/contexts/userContext';
import { jwtDecode } from 'jwt-decode';

export default function Chat() {

  interface IMessage {
    text: string,
    owner_id: string,
    roomId: string
  }

  const [text, setText] = useState<string>("")
  const [texts, setTexts] = useState<IMessage[]>([])
  const { getUser, user, GetRoomById, room} = useUser()


  const socket = React.useMemo<Socket>(
    () => io("http://localhost:3001"),
    []
  );

  let url = window.location.href
  const roomId = url.split("=")[1]

  const tokenData = localStorage.getItem("@TokenPlay")!
  const decoded = jwtDecode(tokenData!)

  useEffect(() => {
    getUser()
    try {
      GetRoomById(roomId)
    } finally {
      setTexts(room?.texts!)
    }
   
    try {
      socket.on("connect", () => {
        console.log("connectou")
      })
      
      socket.emit('joinRoom', ({roomId, user}))

      socket.on("receiveMessage", (message: any) => {
        console.log(message)
        setTexts([...texts, message.text])
      })
      
      
    } catch (error) {
      console.log(error)
    }    
  }, [socket])
  
  const sendMessage = () => {
    const message: IMessage = {
      text: text,
      owner_id: decoded.sub!,
      roomId: roomId
    }
    socket.emit("sendMessage", message)
    setTexts([...texts, message])
    setText('')
  }



  const renderTexts = (textos: IMessage[]) => {

    let list: any[] = []; 
    for (let i = 0; i < textos.length; i++) {
      const text = <p>{textos[i].text}</p>

      list = [...list, text]
    }
    return (
      <>
        {...list}
      </>
    )
  }

  return (
    <>
      <header className="flex gap-2 p-3 items-center justify-start hover:bg-gray-100 border-0 border-b-2 border-gray-200  max-w-md w-full">
        <span className="rounded-full p-6 bg-emerald-500 text-white text-xl sm:text-3xl font-bold w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
          S
        </span>
        <h3 className="sm:text-2xl font-semibold">Silvio Ferreira</h3>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="flex flex-col gap-2 p-3 items-center justify-start hover:bg-gray-100 max-w-md w-full">
          {renderTexts(texts ? texts : [])}
        </div>
        <form className='flex justify-center' onSubmit={(e) => e.preventDefault()}>
          <textarea value={text} onChange={(event) => setText(event.target.value)} 
            className='bg-gray-100 focus:output w-[80vw] focus:ring-0 p-2' >  
          </textarea>
          <button onClick={sendMessage}><IoIosSend size="2rem"/></button>
        </form>
      </main>
    </>
  )
}
