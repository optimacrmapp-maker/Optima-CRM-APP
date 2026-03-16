import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Importante: Verifique se você tem o arquivo index.css. 
// Se não tiver certeza, deixe a linha abaixo comentada com //
// import './index.css' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
