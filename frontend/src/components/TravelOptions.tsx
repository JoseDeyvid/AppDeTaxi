import React, { useEffect, useState } from 'react'
import { Coords, Travel } from '../utils/types'
import axios from 'axios'

type Props = {
    travel: Travel
}

const TravelOptions = ({ travel }: Props) => {
    // const [encodedPolyline] = useState<string>(travel.routeResponse.routes[0].legs[0].polyline.encodedPolyline);
    const [origin] = useState(travel.origin)
    const [destination] = useState(travel.destination)
    const [mapUrl, setMapUrl] = useState('');
    const [duration, setDuration] = useState('');
    useEffect(() => {
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
    return (
        <div>
            {mapUrl ? (
                <>
                    <h3>{duration}</h3>
                    <img src={mapUrl} alt='Rota do mapa' />
                </>

            ) : <p>Carregando mapa...</p>}
        </div>
    )
}

export default TravelOptions