export default function Dashboard() {
  // Se houver algum "if (!session) return null", mude para:
  // if (!session) return <div style={{padding: '20px'}}>Por favor, faça login no Supabase.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bem-vindo ao Optima CRM</h1>
      {/* O resto do seu código de gráficos/tabelas aqui */}
    </div>
  );
}
