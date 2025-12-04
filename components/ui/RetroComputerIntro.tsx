"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function RetroComputerIntro() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-fit mx-auto">
      
      {/* Floating computer */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <Image
          src="/retro-computer.png"
          alt="Retro Computer"
          width={110}
          height={110}
          className="drop-shadow-lg mx-auto"
        />

        {/* Centered text!! */}
        {showText && (
          <motion.div
            className="absolute left-1/2 top-[47px] -translate-x-1/2 text-[13px] font-mono text-green-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: "linear" }}
              className="block overflow-hidden whitespace-nowrap border-r border-green-700"
            >
              Welcome to Mochi
            </motion.span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
