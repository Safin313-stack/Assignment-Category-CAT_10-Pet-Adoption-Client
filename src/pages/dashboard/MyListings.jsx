import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../utils/axios";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import toast from "react-hot-toast";
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiUsers,
  FiX,
  FiCheck,
  FiXCircle,
} from "react-icons/fi";

const RequestsModal = ({ petId, petName, onClose }) => {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["petRequests", petId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/adoptions/pet/${petId}`);
      return res.data;
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosInstance.patch(`/adoptions/${id}/status`, { status }),
    onSuccess: (_, { status }) => {
      toast.success(`Request ${status}!`);
      queryClient.invalidateQueries(["petRequests", petId]);
      queryClient.invalidateQueries(["myListings"]);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed"),
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="font-display font-bold text-xl text-gray-800 dark:text-gray-100">
              Adoption Requests
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {petName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiX size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <LoadingSpinner size="md" />
          ) : requests.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-gray-500 dark:text-gray-400">
                No adoption requests yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="border border-gray-100 dark:border-gray-700 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {req.requesterName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {req.requesterEmail}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Pickup: {new Date(req.pickupDate).toLocaleDateString()}
                      </p>
                      {req.message && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 italic">
                          "{req.message}"
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`badge ${
                          req.status === "pending"
                            ? "badge-pending"
                            : req.status === "approved"
                            ? "badge-approved"
                            : "badge-rejected"
                        }`}
                      >
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>

                      {req.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              statusMutation.mutate({
                                id: req._id,
                                status: "approved",
                              })
                            }
                            disabled={statusMutation.isPending}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                          >
                            <FiCheck size={12} /> Approve
                          </button>
                          <button
                            onClick={() =>
                              statusMutation.mutate({
                                id: req._id,
                                status: "rejected",
                              })
                            }
                            disabled={statusMutation.isPending}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                          >
                            <FiXCircle size={12} /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const MyListings = () => {
  const queryClient = useQueryClient();
  const [selectedPet, setSelectedPet] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["myListings"],
    queryFn: async () => {
      const res = await axiosInstance.get("/pets/user/my-listings");
      return res.data;
    },
  });

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/pets/${id}`),
    onMutate: () => setDeleteLoading(true),
    onSuccess: () => {
      toast.success("Pet listing deleted");
      queryClient.invalidateQueries(["myListings"]);
    },
    onSettled: () => {
      setDeleteLoading(false);
      setDeleteTarget(null);
    },
    onError: () => {
      toast.error("Failed to delete listing");
      setDeleteLoading(false);
    },
  });

  const handleDelete = (pet) => {
    setDeleteTarget(pet);
  };

  if (isLoading) return <LoadingSpinner />;

  const { pets = [], stats = {} } = data || {};

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="section-title mb-1">My Listings 🐾</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your pet listings
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Listings", value: stats.total || 0, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" },
          { label: "Available", value: stats.available || 0, color: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300" },
          { label: "Adopted", value: stats.adopted || 0, color: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300" },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-2xl p-5 text-center`}>
            <p className="text-3xl font-display font-bold">{stat.value}</p>
            <p className="text-xs font-semibold mt-1 opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {pets.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="font-display font-bold text-xl text-gray-700 dark:text-gray-300 mb-2">
            No listings yet
          </h3>
          <Link to="/dashboard/add-pet" className="btn-primary inline-block mt-4">
            Add Your First Pet
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet, i) => (
            <motion.div
              key={pet._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card overflow-hidden group"
            >
              <div className="relative h-44 overflow-hidden bg-orange-50 dark:bg-gray-700">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = `https://api.dicebear.com/8.x/shapes/svg?seed=${pet.name}`;
                  }}
                />
                <div className="absolute top-2 right-2">
                  <span className={pet.status === "adopted" ? "badge-adopted" : "badge-available"}>
                    {pet.status === "adopted" ? "Adopted" : "Available"}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-display font-bold text-lg text-gray-800 dark:text-gray-100 mb-0.5">
                  {pet.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {pet.breed}
                </p>
                <p className="text-sm font-bold text-primary-600 dark:text-primary-400 mb-4">
                  {pet.adoptionFee > 0 ? `${pet.adoptionFee} BDT` : "Free"}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedPet({ id: pet._id, name: pet.name })}
                    className="flex items-center justify-center gap-1.5 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-lg text-xs font-bold hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors col-span-2"
                  >
                    <FiUsers size={13} /> View Requests
                  </button>
                  <Link
                    to={`/dashboard/update-pet/${pet._id}`}
                    className="flex items-center justify-center gap-1.5 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    <FiEdit2 size={13} /> Edit
                  </Link>
                  <Link
                    to={`/pets/${pet._id}`}
                    className="flex items-center justify-center gap-1.5 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiEye size={13} /> View
                  </Link>
                  <button
                    onClick={() => handleDelete(pet._id, pet.name)}
                    disabled={deleteMutation.isPending}
                    className="flex items-center justify-center gap-1.5 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors col-span-2"
                  >
                    <FiTrash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Pet Listing"
        message={`Delete listing for "${deleteTarget?.name}"? This cannot be undone.`}
        confirmText="Delete"
        onConfirm={() => deleteMutation.mutate(deleteTarget._id)}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
      />
      {/* Requests Modal */}
      <AnimatePresence>
        {selectedPet && (
          <RequestsModal
            petId={selectedPet.id}
            petName={selectedPet.name}
            onClose={() => setSelectedPet(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyListings;
// listings
// listings
