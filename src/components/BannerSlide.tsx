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
    <div className="relative w-full h-96 rounded-xl overflow-hidden bg-gradient-to-b from-primary via-primary/90 to-accent shadow-lg" style={{ aspectRatio: '9/16', height: '400px' }}>
      <div className="relative w-full h-full">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="min-w-full h-full flex flex-col items-center justify-center p-8 text-center relative"
            >
              <div className="text-primary-foreground z-10">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-primary-foreground rounded-full"></div>
                  </div>
                </div>
                <h3 className="font-bold text-2xl mb-4 leading-tight">{banner.title}</h3>
                <p className="text-lg opacity-90 leading-relaxed max-w-xs">{banner.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBanner 
                  ? 'bg-primary-foreground scale-110' 
                  : 'bg-primary-foreground/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;