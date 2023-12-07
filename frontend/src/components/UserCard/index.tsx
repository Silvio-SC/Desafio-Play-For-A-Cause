
export const UserCard = (name: string, date: string | undefined) => {

    const letter = name[0]
    return(
        <div className="flex gap-2 py-2 items-center justify-evenly bg-gray-100 hover:bg-gray-200 rounded-3xl max-w-md">
            <span className="rounded-full p-8 bg-emerald-500 text-white text-xl sm:text-3xl font-bold w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                {letter}
            </span>    
            <h3 className="sm:text-2xl font-semibold">{name}</h3>
            <span className="py-2">{date ? date : null}</span>
        </div>
    )
}