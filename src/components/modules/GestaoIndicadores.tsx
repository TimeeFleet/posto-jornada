import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users,
  TrendingUp,
  FileText,
  FileSpreadsheet
} from "lucide-react";

// Dados fictícios para os gráficos
const vendasMensais = [
  { mes: 'Jan', vendas: 420000, litros: 85000, diesel: 45000, gasolina: 30000, etanol: 10000 },
  { mes: 'Fev', vendas: 380000, litros: 78000, diesel: 42000, gasolina: 26000, etanol: 10000 },
  { mes: 'Mar', vendas: 450000, litros: 92000, diesel: 50000, gasolina: 32000, etanol: 10000 },
  { mes: 'Abr', vendas: 485000, litros: 98000, diesel: 52000, gasolina: 34000, etanol: 12000 },
  { mes: 'Mai', vendas: 510000, litros: 102000, diesel: 55000, gasolina: 35000, etanol: 12000 },
  { mes: 'Jun', vendas: 485320, litros: 98500, diesel: 53000, gasolina: 33500, etanol: 12000 },
];

const combustivelData = [
  { name: 'Gasolina', value: 45, color: '#90b531' },
  { name: 'Diesel', value: 35, color: '#303762' },
  { name: 'Etanol', value: 20, color: '#d9ddec' },
];

const clientes = [
  "Todos os Clientes",
  "Transportadora ABC",
  "Logística XYZ",
  "Frota Beta",
  "Expresso Delta",
  "Transporte Omega"
];

const GestaoIndicadores = () => {
  const [filtroVolume, setFiltroVolume] = useState("total");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState("Todos os Clientes");

  const getVolumeDataKey = () => {
    switch (filtroVolume) {
      case "diesel": return "diesel";
      case "gasolina": return "gasolina";
      case "etanol": return "etanol";
      default: return "litros";
    }
  };

  const getVolumeLabel = () => {
    switch (filtroVolume) {
      case "diesel": return "Diesel";
      case "gasolina": return "Gasolina";
      case "etanol": return "Etanol";
      default: return "Total";
    }
  };
  return (
    <div className="space-y-6">
      <Card className="card-portal">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Gestão de Indicadores e Resultados</CardTitle>
              <CardDescription>Acompanhe os principais indicadores de performance</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="w-4 h-4" />
                Exportar PDF
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                Exportar Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="data-inicio">Data Início</Label>
              <Input
                id="data-inicio"
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="data-fim">Data Fim</Label>
              <Input
                id="data-fim"
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Select value={clienteSelecionado} onValueChange={setClienteSelecionado}>
                <SelectTrigger id="cliente">
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente} value={cliente}>
                      {cliente}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-portal">
        <CardHeader>
          <CardTitle>Indicadores Principais</CardTitle>
          <CardDescription>Resumo do período selecionado</CardDescription>
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Volume em Litros</CardTitle>
              <CardDescription>Quantidade de combustível vendida mensalmente</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="filtro-volume">Filtrar por:</Label>
              <Select value={filtroVolume} onValueChange={setFiltroVolume}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filtro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="total">Total</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="gasolina">Gasolina</SelectItem>
                  <SelectItem value="etanol">Etanol</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendasMensais}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value.toLocaleString()} L`, getVolumeLabel()]} />
              <Bar dataKey={getVolumeDataKey()} fill="#303762" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GestaoIndicadores;