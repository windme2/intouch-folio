import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 relative bg-background dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container px-4 md:px-8">
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-6 md:gap-0">
          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium text-center md:text-left break-words">
            © {currentYear} Intouch Charoenphon. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex space-x-3">
            <a
              href="https://github.com/windme2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md group"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 transition-all duration-300 group-hover:scale-110" />
            </a>
            <a
              href="https://linkedin.com/in/intouch-charoenphon-a89b21207/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-all duration-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-md group"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 transition-all duration-300 group-hover:scale-110" />
            </a>
            <a
              href="https://instagram.com/withcrpn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-600 transition-all duration-300 p-2 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:shadow-md group"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4 transition-all duration-300 group-hover:scale-110" />
            </a>
            <a
              href="mailto:intouch.crp@gmail.com"
              className="text-gray-500 hover:text-red-600 transition-all duration-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 hover:shadow-md group"
              aria-label="Email"
            >
              <Mail className="h-4 w-4 transition-all duration-300 group-hover:scale-110" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
