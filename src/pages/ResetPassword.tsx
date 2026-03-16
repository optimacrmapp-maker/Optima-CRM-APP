import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMessage('Erro: ' + error.message);
    else setMessage('Senha atualizada com sucesso!');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleReset} className="p-8 bg-white rounded shadow-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Nova Senha</h2>
        <input 
          type="password" 
          className="border p-2 w-full mb-4 rounded" 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Digite a nova senha"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
          Atualizar Senha
        </button>
        {message && <p className="mt-4 text-sm text-center text-blue-600">{message}</p>}
      </form>
    </div>
  );
}
