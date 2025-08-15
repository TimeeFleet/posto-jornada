import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  CreditCard,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Handshake
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RelatoriosGerenciais = () => {
  const [activeTab, setActiveTab] = useState("pendentes");
  const [periodoSelecionado, setPeriodoSelecionado] = useState("30dias");
  const { toast } = useToast();

  const notasPendentes = [
    { id: 1, cliente: "Transportadora ABC", valor: "R$ 15.650", data: "10/08/2025", dias: 5, status: "pendente" },
    { id: 2, cliente: "Empresa XYZ", valor: "R$ 8.900", data: "12/08/2025", dias: 3, status: "pendente" },
    { id: 3, cliente: "Logística Rápida", valor: "R$ 12.450", data: "08/08/2025", dias: 7, status: "vencida" },
    { id: 4, cliente: "Frota São Paulo", valor: "R$ 22.300", data: "14/08/2025", dias: 1, status: "pendente" }
  ];

  const valoresReceber = [
    { cliente: "Transportadora ABC", valor: "R$ 45.650", vencimento: "20/08/2025", parcelas: "3/5" },
    { cliente: "Empresa XYZ", valor: "R$ 28.900", vencimento: "25/08/2025", parcelas: "1/3" },
    { cliente: "Logística Express", valor: "R$ 67.200", vencimento: "30/08/2025", parcelas: "2/4" }
  ];

  const negociacoes = [
    { cliente: "Frota Nacional", tipo: "Desconto Volume", status: "Em andamento", valor: "R$ 125.000", desconto: "8%" },
    { cliente: "Transportes Unidos", tipo: "Prazo Pagamento", status: "Aprovada", valor: "R$ 89.500", desconto: "45 dias" },
    { cliente: "Logística Premium", tipo: "Preço Especial", status: "Pendente", valor: "R$ 156.800", desconto: "5%" }
  ];

  const transacoes = [
    { id: "TXN001", data: "15/08/2025 14:30", cliente: "João Silva", tipo: "Débito", valor: "R$ 150,00", combustivel: "Gasolina" },
    { id: "TXN002", data: "15/08/2025 14:25", cliente: "Transportadora ABC", tipo: "Crédito", valor: "R$ 2.500,00", combustivel: "Diesel" },
    { id: "TXN003", data: "15/08/2025 14:20", cliente: "Maria Santos", tipo: "Débito", valor: "R$ 80,00", combustivel: "Etanol" },
    { id: "TXN004", data: "15/08/2025 14:15", cliente: "Empresa XYZ", tipo: "Crédito", valor: "R$ 1.200,00", combustivel: "Gasolina" }
  ];

  const handleGerarRelatorio = (tipo: string) => {
    toast({
      title: "Relatório gerado!",
      description: `Relatório de ${tipo} foi exportado com sucesso.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "vencida":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Vencida</Badge>;
      case "pago":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Pago</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  const getNegociacaoStatusBadge = (status: string) => {
    switch (status) {
      case "Em andamento":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Em andamento</Badge>;
      case "Aprovada":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Aprovada</Badge>;
      case "Pendente":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "Rejeitada":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Rejeitada</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Relatórios Gerenciais</h2>
          <p className="text-muted-foreground">Acompanhe e exporte relatórios detalhados</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7dias">Últimos 7 dias</SelectItem>
              <SelectItem value="30dias">Últimos 30 dias</SelectItem>
              <SelectItem value="90dias">Últimos 90 dias</SelectItem>
              <SelectItem value="personalizado">Período personalizado</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pendentes">Notas Pendentes</TabsTrigger>
          <TabsTrigger value="receber">Valores a Receber</TabsTrigger>
          <TabsTrigger value="negociacoes">Negociações</TabsTrigger>
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
        </TabsList>

        <TabsContent value="pendentes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notas Fiscais Pendentes</h3>
            <Button onClick={() => handleGerarRelatorio("Notas Pendentes")} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card className="card-portal">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Pendente</p>
                    <p className="text-2xl font-bold text-red-600">R$ 59.300</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-portal">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Notas Vencidas</p>
                    <p className="text-2xl font-bold text-orange-600">1</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-portal">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Prazo Médio</p>
                    <p className="text-2xl font-bold">4 dias</p>
                  </div>
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="card-portal">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data Emissão</TableHead>
                    <TableHead>Dias Pendente</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notasPendentes.map((nota) => (
                    <TableRow key={nota.id}>
                      <TableCell className="font-medium">{nota.cliente}</TableCell>
                      <TableCell>{nota.valor}</TableCell>
                      <TableCell>{nota.data}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${nota.dias > 5 ? 'text-red-600' : 'text-yellow-600'}`}>
                          {nota.dias} dias
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(nota.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Ver Detalhes</Button>
                          <Button variant="outline" size="sm">Enviar Cobrança</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receber" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Valores a Receber</h3>
            <Button onClick={() => handleGerarRelatorio("Valores a Receber")} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>

          <Card className="card-portal">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Próximo Vencimento</TableHead>
                    <TableHead>Parcelas</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {valoresReceber.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.cliente}</TableCell>
                      <TableCell className="font-medium text-accent">{item.valor}</TableCell>
                      <TableCell>{item.vencimento}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.parcelas}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Ver Detalhes</Button>
                          <Button variant="outline" size="sm">Gerar Cobrança</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="negociacoes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Negociações em Andamento</h3>
            <Button onClick={() => handleGerarRelatorio("Negociações")} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>

          <Card className="card-portal">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo de Negociação</TableHead>
                    <TableHead>Valor Estimado</TableHead>
                    <TableHead>Desconto/Condição</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {negociacoes.map((negociacao, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{negociacao.cliente}</TableCell>
                      <TableCell>{negociacao.tipo}</TableCell>
                      <TableCell className="font-medium text-accent">{negociacao.valor}</TableCell>
                      <TableCell>{negociacao.desconto}</TableCell>
                      <TableCell>{getNegociacaoStatusBadge(negociacao.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Ver Detalhes</Button>
                          <Button variant="outline" size="sm">Acompanhar</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transacoes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Transações Recentes</h3>
            <Button onClick={() => handleGerarRelatorio("Transações")} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>

          <Card className="card-portal">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Transação</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Combustível</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transacoes.map((transacao) => (
                    <TableRow key={transacao.id}>
                      <TableCell className="font-mono text-sm">{transacao.id}</TableCell>
                      <TableCell>{transacao.data}</TableCell>
                      <TableCell className="font-medium">{transacao.cliente}</TableCell>
                      <TableCell>
                        <Badge variant={transacao.tipo === "Crédito" ? "secondary" : "outline"}>
                          {transacao.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className={`font-medium ${transacao.tipo === "Crédito" ? "text-green-600" : "text-blue-600"}`}>
                        {transacao.valor}
                      </TableCell>
                      <TableCell>{transacao.combustivel}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Ver Comprovante</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RelatoriosGerenciais;