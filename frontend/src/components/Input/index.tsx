import { forwardRef } from "react"


export const Input = forwardRef(({label, register, ...rest}: any, ref) => {
    return(
        <fieldset className="flex flex-col gap-1 py-2">
            <label>{label}</label>
            <input 
                    className="p-1 bg-gray-100 border-0 border-b-2 border-gray-400 outline-0 focus:ring-0"
                    ref={ref} {...register} {...rest}
            />
        </fieldset>
    )
})