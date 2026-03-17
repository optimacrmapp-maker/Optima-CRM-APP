import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState('Ativo');

  // 1. Busca os clientes do banco de dados
  const fetchClientes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClientes(data || []);
    } catch (err) {
      console.error('Erro:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Salva um novo cliente no banco de dados
  const handleAddCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome) return alert('Digite o nome do cliente!');

    const { error } = await supabase
      .from('clientes')
      .insert([{ nome, status }]);

    if (error) {
      alert('Erro ao salvar: ' + error.message);
    } else {
      setNome('');
      fetchClientes(); // Atualiza a lista automaticamente
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const styles = {
    container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' },
    sidebar: { width: '260px', backgroundColor: '#1e3a8a', color: 'white', padding: '25px' },
    main: { flex: 1, padding: '40px' },
    card: { backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '30px' },
    input: { padding: '10px', borderRadius: '6px', border: '1px solid #ddd', marginRight: '10px', width: '200px' },
    select: { padding: '10px', borderRadius: '6px', border: '1px solid #ddd', marginRight: '10px' },
    btn: { backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h1 style={{ fontSize: '22px', marginBottom: '40px' }}>⭐ Hub Optima</h1>
        <div style={{ padding: '12px', backgroundColor: '#1d4ed8', borderRadius: '8px' }}>📊 Dashboard</div>
      </aside>

      <main style={styles.main}>
        <h2 style={{ fontSize: '28px', color: '#111827', marginBottom: '20px' }}>Visão Geral</h2>

        {/* Formulário para Adicionar */}
        <div style={styles.card}>
          <h3 style={{ marginTop: 0 }}>➕ Novo Cliente</h3>
          <form onSubmit={handleAddCliente}>
            <input 
              style={styles.input} 
              placeholder="Nome da Empresa" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
            />
            <select style={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Ativo">Ativo</option>
              <option value="Pendente">Pendente</option>
              <option value="Cancelado">Cancelado</option>
            </select>
            <button type="submit" style={styles.btn}>Salvar no Banco</button>
          </form>
        </div>

        {/* Lista de Clientes */}
        <div style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>👥 Seus Clientes ({clientes.length})</h3>
            <button onClick={fetchClientes} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer' }}>🔄 Atualizar</button>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '12px' }}>Nome</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={2} style={{ padding: '20px', textAlign: 'center' }}>Carregando...</td></tr>
              ) : clientes.length > 0 ? (
                clientes.map((c: any) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px' }}>{c.nome}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px',
                        backgroundColor: c.status === 'Ativo' ? '#dcfce7' : '#fee2e2',
                        color: c.status === 'Ativo' ? '#166534' : '#991b1b'
                      }}>{c.status}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={2} style={{ padding: '30px', textAlign: 'center', color: '#666' }}>Nenhum cliente cadastrado no Supabase.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
