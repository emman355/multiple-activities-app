"use client";

import { motion } from "framer-motion";
import { fadeInOut, spin } from "@/lib/ui/motion";
import clsx from "clsx";

interface LoadingSpinnerProps {
  size?: number;   // diameter in px
  label?: string; // accessible label
  className?: string
}



export const LoadingSpinner = ({
  className,
  size = 32,
  label = "Loading...",
}: LoadingSpinnerProps) => {
  const finalClasses = clsx(
  className,
  'block rounded-full border-4 border-t-transparent border-blue-900'
);
  return (
    <motion.div
      className="flex items-center justify-center"
      variants={fadeInOut}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      role="status"
      aria-label={label}
    >
      <motion.span
        className={finalClasses}
        style={{
          width: size,
          height: size,
        }}
        variants={spin}
        animate="animate"
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
      />
    </motion.div>
  );
};
