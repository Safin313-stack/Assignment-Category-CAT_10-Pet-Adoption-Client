import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { FiMapPin, FiDollarSign, FiEye } from "react-icons/fi";

const PetCard = ({ pet, index = 0 }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAdoptClick = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/pets/${pet._id}`);
  };

  const speciesEmoji = {
    Dog: "🐕",
    Cat: "🐈",
    Bird: "🐦",
    Rabbit: "🐇",
    Fish: "🐠",
    Hamster: "🐹",
    Other: "🐾",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="card group overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-orange-50 dark:bg-gray-700">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = `https://api.dicebear.com/8.x/shapes/svg?seed=${pet.name}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Species Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-700 dark:text-gray-200 shadow-sm">
            {speciesEmoji[pet.species] || "🐾"} {pet.species}
          </span>
        </div>

        {/* Status */}
        {pet.status === "adopted" && (
          <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
            <span className="bg-gray-800 text-white font-bold text-sm px-4 py-2 rounded-full">
              Already Adopted
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-bold text-xl text-gray-800 dark:text-gray-100">
            {pet.name}
          </h3>
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
            {pet.age} yr{pet.age !== 1 ? "s" : ""}
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">
          {pet.breed}
        </p>

        <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mb-4">
          <FiMapPin size={11} />
          <span>{pet.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-bold">
            <FiDollarSign size={14} />
            <span>{pet.adoptionFee > 0 ? `${pet.adoptionFee} BDT` : "Free"}</span>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/pets/${pet._id}`}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-all"
            >
              <FiEye size={16} />
            </Link>
            <button
              onClick={handleAdoptClick}
              disabled={pet.status === "adopted"}
              className="btn-primary text-xs py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
            >
              Adopt Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PetCard;
