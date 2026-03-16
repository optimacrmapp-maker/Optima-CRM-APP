import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    // O basename DEVE ser o nome do repositório
    <BrowserRouter basename="/Optima-CRM-APP">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Se o usuário digitar qualquer outra coisa, manda para o início */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
