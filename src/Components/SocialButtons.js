import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

const SocialButtons = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
      {[
        { icon: <FaTwitter />, url: "https://twitter.com", color: "hover:text-blue-400" },
        { icon: <FaFacebook />, url: "https://www.facebook.com/people/Gulli-Technology/100081831011339/", color: "hover:text-blue-600" },
        { icon: <FaInstagram />, url: "https://www.instagram.com", color: "hover:text-pink-500" },
        { icon: <FaYoutube />, url: "https://www.youtube.com/channel/UC31bjs-D9dKHm5jDfVogPsQ", color: "hover:text-red-500" },
        { icon: <FaLinkedin />, url: "https://www.linkedin.com", color: "hover:text-blue-700" },
      ].map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-gray-500 text-2xl p-1 rounded-full bg-white shadow-md transition duration-300 transform hover:scale-110 ${item.color}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialButtons;
