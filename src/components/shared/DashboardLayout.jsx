import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Navbar from "./Navbar";
import {
  FiPlusCircle,
  FiList,
  FiMenu,
  FiX,
  FiHome,
} from "react-icons/fi";

const sidebarLinks = [
  { to: "/dashboard/add-pet", icon: <FiPlusCircle size={18} />, label: "Add Pet" },
  { to: "/dashboard/my-listings", icon: <FiList size={18} />, label: "My Listings" },
  { to: "/my-requests", icon: <FiUsers size={18} />, label: "My Requests" },
];

const Sidebar = ({ onClose }) => (
  <aside className="w-64 min-h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col">
    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl">🐾</span>
        <span className="font-display font-bold text-primary-600 dark:text-primary-400">
          Dashboard
        </span>
      </Link>
    </div>

    <nav className="flex-1 p-4 space-y-1">
      {sidebarLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              isActive
                ? "bg-primary-500 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          {link.icon}
          {link.label}
        </NavLink>
      ))}
    </nav>

    <div className="p-4 border-t border-gray-100 dark:border-gray-800">
      <Link
        to="/"
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
      >
        <FiHome size={18} /> Back to Site
      </Link>
    </div>
  </aside>
);

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
              />
              <motion.div
                initial={{ x: -264 }}
                animate={{ x: 0 }}
                exit={{ x: -264 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed left-0 top-0 h-full z-50 md:hidden"
              >
                <Sidebar onClose={() => setSidebarOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-orange-50/50 dark:bg-gray-950">
          {/* Mobile toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mb-4 p-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <FiMenu size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
