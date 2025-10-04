import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1 className='font-bold'>Commuter Weather App</h1>
  </StrictMode>,
)
