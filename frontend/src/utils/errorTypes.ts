import axios from "axios"
import { toast } from "react-toastify"


type ErrorData = {
    error_code: string,
    error_description: string
}

function showGenericError() {
    return "Ocorreu um erro desconhecido."
}

export function showMessageError(error: unknown) {
    
    if (axios.isAxiosError(error)) {
        
        const errorData = error.response?.data as ErrorData
        if (errorData) {
            console.log(error)
            toast.error(errorData.error_description)
        } else {
            toast.error(error.message)
        }
    } else {
        toast.error(showGenericError())
    }
}