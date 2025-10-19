import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Journey } from "@/components/Journey";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for GoToTop button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Simple fade in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");

            // Find child elements to reveal with stagger
            const children = entry.target.querySelectorAll(
              ".reveal:not(.reveal-visible)"
            );
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("reveal-visible");
              }, index * 100);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    // Observe sections and reveal elements
    const sections = document.querySelectorAll("section");
    const revealElements = document.querySelectorAll(".reveal");

    sections.forEach((section) => observer.observe(section));
    revealElements.forEach((element) => observer.observe(element));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      revealElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-background dark:to-background">
        <Header />
        <main>
          <Hero />
          <About />
          <Journey />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />

        {/* Go to top button - positioned at bottom right */}
        <Button
          variant="outline"
          size="icon"
          onClick={scrollToTop}
          aria-label="Go to top"
          className={`fixed bottom-8 right-8 z-50 rounded-full shadow-lg transition-all duration-500 ${
            scrolled
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          } bg-white dark:bg-gray-900 text-gray-800 dark:text-white
    hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-600 hover:text-white
    dark:hover:bg-gradient-to-r dark:hover:from-blue-500 dark:hover:to-cyan-600
    hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30
    hover:scale-105`}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default Index;
