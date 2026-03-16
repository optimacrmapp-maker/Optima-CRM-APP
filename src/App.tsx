import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Rota Principal */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Rota de Redefinição de Senha */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Se o link estiver errado, ele sempre volta para o início */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
