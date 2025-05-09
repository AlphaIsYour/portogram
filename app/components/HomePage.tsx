/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// 1. Imports React, Hooks, Next.js, Libraries
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  Fragment,
} from "react";
import Image from "next/image";
import {
  Chart,
  registerables,
  ChartConfiguration,
  TooltipItem,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons"; // Import all solid icons
import { fab } from "@fortawesome/free-brands-svg-icons"; // Import all brand icons
import { Transition, Dialog } from "@headlessui/react";
// Impor Tipe Prisma
import type {
  User,
  Skill as PrismaSkill,
  Project as PrismaProject,
  WorkExperience as PrismaWorkExperience,
  Education as PrismaEducation,
  Certification as PrismaCertification,
  Achievement as PrismaAchievement,
  BlogPost as PrismaBlogPost,
  Testimonial as PrismaTestimonial,
  Contact as PrismaContact,
  SocialMedia as PrismaSocialMedia,
  DevStats as PrismaDevStats,
  ProjectFeature,
  ProjectTechStack,
  ProjectCollaborator,
  ProjectLearning,
  WorkResponsibility,
  WorkTechnology,
  WorkAchievement as PrismaWorkAchievement,
  EducationAchievement,
  CertificationSkill,
  BlogTag,
  ContributionData as PrismaContributionData,
  ContributionDay as PrismaContributionDay, // <-- Alias Tipe Prisma
  TimelineEvent as PrismaTimelineEvent,
  ProjectTestimonial,
} from "../app/generated/prisma"; // <-- SESUAIKAN PATH INI!

// 2. Daftarkan ikon FontAwesome
library.add(fas, fab);

// Daftarkan komponen Chart.js
Chart.register(...registerables);

// --- INTERFACES LOKAL ---
// (Tetap sama seperti sebelumnya, icon jadi string)
interface Skill
  extends Omit<
    PrismaSkill,
    "icon" | "userId" | "createdAt" | "updatedAt" | "id"
  > {
  icon?: string;
  id: string;
}
interface Certification
  extends Omit<
    PrismaCertification,
    "icon" | "userId" | "createdAt" | "updatedAt" | "id" | "date" | "expiry"
  > {
  icon?: string;
  id: string;
  date: string;
  expiry?: string | null;
  skills: { skill: string }[];
}
interface Education
  extends Omit<PrismaEducation, "userId" | "createdAt" | "updatedAt" | "id"> {
  id: string;
  achievements: { achievement: string }[];
}
interface WorkExperience
  extends Omit<
    PrismaWorkExperience,
    "userId" | "createdAt" | "updatedAt" | "id"
  > {
  id: string;
  technologies: { technology: string }[];
  achievements: { achievement: string }[];
  responsibilities: { responsibility: string }[];
}
interface Project
  extends Omit<
    PrismaProject,
    "userId" | "createdAt" | "updatedAt" | "id" | "startDate" | "endDate"
  > {
  id: string;
  startDate: string;
  endDate?: string | null;
  features: { feature: string }[];
  techStack: { tech: string }[];
  collaborators: { name: string; username: string }[];
  learnings: { learning: string }[];
}
interface Achievement
  extends Omit<
    PrismaAchievement,
    "icon" | "userId" | "createdAt" | "updatedAt" | "id" | "date"
  > {
  icon?: string;
  id: string;
  date: string;
}
interface BlogPost
  extends Omit<
    PrismaBlogPost,
    "userId" | "createdAt" | "updatedAt" | "id" | "date"
  > {
  id: string;
  date: string;
  tags: { tag: string }[];
}
interface Testimonial
  extends Omit<
    PrismaTestimonial,
    "userId" | "createdAt" | "updatedAt" | "id" | "date"
  > {
  id: string;
  date: string;
}
interface Contact extends Omit<PrismaContact, "icon" | "userId" | "id"> {
  icon?: string;
  id: string;
}
interface SocialMedia
  extends Omit<PrismaSocialMedia, "icon" | "userId" | "id"> {
  icon?: string;
  id: string;
}
interface DevStats
  extends Omit<PrismaDevStats, "userId" | "createdAt" | "updatedAt" | "id"> {
  id: string;
}
interface ContributionDay {
  date: string;
  count: number;
  level: number;
} // Interface lokal
interface ContributionData {
  year: number;
  total: number;
  startRange: string;
  endRange: string;
  days: ContributionDay[];
}
// Interface lain yang dibutuhkan state
interface FilterOption {
  label: string;
  value: string;
  category: string;
}
interface SortOption {
  field: string;
  order: "asc" | "desc";
  label: string;
}
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  date: Date;
  read: boolean;
  link?: string;
}
interface TimelineEvent {
  id: string;
  date: string;
  type: "work" | "education" | "achievement" | "project" | "certification";
  title: string;
  subtitle?: string;
  description?: string;
  icon?: IconDefinition | string;
  color?: string;
} // Izinkan string untuk icon

