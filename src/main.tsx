import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// REMOVA A LINHA: import './index.css' (se ela estiver aí, o erro continua)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
