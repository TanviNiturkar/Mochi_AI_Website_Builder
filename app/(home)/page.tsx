"use client";

import RetroComputerIntro from "@/components/ui/RetroComputerIntro";
import { ProjectForm } from "@/modules/home/components/project-form";
import { ProjectsList } from "@/modules/home/components/projects-list";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full px-4">

      {/* Polka dots background (NEW) */}
      <div 
        className="
          absolute inset-0 -z-20 
          bg-[radial-gradient(#ffffff_1px,transparent_1px)] 
          [background-size:16px_16px]
        "
      />

      {/* Background gradient aesthetic */}
      <div className="absolute inset-0 -z-10 opacity-40 blur-3xl bg-gradient-to-br from-pistachio via-cactus to-sand" />

      <section className="space-y-8 pt-[22vh] pb-[12vh]">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-denim">
          Build Something with Mochi
        </h1>

        <p className="text-lg md:text-xl text-denim/70 text-center">
          Create beautiful apps with your matcha–inspired AI partner ✨
        </p>

        <div className="card max-w-3xl mx-auto w-full">
          <h2 className="text-2xl font-semibold text-denim mb-4">
            Start a New Project
          </h2>
          <ProjectForm />
        </div>
      </section>

      <ProjectsList />
    </div>
  );
}
