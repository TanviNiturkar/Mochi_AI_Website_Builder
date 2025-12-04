"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function RetroComputerFloat() {
  return (
    <motion.div
      animate={{ y: [-12, 12, -12] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src="/retro-computer.png"
        alt="Retro Computer"
        width={60}
        height={60}
        className="drop-shadow-xl"
      />
    </motion.div>
  );
}
