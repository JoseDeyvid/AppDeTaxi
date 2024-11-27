import React, { FormEvent, useState } from 'react'
import axios from 'axios'
import { Travel } from '../utils/types'
import { toast } from 'react-toastify'

import './TravelRequest.css'
import { showMessageError } from '../utils/errorTypes'

type Props = {
    setTravel: React.Dispatch<React.SetStateAction<Travel | undefined>>,
    customerId: string,
    setCustomerId: React.Dispatch<React.SetStateAction<string>>
}

const TravelRequest = ({ setTravel, customerId, setCustomerId }: Props) => {
    const [origin, setOrigin] = useState<string>('')
    const [destination, setDestination] = useState<string>('')

    const calculateHandler = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8080/ride/estimate", {
                customer_id: customerId,
                origin,
                destination,
            })
            console.log("Response Body: ", res.data);
            toast.success("Operação realizada com sucesso");
            setTravel(res.data);
        } catch (error) {
            showMessageError(error);
        }

    }

    return (
        <form onSubmit={(e) => calculateHandler(e)}>
            <div className='formControl'>
                <label htmlFor="">ID</label>
                <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder='Informe o id do usuário' />
            </div>
            <div className='formControl'>
                <label htmlFor="">Origem</label>
                <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder='Informe o ponto de partida' />
            </div>
            <div className='formControl'>
                <label htmlFor="">Destino</label>
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder='Informe o ponto de chegada' />
            </div>
            <button type='submit'>Calcular viagem</button>
        </form>
    )
}

export default TravelRequest