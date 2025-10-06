import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Intersection Observer Hook for scroll animations
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState<Set<number>>(
    new Set()
  );
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = elementsRef.current.indexOf(
            entry.target as HTMLElement
          );
          if (entry.isIntersecting && index !== -1) {
            setVisibleElements((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
      }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return { visibleElements, elementsRef };
};

export function Contact() {
  const { visibleElements, elementsRef } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 relative 
              bg-background dark:bg-gray-900
             dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold mb-6 text-center transition-all duration-700 transform",
            visibleElements.has(0)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
          ref={(el) => (elementsRef.current[0] = el)}
        >
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Get in Touch
          </span>
        </h2>
        <p
          className={cn(
            "text-lg text-muted-foreground text-center max-w-xl mx-auto mb-12 transition-all duration-700 transform delay-200",
            visibleElements.has(1)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
          ref={(el) => (elementsRef.current[1] = el)}
        >
          Always open to collaborations, freelance opportunities, or a friendly
          chat about web development.
        </p>

        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-700 transform delay-400",
            visibleElements.has(2)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
          ref={(el) => (elementsRef.current[2] = el)}
        >
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>

            <div className="space-y-8">
              {/* Email */}
              <a
                href="mailto:intouch.crp@gmail.com"
                className="flex items-center space-x-5 group hover:bg-muted/50 p-4 rounded-lg transition-shadow transition-transform transition-colors duration-300 hover:translate-x-2 cursor-pointer hover:shadow-lg hover:shadow-red-100 dark:hover:shadow-red-900/20"
              >
                <div className="bg-gradient-to-r from-red-500 to-pink-500 group-hover:from-red-600 group-hover:to-pink-600 p-4 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Mail className="h-5 w-5 text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-lg group-hover:text-primary transition-colors">
                    intouch.crp@gmail.com
                  </p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/intouch-charoenphon-a89b21207/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-5 group hover:bg-muted/50 p-4 rounded-lg transition-shadow transition-transform transition-colors duration-300 hover:translate-x-2 cursor-pointer hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:from-blue-600 group-hover:to-indigo-600 p-4 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Linkedin className="h-5 w-5 text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="font-medium text-lg group-hover:text-primary transition-colors">
                    linkedin.com/in/intouch
                  </p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/windme2/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-5 group hover:bg-muted/50 p-4 rounded-lg transition-shadow transition-transform transition-colors duration-300 hover:translate-x-2 cursor-pointer hover:shadow-lg hover:shadow-gray-100 dark:hover:shadow-gray-900/20"
              >
                <div className="bg-gradient-to-r from-gray-800 to-gray-600 group-hover:from-gray-900 group-hover:to-gray-700 p-4 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Github className="h-5 w-5 text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <p className="font-medium text-lg group-hover:text-primary transition-colors">
                    github.com/windme2
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/withcrpn/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-5 group hover:bg-muted/50 p-4 rounded-lg transition-shadow transition-transform transition-colors duration-300 hover:translate-x-2 cursor-pointer hover:shadow-lg hover:shadow-pink-100 dark:hover:shadow-pink-900/20"
              >
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 group-hover:from-pink-600 group-hover:to-rose-600 p-4 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Instagram className="h-5 w-5 text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instagram</p>
                  <p className="font-medium text-lg group-hover:text-primary transition-colors">
                    instagram.com/withcrpn
                  </p>
                </div>
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className={cn(
              "space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300",
              submitStatus === "success" &&
                "border-green-500 shadow-green-200/50 shadow-lg",
              submitStatus === "error" &&
                "border-red-500 shadow-red-200/50 shadow-lg"
            )}
          >
            {/* Success/Error Toast */}
            {submitStatus !== "idle" && (
              <div
                className={cn(
                  "p-3 rounded-lg text-sm font-medium transition-all duration-300",
                  submitStatus === "success" &&
                    "bg-green-100 text-green-800 border border-green-200",
                  submitStatus === "error" &&
                    "bg-red-100 text-red-800 border border-red-200"
                )}
              >
                {submitStatus === "success"
                  ? "✓ Message sent successfully!"
                  : "✗ Failed to send message. Please try again."}
              </div>
            )}

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-foreground"
              >
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className="min-h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 
      hover:from-indigo-600 hover:via-blue-600 hover:to-cyan-500 
      transition-all duration-300 text-white disabled:opacity-70 
      hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] rounded-lg"
            >
              <span
                className={cn(
                  "transition-all duration-300",
                  isSubmitting && "animate-pulse"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </span>
            </Button>

            {/* Tagline */}
            <p className="text-center text-muted-foreground mt-4">
              Let’s create something great together.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