// --- PROPS INTERFACE ---
interface HomePageProps {
  user: User;
  skills: Skill[];
  projects: Project[];
  workExperiences: WorkExperience[];
  educations: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  blogPosts: BlogPost[]; // Gunakan interface BlogPost lokal yang sudah disesuaikan
  testimonials: Testimonial[];
  contacts: Contact[];
  socialMedia: SocialMedia[];
  devStats: DevStats | null;
  // contributionData: ContributionData | null;
}

// --- KONSTANTA YANG HILANG ---
const PROJECTS_PER_PAGE = 6;
const BLOG_POSTS_PER_PAGE = 4;

// --- ICON HELPER FUNCTION ---
const findIconDefinition = (
  iconName?: string | null
): IconDefinition | undefined => {
  if (!iconName) return undefined;
  // Cari case-insensitive untuk lebih robust
  const lowerIconName = iconName.toLowerCase().replace("fa-", ""); // Hapus prefix jika ada
  const solidIcon = Object.values(fas).find(
    (icon) =>
      typeof icon === "object" && icon.iconName.toLowerCase() === lowerIconName
  );
  if (solidIcon) return solidIcon as IconDefinition;
  const brandIcon = Object.values(fab).find(
    (icon) =>
      typeof icon === "object" && icon.iconName.toLowerCase() === lowerIconName
  );
  if (brandIcon) return brandIcon as IconDefinition;
  console.warn(`Icon definition not found for: ${iconName}`);
  return fas.faQuestionCircle; // Fallback
};

