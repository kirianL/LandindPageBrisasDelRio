"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppButton() {
  const phoneNumber = "50612345678"; // Placeholder
  const message =
    "Hola, me gustaría obtener más información sobre Brisas del Río";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="hidden md:flex fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform bg-[#25D366] hover:bg-[#20BA5A] text-white"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={24} />
    </Button>
  );
}
