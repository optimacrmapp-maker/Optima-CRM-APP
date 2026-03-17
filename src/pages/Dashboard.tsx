import React from 'react';

export default function Dashboard() {
  // Estilos em variáveis para garantir o visual sem depender de arquivos externos
  const styles = {
    container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' },
    sidebar: { width: '250px', backgroundColor: '#1e3a8a', color: 'white', padding: '20px' },
    main: { flex: 1, padding: '40px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
    card: { backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' },
    table: { width: '100%', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', borderCollapse: 'collapse' as const },
    th: { backgroundColor: '#f9fafb', padding: '12px', textAlign: 'left' as const, fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' as const, borderBottom: '1px solid #e5e7eb' },
    td: { padding: '15px', borderBottom: '1px solid #f3f4f6', color: '#374151' },
    button: { backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' as const }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>Optima CRM</h1>
        <nav>
          <div style={{ padding: '12px', backgroundColor: '#1e40af', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer' }}>📊 Dashboard</div>
          <div style={{ padding: '12px', color: '#bfdbfe', cursor: 'pointer' }}>👥 Clientes</div>
          <div style={{ padding: '12px', color: '#bfdbfe', cursor: 'pointer' }}>⚙️ Configurações</div>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h2 style={{ fontSize: '28px', color: '#111827', margin: 0 }}>Visão Geral</h2>
          <button style={styles.button}>+ Novo Cliente</button>
        </header>

        {/* Indicadores */}
        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold' }}>TOTAL DE CLIENTES</span>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb', marginTop: '10px' }}>128</div>
          </div>
          <div style={styles.card}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold' }}>VENDAS DO MÊS</span>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#059669', marginTop: '10px' }}>R$ 12.450</div>
          </div>
          <div style={styles.card}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold' }}>PENDÊNCIAS</span>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc2626', marginTop: '10px' }}>5</div>
          </div>
        </div>

        {/* Tabela */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nome do Cliente</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Data de Cadastro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Empresa Exemplo LTDA</td>
                <td style={styles.td}><span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Ativo</span></td>
                <td style={styles.td}>16/03/2026</td>
              </tr>
              <tr>
                <td style={styles.td}>Vinicius Santos</td>
                <td style={styles.td}><span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Prospect</span></td>
                <td style={styles.td}>15/03/2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
