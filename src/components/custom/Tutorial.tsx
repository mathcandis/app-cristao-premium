"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, MousePointer2 } from "lucide-react";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetSelector?: string;
  position: "top" | "bottom" | "left" | "right" | "center";
  action: "click" | "view";
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "Bem-vindo ao Fé Digital! 🙏",
    description: "Vamos fazer um tour rápido pelas principais funcionalidades do app. Clique no botão destacado para continuar.",
    position: "center",
    action: "view",
  },
  {
    id: "profile",
    title: "Menu de Perfil",
    description: "Clique no avatar para acessar seu perfil, configurações e assinaturas.",
    targetSelector: "[data-tutorial='profile-menu']",
    position: "bottom",
    action: "click",
  },
  {
    id: "notifications",
    title: "Notificações",
    description: "Clique no sino para ver suas notificações e mensagens importantes.",
    targetSelector: "[data-tutorial='notifications']",
    position: "bottom",
    action: "click",
  },
  {
    id: "daily-verse",
    title: "Versículo Diário",
    description: "Clique aqui para configurar o versículo diário na tela de bloqueio do seu celular.",
    targetSelector: "[data-tutorial='daily-verse']",
    position: "top",
    action: "click",
  },
  {
    id: "subscriptions",
    title: "Assinaturas Premium",
    description: "Clique em um dos planos para desbloquear recursos exclusivos.",
    targetSelector: "[data-tutorial='subscriptions']",
    position: "top",
    action: "click",
  },
  {
    id: "finish",
    title: "Tudo Pronto! ✨",
    description: "Você está pronto para começar sua jornada espiritual. Explore o app e que Deus abençoe seu caminho!",
    position: "center",
    action: "view",
  },
];

export default function Tutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Verifica se é a primeira vez do usuário
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      // Aguarda um pouco para garantir que a página carregou
      setTimeout(() => setIsOpen(true), 1000);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      const step = tutorialSteps[currentStep];
      if (step.targetSelector) {
        const element = document.querySelector(step.targetSelector) as HTMLElement;
        setHighlightedElement(element);
        
        // Scroll suave até o elemento
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          
          // Calcula posição do cursor para apontar para o centro do elemento
          const rect = element.getBoundingClientRect();
          setCursorPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }
      } else {
        setHighlightedElement(null);
      }
    }
  }, [currentStep, isOpen]);

  // Listener para cliques no elemento destacado
  useEffect(() => {
    if (!highlightedElement || tutorialSteps[currentStep].action !== "click") return;

    const handleElementClick = (e: MouseEvent) => {
      e.stopPropagation();
      handleNext();
    };

    highlightedElement.addEventListener("click", handleElementClick, true);
    
    return () => {
      highlightedElement.removeEventListener("click", handleElementClick, true);
    };
  }, [highlightedElement, currentStep]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setHighlightedElement(null);
    localStorage.setItem("hasSeenTutorial", "true");
  };

  // Função para reiniciar o tutorial (pode ser chamada de qualquer lugar)
  const restartTutorial = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  // Expor função globalmente para poder reiniciar o tutorial
  useEffect(() => {
    (window as any).restartTutorial = restartTutorial;
    return () => {
      delete (window as any).restartTutorial;
    };
  }, []);

  if (!isOpen) return null;

  const step = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  // Calcula posição do tooltip baseado no elemento destacado
  const getTooltipPosition = () => {
    if (!highlightedElement || step.position === "center") {
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
    }

    const rect = highlightedElement.getBoundingClientRect();
    const offset = 20;

    switch (step.position) {
      case "bottom":
        return {
          top: `${rect.bottom + offset}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: "translateX(-50%)",
        };
      case "top":
        return {
          top: `${rect.top - offset}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: "translate(-50%, -100%)",
        };
      case "left":
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.left - offset}px`,
          transform: "translate(-100%, -50%)",
        };
      case "right":
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right + offset}px`,
          transform: "translateY(-50%)",
        };
      default:
        return {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        };
    }
  };

  return (
    <>
      {/* Overlay escuro com blur - bloqueia toda interação exceto elemento destacado */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998] transition-opacity duration-300"
        style={{ pointerEvents: "all" }}
      />

      {/* Spotlight no elemento destacado */}
      {highlightedElement && (
        <>
          {/* Área clicável transparente sobre o elemento */}
          <div
            className="fixed z-[10001] transition-all duration-300 cursor-pointer"
            style={{
              top: `${highlightedElement.getBoundingClientRect().top}px`,
              left: `${highlightedElement.getBoundingClientRect().left}px`,
              width: `${highlightedElement.getBoundingClientRect().width}px`,
              height: `${highlightedElement.getBoundingClientRect().height}px`,
              pointerEvents: step.action === "click" ? "all" : "none",
            }}
          />
          
          {/* Highlight visual do elemento */}
          <div
            className="fixed z-[9999] pointer-events-none transition-all duration-300 animate-pulse"
            style={{
              top: `${highlightedElement.getBoundingClientRect().top - 8}px`,
              left: `${highlightedElement.getBoundingClientRect().left - 8}px`,
              width: `${highlightedElement.getBoundingClientRect().width + 16}px`,
              height: `${highlightedElement.getBoundingClientRect().height + 16}px`,
              boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.8), 0 0 40px 10px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(59, 130, 246, 0.2)",
              borderRadius: "16px",
              border: "3px solid rgba(59, 130, 246, 0.9)",
            }}
          />

          {/* Cursor animado apontando para o elemento */}
          {step.action === "click" && (
            <div
              className="fixed z-[10002] pointer-events-none transition-all duration-500 animate-bounce"
              style={{
                top: `${cursorPosition.y - 12}px`,
                left: `${cursorPosition.x - 12}px`,
              }}
            >
              <MousePointer2 
                className="w-8 h-8 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
                fill="currentColor"
              />
              {/* Efeito de clique pulsante */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-blue-400 animate-ping opacity-75" />
            </div>
          )}
        </>
      )}

      {/* Tooltip do tutorial */}
      <div
        className="fixed z-[10000] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 transition-all duration-300 border-2 border-blue-500/30"
        style={{
          ...getTooltipPosition(),
          pointerEvents: step.action === "view" ? "all" : "none",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {step.title}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors pointer-events-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Descrição */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {step.description}
        </p>

        {/* Barra de progresso */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span>Passo {currentStep + 1} de {tutorialSteps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Instruções de ação */}
        {step.action === "click" && highlightedElement && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" />
              Clique no elemento destacado para continuar
            </p>
          </div>
        )}

        {/* Botão de próximo (apenas para steps sem ação de click) */}
        {step.action === "view" && (
          <div className="flex items-center justify-between gap-3 pointer-events-auto">
            <button
              onClick={handleClose}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
            >
              Pular Tutorial
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
            >
              {currentStep === tutorialSteps.length - 1 ? "Finalizar" : "Próximo"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
