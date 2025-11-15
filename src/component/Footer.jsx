import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-8" role="contentinfo">
      <div className="container mx-auto flex flex-col items-center">
        {/* Social Links */}
        <nav aria-label="Social Media Links" className="flex space-x-4 mb-4">
          <a
            href="https://github.com/Rajan21252125"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Rajan Gupta's GitHub Profile"
          >
            <FaGithub className="text-2xl hover:text-green-500" />
          </a>
          <a
            href="https://linkedin.com/in/rajan-gupta-141991215/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Rajan Gupta's LinkedIn Profile"
          >
            <FaLinkedin className="text-2xl hover:text-green-500" />
          </a>
          <a
            href="mailto:grajan408@gmail.com"
            aria-label="Send an email to Rajan Gupta"
          >
            <FaEnvelope className="text-2xl hover:text-green-500" />
          </a>
        </nav>

        {/* Footer Text */}
        <p className="text-sm mb-2">© 2024 Rajan Gupta. All rights reserved.</p>
        <p className="text-sm">
          Built with ❤️ using <span className="font-semibold">React</span> and{" "}
          <span className="font-semibold">Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
