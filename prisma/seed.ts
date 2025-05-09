// prisma/seed.ts - FINAL COMPLETE SEED SCRIPT with RESET OPTION

// 1. Impor (Termasuk FontAwesome untuk definisi data awal)
import { PrismaClient, Prisma } from "../app/generated/prisma"; // <-- PASTIKAN PATH BENAR
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"; // Impor TIPE
import * as fas from "@fortawesome/free-solid-svg-icons";
import * as fab from "@fortawesome/free-brands-svg-icons";

console.log("--- FINAL SEED SCRIPT STARTING ---");

try {
  // Blok try utama

  // 2. Inisialisasi PrismaClient
  console.log("Instantiating Prisma Client...");
  const prisma = new PrismaClient({
    // Aktifkan log ini jika ingin melihat query SQL saat seeding
    // log: ['query', 'info', 'warn', 'error'],
  });
  console.log("Prisma Client instantiated.");

  // --- DATA DINAMIS (LENGKAP DARI datadinamis.txt) ---

  // --- Interfaces (Menggunakan IconDefinition dari FA) ---
  interface Skill {
    name: string;
    percentage: number;
    color: string;
    icon?: IconDefinition;
    category:
      | "frontend"
      | "backend"
      | "devops"
      | "database"
      | "tools"
      | "language"
      | "framework"
      | "library"
      | "other";
    description: string;
    years?: number;
    projectsUsedIn?: string[];
  }
  interface Certification {
    name: string;
    issuer: string;
    date: string;
    icon: IconDefinition;
    credentialId: string;
    expiry?: string;
    skills: string[];
    description: string;
    verificationUrl?: string;
  }
  interface Education {
    institution: string;
    degree: string;
    field: string;
    period: string;
    description: string;
    logo?: string;
    achievements?: string[];
    gpa?: string;
    location?: string;
  }
  interface WorkExperience {
    company: string;
    position: string;
    period: string;
    description: string;
    technologies: string[];
    achievements: string[];
    logo?: string;
    location: string;
    type: "full-time" | "part-time" | "freelance" | "contract" | "internship";
    responsibilities: string[];
    website?: string;
  }
  interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    category: string;
    techStack: string[];
    stats: {
      branches: number;
      stars: number;
      views: number;
      forks?: number;
      issues?: number;
      commits?: number;
    };
    image?: string;
    demoUrl?: string;
    githubUrl?: string;
    features: string[];
    status: "completed" | "in-progress" | "planned" | "archived";
    startDate: string;
    endDate?: string;
    collaborators?: string[];
    testimonials?: Testimonial[];
    learnings?: string[];
  }
  interface Achievement {
    title: string;
    date: string;
    description: string;
    icon: IconDefinition;
    category: string;
    issuer?: string;
    link?: string;
  }
  interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content?: string;
    date: string;
    tags: string[];
    readTime: string;
    image?: string;
    likes: number;
    comments: number;
    shares: number;
    category: string;
    views?: number;
    author?: string;
  }
  // ContributionDay & ContributionData tidak digunakan karena tidak ada data contoh
  interface Testimonial {
    id: string;
    name: string;
    position: string;
    company: string;
    text: string;
    avatar?: string;
    rating: number;
    date: string;
    relation: string;
    projectLink?: string;
  }
  interface Contact {
    type: "Email" | "Phone" | "Location" | "Website" | "Calendly" | "Custom";
    value: string;
    icon: IconDefinition;
    isPublic: boolean;
    link?: string;
  }
  interface SocialMedia {
    platform: string;
    url: string;
    icon: IconDefinition;
    username: string;
  }
  interface DevStats {
    repos: number;
    stars: number;
    contributions: number;
    rating: string;
    followers: number;
    following: number;
    streak: number;
    commits: number;
    prsOpened?: number;
    issuesClosed?: number;
    rank?: string;
  }
  // TechStackItem, FilterOption, SortOption, Notification, TimelineEvent tidak digunakan karena tidak ada data contoh

  // --- CONSTANTS ---
  // PROJECTS_PER_PAGE & BLOG_POSTS_PER_PAGE tidak digunakan dalam seed
  const GITHUB_USERNAME = "AlphaIsYour"; // Sesuaikan
  const LINKEDIN_USERNAME = "alphareno-yanuar-syaputra"; // Sesuaikan
  const TWITTER_USERNAME = "yrlpha"; // Sesuaikan

  // --- DATA (Salin dari datadinamis.txt) ---
  // PERHATIAN: Pastikan data di bawah ini adalah data lengkapmu!
  const skillsData: Skill[] = [
    {
      name: "PHP",
      percentage: 92,
      color: "from-blue-600 to-indigo-500",
      icon: fab.faLaravel,
      category: "backend",
      description: "Expert PHP...",
      years: 5,
      projectsUsedIn: ["tokoeno"],
    }, // Menggunakan ID Project (slug)
    {
      name: "Node.js",
      percentage: 85,
      color: "from-green-500 to-emerald-400",
      icon: fab.faNode,
      category: "backend",
      description: "Strong Node.js...",
      years: 4,
      projectsUsedIn: ["devtracker", "secureauth"],
    },
    {
      name: "Python",
      percentage: 78,
      color: "from-blue-500 to-purple-500",
      icon: fab.faPython,
      category: "backend",
      description: "Proficient Python...",
      years: 3,
      projectsUsedIn: ["aiacademy"],
    }, // Menyesuaikan project ID
    {
      name: "GraphQL",
      percentage: 75,
      color: "from-pink-500 to-rose-500",
      icon: fas.faCode,
      category: "backend",
      description: "Building APIs...",
      years: 2,
      projectsUsedIn: ["cloudstack", "devtracker"],
    },
    {
      name: "Serverless",
      percentage: 70,
      color: "from-orange-500 to-amber-500",
      icon: fab.faAws,
      category: "backend",
      description: "Serverless functions...",
      years: 2.5,
    },
    {
      name: "JavaScript",
      percentage: 90,
      color: "from-yellow-400 to-amber-500",
      icon: fab.faJsSquare,
      category: "frontend",
      description: "Modern JS...",
      years: 5,
    },
    {
      name: "React",
      percentage: 91,
      color: "from-blue-400 to-cyan-300",
      icon: fab.faReact,
      category: "frontend",
      description: "Advanced React...",
      years: 4,
      projectsUsedIn: [
        "devtracker",
        "cloudstack",
        "datavizpro",
        "tokoeno",
        "portfolio-v3",
        "quicknotes",
      ],
    }, // Menyesuaikan project ID
    {
      name: "Next.js",
      percentage: 88,
      color: "from-gray-700 to-gray-500",
      icon: fab.faReact,
      category: "framework",
      description: "SSR/SSG Apps...",
      years: 3,
      projectsUsedIn: ["tokoeno", "portfolio-v3"],
    }, // Menyesuaikan project ID
    {
      name: "Vue.js",
      percentage: 80,
      color: "from-green-500 to-teal-400",
      icon: fab.faVuejs,
      category: "frontend",
      description: "Solid Vue...",
      years: 2.5,
      projectsUsedIn: ["aiacademy"],
    }, // Menyesuaikan project ID
    {
      name: "HTML/CSS",
      percentage: 95,
      color: "from-red-500 to-orange-400",
      icon: fab.faHtml5,
      category: "frontend",
      description: "Expert HTML/CSS...",
      years: 5,
    },
    {
      name: "Tailwind CSS",
      percentage: 93,
      color: "from-cyan-500 to-blue-500",
      icon: fab.faCss3,
      category: "library",
      description: "Utility-first CSS...",
      years: 3,
      projectsUsedIn: ["tokoeno", "portfolio-v3", "quicknotes"],
    },
    {
      name: "Docker",
      percentage: 82,
      color: "from-blue-500 to-cyan-400",
      icon: fab.faDocker,
      category: "devops",
      description: "Containerization...",
      years: 3.5,
      projectsUsedIn: ["devtracker", "cloudstack", "aiacademy"],
    }, // Menyesuaikan project ID
    {
      name: "AWS",
      percentage: 76,
      color: "from-orange-600 to-amber-500",
      icon: fab.faAws,
      category: "devops",
      description: "AWS Services...",
      years: 3,
      projectsUsedIn: ["tokoeno"],
    }, // Menyesuaikan project ID
    {
      name: "CI/CD",
      percentage: 85,
      color: "from-purple-600 to-indigo-400",
      icon: fas.faCodeBranch,
      category: "devops",
      description: "CI/CD Pipelines...",
      years: 4,
    },
    {
      name: "Kubernetes",
      percentage: 70,
      color: "from-blue-600 to-sky-500",
      icon: fas.faServer,
      category: "devops",
      description: "K8s Concepts...",
      years: 2,
      projectsUsedIn: ["cloudstack"],
    }, // Menyesuaikan project ID
    {
      name: "Terraform",
      percentage: 65,
      color: "from-purple-500 to-violet-500",
      icon: fas.faCloudUploadAlt,
      category: "devops",
      description: "Infrastructure as Code...",
      years: 1.5,
      projectsUsedIn: ["cloudstack"],
    },
    {
      name: "SQL (Postgres/MySQL)",
      percentage: 88,
      color: "from-sky-600 to-cyan-500",
      icon: fas.faDatabase,
      category: "database",
      description: "Relational DBs...",
      years: 5,
      projectsUsedIn: ["tokoeno", "cloudstack"],
    }, // Menyesuaikan project ID
    {
      name: "MongoDB",
      percentage: 80,
      color: "from-green-600 to-lime-500",
      icon: fas.faDatabase,
      category: "database",
      description: "NoSQL DB...",
      years: 3,
      projectsUsedIn: ["devtracker", "secureauth"],
    },
    {
      name: "Redis",
      percentage: 75,
      color: "from-red-600 to-rose-500",
      icon: fas.faDatabase,
      category: "database",
      description: "Caching, Queues...",
      years: 3,
      projectsUsedIn: [],
    }, // Sesuaikan jika digunakan
    {
      name: "Git",
      percentage: 98,
      color: "from-orange-500 to-red-500",
      icon: fab.faGitAlt,
      category: "tools",
      description: "Version Control...",
      years: 5,
    },
    {
      name: "Testing (Jest/PHPUnit)",
      percentage: 80,
      color: "from-emerald-500 to-green-500",
      icon: fas.faCheckDouble,
      category: "tools",
      description: "Testing Practices...",
      years: 4,
    },
    {
      name: "Figma",
      percentage: 60,
      color: "from-purple-500 to-pink-500",
      icon: fab.faFigma,
      category: "tools",
      description: "Design to Code...",
      years: 2,
    },
    {
      name: "Agile/Scrum",
      percentage: 90,
      color: "from-yellow-500 to-lime-500",
      icon: fas.faUsers,
      category: "other",
      description: "Agile Environments...",
      years: 4,
    },
  ];
  const certifications: Certification[] = [
    {
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "2024-01",
      icon: fab.faAws,
      credentialId: "AWS-DEV-12345",
      expiry: "2027-01",
      skills: [
        "EC2",
        "S3",
        "Lambda",
        "DynamoDB",
        "CloudFormation",
        "API Gateway",
      ],
      description: "Validates AWS development expertise.",
      verificationUrl: "#",
    },
    {
      name: "Laravel Certified Developer",
      issuer: "Laravel",
      date: "2023-05",
      icon: fab.faLaravel,
      credentialId: "LCD-67890",
      skills: [
        "PHP",
        "Laravel",
        "MVC",
        "Eloquent ORM",
        "Blade",
        "Queues",
        "Testing",
      ],
      description: "Certifies proficiency in Laravel.",
      verificationUrl: "#",
    },
    {
      name: "React Professional Developer",
      issuer: "React Cert. Board (Mock)",
      date: "2023-11",
      icon: fab.faReact,
      credentialId: "RPD-24680",
      skills: [
        "React",
        "Redux",
        "React Hooks",
        "Context API",
        "NextJS",
        "Testing",
      ],
      description: "Demonstrates advanced React knowledge.",
      verificationUrl: "#",
    },
    {
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      date: "2023-08",
      icon: fas.faServer,
      credentialId: "CKA-13579",
      expiry: "2026-08",
      skills: [
        "Kubernetes",
        "Container Orchestration",
        "Docker",
        "Microservices",
        "Networking",
        "Storage",
      ],
      description: "Validates K8s Administrator skills.",
      verificationUrl: "#",
    },
    {
      name: "MongoDB Professional Developer",
      issuer: "MongoDB, Inc.",
      date: "2022-12",
      icon: fas.faDatabase,
      credentialId: "MDB-97531",
      skills: [
        "MongoDB",
        "NoSQL",
        "Database Design",
        "Aggregation",
        "Indexing",
        "Performance Tuning",
      ],
      description: "Certifies advanced MongoDB knowledge.",
      verificationUrl: "#",
    },
    {
      name: "Professional Scrum Master™ I (PSM I)",
      issuer: "Scrum.org",
      date: "2022-06",
      icon: fas.faUsers,
      credentialId: "PSM-54321",
      expiry: "Lifetime",
      skills: ["Scrum", "Agile", "Project Management", "Coaching"],
      description: "Demonstrates fundamental Scrum mastery.",
      verificationUrl: "#",
    },
  ];
  const educationData: Education[] = [
    {
      institution: "Stanford University",
      degree: "Master of Science",
      field: "Computer Science",
      period: "2020 - 2022",
      description: "Specialized in AI/ML...",
      gpa: "3.92/4.0",
      achievements: [
        "Graduated with Distinction",
        "Published research paper",
        "TA for Advanced Algorithms",
      ],
      location: "Stanford, CA",
      logo: "/logo/c1.png",
    },
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Engineering",
      period: "2016 - 2020",
      description: "Comprehensive curriculum...",
      gpa: "3.85/4.0",
      achievements: [
        "Dean's List (all semesters)",
        "Capstone project",
        "Member of ACM/IEEE",
        "EECS Scholarship",
      ],
      location: "Berkeley, CA",
      logo: "/logo/c2.png",
    },
  ];
  const workExperience: WorkExperience[] = [
    {
      company: "Tech Innovators Inc.",
      position: "Senior Full Stack Developer",
      period: "Jan 2023 - Present",
      description: "Leading SaaS dev...",
      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "GraphQL",
        "AWS",
        "PostgreSQL",
        "Docker",
        "Terraform",
      ],
      achievements: [
        "Reduced load time",
        "CI/CD pipeline",
        "Legacy migration",
        "Mentored juniors",
      ],
      location: "San Francisco, CA",
      type: "full-time",
      responsibilities: [
        "Architect",
        "Lead dev",
        "DB design",
        "Collaborate",
        "Code reviews",
        "Optimize",
        "Troubleshoot",
      ],
      logo: "/logo/c3.png",
      website: "#",
    },
    {
      company: "GlobalSoft Solutions",
      position: "Full Stack Developer",
      period: "Apr 2021 - Dec 2022",
      description: "E-commerce platforms...",
      technologies: [
        "Laravel",
        "PHP",
        "Vue.js",
        "MySQL",
        "Redis",
        "Docker",
        "JavaScript",
        "jQuery",
      ],
      achievements: [
        "Inventory system",
        "Payment gateways",
        "Optimized checkout",
        "Component library",
      ],
      location: "Boston, MA",
      type: "full-time",
      responsibilities: [
        "Custom features",
        "REST APIs",
        "Caching",
        "Agile participation",
        "Bug fixing",
        "Testing",
      ],
      logo: "/logo/c4.png",
      website: "#",
    },
    {
      company: "Startech Innovations",
      position: "Backend Developer",
      period: "Jun 2020 - Mar 2021",
      description: "SaaS backend dev...",
      technologies: [
        "Python",
        "Django",
        "PostgreSQL",
        "AWS",
        "Kubernetes",
        "Celery",
        "REST APIs",
      ],
      achievements: [
        "Data pipeline",
        "OAuth/JWT auth",
        "Reduced AWS costs",
        "Technical docs",
      ],
      location: "New York, NY",
      type: "full-time",
      responsibilities: [
        "Microservices",
        "DB optimization",
        "API integration",
        "Testing",
        "Collaboration",
        "On-call",
      ],
      logo: "/logo/c7.png",
      website: "#",
    },
    {
      company: "Web Solutions Agency (Freelance)",
      position: "Freelance Web Developer",
      period: "Jan 2019 - May 2020",
      description: "Freelance services...",
      technologies: [
        "PHP",
        "WordPress",
        "JavaScript",
        "jQuery",
        "HTML",
        "CSS",
        "MySQL",
        "Bootstrap",
      ],
      achievements: ["15+ websites", "Custom WP plugin", "Positive feedback"],
      location: "Remote",
      type: "freelance",
      responsibilities: [
        "Requirements",
        "Development",
        "Customization",
        "Maintenance",
        "Communication",
      ],
      logo: "/logo/c8.png",
    },
  ];
  // !! PENTING: Gunakan ID/slug unik untuk project !!
  const projects: Project[] = [
    {
      id: "tokoeno",
      title: "Tokoeno E-Commerce",
      description: "E-commerce solution",
      longDescription: "Full-featured platform...",
      category: "Full Stack",
      techStack: ["Next.js", "React", "Prisma"],
      stats: { branches: 25, stars: 145, views: 3200 },
      features: ["Inventory", "Payments", "Analytics"],
      status: "completed",
      startDate: "2023-02",
      endDate: "2023-11",
      githubUrl: `https://github.com/${GITHUB_USERNAME}/tokoeno`,
      image: "/images/c9.png",
      learnings: ["Prisma queries", "Payment flows"],
    },
    {
      id: "devtracker",
      title: "DevTracker",
      description: "Productivity tool",
      longDescription: "Monitor productivity...",
      category: "Web Application",
      techStack: ["React", "Node.js", "MongoDB"],
      stats: { branches: 18, stars: 92, views: 2400 },
      features: ["GitHub integration", "Time tracking"],
      status: "in-progress",
      startDate: "2023-06",
      collaborators: ["@techdev", "@codemaster"],
      githubUrl: `https://github.com/${GITHUB_USERNAME}/devtracker`,
      image: "/images/c10.png",
      learnings: ["GitHub API", "MongoDB modeling"],
    },
    {
      id: "aiacademy",
      title: "AIAcademy",
      description: "AI learning platform",
      longDescription: "Engaging AI/ML learning...",
      category: "Education",
      techStack: ["Vue.js", "Flask", "Python"],
      stats: { branches: 15, stars: 210, views: 5600 },
      features: ["Coding challenges", "Visualization"],
      status: "completed",
      startDate: "2022-09",
      endDate: "2023-05",
      demoUrl: "#",
      githubUrl: `https://github.com/${GITHUB_USERNAME}/aiacademy`,
      image: "/images/k1.jpg",
    },
    {
      id: "cloudstack",
      title: "CloudStack",
      description: "Infra management tool",
      longDescription: "Multi-cloud management...",
      category: "DevOps",
      techStack: ["Golang", "React", "Kubernetes"],
      stats: { branches: 32, stars: 178, views: 2900 },
      features: ["Multi-cloud", "IaC templates", "Monitoring"],
      status: "completed",
      startDate: "2022-11",
      endDate: "2023-08",
      demoUrl: "#",
      githubUrl: `https://github.com/${GITHUB_USERNAME}/cloudstack`,
      image: "/images/k2.jpg",
      learnings: ["Golang system", "Cloud APIs"],
    },
    {
      id: "datavizpro",
      title: "DataVizPro",
      description: "Data viz library",
      longDescription: "React component library...",
      category: "Library",
      techStack: ["TypeScript", "React", "D3.js"],
      stats: { branches: 14, stars: 122, views: 3100 },
      features: ["Interactive charts", "Customizable"],
      status: "in-progress",
      startDate: "2023-03",
      collaborators: ["@datascientist", "@vizexpert"],
      githubUrl: `https://github.com/${GITHUB_USERNAME}/datavizpro`,
      image: "/images/k3.jpg",
    },
    {
      id: "secureauth",
      title: "SecureAuth",
      description: "Auth system",
      longDescription: "Standalone auth service...",
      category: "Security",
      techStack: ["Node.js", "TypeScript", "JWT"],
      stats: { branches: 20, stars: 135, views: 2800 },
      features: ["MFA", "Passwordless", "RBAC"],
      status: "completed",
      startDate: "2022-08",
      endDate: "2023-02",
      demoUrl: "#",
      githubUrl: `https://github.com/${GITHUB_USERNAME}/secureauth`,
      image: "/images/k4.jpg",
    },
    {
      id: "portfolio-v3",
      title: "Personal Portfolio V3",
      description: "This website",
      longDescription: "This website...",
      category: "Web Application",
      techStack: ["Next.js", "React", "Tailwind CSS"],
      stats: { branches: 5, stars: 25, views: 1500 },
      features: ["Showcase", "Blog", "Contact"],
      status: "in-progress",
      startDate: "2024-01",
      githubUrl: `https://github.com/${GITHUB_USERNAME}/portfolio-nextjs`,
      image: "/images/k5.jpg",
      learnings: ["Next.js", "Tailwind"],
    },
    {
      id: "quicknotes",
      title: "QuickNotes",
      description: "Minimalist note app",
      longDescription: "Offline-first PWA...",
      category: "PWA",
      techStack: ["React", "TypeScript", "IndexedDB"],
      stats: { branches: 8, stars: 45, views: 900 },
      features: ["Offline", "Fast search", "PWA"],
      status: "completed",
      startDate: "2023-09",
      endDate: "2024-01",
      demoUrl: "#",
      githubUrl: `https://github.com/${GITHUB_USERNAME}/quicknotes`,
      image: "/images/k6.jpg",
    },
  ];
  const achievements: Achievement[] = [
    {
      title: "OSS Contributor Nominee",
      date: "2023-12",
      description: "Nominated for contributions...",
      icon: fas.faTrophy,
      category: "Community",
      issuer: "OSI (Mock)",
      link: "#",
    },
    {
      title: "Hackathon Winner",
      date: "2023-10",
      description: "1st place TC Disrupt SF...",
      icon: fas.faMedal,
      category: "Competition",
      issuer: "TechCrunch",
      link: "#",
    },
    {
      title: "1M+ npm Downloads",
      date: "2023-08",
      description: "'js-helpers-pro' passed 1M...",
      icon: fas.faDownload,
      category: "Open Source",
      issuer: "npm",
      link: "#",
    },
    {
      title: "ReactConf Speaker",
      date: "2023-06",
      description: "Presented on State Management...",
      icon: fas.faUsers,
      category: "Speaking",
      issuer: "ReactConf",
      link: "#",
    },
    {
      title: "Published Author",
      date: "2023-04",
      description: "Co-authored 'Modern Web Arch'...",
      icon: fas.faBookOpen,
      category: "Publication",
      issuer: "O'Reilly",
      link: "#",
    },
    {
      title: "GitHub Arctic Vault",
      date: "2020-02",
      description: "Code archived...",
      icon: fab.faGithubAlt,
      category: "Community",
      issuer: "GitHub",
      link: "#",
    },
    {
      title: "Top 10% Stack Overflow",
      date: "2022",
      description: "Top 10% PHP tag...",
      icon: fab.faStackOverflow,
      category: "Community",
      issuer: "Stack Overflow",
    },
  ];
  const blogPosts: BlogPost[] = [
    {
      slug: "optimizing-react-performance",
      title: "Optimizing React Apps",
      excerpt: "Deep dive into techniques...",
      content: "...",
      date: "2024-03-15",
      tags: ["React", "Performance"],
      readTime: "10 min",
      likes: 243,
      comments: 57,
      shares: 124,
      category: "Frontend",
      author: "Youralpha",
      image: "/images/k7.jpg",
    },
    {
      slug: "scalable-nodejs-systems",
      title: "Scalable Node.js Systems",
      excerpt: "Guide to microservices, queues...",
      content: "...",
      date: "2024-02-28",
      tags: ["Node.js", "Backend"],
      readTime: "15 min",
      likes: 198,
      comments: 42,
      shares: 86,
      category: "Backend",
      author: "Youralpha",
      image: "/images/k8.jpg",
    },
    {
      slug: "future-web-development-2025",
      title: "Future of Web Dev 2025",
      excerpt: "Trends like AI, WASM...",
      content: "...",
      date: "2024-01-10",
      tags: ["Trends", "Web Dev"],
      readTime: "12 min",
      likes: 312,
      comments: 94,
      shares: 178,
      category: "Industry",
      author: "Youralpha",
      image: "/images/k9.jpg",
    },
    {
      slug: "mastering-typescript",
      title: "Mastering TypeScript",
      excerpt: "Advanced patterns...",
      content: "...",
      date: "2023-12-05",
      tags: ["TypeScript", "Programming"],
      readTime: "18 min",
      likes: 276,
      comments: 63,
      shares: 112,
      category: "Programming",
      author: "Youralpha",
      image: "/images/k10.jpg",
    },
    {
      slug: "ci-cd-explained",
      title: "Demystifying CI/CD",
      excerpt: "Guide with GitHub Actions...",
      content: "...",
      date: "2023-10-20",
      tags: ["CI/CD", "DevOps"],
      readTime: "10 min",
      likes: 180,
      comments: 35,
      shares: 70,
      category: "DevOps",
      author: "Youralpha",
      image: "/images/k11.jpg",
    },
    {
      slug: "choosing-database",
      title: "SQL vs NoSQL",
      excerpt: "Comparison and use cases...",
      content: "...",
      date: "2023-09-01",
      tags: ["Database", "Architecture"],
      readTime: "12 min",
      likes: 220,
      comments: 50,
      shares: 95,
      category: "Database",
      author: "Youralpha",
      image: "/images/k12.jpg",
    },
  ];
  // !! PENTING: Gunakan ID testimonial unik & cocokkan projectLink dengan ID/slug project !!
  const testimonials: Testimonial[] = [
    {
      id: "t1",
      name: "Sarah Johnson",
      position: "CTO",
      company: "TechForward Inc.",
      text: "Game-changer...",
      rating: 5,
      date: "2024-02-10",
      relation: "Client",
      avatar: "/images/k13.jpg",
      projectLink: "tokoeno",
    }, // Tautan ke slug project 'tokoeno'
    {
      id: "t2",
      name: "Michael Chen",
      position: "Lead Dev",
      company: "InnovateX",
      text: "Outstanding code quality...",
      rating: 5,
      date: "2023-11-15",
      relation: "Colleague",
      avatar: "/images/k15.jpg",
      projectLink: "cloudstack",
    }, // Tautan ke slug project 'cloudstack'
    {
      id: "t3",
      name: "Elena Rodriguez",
      position: "Product Manager",
      company: "GlobalTech Solutions",
      text: "Technical depth & product sense...",
      rating: 4.5,
      date: "2023-09-22",
      relation: "Client (Indirect)",
      avatar: "/images/c10.png" /* projectLink opsional */,
    },
    {
      id: "t4",
      name: "David Kim",
      position: "Founder",
      company: "NextGenApps",
      text: "Exceeded expectations...",
      rating: 5,
      date: "2024-01-05",
      relation: "Client",
      avatar: "/images/c9.png",
    },
    {
      id: "t5",
      name: "Professor Davis",
      position: "Professor",
      company: "UC Berkeley",
      text: "Exceptional aptitude...",
      rating: 5,
      date: "2020-05-15",
      relation: "Professor",
      avatar: "/images/k15.jpg",
    },
    {
      id: "t6",
      name: "John Smith",
      position: "Eng Manager",
      company: "Startech Innovations",
      text: "Key contributor...",
      rating: 4,
      date: "2021-03-30",
      relation: "Manager",
      avatar: "/images/k2.jpg" /* projectLink opsional */,
    },
  ];
  const contacts: Contact[] = [
    {
      type: "Email",
      value: "youralpha@example.com",
      icon: fas.faEnvelope,
      isPublic: true,
      link: "mailto:youralpha@example.com",
    },
    {
      type: "Location",
      value: "San Francisco Bay Area, CA",
      icon: fas.faMapMarkerAlt,
      isPublic: true,
    },
    {
      type: "Website",
      value: "https://youralpha.dev",
      icon: fas.faGlobe,
      isPublic: true,
      link: "https://youralpha.dev",
    },
    {
      type: "Phone",
      value: "+1 (555) 123-4567",
      icon: fas.faMobileAlt,
      isPublic: false,
    },
    {
      type: "Calendly",
      value: "Book a Meeting",
      icon: fas.faCalendarCheck,
      isPublic: true,
      link: "https://calendly.com/youralpha/meeting",
    },
  ];
  const socialMedia: SocialMedia[] = [
    {
      platform: "GitHub",
      url: `https://github.com/${GITHUB_USERNAME}`,
      icon: fab.faGithub,
      username: `@${GITHUB_USERNAME}`,
    },
    {
      platform: "LinkedIn",
      url: `https://linkedin.com/in/${LINKEDIN_USERNAME}`,
      icon: fab.faLinkedin,
      username: LINKEDIN_USERNAME,
    },
    {
      platform: "Twitter",
      url: `https://twitter.com/${TWITTER_USERNAME}`,
      icon: fab.faTwitter,
      username: `@${TWITTER_USERNAME}`,
    }, // Atau fab.faXTwitter
    {
      platform: "Medium",
      url: "https://medium.com/@youralpha",
      icon: fab.faMedium,
      username: "@youralpha",
    },
    {
      platform: "Dev.to",
      url: "https://dev.to/youralpha",
      icon: fab.faDev,
      username: "youralpha",
    },
    {
      platform: "Stack Overflow",
      url: "https://stackoverflow.com/users/1234567/youralpha",
      icon: fab.faStackOverflow,
      username: "youralpha",
    },
    {
      platform: "Codepen",
      url: "https://codepen.io/youralpha",
      icon: fab.faCodepen,
      username: "youralpha",
    },
  ];
  const devStats: DevStats = {
    repos: 20,
    stars: 199,
    contributions: 498,
    rating: "4.9/5",
    followers: 358,
    following: 125,
    streak: 87,
    commits: 1245,
    prsOpened: 150,
    issuesClosed: 210,
    rank: "Top 10% GitHub Contributor (Overall)",
  };

  // --- Helper Functions ---
  console.log("Defining Helper Functions...");
  // Konversi IconDefinition ke string nama ikon
  function iconToString(icon: IconDefinition | undefined): string | undefined {
    return icon?.iconName;
  }
  function parseDateString(
    dateStr: string | undefined | null
  ): Date | undefined {
    if (!dateStr) return undefined;
    try {
      if (dateStr.match(/^\d{4}-\d{2}$/))
        return new Date(`${dateStr}-01T00:00:00Z`);
      if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/))
        return new Date(`${dateStr}T00:00:00Z`);
      if (dateStr.match(/^\d{4}$/))
        return new Date(`${dateStr}-01-01T00:00:00Z`);
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) return date;
      console.warn(`Could not parse date string: ${dateStr}.`);
      return undefined;
    } catch (error) {
      console.warn(`Error parsing date string: ${dateStr}`, error);
      return undefined;
    }
  }
  function parseCollaborators(
    collabs: string[] | undefined
  ): Prisma.ProjectCollaboratorCreateNestedManyWithoutProjectInput | undefined {
    if (!collabs || collabs.length === 0) return undefined;
    return {
      create: collabs.map((c) => {
        let name = c.trim();
        let username = name;
        const nameUserMatch = name.match(/^(.*)\s+\(@(.*)\)$/);
        if (nameUserMatch && nameUserMatch.length === 3) {
          name = nameUserMatch[1].trim();
          username = nameUserMatch[2].trim();
        } else if (name.startsWith("@")) {
          username = name.substring(1);
          name = username;
        }
        return { name, username };
      }),
    };
  }
  function parseReadTime(readTimeStr: string | undefined): number | undefined {
    if (!readTimeStr) return undefined;
    const match = readTimeStr.match(/(\d+)\s*min/i);
    return match ? parseInt(match[1], 10) : undefined;
  }
  function parseFloatRating(ratingStr: string | undefined): number | undefined {
    if (!ratingStr) return undefined;
    const match = ratingStr.match(/^([\d.]+)\//);
    return match ? parseFloat(match[1]) : undefined;
  }
  function safeParseFloat(value: string | number | undefined | null): number {
    if (value === null || value === undefined) return 0;
    const parsed = parseFloat(value.toString());
    return isNaN(parsed) ? 0 : parsed;
  }
  function safeParseInt(value: string | number | undefined | null): number {
    if (value === null || value === undefined) return 0;
    const parsed = parseInt(value.toString(), 10);
    return isNaN(parsed) ? 0 : parsed;
  }
  console.log("Helper Functions Defined.");

  // --- Main Seeding Function ---
  async function main() {
    console.log(`---> Start seeding function entered ...`);

    // --- Optional: Clean database ---
    // --- Optional: Clean database ---
    const CLEAN_DATABASE = true; // <-- Set ke true jika ingin membersihkan DB sebelum seed!
    if (CLEAN_DATABASE) {
      console.warn("WARNING: Cleaning existing database...");
      // Hapus junction M2M eksplisit dulu (ProjectTestimonial)
      await prisma.projectTestimonial.deleteMany();
      console.log("- Deleted ProjectTestimonial");

      // Hapus children 1-M (agar tidak ada FK violation saat hapus parent)
      const deletePromises1M = [
        prisma.projectFeature.deleteMany(),
        prisma.projectTechStack.deleteMany(),
        prisma.projectCollaborator.deleteMany(),
        prisma.projectLearning.deleteMany(),
        prisma.workResponsibility.deleteMany(),
        prisma.workTechnology.deleteMany(),
        prisma.workAchievement.deleteMany(),
        prisma.educationAchievement.deleteMany(),
        prisma.certificationSkill.deleteMany(),
        prisma.blogTag.deleteMany(),
        prisma.contributionDay.deleteMany(), // Jika ada
      ];
      await Promise.all(deletePromises1M);
      console.log("- Deleted 1-M children tables");

      // Hapus tabel utama yang punya FK ke User atau relasi kompleks lainnya
      // Hapus DevStats SEBELUM User
      await prisma.devStats.deleteMany();
      console.log("- Deleted DevStats");
      // Hapus tabel lain yang bergantung pada User
      const deletePromisesMain = [
        prisma.contributionData.deleteMany(), // Jika ada
        prisma.timelineEvent.deleteMany(), // Jika ada
        prisma.socialMedia.deleteMany(),
        prisma.contact.deleteMany(),
        prisma.testimonial.deleteMany(),
        prisma.blogPost.deleteMany(),
        prisma.achievement.deleteMany(),
        prisma.certification.deleteMany(),
        prisma.education.deleteMany(),
        prisma.workExperience.deleteMany(),
        // HAPUS Project dan Skill SEBELUM User
        // Menghapus ini secara otomatis menangani M2M implisit
        prisma.project.deleteMany(),
        prisma.skill.deleteMany(),
      ];
      await Promise.all(deletePromisesMain);
      console.log("- Deleted main dependent tables (Project, Skill, etc.)");

      // Hapus baris updateMany yang menyebabkan error:
      // await prisma.skill.updateMany({ data: { projects: { set: [] } } }); // <-- HAPUS BARIS INI

      // Terakhir User
      await prisma.user.deleteMany();
      console.log("- Deleted Users");
      console.log("Database cleaning finished.");
    }

    // 1. Create/Update User
    console.log("Upserting User...");
    const user = await prisma.user.upsert({
      where: { email: "youralpha@example.com" }, // GANTI EMAIL UNIKMU
      update: {
        // Data untuk update jika user sudah ada
        name: "Alpha Reno", // Ganti namamu
        username: "alphareno", // Ganti username
        phone: contacts.find((c) => c.type === "Phone")?.value,
        location: contacts.find((c) => c.type === "Location")?.value,
        bio: "Passionate Full Stack Developer specializing in modern web technologies.", // Ganti bio
        website: contacts.find((c) => c.type === "Website")?.value,
        avatar: "/images/avatar-placeholder.png", // Ganti avatar
      },
      create: {
        // Data untuk create jika user belum ada
        name: "Alpha Reno", // Ganti namamu
        username: "alphareno", // Ganti username
        email: "youralpha@example.com", // Ganti email unikmu
        phone: contacts.find((c) => c.type === "Phone")?.value,
        location: contacts.find((c) => c.type === "Location")?.value,
        bio: "Passionate Full Stack Developer specializing in modern web technologies.", // Ganti bio
        website: contacts.find((c) => c.type === "Website")?.value,
        avatar: "/images/avatar-placeholder.png", // Ganti avatar
      },
    });
    console.log(`Upserted user: ${user.username} (ID: ${user.id})`);

    // 2. Create Skills (Simpan untuk M2M)
    const createdSkillsMap = new Map<
      string,
      { id: string; projectsUsedIn?: string[] }
    >();
    console.log("Creating skills...");
    for (const skill of skillsData) {
      const createdSkill = await prisma.skill.create({
        data: {
          userId: user.id,
          name: skill.name,
          percentage: safeParseInt(skill.percentage),
          color: skill.color,
          icon: iconToString(skill.icon), // Convert icon object to string name
          category: skill.category,
          description: skill.description,
          years: safeParseFloat(skill.years),
        },
      });
      createdSkillsMap.set(skill.name, {
        id: createdSkill.id,
        projectsUsedIn: skill.projectsUsedIn,
      });
    }
    console.log(`Created ${createdSkillsMap.size} skills.`);

    // 3. Create Testimonials (Simpan untuk M2M)
    const createdTestimonialsMap = new Map<
      string,
      { id: string; projectLink?: string }
    >();
    console.log("Creating testimonials...");
    for (const testimonial of testimonials) {
      // Gunakan data asli: testimonials
      const parsedDate = parseDateString(testimonial.date);
      if (!parsedDate) {
        console.warn(
          `Skipping testimonial "${testimonial.name}" due to invalid date.`
        );
        continue;
      }
      const createdTestimonial = await prisma.testimonial.create({
        data: {
          userId: user.id,
          name: testimonial.name,
          position: testimonial.position,
          company: testimonial.company,
          text: testimonial.text,
          avatar: testimonial.avatar,
          rating: Math.round(safeParseFloat(testimonial.rating)),
          date: parsedDate,
          relation: testimonial.relation,
          projectLink: testimonial.projectLink, // Simpan link untuk M2M
        },
      });
      createdTestimonialsMap.set(testimonial.id, {
        id: createdTestimonial.id,
        projectLink: testimonial.projectLink,
      });
    }
    console.log(`Created ${createdTestimonialsMap.size} testimonials.`);

    // 4. Create Projects (Simpan untuk M2M)
    const createdProjectsMap = new Map<string, { id: string }>();
    console.log("Creating projects...");
    for (const project of projects) {
      // Gunakan data asli: projects
      const startDate = parseDateString(project.startDate);
      if (!startDate) {
        console.warn(
          `Skipping project "${project.title}" due to invalid start date.`
        );
        continue;
      }
      try {
        const createdProject = await prisma.project.create({
          data: {
            userId: user.id,
            title: project.title,
            slug: project.id,
            description: project.description,
            longDescription: project.longDescription ?? "",
            category: project.category,
            image: project.image,
            demoUrl: project.demoUrl,
            githubUrl: project.githubUrl,
            status: project.status,
            startDate: startDate,
            endDate: parseDateString(project.endDate),
            branches: safeParseInt(project.stats?.branches),
            stars: safeParseInt(project.stats?.stars),
            views: safeParseInt(project.stats?.views),
            forks: safeParseInt(project.stats?.forks),
            issues: safeParseInt(project.stats?.issues),
            commits: safeParseInt(project.stats?.commits),
            features: project.features
              ? { create: project.features.map((f) => ({ feature: f })) }
              : undefined,
            techStack: project.techStack
              ? { create: project.techStack.map((t) => ({ tech: t })) }
              : undefined,
            collaborators: parseCollaborators(project.collaborators),
            learnings: project.learnings
              ? { create: project.learnings.map((l) => ({ learning: l })) }
              : undefined,
          },
        });
        createdProjectsMap.set(createdProject.slug, { id: createdProject.id });
      } catch (error: unknown) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          console.warn(
            `Project slug "${project.id}" already exists. Fetching existing ID...`
          );
          const existing = await prisma.project.findUnique({
            where: { slug: project.id },
            select: { id: true },
          });
          if (existing) createdProjectsMap.set(project.id, { id: existing.id });
          else
            console.error(
              `Could not fetch existing project for slug "${project.id}" despite P2002 error.`
            );
        } else {
          console.error(`Error creating project "${project.title}":`, error);
        }
      }
    }
    console.log(`Created/Found ${createdProjectsMap.size} projects.`);

    // 5. Create Work Experiences
    console.log("Creating work experiences...");
    for (const exp of workExperience) {
      // Gunakan data asli: workExperience
      await prisma.workExperience.create({
        data: {
          userId: user.id,
          company: exp.company,
          position: exp.position,
          period: exp.period,
          description: exp.description,
          location: exp.location,
          type: exp.type,
          logo: exp.logo,
          website: exp.website,
          responsibilities: exp.responsibilities
            ? {
                create: exp.responsibilities.map((r) => ({
                  responsibility: r,
                })),
              }
            : undefined,
          technologies: exp.technologies
            ? { create: exp.technologies.map((t) => ({ technology: t })) }
            : undefined,
          achievements: exp.achievements
            ? { create: exp.achievements.map((a) => ({ achievement: a })) }
            : undefined,
        },
      });
    }
    console.log(`Created ${workExperience.length} work experiences.`);

    // 6. Create Educations
    console.log("Creating educations...");
    for (const edu of educationData) {
      // Gunakan data asli: educationData
      await prisma.education.create({
        data: {
          userId: user.id,
          institution: edu.institution,
          degree: edu.degree,
          field: edu.field,
          period: edu.period,
          description: edu.description,
          gpa: edu.gpa,
          location: edu.location,
          logo: edu.logo,
          achievements: edu.achievements
            ? { create: edu.achievements.map((a) => ({ achievement: a })) }
            : undefined,
        },
      });
    }
    console.log(`Created ${educationData.length} educations.`);

    // 7. Create Certifications
    console.log("Creating certifications...");
    for (const cert of certifications) {
      // Gunakan data asli: certifications
      const date = parseDateString(cert.date);
      if (!date) {
        console.warn(
          `Skipping certification "${cert.name}" due to invalid date.`
        );
        continue;
      }
      await prisma.certification.create({
        data: {
          userId: user.id,
          name: cert.name,
          issuer: cert.issuer,
          date: date,
          icon: iconToString(cert.icon), // Convert icon object to string name
          credentialId: cert.credentialId,
          expiry: parseDateString(cert.expiry),
          description: cert.description,
          verificationUrl: cert.verificationUrl,
          skills: cert.skills
            ? { create: cert.skills.map((s) => ({ skill: s })) }
            : undefined,
        },
      });
    }
    console.log(`Created ${certifications.length} certifications.`);

    // 8. Create Achievements
    console.log("Creating achievements...");
    for (const achievement of achievements) {
      // Gunakan data asli: achievements
      const date = parseDateString(achievement.date);
      if (!date) {
        console.warn(
          `Skipping achievement "${achievement.title}" due to invalid date.`
        );
        continue;
      }
      await prisma.achievement.create({
        data: {
          userId: user.id,
          title: achievement.title,
          date: date,
          description: achievement.description,
          icon: iconToString(achievement.icon), // Convert icon object to string name
          category: achievement.category,
          issuer: achievement.issuer,
          link: achievement.link,
        },
      });
    }
    console.log(`Created ${achievements.length} achievements.`);

    // 9. Create Blog Posts
    console.log("Creating blog posts...");
    let createdBlogCount = 0;
    for (const post of blogPosts) {
      // Gunakan data asli: blogPosts
      const date = parseDateString(post.date);
      if (!date) {
        console.warn(`Skipping blog post "${post.title}" due to invalid date.`);
        continue;
      }
      try {
        await prisma.blogPost.create({
          data: {
            userId: user.id,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content ?? "",
            date: date,
            readTime: parseReadTime(post.readTime) ?? 5,
            image: post.image,
            likes: safeParseInt(post.likes),
            comments: safeParseInt(post.comments),
            shares: safeParseInt(post.shares),
            views: safeParseInt(post.views),
            category: post.category,
            author: post.author ?? user.name,
            tags: post.tags
              ? { create: post.tags.map((t) => ({ tag: t })) }
              : undefined,
          },
        });
        createdBlogCount++;
      } catch (error: unknown) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          console.warn(
            `Blog post slug "${post.slug}" already exists. Skipping.`
          );
        } else {
          console.error(`Error creating blog post "${post.title}":`, error);
        }
      }
    }
    console.log(`Created ${createdBlogCount} blog posts.`);

    // 10. Create Contacts
    console.log("Creating contacts...");
    let createdContactCount = 0;
    for (const contact of contacts) {
      // Gunakan data asli: contacts
      // Skip Email/Website karena mungkin sudah di User model
      if (contact.type === "Email" || contact.type === "Website") {
        console.log(
          `Skipping contact type "${contact.type}" as it might be on the User model.`
        );
        continue;
      }
      await prisma.contact.create({
        data: {
          userId: user.id,
          type: contact.type,
          value: contact.value,
          icon: iconToString(contact.icon), // Convert icon object to string name
          isPublic: contact.isPublic,
          link: contact.link,
        },
      });
      createdContactCount++;
    }
    console.log(`Created ${createdContactCount} contacts.`);

    // 11. Create Social Media
    console.log("Creating social media...");
    for (const social of socialMedia) {
      // Gunakan data asli: socialMedia
      await prisma.socialMedia.create({
        data: {
          userId: user.id,
          platform: social.platform,
          url: social.url,
          icon: iconToString(social.icon), // Convert icon object to string name
          username: social.username,
        },
      });
    }
    console.log(`Created ${socialMedia.length} social media links.`);

    // 12. Create/Update Dev Stats
    console.log("Upserting dev stats...");
    if (devStats) {
      // Gunakan data asli: devStats
      await prisma.devStats.upsert({
        where: { userId: user.id },
        update: {
          repos: safeParseInt(devStats.repos),
          stars: safeParseInt(devStats.stars),
          contributions: safeParseInt(devStats.contributions),
          rating: parseFloatRating(devStats.rating) ?? 0.0,
          followers: safeParseInt(devStats.followers),
          following: safeParseInt(devStats.following),
          streak: safeParseInt(devStats.streak),
          commits: safeParseInt(devStats.commits),
          prsOpened: safeParseInt(devStats.prsOpened),
          issuesClosed: safeParseInt(devStats.issuesClosed),
          rank: devStats.rank,
        },
        create: {
          userId: user.id,
          repos: safeParseInt(devStats.repos),
          stars: safeParseInt(devStats.stars),
          contributions: safeParseInt(devStats.contributions),
          rating: parseFloatRating(devStats.rating) ?? 0.0,
          followers: safeParseInt(devStats.followers),
          following: safeParseInt(devStats.following),
          streak: safeParseInt(devStats.streak),
          commits: safeParseInt(devStats.commits),
          prsOpened: safeParseInt(devStats.prsOpened),
          issuesClosed: safeParseInt(devStats.issuesClosed),
          rank: devStats.rank,
        },
      });
      console.log(`Upserted dev stats for user: ${user.username}`);
    } else {
      console.log("No dev stats data provided.");
    }

    // --- Connect Many-to-Many Relations ---
    console.log("Connecting Skills and Projects (M2M)...");
    let skillProjectLinks = 0;
    for (const [skillName, skillData] of createdSkillsMap.entries()) {
      if (skillData.projectsUsedIn && skillData.projectsUsedIn.length > 0) {
        const projectConnections = [];
        for (const projectIdentifier of skillData.projectsUsedIn) {
          // projectIdentifier bisa ID atau Title
          // Coba cari project berdasarkan slug (ID dari data) atau title
          const projectSlugOrTitle = projectIdentifier; // Asumsikan ID/slug dulu
          let foundProject = createdProjectsMap.get(projectSlugOrTitle);

          if (foundProject) {
            projectConnections.push({ id: foundProject.id }); // Hubungkan via ID primary key
          } else {
            // Jika tidak ketemu via slug, coba cari via title (lebih rapuh)
            console.warn(
              `Skill "${skillName}" - Project slug "${projectSlugOrTitle}" not found directly. Trying by title...`
            );
            const projectByTitle = await prisma.project.findFirst({
              where: { title: projectSlugOrTitle, userId: user.id },
              select: { id: true },
            });
            if (projectByTitle) {
              console.warn(
                `   Found project by title: "${projectSlugOrTitle}" (ID: ${projectByTitle.id})`
              );
              projectConnections.push({ id: projectByTitle.id });
            } else {
              console.error(
                `   ERROR: Skill "${skillName}" wants to connect to non-existent project (slug/title): "${projectSlugOrTitle}". Skipping connection.`
              );
            }
          }
        }
        if (projectConnections.length > 0) {
          try {
            await prisma.skill.update({
              where: { id: skillData.id },
              data: { projects: { connect: projectConnections } },
            });
            skillProjectLinks += projectConnections.length;
          } catch (m2mError) {
            console.error(
              `Error connecting Skill "${skillName}" to projects:`,
              m2mError
            );
          }
        }
      }
    }
    console.log(`Created ${skillProjectLinks} Skill-Project links.`);

    console.log("Connecting Projects and Testimonials (M2M)...");
    let projectTestimonialLinks = 0;
    for (const [
      testimonialDynamicId,
      testimonialData,
    ] of createdTestimonialsMap.entries()) {
      if (testimonialData.projectLink) {
        // Cari project berdasarkan slug (projectLink diasumsikan = project.id/slug)
        // Atau cari berdasarkan judul jika projectLink adalah judul
        const projectIdentifier = testimonialData.projectLink;
        let relatedProject = createdProjectsMap.get(projectIdentifier);

        if (!relatedProject) {
          console.warn(
            `Testimonial "${testimonialData.id}" - Project slug "${projectIdentifier}" not found directly. Trying by title...`
          );
          const projectByTitle = await prisma.project.findFirst({
            where: { title: projectIdentifier, userId: user.id },
            select: { id: true },
          });
          if (projectByTitle) {
            console.warn(
              `   Found project by title: "${projectIdentifier}" (ID: ${projectByTitle.id})`
            );
            relatedProject = { id: projectByTitle.id }; // Gunakan ID yang ditemukan
          }
        }

        if (relatedProject) {
          try {
            await prisma.projectTestimonial.create({
              data: {
                projectId: relatedProject.id,
                testimonialId: testimonialData.id,
              },
            });
            projectTestimonialLinks++;
          } catch (error: unknown) {
            if (
              error instanceof Prisma.PrismaClientKnownRequestError &&
              error.code === "P2002"
            ) {
              /* Link exists, ignore */
            } else {
              console.error(
                `Error creating ProjectTestimonial link for Testimonial DynID ${testimonialDynamicId} & Project ${projectIdentifier}:`,
                error
              );
            }
          }
        } else {
          console.error(
            `   ERROR: Could not find project (slug/title) '${projectIdentifier}' referenced by testimonial (DynID: ${testimonialDynamicId}). Skipping connection.`
          );
        }
      }
    }
    console.log(
      `Created ${projectTestimonialLinks} Project-Testimonial links.`
    );

    console.log(`---> Seeding finished successfully.`);
  }

  // --- Run the Seeding Function ---
  console.log("Calling main function execution...");
  main()
    .catch((e) => {
      console.error("!!! ERROR during seeding execution:");
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      console.log("Disconnecting Prisma Client...");
      await prisma.$disconnect();
      console.log("Prisma Client disconnected.");
      console.log("--- FINAL SEED SCRIPT FINISHED ---");
    });
} catch (initializationError) {
  console.error("!!! CRITICAL ERROR during script initialization:");
  console.error(initializationError);
  console.log("--- FINAL SEED SCRIPT FAILED AT INITIALIZATION ---");
  process.exit(1);
}
