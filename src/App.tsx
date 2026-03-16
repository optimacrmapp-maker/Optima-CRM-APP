import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    // Mudamos de BrowserRouter para HashRouter. 
    // Isso coloca um "#" na URL, mas resolve 99% dos problemas de tela branca no GitHub Pages.
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Se der erro, ele sempre volta para a página inicial */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
