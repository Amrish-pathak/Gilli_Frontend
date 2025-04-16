import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  RefreshCcw,
  Cloud,
  Headset,
  ServerCog,
  FileBarChart,
  Lock,
  Globe,
} from "lucide-react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ScrollToTop from "../Components/ScrollToTop";

const tssFeatures = [
  {
    icon: <Cloud className="w-7 h-7 text-blue-600" />,
    title: "Remote Access",
    description:
      "Connect to your business data from anywhere using Tally.NET ID, enabling real-time decisions and work-from-anywhere flexibility.",
  },
  {
    icon: <RefreshCcw className="w-7 h-7 text-blue-600" />,
    title: "Continuous Product Updates",
    description:
      "Stay up to date with the latest releases, compliance updates, and features without any additional charges.",
  },
  {
    icon: <FileBarChart className="w-7 h-7 text-blue-600" />,
    title: "Online Data Synchronization",
    description:
      "Seamlessly sync data between head office and branches with real-time updates and accuracy.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-blue-600" />,
    title: "Business Data Security",
    description:
      "Enjoy end-to-end encrypted access, role-based security, and audit logs for complete control and transparency.",
  },
  {
    icon: <Headset className="w-7 h-7 text-blue-600" />,
    title: "Tally Support Centre",
    description:
      "Get in-product support for queries and issues from your Tally Partner or the Tally team.",
  },
  {
    icon: <ServerCog className="w-7 h-7 text-blue-600" />,
    title: "Banking & Payment Integration",
    description:
      "Simplify e-payments and reconcile bank statements easily with integrated banking features.",
  },
  {
    icon: <Lock className="w-7 h-7 text-blue-600" />,
    title: "Data Backup & Restore",
    description:
      "Securely backup your data to prevent loss and quickly restore it when needed using cloud-enabled tools.",
  },
  {
    icon: <Globe className="w-7 h-7 text-blue-600" />,
    title: "Web Access for Reports",
    description:
      "Access important reports like cash flow, stock summary, and more from any browser, anytime.",
  },
];


const TSSFeatures = () => {
  return (
    <>

      <Header />
      <div className="px-4 py-16 max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-center text-blue-700 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tally Software Services (TSS)
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          TSS is a subscription for a collection of value-added services that enhance your Tally
          Prime experience by enabling secure remote access, compliance updates, banking, and real-time
          support — all aimed at improving business continuity and efficiency.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tssFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-blue-800 mb-1">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Want to Activate or Renew TSS?
          </h4>
          <button className="bg-blue-700 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-800 transition">
            Contact Us Now
          </button>
        </motion.div>
      </div>
      <Footer />

    </>
  );
};

export default TSSFeatures;
