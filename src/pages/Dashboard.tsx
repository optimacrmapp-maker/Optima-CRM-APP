import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Users, Settings, LogOut, Plus } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-blue-900 text-white hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Optima CRM</h1>
        </div>
        <nav className="mt-6">
          <a href="#" className="flex items-center px-6 py-3 bg-blue-800 text-white">
            <LayoutDashboard className="mr-3" size={20} /> Dashboard
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-blue-200 hover:bg-blue-800 hover:text-white">
            <Users className="mr-3" size={20} /> Clientes
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-blue-200 hover:bg-blue-800 hover:text-white">
            <Settings className="mr-3" size={20} /> Configurações
          </a>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Visão Geral</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition">
            <Plus className="mr-2" size={20} /> Novo Cliente
          </button>
        </header>

        {/* Cards de Indicadores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm uppercase font-bold">Total de Clientes</p>
            <p className="text-3xl font-bold text-blue-600">128</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm uppercase font-bold">Vendas do Mês</p>
            <p className="text-3xl font-bold text-green-600">R$ 12.450</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm uppercase font-bold">Pendências</p>
            <p className="text-3xl font-bold text-red-600">5</p>
          </div>
        </div>

        {/* Tabela de Exemplo */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-bold text-gray-700">Últimos Clientes Cadastrados</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4">Nome</th>
                <th className="p-4">Status</th>
                <th className="p-4">Data</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-t border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium">Empresa Exemplo LTDA</td>
                <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Ativo</span></td>
                <td className="p-4">16/03/2026</td>
              </tr>
              <tr className="border-t border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium">Vinicius Santos</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Prospect</span></td>
                <td className="p-4">15/03/2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
