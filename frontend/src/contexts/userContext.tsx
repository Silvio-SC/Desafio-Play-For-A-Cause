import { RegisterData } from "@/app/Register/registerSchema";
import api from "@/services/api";
import { tree } from "next/dist/build/templates/app-page";
import { ReactNode, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

interface UserProviderData {
    createUser: (data: RegisterData) => void
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export const UserProvider = ({ children }: Props) => {

  const [loading, setLoading] = useState<boolean>(false);

  const createUser = (data: RegisterData) => {
    setLoading(true)
      try {
        console.log(data)
        api.post("/users", data)

      } catch (error) {
          console.log(error)
      }
      setLoading(false)
  }

  return (
    <UserContext.Provider value={{
      createUser, loading, setLoading
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);