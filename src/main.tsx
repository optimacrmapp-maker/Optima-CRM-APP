import React from 'react'
import ReactDOM from 'react-dom/client'

// Vamos ignorar o App por um segundo para testar
const TesteRapido = () => (
  <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
    <h1 style={{ color: 'blue' }}>O React está funcionando!</h1>
    <p>Se você está vendo isso, o problema é nas rotas do App.tsx.</p>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TesteRapido />
  </React.StrictMode>,
)
