import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, Group, Crown, Puzzle } from "lucide-react";

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

export function About() {
  const { visibleElements, elementsRef } = useScrollAnimation();

  return (
    <section
      id="about"
      className="py-16 md:py-24 relative bg-background dark:bg-gray-950"
    >
      <div className="container">
        {/* About Me Section */}
        <div className="max-w-8xl mx-auto mb-16">
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
              About Me
            </span>
          </h2>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image Only */}
            <div
              className={cn(
                "transition-all duration-700 transform delay-200 space-y-8 mt-6",
                visibleElements.has(0)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              {/* Image with Hover Effect and Contact Info */}
              <div className="relative flex justify-center group">
                <div className="relative w-full md:w-4/5 lg:w-11/12 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-pink-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-[filter] duration-500"></div>
                  <img
                    src="/assets/images/about.jpg"
                    alt="Developer Workspace"
                    className="relative w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl transition-[transform,box-shadow] duration-500 group-hover:scale-105 group-hover:shadow-3xl"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content & Key Skills */}
            <div
              className={cn(
                "space-y-6 transition-all duration-700 transform delay-400",
                visibleElements.has(0)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              {/* Key Skills - Now on Right Side */}
              <div className="mb-8 mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto md:mx-0">
                  {/* Leadership */}
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg transition-[transform,box-shadow,background-color] duration-300 hover:scale-105 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer group">
                    <Crown className="w-6 h-6 mx-auto mb-2 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm font-semibold text-center">
                      Leadership
                    </p>
                    <p className="text-xs text-muted-foreground text-center text-balance text-pretty min-h-[40px]">
                      Guiding direction with clarity and trust.
                    </p>
                  </div>

                  {/* Problem Solving */}
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg transition-[transform,box-shadow,background-color] duration-300 hover:scale-105 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 cursor-pointer group">
                    <Puzzle className="w-6 h-6 mx-auto mb-2 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm font-semibold text-center">
                      Problem Solving
                    </p>
                    <p className="text-xs text-muted-foreground text-center text-balance text-pretty min-h-[40px]">
                      Navigating ambiguity with structured thinking.
                    </p>
                  </div>

                  {/* Team Collaboration */}
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg transition-[transform,box-shadow,background-color] duration-300 hover:scale-105 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 cursor-pointer group">
                    <Group className="w-6 h-6 mx-auto mb-2 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm font-semibold text-center">
                      Team Collaboration
                    </p>
                    <p className="text-xs text-muted-foreground text-center text-balance text-pretty min-h-[40px]">
                      Building momentum through shared ownership.
                    </p>
                  </div>

                  {/* Growth Mindset */}
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg transition-[transform,box-shadow,background-color] duration-300 hover:scale-105 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer group">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm font-semibold text-center">
                      Growth Mindset
                    </p>
                    <p className="text-xs text-muted-foreground text-center text-balance text-pretty min-h-[40px]">
                      Embracing change through continuous learning.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a <strong>passionate developer</strong> transitioning from
                  over five years in
                  <strong>logistics management</strong>, where I specialized in
                  streamlining operations and managing inventory at scale. Now,
                  I’m leveraging that background to build
                  <strong>efficient</strong>,{" "}
                  <strong>user-centered web applications</strong> that
                  <strong>simplify business processes</strong> and enhance user
                  experiences.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  By combining <strong>analytical thinking</strong> from
                  logistics with
                  <strong>creative problem-solving</strong> in development, I
                  aim to bridge
                  <strong>operational efficiency</strong> with{" "}
                  <strong>modern web technologies</strong>. Every project is an
                  opportunity to <strong>learn</strong>,{" "}
                  <strong>improve</strong>, and design solutions that feel{" "}
                  <strong>intuitive</strong>, <strong>purposeful</strong>, and
                  grounded in <strong>real-world needs</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Key Skills section moved to left column */}
        </div>

        {/* Action Buttons */}
        <div
          className={cn(
            "flex flex-row gap-3 justify-center pt-8 transition-all duration-700 transform delay-600",
            visibleElements.has(2)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
          ref={(el) => (elementsRef.current[2] = el)}
        >
          <Button
            variant="outline"
            asChild
            className="transition-[transform,box-shadow,background,color] duration-500 shadow-lg 
            bg-white dark:bg-gray-800 text-foreground text-sm md:text-sm px-5 py-3 md:px-6 md:py-3
            hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 hover:text-white 
            dark:hover:bg-gradient-to-r dark:hover:from-purple-500 dark:hover:to-indigo-600 
            hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 
            hover:scale-105"
          >
            <a href="#journey">My Journey</a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="transition-[transform,box-shadow,background,color] duration-500 shadow-lg 
            bg-white dark:bg-gray-800 text-foreground text-sm md:text-sm px-5 py-3 md:px-6 md:py-3
            hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 hover:text-white 
            dark:hover:bg-gradient-to-r dark:hover:from-purple-500 dark:hover:to-indigo-600 
            hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 
            hover:scale-105"
          >
            <a href="#skills">My Skills</a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="transition-[transform,box-shadow,background,color] duration-500 shadow-lg 
            bg-white dark:bg-gray-800 text-foreground text-sm md:text-sm px-5 py-3 md:px-6 md:py-3
            hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600 hover:text-white 
            dark:hover:bg-gradient-to-r dark:hover:from-purple-500 dark:hover:to-indigo-600 
            hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 
            hover:scale-105"
          >
            <a href="#projects">My Projects</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
