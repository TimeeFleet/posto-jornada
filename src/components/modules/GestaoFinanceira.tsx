import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp,
  AlertCircle
} from "lucide-react";

// Dados fictícios para gráficos financeiros
const fluxoCaixa = [
  { mes: 'Jan', receita: 420000, despesa: 280000, lucro: 140000 },
  { mes: 'Fev', receita: 380000, despesa: 260000, lucro: 120000 },
  { mes: 'Mar', receita: 450000, despesa: 290000, lucro: 160000 },
  { mes: 'Abr', receita: 485000, despesa: 310000, lucro: 175000 },
  { mes: 'Mai', receita: 510000, despesa: 295000, lucro: 215000 },
  { mes: 'Jun', receita: 485320, despesa: 287450, lucro: 197870 },
];

const contasReceber = [
  { cliente: 'Transportes Silva LTDA', valor: 15420, vencimento: '20/08/2025', status: 'pendente' },
  { cliente: 'Logística Express', valor: 8750, vencimento: '22/08/2025', status: 'pendente' },
  { cliente: 'Frota Norte', valor: 12500, vencimento: '25/08/2025', status: 'pendente' },
  { cliente: 'Fast Delivery', valor: 8560, vencimento: '28/08/2025', status: 'pendente' },
  { cliente: 'Rápido Transporte', valor: 18750, vencimento: '15/08/2025', status: 'pago' },
  { cliente: 'Via Express', valor: 12300, vencimento: '10/08/2025', status: 'pago' },
];

const GestaoFinanceira = () => {
  return (
    <div className="space-y-6">
      <Card className="card-portal">
        <CardHeader>
          <CardTitle>Gestão Financeira</CardTitle>
          <CardDescription>Controle financeiro e fluxo de caixa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <CreditCard className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold">Receita Total</h3>
              <p className="text-xl font-bold text-accent">R$ 485.320,00</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <AlertCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold">A Receber</h3>
              <p className="text-xl font-bold text-orange-500">R$ 45.230,00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-portal">
          <CardHeader>
            <CardTitle>Fluxo de Caixa</CardTitle>
            <CardDescription>Receitas nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fluxoCaixa}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="receita" stroke="#90b531" strokeWidth={3} name="Receita" />
            </LineChart>
          </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-portal">
          <CardHeader>
            <CardTitle>Contas a Receber</CardTitle>
            <CardDescription>Valores pendentes de clientes - Somente visualização</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contasReceber.map((conta, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{conta.cliente}</p>
                    <p className="text-sm text-muted-foreground">Vencimento: {conta.vencimento}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-orange-500">R$ {conta.valor.toLocaleString()}</p>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" className="text-xs">
                        Detalhes
                      </Button>
                      {conta.status === 'pago' && (
                        <Button variant="outline" size="sm" className="text-xs">
                          Comprovante
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

        <Card className="card-portal">
          <CardHeader>
            <CardTitle>Comparativo Mensal</CardTitle>
            <CardDescription>Receitas por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fluxoCaixa}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                <Bar dataKey="receita" fill="#90b531" name="Receita" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
    </div>
  );
};

export default GestaoFinanceira;