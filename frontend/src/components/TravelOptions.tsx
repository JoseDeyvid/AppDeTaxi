import React, { useEffect, useState } from 'react'
import { Coords, Driver, Travel } from '../utils/types'
import axios from 'axios'

type Props = {
    travel: Travel,
    customerId: number | undefined,
    setHistoryTravels: React.Dispatch<React.SetStateAction<boolean>>
}

const TravelOptions = ({ travel, customerId, setHistoryTravels }: Props) => {
    const [origin] = useState(travel.origin)
    const [destination] = useState(travel.destination)
    const [mapUrl, setMapUrl] = useState('');
    const [duration, setDuration] = useState('');
    useEffect(() => {
        console.log(travel);
        const loadMap = async () => {

            try {
                const res = await axios.get("http://localhost:3333/ride/map", {
                    params: {
                        origin: `${origin.latitude},${origin.longitude}`,
                        destination: `${destination.latitude},${destination.longitude}`
                    }
                })
                setMapUrl(res.data.staticMapURL);
                setDuration(res.data.duration);

            } catch (error) {
                console.log("Ocorreu um erro ao carregar o mapa!")
            }
        }
        loadMap();
    }, [])

    const confirmTravelHandler = async (driver: Driver) => {
        const res = await axios.patch("http://localhost:3333/ride/confirm", {
            "customer_id": customerId,
            "origin": travel.origin,
            "destination": travel.destination,
            "distance": travel.distance,
            "duration": travel.duration,
            "driver": {
                "id": driver.id,
                "name": driver.name
            },
            "value": Number(travel.distance) * driver.value
        })
        setHistoryTravels(true);
    }
    return (
        <div>
            {mapUrl ? (
                <>
                    <h3>Duração estimada: {duration}</h3>
                    <img src={mapUrl} alt='Rota do mapa' />
                    <div>
                        {travel.options.map((driver) => (
                            <div key={driver.id}>
                                <p>{driver.name}</p>
                                <p>{driver.description}</p>
                                <p>{driver.vehicle}</p>
                                <div>
                                    <p>{driver.review.rating}</p>
                                    <p>{driver.review.comment}</p>
                                </div>
                                <p>{driver.value}</p>
                                <button onClick={() => confirmTravelHandler(driver)}>Escolher</button>
                            </div>
                        ))}
                    </div>
                </>

            ) : <p>Carregando mapa...</p>}
        </div>
    )
}

export default TravelOptions