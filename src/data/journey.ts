/**
 * Journey section data
 * Timeline data for education and professional experience
 */
import {
  GraduationCap,
  Briefcase,
  Code,
  Building,
  Target,
  Package,
  Laptop,
} from "lucide-react";

// Journey section data
export const educationData = [
  {
    year: "2015",
    title: "Vocational Certificate",
    subtitle: "Business Computer",
    institution: "Viboon Business Administration Technological College",
    description:
      "Foundation in business computer systems and basic programming concepts.",
    icon: GraduationCap,
    status: "completed",
  },
  {
    year: "2022-2024",
    title: "Self-Taught Web Development",
    subtitle: "React, Next.js, TypeScript, Tailwind CSS",
    institution: "Independent Study",
    description:
      "Focused on modern front-end technologies through online courses, tutorials, and personal projects. Built hands-on experience with React, Next.js, TypeScript, and Tailwind CSS.",
    icon: Laptop,
    status: "completed",
  },
  {
    year: "2024-2026",
    title: "High Vocational Certificate",
    subtitle: "Information Technology",
    institution: "Attawit Commercial Technology College",
    description:
      "Currently studying advanced IT concepts, web development, and software engineering.",
    icon: Code,
    status: "current",
  },
  {
    year: "2026",
    title: "Future Goal",
    subtitle: "Graduate & Become a Full-time Front-end Developer (2026)",
    institution: "Career Transition",
    description:
      "Aiming to apply my combined background in logistics and IT to create efficient, user-focused web applications while continuing to grow as a full-stack developer.",
    icon: Target,
    status: "future",
  },
];

export const experienceData = [
  {
    year: "2020-2021",
    title: "Operation Online Warehouse",
    subtitle: "Warehouse & Fulfillment",
    company: "Com7 Public Company Limited",
    description:
      "Organized warehouse layout and category-based put-away. Received goods, performed QC, and distributed products to branches nationwide.",
    icon: Package,
    status: "completed",
  },
  {
    year: "2021-2022",
    title: "Inventory Control",
    subtitle: "Ingredient Management",
    company: "Susan Croissant Co.,Ltd.",
    description:
      "Planned material procurement to meet production timelines and budget. Maintained accurate stock levels and optimized storage usage.",
    icon: Building,
    status: "completed",
  },
  {
    year: "2022-Present",
    title: "Inventory Operations",
    subtitle: "IT Infrastructure & Operations",
    company: "System Dot Com Co.,Ltd.",
    description:
      "Managed IT inventory using Microsoft Dynamics 365. Analyzed stock movement with FIFO method and led sourcing for spare parts.",
    icon: Briefcase,
    status: "current",
  },
];
