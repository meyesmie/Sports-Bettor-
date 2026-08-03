'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className="p-2">☰</button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b p-4 space-y-3"
          >
            <Link href="/predictions" onClick={() => setOpen(false)}>Predictions</Link>
            <Link href="/premium" onClick={() => setOpen(false)}>Premium</Link>
            <Link href="/calendar" onClick={() => setOpen(false)}>Calendar</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
