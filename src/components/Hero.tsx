import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, Instagram } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { typingTexts } from "@/data/hero";

export function Hero() {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const currentElements = elementsRef.current.filter((el) => el !== null);
    currentElements.forEach((el) => {
      if (el) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    });

    return () => {
      currentElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Typing Effect
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = typingTexts[currentIndex];

        if (!isDeleting) {
          // Typing forward
          if (currentText.length < current.length) {
            setCurrentText(current.substring(0, currentText.length + 1));
          } else {
            // Wait before deleting
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(current.substring(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % typingTexts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    ); // Faster when deleting

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting]);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16
             bg-background
             dark:bg-gradient-to-b dark:from-background dark:to-gray-950"
    >
      {/* Hero - Light background */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-30">
        <div className="absolute top-[20%] left-[15%] w-[28vw] h-[28vw] rounded-full bg-purple-500/60 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[15%] w-[24vw] h-[24vw] rounded-full bg-blue-500/60 blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
        {/* Image section - shows first on mobile, second on desktop */}
        <div
          className="order-1 md:order-2 md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0"
          ref={(el) => (elementsRef.current[4] = el)}
        >
          <div className="relative w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-300 to-blue-300 animate-pulse blur-lg opacity-70"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl flex items-center justify-center">
              <img
                src="/assets/images/hero.jpg"
                alt="Intouch Charoephon"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Text section - shows second on mobile, first on desktop */}
        <div className="order-2 md:order-1 md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
          <div
            className="space-y-2"
            ref={(el) => (elementsRef.current[0] = el)}
          >
            <h2 className="font-medium text-lg md:text-xl">Hello, I'm</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 text-transparent bg-clip-text animate-gradient shadow-text">
              INTOUCH CHAROENPHON
            </h1>
            <p className="text-xl md:text-2xl font-medium text-muted-foreground mt-2 min-h-[2rem]">
              {currentText}
              <span className="animate-pulse text-primary">|</span>
            </p>
          </div>

          {/* Available for Work Badge - Separated */}
          <div className="mt-3">
            <div className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-default">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              Available for Work
            </div>
          </div>

          <p
            className="text-lg max-w-lg text-muted-foreground"
            ref={(el) => (elementsRef.current[1] = el)}
          >
            Transitioning from logistics to software development,
            <br />
            blending process insight with a focus on user experience
            <br />
            to craft efficient web solutions.
          </p>

          <div
            className="flex flex-wrap justify-center md:justify-start gap-4"
            ref={(el) => (elementsRef.current[2] = el)}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600
              hover:from-green-700 hover:via-emerald-700 hover:to-teal-700
              text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 rounded-lg"
            >
              <a href="#contact">Contact Me</a>
            </Button>

            <Button
              variant="ghost"
              asChild
              size="lg"
              className="transition-all duration-300 shadow-md 
              bg-white dark:bg-gray-800 
              text-gray-800 dark:text-white 
              hover:bg-gradient-to-r hover:from-orange-500 hover:via-amber-500 hover:to-yellow-500 
              hover:text-white 
              hover:shadow-lg hover:shadow-amber-300/50 dark:hover:shadow-amber-900/30 
              hover:scale-105 rounded-lg"
            >
              <a
                href="/assets/documents/CV_Intouch_Charoenphon.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Download size={18} />
                <span>Download CV</span>
              </a>
            </Button>
          </div>

          <div
            className="flex gap-4 flex-wrap"
            ref={(el) => (elementsRef.current[3] = el)}
          >
            {/* GitHub */}
            <Button
              variant="outline"
              size="icon"
              asChild
              className="group relative rounded-full border-2 border-border bg-background overflow-hidden
               transition-all duration-500 hover:shadow
               focus-visible:ring-2 focus-visible:ring-[#24292e] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <a
                href="https://github.com/windme2/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid place-items-center w-10 h-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0
                   transition-transform duration-500 ease-out will-change-transform transform-gpu"
                  style={{
                    backgroundColor: "#24292e",
                    backfaceVisibility: "hidden",
                  }}
                />
                <Github className="relative z-10 h-5 w-5 text-foreground transition-colors duration-500 group-hover:text-white dark:group-hover:text-black" />
              </a>
            </Button>

            {/* LinkedIn */}
            <Button
              variant="outline"
              size="icon"
              asChild
              className="group relative rounded-full border-2 border-border bg-background overflow-hidden
               transition-all duration-500 hover:shadow
               focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <a
                href="https://linkedin.com/in/intouch-charoenphon-a89b21207/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid place-items-center w-10 h-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0
                   transition-transform duration-500 ease-out will-change-transform transform-gpu"
                  style={{
                    backgroundColor: "#0a66c2",
                    backfaceVisibility: "hidden",
                  }}
                />
                <Linkedin className="relative z-10 h-5 w-5 text-foreground transition-colors duration-500 group-hover:text-white dark:group-hover:text-black" />
              </a>
            </Button>

            {/* Instagram (radial gradient) */}
            <Button
              variant="outline"
              size="icon"
              asChild
              className="group relative rounded-full border-2 border-border bg-background overflow-hidden
               transition-all duration-500 hover:shadow
               focus-visible:ring-2 focus-visible:ring-pink-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <a
                href="https://instagram.com/withcrpn/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid place-items-center w-10 h-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0
                   transition-transform duration-500 ease-out will-change-transform transform-gpu"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                    backfaceVisibility: "hidden",
                  }}
                />
                <Instagram className="relative z-10 h-5 w-5 text-foreground transition-colors duration-500 group-hover:text-white dark:group-hover:text-black" />
              </a>
            </Button>

            {/* Email */}
            <Button
              variant="outline"
              size="icon"
              asChild
              className="group relative rounded-full border-2 border-border bg-background overflow-hidden
               transition-all duration-500 hover:shadow
               focus-visible:ring-2 focus-visible:ring-[#ea4335] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <a
                href="mailto:intouch.crp@gmail.com"
                aria-label="Email"
                className="grid place-items-center w-10 h-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0
                   transition-transform duration-500 ease-out will-change-transform transform-gpu"
                  style={{
                    backgroundColor: "#ea4335",
                    backfaceVisibility: "hidden",
                  }}
                />
                <Mail className="relative z-10 h-5 w-5 text-foreground transition-colors duration-500 group-hover:text-white dark:group-hover:text-black" />
              </a>
            </Button>
          </div>
        </div>

        <div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block"
          ref={(el) => (elementsRef.current[5] = el)}
        >
          <a
            href="#about"
            className="text-muted-foreground hover:text-foreground transition-all duration-300 ease-in-out hover:scale-110 animate-float-slow mt-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="transition-all duration-700 ease-in-out hover:translate-y-[2px] animate-float-slow"
              style={{
                filter: "drop-shadow(0 0 6px currentColor)",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
