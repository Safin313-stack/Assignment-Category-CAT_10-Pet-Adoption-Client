import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/axios";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";
import { FiEye, FiX, FiCalendar, FiClock } from "react-icons/fi";

const MyRequests = () => {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["myRequests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/adoptions/my-requests");
      return res.data;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/adoptions/${id}`),
    onSuccess: () => {
      toast.success("Request cancelled");
      queryClient.invalidateQueries(["myRequests"]);
    },
    onError: () => toast.error("Failed to cancel request"),
  });

  const handleCancel = (id) => {
    if (confirm("Cancel this adoption request?")) {
      cancelMutation.mutate(id);
    }
  };

  const statusClass = {
    pending: "badge-pending",
    approved: "badge-approved",
    rejected: "badge-rejected",
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-950 dark:to-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="section-title mb-1">My Adoption Requests 📋</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track all your adoption requests
          </p>
        </motion.div>

        {requests.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="font-display font-bold text-xl text-gray-700 dark:text-gray-300 mb-2">
              No requests yet
            </h3>
            <p className="text-gray-400 mb-6">
              Browse pets and submit your first adoption request!
            </p>
            <Link to="/all-pets" className="btn-primary inline-block">
              Browse Pets
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req, i) => (
              <motion.div
                key={req._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display font-bold text-lg text-gray-800 dark:text-gray-100">
                        {req.petName}
                      </h3>
                      <span className={statusClass[req.status] || "badge bg-gray-100 text-gray-600"}>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <FiClock size={11} />
                        Requested: {new Date(req.requestDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiCalendar size={11} />
                        Pickup: {new Date(req.pickupDate).toLocaleDateString()}
                      </span>
                    </div>
                    {req.message && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                        "{req.message}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={`/pets/${req.petId}`}
                      className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <FiEye size={14} /> View
                    </Link>
                    {req.status === "pending" && (
                      <button
                        onClick={() => handleCancel(req._id)}
                        disabled={cancelMutation.isPending}
                        className="flex items-center gap-1.5 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      >
                        <FiX size={14} /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
