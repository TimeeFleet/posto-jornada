import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Download, 
  FileText, 
  Calendar,
  Filter,
  Receipt
} from "lucide-react";

const Transacoes = () => {
  const [filtroData, setFiltroData] = useState("");
  const [filtroPlaca, setFiltroPlaca] = useState("");
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroProduto, setFiltroProduto] = useState("");
  const { toast } = useToast();

  // Mock data - 50 últimas transações
  const transacoes = [
    {
      id: "TXN001",
      autorizacao: "AUTH2025001",
      nsu: "NSU123456789",
      placa: "ABC-1234",
      cliente: "Transportes Silva LTDA",
      produto: "Diesel S-10",
      litros: 85.5,
      valor: 512.5,
      horario: "2025-08-25 14:30:15",
      motorista: "João Silva",
      matricula: "MAT001",
      status: "concluida"
    },
    {
      id: "TXN002", 
      autorizacao: "AUTH2025002",
      nsu: "NSU123456790",
      placa: "XYZ-5678",
      cliente: "Logística Express",
      produto: "Gasolina Comum",
      litros: 45.2,
      valor: 241.8,
      horario: "2025-08-25 13:15:22",
      motorista: "Maria Santos",
      matricula: "MAT002",
      status: "concluida"
    },
    {
      id: "TXN003",
      autorizacao: "AUTH2025003", 
      nsu: "NSU123456791",
      placa: "DEF-9012",
      cliente: "Frota Norte",
      produto: "Diesel S-10",
      litros: 120.8,
      valor: 724.8,
      horario: "2025-08-25 12:45:10",
      motorista: "Carlos Oliveira",
      matricula: "MAT003",
      status: "concluida"
    },
    {
      id: "TXN004",
      autorizacao: "AUTH2025004",
      nsu: "NSU123456792", 
      placa: "GHI-3456",
      cliente: "Fast Delivery",
      produto: "Etanol",
      litros: 38.5,
      valor: 154.0,
      horario: "2025-08-25 11:20:35",
      motorista: "Ana Costa",
      matricula: "MAT004",
      status: "concluida"
    },
    {
      id: "TXN005",
      autorizacao: "AUTH2025005",
      nsu: "NSU123456793",
      placa: "JKL-7890", 
      cliente: "Rápido Transporte",
      produto: "Diesel S-10",
      litros: 95.3,
      valor: 571.8,
      horario: "2025-08-25 10:15:44",
      motorista: "Roberto Lima",
      matricula: "MAT005",
      status: "concluida"
    }
  ];

  const handleGerarRelatorio = () => {
    toast({
      title: "Relatório Gerado",
      description: "O relatório de transações está sendo preparado para download.",
    });
  };

  const handleBaixarComprovante = (transacao: any) => {
    toast({
      title: "Comprovante",
      description: `Baixando comprovante da transação ${transacao.autorizacao}.`,
    });
  };

  const handleFiltrar = () => {
    toast({
      title: "Filtros Aplicados",
      description: "As transações foram filtradas conforme os critérios selecionados.",
    });
  };

  const limparFiltros = () => {
    setFiltroData("");
    setFiltroPlaca("");
    setFiltroCliente("");  
    setFiltroProduto("");
    toast({
      title: "Filtros Limpos",
      description: "Todos os filtros foram removidos.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transações</h1>
          <p className="text-muted-foreground">Acompanhe todas as vendas realizadas</p>
        </div>
        <Button onClick={handleGerarRelatorio} className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Gerar Relatório</span>
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </CardTitle>
          <CardDescription>Use os filtros para encontrar transações específicas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="filtroData">Período</Label>
              <Input
                id="filtroData"
                type="date"
                value={filtroData}
                onChange={(e) => setFiltroData(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="filtroPlaca">Placa</Label>
              <Input
                id="filtroPlaca"
                placeholder="ABC-1234"
                value={filtroPlaca}
                onChange={(e) => setFiltroPlaca(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="filtroCliente">Cliente</Label>
              <Input
                id="filtroCliente"
                placeholder="Nome do cliente"
                value={filtroCliente}
                onChange={(e) => setFiltroCliente(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="filtroProduto">Produto</Label>
              <Select value={filtroProduto} onValueChange={setFiltroProduto}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os produtos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os produtos</SelectItem>
                  <SelectItem value="diesel-s10">Diesel S-10</SelectItem>
                  <SelectItem value="gasolina-comum">Gasolina Comum</SelectItem>
                  <SelectItem value="etanol">Etanol</SelectItem>
                  <SelectItem value="gasolina-aditivada">Gasolina Aditivada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleFiltrar} className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Filtrar</span>
            </Button>
            <Button variant="outline" onClick={limparFiltros}>
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Transações */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas 50 Transações</CardTitle>
          <CardDescription>Para ver transações mais antigas, use os filtros acima</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transacoes.map((transacao) => (
              <Card key={transacao.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{transacao.autorizacao}</Badge>
                        <Badge variant="outline">NSU: {transacao.nsu}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Placa:</span> {transacao.placa}
                        </div>
                        <div>
                          <span className="font-medium">Cliente:</span> {transacao.cliente}
                        </div>
                        <div>
                          <span className="font-medium">Produto:</span> {transacao.produto}
                        </div>
                        <div>
                          <span className="font-medium">Litros:</span> {transacao.litros}L
                        </div>
                        <div>
                          <span className="font-medium">Valor:</span> R$ {transacao.valor.toFixed(2)}
                        </div>
                        <div>
                          <span className="font-medium">Horário:</span> {transacao.horario}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <div><span className="font-medium">Motorista:</span> {transacao.motorista}</div>
                        <div><span className="font-medium">Matrícula:</span> {transacao.matricula}</div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleBaixarComprovante(transacao)}
                          className="flex items-center space-x-1"
                        >
                          <Receipt className="w-3 h-3" />
                          <span>Comprovante</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Detalhes</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transacoes;