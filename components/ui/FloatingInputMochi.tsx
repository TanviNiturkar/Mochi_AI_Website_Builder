"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  src: string;
  className?: string;
  size?: number;
}

export const FloatingInputMochi = ({ src, className = "", size = 38 }: Props) => {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{ y: [-6, 6, -6] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image
        src={src}
        alt="mochi"
        width={size}
        height={size}
        className="opacity-70 drop-shadow-sm"
      />
    </motion.div>
  );
};
