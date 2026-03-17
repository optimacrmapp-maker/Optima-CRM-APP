import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Users, BarChart3, Plus, RefreshCcw, Search } from 'lucide-react';

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');

  const fetchClientes = async () => {
    setLoading(true);
    const { data } = await supabase.from('clientes').select('*').order('created_at', { ascending: false });
    if (data) setClientes(data);
    setLoading(false);
  };

  useEffect(() => { fetchClientes(); }, []);

  const styles = {
    sidebar: { width: '260px', backgroundColor: '#0f172a', color: '#f8fafc', padding: '24px', display: 'flex', flexDirection: 'column' as const },
    card: { bg: 'white', p: '24px', radius: '16px', shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
    statusBadge: (status: string) => ({
      padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
      backgroundColor: status === 'Ativo' ? '#dcfce7' : '#fef3c7',
      color: status === 'Ativo' ? '#166534' : '#92400e'
    })
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar Profissional */}
      <aside style={styles.sidebar}>
        <div style={{ fontSize: '22px', fontWeight: '800', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#3b82f6', borderRadius: '8px' }}></div>
          Optima CRM
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#1e293b', borderRadius: '12px', cursor: 'pointer' }}>
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#94a3b8', cursor: 'pointer' }}>
            <Users size={20} /> Clientes
          </div>
        </nav>
      </aside>

      {/* Área Principal */}
      <main style={{ flex: 1, padding: '40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Dashboard de Vendas</h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Bem-vindo de volta, aqui estão seus números.</p>
          </div>
          <button style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} /> Novo Cliente
          </button>
        </header>

        {/* Cards de Resumo */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
          <div style={{ ...styles.card, background: 'white', padding: '24px', borderRadius: '16px', boxShadow: styles.card.shadow }}>
            <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>TOTAL DE CLIENTES</span>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b', marginTop: '8px' }}>{clientes.length}</div>
          </div>
          <div style={{ ...styles.card, background: 'white', padding: '24px', borderRadius: '16px', boxShadow: styles.card.shadow }}>
            <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>RECEITA ESTIMADA</span>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', marginTop: '8px' }}>R$ 45.200</div>
          </div>
        </div>

        {/* Tabela de Clientes Real */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: styles.card.shadow, overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, color: '#1e293b' }}>Clientes Recentes</h3>
            <RefreshCcw size={18} color="#64748b" style={{ cursor: 'pointer' }} onClick={fetchClientes} />
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', backgroundColor: '#f8fafc', color: '#64748b', fontSize: '13px' }}>
                <th style={{ padding: '16px 24px' }}>NOME</th>
                <th style={{ padding: '16px 24px' }}>STATUS</th>
                <th style={{ padding: '16px 24px' }}>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c: any) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontWeight: '500' }}>{c.nome}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={styles.statusBadge(c.status)}>{c.status}</span>
                  </td>
                  <td style={{ padding: '16px 24px', color: '#3b82f6', cursor: 'pointer', fontSize: '14px' }}>Ver detalhes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
