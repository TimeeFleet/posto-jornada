import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GestaoFinanceira = () => {
  const [activeTab, setActiveTab] = useState("resumo");
  const { toast } = useToast();

  const contasReceber = [
    { id: 1, cliente: "Transportadora ABC", valor: "R$ 15.650", vencimento: "20/08/2025", status: "pendente" },
    { id: 2, cliente: "Empresa XYZ Ltda", valor: "R$ 8.900", vencimento: "25/08/2025", status: "pendente" },
    { id: 3, cliente: "Frota São Paulo", valor: "R$ 22.300", vencimento: "30/08/2025", status: "agendado" },
    { id: 4, cliente: "Logística Rápida", valor: "R$ 12.450", vencimento: "10/08/2025", status: "vencido" }
  ];

  const contasPagar = [
    { id: 1, fornecedor: "Distribuidora Petrobras", valor: "R$ 125.000", vencimento: "22/08/2025", categoria: "Combustível" },
    { id: 2, fornecedor: "Energia Elétrica", valor: "R$ 3.450", vencimento: "28/08/2025", categoria: "Utilidades" },
    { id: 3, fornecedor: "Manutenção Equipamentos", valor: "R$ 8.900", vencimento: "15/09/2025", categoria: "Manutenção" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "agendado":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Agendado</Badge>;
      case "vencido":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Vencido</Badge>;
      case "pago":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Pago</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestão Financeira</h2>
          <p className="text-muted-foreground">Controle completo das finanças do posto</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Nova Transação
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
          <TabsTrigger value="receber">Contas a Receber</TabsTrigger>
          <TabsTrigger value="pagar">Contas a Pagar</TabsTrigger>
          <TabsTrigger value="fluxo">Fluxo de Caixa</TabsTrigger>
        </TabsList>

        <TabsContent value="resumo" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="card-portal">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Saldo Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">R$ 89.450</span>
                  <DollarSign className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-green-600 mt-1">+12% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card className="card-portal">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  A Receber (30 dias)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">R$ 59.300</span>
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">12 clientes pendentes</p>
              </CardContent>
            </Card>

            <Card className="card-portal">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  A Pagar (30 dias)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">R$ 137.350</span>
                  <TrendingDown className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">8 fornecedores</p>
              </CardContent>
            </Card>

            <Card className="card-portal">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Margem Operacional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">28,5%</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-sm text-green-600 mt-1">Meta: 25%</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="card-portal">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                  Alertas Financeiros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-red-800">1 conta vencida</p>
                    <p className="text-sm text-red-600">Logística Rápida - R$ 12.450</p>
                  </div>
                  <Badge variant="destructive">Urgente</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-yellow-800">2 contas vencem em 3 dias</p>
                    <p className="text-sm text-yellow-600">Total: R$ 24.550</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Atenção</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-portal">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-accent" />
                  Próximos Recebimentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Transportadora ABC</p>
                    <p className="text-sm text-muted-foreground">Vence em 5 dias</p>
                  </div>
                  <span className="font-medium text-accent">R$ 15.650</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Empresa XYZ Ltda</p>
                    <p className="text-sm text-muted-foreground">Vence em 10 dias</p>
                  </div>
                  <span className="font-medium text-accent">R$ 8.900</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="receber" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Contas a Receber</h3>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          <Card className="card-portal">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contasReceber.map((conta) => (
                    <TableRow key={conta.id}>
                      <TableCell className="font-medium">{conta.cliente}</TableCell>
                      <TableCell>{conta.valor}</TableCell>
                      <TableCell>{conta.vencimento}</TableCell>
                      <TableCell>{getStatusBadge(conta.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Cobrar</Button>
                          <Button variant="outline" size="sm">Baixar</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagar" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Contas a Pagar</h3>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          <Card className="card-portal">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contasPagar.map((conta) => (
                    <TableRow key={conta.id}>
                      <TableCell className="font-medium">{conta.fornecedor}</TableCell>
                      <TableCell>{conta.valor}</TableCell>
                      <TableCell>{conta.vencimento}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{conta.categoria}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Pagar</Button>
                          <Button variant="outline" size="sm">Agendar</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fluxo">
          <Card className="card-portal">
            <CardHeader>
              <CardTitle>Fluxo de Caixa</CardTitle>
              <CardDescription>Projeção de entradas e saídas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Gráfico de fluxo de caixa será exibido aqui</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GestaoFinanceira;