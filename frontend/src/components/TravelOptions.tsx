import React, { useEffect, useState } from 'react'
import { Coords, Driver, Travel } from '../utils/types'
import axios from 'axios'

import './TravelOptions.css'

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
                const res = await axios.get("http://localhost:8080/ride/map", {
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
        const res = await axios.patch("http://localhost:8080/ride/confirm", {
            "customer_id": customerId,
            "origin": `${travel.origin.latitude}, ${travel.origin.longitude}`,
            "destination": `${travel.destination.latitude}, ${travel.destination.longitude}`,
            "distance": Number(travel.distance.replace("s", "")),
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
        <div className='travelOptionsContainer'>
            {mapUrl ? (
                <>
                    <img src={mapUrl} alt='Rota do mapa' />
                    <h3>Duração estimada: {duration}</h3>
                    <div className='driverOptions'>
                        <h4>Motoristas disponiveis: </h4>
                        {travel.options.map((driver) => (
                            <div key={driver.id} className='driver'>
                                <h5>{driver.name}</h5>
                                <p>Descrição: <span>{driver.description}</span></p>
                                <p>Carro: <span>{driver.vehicle}</span></p>
                                <div className='review'>
                                    <p>Avaliação: <span>{driver.review.rating}/5</span></p>
                                    <p>Comentário: <span>{driver.review.comment}</span></p>
                                </div>
                                <p>Preço da corrida: <span>{driver.value}</span></p>
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