import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Users, Plus, RefreshCcw, Trash2, Save, X } from 'lucide-react';

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Estados para o novo cliente
  const [novoNome, setNovoNome] = useState('');
  const [novoStatus, setNovoStatus] = useState('Ativo');

  // 1. BUSCAR CLIENTES (READ)
  const fetchClientes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Erro ao buscar:', error);
    else setClientes(data || []);
    setLoading(false);
  };

  // 2. SALVAR CLIENTE (CREATE)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome) return alert("Digite o nome!");

    const { error } = await supabase
      .from('clientes')
      .insert([{ nome: novoNome, status: novoStatus }]);

    if (error) {
      alert("Erro ao salvar: " + error.message);
    } else {
      setNovoNome('');
      setShowModal(false);
      fetchClientes(); // Atualiza a lista na hora
    }
  };

  // 3. DELETAR CLIENTE (DELETE) - Funcionalidade extra para mostrar ao cliente
  const handleDelete = async (id: string) => {
    if (confirm("Deseja excluir este cliente?")) {
      await supabase.from('clientes').delete().eq('id', id);
      fetchClientes();
    }
  };

  useEffect(() => { fetchClientes(); }, []);

  // ESTILOS DIRETOS (Para garantir que o visual não quebre)
  const s = {
    overlay: { position: 'fixed' as const, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modal: { backgroundColor: 'white', padding: '30px', borderRadius: '16px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
    input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' },
    btnPrimary: { backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' as const, display: 'flex', alignItems: 'center', gap: '8px' }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: '260px', backgroundColor: '#1e293b', color: 'white', padding: '25px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '40px', color: '#3b82f6' }}>Optima CRM</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: '#334155', borderRadius: '10px' }}>
          <LayoutDashboard size={20} /> Dashboard
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main style={{ flex: 1, padding: '40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ margin: 0, color: '#0f172a' }}>Painel de Controle</h1>
          <button style={s.btnPrimary} onClick={() => setShowModal(true)}>
            <Plus size={20} /> Novo Cliente
          </button>
        </header>

        {/* CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <span style={{ color: '#64748b', fontWeight: 'bold', fontSize: '13px' }}>TOTAL DE CLIENTES</span>
            <div style={{ fontSize: '35px', fontWeight: 'bold', color: '#1e293b' }}>{clientes.length}</div>
          </div>
        </div>

        {/* TABELA FUNCIONAL */}
        <div style={{ backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f8fafc', color: '#64748b' }}>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left' }}>CLIENTE</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>STATUS</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} style={{ textAlign: 'center', padding: '40px' }}>Conectando ao Supabase...</td></tr>
              ) : clientes.map((c: any) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '15px', fontWeight: '500' }}>{c.nome}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '12px', backgroundColor: c.status === 'Ativo' ? '#dcfce7' : '#fee2e2', color: c.status === 'Ativo' ? '#166534' : '#991b1b' }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <Trash2 size={18} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => handleDelete(c.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL DE CADASTRO (A FUNCIONALIDADE QUE O CLIENTE QUER VER) */}
      {showModal && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Cadastrar Cliente</h3>
              <X style={{ cursor: 'pointer' }} onClick={() => setShowModal(false)} />
            </div>
            <form onSubmit={handleSave}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Nome da Empresa</label>
              <input style={s.input} value={novoNome} onChange={e => setNovoNome(e.target.value)} placeholder="Ex: Google" />
              
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Status Inicial</label>
              <select style={s.input} value={novoStatus} onChange={e => setNovoStatus(e.target.value)}>
                <option value="Ativo">Ativo</option>
                <option value="Pendente">Pendente</option>
              </select>

              <button type="submit" style={{ ...s.btnPrimary, width: '100%', justifyContent: 'center' }}>
                <Save size={20} /> Salvar no Sistema
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
