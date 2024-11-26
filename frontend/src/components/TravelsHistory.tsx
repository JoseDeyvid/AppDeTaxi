import React, { useEffect, useState } from 'react'
import { Driver, Travel } from '../utils/types'
import axios from 'axios'
import { Ride } from '../utils/types'

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
        <div>
            <div>
                <label htmlFor="">ID do usuário: </label>
                <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
            </div>
            <input type="radio" value="Todos" checked={!driverSelected} onChange={() => changeDriverSelected()} />
            <label htmlFor="">Todos</label>
            {drivers.map((driver) => (
                <>
                    <input type="radio" key={driver.id} value={driver.name} checked={driverSelected === driver.id} onChange={() => changeDriverSelected(driver.id)} />
                    <label htmlFor="">{driver.name}</label>
                </>
            ))}
            {filteredRides.map((ride) => (
                <div>
                    <p>{ride.date.toLocaleString()}</p>
                    <p>{ride.driver.name}</p>
                    <p>{ride.origin.latitude}</p>
                    <p>{ride.origin.longitude}</p>
                    <p>{ride.destination.latitude}</p>
                    <p>{ride.destination.longitude}</p>
                    <p>{ride.distance}</p>
                    <p>{ride.duration}</p>
                    <p>{ride.value}</p>
                </div>
            ))}

        </div>
    )
}

export default TravelsHistory