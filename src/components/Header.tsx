import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active link based on scroll position
      const sections = document.querySelectorAll("section");
      const scrollY = window.scrollY;

      sections.forEach((current) => {
        const sectionId = current.getAttribute("id");
        if (!sectionId) return;

        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveLink(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-4 shadow-md"
          : "bg-transparent py-6"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          href="#home"
          className="text-xl md:text-2xl font-bold tracking-tighter relative hover:text-foreground font-medium transition-colors hover:scale-105 transform group"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("home")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="relative z-10">Intouch</span>
          <span className="text-orange-500 ml-0.5">.</span>
          <span className="text-muted-foreground">dev</span>
          <span className="absolute w-full scale-x-0 h-0.5 bottom-0 left-0 bg-primary origin-bottom-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-bottom-left"></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "hover:text-foreground font-medium transition-colors hover:scale-105 transform relative",
                activeLink === link.href.substring(1)
                  ? "text-foreground"
                  : "text-muted-foreground",
                "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              )}
            >
              {link.name}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 shadow-md rounded-md"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-lg animate-fade-in">
          <div className="container py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-accent-foreground font-medium transition-colors py-2 hover:pl-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
