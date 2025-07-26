import { useEffect, useState } from 'react';

export default function Historico() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await fetch('/api/usuario', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', usuario: JSON.stringify({ cpf: localStorage.getItem('cpf') }) },
        });
        const data = await response.json();
        if (data.historico) setHistorico(data.historico);
      } catch (err) {
        console.error('Erro ao carregar histórico', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Histórico de Operações</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : historico.length === 0 ? (
        <p className="text-gray-600">Nenhuma operação registrada.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Data</th>
              <th className="border border-gray-300 p-2">Tipo</th>
              <th className="border border-gray-300 p-2">Valor</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">{item.data}</td>
                <td className="border border-gray-300 p-2 capitalize">{item.tipo}</td>
                <td className={\`border border-gray-300 p-2 \${item.valor < 0 ? 'text-red-600' : 'text-green-600'}\`}>
                  R$ {item.valor.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}