import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory';

export default function Mestre() {
  const [dados, setDados] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [metaDia, setMetaDia] = useState(0);
  const [metaSemana, setMetaSemana] = useState(0);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const res = await fetch('/api/mestre');
      const data = await res.json();
      if (res.ok) {
        setSaldo(data.saldo || 0);
        setMetaDia(data.metaDia || 0);
        setMetaSemana(data.metaSemana || 0);
        setDados(data.historicoMetas || []);
      } else {
        setMensagem(data.erro || 'Erro ao carregar dados do mestre.');
      }
    } catch (err) {
      console.error(err);
      setMensagem('Erro ao conectar com o servidor.');
    }
  }

  return (
    <div>
      <Header />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Painel Mestre</h1>
        {mensagem && <p className="text-center text-red-600 mb-4">{mensagem}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 text-white p-4 rounded shadow text-center">
            <h2 className="text-lg">Saldo Total</h2>
            <p className="text-2xl font-bold">R$ {saldo.toFixed(2)}</p>
          </div>
          <div className="bg-green-700 text-white p-4 rounded shadow text-center">
            <h2 className="text-lg">Meta do Dia</h2>
            <p className="text-2xl font-bold">R$ {metaDia.toFixed(2)}</p>
          </div>
          <div className="bg-blue-700 text-white p-4 rounded shadow text-center">
            <h2 className="text-lg">Meta da Semana</h2>
            <p className="text-2xl font-bold">R$ {metaSemana.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold text-center mb-4">Metas Batidas (Últimos 7 dias)</h2>
          {dados.length > 0 ? (
            <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
              <VictoryAxis
                tickFormat={(t) => t}
                style={{ tickLabels: { fontSize: 10, angle: -30, padding: 15 } }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => `R$${x}`}
                style={{ tickLabels: { fontSize: 10 } }}
              />
              <VictoryLine
                data={dados}
                x="dia"
                y="valor"
                style={{ data: { stroke: "#4f46e5", strokeWidth: 3 }, labels: { fontSize: 10 } }}
                labels={({ datum }) => `R$${datum.valor}`}
                labelComponent={<VictoryLabel dy={-10} />}
              />
            </VictoryChart>
          ) : (
            <p className="text-center text-gray-500">Nenhum dado disponível.</p>
          )}
        </div>
      </div>
    </div>
  );
}