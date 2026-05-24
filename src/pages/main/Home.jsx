import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import PetCard from "../../components/pets/PetCard";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import {
  FiHeart,
  FiShield,
  FiSmile,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Home = () => {
  const { data: featuredPets = [], isLoading } = useQuery({
    queryKey: ["featuredPets"],
    queryFn: async () => {
      const res = await axiosInstance.get("/pets/featured");
      return res.data;
    },
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200 dark:bg-primary-900/30 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-200 dark:bg-amber-900/20 rounded-full blur-3xl opacity-40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text */}
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              >
                🐾 Bangladesh's Favorite Pet Adoption Platform
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-gray-800 dark:text-gray-100 leading-tight mb-6"
              >
                Find Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-amber-500">
                  Perfect
                </span>{" "}
                Furry Friend
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg"
              >
                Thousands of loving pets are waiting for their forever home.
                Browse, connect, and give a deserving animal the life they
                deserve.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/all-pets"
                  className="btn-primary flex items-center gap-2 text-base px-8 py-3.5"
                >
                  Adopt Now <FiArrowRight />
                </Link>
                <Link to="/dashboard/add-pet" className="btn-secondary text-base px-8 py-3.5">
                  List a Pet
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="flex gap-8 mt-12"
              >
                {[
                  { label: "Pets Listed", value: "500+" },
                  { label: "Happy Adoptions", value: "1.2k+" },
                  { label: "Loving Homes", value: "800+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right - Floating Pet Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    emoji: "🐕",
                    name: "Buddy",
                    breed: "Golden Retriever",
                    age: "2 yrs",
                    color: "bg-orange-100 dark:bg-orange-900/30",
                  },
                  {
                    emoji: "🐈",
                    name: "Luna",
                    breed: "Persian Cat",
                    age: "1 yr",
                    color: "bg-purple-100 dark:bg-purple-900/30",
                  },
                  {
                    emoji: "🐇",
                    name: "Snowy",
                    breed: "Dutch Rabbit",
                    age: "8 mo",
                    color: "bg-blue-100 dark:bg-blue-900/30",
                  },
                  {
                    emoji: "🐦",
                    name: "Kiwi",
                    breed: "Cockatiel",
                    age: "3 yrs",
                    color: "bg-green-100 dark:bg-green-900/30",
                  },
                ].map((pet, i) => (
                  <motion.div
                    key={pet.name}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`${pet.color} rounded-2xl p-5 shadow-lg`}
                  >
                    <div className="text-4xl mb-3">{pet.emoji}</div>
                    <p className="font-display font-bold text-gray-800 dark:text-gray-100">
                      {pet.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {pet.breed}
                    </p>
                    <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-1">
                      {pet.age}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-3">Featured Pets 🐾</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Meet some of our adorable pets looking for their forever homes
          </p>
        </motion.div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPets.map((pet, i) => (
              <PetCard key={pet._id} pet={pet} index={i} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/all-pets"
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Pets <FiArrowRight />
          </Link>
        </motion.div>
      </section>

      {/* Why Adopt */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title mb-3">Why Adopt? 💝</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Adopting a pet changes two lives — yours and theirs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiHeart className="text-red-500" size={32} />,
                title: "Save a Life",
                desc: "Every adoption gives a pet a second chance at a happy, loving life.",
                bg: "bg-red-50 dark:bg-red-900/10",
              },
              {
                icon: <FiShield className="text-blue-500" size={32} />,
                title: "Healthy Pets",
                desc: "All pets are vaccinated and health-checked before listing.",
                bg: "bg-blue-50 dark:bg-blue-900/10",
              },
              {
                icon: <FiSmile className="text-green-500" size={32} />,
                title: "Unconditional Love",
                desc: "Pets bring joy, reduce stress, and become lifelong companions.",
                bg: "bg-green-50 dark:bg-green-900/10",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${item.bg} rounded-2xl p-8 text-center`}
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex items-center justify-center mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-gray-800 dark:text-gray-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-3">Success Stories 🌟</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Real families, real love, real change
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Rafi & Bruno",
              story:
                "Bruno was shy when we first met. Now he's the soul of our home. Best decision of my life!",
              rating: 5,
              location: "Dhaka",
              emoji: "🐕",
            },
            {
              name: "Nadia & Mimi",
              story:
                "Adopted Mimi during a tough time. She instantly made everything better with her purring.",
              rating: 5,
              location: "Chittagong",
              emoji: "🐈",
            },
            {
              name: "Tanvir & Kiwi",
              story:
                "My kids were overjoyed! Kiwi sings every morning. The process was so smooth.",
              rating: 5,
              location: "Sylhet",
              emoji: "🐦",
            },
          ].map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-6"
            >
              <div className="text-4xl mb-4">{story.emoji}</div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: story.rating }).map((_, i) => (
                  <FiStar
                    key={i}
                    size={14}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm italic leading-relaxed mb-4">
                "{story.story}"
              </p>
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">
                  {story.name}
                </p>
                <p className="text-xs text-gray-400">{story.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pet Care Tips */}
      <section className="py-20 bg-gray-900 dark:bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title text-white mb-3">Pet Care Tips 🌿</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Help your new pet adjust to their forever home
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: "🍖", tip: "Feed a balanced diet suitable for their species and age." },
              { emoji: "🏃", tip: "Exercise daily — walks, play sessions, and enrichment activities." },
              { emoji: "🩺", tip: "Schedule regular vet checkups for vaccinations and health monitoring." },
              { emoji: "❤️", tip: "Give them time and patience to adjust to their new home." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800 dark:bg-gray-900 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <p className="text-gray-300 text-sm leading-relaxed">{item.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-500 to-amber-500 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-display font-bold mb-4">
            Ready to Find Your Pet? 🐾
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Hundreds of pets are waiting to meet you. Start your adoption
            journey today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/all-pets"
              className="bg-white text-primary-600 font-bold px-8 py-3.5 rounded-xl hover:bg-primary-50 transition-all shadow-lg"
            >
              Browse All Pets
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all"
            >
              Create Account
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
