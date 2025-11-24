import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import NewAppointment from './pages/NewAppointment';
import AgentDashboard from './pages/AgentDashboard';

import './index.css'; // Assuming Tailwind directives are here or handled by CDN in html

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agendar" element={<NewAppointment />} />
            <Route path="/agente" element={<AgentDashboard />} />
            <Route path="/pessoal" element={<div className="p-10 text-center text-gray-500">Página de Banco de Pessoal (Em construção)</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);