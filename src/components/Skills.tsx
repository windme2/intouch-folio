import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { skillsData, tabLabels } from "@/data/skills";

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
        rootMargin: "0px 0px -20% 0px",
      }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return { visibleElements, elementsRef };
};

export function Skills() {
  const [activeTab, setActiveTab] =
    useState<keyof typeof skillsData>("frontend");
  const [isChanging, setIsChanging] = useState(false);
  const { visibleElements, elementsRef } = useScrollAnimation();

  const handleTabChange = (newTab: keyof typeof skillsData) => {
    if (newTab === activeTab) return;
    setIsChanging(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setTimeout(() => setIsChanging(false), 50);
    }, 200);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500";
      case "Intermediate":
        return "bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-500";
      case "Basic":
        return "bg-red-400 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-400";
      default:
        return "bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500";
    }
  };

  return (
    <section
      id="skills"
      className="py-16 md:py-24 relative bg-background dark:bg-gray-950"
    >
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold mb-6 text-center transition-transform transition-opacity duration-700",
              visibleElements.has(0)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
            ref={(el) => (elementsRef.current[0] = el)}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              My Skills
            </span>
          </h2>
          <p
            className={cn(
              "text-lg text-muted-foreground text-center max-w-xl mx-auto mb-8 transition-transform transition-opacity duration-700 delay-200",
              visibleElements.has(0)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            A comprehensive toolkit of technologies and methodologies that power
            my development process.
          </p>
          {/* Filter Tabs */}
          <div
            className={cn(
              "flex flex-wrap justify-center mb-8 gap-2 transition-transform transition-opacity duration-700 delay-300",
              visibleElements.has(1)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
            ref={(el) => (elementsRef.current[1] = el)}
          >
            {Object.entries(tabLabels).map(([key, label]) => (
              <Button
                key={key}
                variant={activeTab === key ? "default" : "outline"}
                onClick={() => handleTabChange(key as keyof typeof skillsData)}
                className={cn(
                  "transition-transform transition-colors duration-300 hover:scale-105",
                  activeTab === key
                    ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    : "hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-300 dark:border-blue-600"
                )}
              >
                {label}
              </Button>
            ))}
          </div>
          {/* Skills Grid */}
          <div
            className={cn(
              "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-500 ease-in-out transform-gpu will-change-transform",
              isChanging
                ? "opacity-0 scale-95 blur-sm pointer-events-none"
                : "opacity-100 scale-100 blur-none",
              visibleElements.has(2)
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
            ref={(el) => (elementsRef.current[2] = el)}
          >
            {skillsData[activeTab].map((skill, index) => (
              <div
                key={`${activeTab}-${skill.name}`}
                className={cn(
                  "group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transition-shadow duration-700 ease-out hover:scale-105 border border-gray-200 dark:border-gray-600 cursor-pointer relative overflow-hidden skill-card",
                  visibleElements.has(2)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: visibleElements.has(2)
                    ? `${index * 100}ms`
                    : "0ms",
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <div className="absolute inset-0 rounded-2xl border border-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                  {/* Icon Container */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-800/40 dark:to-indigo-800/40 flex items-center justify-center transition-shadow duration-300 shadow-inner border border-blue-200/50 dark:border-blue-600/50">
                    <Icon
                      icon={skill.icon}
                      className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {skill.name}
                  </h3>

                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-medium text-white border-0 px-3 py-1 rounded-full transition-transform duration-200 shadow-md hover:scale-105",
                      getLevelColor(skill.level)
                    )}
                  >
                    {skill.level}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
