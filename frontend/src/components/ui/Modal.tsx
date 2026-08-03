'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Modal({ open, onClose, children, title }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{title}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
