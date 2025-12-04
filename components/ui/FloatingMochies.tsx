"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { easeInOut } from "framer-motion";

export default function FloatingMochies() {
  const floatAnim = {
    y: [-6, 6, -6],
  };

  const transition = {
    duration: 4,
    repeat: Infinity,
    ease: easeInOut,       // ✅ FIXED — using imported easing function
  };

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

      {/* 🌟 TOP LEFT */}
      <motion.div
        className="absolute top-8 left-8"
        animate={floatAnim}
        transition={transition}
      >
        <Image
          src="/mochi-fly.png"
          alt="mochi"
          width={55}
          height={55}
          className="opacity-70 drop-shadow-md"
        />
      </motion.div>

      {/* 🌟 TOP RIGHT */}
      <motion.div
        className="absolute top-12 right-10"
        animate={floatAnim}
        transition={transition}
      >
        <Image
          src="/mochi-fly.png"
          alt="mochi"
          width={55}
          height={55}
          className="opacity-70 drop-shadow-md"
        />
      </motion.div>

      {/* 🌟 BOTTOM LEFT */}
      <motion.div
        className="absolute bottom-16 left-10"
        animate={floatAnim}
        transition={transition}
      >
        <Image
          src="/retro-computer.png"
          alt="retro"
          width={60}
          height={60}
          className="opacity-70 drop-shadow-md"
        />
      </motion.div>

      {/* 🌟 BOTTOM RIGHT */}
      <motion.div
        className="absolute bottom-20 right-12"
        animate={floatAnim}
        transition={transition}
      >
        <Image
          src="/mochi-sleep.png"
          alt="sleeping mochi"
          width={65}
          height={65}
          className="opacity-80 drop-shadow-md"
        />
      </motion.div>

    </div>
  );
}
