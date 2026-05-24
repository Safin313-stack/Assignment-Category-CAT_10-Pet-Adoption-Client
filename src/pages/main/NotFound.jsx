import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-950 dark:to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-8xl mb-6"
        >
          🐾
        </motion.div>
        <h1 className="text-8xl font-display font-extrabold text-primary-200 dark:text-primary-900 mb-2">
          404
        </h1>
        <h2 className="text-3xl font-display font-bold text-gray-800 dark:text-gray-100 mb-3">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Looks like this page ran away like a mischievous puppy. Let's get you
          back on track!
        </p>
        <Link to="/" className="btn-primary px-8 py-3.5 text-base">
          Back to Home 🏠
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
