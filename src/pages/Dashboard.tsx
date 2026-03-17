import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  // FUNÇÃO PARA BUSCAR DADOS REAIS DO SUPABASE
  const fetchClientes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clientes') // Certifique-se que o nome da tabela no Supabase é 'clientes'
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setClientes(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // Estilos (Mantendo o que funcionou na sua tela)
  const styles = {
    container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' },
    sidebar: { width: '250px', backgroundColor: '#1e3a8a', color: 'white', padding: '20px' },
    main: { flex: 1, padding: '40px' },
    card: { backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' },
    button: { backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' as const }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Optima CRM</h1>
        <nav style={{ marginTop: '20px' }}>
          <div style={{ padding: '10px', backgroundColor: '#1e40af', borderRadius: '8px' }}>📊 Dashboard</div>
        </nav>
      </aside>

      <main style={styles.main}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h2 style={{ margin: 0 }}>Visão Geral</h2>
          <button style={styles.button} onClick={() => alert('Abrir modal de cadastro...')}>
            + Novo Cliente
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={styles.card}>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>TOTAL DE CLIENTES</span>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{clientes.length}</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Nome</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={2} style={{ padding: '20px', textAlign: 'center' }}>Carregando dados...</td></tr>
              ) : clientes.length > 0 ? (
                clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{cliente.nome}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{cliente.status}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={2} style={{ padding: '20px', textAlign: 'center' }}>Nenhum cliente encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
