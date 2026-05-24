import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock, FiImage } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    else if (!/[A-Z]/.test(form.password))
      errs.password = "Password must have at least one uppercase letter";
    else if (!/[a-z]/.test(form.password))
      errs.password = "Password must have at least one lowercase letter";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.photoURL);
      toast.success("Account created! Welcome to PawsHome 🐾");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Welcome to PawsHome! 🐾");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google login failed");
    }
  };

  const fields = [
    { name: "name", label: "Full Name", icon: <FiUser />, type: "text", placeholder: "John Doe" },
    { name: "email", label: "Email", icon: <FiMail />, type: "email", placeholder: "you@example.com" },
    { name: "photoURL", label: "Photo URL", icon: <FiImage />, type: "url", placeholder: "https://..." },
    { name: "password", label: "Password", icon: <FiLock />, type: showPass ? "text" : "password", placeholder: "Min. 6 characters" },
    { name: "confirmPassword", label: "Confirm Password", icon: <FiLock />, type: showPass ? "text" : "password", placeholder: "Repeat password" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:to-gray-900 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl">🐾</span>
            <span className="font-display text-2xl font-bold text-primary-600 dark:text-primary-400">
              PawsHome
            </span>
          </Link>
          <h1 className="text-3xl font-display font-bold text-gray-800 dark:text-gray-100">
            Create Account
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Join thousands of pet lovers
          </p>
        </div>

        <div className="card p-8">
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all mb-6"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-gray-800 px-3 text-xs text-gray-500 dark:text-gray-400">
                or register with email
              </span>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  {field.label}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {field.icon}
                  </span>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.name !== "photoURL"}
                    placeholder={field.placeholder}
                    className={`input-field pl-10 ${
                      errors[field.name]
                        ? "border-red-400 focus:ring-red-400"
                        : ""
                    }`}
                  />
                  {(field.name === "password" || field.name === "confirmPassword") && (
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  )}
                </div>
                {errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
