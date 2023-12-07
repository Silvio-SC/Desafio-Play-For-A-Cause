
export const UserCard = ({name, text ,date}: {name: string, text:string, date: string | undefined}) => {

    return (
        <div className="flex gap-2 p-3 items-center justify-start hover:bg-gray-100 border-0 border-b-2 border-gray-200  max-w-md w-full">
            <span className="rounded-full p-8 bg-emerald-500 text-white text-xl sm:text-3xl font-bold w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                {name[0]}
            </span> 
            <div className="flex flex-col justify-between">
                <h3 className="sm:text-2xl font-semibold">{name}</h3>
                <p>{text ? text : '.'}</p>
            </div>   
            <span className="py-2">{date ? date : null}</span>
        </div>
    )
}