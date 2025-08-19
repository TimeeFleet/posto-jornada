import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data para banners promocionais
const banners = [
  {
    id: 1,
    image: "/lovable-uploads/52a92005-8275-4beb-95fe-b503238102cf.png",
    title: "Promoção Combustível",
    description: "Desconto especial para clientes corporate"
  },
  {
    id: 2,
    image: "/placeholder.svg",
    title: "Nova Funcionalidade",
    description: "Conheça as melhorias do sistema"
  },
  {
    id: 3,
    image: "/placeholder.svg", 
    title: "Suporte 24hrs",
    description: "Atendimento disponível via WhatsApp"
  }
];

const BannerSlide = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gradient-to-r from-primary to-accent">
      <div className="relative w-full h-full">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="min-w-full h-full flex items-center justify-center p-4 text-center"
            >
              <div className="text-primary-foreground">
                <h3 className="font-bold text-lg mb-2">{banner.title}</h3>
                <p className="text-sm opacity-90">{banner.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <Button
          variant="ghost"
          size="sm"
          onClick={prevBanner}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextBanner}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentBanner 
                  ? 'bg-primary-foreground' 
                  : 'bg-primary-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;