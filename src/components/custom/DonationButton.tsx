'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function DonationButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          aria-label="Contribuir com o projeto"
        >
          <Heart className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" />
          <span className="text-sm font-medium hidden sm:inline">Contribuir</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Contribua com o Projeto 💖
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Contribua o quanto puder para esse projeto crescer
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/0e1bdd6c-2bec-49d5-80cf-1d85ace0bd93.jpg"
              alt="QR Code PIX para doação"
              className="w-64 h-64 object-contain"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            Escaneie o QR Code acima com seu aplicativo de banco para fazer uma contribuição via PIX
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
