import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐾</span>
              <span className="font-display text-xl font-bold text-white">
                PawsHome
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting loving families with pets in need. Every pet deserves a
              forever home.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: <FaFacebook />, href: "#" },
                { icon: <FaTwitter />, href: "#" },
                { icon: <FaInstagram />, href: "#" },
                { icon: <FaYoutube />, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors duration-200 text-gray-400 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "All Pets", to: "/all-pets" },
                { label: "Add a Pet", to: "/dashboard/add-pet" },
                { label: "My Requests", to: "/my-requests" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pet Types */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">
              Pet Types
            </h4>
            <ul className="space-y-2">
              {["🐕 Dogs", "🐈 Cats", "🐦 Birds", "🐇 Rabbits", "🐠 Fish", "🐹 Hamsters"].map(
                (pet) => (
                  <li key={pet}>
                    <span className="text-sm text-gray-400">{pet}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMapPin className="mt-0.5 text-primary-400 shrink-0" />
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiPhone className="text-primary-400 shrink-0" />
                +880 1700-000000
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiMail className="text-primary-400 shrink-0" />
                hello@pawshome.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} PawsHome. All rights reserved.</p>
          <p>Built with ❤️ for every pet that needs a home</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// footer
// footer
