import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    // O basename avisa ao React que o site roda dentro desta subpasta
    <BrowserRouter basename="/Optima-CRM-APP">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
