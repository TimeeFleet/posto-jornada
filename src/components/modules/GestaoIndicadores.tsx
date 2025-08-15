import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { 
  BarChart3, 
  Users,
  TrendingUp
} from "lucide-react";

// Dados fictícios para os gráficos
const vendasMensais = [
  { mes: 'Jan', vendas: 420000, litros: 85000 },
  { mes: 'Fev', vendas: 380000, litros: 78000 },
  { mes: 'Mar', vendas: 450000, litros: 92000 },
  { mes: 'Abr', vendas: 485000, litros: 98000 },
  { mes: 'Mai', vendas: 510000, litros: 102000 },
  { mes: 'Jun', vendas: 485320, litros: 98500 },
];

const combustivelData = [
  { name: 'Gasolina', value: 45, color: '#90b531' },
  { name: 'Diesel', value: 35, color: '#303762' },
  { name: 'Etanol', value: 20, color: '#d9ddec' },
];

const GestaoIndicadores = () => {
  return (
    <div className="space-y-6">
      <Card className="card-portal">
        <CardHeader>
          <CardTitle>Gestão de Indicadores e Resultados</CardTitle>
          <CardDescription>Acompanhe os principais indicadores de performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-accent mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Volume de Vendas</h3>
              <p className="text-2xl font-bold text-accent">R$ 485.320,00</p>
              <p className="text-sm text-muted-foreground">Este mês</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-accent mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Clientes Atendidos</h3>
              <p className="text-2xl font-bold text-accent">2.847</p>
              <p className="text-sm text-muted-foreground">Este mês</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-accent mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Crescimento</h3>
              <p className="text-2xl font-bold text-accent">+12.5%</p>
              <p className="text-sm text-muted-foreground">vs mês anterior</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-portal">
          <CardHeader>
            <CardTitle>Evolução de Vendas</CardTitle>
            <CardDescription>Receita mensal nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={vendasMensais}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Vendas']} />
                <Line type="monotone" dataKey="vendas" stroke="#90b531" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-portal">
          <CardHeader>
            <CardTitle>Distribuição por Combustível</CardTitle>
            <CardDescription>Participação no volume total</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={combustivelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {combustivelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="card-portal">
        <CardHeader>
          <CardTitle>Volume em Litros</CardTitle>
          <CardDescription>Quantidade de combustível vendida mensalmente</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendasMensais}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value.toLocaleString()} L`, 'Litros']} />
              <Bar dataKey="litros" fill="#303762" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GestaoIndicadores;