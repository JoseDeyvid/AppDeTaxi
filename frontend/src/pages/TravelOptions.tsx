import React, { useEffect, useState } from 'react'
import { Coords, Driver, Travel } from '../utils/types'
import axios from 'axios'

import './TravelOptions.css'
import { toast } from 'react-toastify'
import { showMessageError } from '../utils/errorTypes'

type Props = {
    travel: Travel,
    customerId: string
    setHistoryTravels: React.Dispatch<React.SetStateAction<boolean>>
}

const TravelOptions = ({ travel, customerId, setHistoryTravels }: Props) => {
    const [origin] = useState(travel.origin)
    const [destination] = useState(travel.destination)
    const [mapUrl, setMapUrl] = useState('');
    const [duration, setDuration] = useState('');
    const [distance, setDistance] = useState('');
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
                setDistance(res.data.distance);

            } catch (error) {
                toast.error("Infelizmente não foi possível carregar todas as informações do mapa!")
            }
        }
        loadMap();
    }, [])

    const confirmTravelHandler = async (driver: Driver) => {
        try {
            const res = await axios.patch("http://localhost:8080/ride/confirm", {
                "customer_id": customerId,
                "origin": `${travel.origin.latitude}, ${travel.origin.longitude}`,
                "destination": `${travel.destination.latitude}, ${travel.destination.longitude}`,
                "distance": travel.distance,
                "duration": travel.duration,
                "driver": {
                    "id": driver.id,
                    "name": driver.name
                },
                "value": driver.value
            })
            toast.success("Operação realizada com sucesso");
            setHistoryTravels(true);
        } catch (error) {
            showMessageError(error);
        }
    }
    return (
        <div className='travelOptionsContainer'>
            {mapUrl ? (
                <>
                    <img src={mapUrl} alt='Rota do mapa' />
                    <h3>Duração estimada: {duration}</h3>
                    <h3>Distância: {distance}</h3>
                    {travel.options.length === 0 ?
                        <p className='noOptions'>Não há motoristas disponíveis para essa viagem</p>
                        : (
                            <div className='options'>
                                <h4>Motoristas disponiveis: </h4>
                                {travel.options.map((driver) => (
                                    <div key={driver.id} className='option'>
                                        <h5>{driver.name}</h5>
                                        <p>Descrição: <span>{driver.description}</span></p>
                                        <p>Carro: <span>{driver.vehicle}</span></p>
                                        <div className='review'>
                                            <p>Avaliação: <span>{driver.review.rating}/5</span></p>
                                            <p>Comentário: <span>{driver.review.comment}</span></p>
                                        </div>
                                        <p>Preço da corrida: <span>{driver.value.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL"
                                        })}</span></p>
                                        <button onClick={() => confirmTravelHandler(driver)}>Escolher</button>
                                    </div>
                                ))}
                            </div>
                        )}

                </>

            ) : <p>Carregando mapa...</p>}
        </div>
    )
}

export default TravelOptions