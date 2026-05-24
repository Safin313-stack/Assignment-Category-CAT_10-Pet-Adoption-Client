import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/axios";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const SPECIES_LIST = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Hamster", "Other"];
const HEALTH_OPTIONS = ["Excellent", "Good", "Fair", "Needs Care"];
const VAC_OPTIONS = ["Fully Vaccinated", "Partially Vaccinated", "Not Vaccinated", "Unknown"];
const GENDER_OPTIONS = ["Male", "Female"];

const UpdatePet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "", species: "", breed: "", age: "", gender: "",
    image: "", healthStatus: "", vaccinationStatus: "",
    location: "", adoptionFee: "", description: "",
  });

  const { data: pet, isLoading } = useQuery({
    queryKey: ["pet", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/pets/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (pet) {
      setForm({
        name: pet.name || "",
        species: pet.species || "",
        breed: pet.breed || "",
        age: pet.age || "",
        gender: pet.gender || "",
        image: pet.image || "",
        healthStatus: pet.healthStatus || "",
        vaccinationStatus: pet.vaccinationStatus || "",
        location: pet.location || "",
        adoptionFee: pet.adoptionFee || "",
        description: pet.description || "",
      });
    }
  }, [pet]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateMutation = useMutation({
    mutationFn: (data) => axiosInstance.put(`/pets/${id}`, data),
    onSuccess: () => {
      toast.success("Pet listing updated! 🐾");
      navigate("/dashboard/my-listings");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Update failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      ...form,
      age: Number(form.age),
      adoptionFee: Number(form.adoptionFee),
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="section-title mb-1">Update Pet Listing ✏️</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Edit details for <span className="font-semibold text-primary-600 dark:text-primary-400">{pet?.name}</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Classification */}
          <div>
            <h3 className="font-display font-bold text-gray-700 dark:text-gray-300 mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
              Pet Classification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Species *</label>
                <select name="species" value={form.species} onChange={handleChange} required className="input-field">
                  <option value="">Select species</option>
                  {SPECIES_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Gender *</label>
                <select name="gender" value={form.gender} onChange={handleChange} required className="input-field">
                  <option value="">Select gender</option>
                  {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Health Status *</label>
                <select name="healthStatus" value={form.healthStatus} onChange={handleChange} required className="input-field">
                  <option value="">Select health</option>
                  {HEALTH_OPTIONS.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Vaccination */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Vaccination Status *</label>
            <select name="vaccinationStatus" value={form.vaccinationStatus} onChange={handleChange} required className="input-field">
              <option value="">Select vaccination status</option>
              {VAC_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          {/* Basic Info */}
          <div>
            <h3 className="font-display font-bold text-gray-700 dark:text-gray-300 mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "name", label: "Pet Name *", type: "text", placeholder: "e.g. Bruno" },
                { name: "breed", label: "Breed *", type: "text", placeholder: "e.g. Golden Retriever" },
                { name: "age", label: "Age (years) *", type: "number", placeholder: "2" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">{field.label}</label>
                  <input type={field.type} name={field.name} value={form[field.name]} onChange={handleChange}
                    placeholder={field.placeholder} required min={field.type === "number" ? 0 : undefined} className="input-field" />
                </div>
              ))}
            </div>
          </div>

          {/* Other Details */}
          <div>
            <h3 className="font-display font-bold text-gray-700 dark:text-gray-300 mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
              Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "location", label: "Location *", type: "text", placeholder: "e.g. Dhaka" },
                { name: "adoptionFee", label: "Adoption Fee (BDT)", type: "number", placeholder: "0 for free" },
                { name: "image", label: "Image URL *", type: "url", placeholder: "https://i.ibb.co/..." },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">{field.label}</label>
                  <input type={field.type} name={field.name} value={form[field.name]} onChange={handleChange}
                    placeholder={field.placeholder} required={field.name !== "adoptionFee"} className="input-field" />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              placeholder="Tell potential adopters about this pet..." rows={4} className="input-field resize-none" />
          </div>

          {/* Owner Email readonly */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Owner Email</label>
            <input type="email" value={user?.email || ""} readOnly className="input-field bg-gray-50 dark:bg-gray-700 cursor-not-allowed" />
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={() => navigate("/dashboard/my-listings")}
              className="btn-secondary flex-1 py-3.5">
              Cancel
            </button>
            <button type="submit" disabled={updateMutation.isPending}
              className="btn-primary flex-1 py-3.5 flex items-center justify-center gap-2">
              {updateMutation.isPending ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Updating...</>
              ) : "Update Listing ✏️"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdatePet;
