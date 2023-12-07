import { Room } from "@/contexts/userContext"
import { UserCard } from "./UserCard"
import { useRouter } from "next/navigation"

export const ContactList = ({userRooms, user}: any) => {
    const router = useRouter()

    const goToChat = (id:string) => {
        router.push(`/Chat?room=${id}`)
    }

    let listOfCards: any[] = []

    for (let i = 0; i < userRooms.length; i++) {
        const Room = userRooms[i];
        const textsL = Room.texts.length
        for (let j = 0; j < Room.users.length; j++) {
            const userRoom = Room.users[j];
            if ( userRoom.users.email !== user?.email) {
                const item = (
                    <button onClick={() => goToChat(Room.id)}>
                        <UserCard 
                            name={userRoom.users.name}
                            text={textsL ? Room.texts[textsL - 1].text : ''}
                            date={textsL ? Room.texts[textsL - 1].createdAt : ''} 
                        />
                    </button>
                )
                listOfCards = [...listOfCards, item]
            }
        }
    }

    console.log(userRooms)
    return (
        <>
            {listOfCards}
        </>
    )
}