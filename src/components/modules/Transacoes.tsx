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
  const [filtroDataInicio, setFiltroDataInicio] = useState("");
  const [filtroDataFim, setFiltroDataFim] = useState("");
  const [filtroPlaca, setFiltroPlaca] = useState("");
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroProduto, setFiltroProduto] = useState("todos");
  const { toast } = useToast();

  // Mock data - 50 últimas transações fictícias
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
    },
    {
      id: "TXN006",
      autorizacao: "AUTH2025006",
      nsu: "NSU123456794",
      placa: "MNO-2468",
      cliente: "Cargas Pesadas",
      produto: "Diesel S-10",
      litros: 150.0,
      valor: 900.0,
      horario: "2025-08-25 09:45:30",
      motorista: "Pedro Souza",
      matricula: "MAT006",
      status: "concluida"
    },
    {
      id: "TXN007",
      autorizacao: "AUTH2025007",
      nsu: "NSU123456795",
      placa: "PQR-1357",
      cliente: "Transporte Rápido",
      produto: "Gasolina Aditivada",
      litros: 55.2,
      valor: 331.2,
      horario: "2025-08-25 08:30:20",
      motorista: "Luiza Ferreira",
      matricula: "MAT007",
      status: "concluida"
    },
    {
      id: "TXN008",
      autorizacao: "AUTH2025008",
      nsu: "NSU123456796",
      placa: "STU-9753",
      cliente: "Frota Sul",
      produto: "Diesel S-10",
      litros: 78.9,
      valor: 473.4,
      horario: "2025-08-25 07:15:45",
      motorista: "Ricardo Alves",
      matricula: "MAT008",
      status: "concluida"
    },
    {
      id: "TXN009",
      autorizacao: "AUTH2025009",
      nsu: "NSU123456797",
      placa: "VWX-4680",
      cliente: "Express Cargo",
      produto: "Gasolina Comum",
      litros: 42.8,
      valor: 228.96,
      horario: "2025-08-24 16:45:12",
      motorista: "Fernanda Costa",
      matricula: "MAT009",
      status: "concluida"
    },
    {
      id: "TXN010",
      autorizacao: "AUTH2025010",
      nsu: "NSU123456798",
      placa: "YZA-1975",
      cliente: "Logística Global",
      produto: "Diesel S-10",
      litros: 110.2,
      valor: 661.2,
      horario: "2025-08-24 15:20:33",
      motorista: "Marcos Silva",
      matricula: "MAT010",
      status: "concluida"
    },
    {
      id: "TXN011",
      autorizacao: "AUTH2025011",
      nsu: "NSU123456799",
      placa: "BCD-8642",
      cliente: "Transporte União",
      produto: "Etanol",
      litros: 65.7,
      valor: 262.8,
      horario: "2025-08-24 14:10:25",
      motorista: "Carla Mendes",
      matricula: "MAT011",
      status: "concluida"
    },
    {
      id: "TXN012",
      autorizacao: "AUTH2025012",
      nsu: "NSU123456800",
      placa: "EFG-3579",
      cliente: "Frota Nacional",
      produto: "Diesel S-10",
      litros: 135.8,
      valor: 814.8,
      horario: "2025-08-24 13:35:18",
      motorista: "Paulo Roberto",
      matricula: "MAT012",
      status: "concluida"
    },
    {
      id: "TXN013",
      autorizacao: "AUTH2025013",
      nsu: "NSU123456801",
      placa: "HIJ-9246",
      cliente: "Speed Delivery",
      produto: "Gasolina Aditivada",
      litros: 38.4,
      valor: 230.4,
      horario: "2025-08-24 12:22:41",
      motorista: "Sandra Lima",
      matricula: "MAT013",
      status: "concluida"
    },
    {
      id: "TXN014",
      autorizacao: "AUTH2025014",
      nsu: "NSU123456802",
      placa: "KLM-7531",
      cliente: "Transportes Brasília",
      produto: "Diesel S-10",
      litros: 98.7,
      valor: 592.2,
      horario: "2025-08-24 11:15:09",
      motorista: "Antônio Pereira",
      matricula: "MAT014",
      status: "concluida"
    },
    {
      id: "TXN015",
      autorizacao: "AUTH2025015",
      nsu: "NSU123456803",
      placa: "NOP-4826",
      cliente: "Cargo Express",
      produto: "Gasolina Comum",
      litros: 52.3,
      valor: 279.76,
      horario: "2025-08-24 10:45:27",
      motorista: "Juliana Santos",
      matricula: "MAT015",
      status: "concluida"
    },
    {
      id: "TXN016",
      autorizacao: "AUTH2025016",
      nsu: "NSU123456804",
      placa: "QRS-1593",
      cliente: "Frota Moderna",
      produto: "Diesel S-10",
      litros: 142.1,
      valor: 852.6,
      horario: "2025-08-24 09:30:15",
      motorista: "Roberto Carlos",
      matricula: "MAT016",
      status: "concluida"
    },
    {
      id: "TXN017",
      autorizacao: "AUTH2025017",
      nsu: "NSU123456805",
      placa: "TUV-7408",
      cliente: "Logística Premium",
      produto: "Etanol",
      litros: 71.2,
      valor: 284.8,
      horario: "2025-08-24 08:15:42",
      motorista: "Marina Oliveira",
      matricula: "MAT017",
      status: "concluida"
    },
    {
      id: "TXN018",
      autorizacao: "AUTH2025018",
      nsu: "NSU123456806",
      placa: "WXY-2759",
      cliente: "Transporte Veloz",
      produto: "Gasolina Aditivada",
      litros: 44.9,
      valor: 269.4,
      horario: "2025-08-23 17:50:33",
      motorista: "Eduardo Silva",
      matricula: "MAT018",
      status: "concluida"
    },
    {
      id: "TXN019",
      autorizacao: "AUTH2025019",
      nsu: "NSU123456807",
      placa: "ZAB-8514",
      cliente: "Frota Elite",
      produto: "Diesel S-10",
      litros: 156.8,
      valor: 940.8,
      horario: "2025-08-23 16:25:18",
      motorista: "Patrícia Lima",
      matricula: "MAT019",
      status: "concluida"
    },
    {
      id: "TXN020",
      autorizacao: "AUTH2025020",
      nsu: "NSU123456808",
      placa: "CDE-6201",
      cliente: "Express Brasil",
      produto: "Gasolina Comum",
      litros: 37.6,
      valor: 201.28,
      horario: "2025-08-23 15:40:51",
      motorista: "Carlos Eduardo",
      matricula: "MAT020",
      status: "concluida"
    },
    {
      id: "TXN021",
      autorizacao: "AUTH2025021",
      nsu: "NSU123456809",
      placa: "FGH-3967",
      cliente: "Transportes Modernos",
      produto: "Diesel S-10",
      litros: 89.4,
      valor: 536.4,
      horario: "2025-08-23 14:12:37",
      motorista: "Ana Paula",
      matricula: "MAT021",
      status: "concluida"
    },
    {
      id: "TXN022",
      autorizacao: "AUTH2025022",
      nsu: "NSU123456810",
      placa: "IJK-7432",
      cliente: "Logística Total",
      produto: "Etanol",
      litros: 58.9,
      valor: 235.6,
      horario: "2025-08-23 13:25:14",
      motorista: "Francisco Silva",
      matricula: "MAT022",
      status: "concluida"
    },
    {
      id: "TXN023",
      autorizacao: "AUTH2025023",
      nsu: "NSU123456811",
      placa: "LMN-5698",
      cliente: "Cargo Nacional",
      produto: "Gasolina Aditivada",
      litros: 48.7,
      valor: 292.2,
      horario: "2025-08-23 12:38:29",
      motorista: "Luciana Costa",
      matricula: "MAT023",
      status: "concluida"
    },
    {
      id: "TXN024",
      autorizacao: "AUTH2025024",
      nsu: "NSU123456812",
      placa: "OPQ-9023",
      cliente: "Frota Líder",
      produto: "Diesel S-10",
      litros: 167.3,
      valor: 1003.8,
      horario: "2025-08-23 11:51:46",
      motorista: "André Santos",
      matricula: "MAT024",
      status: "concluida"
    },
    {
      id: "TXN025",
      autorizacao: "AUTH2025025",
      nsu: "NSU123456813",
      placa: "RST-4785",
      cliente: "Express Plus",
      produto: "Gasolina Comum",
      litros: 41.2,
      valor: 220.44,
      horario: "2025-08-23 10:15:22",
      motorista: "Beatriz Lima",
      matricula: "MAT025",
      status: "concluida"
    },
    {
      id: "TXN026",
      autorizacao: "AUTH2025026",
      nsu: "NSU123456814",
      placa: "UVW-1450",
      cliente: "Transportes Unidos",
      produto: "Diesel S-10",
      litros: 113.7,
      valor: 682.2,
      horario: "2025-08-23 09:28:07",
      motorista: "Diego Oliveira",
      matricula: "MAT026",
      status: "concluida"
    },
    {
      id: "TXN027",
      autorizacao: "AUTH2025027",
      nsu: "NSU123456815",
      placa: "XYZ-8916",
      cliente: "Logística Avançada",
      produto: "Etanol",
      litros: 62.8,
      valor: 251.2,
      horario: "2025-08-23 08:42:35",
      motorista: "Cristina Silva",
      matricula: "MAT027",
      status: "concluida"
    },
    {
      id: "TXN028",
      autorizacao: "AUTH2025028",
      nsu: "NSU123456816",
      placa: "ABC-2571",
      cliente: "Cargo Pro",
      produto: "Gasolina Aditivada",
      litros: 39.6,
      valor: 237.6,
      horario: "2025-08-22 18:15:41",
      motorista: "Rafael Costa",
      matricula: "MAT028",
      status: "concluida"
    },
    {
      id: "TXN029",
      autorizacao: "AUTH2025029",
      nsu: "NSU123456817",
      placa: "DEF-6382",
      cliente: "Frota Premium",
      produto: "Diesel S-10",
      litros: 178.4,
      valor: 1070.4,
      horario: "2025-08-22 17:32:18",
      motorista: "Vanessa Santos",
      matricula: "MAT029",
      status: "concluida"
    },
    {
      id: "TXN030",
      autorizacao: "AUTH2025030",
      nsu: "NSU123456818",
      placa: "GHI-9647",
      cliente: "Express Master",
      produto: "Gasolina Comum",
      litros: 46.8,
      valor: 250.44,
      horario: "2025-08-22 16:45:53",
      motorista: "Thiago Lima",
      matricula: "MAT030",
      status: "concluida"
    },
    {
      id: "TXN031",
      autorizacao: "AUTH2025031",
      nsu: "NSU123456819",
      placa: "JKL-5903",
      cliente: "Transportes Global",
      produto: "Diesel S-10",
      litros: 97.2,
      valor: 583.2,
      horario: "2025-08-22 15:58:26",
      motorista: "Gabriela Silva",
      matricula: "MAT031",
      status: "concluida"
    },
    {
      id: "TXN032",
      autorizacao: "AUTH2025032",
      nsu: "NSU123456820",
      placa: "MNO-7418",
      cliente: "Logística Speed",
      produto: "Etanol",
      litros: 54.3,
      valor: 217.2,
      horario: "2025-08-22 14:21:09",
      motorista: "Rodrigo Costa",
      matricula: "MAT032",
      status: "concluida"
    },
    {
      id: "TXN033",
      autorizacao: "AUTH2025033",
      nsu: "NSU123456821",
      placa: "PQR-3729",
      cliente: "Cargo Elite",
      produto: "Gasolina Aditivada",
      litros: 51.7,
      valor: 310.2,
      horario: "2025-08-22 13:34:42",
      motorista: "Isabella Santos",
      matricula: "MAT033",
      status: "concluida"
    },
    {
      id: "TXN034",
      autorizacao: "AUTH2025034",
      nsu: "NSU123456822",
      placa: "STU-8054",
      cliente: "Frota Nacional",
      produto: "Diesel S-10",
      litros: 189.6,
      valor: 1137.6,
      horario: "2025-08-22 12:47:15",
      motorista: "Leonardo Lima",
      matricula: "MAT034",
      status: "concluida"
    },
    {
      id: "TXN035",
      autorizacao: "AUTH2025035",
      nsu: "NSU123456823",
      placa: "VWX-1480",
      cliente: "Express Total",
      produto: "Gasolina Comum",
      litros: 35.9,
      valor: 192.32,
      horario: "2025-08-22 11:59:38",
      motorista: "Amanda Silva",
      matricula: "MAT035",
      status: "concluida"
    },
    {
      id: "TXN036",
      autorizacao: "AUTH2025036",
      nsu: "NSU123456824",
      placa: "YZA-6205",
      cliente: "Transportes Rápidos",
      produto: "Diesel S-10",
      litros: 122.8,
      valor: 736.8,
      horario: "2025-08-22 10:12:51",
      motorista: "Bruno Costa",
      matricula: "MAT036",
      status: "concluida"
    },
    {
      id: "TXN037",
      autorizacao: "AUTH2025037",
      nsu: "NSU123456825",
      placa: "BCD-9576",
      cliente: "Logística Prime",
      produto: "Etanol",
      litros: 69.4,
      valor: 277.6,
      horario: "2025-08-22 09:25:24",
      motorista: "Camila Santos",
      matricula: "MAT037",
      status: "concluida"
    },
    {
      id: "TXN038",
      autorizacao: "AUTH2025038",
      nsu: "NSU123456826",
      placa: "EFG-4821",
      cliente: "Cargo Master",
      produto: "Gasolina Aditivada",
      litros: 43.2,
      valor: 259.2,
      horario: "2025-08-22 08:38:07",
      motorista: "Daniel Lima",
      matricula: "MAT038",
      status: "concluida"
    },
    {
      id: "TXN039",
      autorizacao: "AUTH2025039",
      nsu: "NSU123456827",
      placa: "HIJ-7193",
      cliente: "Frota Superior",
      produto: "Diesel S-10",
      litros: 201.3,
      valor: 1207.8,
      horario: "2025-08-21 19:51:30",
      motorista: "Eliana Silva",
      matricula: "MAT039",
      status: "concluida"
    },
    {
      id: "TXN040",
      autorizacao: "AUTH2025040",
      nsu: "NSU123456828",
      placa: "KLM-3648",
      cliente: "Express Nacional",
      produto: "Gasolina Comum",
      litros: 40.7,
      valor: 217.74,
      horario: "2025-08-21 18:04:13",
      motorista: "Felipe Costa",
      matricula: "MAT040",
      status: "concluida"
    },
    {
      id: "TXN041",
      autorizacao: "AUTH2025041",
      nsu: "NSU123456829",
      placa: "NOP-8975",
      cliente: "Transportes Líderes",
      produto: "Diesel S-10",
      litros: 85.9,
      valor: 515.4,
      horario: "2025-08-21 17:17:46",
      motorista: "Giovana Santos",
      matricula: "MAT041",
      status: "concluida"
    },
    {
      id: "TXN042",
      autorizacao: "AUTH2025042",
      nsu: "NSU123456830",
      placa: "QRS-5240",
      cliente: "Logística Eficiente",
      produto: "Etanol",
      litros: 76.1,
      valor: 304.4,
      horario: "2025-08-21 16:30:29",
      motorista: "Hugo Lima",
      matricula: "MAT042",
      status: "concluida"
    },
    {
      id: "TXN043",
      autorizacao: "AUTH2025043",
      nsu: "NSU123456831",
      placa: "TUV-1607",
      cliente: "Cargo Premium",
      produto: "Gasolina Aditivada",
      litros: 47.8,
      valor: 286.8,
      horario: "2025-08-21 15:43:12",
      motorista: "Ingrid Silva",
      matricula: "MAT043",
      status: "concluida"
    },
    {
      id: "TXN044",
      autorizacao: "AUTH2025044",
      nsu: "NSU123456832",
      placa: "WXY-6932",
      cliente: "Frota Dinâmica",
      produto: "Diesel S-10",
      litros: 212.7,
      valor: 1276.2,
      horario: "2025-08-21 14:56:55",
      motorista: "João Pedro",
      matricula: "MAT044",
      status: "concluida"
    },
    {
      id: "TXN045",
      autorizacao: "AUTH2025045",
      nsu: "NSU123456833",
      placa: "ZAB-3258",
      cliente: "Express Moderno",
      produto: "Gasolina Comum",
      litros: 33.4,
      valor: 178.92,
      horario: "2025-08-21 13:09:38",
      motorista: "Karla Costa",
      matricula: "MAT045",
      status: "concluida"
    },
    {
      id: "TXN046",
      autorizacao: "AUTH2025046",
      nsu: "NSU123456834",
      placa: "CDE-8783",
      cliente: "Transportes Avançados",
      produto: "Diesel S-10",
      litros: 94.6,
      valor: 567.6,
      horario: "2025-08-21 12:22:21",
      motorista: "Lucas Santos",
      matricula: "MAT046",
      status: "concluida"
    },
    {
      id: "TXN047",
      autorizacao: "AUTH2025047",
      nsu: "NSU123456835",
      placa: "FGH-4149",
      cliente: "Logística Suprema",
      produto: "Etanol",
      litros: 81.7,
      valor: 326.8,
      horario: "2025-08-21 11:35:04",
      motorista: "Mônica Lima",
      matricula: "MAT047",
      status: "concluida"
    },
    {
      id: "TXN048",
      autorizacao: "AUTH2025048",
      nsu: "NSU123456836",
      placa: "IJK-7516",
      cliente: "Cargo Superior",
      produto: "Gasolina Aditivada",
      litros: 56.3,
      valor: 337.8,
      horario: "2025-08-21 10:47:47",
      motorista: "Nicolas Silva",
      matricula: "MAT048",
      status: "concluida"
    },
    {
      id: "TXN049",
      autorizacao: "AUTH2025049",
      nsu: "NSU123456837",
      placa: "LMN-2890",
      cliente: "Frota Eficaz",
      produto: "Diesel S-10",
      litros: 148.2,
      valor: 889.2,
      horario: "2025-08-21 09:00:30",
      motorista: "Olivia Costa",
      matricula: "MAT049",
      status: "concluida"
    },
    {
      id: "TXN050",
      autorizacao: "AUTH2025050",
      nsu: "NSU123456838",
      placa: "OPQ-6425",
      cliente: "Express Final",
      produto: "Gasolina Comum",
      litros: 29.8,
      valor: 159.46,
      horario: "2025-08-21 08:13:13",
      motorista: "Paulo Victor",
      matricula: "MAT050",
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
    setFiltroDataInicio("");
    setFiltroDataFim("");
    setFiltroPlaca("");
    setFiltroCliente("");  
    setFiltroProduto("todos");
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="filtroDataInicio">Data Início</Label>
              <Input
                id="filtroDataInicio"
                type="date"
                value={filtroDataInicio}
                onChange={(e) => setFiltroDataInicio(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="filtroDataFim">Data Fim</Label>
              <Input
                id="filtroDataFim"
                type="date"
                value={filtroDataFim}
                onChange={(e) => setFiltroDataFim(e.target.value)}
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
                  <SelectItem value="todos">Todos os produtos</SelectItem>
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
          <CardTitle>Últimas {transacoes.length} Transações</CardTitle>
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