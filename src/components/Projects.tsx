import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { projects, categories } from "@/data/projects";

// Intersection Observer Hook สำหรับ Scroll Animation
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState<Set<number>>(
    new Set()
  );
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Snapshot current targets to avoid ref changes during cleanup
    const targets = elementsRef.current.slice();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = targets.indexOf(entry.target as HTMLElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleElements((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    targets.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      targets.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return { visibleElements, elementsRef };
};

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isChanging, setIsChanging] = useState(false);
  const { visibleElements, elementsRef } = useScrollAnimation();

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Filter animation with smooth fade effect
  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) return;

    setIsChanging(true);
    setTimeout(() => {
      setActiveCategory(category);
      setTimeout(() => setIsChanging(false), 50);
    }, 250);
  };

  return (
    <section
      id="projects"
      className="py-16 md:py-24 relative
             bg-background
             dark:bg-gray-950
             dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900"
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
            My Projects
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
          A curated set of projects marking my shift from logistics to frontend,
          with focus on modern tech and user-first design.
        </p>

        {/* Category Filter */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 transform delay-400",
            visibleElements.has(1)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
          ref={(el) => (elementsRef.current[1] = el)}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "transition-[transform,background-color] duration-300 transform hover:scale-105",
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                  : "hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300"
              )}
            >
              {category}
              <Badge
                variant="secondary"
                className="ml-2 text-xs bg-white/20 dark:bg-gray-800 text-current border-0"
              >
                {category === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === category).length}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out transform-gpu will-change-transform",
            isChanging
              ? "opacity-0 scale-95 blur-sm pointer-events-none"
              : "opacity-100 scale-100 blur-none",
            visibleElements.has(2)
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
          ref={(el) => (elementsRef.current[2] = el)}
        >
          {filteredProjects.map((project, index) => (
            <Card
              key={project.title}
              className={cn(
                "group overflow-hidden bg-card hover:shadow-xl dark:hover:shadow-2xl transition-[transform,box-shadow,border-color] duration-700 transform hover:scale-[1.02] border-2 hover:border-primary/20",
                visibleElements.has(2)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{
                transitionDelay: visibleElements.has(2)
                  ? `${index * 150}ms`
                  : "0ms",
              }}
            >
              {/* Image Container - Fixed Aspect Ratio */}
              <div className="relative aspect-video overflow-hidden bg-muted group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Category Badge on Image */}
                <Badge
                  variant="secondary"
                  className="absolute top-3 right-3 bg-gray-500/80 text-white backdrop-blur-sm border-0"
                >
                  {project.category}
                </Badge>

                {/* Overlay Buttons */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white hover:text-black transition-[background-color,color] duration-300 backdrop-blur-sm"
                  >
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} /> Demo
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="gap-2 bg-white/20 border-white/30 text-white hover:bg-white hover:text-black transition-[background-color,color] duration-300 backdrop-blur-sm"
                  >
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} /> Code
                    </a>
                  </Button>
                </div>
              </div>

              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex flex-col gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-lg sm:text-xl">
                  {project.featured && (
                    <Badge className="self-start mb-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs">
                      ⭐ Featured
                    </Badge>
                  )}
                  <span className="line-clamp-2">{project.title}</span>
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-muted-foreground line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-muted/80 transition-all duration-300 hover:bg-primary/20 transform hover:scale-105 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
