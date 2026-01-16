"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LightRays } from "@/components/magicui/light-rays";
import { Meteors } from "@/components/magicui/meteors";
import { TextAnimate } from "@/components/magicui/text-animate";
import { FadeIn } from "@/components/FadeIn";
import { benefits } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { WeatherWidget } from "@/components/WeatherWidget";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-black"
    >
      {/* Background Image - Immersive & High Contrast */}
      <div className="absolute inset-0 z-0 scale-105">
        <Image
          src="/images/Hospedaje.jpg"
          alt="Brisas del Río - Vista panorámica"
          fill
          className="object-cover opacity-60 md:opacity-75 transition-opacity duration-1000"
          priority
          quality={100}
        />

        {/* Dynamic Atmospheric Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-black/40 to-transparent hidden md:block" />

        {/* Animated Glows */}
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[140px] animate-pulse delay-1000" />
      </div>

      {/* FX Overlay */}
      <LightRays className="z-10 opacity-30 pointer-events-none" />

      {/* Content Container - Asymmetric & Modern */}
      <div className="relative z-20 container mx-auto px-6 sm:px-10 lg:px-20 pt-20 pb-32 md:py-0">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-20">
          {/* Main Content Column */}
          <div className="flex-1 text-center md:text-left space-y-8 max-w-3xl">
            {/* Meta Row: Logo + Weather */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center md:items-start gap-6"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl p-4 shadow-2xl shadow-white/5 rotate-3 hover:rotate-0 transition-transform duration-500 group">
                <Image
                  src="/images/LogoBrisasDelRio.png"
                  alt="Logo"
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="flex flex-col items-center md:items-start gap-3">
                <WeatherWidget />
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[10px] md:text-xs font-bold text-white/80 uppercase tracking-widest flex items-center gap-1.5">
                    <MapPin size={12} className="text-emerald-500" />
                    Jiménez, Costa Rica
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Headline with High Impact */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                <TextAnimate
                  animation="blurInUp"
                  by="word"
                  className="inline-block"
                >
                  Naturaleza, Sabor y Vida.
                </TextAnimate>
              </h1>
              <FadeIn delay={0.4}>
                <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed font-medium">
                  Un santuario tropical donde el murmullo del río acompaña tus
                  mejores momentos. Hospedaje único y gastronomía criolla de
                  autor.
                </p>
              </FadeIn>
            </div>

            {/* Primary Actions */}
            <FadeIn delay={0.6}>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                  asChild
                  size="xl"
                  className="w-full sm:w-auto h-16 px-10 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-2xl shadow-2xl shadow-primary/40 group transition-all active:scale-95"
                >
                  <Link href="#contacto" className="flex items-center gap-3">
                    Reservar Mi Estancia
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  size="xl"
                  className="w-full sm:w-auto h-16 px-10 text-white hover:bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm transition-all active:scale-95"
                >
                  <Link href="#hospedaje">Explorar Cabañas</Link>
                </Button>
              </div>
            </FadeIn>

            {/* Secondary Features Mini-Grid */}
            <div className="hidden lg:grid grid-cols-4 gap-6 pt-12 border-t border-white/5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex flex-col gap-3 group"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                    <benefit.icon className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs font-bold text-white/40 group-hover:text-white/80 transition-colors uppercase tracking-wider">
                    {benefit.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Complementary Visual Column (Mobile Hidden / Tablet+ Floating) */}
          <div className="hidden md:flex flex-1 justify-end items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-80 h-[500px] lg:w-96 lg:h-[600px] rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-700"
            >
              <Image
                src="/images/Restaurante.jpg"
                alt="Restaurante Brisas del Río"
                fill
                className="object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-white text-sm font-bold uppercase tracking-widest mb-2 opacity-50">
                  Sabor Local
                </p>
                <div className="h-px w-12 bg-primary mb-4" />
                <h3 className="text-white text-2xl font-black">
                  Gastronomía Criolla de Autor
                </h3>
              </div>
            </motion.div>

            {/* Visual Balance Element */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
