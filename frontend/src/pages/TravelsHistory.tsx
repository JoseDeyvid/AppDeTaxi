import React, { useEffect, useState } from 'react'
import { Driver } from '../utils/types'
import axios from 'axios'
import { Ride } from '../utils/types'
import './TravelsHistory.css'
import { toast } from 'react-toastify'
import { showMessageError } from '../utils/errorTypes'

type Props = {

}

const TravelsHistory = ({ }: Props) => {

    const [customerId, setCustomerId] = useState<string>("")
    const [driverSelected, setDriverSelected] = useState<number | null>(null)
    const [rides, setRides] = useState<Ride[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([])

    useEffect(() => {
        const loadDrivers = async () => {
            try {
                const res = await axios.get("http://localhost:8080/ride/drivers")
                setDrivers(res.data)
            } catch (error) {
                toast.error("Não encontramos nenhum motorista cadastrado na base de dados.")
            }
        }

        loadDrivers();

    }, [])

    const searchHandler = async () => {
        if (customerId.trim()) {
            try {
                const res = await axios.get(`http://localhost:8080/ride/${customerId}?driver_id=${driverSelected}`)
                toast.success("Operação realizada com sucesso")
                setRides(res.data.rides);
            } catch (error) {
                showMessageError(error)
                setRides([])
            }
        } else {
            toast.error("Necessário inserir algum id para realizar a busca.")
        }
    }

    const changeDriverSelected = (id: number | null = null) => {
        setDriverSelected(id)

    }

    const formattedDate = (date: Date) => {
        return new Date(date).toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })

        // return formatDate(date)
    }

    const formatDate = (isoString: Date) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    };
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
            <button className="btnSearch" onClick={searchHandler}>Buscar</button>
            {rides.length === 0 ?
                <p className='noOptions'>Nenhuma viagem foi encontrada com os parâmetros passados.</p>
                :
                (
                    <div className="options">
                        {rides.map((ride) => (
                            <div className='option'>
                                <p><span>Data: </span>{formattedDate(ride.date)}</p>
                                <p><span>Motorista: </span>{ride.driver.name}</p>
                                <p><span>Origem: </span>{ride.origin}</p>
                                <p><span>Destino: </span>{ride.destination}</p>
                                <p><span>Distância: </span>{Number((ride.distance / 1000).toFixed(2)).toLocaleString("pt-BR")} KM</p>
                                <p><span>Duração: </span>{ride.duration}</p>
                                <p><span>Valor: </span>{ride.value.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}</p>
                            </div>
                        ))}
                    </div>
                )
            }


        </div>
    )
}

export default TravelsHistory