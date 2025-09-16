/**
 * Projects section data
 * Portfolio project showcase with categories and metadata
 */
// Projects section data
export const projects = [
  {
    title: "WindSpace - Personal Blog Platform",
    description:
      "Personal blog platform built with modern web stack, featuring dynamic post management and responsive design.",
    image: "/assets/screenshots/windspace-preview.png",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Shadcn UI",
      "Supabase (PostgreSQL)",
    ],
    demoLink: "https://windspace-demo.vercel.app",
    codeLink: "https://github.com/windme2/windspace",
    featured: true,
    category: "Blog",
  },
  {
    title: "WindSphere - Weather Forecast",
    description:
      "Weather forecast web app providing real-time updates and 5-day analytics for Bangkok region, featuring a glassmorphic UI and responsive layout.",
    image: "/assets/screenshots/windsphere-preview.png",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Shadcn UI",
      "Radix UI",
      "Lucide React Icons",
    ],
    demoLink: "https://windsphere-demo.vercel.app",
    codeLink: "https://github.com/windme2/windsphere",
    featured: true,
    category: "Web App",
  },
];

export const categories = [
  "All",
  "Web App",
  "Blog",
  // "API",
  // "Dashboard",
  // "Mobile App",
  // "E-commerce",
];
