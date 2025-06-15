"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });
import { useWindowSize } from "@react-hook/window-size";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Button } from "../../components/ui/button";
import dynamic from "next/dynamic";

export default function SuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [width, height] = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000); // confete por 10 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
      {showConfetti && <Confetti width={width} height={height} />}
      <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Obrigado pela sua compra!
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Seu pedido foi realizado com sucesso. Você receberá uma confirmação por
        e-mail em breve.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Voltar para a loja</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/orders">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Meus Pedidos
          </Link>
        </Button>
      </div>
    </div>
  );
}
