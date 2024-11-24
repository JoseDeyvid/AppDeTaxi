import React, { FormEvent, useState } from 'react'
import axios from 'axios'
import { Travel } from '../utils/types'

type Props = {
    setTravel: React.Dispatch<React.SetStateAction<Travel | undefined>>,
    customerId: number | undefined,
    setCustomerId: React.Dispatch<React.SetStateAction<number | undefined>>
}

const TravelRequest = ({ setTravel, customerId, setCustomerId }: Props) => {
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')

    const calculateHandler = async (e: FormEvent) => {
        e.preventDefault()
        await axios.post("http://localhost:3333/ride/estimate", {
            customer_id: customerId,
            origin,
            destination,
        }).then((res) => {
            setTravel(res.data);
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <form onSubmit={(e) => calculateHandler(e)}>
            <div>
                <label htmlFor="">ID: </label>
                <input type="text" value={customerId} onChange={(e) => setCustomerId(Number(e.target.value))} />
            </div>
            <div>
                <label htmlFor="">Origem: </label>
                <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">Destino: </label>
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
            </div>
            <button type='submit'>Calcular viagem</button>
        </form>
    )
}

export default TravelRequest