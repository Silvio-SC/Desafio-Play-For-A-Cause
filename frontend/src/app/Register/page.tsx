"use client"

import { useForm } from "react-hook-form"
import { Input } from "../../components/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import {RegisterData, RegisterSchema } from "./registerSchema"
import Image from "next/image"
import logo from "../../../public/PlayLogo.png"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Register () {

    // const {createAccount} = useContext(ClientContext)
    // const { IsLogin } = useContext(Context)

    // useEffect(() => {
    //     IsLogin()
    // }, [])
    const router = useRouter()

  
    const {handleSubmit, register} = useForm<RegisterData>({
        resolver: zodResolver(RegisterSchema)
    })

    const submit = (data:RegisterData) => {
        // createAccount(data)
        router.push('/Login')
    }

    const svgLoading = (
      <svg className="animate-spin h-6 w-6 self-center" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
          <path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
              <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
          </path>
      </svg>
  )

    return (
        <main className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-gray-300">
            <div className="bg-gray-100 border-2 border-gray-200 rounded-2xl p-8 w-full sm:w-2/4 max-w-sm">
                <div className="flex justify-between items-center pb-4">
                  <h2 className="text-4xl">Log in</h2>
                  <Image src={logo} alt='Logo da Play for a cause' className='w-1/3 w-24 max-h-44 max-w-min'></Image>
                </div>
                <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
                      <Input 
                        name={"name"} 
                        register={register('name')} 
                        placeholder={"insira seu nome aqui..."} 
                        type={"text"} 
                        label={"Nome"}  />
                      <Input 
                        name={"email"} 
                        register={register('email')} 
                        placeholder={"insira seu email aqui..."} 
                        type={"email"} 
                        label={"Email"}  />
                      <Input 
                        name={"password"} 
                        register={register('password')} 
                        placeholder={"insira sua senha aqui..."} 
                        type={"password"} 
                        label={"Senha"}  />
                    <button 
                        type="submit" 
                        className='bg-emerald-600 text-white p-2 rounded-2xl w-full max-w-xs mt-8 hover:bg-emerald-800 flex justify-center'>
                        { false ? svgLoading : "Registra-se" }
                    </button>
                    <p className="mt-6 text-sm lg:text-base">Já é cadastrado? faço o  
                      <Link href={"/Login"} className="hover:text-emerald-600"> Log in aqui !</Link>
                    </p>
                </form>

            </div>
        </main>
    )
}    
