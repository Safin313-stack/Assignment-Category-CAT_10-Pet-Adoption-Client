import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axios";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";
import {
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiHeart,
  FiShield,
  FiAlertCircle,
} from "react-icons/fi";

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");

  const { data: pet, isLoading } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/pets/${id}`);
      return res.data;
    },
  });

  const adoptMutation = useMutation({
    mutationFn: (data) => axiosInstance.post("/adoptions", data),
    onSuccess: () => {
      toast.success("Adoption request submitted! 🐾");
      setPickupDate("");
      setMessage("");
      queryClient.invalidateQueries(["pet", id]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to submit request");
    },
  });

  const handleAdopt = (e) => {
    e.preventDefault();
    if (!pickupDate) return toast.error("Please select a pickup date");

    adoptMutation.mutate({
      petId: id,
      petName: pet.name,
      pickupDate,
      message,
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (!pet)
    return (
      <div className="text-center py-20 text-gray-500">Pet not found.</div>
    );

  const isOwner = user?.email === pet.ownerEmail;
  const isAdopted = pet.status === "adopted";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-5 gap-10">
        {/* LEFT - Pet Info (3/5) */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card overflow-hidden"
          >
            <div className="relative h-80 sm:h-96 bg-orange-50 dark:bg-gray-700">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/8.x/shapes/svg?seed=${pet.name}`;
                }}
              />
              {isAdopted && (
                <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                  <span className="bg-gray-800 text-white font-bold text-lg px-6 py-3 rounded-2xl">
                    Already Adopted
                  </span>
                </div>
              )}
            </div>

            <div className="p-7">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-display font-bold text-gray-800 dark:text-gray-100">
                    {pet.name}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {pet.breed} · {pet.species}
                  </p>
                </div>
                <span
                  className={`badge ${isAdopted ? "badge-adopted" : "badge-available"}`}
                >
                  {isAdopted ? "Adopted" : "Available"}
                </span>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { icon: <FiCalendar size={14} />, label: "Age", value: `${pet.age} year(s)` },
                  { icon: <span className="text-xs">⚥</span>, label: "Gender", value: pet.gender },
                  { icon: <FiMapPin size={14} />, label: "Location", value: pet.location },
                  { icon: <FiDollarSign size={14} />, label: "Fee", value: pet.adoptionFee > 0 ? `${pet.adoptionFee} BDT` : "Free" },
                  { icon: <FiHeart size={14} />, label: "Health", value: pet.healthStatus },
                  { icon: <FiShield size={14} />, label: "Vaccinated", value: pet.vaccinationStatus },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {pet.description && (
                <div>
                  <h3 className="font-display font-bold text-gray-800 dark:text-gray-100 mb-2">
                    About {pet.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {pet.description}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* RIGHT - Adoption Form (2/5) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="card p-7 sticky top-24">
            <h2 className="font-display font-bold text-xl text-gray-800 dark:text-gray-100 mb-6">
              Submit Adoption Request 🐾
            </h2>

            {isAdopted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">😢</div>
                <p className="font-semibold text-gray-600 dark:text-gray-300">
                  This pet has already been adopted.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Check out other available pets!
                </p>
              </div>
            ) : isOwner ? (
              <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <FiAlertCircle className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  You cannot adopt your own pet listing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAdopt} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Pet Name
                  </label>
                  <input
                    type="text"
                    value={pet.name}
                    readOnly
                    className="input-field bg-gray-50 dark:bg-gray-700 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="input-field bg-gray-50 dark:bg-gray-700 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input-field bg-gray-50 dark:bg-gray-700 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Preferred Pickup Date *
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Message (optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell the owner why you'd be a great fit..."
                    rows={4}
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={adoptMutation.isPending}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
                >
                  {adoptMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiHeart /> Adopt {pet.name}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PetDetails;
// petdetails
// petdetails
