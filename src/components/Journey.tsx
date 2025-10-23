import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { educationData, experienceData } from "@/data/journey";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";

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

export function Journey() {
  const [activeTab, setActiveTab] = useState<"education" | "experience">(
    "education"
  );
  const { visibleElements, elementsRef } = useScrollAnimation();

  return (
    <section
      id="journey"
      className="py-16 md:py-24 relative bg-background dark:bg-gray-950"
    >
      <div className="container">
        {/* My Journey Section */}
        <div className="max-w-6xl mx-auto">
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
              My Journey
            </span>
          </h2>

          <p
            className={cn(
              "text-lg text-muted-foreground text-center max-w-xl mx-auto mb-12 transition-all duration-700 transform delay-200",
              visibleElements.has(0)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            From logistics expertise to software development, exploring the path
            of continuous learning and growth.
          </p>

          {/* Tab Navigation */}
          <div
            className={cn(
              "flex justify-center my-8 md:my-12 px-4 transition-all duration-700 transform delay-300",
              visibleElements.has(0)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <div className="relative grid grid-cols-2 items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-full max-w-md mx-auto isolation-isolate shadow-sm transition-colors duration-300">
              <span
                aria-hidden
                className={cn(
                  "absolute top-1 bottom-1 left-1 rounded-lg bg-blue-600 shadow-lg",
                  "w-[calc(50%-0.25rem)] transition-all duration-500 ease-out transform-gpu",
                  activeTab === "experience"
                    ? "left-[calc(50%+0.25rem)]"
                    : "left-1"
                )}
              />
              <button
                onClick={() => setActiveTab("education")}
                className={cn(
                  "relative z-10 w-full px-3 py-2 md:px-6 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-colors duration-300",
                  activeTab === "education"
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
                )}
              >
                <GraduationCap className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
                Education
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={cn(
                  "relative z-10 w-full px-3 py-2 md:px-6 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-colors duration-300",
                  activeTab === "experience"
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
                )}
              >
                <Briefcase className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
                Work Experience
              </button>
            </div>
          </div>

          {/* Timeline Content */}
          <div
            className={cn(
              "relative transition-all duration-700 transform delay-500",
              visibleElements.has(1)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
            ref={(el) => (elementsRef.current[1] = el)}
          >
            {/* Center Line */}
            <div className="hidden min-[1150px]:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-30"></div>

            {/* Timeline Items */}
            <div className="space-y-6 lg:space-y-16 px-4 lg:px-8">
              {(activeTab === "education" ? educationData : experienceData).map(
                (item, index) => {
                  const IconComponent = item.icon;
                  const isLeft = index % 2 === 0;

                  return (
                    <div
                      key={item.title}
                      className={cn(
                        "relative flex items-start transition-all duration-700 transform",
                        "max-[1149px]:justify-center min-[1150px]:justify-start",
                        isLeft && "min-[1150px]:justify-start",
                        !isLeft && "min-[1150px]:justify-end",
                        visibleElements.has(1)
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      )}
                      style={{ transitionDelay: `${800 + index * 200}ms` }}
                    >
                      {/* Timeline Node */}
                      <div className="hidden min-[1150px]:block absolute left-2 min-[1150px]:left-1/2 transform min-[1150px]:-translate-x-1/2 z-10">
                        <div
                          className={`w-10 h-10 min-[1150px]:w-16 min-[1150px]:h-16 bg-gradient-to-br ${
                            item.status === "current"
                              ? "from-green-500 to-green-600 border-green-200 dark:border-green-800"
                              : item.status === "future"
                              ? "from-amber-500 to-amber-600 border-amber-200 dark:border-amber-800"
                              : item.status === "completed"
                              ? "from-blue-500 to-blue-600 border-blue-200 dark:border-blue-800"
                              : index % 3 === 1
                              ? "from-purple-500 to-purple-600 border-purple-200 dark:border-purple-800"
                              : "from-indigo-500 to-indigo-600 border-indigo-200 dark:border-indigo-800"
                          } rounded-full border-3 border-white dark:border-gray-900 shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-500 ease-out`}
                        >
                          <IconComponent className="w-8 h-8 text-white animate-pop" />
                        </div>
                      </div>

                      {/* Content Card */}
                      <div
                        className={`w-full max-w-md min-[1150px]:max-w-lg ${
                          isLeft
                            ? "min-[1150px]:mr-auto min-[1150px]:pr-16 min-[1150px]:ml-8"
                            : "min-[1150px]:ml-auto min-[1150px]:pl-16 min-[1150px]:ml-8"
                        }`}
                      >
                        <div
                          className={`p-6 lg:p-8 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 transition-all duration-500 ease-out hover:shadow-xl hover:scale-[1.02] group text-left min-[1150px]:${
                            isLeft ? "text-right" : "text-left"
                          }`}
                        >
                          {/* Year Badge */}
                          <div
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white mb-3 transition-all duration-300 ${
                              item.status === "current"
                                ? "bg-gradient-to-r from-green-500 to-green-600"
                                : item.status === "future"
                                ? "bg-gradient-to-r from-amber-500 to-amber-600"
                                : "bg-gradient-to-r from-blue-500 to-blue-600"
                            }`}
                          >
                            <Calendar className="w-4 h-4 inline align-middle mr-1" />
                            {item.year}
                          </div>

                          {/* Title */}
                          <h3 className="text-lg lg:text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500">
                            {item.title}
                          </h3>

                          {/* Subtitle */}
                          <h4 className="text-sm lg:text-md font-semibold text-purple-600 dark:text-purple-400 transition-colors duration-300 mb-2">
                            {item.subtitle}
                          </h4>

                          {/* Institution/Company | Description */}
                          <p className="text-xs lg:text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-300 mb-1">
                            {activeTab === "education"
                              ? (item as (typeof educationData)[0]).institution
                              : (item as (typeof experienceData)[0]).company}
                          </p>

                          <p className="text-xs lg:text-sm leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-300">
                            {item.description}
                          </p>

                          {/* Status Badge */}
                          {item.status === "current" && (
                            <div className="mt-3">
                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full transition-colors duration-300">
                                Current
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
