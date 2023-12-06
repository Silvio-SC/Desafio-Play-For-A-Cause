import { forwardRef } from "react"


export const Input = forwardRef(({label, register, error, ...rest}: any, ref) => {
    return(
        <fieldset className="flex flex-col gap-1 py-2">
            <label>{label}</label>
            <input 
                    className="p-1 bg-gray-100 border-0 border-b-2 border-gray-400 outline-0 focus:ring-0 focus:border-emerald-700"
                    ref={ref} {...register} {...rest}
            />
            {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
        </fieldset>
    )
})