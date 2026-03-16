import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    // O basename garante que o React entenda que o site começa após /Optima-CRM-APP/
    <BrowserRouter basename="/Optima-CRM-APP">
      <Routes>
        {/* Rota principal */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Rota de Recuperação */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* CATCH-ALL: Se o caminho for estranho, volta para o início */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
