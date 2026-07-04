import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:to-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="section-title mb-2">Profile</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Manage your account details and logout safely.
              </p>
            </div>
            <button
              disabled={loading}
              onClick={handleLogout}
              className="btn-secondary px-5 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing out..." : "Logout"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2">
            <div className="rounded-3xl bg-gray-50 dark:bg-gray-900 p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3">
                Display Name
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {user?.displayName || "No name set"}
              </p>
            </div>
            <div className="rounded-3xl bg-gray-50 dark:bg-gray-900 p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3">
                Email
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-gray-50 dark:bg-gray-900 p-6 mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3">
              Account Info
            </p>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <p>
                Firebase UID: <span className="font-mono text-xs text-gray-500 dark:text-gray-400">{user?.uid}</span>
              </p>
              <p>
                Provider: <span className="font-semibold">{user?.providerData?.[0]?.providerId || "firebase"}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
