import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-8">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          <a href="https://github.com/Rajan21252125" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl hover:text-green-500" />
          </a>
          <a href="https://linkedin.com/in/rajan-gupta-141991215/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-green-500" />
          </a>
          <a href="mailto:grajan408@gmail.com">
            <FaEnvelope className="text-2xl hover:text-green-500" />
          </a>
        </div>
        <p className="text-sm mb-2">© 2024 Rajan Gupta. All rights reserved.</p>
        <p className="text-sm">Built with ❤️ using React and Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;
