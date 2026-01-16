"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/magicui/theme-toggle";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "Inicio", href: "#inicio" },
  { name: "Hospedaje", href: "#hospedaje" },
  { name: "Restaurante", href: "#restaurante" },
  { name: "Sala", href: "#sala-reuniones" },
  { name: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Visibility logic: show on scroll up, hide on scroll down (except at top)
      if (currentScrollY < 10) {
        setIsVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false); // Scrolling down
          setIsMobileMenuOpen(false);
        } else {
          setIsVisible(true); // Scrolling up
        }
      }

      lastScrollY.current = currentScrollY;

      // Detect active section
      const sections = navItems.map((item) => item.href.substring(1));
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
            break;
          }
        }
      }

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavContent = ({ mobile = false }) => (
    <div
      className={cn(
        "flex items-center gap-1 p-2 rounded-full",
        "bg-background/70 backdrop-blur-2xl border border-white/10 shadow-2xl",
        mobile ? "w-full justify-between px-4 py-3" : "px-2 py-2"
      )}
    >
      {/* Brand / Logo (Mobile only) */}
      {mobile && (
        <Link
          href="#inicio"
          className="shrink-0 p-1 bg-primary/10 rounded-full"
        >
          <Image
            src="/images/LogoBrisasDelRio.png"
            alt="Logo"
            width={28}
            height={28}
            className="rounded-full"
          />
        </Link>
      )}

      {/* Navigation Links (Desktop only) */}
      {!mobile &&
        navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 overflow-hidden",
                isActive
                  ? "text-primary-foreground"
                  : "text-foreground/60 hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary shadow-lg shadow-primary/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}

      {/* Controls */}
      <div
        className={cn(
          "flex items-center gap-3",
          !mobile && "ml-2 pl-2 border-l border-white/10"
        )}
      >
        {mobile && (
          <a
            href="https://wa.me/50612345678"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#25D366] text-white active:scale-90 transition-transform shadow-lg shadow-[#25D366]/20"
            aria-label="WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
        )}
        <ThemeToggle />
        {mobile && (
          <>
            <div className="h-6 w-px bg-white/10" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-2 rounded-full text-foreground bg-white/5 active:scale-90 transition-transform"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Dock - Floating at Top */}
      <nav
        className={cn(
          "fixed top-6 left-0 right-0 z-50 pointer-events-none transition-all duration-500 hidden md:block",
          !isVisible && "-translate-y-24 opacity-0"
        )}
      >
        <div className="container mx-auto flex justify-center">
          <div className="pointer-events-auto">
            <NavContent />
          </div>
        </div>
      </nav>

      {/* Mobile Dock - Floating at Bottom */}
      <nav
        className={cn(
          "md:hidden fixed bottom-8 left-0 right-0 z-50 px-6 transition-all duration-500",
          !isVisible && "translate-y-24 opacity-0"
        )}
      >
        <div className="max-w-md mx-auto relative">
          {/* Mobile Overlay Menu */}
          <div
            className={cn(
              "absolute bottom-20 left-0 right-0 bg-background/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-4 shadow-2xl transition-all duration-500 origin-bottom",
              isMobileMenuOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-90 translate-y-10 pointer-events-none"
            )}
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex flex-col items-center justify-center py-4 rounded-2xl border transition-all",
                    activeSection === item.href.substring(1)
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "bg-white/5 text-foreground/80 border-transparent"
                  )}
                >
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <NavContent mobile />
          </div>
        </div>
      </nav>
    </>
  );
}
