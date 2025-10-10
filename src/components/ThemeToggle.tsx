import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Add transition class to html when theme changes
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("transition-colors");
    html.style.transitionDuration = "1200ms"; // Increased for smoother transition

    return () => {
      html.classList.remove("transition-colors");
      html.style.transitionDuration = "";
    };
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full bg-muted/50 hover:bg-primary/10 transition-colors overflow-hidden relative shadow-md dark:shadow-cyan-900/20"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-300 to-purple-300 dark:from-blue-900 dark:to-purple-900 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
      <Sun
        className={`h-[1.2rem] w-[1.2rem] absolute transition-all duration-1000 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        } text-yellow-300`}
      />
      <Moon
        className={`h-[1.2rem] w-[1.2rem] absolute transition-all duration-1000 ${
          theme !== "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        } text-indigo-500`}
      />
    </Button>
  );
}
