import { Room, useUser } from "@/contexts/userContext"
import api from "@/services/api"
import { UserCard } from "../UserCard"

export const ContactList = () => {
    let token = localStorage.getItem("@TokenPlay")

    const { userRooms, user } = useUser()

    let list = userRooms()
    let listOfCards: any[] = []

    list.forEach((userRoom) => {
        if ( userRoom.users.id != user?.id) {
         const item = <UserCard name={userRoom.users.name} date={"date"} />
         listOfCards = [...listOfCards, item]
        }
      })
      console.log(listOfCards)

    return (
        <>
            {listOfCards}
        </>
    )
}