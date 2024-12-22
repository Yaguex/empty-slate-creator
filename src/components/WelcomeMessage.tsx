import { motion } from "framer-motion";

export const WelcomeMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center space-y-4"
    >
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-gray-900">
        Welcome to Your New Project
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Start building something amazing with React, Tailwind, and modern web technologies.
      </p>
    </motion.div>
  );
};