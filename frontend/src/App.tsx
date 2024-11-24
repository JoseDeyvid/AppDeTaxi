import { useState } from 'react'
import './App.css'
import TravelRequest from './components/TravelRequest'
import { Travel } from './utils/types'
import TravelOptions from './components/TravelOptions';

function App() {

  const [travel, setTravel] = useState<Travel>();

  return (
    <div>
      {!!travel ? <TravelOptions travel={travel} /> : <TravelRequest setTravel={setTravel} />}

    </div>
  )
}

export default App
