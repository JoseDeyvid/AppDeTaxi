import { useState } from 'react'
import './App.css'
import TravelRequest from './components/TravelRequest'
import { Travel } from './utils/types'
import TravelOptions from './components/TravelOptions';
import TravelsHistory from './components/TravelsHistory';

function App() {

  const [travel, setTravel] = useState<Travel>();
  const [customerId, setCustomerId] = useState<number | undefined>()
  const [historyTravels, setHistoryTravels] = useState(false)

  return (
    <div className='container'>
      <h1 className='title'>Taxi App</h1>
      {!!!travel && !historyTravels && <TravelRequest setTravel={setTravel} customerId={customerId} setCustomerId={setCustomerId} />}
      {!!travel && !historyTravels && <TravelOptions travel={travel} customerId={customerId} setHistoryTravels={setHistoryTravels} />}
      {historyTravels && <TravelsHistory />}

    </div>
  )
}

export default App
