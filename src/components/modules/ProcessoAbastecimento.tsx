import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Car, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText,
  AlertTriangle,
  ThumbsUp,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProcessoAbastecimento = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    placa: "",
    cartao: "",
    matricula: "",
    senha: "",
    combustivel: "gasolina",
    valor: "",
  });
  const { toast } = useToast();

  const steps = [
    { id: 1, title: "Atendimento ao motorista", description: "Identificação do veículo" },
    { id: 2, title: "Autenticação", description: "Dados do motorista" },
    { id: 3, title: "Execução", description: "Abastecimento" },
    { id: 4, title: "Finalização", description: "Registro e comprovante" },
    { id: 5, title: "Pós-venda", description: "Entrega de documentos" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      toast({
        title: "Etapa concluída!",
        description: `${steps[currentStep - 1].title} finalizada com sucesso.`,
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFormData({
      placa: "",
      cartao: "",
      matricula: "",
      senha: "",
      combustivel: "gasolina",
      valor: "",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="placa">Placa do Veículo</Label>
                <Input
                  id="placa"
                  placeholder="ABC-1234"
                  value={formData.placa}
                  onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
                  className="input-portal"
                />
              </div>
              <div>
                <Label htmlFor="cartao">Número do Cartão (opcional)</Label>
                <Input
                  id="cartao"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cartao}
                  onChange={(e) => setFormData({ ...formData, cartao: e.target.value })}
                  className="input-portal"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border-l-4 border-destructive bg-red-50">
                <h4 className="font-semibold text-destructive flex items-center">
                  <XCircle className="w-4 h-4 mr-2" />
                  Dor
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Demora na identificação do cliente e veículo
                </p>
              </div>
              <div className="p-4 border-l-4 border-accent bg-green-50">
                <h4 className="font-semibold text-accent flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Ganho
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Identificação rápida e segura do cliente
                </p>
              </div>
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h4 className="font-semibold text-blue-600 flex items-center">
                  <Car className="w-4 h-4 mr-2" />
                  Job to be Done
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Validar cliente e autorizar abastecimento
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="matricula">Matrícula do Motorista</Label>
                <Input
                  id="matricula"
                  placeholder="12345"
                  value={formData.matricula}
                  onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                  className="input-portal"
                />
              </div>
              <div>
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="****"
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  className="input-portal"
                />
              </div>
            </div>
            
            <Card className="card-portal">
              <CardHeader>
                <CardTitle className="text-sm">Status da Autorização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-sm">Cliente autorizado para abastecimento</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border-l-4 border-destructive bg-red-50">
                <h4 className="font-semibold text-destructive flex items-center">
                  <XCircle className="w-4 h-4 mr-2" />
                  Dor
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Processo manual de autenticação
                </p>
              </div>
              <div className="p-4 border-l-4 border-accent bg-green-50">
                <h4 className="font-semibold text-accent flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Ganho
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Autorização automática e segura
                </p>
              </div>
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h4 className="font-semibold text-blue-600 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Job to be Done
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Autenticar motorista no sistema
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tipo de Combustível</Label>
                <select 
                  className="w-full input-portal"
                  value={formData.combustivel}
                  onChange={(e) => setFormData({ ...formData, combustivel: e.target.value })}
                >
                  <option value="gasolina">Gasolina Comum</option>
                  <option value="gasolina-aditivada">Gasolina Aditivada</option>
                  <option value="etanol">Etanol</option>
                  <option value="diesel">Diesel</option>
                  <option value="diesel-s10">Diesel S10</option>
                </select>
              </div>
              <div>
                <Label htmlFor="valor">Valor do Abastecimento</Label>
                <Input
                  id="valor"
                  placeholder="R$ 0,00"
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                  className="input-portal"
                />
              </div>
            </div>

            <Card className="card-portal">
              <CardHeader>
                <CardTitle className="text-sm">Dados do Abastecimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Bomba:</span>
                  <Badge variant="secondary">Bomba 03</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Bico:</span>
                  <Badge variant="secondary">Bico 06</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Preço/Litro:</span>
                  <span className="font-medium">R$ 5,89</span>
                </div>
                <div className="flex justify-between">
                  <span>Litros:</span>
                  <span className="font-medium">25,42 L</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border-l-4 border-destructive bg-red-50">
                <h4 className="font-semibold text-destructive flex items-center">
                  <XCircle className="w-4 h-4 mr-2" />
                  Dor
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Erro na conferência de dados
                </p>
              </div>
              <div className="p-4 border-l-4 border-accent bg-green-50">
                <h4 className="font-semibold text-accent flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Ganho
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Abastecimento rápido e seguro
                </p>
              </div>
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h4 className="font-semibold text-blue-600 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Job to be Done
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Realizar abastecimento com precisão
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card className="card-portal">
              <CardHeader>
                <CardTitle className="text-sm">Registro da Venda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Número da NF</Label>
                    <Input value="000123456" readOnly className="input-portal" />
                  </div>
                  <div>
                    <Label>Data/Hora</Label>
                    <Input value="15/08/2025 14:30" readOnly className="input-portal" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Forma de Entrega do Comprovante</Label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="entrega" value="fisico" defaultChecked />
                      <span>Físico</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="entrega" value="email" />
                      <span>E-mail</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border-l-4 border-destructive bg-red-50">
                <h4 className="font-semibold text-destructive flex items-center">
                  <XCircle className="w-4 h-4 mr-2" />
                  Dor
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Demora no registro e emissão de NF
                </p>
              </div>
              <div className="p-4 border-l-4 border-accent bg-green-50">
                <h4 className="font-semibold text-accent flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Ganho
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Registro automático e NF instantânea
                </p>
              </div>
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h4 className="font-semibold text-blue-600 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Job to be Done
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Finalizar venda e emitir documentos
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card className="card-portal bg-green-50 border-accent">
              <CardHeader>
                <CardTitle className="text-accent flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Abastecimento Concluído!
                </CardTitle>
                <CardDescription>
                  Todos os processos foram finalizados com sucesso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Placa:</span>
                    <span className="font-medium">{formData.placa || "ABC-1234"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor Total:</span>
                    <span className="font-medium text-accent">R$ 149,80</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comprovante:</span>
                    <Badge variant="secondary">Entregue</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border-l-4 border-destructive bg-red-50">
                <h4 className="font-semibold text-destructive flex items-center">
                  <XCircle className="w-4 h-4 mr-2" />
                  Dor
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Cliente sai sem comprovante
                </p>
              </div>
              <div className="p-4 border-l-4 border-accent bg-green-50">
                <h4 className="font-semibold text-accent flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Ganho
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Cliente satisfeito e documentado
                </p>
              </div>
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <h4 className="font-semibold text-blue-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Job to be Done
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Garantir satisfação e compliance
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleReset} variant="outline" className="flex-1">
                Novo Abastecimento
              </Button>
              <Button className="button-portal flex-1">
                Finalizar Atendimento
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <Card className="card-portal">
        <CardHeader>
          <CardTitle>Processo de Abastecimento</CardTitle>
          <CardDescription>Siga os passos para um atendimento completo e eficiente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= step.id 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-full mt-4 ${
                    currentStep > step.id ? 'bg-accent' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card className="card-portal">
        <CardHeader>
          <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
          <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
          
          {currentStep < steps.length && (
            <div className="flex justify-end mt-6">
              <Button 
                onClick={handleNext} 
                className="button-portal"
                disabled={
                  (currentStep === 1 && !formData.placa) ||
                  (currentStep === 2 && (!formData.matricula || !formData.senha))
                }
              >
                {currentStep === steps.length - 1 ? 'Finalizar' : 'Próxima Etapa'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessoAbastecimento;