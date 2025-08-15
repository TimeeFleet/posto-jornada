import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  Users,
  CreditCard,
  Target,
  Calendar
} from "lucide-react";

const GestaoIndicadores = () => {
  const indicadoresVendas = [
    { titulo: "Vendas Hoje", valor: "R$ 45.650", variacao: "+12%", trend: "up" },
    { titulo: "Volume (Litros)", valor: "8.450 L", variacao: "+8%", trend: "up" },
    { titulo: "Ticket Médio", valor: "R$ 185", variacao: "-3%", trend: "down" },
    { titulo: "Clientes Atendidos", valor: "247", variacao: "+15%", trend: "up" }
  ];

  const indicadoresOperacionais = [
    { titulo: "Tempo Médio Atendimento", valor: "4:30 min", meta: "< 5 min", status: "ok" },
    { titulo: "Bombas Ativas", valor: "8/10", meta: "80%", status: "ok" },
    { titulo: "Eficiência Operacional", valor: "94%", meta: "> 90%", status: "ok" },
    { titulo: "Satisfação Cliente", valor: "4.8/5", meta: "> 4.5", status: "excellent" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-100 text-green-800";
      case "ok": return "bg-blue-100 text-blue-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Gestão de Indicadores e Resultados</h2>
        <p className="text-muted-foreground">Acompanhe os principais indicadores de performance</p>
      </div>

      <Tabs defaultValue="vendas" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
          <TabsTrigger value="operacional">Operacional</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
        </TabsList>

        <TabsContent value="vendas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {indicadoresVendas.map((indicador, index) => (
              <Card key={index} className="card-portal">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {indicador.titulo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{indicador.valor}</span>
                    <div className={`flex items-center ${
                      indicador.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {indicador.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      <span className="text-sm font-medium">{indicador.variacao}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="card-portal">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-accent" />
                Vendas por Período
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded">
                <div className="text-center">
                  <PieChart className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Gráfico de vendas será exibido aqui</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operacional" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {indicadoresOperacionais.map((indicador, index) => (
              <Card key={index} className="card-portal">
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    {indicador.titulo}
                    <Badge className={getStatusColor(indicador.status)}>
                      {indicador.status === 'excellent' ? 'Excelente' : 
                       indicador.status === 'ok' ? 'OK' : 'Atenção'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold">{indicador.valor}</span>
                      <Activity className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-sm text-muted-foreground">Meta: {indicador.meta}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="financeiro" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="card-portal">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Faturamento Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">R$ 1.245.680</span>
                  <CreditCard className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-green-600 mt-1">+18% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card className="card-portal">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Margem de Lucro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">28,5%</span>
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-blue-600 mt-1">Meta: 25%</p>
              </CardContent>
            </Card>

            <Card className="card-portal">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Recebíveis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">R$ 89.450</span>
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Prazo médio: 15 dias</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clientes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="card-portal">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Clientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">2.847</span>
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-green-600 mt-1">+156 novos este mês</p>
              </CardContent>
            </Card>

            <Card className="card-portal">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Clientes Ativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">1.923</span>
                  <Activity className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">67,5% do total</p>
              </CardContent>
            </Card>

            <Card className="card-portal">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Taxa de Retenção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">92,3%</span>
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-blue-600 mt-1">Acima da meta (90%)</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GestaoIndicadores;