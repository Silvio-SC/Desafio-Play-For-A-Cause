import { LoginData } from "@/app/Login/loginSchema";
import { RegisterData } from "@/app/Register/registerSchema";
import api from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { useRouter} from "next/navigation";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export interface User {
  id: string,
	email: string,
	name: string,
	rooms: [
		{
			roomId: string,
			usersId: string
		}
	]
}

export interface Room {
    id: string,
    texts: [
      {
        id:string,
        text: string,
        owner_id: string,
        createdAt: string,
        roomId: string
      },
      {
        id: string,
        text: string,
        owner_id: string,
        createdAt: string,
        roomId: string
      }
    ],
    users: [
      {
        users: {
          id: string,
          name: string,
          email: string,
          password: string
        }
      }
    ]
}

interface UserProviderData {
    createUser: (data: RegisterData) => void
    login: (data: LoginData) => void
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    getUser: () => void
    logout: () => void
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    token: string | null
    userRooms: Room[] | []
    setUserRooms:React.Dispatch<React.SetStateAction<Room[] | []>>
    GetAllRooms: () => void
    GetRoomById: (id: string) => void
    room: Room | null
}

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export const UserProvider = ({ children }: Props) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userRooms, setUserRooms] = useState<Room[] | []>([]);
  const [room, setRoom] = useState<Room | null>(null);
  
  const router = useRouter() 
  
  const getUser = async () => {
    const tokenData = localStorage.getItem("@TokenPlay")!
    setToken(tokenData)
    const decoded = jwtDecode(tokenData!)

    setLoading(true)
      try {
        const {data}: {data: User} = await api.get(`/users/${decoded.sub!}` ,{
          headers: {
            Authorization: `Bearer ${tokenData}`
          }
        }
        )
        setUser(data)
      } catch (error) {
          console.log(error)
      }
      setLoading(false)
  }

  const createUser = (data: RegisterData) => {
    setLoading(true)
      try {
        api.post("/users", data)

      } catch (error) {
          console.log(error)
      }
      setLoading(false)
  }

  const login = async (loginData: LoginData) => {
    setLoading(true)
    try {
      const { data }: any  = await api.post("/login", loginData)
      localStorage.setItem("@TokenPlay", data.token)

    } catch (error) {
        console.log(error)
    }
    setLoading(false)
  }

  const logout = () => {
    localStorage.removeItem("@TokenPlay")
    setUser(null)
    setToken(null)

    router.push('/Dashboard')
  }

  const GetAllRooms = async () => {
    const tokenData = localStorage.getItem("@TokenPlay")!
    const decoded = jwtDecode(tokenData!)


      let {data}: {data: Room[]} = await api.get(`/rooms?userId=${decoded.sub} `, {
        headers: {
          Authorization: `Bearer ${tokenData}`
        }
      })

    setUserRooms(data)
    console.log(data)
  }

  const GetRoomById = async (id: string) => {
    const tokenData = localStorage.getItem("@TokenPlay")!

      let {data}: {data: Room} = await api.get(`/rooms/${id} `, {
        headers: {
          Authorization: `Bearer ${tokenData}`
        }
      })

      setRoom(data)
  }

  return (
    <UserContext.Provider value={{
      createUser, 
      loading, 
      setLoading, 
      login, 
      getUser, 
      user, 
      setUser, 
      logout, 
      token,
      userRooms, 
      setUserRooms,
      GetAllRooms,
      GetRoomById,
      room

      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);