// --- MAIN COMPONENT ---
const HomePage = ({
  user,
  skills,
  projects,
  workExperiences,
  educations,
  certifications,
  achievements,
  blogPosts,
  testimonials,
  contacts,
  socialMedia,
  devStats,
}: // contributionData: contributionDataFromProps, // Hapus komentar jika data ini dilewatkan
HomePageProps) => {
  // --- STATE HOOKS ---
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(
    null
  );
  const [blogPostDialogOpen, setBlogPostDialogOpen] = useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);
  const [activeSort, setActiveSort] = useState<SortOption>({
    field: "startDate",
    order: "desc",
    label: "Date (Newest)",
  });
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState("all");
  const chartInstances = useRef<{ [key: string]: Chart | null }>({});
  const [currentProjectPage, setCurrentProjectPage] = useState(1);
  const [currentBlogPostPage, setCurrentBlogPostPage] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactFormStatus, setContactFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [darkMode, setDarkMode] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [currentProjectView, setCurrentProjectView] = useState<"grid" | "list">(
    "grid"
  );
  const [contributionData, setContributionData] =
    useState<ContributionData | null>(null); // Tetap null jika tidak ada props
  const [tooltipInfo, setTooltipInfo] = useState<{
    show: boolean;
    x: number;
    y: number;
    text: string;
  } | null>(null);

  // --- REFS ---
  const navbarRef = useRef<HTMLDivElement>(null);
  const activityChartRef = useRef<HTMLCanvasElement>(null);
  const skillRadarChartRef = useRef<HTMLCanvasElement>(null);
  const projectCategoryDonutRef = useRef<HTMLCanvasElement>(null);
  const notificationPanelRef = useRef<HTMLDivElement>(null);

  // --- EFFECTS ---
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const prefersDark =
      savedMode === null &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(savedMode === "true" || (savedMode === null && prefersDark));
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]); // Hapus initOrUpdateCharts dari sini, akan dihandle di effect chart
  useEffect(() => {
    const handleScroll = () => {
      const offset = navbarRef.current?.offsetTop ?? 0;
      if (window.scrollY > offset + 50) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const mockNotifications: Notification[] = [
      /* ... mock data notif ... */
    ];
    setNotifications(mockNotifications); /* Generate contribution jika perlu */
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationPanelRef.current &&
        !notificationPanelRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  // --- MEMOIZED VALUES & COMPUTED PROPERTIES ---
  const processedProjects = useMemo(() => {
    let tempProjects = [...projects]; // Gunakan dari props
    if (searchQuery) {
      /* ... filter search ... */
    }
    if (activeFilters.length > 0) {
      /* ... filter aktif ... */
    }
    tempProjects.sort((a, b) => {
      /* ... logika sort ... */
    });
    return tempProjects;
  }, [projects, searchQuery, activeFilters, activeSort]);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentProjectPage - 1) * PROJECTS_PER_PAGE; // <-- GUNAKAN KONSTANTA
    return processedProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE); // <-- GUNAKAN KONSTANTA
  }, [processedProjects, currentProjectPage]);

  const totalProjectPages = useMemo(() => {
    return Math.ceil(processedProjects.length / PROJECTS_PER_PAGE); // <-- GUNAKAN KONSTANTA
  }, [processedProjects]);

  const filteredSkills = useMemo(() => {
    if (activeSkillCategory === "all") return skills;
    // PERBAIKAN: Tambahkan null check untuk category
    return skills.filter(
      (skill) =>
        skill.category?.toLowerCase() === activeSkillCategory.toLowerCase()
    );
  }, [skills, activeSkillCategory]);

  const projectFilterOptions = useMemo(() => {
    /* ... logika filter options dari props `projects` ... */
    const techSet = new Set<string>();
    projects.forEach((p) => p.techStack.forEach((t) => techSet.add(t.tech)));
    const tech: FilterOption[] = Array.from(techSet)
      .sort()
      .map((t) => ({ label: t, value: t, category: "tech" }));
    const statusSet = new Set<string>(projects.map((p) => p.status));
    const status: FilterOption[] = Array.from(statusSet)
      .sort()
      .map((s) => ({
        label: s.charAt(0).toUpperCase() + s.slice(1),
        value: s,
        category: "status",
      }));
    const categorySet = new Set<string>(projects.map((p) => p.category));
    const category: FilterOption[] = Array.from(categorySet)
      .sort()
      .map((c) => ({ label: c, value: c, category: "category" }));
    return { tech, status, category };
  }, [projects]);

  const projectSortOptions: SortOption[] = useMemo(
    () => [
      /* ... data sort options ... */
    ],
    []
  );

  const paginatedBlogPosts = useMemo(() => {
    const sortedPosts = [...blogPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const startIndex = (currentBlogPostPage - 1) * BLOG_POSTS_PER_PAGE; // <-- GUNAKAN KONSTANTA
    return sortedPosts.slice(startIndex, startIndex + BLOG_POSTS_PER_PAGE); // <-- GUNAKAN KONSTANTA
  }, [blogPosts, currentBlogPostPage]);

  const totalBlogPostPages = useMemo(() => {
    return Math.ceil(blogPosts.length / BLOG_POSTS_PER_PAGE); // <-- GUNAKAN KONSTANTA
  }, [blogPosts]);

  const timelineData: TimelineEvent[] = useMemo(() => {
    /* ... logika generate timeline dari props ... */
    const events: TimelineEvent[] = [];
    workExperiences.forEach((exp) =>
      events.push({
        id: `work-${exp.id}`,
        date: exp.period.split(" - ")[0],
        type: "work",
        title: exp.position,
        subtitle: exp.company,
        icon: "briefcase",
        color: "text-blue-400",
      })
    );
    educations.forEach((edu) =>
      events.push({
        id: `edu-${edu.id}`,
        date: edu.period.split(" - ")[0],
        type: "education",
        title: edu.degree,
        subtitle: edu.institution,
        icon: "graduation-cap",
        color: "text-green-400",
      })
    );
    achievements.slice(0, 5).forEach((ach) =>
      events.push({
        id: `ach-${ach.id}`,
        date: ach.date,
        type: "achievement",
        title: ach.title,
        subtitle: ach.issuer ?? undefined,
        icon: ach.icon,
        color: "text-yellow-400",
      })
    );
    certifications.slice(0, 3).forEach((cert) =>
      events.push({
        id: `cert-${cert.id}`,
        date: cert.date,
        type: "certification",
        title: cert.name,
        subtitle: cert.issuer,
        icon: "certificate",
        color: "text-purple-400",
      })
    );
    projects
      .filter((p) => p.status === "completed")
      .slice(0, 4)
      .forEach((proj) =>
        events.push({
          id: `proj-${proj.id}`,
          date: proj.startDate,
          type: "project",
          title: `Project: ${proj.title}`,
          subtitle: proj.category,
          icon: "code-branch",
          color: "text-red-400",
        })
      );
    return events.sort((a, b) => {
      try {
        const dateA = new Date(
          a.date.includes("-") ? a.date : `${a.date}-01-01`
        );
        const dateB = new Date(
          b.date.includes("-") ? b.date : `${b.date}-01-01`
        );
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
        return dateB.getTime() - dateA.getTime();
      } catch {
        return 0;
      }
    });
  }, [workExperiences, educations, achievements, certifications, projects]);

  // --- Chart Initialization/Update ---
  const initOrUpdateCharts = useCallback(() => {
    if (loading || typeof window === "undefined") return;
    console.log("Initializing / Updating charts...");
    Object.values(chartInstances.current).forEach((chart) => chart?.destroy());
    chartInstances.current = {};
    const chartOptionsBase = {
      /* ... Opsi chart base ... */
    };

    // Activity Chart
    const activityCtx = activityChartRef.current?.getContext("2d");
    if (activityCtx && contributionData) {
      /* ... logika chart activity ... */
    } else if (activityCtx) {
      /* ... Tampilkan pesan 'data not available' ... */
    }

    // Skills Radar Chart
    const skillRadarCtx = skillRadarChartRef.current?.getContext("2d");
    if (skillRadarCtx && skills.length > 0) {
      /* ... logika chart radar ... */
    }

    // Project Category Pie Chart
    const projectCatCtx = projectCategoryDonutRef.current?.getContext("2d");
    if (projectCatCtx && projects.length > 0) {
      /* ... logika chart pie category ... */
    }
  }, [loading, darkMode, contributionData, skills, projects]); // Dependensi

  // Chart Initialization Effect (Tambahkan initOrUpdateCharts sebagai dependensi)
  useEffect(() => {
    const timer = setTimeout(() => initOrUpdateCharts(), 300);
    return () => {
      clearTimeout(timer);
      Object.values(chartInstances.current).forEach((chart) =>
        chart?.destroy()
      );
      chartInstances.current = {};
    };
  }, [initOrUpdateCharts]); // <-- PERBAIKAN: Tambahkan dependensi

  // --- EVENT HANDLERS ---
  // useCallback ditambahkan untuk fungsi yang jadi dependensi effect/memo atau event handler kompleks
  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false); /* ... scroll logic ... */
  }, []);
  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setProjectDialogOpen(true);
  }, []);
  const handleCloseProjectDialog = useCallback(() => {
    setProjectDialogOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  }, []);
  const handleBlogPostClick = useCallback((post: BlogPost) => {
    setSelectedBlogPost(post);
    setBlogPostDialogOpen(true);
  }, []);
  const handleCloseBlogPostDialog = useCallback(() => {
    setBlogPostDialogOpen(false);
    setTimeout(() => setSelectedBlogPost(null), 300);
  }, []);
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentProjectPage(1);
    },
    []
  );
  // PERBAIKAN: Pastikan callback setActiveFilters me-return state baru
  const handleFilterToggle = useCallback((filter: FilterOption) => {
    setActiveFilters((prev) => {
      const exists = prev.some(
        (f) => f.category === filter.category && f.value === filter.value
      );
      if (exists) {
        return prev.filter(
          (f) => !(f.category === filter.category && f.value === filter.value)
        ); // Return array baru
      } else {
        return [...prev, filter]; // Return array baru
      }
    });
    setCurrentProjectPage(1);
  }, []);
  const handleClearFilters = useCallback(() => {
    setActiveFilters([]);
    setSearchQuery("");
    setCurrentProjectPage(1);
  }, []);
  const handleSortChange = useCallback((option: SortOption) => {
    setActiveSort(option);
  }, []);
  const handleThemeToggle = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);
  const handleContactFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setContactFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );
  const addNotification = useCallback(
    (title: string, message: string, type: Notification["type"]) => {
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        title,
        message,
        type,
        date: new Date(),
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev].slice(0, 10));
      setShowNotifications(true);
    },
    []
  );
  const handleContactFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      /* ... logika submit, panggil addNotification ... */
      e.preventDefault();
      if (contactFormStatus === "sending") return;
      setContactFormStatus("sending");
      console.log("Submitting:", contactFormData);
      await new Promise((res) => setTimeout(res, 1500));
      const success = Math.random() > 0.1;
      if (success) {
        setContactFormStatus("success");
        addNotification("Sent!", "Message sent.", "success");
        setTimeout(() => {
          setContactFormData({ name: "", email: "", subject: "", message: "" });
          setContactFormStatus("idle");
        }, 2000);
      } else {
        setContactFormStatus("error");
        addNotification("Error", "Failed to send.", "error");
        setTimeout(() => setContactFormStatus("idle"), 3000);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [contactFormData, contactFormStatus]
  ); // addNotification tidak perlu jadi dependensi jika stabil
  const handleExport = useCallback(
    (format: "pdf" | "json") => {
      /* ... logika export, panggil addNotification ... */
      if (isExporting) return;
      setIsExporting(true);
      addNotification("Exporting...", `Generating ${format}...`, "info");
      setTimeout(() => {
        setIsExporting(false);
        if (format === "json") {
          const exportData = {
            user,
            contacts,
            socialMedia,
            skills,
            projects,
            workExperiences,
            educations,
            achievements,
            blogPosts,
            testimonials,
            devStats,
          };
          const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: "application/json",
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${user?.username}-portfolio.json`;
          a.click();
          URL.revokeObjectURL(url);
        } else if (format === "pdf") {
          window.print();
        }
        addNotification("Export Complete", `Exported as ${format}.`, "success");
      }, 2500);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      isExporting,
      user,
      contacts,
      socialMedia,
      skills,
      projects,
      workExperiences,
      educations,
      achievements,
      blogPosts,
      testimonials,
      devStats,
    ]
  ); // addNotification tidak perlu
  const handleNotificationMarkAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);
  const handleNotificationMarkAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);
  const handleClearAllNotifications = useCallback(() => {
    setNotifications([]);
    setShowNotifications(false);
  }, []);
  const handleMouseEnterCell = useCallback(
    (e: React.MouseEvent<SVGRectElement>, day: ContributionDay) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipInfo({
        show: true,
        x: rect.left + window.scrollX + rect.width / 2,
        y: rect.top + window.scrollY - 10,
        text: `${day.count} contributions on ${formatDate(day.date, "long")}`,
      });
    },
    []
  );
  const handleMouseLeaveCell = useCallback(() => {
    setTooltipInfo(null);
  }, []);

  // --- RENDER HELPER / CHILD COMPONENTS (Definisi dipindah ke luar atau tetap di sini) ---
  // Pastikan semua child component menggunakan findIconDefinition jika perlu render ikon
  // ... (Definisi ProjectCard, ProjectDialog, SkillCard, dll. seperti sebelumnya, pastikan gunakan findIconDefinition) ...
  // Contoh singkat untuk ilustrasi:
  const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
    const iconDef = findIconDefinition(skill.icon);
    return (
      <div className="bg-gray-800 p-4 rounded">
        <div className="flex items-center mb-2">
          {iconDef && (
            <FontAwesomeIcon icon={iconDef} className="mr-2 text-blue-400" />
          )}
          <h4 className="font-semibold">{skill.name}</h4>
        </div>
        {/* ... rest of card ... */}
      </div>
    );
  };
  // ... (Definisikan SEMUA child component lainnya) ...

  // --- MAIN RENDER ---
  if (loading) {
    /* ... Komponen Loading ... */
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark" : ""
      } bg-gray-900 text-gray-300 font-sans ...`}
    >
      {/* Navbar */}
      <div
        ref={navbarRef}
        className={`sticky top-0 z-40 ... ${isNavbarFixed ? "shadow-lg" : ""}`}
      >
        {/* ... Konten Navbar ... */}
        <button onClick={handleThemeToggle} className="...">
          {" "}
          {/* Tombol Dark Mode */}
          <FontAwesomeIcon
            icon={darkMode ? fas.faSun : fas.faMoon}
            className="h-4 w-4"
          />
        </button>
        {/* ... */}
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderProfileHeader()} {/* Gunakan fungsi render */}
        <div id="main-content" className="mt-8">
          {/* ... Render tab content ... */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-850 ...">
        {" "}
        {/* ... Konten Footer ... */}{" "}
      </footer>

      {/* Modals & Dialogs */}
      {/* Pastikan komponen ini didefinisikan */}
      <ProjectDialog
        isOpen={projectDialogOpen}
        onClose={handleCloseProjectDialog}
        project={selectedProject}
      />
      <BlogPostDialog
        isOpen={blogPostDialogOpen}
        onClose={handleCloseBlogPostDialog}
        post={selectedBlogPost}
      />

      {/* Notifications Panel & Toggle */}
      {/* PERBAIKAN: Berikan semua props yang diperlukan */}
      <NotificationPanel
        notifications={notifications}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onMarkRead={handleNotificationMarkAsRead}
        onMarkAllRead={handleNotificationMarkAllRead}
        onClearAll={handleClearAllNotifications}
        panelRef={notificationPanelRef}
      />
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="fixed bottom-6 right-6 ..."
      >
        {findIconDefinition("bell") && (
          <FontAwesomeIcon
            icon={findIconDefinition("bell")!}
            className="h-5 w-5"
          />
        )}
        {/* ... Badge notifikasi ... */}
      </button>
    </div> // End main wrapper
  );
};

// --- CHILD COMPONENTS DEFINITIONS ---
// TEMPATKAN SEMUA definisi child component (ProjectCard, SkillCard, dll.) di sini
// Pastikan mereka menerima props yang benar dan menggunakan findIconDefinition

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  viewMode = "grid",
}) => {
  /* ... JSX ... */ return <div>Project Card: {project.title}</div>;
};
const ProjectDialog: React.FC<ProjectDialogProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  /* ... JSX ... */ if (!project) return null;
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Panel>Project Dialog: {project.title}</Dialog.Panel>
    </Dialog>
  );
};
// const SkillCard: React.FC<SkillCardProps> = ({ skill }) => { /* ... JSX ... */ }; // Sudah didefinisikan di atas sbg contoh
const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  /* ... JSX ... */ return <div>Exp Card: {experience.company}</div>;
};
const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
  /* ... JSX ... */ return <div>Edu Card: {education.institution}</div>;
};
const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
}) => {
  /* ... JSX ... */ return <div>Cert Card: {certification.name}</div>;
};
const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  /* ... JSX ... */ return <div>Ach Card: {achievement.title}</div>;
};
const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onClick }) => {
  /* ... JSX ... */ return <div onClick={onClick}>Blog Card: {post.title}</div>;
};
const BlogPostDialog: React.FC<BlogPostDialogProps> = ({
  isOpen,
  onClose,
  post,
}) => {
  /* ... JSX ... */ if (!post) return null;
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Panel>Blog Dialog: {post.title}</Dialog.Panel>
    </Dialog>
  );
};
const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  /* ... JSX ... */ return <div>Testimonial: {testimonial.name}</div>;
};
const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkRead,
  onMarkAllRead,
  onClearAll,
  panelRef,
}) => {
  /* ... JSX ... */ return (
    <div ref={panelRef} style={{ display: isOpen ? "block" : "none" }}>
      Notifications Panel
    </div>
  );
};
const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  /* ... JSX ... */ return <div>Pagination</div>;
};
const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({
  data,
  onMouseEnterCell,
  onMouseLeaveCell,
  darkMode,
}) => {
  /* ... JSX ... */ return <div>Heatmap</div>;
};
const TimelineItem: React.FC<TimelineItemProps> = ({ event }) => {
  /* ... JSX ... */ return <div>Timeline: {event.title}</div>;
};
// Dst...

export default HomePage;
