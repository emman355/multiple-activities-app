"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeInOut } from "@/lib/ui/motion";
import { LoadingSpinner } from "./loadingSpinner";
import clsx from "clsx";

interface LoadingOverlayProps {
  show: boolean;
  label?: string;
  className?: string;
  textColor?: string;
}

export const LoadingOverlay = ({ show, label = "Loading...", className, textColor }: LoadingOverlayProps) => {
  const finalClasses = clsx(
    'text-md font-medium',
    textColor
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          variants={fadeInOut}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <LoadingSpinner size={48} label={label} className={className} />
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
              className={finalClasses}
            >
              {label}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
