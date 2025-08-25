import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Fuel, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WhatsAppFloat from "./WhatsAppFloat";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postoName, setPostoName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Base de dados fictícia de usuários e seus postos
  const userPostoDatabase = {
    "admin": "Posto eFleet",
    "gerente": "Posto eFleet", 
    "operador": "Posto eFleet",
    "joão": "Posto eFleet",
    "maria": "Posto Petrobras",
    "carlos": "Posto Shell"
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    
    // Quando começar a digitar a senha, mostrar o posto vinculado
    if (value.length > 0 && username) {
      const lowerUsername = username.toLowerCase();
      if (userPostoDatabase[lowerUsername]) {
        setPostoName(userPostoDatabase[lowerUsername]);
      }
    } else if (value.length === 0) {
      setPostoName("");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular autenticação
    setTimeout(() => {
      if (username && password) {
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo ao ${postoName || "sistema"}`,
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Erro no login",
          description: "Por favor, preencha todos os campos",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-portal">
        <CardHeader className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center">
              <Fuel className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-primary">
              {postoName || "POSTO"}
            </h1>
            <p className="text-muted-foreground">Sistema de Gestão Integrada</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 input-portal"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className="pl-10 input-portal"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full button-portal"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-accent hover:underline"
                onClick={() => toast({
                  title: "Recuperação de senha",
                  description: "Funcionalidade em desenvolvimento",
                })}
              >
                Esqueci minha senha
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
      <WhatsAppFloat />
    </div>
  );
};

export default Login;