import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import InitAxios from './plugins/axios.js'

InitAxios()

createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <App />
  </StrictMode>,
)
