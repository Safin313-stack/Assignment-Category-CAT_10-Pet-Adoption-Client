import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/axios";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
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

  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const cancelMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/adoptions/${id}`),
    onMutate: () => setCancelLoading(true),
    onSuccess: () => {
      toast.success("Request cancelled");
      queryClient.invalidateQueries(["myRequests"]);
    },
    onSettled: () => {
      setCancelLoading(false);
      setCancelTarget(null);
    },
    onError: () => {
      toast.error("Failed to cancel request");
      setCancelLoading(false);
    },
  });

  const handleCancel = (request) => {
    setCancelTarget(request);
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
          <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <table className="min-w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Pet Name</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Request Date</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Pickup Date</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, i) => (
                  <motion.tr
                    key={req._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-t border-gray-100 dark:border-gray-800"
                  >
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">
                      {req.petName}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(req.requestDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(req.pickupDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`badge ${statusClass[req.status] || "badge-pending"}`}>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/pets/${req.petId}`}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          <FiEye size={14} /> View
                        </Link>
                        {req.status === "pending" && (
                          <button
                            type="button"
                            onClick={() => handleCancel(req)}
                            disabled={cancelMutation.isPending}
                            className="inline-flex items-center gap-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl text-xs font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                          >
                            <FiX size={14} /> Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(cancelTarget)}
        title="Cancel Adoption Request"
        message={`Cancel the request for "${cancelTarget?.petName}"?`}
        confirmText="Cancel Request"
        onConfirm={() => cancelMutation.mutate(cancelTarget._id)}
        onCancel={() => setCancelTarget(null)}
        loading={cancelLoading}
      />
    </div>
  );
};

export default MyRequests;
// requests
// requests
