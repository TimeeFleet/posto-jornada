import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Megaphone, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Target, 
  Calendar,
  Users,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GestaoCampanhas = () => {
  const [activeTab, setActiveTab] = useState("ativas");
  const { toast } = useToast();

  const campanhasAtivas = [
    {
      id: 1,
      nome: "Desconto Gasolina Comum",
      tipo: "Desconto",
      valor: "R$ 0,10/L",
      periodo: "15/08 - 30/08/2025",
      participantes: 245,
      status: "ativa"
    },
    {
      id: 2,
      nome: "Cashback Etanol",
      tipo: "Cashback",
      valor: "5%",
      periodo: "01/08 - 31/08/2025",
      participantes: 128,
      status: "ativa"
    }
  ];

  const handleNovaCampanha = () => {
    toast({
      title: "Nova campanha",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestão de Campanhas e Promoções</h2>
          <p className="text-muted-foreground">Gerencie campanhas promocionais e descontos</p>
        </div>
        <Button onClick={handleNovaCampanha} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Nova Campanha
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ativas">Campanhas Ativas</TabsTrigger>
          <TabsTrigger value="programadas">Programadas</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="ativas" className="space-y-4">
          <div className="grid gap-4">
            {campanhasAtivas.map((campanha) => (
              <Card key={campanha.id} className="card-portal">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Megaphone className="w-5 h-5 mr-2 text-accent" />
                        {campanha.nome}
                      </CardTitle>
                      <CardDescription>{campanha.tipo} - {campanha.valor}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-accent/20 text-accent">
                      {campanha.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{campanha.periodo}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{campanha.participantes} participantes</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-accent">+12% vendas</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Encerrar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programadas">
          <Card className="card-portal">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Megaphone className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhuma campanha programada</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico">
          <Card className="card-portal">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Target className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Histórico de campanhas será exibido aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GestaoCampanhas;