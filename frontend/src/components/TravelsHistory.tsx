import React, { useEffect, useState } from 'react'
import { Driver, Travel } from '../utils/types'
import axios from 'axios'
import { Ride } from '../utils/types'
import './TravelsHistory.css'

type Props = {

}

const TravelsHistory = ({ }: Props) => {

    const [customerId, setCustomerId] = useState<string>("1")
    const [driverSelected, setDriverSelected] = useState<number | null>(null)
    const [rides, setRides] = useState<Ride[]>([]);
    const filteredRides = rides.filter((ride) => driverSelected ? ride.driver.id === driverSelected : true);
    const [drivers, setDrivers] = useState([
        { "id": 1, "name": "Homer" },
        { "id": 2, "name": "Dominic" },
        { "id": 3, "name": "James" }

    ])

    useEffect(() => {
        const loadRides = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/ride/${customerId}`)
                setRides(res.data.rides);
            } catch (error) {

            }

        }
        loadRides();
    }, [customerId])

    const changeDriverSelected = (id?: number) => {
        if (id) {
            setDriverSelected(id)
        } else {
            setDriverSelected(null)
        }
    }
    return (
        <div className='travelsHistoryContainer'>
            <div className='formControl'>
                <label htmlFor="">ID</label>
                <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder='Informe o id do usuário' />
            </div>
            <div className="filters">
                <input type="radio" value="Todos" checked={!driverSelected} />
                <label className={`${!driverSelected ? "selected" : ""}`} onClick={() => changeDriverSelected()}>Todos</label>
                {drivers.map((driver) => (
                    <>
                        <input type="radio" key={driver.id} value={driver.name} checked={driverSelected === driver.id} onChange={() => changeDriverSelected(driver.id)} />
                        <label className={`${driverSelected === driver.id ? "selected" : ""}`} onClick={() => changeDriverSelected(driver.id)}>{driver.name}</label>
                    </>
                ))}
            </div>
            <div className="driverOptions">
                {filteredRides.map((ride) => (
                    <div className='driver'>
                        <p><span>Data: </span>{ride.date.toLocaleString()}</p>
                        <p><span>Motorista: </span>{ride.driver.name}</p>
                        <p><span>Origem: </span>{ride.origin}</p>
                        {/* <p>{ride.origin.longitude}</p> */}
                        <p><span>Destino: </span>{ride.destination}</p>
                        {/* <p>{ride.destination.longitude}</p> */}
                        <p><span>Distância: </span>{ride.distance}</p>
                        <p><span>Duração: </span>{ride.duration}</p>
                        <p><span>Valor: </span>{ride.value} R$</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TravelsHistory