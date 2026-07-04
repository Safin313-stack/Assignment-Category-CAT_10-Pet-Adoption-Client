import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck } from "react-icons/fi";

const ConfirmDialog = ({ open, title, message, confirmText = "Confirm", onConfirm, onCancel, loading }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{message}</p>
              </div>
              <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200">
                <FiX size={20} />
              </button>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-950">
              <button
                onClick={onCancel}
                className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 rounded-2xl bg-primary-600 text-white px-4 py-3 text-sm font-semibold hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <>
                    <FiCheck size={16} /> {confirmText}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
