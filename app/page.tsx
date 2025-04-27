"use client";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  Fragment,
} from "react";
import {
  Chart,
  registerables,
  ChartConfiguration,
  TooltipItem,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Transition, Dialog } from "@headlessui/react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";

library.add(
  fas.faShareAlt,
  fas.faBookmark,
  fas.faEllipsisH,
  fas.faCheckCircle,
  fas.faCodeBranch,
  fas.faStar,
  fas.faEye,
  fas.faUserCircle,
  fas.faHome,
  fas.faCode,
  fas.faBriefcase,
  fas.faAward,
  fas.faChartLine,
  fas.faRss,
  fas.faCommentDots,
  fas.faEnvelope,
  fas.faMapMarkerAlt,
  fas.faCalendarAlt,
  fas.faUsers,
  fas.faGlobe,
  fas.faPaperPlane,
  fas.faDownload,
  fas.faPrint,
  fas.faChevronLeft,
  fas.faChevronRight,
  fas.faSearch,
  fas.faFilter,
  fas.faSort,
  fas.faListUl,
  fas.faTable,
  fas.faPlus,
  fas.faMinus,
  fas.faCheck,
  fas.faTimes,
  fas.faInfoCircle,
  fas.faExclamationCircle,
  fas.faQuestionCircle,
  fas.faLayerGroup,
  fas.faServer,
  fas.faDatabase,
  fas.faLock,
  fas.faShieldAlt,
  fas.faChartPie,
  fas.faChartBar,
  fas.faCloudUploadAlt,
  fas.faCloudDownloadAlt,
  fas.faCog,
  fas.faSync,
  fas.faPlay,
  fas.faPause,
  fas.faStop,
  fas.faForward,
  fas.faBackward,
  fas.faBell,
  fas.faExclamationTriangle,
  fas.faLightbulb,
  fas.faBolt,
  fas.faMagic,
  fas.faGraduationCap,
  fas.faToolbox,
  fas.faNetworkWired,
  fas.faTerminal,
  fas.faMicrochip,
  fas.faClock,
  fas.faCalendarCheck,
  fas.faFileCode,
  fas.faFileAlt,
  fas.faFilePdf,
  fas.faFileExcel,
  fas.faLink,
  fas.faRocket,
  fas.faTrophy,
  fas.faMedal,
  fas.faCertificate,
  fas.faHandshake,
  fas.faProjectDiagram,
  fas.faHistory,
  fas.faBookOpen,
  fas.faLaptopCode,
  fas.faWindowMaximize,
  fas.faMobileAlt,
  fas.faTabletAlt,
  fas.faWrench,
  fas.faTools,
  fas.faSpinner,
  fas.faBars,
  fas.faMoon,
  fas.faSun,
  fas.faExternalLinkAlt,
  fas.faCodeCompare,
  fas.faUserFriends,
  fas.faBuilding,
  fas.faCalendarDay,
  fas.faMapPin,
  fas.faBriefcaseMedical,
  fas.faUserTie,
  fas.faUniversity,
  fas.faBook,
  fas.faBlog,
  fas.faQuoteLeft,
  fas.faStarHalfAlt,
  fas.faFileExport,
  fas.faTrash,
  fas.faEyeSlash,
  fas.faCopy,
  fas.faCheckDouble,
  fas.faHourglassHalf,
  fas.faClipboardList,
  fas.faTasks,
  fas.faComments,
  fas.faShare,
  fas.faThumbsUp,
  fas.faClockRotateLeft,

  fab.faGithub,
  fab.faTwitter,
  fab.faLinkedin,
  fab.faLaravel,
  fab.faAws,
  fab.faReact,
  fab.faNode,
  fab.faPython,
  fab.faVuejs,
  fab.faAngular,
  fab.faDocker,
  fab.faStripe,
  fab.faJsSquare,
  fab.faCss3,
  fab.faHtml5,
  fab.faBootstrap,
  fab.faFigma,
  fab.faWordpress,
  fab.faNpm,
  fab.faYarn,
  fab.faGitAlt,
  fab.faGithubAlt,
  fab.faApple,
  fab.faAndroid,
  fab.faSlack,
  fab.faDiscord,
  fab.faTelegram,
  fab.faWhatsapp,
  fab.faStackOverflow,
  fab.faMedium,
  fab.faDev,
  fab.faCodepen,
  fab.faDigitalOcean,
  fab.faAmazon,
  fab.faGoogle,
  fab.faMicrosoft,
  fab.faFacebook,
  fab.faInstagram
);

Chart.register(...registerables);

// --- INTERFACES ---
// (Interfaces remain largely the same, maybe add optional fields if needed later)

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

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionData {
  year: number;
  total: number;
  range: { start: string; end: string };
  contributions: ContributionDay[];
}

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

interface TechStackItem {
  name: string;
  icon: IconDefinition;
  proficiency: number;
  category:
    | "Frontend"
    | "Backend"
    | "DevOps"
    | "Database"
    | "Language"
    | "Tools"
    | "Other";
  yearsOfExperience: number;
  description?: string;
}

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
  icon: IconDefinition;
  color?: string;
}

// --- CONSTANTS ---
const PROJECTS_PER_PAGE = 6;
const BLOG_POSTS_PER_PAGE = 4;
const GITHUB_USERNAME = "AlphaIsYour";
const LINKEDIN_USERNAME = "alphareno-yanuar-syaputra";
const TWITTER_USERNAME = "yrlpha";

// --- DATA ---

const skillsData: Skill[] = [
  // --- Backend ---
  {
    name: "PHP",
    percentage: 92,
    color: "from-blue-600 to-indigo-500",
    icon: fab.faLaravel,
    category: "backend",
    description:
      "Expert in building scalable applications with PHP 8+, Laravel & Symfony.",
    years: 5,
    projectsUsedIn: ["Tokoeno E-Commerce", "GlobalSoft Solutions E-comm"],
  },
  {
    name: "Node.js",
    percentage: 85,
    color: "from-green-500 to-emerald-400",
    icon: fab.faNode,
    category: "backend",
    description:
      "Strong experience with Node.js, Express, NestJS, and serverless architectures.",
    years: 4,
    projectsUsedIn: ["DevTracker", "SecureAuth"],
  },
  {
    name: "Python",
    percentage: 78,
    color: "from-blue-500 to-purple-500",
    icon: fab.faPython,
    category: "backend",
    description:
      "Proficient in Python for web development (Django/Flask), scripting, and data tasks.",
    years: 3,
    projectsUsedIn: ["AIAcademy", "Startech SaaS"],
  },
  {
    name: "GraphQL",
    percentage: 75,
    color: "from-pink-500 to-rose-500",
    icon: fas.faCode,
    category: "backend",
    description:
      "Building efficient and flexible APIs using GraphQL with Apollo Server/Client.",
    years: 2,
    projectsUsedIn: ["CloudStack", "DevTracker"],
  },
  {
    name: "Serverless",
    percentage: 70,
    color: "from-orange-500 to-amber-500",
    icon: fab.faAws,
    category: "backend",
    description:
      "Developing and deploying serverless functions on AWS Lambda and similar platforms.",
    years: 2.5,
  },

  // --- Frontend ---
  {
    name: "JavaScript",
    percentage: 90,
    color: "from-yellow-400 to-amber-500",
    icon: fab.faJsSquare,
    category: "frontend",
    description:
      "Deep understanding of modern JavaScript (ES6+), TypeScript, and async patterns.",
    years: 5,
  },
  {
    name: "React",
    percentage: 91,
    color: "from-blue-400 to-cyan-300",
    icon: fab.faReact,
    category: "frontend",
    description:
      "Advanced knowledge of React.js, Hooks, Context API, Redux, and performance optimization.",
    years: 4,
    projectsUsedIn: [
      "DevTracker",
      "CloudStack",
      "DataVizPro",
      "Tech Innovators Apps",
    ],
  },
  {
    name: "Next.js",
    percentage: 88,
    color: "from-gray-700 to-gray-500",
    icon: fab.faReact,
    category: "framework",
    description:
      "Building SSR and SSG applications with Next.js, including API routes and Vercel deployment.",
    years: 3,
    projectsUsedIn: ["Tokoeno E-Commerce", "Personal Website"],
  },
  {
    name: "Vue.js",
    percentage: 80,
    color: "from-green-500 to-teal-400",
    icon: fab.faVuejs,
    category: "frontend",
    description:
      "Solid experience with Vue.js, Vuex, Vue Router for interactive UIs.",
    years: 2.5,
    projectsUsedIn: ["AIAcademy", "GlobalSoft E-comm"],
  },
  {
    name: "HTML/CSS",
    percentage: 95,
    color: "from-red-500 to-orange-400",
    icon: fab.faHtml5,
    category: "frontend",
    description:
      "Expert in semantic HTML5, CSS3, SASS/SCSS, Tailwind CSS, and responsive design.",
    years: 5,
  },
  {
    name: "Tailwind CSS",
    percentage: 93,
    color: "from-cyan-500 to-blue-500",
    icon: fab.faCss3,
    category: "library",
    description:
      "Highly proficient in utility-first CSS with Tailwind for rapid UI development.",
    years: 3,
  },

  // --- DevOps ---
  {
    name: "Docker",
    percentage: 82,
    color: "from-blue-500 to-cyan-400",
    icon: fab.faDocker,
    category: "devops",
    description:
      "Expert in containerization, Docker Compose, multi-stage builds, and optimization.",
    years: 3.5,
    projectsUsedIn: ["DevTracker", "GlobalSoft E-comm", "CloudStack"],
  },
  {
    name: "AWS",
    percentage: 76,
    color: "from-orange-600 to-amber-500",
    icon: fab.faAws,
    category: "devops",
    description:
      "Experience with EC2, S3, RDS, Lambda, CloudFormation, VPC, IAM, Route 53.",
    years: 3,
    projectsUsedIn: ["Tokoeno E-Commerce", "Startech SaaS"],
  },
  {
    name: "CI/CD",
    percentage: 85,
    color: "from-purple-600 to-indigo-400",
    icon: fas.faCodeBranch,
    category: "devops",
    description:
      "Setting up robust CI/CD pipelines using GitHub Actions, GitLab CI, Jenkins.",
    years: 4,
  },
  {
    name: "Kubernetes",
    percentage: 70,
    color: "from-blue-600 to-sky-500",
    icon: fas.faServer,
    category: "devops",
    description:
      "Understanding of K8s concepts, deployment strategies, Helm charts.",
    years: 2,
    projectsUsedIn: ["CloudStack", "Startech SaaS"],
  },
  {
    name: "Terraform",
    percentage: 65,
    color: "from-purple-500 to-violet-500",
    icon: fas.faCloudUploadAlt,
    category: "devops",
    description:
      "Infrastructure as Code (IaC) using Terraform for managing cloud resources.",
    years: 1.5,
    projectsUsedIn: ["CloudStack"],
  },

  // --- Database ---
  {
    name: "SQL (Postgres/MySQL)",
    percentage: 88,
    color: "from-sky-600 to-cyan-500",
    icon: fas.faDatabase,
    category: "database",
    description:
      "Proficient in SQL, relational database design, query optimization, indexing.",
    years: 5,
    projectsUsedIn: [
      "Tokoeno E-Commerce",
      "GlobalSoft E-comm",
      "Startech SaaS",
    ],
  },
  {
    name: "MongoDB",
    percentage: 80,
    color: "from-green-600 to-lime-500",
    icon: fas.faDatabase,
    category: "database",
    description:
      "Experienced in NoSQL, MongoDB schema design, aggregation framework, Mongoose.",
    years: 3,
    projectsUsedIn: ["DevTracker", "SecureAuth"],
  },
  {
    name: "Redis",
    percentage: 75,
    color: "from-red-600 to-rose-500",
    icon: fas.faDatabase,
    category: "database",
    description:
      "Using Redis for caching, session management, and message queuing.",
    years: 3,
    projectsUsedIn: ["GlobalSoft E-comm"],
  },
  // --- Tools & Others ---
  {
    name: "Git",
    percentage: 98,
    color: "from-orange-500 to-red-500",
    icon: fab.faGitAlt,
    category: "tools",
    description:
      "Advanced Git workflow management, branching strategies (GitFlow), rebasing.",
    years: 5,
  },
  {
    name: "Testing (Jest/PHPUnit)",
    percentage: 80,
    color: "from-emerald-500 to-green-500",
    icon: fas.faCheckDouble,
    category: "tools",
    description: "Unit, integration, and E2E testing practices.",
    years: 4,
  },
  {
    name: "Figma",
    percentage: 60,
    color: "from-purple-500 to-pink-500",
    icon: fab.faFigma,
    category: "tools",
    description:
      "Translating Figma designs into functional code, basic prototyping.",
    years: 2,
  },
  {
    name: "Agile/Scrum",
    percentage: 90,
    color: "from-yellow-500 to-lime-500",
    icon: fas.faUsers,
    category: "other",
    description:
      "Experienced working in Agile environments, sprint planning, retrospectives.",
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
    description:
      "Validates technical expertise in developing, deploying, and debugging cloud-based applications using AWS.",
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
    description:
      "Certifies proficiency in developing modern web applications using the Laravel framework following best practices.",
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
    description:
      "Demonstrates advanced knowledge of React.js, state management patterns, and related ecosystem technologies.",
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
    description:
      "Validates skills, knowledge and competency to perform the responsibilities of a Kubernetes Administrator.",
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
    description:
      "Certifies advanced knowledge of MongoDB database development, optimization, and data modeling.",
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
    description: "Demonstrates a fundamental level of Scrum mastery.",
    verificationUrl: "#",
  },
];

const educationData: Education[] = [
  {
    institution: "Stanford University",
    degree: "Master of Science",
    field: "Computer Science",
    period: "2020 - 2022",
    description:
      "Specialized in Artificial Intelligence and Machine Learning with focus on Natural Language Processing. Coursework included Advanced Algorithms, Deep Learning, Distributed Systems.",
    gpa: "3.92/4.0",
    achievements: [
      "Graduated with Distinction",
      "Published research paper on NLP techniques",
      "Teaching Assistant for Advanced Algorithms course",
    ],
    location: "Stanford, CA",
    logo: "/logo/c1.png",
  },
  {
    institution: "University of California, Berkeley",
    degree: "Bachelor of Science",
    field: "Computer Engineering",
    period: "2016 - 2020",
    description:
      "Comprehensive curriculum covering software engineering principles, hardware design, and distributed systems. Emphasis on practical application and team projects.",
    gpa: "3.85/4.0",
    achievements: [
      "Dean's List (all semesters)",
      "Capstone project: Distributed file system with Byzantine fault tolerance",
      "Member of ACM and IEEE student chapters",
      "Recipient of EECS Departmental Scholarship",
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
    description:
      "Leading development of enterprise-level SaaS applications within an Agile team, focusing on scalability, performance, and user experience.",
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
      "Reduced application load time by 60% through strategic code splitting, lazy loading, and backend optimization.",
      "Architected and implemented a CI/CD pipeline using GitHub Actions that decreased deployment time by 75% and improved reliability.",
      "Led the successful migration of a critical legacy system from a monolithic architecture to microservices, improving scalability and team velocity.",
      "Mentored 3 junior developers, fostering their growth and improving team code quality standards.",
    ],
    location: "San Francisco, CA",
    type: "full-time",
    responsibilities: [
      "Architect and develop scalable, secure, and maintainable web applications.",
      "Lead front-end and back-end development efforts for key product features.",
      "Design and implement database schemas (SQL & NoSQL) and robust APIs.",
      "Collaborate closely with product managers, UX designers, and stakeholders on requirements and feature planning.",
      "Perform thorough code reviews, enforce coding standards, and promote best practices.",
      "Optimize application performance and cloud infrastructure costs.",
      "Troubleshoot complex technical issues in production environments.",
    ],
    logo: "/logo/c3.png",
    website: "https://techinnovators.example.com",
  },
  {
    company: "GlobalSoft Solutions",
    position: "Full Stack Developer",
    period: "Apr 2021 - Dec 2022",
    description:
      "Developed and maintained complex e-commerce platforms and custom web applications for various B2B and B2C clients.",
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
      "Engineered a real-time inventory management system integrated with multiple suppliers, increasing operational efficiency by 40%.",
      "Successfully implemented payment gateway integrations for 5 major providers (Stripe, PayPal, Braintree, etc.).",
      "Optimized critical database queries and implemented caching strategies (Redis), resulting in a 30% faster average checkout process.",
      "Contributed significantly to developing a reusable component library in Vue.js, speeding up future development.",
    ],
    location: "Boston, MA",
    type: "full-time",
    responsibilities: [
      "Developed custom e-commerce features and solutions tailored to specific client needs.",
      "Created and consumed RESTful APIs for integrations with mobile applications and third-party services.",
      "Implemented effective caching strategies to enhance application speed and reduce server load.",
      "Actively participated in Agile development cycles, including sprint planning, daily stand-ups, and retrospectives.",
      "Diagnosed and resolved bugs and performance bottlenecks in production systems.",
      "Wrote unit and integration tests to ensure code reliability.",
    ],
    logo: "/logo/c4.png",
    website: "https://globalsoft.example.com",
  },
  {
    company: "Startech Innovations",
    position: "Backend Developer",
    period: "Jun 2020 - Mar 2021",
    description:
      "Focused on the backend development of a cloud-native SaaS platform for financial analytics, handling large datasets and complex business logic.",
    technologies: [
      "Python",
      "Django",
      "PostgreSQL",
      "AWS (Lambda, SQS, EC2)",
      "Kubernetes",
      "Celery",
      "REST APIs",
    ],
    achievements: [
      "Developed a high-throughput data processing pipeline using Celery and SQS that reliably handled over 1 million financial transactions daily.",
      "Implemented a secure and scalable API authentication system based on OAuth 2.0 and JWT.",
      "Contributed to infrastructure optimization efforts, reducing monthly AWS server costs by approximately 35% through resource tuning and autoscaling.",
      "Authored comprehensive technical documentation for internal APIs and services.",
    ],
    location: "New York, NY",
    type: "full-time",
    responsibilities: [
      "Designed, implemented, and maintained backend microservices and RESTful APIs.",
      "Optimized database performance for large-scale financial datasets, including query tuning and indexing.",
      "Integrated the platform with various external financial data provider APIs.",
      "Developed automated testing suites (unit, integration) to ensure service stability.",
      "Collaborated with frontend developers and data scientists.",
      "Participated in on-call rotation for production support.",
    ],
    logo: "/logo/c7.png",
    website: "https://startech.example.com",
  },
  // Add one more experience entry
  {
    company: "Web Solutions Agency (Freelance)",
    position: "Freelance Web Developer",
    period: "Jan 2019 - May 2020",
    description:
      "Provided freelance web development services to small businesses and startups, building websites and custom web applications.",
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
    achievements: [
      "Delivered over 15+ websites for clients across various industries.",
      "Developed a custom WordPress plugin for event management used by a local non-profit.",
      "Received consistently positive client feedback for communication and project delivery.",
    ],
    location: "Remote",
    type: "freelance",
    responsibilities: [
      "Gathered client requirements and provided project estimates.",
      "Designed and developed responsive websites, primarily using WordPress.",
      "Customized themes and developed custom plugins.",
      "Provided website maintenance and support.",
      "Managed project timelines and client communication.",
    ],
    logo: "/logo/c8.png",
  },
];

const projects: Project[] = [
  {
    id: "tokoeno",
    title: "Tokoeno E-Commerce",
    description:
      "A comprehensive e-commerce solution with advanced inventory management, payment processing, and customer analytics.",
    longDescription:
      "Tokoeno is a full-featured, scalable e-commerce platform built from the ground up using modern technologies. It supports multi-vendor setups, complex product variations, real-time inventory updates, multiple payment gateways (Stripe, PayPal), and includes a detailed admin dashboard for managing orders, customers, and viewing sales analytics. The frontend is built with Next.js for optimal performance and SEO, while the backend leverages Prisma and PostgreSQL for robust data management.",
    category: "Full Stack",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Tailwind CSS",
      "AWS S3",
    ],
    stats: {
      branches: 25,
      stars: 145,
      views: 3200,
      forks: 42,
      issues: 12,
      commits: 580,
    },
    features: [
      "Real-time inventory tracking",
      "Multi-payment gateway integration",
      "Advanced analytics dashboard",
      "Responsive mobile-first design",
      "Multi-vendor marketplace support",
      "Order management system",
      "Customer accounts and profiles",
    ],
    status: "completed",
    startDate: "2023-02",
    endDate: "2023-11",
    demoUrl: "https://tokoeno-demo.vercel.app",
    githubUrl: `https://github.com/${GITHUB_USERNAME}/tokoeno`,
    image: "/images/c9.png",
    learnings: [
      "Optimizing complex database queries with Prisma.",
      "Implementing secure payment flows.",
      "Managing state effectively in a large Next.js application.",
    ],
  },
  {
    id: "devtracker",
    title: "DevTracker",
    description:
      "Developer productivity and project management tool with GitHub integration, time tracking, and performance analytics.",
    longDescription:
      "DevTracker aims to help developers and teams monitor their productivity and manage projects more effectively. It integrates directly with the GitHub API to fetch repository data, track commits, pull requests, and issues. Features include manual and automated time tracking, performance metrics visualization (e.g., commit frequency, PR turnaround time), sprint planning boards (Kanban style), and team collaboration features.",
    category: "Web Application",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "GraphQL",
      "GitHub API",
      "Docker",
      "Chart.js",
    ],
    stats: {
      branches: 18,
      stars: 92,
      views: 2400,
      forks: 28,
      issues: 7,
      commits: 410,
    },
    features: [
      "GitHub repository integration",
      "Time tracking and productivity metrics",
      "Sprint planning and Kanban boards",
      "Code quality metrics visualization",
      "Team collaboration tools",
      "Customizable dashboards",
    ],
    status: "in-progress",
    startDate: "2023-06",
    collaborators: ["@techdev", "@codemaster"],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/devtracker`,
    image: "/images/c10.png",
    learnings: [
      "Working with external APIs (GitHub).",
      "Implementing real-time updates with WebSockets (planned).",
      "Designing flexible data models in MongoDB.",
    ],
  },
  {
    id: "aiacademy",
    title: "AIAcademy",
    description:
      "Interactive platform for learning AI and machine learning concepts with hands-on coding exercises and real-time feedback.",
    longDescription:
      "AIAcademy provides an engaging way to learn complex AI/ML topics. Users can read concise explanations, then immediately apply concepts through interactive coding exercises executed in a sandboxed environment. The platform features real-time visualization of algorithms and models, personalized learning paths based on user progress, and community forums for discussion and help.",
    category: "Education",
    techStack: [
      "Vue.js",
      "Flask",
      "Python",
      "TensorFlow.js",
      "Firebase",
      "Docker",
      "WebSockets",
    ],
    stats: {
      branches: 15,
      stars: 210,
      views: 5600,
      forks: 65,
      issues: 22,
      commits: 650,
    },
    features: [
      "Interactive coding challenges",
      "Real-time AI model visualization",
      "Personalized learning paths",
      "In-browser code execution environment",
      "Community forums and Q&A",
      "Progress tracking and certificates",
    ],
    status: "completed",
    startDate: "2022-09",
    endDate: "2023-05",
    demoUrl: "https://aiacademy.dev",
    githubUrl: `https://github.com/${GITHUB_USERNAME}/aiacademy`,
    image: "/images/k1.jpg",
  },
  {
    id: "cloudstack",
    title: "CloudStack",
    description:
      "Open-source infrastructure management tool for deploying and scaling cloud applications across multiple providers.",
    longDescription:
      "CloudStack simplifies multi-cloud infrastructure management. It uses a declarative approach (similar to Terraform but with a UI focus) to define and provision resources across AWS, GCP, and Azure (planned). Key features include pre-built templates for common application stacks, cost estimation and optimization suggestions, a real-time monitoring dashboard aggregating metrics from different providers, and automated scaling capabilities based on defined policies.",
    category: "DevOps",
    techStack: [
      "Golang",
      "React",
      "GraphQL",
      "Kubernetes",
      "Terraform Provider SDK",
      "PostgreSQL",
      "Prometheus",
    ],
    stats: {
      branches: 32,
      stars: 178,
      views: 2900,
      forks: 48,
      issues: 15,
      commits: 720,
    },
    features: [
      "Multi-cloud deployment support (AWS, GCP)",
      "Infrastructure as code (IaC) templates",
      "Cloud cost optimization recommendations",
      "Real-time cross-cloud monitoring dashboard",
      "Automated scaling policies",
      "User-friendly UI",
    ],
    status: "completed",
    startDate: "2022-11",
    endDate: "2023-08",
    demoUrl: "https://cloudstack.dev",
    githubUrl: `https://github.com/${GITHUB_USERNAME}/cloudstack`,
    image: "/images/k2.jpg",
    learnings: [
      "Building a complex system in Golang.",
      "Integrating with multiple cloud provider APIs.",
      "Designing a flexible GraphQL schema for infrastructure resources.",
    ],
  },
  {
    id: "datavizpro",
    title: "DataVizPro",
    description:
      "Advanced data visualization library with customizable charts, graphs, and interactive dashboards.",
    longDescription:
      "DataVizPro is a React-based component library for creating sophisticated and interactive data visualizations. Built on top of D3.js and leveraging the Canvas API and WebGL for performance with large datasets, it offers a wide range of chart types (bar, line, scatter, pie, heatmap, etc.) with extensive customization options. It supports real-time data updates via WebSockets and allows users to export visualizations to SVG or PNG.",
    category: "Library",
    techStack: [
      "TypeScript",
      "React",
      "D3.js",
      "WebGL",
      "Canvas API",
      "Storybook",
    ],
    stats: {
      branches: 14,
      stars: 122,
      views: 3100,
      forks: 26,
      issues: 9,
      commits: 350,
    },
    features: [
      "Wide range of interactive chart types",
      "Highly customizable components",
      "Real-time data streaming support",
      "Optimized for large datasets (Canvas/WebGL)",
      "Export to SVG/PNG formats",
      "Responsive design",
    ],
    status: "in-progress",
    startDate: "2023-03",
    collaborators: ["@datascientist", "@vizexpert"],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/datavizpro`,
    image: "/images/k3.jpg",
  },
  {
    id: "secureauth",
    title: "SecureAuth",
    description:
      "Authentication and authorization system with MFA, passwordless login, and advanced security features.",
    longDescription:
      "SecureAuth is a standalone service designed to be easily integrated into other applications to handle user authentication and authorization securely. It supports various login methods including traditional password, passwordless (email/SMS magic links, WebAuthn), and social logins (OAuth 2.0). Features include Multi-Factor Authentication (MFA) via TOTP apps or SMS, role-based access control (RBAC), detailed audit logging, and basic security monitoring.",
    category: "Security",
    techStack: [
      "Node.js",
      "TypeScript",
      "Express",
      "JWT",
      "WebAuthn",
      "MongoDB",
      "Redis",
      "OAuth 2.0",
    ],
    stats: {
      branches: 20,
      stars: 135,
      views: 2800,
      forks: 35,
      issues: 11,
      commits: 480,
    },
    features: [
      "Multi-factor authentication (MFA)",
      "Passwordless login (Magic Links, WebAuthn)",
      "OAuth 2.0 / OpenID Connect provider",
      "Social login integration",
      "Role-based access control (RBAC)",
      "Secure session management",
      "Comprehensive audit logging",
    ],
    status: "completed",
    startDate: "2022-08",
    endDate: "2023-02",
    demoUrl: "https://secureauth.demo.app",
    githubUrl: `https://github.com/${GITHUB_USERNAME}/secureauth`,
    image: "/images/k4.jpg",
  },
  {
    id: "portfolio-v3",
    title: "Personal Portfolio Website (This site!)",
    description:
      "My dynamic personal portfolio showcasing projects, skills, experience, and blog.",
    longDescription:
      "The very website you are browsing! Built with Next.js for performance and SEO, styled with Tailwind CSS for a clean and responsive design. Features include dynamic content loading, interactive charts using Chart.js, filtering/sorting for projects, and a modular component structure. Deployed on Vercel.",
    category: "Web Application",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Chart.js",
      "FontAwesome",
      "Vercel",
    ],
    stats: {
      branches: 5,
      stars: 25,
      views: 1500,
      forks: 5,
      issues: 3,
      commits: 150,
    },
    features: [
      "Showcase of projects, skills, experience",
      "Interactive charts and visualizations",
      "Blog section",
      "Contact form",
      "Responsive design",
      "Dark/Light mode toggle (planned)",
    ],
    status: "in-progress",
    startDate: "2024-01",
    githubUrl: `https://github.com/${GITHUB_USERNAME}/portfolio-nextjs`,
    image: "/images/k5.jpg",
    learnings: [
      "Deepening Next.js knowledge.",
      "Advanced Tailwind CSS techniques.",
      "Integrating various libraries smoothly.",
    ],
  },
  {
    id: "quicknotes",
    title: "QuickNotes - Minimalist Note App",
    description:
      "A simple, fast, and offline-first note-taking PWA (Progressive Web App).",
    longDescription:
      "QuickNotes is designed for speed and simplicity. It allows users to quickly jot down notes, organize them with tags, and access them even offline. Built as a PWA, it can be 'installed' on mobile and desktop devices. Data is primarily stored locally using IndexedDB, with optional cloud sync.",
    category: "PWA",
    techStack: [
      "React",
      "TypeScript",
      "IndexedDB",
      "Workbox (Service Worker)",
      "Tailwind CSS",
    ],
    stats: {
      branches: 8,
      stars: 45,
      views: 900,
      forks: 10,
      issues: 6,
      commits: 210,
    },
    features: [
      "Offline-first functionality",
      "Fast note creation and search",
      "Tag-based organization",
      "Installable PWA",
      "Minimalist UI",
      "Local data storage",
    ],
    status: "completed",
    startDate: "2023-09",
    endDate: "2024-01",
    demoUrl: "https://quicknotes-demo.app",
    githubUrl: `https://github.com/${GITHUB_USERNAME}/quicknotes`,
    image: "/images/k6.jpg",
  },
];

const achievements: Achievement[] = [
  {
    title: "Open Source Contributor of the Year (Nominee)",
    date: "2023-12",
    description:
      "Nominated for significant contributions to popular open source projects within the web development ecosystem.",
    icon: fas.faTrophy,
    category: "Community",
    issuer: "Open Source Initiative (Mock)",
    link: "#",
  },
  {
    title: "Hackathon Winner - 1st Place",
    date: "2023-10",
    description:
      "Led a team to win first place at the TechCrunch Disrupt SF Hackathon 2023 by developing 'AccessiBuddy', an AI-powered tool for automated web accessibility testing and remediation suggestions.",
    icon: fas.faMedal,
    category: "Competition",
    issuer: "TechCrunch Disrupt",
    link: "#",
  },
  {
    title: "1 Million+ npm Downloads",
    date: "2023-08",
    description:
      "My open-source utility library 'js-helpers-pro' surpassed 1 million downloads on npm, indicating widespread adoption by the developer community.",
    icon: fas.faDownload,
    category: "Open Source",
    issuer: "npm",
    link: "#",
  },
  {
    title: "Featured Speaker at ReactConf 2023",
    date: "2023-06",
    description:
      "Presented a talk titled 'Beyond useState: Advanced State Management Patterns in Large React Applications' at the annual ReactConf.",
    icon: fas.faUsers,
    category: "Speaking",
    issuer: "ReactConf",
    link: "#",
  },
  {
    title: "Published Author - 'Modern Web Architectures'",
    date: "2023-04",
    description:
      "Co-authored a technical book covering modern web architecture patterns, microservices, and best practices for building scalable applications. Published by O'Reilly Media.",
    icon: fas.faBookOpen,
    category: "Publication",
    issuer: "O'Reilly Media",
    link: "#",
  },
  {
    title: "GitHub Arctic Code Vault Contributor",
    date: "2020-02",
    description:
      "Code from several of my public repositories was included in the GitHub Archive Program's Arctic Code Vault.",
    icon: fab.faGithubAlt,
    category: "Community",
    issuer: "GitHub Archive Program",
    link: "#",
  },
  {
    title: "Top 10% on Stack Overflow (PHP Tag)",
    date: "2022",
    description:
      "Ranked within the top 10% of users for providing high-quality answers in the PHP tag on Stack Overflow.",
    icon: fab.faStackOverflow,
    category: "Community",
    issuer: "Stack Overflow",
  },
];

const blogPosts: BlogPost[] = [
  {
    slug: "optimizing-react-performance",
    title: "Optimizing React Applications for Peak Performance",
    excerpt:
      "Dive deep into advanced techniques like code splitting, memoization, virtualization, and bundle analysis to significantly improve your React app's speed.",
    content: "...",
    date: "2024-03-15",
    tags: [
      "React",
      "Performance",
      "JavaScript",
      "Web Development",
      "Optimization",
    ],
    readTime: "10 min",
    likes: 243,
    comments: 57,
    shares: 124,
    category: "Frontend",
    views: 5400,
    author: "Youralpha",
    image: "/images/k7.jpg",
  },
  {
    slug: "scalable-nodejs-systems",
    title: "Architecting Scalable Backend Systems with Node.js",
    excerpt:
      "A comprehensive guide covering patterns like microservices, message queues, caching strategies, and database scaling for building robust Node.js applications.",
    content: "...",
    date: "2024-02-28",
    tags: [
      "Node.js",
      "Backend",
      "Scalability",
      "Architecture",
      "Microservices",
    ],
    readTime: "15 min",
    likes: 198,
    comments: 42,
    shares: 86,
    category: "Backend",
    views: 4800,
    author: "Youralpha",
    image: "/images/k8.jpg",
  },
  {
    slug: "future-web-development-2025",
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt:
      "Exploring the impact of AI, WebAssembly, serverless evolution, new JavaScript frameworks, and other upcoming trends shaping the web.",
    content: "...",
    date: "2024-01-10",
    tags: ["Future", "Trends", "Web Development", "Technology", "AI", "WASM"],
    readTime: "12 min",
    likes: 312,
    comments: 94,
    shares: 178,
    category: "Industry",
    views: 7200,
    author: "Youralpha",
    image: "/images/k9.jpg",
  },
  {
    slug: "mastering-typescript",
    title: "Mastering TypeScript: Advanced Patterns and Best Practices",
    excerpt:
      "Elevate your TypeScript skills with conditional types, mapped types, utility types, decorators, and module path aliases for cleaner, more maintainable code.",
    content: "...",
    date: "2023-12-05",
    tags: [
      "TypeScript",
      "JavaScript",
      "Programming",
      "Development",
      "Best Practices",
    ],
    readTime: "18 min",
    likes: 276,
    comments: 63,
    shares: 112,
    category: "Programming",
    views: 6100,
    author: "Youralpha",
    image: "/images/k10.jpg",
  },
  {
    slug: "ci-cd-explained",
    title: "Demystifying CI/CD: A Practical Guide with GitHub Actions",
    excerpt:
      "Understand the core concepts of Continuous Integration and Continuous Deployment, and learn how to set up a basic pipeline using GitHub Actions.",
    content: "...",
    date: "2023-10-20",
    tags: ["CI/CD", "DevOps", "GitHub Actions", "Automation", "Testing"],
    readTime: "10 min",
    likes: 180,
    comments: 35,
    shares: 70,
    category: "DevOps",
    views: 4000,
    author: "Youralpha",
    image: "/images/k11.jpg",
  },
  {
    slug: "choosing-database",
    title: "SQL vs NoSQL: Choosing the Right Database for Your Project",
    excerpt:
      "A balanced comparison of relational (SQL) and non-relational (NoSQL) databases, exploring their strengths, weaknesses, and use cases.",
    content: "...",
    date: "2023-09-01",
    tags: ["Database", "SQL", "NoSQL", "Architecture", "Backend"],
    readTime: "12 min",
    likes: 220,
    comments: 50,
    shares: 95,
    category: "Database",
    views: 5500,
    author: "Youralpha",
    image: "/images/k12.jpg",
  },
];

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Johnson",
    position: "CTO",
    company: "TechForward Inc.",
    text: "Working with Youralpha was a game-changer for our platform. Their technical expertise, particularly in React and Node.js, combined with exceptional problem-solving skills, helped us overcome major scaling challenges and significantly improve performance. What truly sets them apart is their ability to communicate complex technical ideas clearly to both technical and non-technical stakeholders. Highly recommended.",
    rating: 5,
    date: "2024-02-10",
    relation: "Client",
    avatar: "/images/k13.jpg",
    projectLink: "Tech Innovators Apps",
  },
  {
    id: "t2",
    name: "Michael Chen",
    position: "Lead Developer",
    company: "InnovateX",
    text: "I've had the pleasure of collaborating with Youralpha on several challenging open-source projects. Their code quality is consistently outstanding – clean, well-documented, and highly maintainable. They have a deep understanding of software architecture and always bring valuable insights to technical discussions. A true professional and a fantastic team player.",
    rating: 5,
    date: "2023-11-15",
    relation: "Colleague",
    avatar: "/images/k15.jpg",
    projectLink: "CloudStack",
  },
  {
    id: "t3",
    name: "Elena Rodriguez",
    position: "Product Manager",
    company: "GlobalTech Solutions",
    text: "Youralpha possesses a rare combination of technical depth and product sense. They didn't just implement the features we requested for our e-commerce platform; they actively questioned assumptions and suggested brilliant improvements that significantly enhanced the user experience and business value. Their proactive approach and commitment were invaluable.",
    rating: 4.5,
    date: "2023-09-22",
    relation: "Client (Indirect)",
    avatar: "/images/c10.png",
    projectLink: "GlobalSoft E-comm",
  },
  {
    id: "t4",
    name: "David Kim",
    position: "Startup Founder",
    company: "NextGenApps",
    text: "As a non-technical founder, finding a developer who could truly grasp our vision and translate it into a robust, scalable product was paramount. Youralpha exceeded all expectations. They delivered our MVP on time, built with solid architecture, and their technical guidance was instrumental in helping us secure our seed funding round. Trustworthy and incredibly skilled.",
    rating: 5,
    date: "2024-01-05",
    relation: "Client",
    avatar: "/images/c9.png",
  },
  // Add more testimonials
  {
    id: "t5",
    name: "Professor Davis",
    position: "Professor of CS",
    company: "UC Berkeley",
    text: "During their time at Berkeley, Youralpha consistently demonstrated exceptional aptitude in complex coursework, particularly in algorithms and systems design. Their capstone project on distributed systems was exemplary, showcasing both strong technical skills and effective teamwork. They possess a bright future in the field.",
    rating: 5,
    date: "2020-05-15",
    relation: "Professor",
    avatar: "/images/k15.jpg",
  },
  {
    id: "t6",
    name: "John Smith",
    position: "Engineering Manager",
    company: "Startech Innovations",
    text: "Youralpha was a key contributor to our backend team. They tackled complex problems with enthusiasm and delivered reliable solutions for our data processing pipelines. They showed great initiative in optimizing our AWS infrastructure and were always willing to help teammates. A valuable asset.",
    rating: 4,
    date: "2021-03-30",
    relation: "Manager",
    avatar: "/images/k2.jpg",
    projectLink: "Startech SaaS",
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
  },
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
  }, // Added Stack Overflow
  {
    platform: "Codepen",
    url: "https://codepen.io/youralpha",
    icon: fab.faCodepen,
    username: "youralpha",
  }, // Added Codepen
];

const devStats: DevStats = {
  repos: 20,
  stars: 199,
  contributions: 498, // Placeholder - could fetch real data
  rating: "4.9/5", // Based on testimonials maybe?
  followers: 358, // Placeholder
  following: 125, // Placeholder
  streak: 87, // Placeholder
  commits: 1245, // Placeholder
  prsOpened: 150, // Added
  issuesClosed: 210, // Added
  rank: "Top 10% GitHub Contributor (Overall)", // Added
};

const techStack: TechStackItem[] = [
  // Existing tech stack... (Ensure consistency with skillsData)
  {
    name: "React",
    icon: fab.faReact,
    proficiency: 4.7,
    category: "Frontend",
    yearsOfExperience: 4,
    description: "Core frontend library for building UIs.",
  },
  {
    name: "Node.js",
    icon: fab.faNode,
    proficiency: 4.5,
    category: "Backend",
    yearsOfExperience: 4,
    description: "Primary backend runtime, using Express/NestJS.",
  },
  {
    name: "TypeScript",
    icon: fas.faCode,
    proficiency: 4.8,
    category: "Language",
    yearsOfExperience: 4,
    description: "Enhancing JavaScript with static typing.",
  },
  {
    name: "Laravel",
    icon: fab.faLaravel,
    proficiency: 4.9,
    category: "Backend",
    yearsOfExperience: 5,
    description: "Expertise in PHP's leading framework.",
  },
  {
    name: "PHP",
    icon: fab.faPhp,
    proficiency: 4.8,
    category: "Language",
    yearsOfExperience: 5,
    description: "Strong foundation in modern PHP.",
  },
  {
    name: "PostgreSQL",
    icon: fas.faDatabase,
    proficiency: 4.6,
    category: "Database",
    yearsOfExperience: 4.5,
    description: "Preferred relational database.",
  },
  {
    name: "AWS",
    icon: fab.faAws,
    proficiency: 4.2,
    category: "DevOps",
    yearsOfExperience: 3.5,
    description: "Cloud platform for deployment and services.",
  },
  {
    name: "Docker",
    icon: fab.faDocker,
    proficiency: 4.5,
    category: "DevOps",
    yearsOfExperience: 4,
    description: "Containerization for development and deployment.",
  },
  {
    name: "Git",
    icon: fab.faGitAlt,
    proficiency: 5.0,
    category: "Tools",
    yearsOfExperience: 5,
    description: "Essential version control system.",
  },
  {
    name: "Next.js",
    icon: fab.faReact,
    proficiency: 4.5,
    category: "Frontend",
    yearsOfExperience: 3,
    description: "React framework for SSR/SSG applications.",
  },
  {
    name: "MongoDB",
    icon: fas.faDatabase,
    proficiency: 4.3,
    category: "Database",
    yearsOfExperience: 3,
    description: "Proficient NoSQL database usage.",
  },
  {
    name: "Python",
    icon: fab.faPython,
    proficiency: 4.0,
    category: "Backend",
    yearsOfExperience: 3,
    description: "Used for scripting, Django/Flask projects.",
  },
  {
    name: "Tailwind CSS",
    icon: fab.faCss3,
    proficiency: 4.8,
    category: "Frontend",
    yearsOfExperience: 3,
    description: "Utility-first CSS framework of choice.",
  },
  {
    name: "GraphQL",
    icon: fas.faCode,
    proficiency: 4.0,
    category: "Backend",
    yearsOfExperience: 2.5,
    description: "Building and consuming GraphQL APIs.",
  },
  {
    name: "Vue.js",
    icon: fab.faVuejs,
    proficiency: 4.1,
    category: "Frontend",
    yearsOfExperience: 2.5,
    description: "Experience in building UIs with Vue.",
  },
];

// Generate more detailed contribution data for heatmap
const generateContributionData = (year: number): ContributionData => {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  const contributions: ContributionDay[] = [];
  let total = 0;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split("T")[0];
    // Simulate contribution count (skew towards weekdays)
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
    let count = 0;
    if (dayOfWeek > 0 && dayOfWeek < 6) {
      // Monday to Friday
      count = Math.random() < 0.6 ? Math.floor(Math.random() * 8) : 0; // Higher chance of commits
    } else {
      // Weekend
      count = Math.random() < 0.2 ? Math.floor(Math.random() * 4) : 0; // Lower chance
    }

    // Determine level for heatmap color
    let level: ContributionDay["level"] = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count > 2 && count <= 4) level = 2;
    else if (count > 4 && count <= 6) level = 3;
    else if (count > 6) level = 4;

    contributions.push({ date: dateString, count, level });
    total += count;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    year,
    total,
    range: {
      start: startDate.toISOString().split("T")[0],
      end: endDate.toISOString().split("T")[0],
    },
    contributions,
  };
};

// --- UTILITY FUNCTIONS ---

/**
 * Formats a date string (YYYY-MM or YYYY-MM-DD) into a more readable format.
 * @param dateString The date string to format.
 * @param format 'short', 'medium', 'long'
 * @returns Formatted date string.
 */
const formatDate = (
  dateString: string | undefined | null,
  format: "short" | "medium" | "long" = "medium"
): string => {
  if (!dateString) return "N/A";
  try {
    const parts = dateString.split("-");
    const year = parseInt(parts[0]);
    const month = parts.length > 1 ? parseInt(parts[1]) - 1 : 0;
    const day = parts.length > 2 ? parseInt(parts[2]) : 1;
    const date = new Date(year, month, day);

    if (isNaN(date.getTime())) return dateString; // Return original if invalid

    const options: Intl.DateTimeFormatOptions = {};
    if (format === "short") {
      options.year = "numeric";
      options.month = "short";
    } else if (format === "medium") {
      options.year = "numeric";
      options.month = "long";
    } else {
      // long
      options.year = "numeric";
      options.month = "long";
      if (parts.length > 2) {
        options.day = "numeric";
      }
    }
    // Adjust for cases like "YYYY-MM" where day is not specified
    if (parts.length === 2 && format === "long") {
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
      });
    }

    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return dateString; // Fallback
  }
};

/**
 * Calculates the duration between two date strings (start and end).
 * @param startDate Start date (YYYY-MM or YYYY-MM-DD)
 * @param endDate End date (YYYY-MM or YYYY-MM-DD or "Present")
 * @returns String representation of the duration (e.g., "2 yrs 5 mos")
 */
const calculateDuration = (
  startDate: string,
  endDate?: string | null
): string => {
  try {
    const start = new Date(startDate);
    const end =
      !endDate || endDate.toLowerCase() === "present"
        ? new Date()
        : new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return ""; // Return empty if dates are invalid
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    // Add the partial month from the start date day
    if (
      start.getDate() > 1 &&
      end.getFullYear() === start.getFullYear() &&
      end.getMonth() === start.getMonth()
    ) {
      // If same month/year, don't add month if less than a full month passed effectively
    } else if (end.getDate() >= start.getDate()) {
      // Full month passed or same day
      months += 1; // Count the end month as well if end date is past start date day
    }
    // if end date day is before start date day, the previous logic handles it

    if (months >= 12) {
      years += Math.floor(months / 12);
      months = months % 12;
    }

    let durationStr = "";
    if (years > 0) {
      durationStr += `${years} yr${years > 1 ? "s" : ""}`;
    }
    if (months > 0) {
      if (durationStr) durationStr += " ";
      durationStr += `${months} mo${months > 1 ? "s" : ""}`;
    }

    // Handle cases less than a month
    if (!durationStr) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) return `< 1 mo`; // Less than a month duration
    }

    return durationStr || "< 1 mo"; // Fallback for very short durations
  } catch (error) {
    console.error("Error calculating duration:", startDate, endDate, error);
    return "";
  }
};

// --- MAIN COMPONENT ---

const HomePage = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(
    null
  );
  const [blogPostDialogOpen, setBlogPostDialogOpen] = useState(false);
  // const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark'); // Simplified theme state
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
  const chartInstances = useRef<{ [key: string]: Chart | null }>({}); // Use ref for charts
  const [currentProjectPage, setCurrentProjectPage] = useState(1);
  const [currentBlogPostPage, setCurrentBlogPostPage] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // For accordion sections
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactFormStatus, setContactFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [isExporting, setIsExporting] = useState(false);
  const [currentProjectView, setCurrentProjectView] = useState<"grid" | "list">(
    "grid"
  );
  const [contributionData, setContributionData] =
    useState<ContributionData | null>(null); // For heatmap
  const [tooltipInfo, setTooltipInfo] = useState<{
    show: boolean;
    x: number;
    y: number;
    text: string;
  } | null>(null); // Tooltip for heatmap

  // --- REFS ---
  const navbarRef = useRef<HTMLDivElement>(null);
  const activityChartRef = useRef<HTMLCanvasElement>(null);
  const skillRadarChartRef = useRef<HTMLCanvasElement>(null);
  const techDistributionPieRef = useRef<HTMLCanvasElement>(null);
  const projectCategoryDonutRef = useRef<HTMLCanvasElement>(null);
  const notificationPanelRef = useRef<HTMLDivElement>(null); // Ref for notification panel

  // --- MEMOIZED VALUES & COMPUTED PROPERTIES ---

  // Filter and sort projects based on state
  const processedProjects = useMemo(() => {
    let tempProjects = [...projects];

    // Apply Search Query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      tempProjects = tempProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(lowerQuery) ||
          project.description.toLowerCase().includes(lowerQuery) ||
          project.techStack.some((tech) =>
            tech.toLowerCase().includes(lowerQuery)
          ) ||
          project.category.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply Filters
    if (activeFilters.length > 0) {
      tempProjects = tempProjects.filter((project) => {
        return activeFilters.every((filter) => {
          if (filter.category === "status") {
            return project.status === filter.value;
          }
          if (filter.category === "tech") {
            return project.techStack
              .map((t) => t.toLowerCase())
              .includes(filter.value.toLowerCase());
          }
          if (filter.category === "category") {
            return (
              project.category.toLowerCase() === filter.value.toLowerCase()
            );
          }
          return true; // Should not happen with defined categories
        });
      });
    }

    // Apply Sorting
    tempProjects.sort((a, b) => {
      let valA: string | number | undefined;
      let valB: string | number | undefined;

      switch (activeSort.field) {
        case "title":
          valA = a.title;
          valB = b.title;
          break;
        case "stars":
          valA = a.stats.stars;
          valB = b.stats.stars;
          break;
        case "date": // Assuming 'date' means 'startDate'
        case "startDate":
          valA = new Date(a.startDate).getTime();
          valB = new Date(b.startDate).getTime();
          break;
        case "views":
          valA = a.stats.views;
          valB = b.stats.views;
          break;
        default:
          return 0;
      }

      // Comparison logic
      if (typeof valA === "string" && typeof valB === "string") {
        return activeSort.order === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else if (typeof valA === "number" && typeof valB === "number") {
        return activeSort.order === "asc" ? valA - valB : valB - valA;
      }
      return 0;
    });

    return tempProjects;
  }, [searchQuery, activeFilters, activeSort]);

  const initOrUpdateCharts = useCallback(() => {
    // Ensure DOM is ready and not loading
    if (loading || typeof window === "undefined") return;

    const chartOptionsBase = {
      responsive: true,
      maintainAspectRatio: false, // Allow charts to fill container height
      plugins: {
        legend: {
          labels: {
            color: darkMode ? "#e5e7eb" : "#374151", // Adapt legend color to theme
            font: { size: 12 },
          },
        },
        tooltip: {
          backgroundColor: darkMode ? "#1f2937" : "#ffffff",
          titleColor: darkMode ? "#e5e7eb" : "#111827",
          bodyColor: darkMode ? "#d1d5db" : "#4b5563",
          borderColor: darkMode ? "#374151" : "#e5e7eb",
          borderWidth: 1,
          padding: 10,
          displayColors: false, // Simple tooltip
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: darkMode ? "#9ca3af" : "#6b7280",
          },
        },
        y: {
          grid: {
            color: darkMode
              ? "rgba(75, 85, 99, 0.3)"
              : "rgba(209, 213, 219, 0.5)",
            drawBorder: false,
          },
          ticks: {
            color: darkMode ? "#9ca3af" : "#6b7280",
            padding: 10,
          },
          beginAtZero: true,
        },
        r: {
          // Specific for Radar chart
          min: 0,
          max: 100,
          ticks: {
            display: false, // Hide radial axis numbers
            stepSize: 20,
          },
          grid: {
            color: darkMode
              ? "rgba(75, 85, 99, 0.3)"
              : "rgba(209, 213, 219, 0.5)",
          },
          pointLabels: {
            color: darkMode ? "#e5e7eb" : "#374151",
            font: { size: 13, weight: "500" }, // Make point labels slightly larger
          },
          angleLines: {
            // Lines from center to labels
            color: darkMode
              ? "rgba(75, 85, 99, 0.3)"
              : "rgba(209, 213, 219, 0.5)",
          },
        },
      },
    };

    // --- Activity Chart (Line) ---
    const activityCtx = activityChartRef.current?.getContext("2d");
    if (activityCtx) {
      if (chartInstances.current.activity)
        chartInstances.current.activity.destroy(); // Destroy previous instance

      const currentYearData =
        contributionData || generateContributionData(new Date().getFullYear());
      // Aggregate contributions per month for the line chart
      const monthlyContributions = Array(12).fill(0);
      currentYearData.contributions.forEach((day) => {
        const monthIndex = new Date(day.date).getMonth();
        monthlyContributions[monthIndex] += day.count;
      });
      const monthLabels = Array.from({ length: 12 }, (_, i) =>
        new Date(currentYearData.year, i).toLocaleString("default", {
          month: "short",
        })
      );

      chartInstances.current.activity = new Chart(activityCtx, {
        type: "line",
        data: {
          labels: monthLabels,
          datasets: [
            {
              label: `Contributions (${currentYearData.year})`,
              data: monthlyContributions,
              borderColor: "#3b82f6", // Blue
              backgroundColor: darkMode
                ? "rgba(59, 130, 246, 0.2)"
                : "rgba(59, 130, 246, 0.1)",
              tension: 0.4,
              fill: true,
              pointBackgroundColor: "#3b82f6",
              pointBorderColor: darkMode ? "#1f2937" : "#ffffff",
              pointHoverBackgroundColor: darkMode ? "#ffffff" : "#1f2937",
              pointHoverBorderColor: "#3b82f6",
              borderWidth: 2,
            },
          ],
        },
        options: {
          ...chartOptionsBase,
          plugins: {
            ...chartOptionsBase.plugins,
            legend: { display: false },
            tooltip: {
              ...chartOptionsBase.plugins?.tooltip,
              callbacks: {
                title: (items: TooltipItem<"line">[]) =>
                  `${items[0].label} ${currentYearData.year}`,
                label: (item: TooltipItem<"line">) =>
                  `${item.formattedValue} contributions`,
              },
            },
          },
        } as ChartConfiguration<"line">["options"], // Cast options type
      });
    }

    // --- Skills Radar Chart ---
    const skillRadarCtx = skillRadarChartRef.current?.getContext("2d");
    if (skillRadarCtx) {
      if (chartInstances.current.skillRadar)
        chartInstances.current.skillRadar.destroy();

      const categories = [
        "Frontend",
        "Backend",
        "DevOps",
        "Database",
        "Tools",
        "Language",
      ]; // Expanded categories
      const categoryAverages = categories.map((category) => {
        const categorySkills = skillsData.filter(
          (skill) =>
            skill.category.toLowerCase() === category.toLowerCase() ||
            (category === "Tools" &&
              ["tools", "other"].includes(skill.category.toLowerCase())) ||
            (category === "Language" &&
              skill.category.toLowerCase() === "language") ||
            (category === "Frontend" &&
              ["frontend", "framework", "library"].includes(
                skill.category.toLowerCase()
              ))
        );
        const average =
          categorySkills.length > 0
            ? categorySkills.reduce((sum, skill) => sum + skill.percentage, 0) /
              categorySkills.length
            : 0;
        return Math.round(average); // Round the average
      });

      chartInstances.current.skillRadar = new Chart(skillRadarCtx, {
        type: "radar",
        data: {
          labels: categories,
          datasets: [
            {
              label: "Skill Level",
              data: categoryAverages,
              backgroundColor: darkMode
                ? "rgba(59, 130, 246, 0.3)"
                : "rgba(59, 130, 246, 0.2)", // Slightly more opaque fill
              borderColor: "#3b82f6",
              pointBackgroundColor: "#3b82f6",
              pointBorderColor: darkMode ? "#111827" : "#fff", // Adjust point border for contrast
              pointHoverBackgroundColor: darkMode ? "#fff" : "#111827",
              pointHoverBorderColor: "#3b82f6",
              borderWidth: 2,
              pointRadius: 4, // Slightly larger points
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          ...chartOptionsBase,
          plugins: {
            ...chartOptionsBase.plugins,
            legend: { display: false }, // Hide legend for radar
            tooltip: {
              ...chartOptionsBase.plugins?.tooltip,
              callbacks: {
                title: (items: TooltipItem<"radar">[]) => items[0].label,
                label: (item: TooltipItem<"radar">) =>
                  `Avg. Proficiency: ${item.formattedValue}%`,
              },
            },
          },
          scales: {
            // Ensure r scale options are correctly nested
            r: chartOptionsBase.scales?.r,
          },
        } as ChartConfiguration<"radar">["options"], // Cast options type
      });
    }

    // --- Tech Distribution Pie Chart ---
    const techDistroCtx = techDistributionPieRef.current?.getContext("2d");
    if (techDistroCtx) {
      if (chartInstances.current.techDistribution)
        chartInstances.current.techDistribution.destroy();

      const techCategories = [
        "Frontend",
        "Backend",
        "DevOps",
        "Database",
        "Language",
        "Tools",
      ];
      const techCategoryCounts = techCategories.map(
        (category) =>
          techStack.filter((tech) => tech.category === category).length
      );
      const backgroundColors = [
        // Define colors, ensure enough for categories
        "#3b82f6", // blue-500
        "#10b981", // emerald-500
        "#f97316", // orange-500
        "#8b5cf6", // violet-500
        "#ec4899", // pink-500
        "#6b7280", // gray-500
      ];
      const borderColors = darkMode ? "#1f2937" : "#ffffff"; // Dark gray or white border

      chartInstances.current.techDistribution = new Chart(techDistroCtx, {
        type: "doughnut",
        data: {
          labels: techCategories,
          datasets: [
            {
              data: techCategoryCounts,
              backgroundColor: backgroundColors.slice(0, techCategories.length),
              borderColor: borderColors,
              borderWidth: 3, // Thicker border
              hoverBackgroundColor: backgroundColors.map(
                (color) => `${color}E6`
              ), // Add slight transparency on hover
              hoverBorderColor: borderColors,
            },
          ],
        },
        options: {
          ...chartOptionsBase,
          cutout: "70%", // Doughnut hole size
          plugins: {
            ...chartOptionsBase.plugins,
            legend: {
              position: "right",
              labels: {
                ...chartOptionsBase.plugins?.legend?.labels,
                padding: 15, // Adjust padding
              },
            },
            tooltip: {
              ...chartOptionsBase.plugins?.tooltip,
              callbacks: {
                label: (context: TooltipItem<"doughnut">) => {
                  const label = context.label || "";
                  const value = context.raw as number;
                  const total = techStack.length;
                  const percentage =
                    total > 0 ? Math.round((value / total) * 100) : 0;
                  return `${label}: ${value} (${percentage}%)`;
                },
              },
            },
          },
          scales: {}, // No scales for doughnut/pie typically
        } as ChartConfiguration<"doughnut">["options"],
      });
    }

    // --- Project Category Pie Chart ---
    const projectCatCtx = projectCategoryDonutRef.current?.getContext("2d");
    if (projectCatCtx) {
      if (chartInstances.current.projectCategory)
        chartInstances.current.projectCategory.destroy();

      const categories = [
        ...new Set(projects.map((project) => project.category)),
      ].sort();
      const categoryCounts = categories.map(
        (category) =>
          projects.filter((project) => project.category === category).length
      );
      const backgroundColors = [
        // Define more colors if needed
        "#3b82f6",
        "#ef4444",
        "#10b981",
        "#f59e0b",
        "#6366f1",
        "#8b5cf6",
        "#ec4899",
        "#06b6d4",
      ];
      const borderColors = darkMode ? "#1f2937" : "#ffffff";

      chartInstances.current.projectCategory = new Chart(projectCatCtx, {
        type: "pie", // Changed to Pie for variety
        data: {
          labels: categories,
          datasets: [
            {
              data: categoryCounts,
              backgroundColor: backgroundColors.slice(0, categories.length),
              borderColor: borderColors,
              borderWidth: 2,
              hoverBackgroundColor: backgroundColors.map(
                (color) => `${color}E6`
              ),
              hoverBorderColor: borderColors,
            },
          ],
        },
        options: {
          ...chartOptionsBase,
          plugins: {
            ...chartOptionsBase.plugins,
            legend: {
              position: "bottom",
              labels: {
                ...chartOptionsBase.plugins?.legend?.labels,
                padding: 20,
              },
            },
            tooltip: {
              ...chartOptionsBase.plugins?.tooltip,
              callbacks: {
                label: (context: TooltipItem<"pie">) => {
                  const label = context.label || "";
                  const value = context.raw as number;
                  const total = projects.length;
                  const percentage =
                    total > 0 ? Math.round((value / total) * 100) : 0;
                  return `${label}: ${value} (${percentage}%)`;
                },
              },
            },
          },
          scales: {}, // No scales for pie
        } as ChartConfiguration<"pie">["options"],
      });
    }
  }, [loading, darkMode, contributionData]);

  // Paginate the processed projects
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentProjectPage - 1) * PROJECTS_PER_PAGE;
    return processedProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [processedProjects, currentProjectPage]);

  // Calculate total pages for project pagination
  const totalProjectPages = useMemo(() => {
    return Math.ceil(processedProjects.length / PROJECTS_PER_PAGE);
  }, [processedProjects]);

  // Filter skills based on selected category
  const filteredSkills = useMemo(() => {
    if (activeSkillCategory === "all") {
      return skillsData;
    }
    return skillsData.filter((skill) => skill.category === activeSkillCategory);
  }, [activeSkillCategory]);

  // Generate filter options dynamically from projects
  const projectFilterOptions = useMemo(() => {
    const tech: FilterOption[] = Array.from(
      new Set(projects.flatMap((p) => p.techStack))
    )
      .sort()
      .map((t) => ({ label: t, value: t, category: "tech" }));
    const status: FilterOption[] = Array.from(
      new Set(projects.map((p) => p.status))
    )
      .sort()
      .map((s) => ({
        label: s.charAt(0).toUpperCase() + s.slice(1),
        value: s,
        category: "status",
      }));
    const category: FilterOption[] = Array.from(
      new Set(projects.map((p) => p.category))
    )
      .sort()
      .map((c) => ({ label: c, value: c, category: "category" }));
    return { tech, status, category };
  }, []);

  // Define sort options for projects
  const projectSortOptions: SortOption[] = useMemo(
    () => [
      { field: "startDate", order: "desc", label: "Date (Newest)" },
      { field: "startDate", order: "asc", label: "Date (Oldest)" },
      { field: "title", order: "asc", label: "Title (A-Z)" },
      { field: "title", order: "desc", label: "Title (Z-A)" },
      { field: "stars", order: "desc", label: "Stars (High-Low)" },
      { field: "stars", order: "asc", label: "Stars (Low-High)" },
      { field: "views", order: "desc", label: "Views (High-Low)" },
    ],
    []
  );

  // Process and paginate blog posts
  const paginatedBlogPosts = useMemo(() => {
    // Add sorting/filtering later if needed
    const sortedPosts = [...blogPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const startIndex = (currentBlogPostPage - 1) * BLOG_POSTS_PER_PAGE;
    return sortedPosts.slice(startIndex, startIndex + BLOG_POSTS_PER_PAGE);
  }, [currentBlogPostPage]);

  const totalBlogPostPages = useMemo(() => {
    return Math.ceil(blogPosts.length / BLOG_POSTS_PER_PAGE);
  }, []);

  // Create timeline data from various sources
  const timelineData: TimelineEvent[] = useMemo(() => {
    const events: TimelineEvent[] = [];

    workExperience.forEach((exp, index) => {
      events.push({
        id: `work-${index}`,
        date: exp.period.split(" - ")[0], // Use start date/period
        type: "work",
        title: exp.position,
        subtitle: exp.company,
        description: exp.description,
        icon: fas.faBriefcase,
        color: "text-blue-400",
      });
    });

    educationData.forEach((edu, index) => {
      events.push({
        id: `edu-${index}`,
        date: edu.period.split(" - ")[0],
        type: "education",
        title: edu.degree,
        subtitle: edu.institution,
        description: edu.field,
        icon: fas.faGraduationCap,
        color: "text-green-400",
      });
    });

    achievements.slice(0, 5).forEach((ach, index) => {
      // Limit achievements shown
      events.push({
        id: `ach-${index}`,
        date: ach.date,
        type: "achievement",
        title: ach.title,
        subtitle: ach.issuer,
        description:
          ach.description.substring(0, 100) +
          (ach.description.length > 100 ? "..." : ""),
        icon: ach.icon,
        color: "text-yellow-400",
      });
    });

    certifications.slice(0, 3).forEach((cert, index) => {
      // Limit certs shown
      events.push({
        id: `cert-${index}`,
        date: cert.date,
        type: "certification",
        title: cert.name,
        subtitle: cert.issuer,
        icon: fas.faCertificate,
        color: "text-purple-400",
      });
    });

    projects
      .filter((p) => p.status === "completed")
      .slice(0, 4)
      .forEach((proj, index) => {
        // Limit completed projects shown
        events.push({
          id: `proj-${index}`,
          date: proj.startDate,
          type: "project",
          title: `Project: ${proj.title}`,
          subtitle: proj.category,
          icon: fas.faCodeBranch,
          color: "text-red-400",
        });
      });

    // Sort events by date, descending
    return events.sort((a, b) => {
      try {
        // Handle different date formats (YYYY-MM vs YYYY-MM-DD)
        const dateA = new Date(
          a.date.includes("-") ? a.date : `${a.date}-01-01`
        );
        const dateB = new Date(
          b.date.includes("-") ? b.date : `${b.date}-01-01`
        );
        return dateB.getTime() - dateA.getTime();
      } catch {
        return 0; // Fallback if date parsing fails
      }
    });
  }, []);

  // --- EFFECTS ---

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate network/loading delay
    return () => clearTimeout(timer);
  }, []);

  // Handle dark mode persistence (example using localStorage)
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(savedMode === "true");
    } else {
      // Optional: Check system preference
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark); // Default to system preference if no saved pref
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to root element
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save preference
    localStorage.setItem("darkMode", String(darkMode));
    // Re-initialize charts on theme change if needed (colors might depend on theme)
    if (!loading) {
      // Avoid re-init during initial load
      // Debounce or delay chart re-initialization
      const timer = setTimeout(() => initOrUpdateCharts(), 300);
      return () => clearTimeout(timer);
    }
  }, [darkMode, loading, initOrUpdateCharts]); // Add loading dependency

  // Navbar fixed position on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = navbarRef.current?.offsetTop ?? 0;
      // Adjust the threshold value as needed (e.g., 300)
      if (window.scrollY > offset + 50) {
        // Make it fixed slightly after passing the original position
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array ensures this runs once on mount

  // Generate mock notifications on mount
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "n1",
        title: "New Follower",
        message: "Michael Chen started following you.",
        type: "info",
        date: new Date(2024, 4, 22, 10, 30),
        read: false,
        link: "#",
      },
      {
        id: "n2",
        title: "Project Starred",
        message: "Your 'Tokoeno E-Commerce' repo reached 150 stars!",
        type: "success",
        date: new Date(2024, 4, 21, 15, 0),
        read: true,
        link: `https://github.com/${GITHUB_USERNAME}/tokoeno`,
      },
      {
        id: "n3",
        title: "Certification Expiring Soon",
        message: "Your CKA certification expires in less than 90 days.",
        type: "warning",
        date: new Date(2024, 4, 20, 8, 0),
        read: false,
      },
      {
        id: "n4",
        title: "Deployment Failed",
        message: "Deployment of 'DevTracker' to staging failed. Check logs.",
        type: "error",
        date: new Date(2024, 4, 19, 17, 45),
        read: false,
        link: "#",
      },
      {
        id: "n5",
        title: "New Message",
        message: "You have a new message from Sarah Johnson.",
        type: "info",
        date: new Date(2024, 4, 18, 9, 15),
        read: true,
        link: "#",
      },
    ];
    setNotifications(mockNotifications);

    // Generate contribution data for heatmap
    setContributionData(generateContributionData(new Date().getFullYear())); // Generate for current year
  }, []); // Run only once on mount

  // Close notification panel when clicking outside
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

  // Function to initialize or update charts
  // Add darkMode and data dependencies

  // Initialize charts after loading and on theme change
  useEffect(() => {
    // Debounce chart initialization
    const timer = setTimeout(() => {
      initOrUpdateCharts();
    }, 300); // Short delay to allow DOM updates

    // Cleanup function to destroy charts on component unmount
    return () => {
      clearTimeout(timer);
      Object.values(chartInstances.current).forEach((chart) => {
        if (chart) {
          chart.destroy();
        }
      });
      chartInstances.current = {}; // Clear the refs
    };
  }, [initOrUpdateCharts]); // Depend on the memoized init function

  // --- EVENT HANDLERS ---

  const handleTabClick = useCallback(
    (tabId: string) => {
      setActiveTab(tabId);
      // Smooth scroll to top of content area when tab changes?
      const contentElement = document.getElementById("main-content");
      if (contentElement) {
        contentElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setMobileMenuOpen(false); // Close mobile menu on tab click
    },
    [setActiveTab, setMobileMenuOpen]
  );

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setProjectDialogOpen(true);
  };

  const handleCloseProjectDialog = () => {
    setProjectDialogOpen(false);
    // Delay clearing selected project for smoother transition
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleBlogPostClick = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setBlogPostDialogOpen(true);
  };

  const handleCloseBlogPostDialog = () => {
    setBlogPostDialogOpen(false);
    setTimeout(() => setSelectedBlogPost(null), 300);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentProjectPage(1); // Reset pagination
  };

  const handleFilterToggle = (filter: FilterOption) => {
    setActiveFilters((prev) => {
      const exists = prev.some(
        (f) => f.category === filter.category && f.value === filter.value
      );
      if (exists) {
        return prev.filter(
          (f) => !(f.category === filter.category && f.value === filter.value)
        );
      } else {
        // Optional: Allow only one filter per category type?
        // If needed, remove other filters of the same category first:
        // const otherFilters = prev.filter(f => f.category !== filter.category);
        // return [...otherFilters, filter];
        return [...prev, filter]; // Current allows multiple filters across categories
      }
    });
    setCurrentProjectPage(1); // Reset pagination
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
    setSearchQuery("");
    setCurrentProjectPage(1);
  };

  const handleSortChange = (option: SortOption) => {
    setActiveSort(option);
    // No need to reset pagination for sort generally
  };

  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  const handleContactFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactFormStatus === "sending") return;

    setContactFormStatus("sending");
    // Simulate API call
    console.log("Submitting contact form:", contactFormData);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

    // Simulate success/error
    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
      setContactFormStatus("success");
      addNotification(
        "Message Sent!",
        "Your message has been sent successfully. I'll get back to you soon.",
        "success"
      );
      // Clear form after a short delay
      setTimeout(() => {
        setContactFormData({ name: "", email: "", subject: "", message: "" });
        setContactFormStatus("idle");
      }, 2000);
    } else {
      setContactFormStatus("error");
      addNotification(
        "Send Error",
        "Could not send message. Please try again later or contact me directly.",
        "error"
      );
      // Optionally keep form open on error
      setTimeout(() => setContactFormStatus("idle"), 3000);
    }
  };

  const handleExport = (format: "pdf" | "json") => {
    // Simplified options
    if (isExporting) return;
    setIsExporting(true);
    addNotification(
      "Exporting...",
      `Generating ${format.toUpperCase()} version of the portfolio.`,
      "info"
    );

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In a real app, trigger actual export logic here
      if (format === "json") {
        // Example: Export key data as JSON
        const exportData = {
          profile: {
            name: "Youralpha",
            title: "Senior Full Stack Developer",
            location: "San Francisco, CA",
          },
          contact: contacts.filter((c) => c.isPublic),
          socialMedia,
          skills: skillsData.map((s) => ({
            name: s.name,
            category: s.category,
            percentage: s.percentage,
          })),
          projects: projects.map((p) => ({
            title: p.title,
            description: p.description,
            techStack: p.techStack,
            githubUrl: p.githubUrl,
            demoUrl: p.demoUrl,
          })),
          experience: workExperience.map((w) => ({
            company: w.company,
            position: w.position,
            period: w.period,
          })),
          education: educationData.map((e) => ({
            institution: e.institution,
            degree: e.degree,
            period: e.period,
          })),
          // Add other relevant sections
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "youralpha-portfolio.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (format === "pdf") {
        // Trigger print dialog for PDF generation
        window.print(); // This relies on browser's print-to-pdf functionality and print styles
      }

      addNotification(
        "Export Complete",
        `Portfolio exported as ${format.toUpperCase()}.`,
        "success"
      );
    }, 2500);
  };

  // Add a new notification helper
  const addNotification = (
    title: string,
    message: string,
    type: Notification["type"]
  ) => {
    const newNotification: Notification = {
      id: `notif-${Date.now()}-${Math.random()}`,
      title,
      message,
      type,
      date: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev].slice(0, 10)); // Keep max 10 notifications
    setShowNotifications(true); // Optionally show panel when new notification arrives
  };

  const handleNotificationMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleNotificationMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    setShowNotifications(false); // Hide panel when cleared
  };

  // Heatmap tooltip handlers
  const handleMouseEnterCell = (
    e: React.MouseEvent<SVGRectElement>,
    day: ContributionDay
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipInfo({
      show: true,
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 10, // Position above the cell
      text: `${day.count} contributions on ${formatDate(day.date, "long")}`,
    });
  };

  const handleMouseLeaveCell = () => {
    setTooltipInfo(null);
  };

  // --- RENDER HELPER FUNCTIONS --- (To be potentially broken into components later)

  // Render Navigation Tabs
  const renderNavigationTabs = useCallback(() => {
    const tabs = [
      { id: "overview", icon: fas.faHome, label: "Overview" },
      { id: "projects", icon: fas.faCodeBranch, label: "Projects" },
      { id: "skills", icon: fas.faCode, label: "Skills" },
      { id: "experience", icon: fas.faBriefcase, label: "Experience" },
      { id: "education", icon: fas.faGraduationCap, label: "Education" },
      { id: "certifications", icon: fas.faCertificate, label: "Certs" }, // Added
      { id: "achievements", icon: fas.faAward, label: "Achievements" },
      { id: "activity", icon: fas.faChartLine, label: "Activity" },
      { id: "blog", icon: fas.faRss, label: "Blog" },
      { id: "testimonials", icon: fas.faCommentDots, label: "Testimonials" },
      { id: "contact", icon: fas.faEnvelope, label: "Contact" },
    ];

    return (
      <nav className="flex justify-center">
        <div className="flex overflow-x-auto space-x-6 md:space-x-8 py-3 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center whitespace-nowrap px-2 py-3 text-sm md:text-base font-medium transition-all duration-200 ease-in-out border-b-2 ${
                activeTab === tab.id
                  ? "text-white border-blue-500"
                  : "text-gray-400 border-transparent hover:text-gray-200 hover:border-gray-500"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <FontAwesomeIcon icon={tab.icon} className="mr-2 h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    );
  }, [activeTab, handleTabClick]); // Include handleTabClick dependency

  // Render Stat Cards for Overview
  const renderStatCards = useCallback(() => {
    const stats = [
      {
        value: devStats.repos,
        label: "Public Repos",
        icon: fas.faCodeBranch,
        link: `https://github.com/${GITHUB_USERNAME}?tab=repositories`,
      },
      {
        value: devStats.stars,
        label: "GitHub Stars",
        icon: fas.faStar,
        link: `https://github.com/${GITHUB_USERNAME}?tab=stars`,
      },
      {
        value: devStats.followers,
        label: "GitHub Followers",
        icon: fas.faUsers,
        link: `https://github.com/${GITHUB_USERNAME}?tab=followers`,
      },
      {
        value: devStats.contributions,
        label: `Contributions (${
          contributionData?.year || new Date().getFullYear()
        })`,
        icon: fas.faCode,
        link: `https://github.com/${GITHUB_USERNAME}`,
      },
      // { value: devStats.commits, label: "Total Commits", icon: fas.faHistory }, // Maybe too noisy
      // { value: devStats.rating, label: "Avg Rating", icon: fas.faCheckCircle },
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {stats.map((stat, i) => (
          <a
            key={i}
            href={stat.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`block bg-gray-800 dark:bg-gray-800 p-4 rounded-lg shadow-md text-center hover:bg-gray-750 dark:hover:bg-gray-700 transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              stat.link ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <FontAwesomeIcon
              icon={stat.icon}
              className="text-blue-400 dark:text-blue-400 text-2xl mb-2 mx-auto"
            />
            <div className="text-3xl font-bold text-white dark:text-white">
              {stat.value}
            </div>
            <div className="text-gray-400 dark:text-gray-400 text-sm mt-1">
              {stat.label}
            </div>
          </a>
        ))}
      </div>
    );
  }, [contributionData]);

  // Render Profile Header
  const renderProfileHeader = () => (
    <header className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
      {/* Cover Image Area */}
      <div className="h-48 sm:h-64 md:h-80 bg-gradient-to-r from-cyan-900 via-blue-900 to-indigo-900 relative group">
        {/* Placeholder for dynamic cover image */}+{" "}
        <Image
          src="/logo/c8.png"
          alt="Cover Photo"
          layout="fill"
          objectFit="cover"
          className="opacity-70 group-hover:opacity-90 transition-opacity duration-300"
          priority // Cover image biasanya penting
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-transparent bg-opacity-30"></div>
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
          <button className="p-2 rounded-full bg-gray-700 bg-opacity-60 text-gray-300 hover:bg-opacity-80 hover:text-white transition duration-150 focus:outline-none focus:ring-2 focus:ring-white">
            <FontAwesomeIcon icon={fas.faShareAlt} className="h-4 w-4" />
            <span className="sr-only">Share Profile</span>
          </button>
          {/* Add more buttons if needed */}
        </div>
        {/* Online Status Indicator */}
        <div className="absolute top-4 left-4 flex items-center px-3 py-1 rounded-full bg-gray-800 bg-opacity-70 z-10">
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full mr-2 animate-pulse" />
          <span className="text-green-300 text-xs font-medium">
            Available for Hire
          </span>
        </div>
      </div>

      {/* Profile Info Area */}
      <div className="relative px-4 sm:px-6 pb-6">
        {/* Profile Picture */}
        <div className="absolute -top-12 sm:-top-16 left-4 sm:left-6 transform ">
          <div className="relative">
            <Image
              src="/images/c10.png"
              alt="Youralpha Profile Picture"
              width={128} // Ukuran terbesar (sm:w-32)
              height={128} // Ukuran terbesar (sm:h-32)
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-800 dark:border-gray-800 bg-gray-700 shadow-lg"
              priority // Gambar penting, load lebih awal
            />
            {/* Optional: Online/Status badge on avatar */}
            {/* <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800 ring-2 ring-green-300"></span> */}
            <div className="absolute bottom-2 right-1 bg-gradient-to-tr from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-gray-800 shadow-md">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-50"></span>
              <FontAwesomeIcon icon={fas.faBolt} className="h-3 w-3 z-10" />
            </div>
          </div>
        </div>

        {/* Name, Handle, Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pt-16 sm:pt-4">
          {/* Left side: Name, Handle, Socials */}
          <div className="w-full sm:w-auto mt-15">
            <h1 className="text-2xl sm:text-3xl font-bold text-white dark:text-white">
              Youralpha
            </h1>
            <p className="text-blue-400 dark:text-blue-400 text-base sm:text-lg mb-3">
              @{TWITTER_USERNAME}
            </p>
            <p className="text-gray-300 dark:text-gray-300 text-sm mb-3 max-w-md">
              Senior Full Stack Developer | React, Node.js, Laravel Expert |
              Building Scalable & Performant Web Solutions
            </p>
            {/* Social Media Links */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
              {socialMedia.slice(0, 5).map(
                (
                  social,
                  idx // Show first 5 icons
                ) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 transition duration-150"
                    aria-label={`Visit my ${social.platform} profile`}
                  >
                    <FontAwesomeIcon icon={social.icon} className="h-5 w-5" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Right side: Buttons */}
          <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
            <button
              onClick={() => handleTabClick("contact")} // Navigate to contact tab
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <FontAwesomeIcon
                icon={fas.faPaperPlane}
                className="mr-2 h-4 w-4"
              />
              Contact Me
            </button>
            {/* Example CV Download Button */}
            <a
              href="/resume/Youralpha_Resume.pdf" // Link to your actual CV PDF
              download="Youralpha_Resume.pdf"
              className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-150 shadow focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <FontAwesomeIcon icon={fas.faDownload} className="mr-2 h-4 w-4" />
              Download CV
            </a>
            {/* Theme Toggle Button */}
            <button
              onClick={handleThemeToggle}
              className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition duration-150 shadow focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            >
              <FontAwesomeIcon
                icon={darkMode ? fas.faSun : fas.faMoon}
                className="h-4 w-4"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  // --- RENDER TAB CONTENT ---

  // Overview Tab Content
  const renderOverviewTab = () => (
    <section aria-labelledby="overview-heading">
      <h2 id="overview-heading" className="sr-only">
        Overview Section
      </h2>
      {/* Statistics Cards */}
      {renderStatCards()}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (About, Contact, Quick Info) */}
        <div className="lg:col-span-1 space-y-6">
          {/* About Me */}
          <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white dark:text-white mb-4 flex items-center">
              <FontAwesomeIcon
                icon={fas.faUserCircle}
                className="mr-2 text-blue-400"
              />
              About Me
            </h3>
            <p className="text-gray-300 dark:text-gray-300 text-sm leading-relaxed">
              Highly motivated and results-oriented Full Stack Developer with 5+
              years of experience designing, developing, and deploying scalable
              web applications. Proven ability to leverage modern frameworks
              like React, Node.js, and Laravel to build efficient, user-centric
              solutions. Passionate about clean code, continuous learning, and
              contributing to impactful projects. Strong believer in Agile
              methodologies and collaborative teamwork. Seeking challenging
              opportunities to apply expertise and drive innovation.
            </p>
            {/* Optional: Read More Link */}
            {/* <a href="#" className="text-blue-400 hover:text-blue-300 text-sm mt-3 inline-block">Read More...</a> */}
          </div>

          {/* Quick Info */}
          <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white dark:text-white mb-4 flex items-center">
              <FontAwesomeIcon
                icon={fas.faInfoCircle}
                className="mr-2 text-green-400"
              />
              Quick Info
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-gray-300 dark:text-gray-300">
                <FontAwesomeIcon
                  icon={fas.faMapMarkerAlt}
                  className="w-5 h-5 mr-3 text-gray-400"
                />
                <span>Based in: San Francisco Bay Area, CA</span>
              </li>
              <li className="flex items-center text-gray-300 dark:text-gray-300">
                <FontAwesomeIcon
                  icon={fas.faBriefcase}
                  className="w-5 h-5 mr-3 text-gray-400"
                />
                <span>Availability: Full-time, Contract, Remote</span>
              </li>
              <li className="flex items-center text-gray-300 dark:text-gray-300">
                <FontAwesomeIcon
                  icon={fas.faClock}
                  className="w-5 h-5 mr-3 text-gray-400"
                />
                <span>Timezone: Pacific Time (PT)</span>
              </li>
              <li className="flex items-center text-gray-300 dark:text-gray-300">
                <FontAwesomeIcon
                  icon={fas.faGlobe}
                  className="w-5 h-5 mr-3 text-gray-400"
                />
                <span>
                  Languages: English (Native), Spanish (Conversational)
                </span>
              </li>
              {/* Add more relevant quick info */}
            </ul>
          </div>

          {/* Contact Snippet */}
          <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white dark:text-white mb-4 flex items-center">
              <FontAwesomeIcon
                icon={fas.faEnvelope}
                className="mr-2 text-red-400"
              />
              Get In Touch
            </h3>
            <ul className="space-y-3 text-sm">
              {contacts
                .filter((c) => c.isPublic && c.type !== "Location")
                .map(
                  (
                    contact,
                    idx // Show public contacts except location
                  ) => (
                    <li
                      key={idx}
                      className="flex items-center text-gray-300 dark:text-gray-300"
                    >
                      <FontAwesomeIcon
                        icon={contact.icon}
                        className="w-5 h-5 mr-3 text-gray-400"
                      />
                      {contact.link ? (
                        <a
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-400 transition duration-150 break-all"
                        >
                          {contact.value}
                          <FontAwesomeIcon
                            icon={fas.faExternalLinkAlt}
                            className="ml-1.5 h-3 w-3 opacity-70"
                          />
                        </a>
                      ) : (
                        <span className="break-all">{contact.value}</span>
                      )}
                    </li>
                  )
                )}
            </ul>
            <button
              onClick={() => handleTabClick("contact")}
              className="mt-4 w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-150 text-sm"
            >
              Send a Message
            </button>
          </div>
        </div>

        {/* Right Column (Core Skills, Featured Project) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Core Skills */}
          <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white dark:text-white flex items-center">
                <FontAwesomeIcon
                  icon={fas.faStar}
                  className="mr-2 text-yellow-400"
                />
                Core Skills
              </h3>
              <button
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                onClick={() => handleTabClick("skills")}
              >
                View All Skills &rarr;
              </button>
            </div>
            <div className="space-y-4">
              {/* Display top 5-6 skills with progress bars */}
              {skillsData
                .sort((a, b) => b.percentage - a.percentage) // Sort by percentage desc
                .slice(0, 6) // Take top 6
                .map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white dark:text-white flex items-center">
                        {skill.icon && (
                          <FontAwesomeIcon
                            icon={skill.icon}
                            className="mr-2 h-4 w-4 text-gray-400"
                          />
                        )}
                        {skill.name}
                      </span>
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-400">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          skill.color || "from-blue-500 to-cyan-500"
                        }`}
                        style={{ width: `${skill.percentage}%` }}
                        role="progressbar"
                        aria-valuenow={skill.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${skill.name} proficiency`}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Featured Project(s) */}
          <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-white dark:text-white flex items-center">
                <FontAwesomeIcon
                  icon={fas.faProjectDiagram}
                  className="mr-2 text-purple-400"
                />
                Featured Project
              </h3>
              <button
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                onClick={() => handleTabClick("projects")}
              >
                View All Projects &rarr;
              </button>
            </div>
            {projects.length > 0 ? (
              <div
                className="bg-gray-750 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 group cursor-pointer"
                onClick={() => handleProjectClick(projects[0])} // Feature the first project
              >
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                  {projects[0].image ? (
                    <Image
                      width={800}
                      height={450}
                      src={projects[0].image}
                      alt={`${projects[0].title} screenshot`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <FontAwesomeIcon icon={fas.faCode} size="3x" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-transparent bg-opacity-30 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                  {/* Status Badge */}
                  <span
                    className={`absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      projects[0].status === "completed"
                        ? "bg-green-600 text-green-100"
                        : projects[0].status === "in-progress"
                        ? "bg-yellow-600 text-yellow-100"
                        : "bg-gray-600 text-gray-100"
                    }`}
                  >
                    {projects[0].status.charAt(0).toUpperCase() +
                      projects[0].status.slice(1)}
                  </span>
                </div>
                {/* Project Details */}
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-white dark:text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {projects[0].title}
                  </h4>
                  <p className="text-sm text-gray-300 dark:text-gray-400 mb-3 line-clamp-2">
                    {projects[0].description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {projects[0].techStack.slice(0, 4).map(
                      (
                        tech,
                        idx // Show top 4 tech
                      ) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-600 dark:bg-gray-500 text-gray-200 dark:text-gray-200 px-2 py-0.5 rounded-full"
                        >
                          {tech}
                        </span>
                      )
                    )}
                    {projects[0].techStack.length > 4 && (
                      <span className="text-xs bg-gray-600 dark:bg-gray-500 text-gray-200 dark:text-gray-200 px-2 py-0.5 rounded-full">
                        +{projects[0].techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">
                No featured projects available yet.
              </p>
            )}
          </div>

          {/* Recent Blog Posts Snippet */}
          <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white dark:text-white flex items-center">
                <FontAwesomeIcon
                  icon={fas.faRss}
                  className="mr-2 text-orange-400"
                />
                Recent Blog Posts
              </h3>
              <button
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                onClick={() => handleTabClick("blog")}
              >
                View All Posts &rarr;
              </button>
            </div>
            <div className="space-y-4">
              {blogPosts.slice(0, 2).map(
                (
                  post // Show top 2 recent posts
                ) => (
                  <div
                    key={post.slug}
                    className="border-b border-gray-700 dark:border-gray-700 pb-3 last:border-b-0 last:pb-0"
                  >
                    <h4
                      className="text-md font-semibold text-white dark:text-white hover:text-blue-400 transition cursor-pointer mb-1"
                      onClick={() => handleBlogPostClick(post)}
                    >
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-400 dark:text-gray-400">
                      {formatDate(post.date, "medium")} &bull; {post.readTime}
                    </p>
                  </div>
                )
              )}
              {blogPosts.length === 0 && (
                <p className="text-gray-400 text-sm">
                  No blog posts yet. Stay tuned!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Projects Tab Content
  const renderProjectsTab = () => (
    <section aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="text-2xl font-bold text-white mb-6">
        My Projects
      </h2>

      {/* Filter and Sort Controls */}
      <div className="bg-gray-850 dark:bg-gray-850 p-4 rounded-lg mb-6 shadow-sm sticky top-16 z-30">
        {" "}
        {/* Make controls sticky */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search projects (title, tech...)"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 dark:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <FontAwesomeIcon
              icon={fas.faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            />
          </div>

          {/* Filter & Sort Buttons (Mobile/Tablet) */}
          <div className="flex md:hidden w-full gap-3">
            {/* Filter Button Placeholder */}
            <button className="flex-1 text-sm bg-gray-700 p-2 rounded-lg text-center">
              Filters
            </button>
            {/* Sort Button Placeholder */}
            <button className="flex-1 text-sm bg-gray-700 p-2 rounded-lg text-center">
              Sort By
            </button>
          </div>

          {/* Filters (Desktop) - Example Dropdowns/Buttons */}
          <div className="hidden md:flex flex-wrap gap-3 items-center">
            {/* Example: Tech Stack Filter (Dropdown or Multi-select) */}
            {/* Example: Status Filter */}
            {projectFilterOptions.status.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleFilterToggle(opt)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  activeFilters.some(
                    (f) => f.value === opt.value && f.category === "status"
                  )
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {opt.label}
              </button>
            ))}
            {/* Add more filters... */}
            {activeFilters.length > 0 && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-red-400 hover:text-red-300 ml-2"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Sort Dropdown (Desktop) */}
          <div className="hidden md:block relative">
            <select
              value={`${activeSort.field}-${activeSort.order}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                const selectedOpt = projectSortOptions.find(
                  (opt) => opt.field === field && opt.order === order
                );
                if (selectedOpt) handleSortChange(selectedOpt);
              }}
              className="appearance-none w-full md:w-auto bg-gray-700 dark:bg-gray-700 text-white text-sm px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {projectSortOptions.map((opt) => (
                <option
                  key={`${opt.field}-${opt.order}`}
                  value={`${opt.field}-${opt.order}`}
                >
                  Sort by: {opt.label}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={fas.faSort}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 pointer-events-none"
            />
          </div>

          {/* View Toggle (Grid/List) */}
          <div className="hidden md:flex items-center bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setCurrentProjectView("grid")}
              className={`px-2 py-1 rounded ${
                currentProjectView === "grid"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              aria-label="Grid View"
            >
              <FontAwesomeIcon icon={fas.faTable} />
            </button>
            <button
              onClick={() => setCurrentProjectView("list")}
              className={`px-2 py-1 rounded ${
                currentProjectView === "list"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              aria-label="List View"
            >
              <FontAwesomeIcon icon={fas.faListUl} />
            </button>
          </div>
        </div>
      </div>

      {/* Project Grid/List */}
      {processedProjects.length > 0 ? (
        <>
          <div
            className={`grid ${
              currentProjectView === "grid"
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1"
            } gap-6 mb-8`}
          >
            {paginatedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
                viewMode={currentProjectView}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalProjectPages > 1 && (
            <PaginationControls
              currentPage={currentProjectPage}
              totalPages={totalProjectPages}
              onPageChange={setCurrentProjectPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <FontAwesomeIcon
            icon={fas.faSearch}
            className="text-4xl text-gray-500 mb-4"
          />
          <p className="text-gray-400">
            No projects found matching your criteria.
          </p>
          {(searchQuery || activeFilters.length > 0) && (
            <button
              onClick={handleClearFilters}
              className="mt-4 text-blue-400 hover:text-blue-300"
            >
              Clear Search & Filters
            </button>
          )}
        </div>
      )}
    </section>
  );

  // Skills Tab Content
  const renderSkillsTab = () => (
    <section aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="text-2xl font-bold text-white mb-6">
        Skills & Expertise
      </h2>

      {/* Skill Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setActiveSkillCategory("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            activeSkillCategory === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          All Skills
        </button>
        {[...new Set(skillsData.map((s) => s.category))]
          .sort()
          .map((category) => (
            <button
              key={category}
              onClick={() => setActiveSkillCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition capitalize ${
                activeSkillCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
      </div>

      {/* Skills List/Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.length > 0 ? (
          filteredSkills
            .sort((a, b) => b.percentage - a.percentage) // Sort within category
            .map((skill, index) => <SkillCard key={index} skill={skill} />)
        ) : (
          <p className="text-gray-400 md:col-span-2 lg:col-span-3 text-center py-8">
            No skills found in this category.
          </p>
        )}
      </div>

      {/* Skill Radar Chart */}
      <div className="mt-12 bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-white dark:text-white mb-4 text-center">
          Overall Skill Distribution
        </h3>
        <div
          className="relative mx-auto"
          style={{ height: "350px", maxWidth: "450px" }}
        >
          <canvas ref={skillRadarChartRef}></canvas>
        </div>
      </div>
    </section>
  );

  // Experience Tab Content
  const renderExperienceTab = () => (
    <section aria-labelledby="experience-heading">
      <h2
        id="experience-heading"
        className="text-2xl font-bold text-white mb-6"
      >
        Work Experience
      </h2>
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-700 before:via-gray-700 before:to-gray-800">
        {workExperience.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} />
        ))}
        {workExperience.length === 0 && (
          <p className="text-gray-400 text-center py-8">
            No work experience listed.
          </p>
        )}
      </div>
    </section>
  );

  // Education Tab Content
  const renderEducationTab = () => (
    <section aria-labelledby="education-heading">
      <h2 id="education-heading" className="text-2xl font-bold text-white mb-6">
        Education
      </h2>
      <div className="space-y-8">
        {educationData.map((edu, index) => (
          <EducationCard key={index} education={edu} />
        ))}
        {educationData.length === 0 && (
          <p className="text-gray-400 text-center py-8">No education listed.</p>
        )}
      </div>
    </section>
  );

  // Certifications Tab Content (New)
  const renderCertificationsTab = () => (
    <section aria-labelledby="certifications-heading">
      <h2
        id="certifications-heading"
        className="text-2xl font-bold text-white mb-6"
      >
        Licenses & Certifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.length > 0 ? (
          certifications.map((cert, index) => (
            <CertificationCard key={index} certification={cert} />
          ))
        ) : (
          <p className="text-gray-400 md:col-span-2 text-center py-8">
            No certifications listed.
          </p>
        )}
      </div>
    </section>
  );

  // Achievements Tab Content
  const renderAchievementsTab = () => (
    <section aria-labelledby="achievements-heading">
      <h2
        id="achievements-heading"
        className="text-2xl font-bold text-white mb-6"
      >
        Awards & Achievements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.length > 0 ? (
          achievements.map((ach, index) => (
            <AchievementCard key={index} achievement={ach} />
          ))
        ) : (
          <p className="text-gray-400 sm:col-span-2 lg:col-span-3 text-center py-8">
            No achievements listed.
          </p>
        )}
      </div>
    </section>
  );

  // Activity Tab Content (Charts & Timeline)
  const renderActivityTab = () => (
    <section aria-labelledby="activity-heading">
      <h2 id="activity-heading" className="text-2xl font-bold text-white mb-6">
        Activity & Timeline
      </h2>

      {/* Contribution Heatmap */}
      <div className="bg-gray-800 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg sm:text-xl font-semibold text-white dark:text-white mb-4">
          Contribution Activity ({contributionData?.year})
        </h3>
        <ContributionHeatmap
          data={contributionData}
          onMouseEnterCell={handleMouseEnterCell}
          onMouseLeaveCell={handleMouseLeaveCell}
          darkMode={darkMode}
        />
        {contributionData && (
          <p className="text-xs text-gray-400 mt-2 text-right">
            Total Contributions: {contributionData.total}
          </p>
        )}
        {/* Tooltip Display */}
        {tooltipInfo && tooltipInfo.show && (
          <div
            className="absolute z-50 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-sm tooltip dark:bg-black"
            style={{
              left: `${tooltipInfo.x}px`,
              top: `${tooltipInfo.y}px`,
              transform: "translate(-50%, -100%)", // Center above the point
              whiteSpace: "nowrap",
            }}
          >
            {tooltipInfo.text}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Activity Line Chart */}
        <div className="bg-gray-800 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold text-white dark:text-white mb-4">
            Monthly Contribution Trend
          </h3>
          <div className="relative h-64 md:h-80">
            <canvas ref={activityChartRef}></canvas>
          </div>
        </div>

        {/* Project Categories Donut Chart */}
        <div className="bg-gray-800 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold text-white dark:text-white mb-4">
            Project Distribution by Category
          </h3>
          <div className="relative h-64 md:h-80">
            <canvas ref={projectCategoryDonutRef}></canvas>
          </div>
        </div>
      </div>

      {/* Combined Timeline */}
      <div className="bg-gray-800 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
        <h3 className="text-lg sm:text-xl font-semibold text-white dark:text-white mb-6">
          Career & Education Timeline
        </h3>
        <div className="space-y-8">
          {timelineData.length > 0 ? (
            timelineData.map((event) => (
              <TimelineItem key={event.id} event={event} />
            ))
          ) : (
            <p className="text-gray-400 text-center py-6">
              Timeline data is not available.
            </p>
          )}
        </div>
      </div>
    </section>
  );

  // Blog Tab Content
  const renderBlogTab = () => (
    <section aria-labelledby="blog-heading">
      <h2 id="blog-heading" className="text-2xl font-bold text-white mb-6">
        Latest Articles
      </h2>
      {/* Add filtering/search for blog later if needed */}
      {blogPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {paginatedBlogPosts.map((post) => (
              <BlogPostCard
                key={post.slug}
                post={post}
                onClick={() => handleBlogPostClick(post)}
              />
            ))}
          </div>
          {/* Pagination for Blog */}
          {totalBlogPostPages > 1 && (
            <PaginationControls
              currentPage={currentBlogPostPage}
              totalPages={totalBlogPostPages}
              onPageChange={setCurrentBlogPostPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <FontAwesomeIcon
            icon={fas.faRss}
            className="text-4xl text-gray-500 mb-4"
          />
          <p className="text-gray-400">
            No blog posts published yet. Check back soon!
          </p>
        </div>
      )}
    </section>
  );

  // Testimonials Tab Content
  const renderTestimonialsTab = () => (
    <section aria-labelledby="testimonials-heading">
      <h2
        id="testimonials-heading"
        className="text-2xl font-bold text-white mb-6"
      >
        What People Say
      </h2>
      {testimonials.length > 0 ? (
        // Optional: Use a carousel library here (e.g., Swiper.js, react-slick) for better UX
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FontAwesomeIcon
            icon={fas.faCommentDots}
            className="text-4xl text-gray-500 mb-4"
          />
          <p className="text-gray-400">
            No testimonials available at the moment.
          </p>
        </div>
      )}
    </section>
  );

  // Contact Tab Content
  const renderContactTab = () => (
    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="text-2xl font-bold text-white mb-6">
        Contact Me
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-white mb-4">
            Send a Message
          </h3>
          <form onSubmit={handleContactFormSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                minLength={2}
                value={contactFormData.name}
                onChange={handleContactFormChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500 border-gray-600"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={contactFormData.email}
                onChange={handleContactFormChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500 border-gray-600"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                value={contactFormData.subject}
                onChange={handleContactFormChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500 border-gray-600"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                minLength={10}
                value={contactFormData.message}
                onChange={handleContactFormChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500 border-gray-600"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={contactFormStatus === "sending"}
              className={`w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition duration-150 font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {contactFormStatus === "sending" ? (
                <>
                  <FontAwesomeIcon
                    icon={fas.faSpinner}
                    className="animate-spin mr-2 h-4 w-4"
                  />
                  Sending...
                </>
              ) : contactFormStatus === "success" ? (
                <>
                  <FontAwesomeIcon
                    icon={fas.faCheck}
                    className="mr-2 h-4 w-4"
                  />
                  Sent!
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={fas.faPaperPlane}
                    className="mr-2 h-4 w-4"
                  />
                  Send Message
                </>
              )}
            </button>
            {contactFormStatus === "error" && (
              <p className="text-sm text-red-400 mt-2 text-center">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Details
            </h3>
            <ul className="space-y-4 text-sm">
              {contacts
                .filter((c) => c.isPublic)
                .map((contact, idx) => (
                  <li key={idx} className="flex items-start text-gray-300">
                    <FontAwesomeIcon
                      icon={contact.icon}
                      className="w-5 h-5 mr-4 text-gray-400 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <span className="font-medium text-gray-200">
                        {contact.type}:
                      </span>
                      <br />
                      {contact.link ? (
                        <a
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-400 transition duration-150 break-all"
                        >
                          {contact.value}
                          {contact.type !== "Email" && (
                            <FontAwesomeIcon
                              icon={fas.faExternalLinkAlt}
                              className="ml-1.5 h-3 w-3 opacity-70"
                            />
                          )}
                        </a>
                      ) : (
                        <span className="break-all">{contact.value}</span>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white mb-4">
              Find Me Online
            </h3>
            <div className="flex flex-wrap gap-4">
              {socialMedia.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition duration-150 bg-gray-700 px-3 py-2 rounded-lg text-sm"
                  aria-label={`Visit my ${social.platform} profile`}
                >
                  <FontAwesomeIcon icon={social.icon} className="h-4 w-4" />
                  <span>{social.platform}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // --- MAIN RENDER ---

  // Improved Loading Component
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="relative">
          {/* Outer circle with pulse effect */}
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-ping"></div>

          {/* Inner spinning circle */}
          <div className="relative flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full">
            <FontAwesomeIcon
              icon={fas.faSpinner}
              className="animate-spin text-2xl text-blue-400"
            />
          </div>
        </div>

        {/* Loading text with fade animation */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-blue-400 animate-pulse">
            Loading Portfolio
          </h3>
          <div className="flex justify-center mt-2">
            <span
              className="inline-block w-2 h-2 mx-1 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></span>
            <span
              className="inline-block w-2 h-2 mx-1 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></span>
            <span
              className="inline-block w-2 h-2 mx-1 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "600ms" }}
            ></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark" : ""
      } bg-gray-900 dark:bg-gray-900 text-gray-300 dark:text-gray-300 font-sans transition-colors duration-300 print:bg-white print:text-black`}
    >
      {/* --- Header & Navigation --- */}
      {/* Placeholder for potential fixed top bar if needed */}
      {/* <div className="h-16 bg-gray-850"></div> */}

      <div
        ref={navbarRef}
        className={`sticky top-0 z-40 px-2 transition-all duration-300 bg-gray-900 backdrop-blur-sm ${
          isNavbarFixed ? "shadow-lg shadow-gray-900/50" : ""
        }`}
      >
        <div className="container px-4">
          <div className="flex items-center justify-between h-14">
            {/* Desktop Navigation - with more space from logo */}
            <div className="hidden md:block flex-grow mx-8 px-5">
              <div className="flex justify-center space-x-4 mx-auto ml-5">
                {renderNavigationTabs()}
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-controls="mobile-menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  <FontAwesomeIcon
                    icon={mobileMenuOpen ? fas.faTimes : fas.faBars}
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel - More compact */}
        <Transition
          show={mobileMenuOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-2"
        >
          <div
            className="md:hidden absolute top-full left-0 right-0 bg-gray-800 shadow-md border-t border-gray-700"
            id="mobile-menu"
          >
            <div className="grid grid-cols-2 gap-1 p-2 max-h-[60vh] overflow-y-auto">
              {/* Grid layout untuk menu mobile yang lebih padat */}
              {[
                { id: "overview", icon: fas.faHome, label: "Overview" },
                { id: "projects", icon: fas.faCodeBranch, label: "Projects" },
                { id: "skills", icon: fas.faCode, label: "Skills" },
                {
                  id: "experience",
                  icon: fas.faBriefcase,
                  label: "Experience",
                },
                {
                  id: "education",
                  icon: fas.faGraduationCap,
                  label: "Education",
                },
                {
                  id: "certifications",
                  icon: fas.faCertificate,
                  label: "Certs",
                },
                {
                  id: "achievements",
                  icon: fas.faAward,
                  label: "Achievements",
                },
                { id: "activity", icon: fas.faChartLine, label: "Activity" },
                { id: "blog", icon: fas.faRss, label: "Blog" },
                {
                  id: "testimonials",
                  icon: fas.faCommentDots,
                  label: "Testimonials",
                },
                { id: "contact", icon: fas.faEnvelope, label: "Contact" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    handleTabClick(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                >
                  <FontAwesomeIcon icon={tab.icon} className="mr-2 h-3 w-3" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </Transition>
      </div>

      {/* --- Main Content Area --- */}
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        {renderProfileHeader()}

        {/* Tab Content Area */}
        <div id="main-content" className="mt-8">
          {activeTab === "overview" && renderOverviewTab()}
          {activeTab === "projects" && renderProjectsTab()}
          {activeTab === "skills" && renderSkillsTab()}
          {activeTab === "experience" && renderExperienceTab()}
          {activeTab === "education" && renderEducationTab()}
          {activeTab === "certifications" && renderCertificationsTab()}
          {activeTab === "achievements" && renderAchievementsTab()}
          {activeTab === "activity" && renderActivityTab()}
          {activeTab === "blog" && renderBlogTab()}
          {activeTab === "testimonials" && renderTestimonialsTab()}
          {activeTab === "contact" && renderContactTab()}
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-850 dark:bg-gray-850 mt-16 py-8 border-t border-gray-700 dark:border-gray-700 print:hidden">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <div className="flex justify-center space-x-6 mb-4">
            {socialMedia.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="hover:text-blue-400 transition"
              >
                <FontAwesomeIcon icon={social.icon} size="lg" />
              </a>
            ))}
          </div>
          <p>
            &copy; {new Date().getFullYear()} Youralpha. All rights reserved.
          </p>
          <p className="mt-1">
            Built with{" "}
            <FontAwesomeIcon icon={fab.faReact} className="text-cyan-400" />{" "}
            Next.js,{" "}
            <FontAwesomeIcon icon={fab.faCss3} className="text-blue-500" />{" "}
            Tailwind CSS, and{" "}
            <FontAwesomeIcon icon={fas.faHeart} className="text-red-500" />.
            Hosted on Vercel.
          </p>
          {/* Export buttons in footer */}
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => handleExport("json")}
              disabled={isExporting}
              className="flex items-center text-xs text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-wait"
            >
              <FontAwesomeIcon
                icon={isExporting ? fas.faSpinner : fas.faFileCode}
                className={`mr-1 ${isExporting ? "animate-spin" : ""}`}
              />{" "}
              Export JSON
            </button>
            <button
              onClick={() => handleExport("pdf")}
              disabled={isExporting}
              className="flex items-center text-xs text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-wait"
            >
              <FontAwesomeIcon
                icon={isExporting ? fas.faSpinner : fas.faFilePdf}
                className={`mr-1 ${isExporting ? "animate-spin" : ""}`}
              />{" "}
              Export PDF (Print)
            </button>
          </div>
        </div>
      </footer>

      {/* --- Modals & Dialogs --- */}
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

      {/* Contact Form Modal (Alternative to inline section) */}
      {/* <ContactFormModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} /> */}

      {/* --- Notifications Panel --- */}
      <NotificationPanel
        notifications={notifications}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onMarkRead={handleNotificationMarkAsRead}
        onMarkAllRead={handleNotificationMarkAllRead}
        onClearAll={handleClearAllNotifications}
        panelRef={notificationPanelRef} // Pass ref
      />

      {/* --- Global Components (e.g., Fixed Notification Toggle Button) --- */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 print:hidden"
        aria-label={`${
          notifications.filter((n) => !n.read).length
        } unread notifications`}
      >
        <FontAwesomeIcon icon={fas.faBell} className="h-5 w-5" />
        {notifications.filter((n) => !n.read).length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-white text-xs items-center justify-center">
              {notifications.filter((n) => !n.read).length}
            </span>
          </span>
        )}
      </button>
    </div> // End of main wrapper div
  );
};

// --- CHILD COMPONENTS ---
// (Breaking down render functions into separate components)

// --- Component: Project Card ---
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  viewMode?: "grid" | "list"; // Add view mode prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  viewMode = "grid",
}) => {
  if (viewMode === "list") {
    // --- List View Rendering ---
    return (
      <div
        onClick={onClick}
        className="flex flex-col sm:flex-row items-start bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-750 dark:hover:bg-gray-700 transition duration-200 cursor-pointer overflow-hidden p-4"
      >
        {/* Image (Optional for list view, smaller) */}
        {project.image && (
          <Image
            src={project.image}
            alt={`${project.title}`}
            fill={true}
            objectFit="cover"
            className="object-cover rounded-md mb-3 sm:mb-0 sm:mr-4 flex-shrink-0"
          />
        )}
        {!project.image && (
          <div className="w-full sm:w-32 h-24 flex-shrink-0 bg-gray-700 rounded-md flex items-center justify-center text-gray-500 mb-3 sm:mb-0 sm:mr-4">
            <FontAwesomeIcon icon={fas.faCodeBranch} size="2x" />
          </div>
        )}

        {/* Details */}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-semibold text-white dark:text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                project.status === "completed"
                  ? "bg-green-600 text-green-100"
                  : project.status === "in-progress"
                  ? "bg-yellow-600 text-yellow-100"
                  : "bg-gray-600 text-gray-100"
              }`}
            >
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-300 dark:text-gray-400 mb-2 line-clamp-2">
            {project.description}
          </p>
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.techStack.slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-700 dark:bg-gray-600 text-gray-200 dark:text-gray-200 px-2 py-0.5 rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="text-xs bg-gray-700 dark:bg-gray-600 text-gray-200 px-2 py-0.5 rounded-full">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
          {/* Stats and Links */}
          <div className="flex flex-wrap justify-between items-center text-xs text-gray-400">
            <div className="flex items-center space-x-3">
              <span title="Stars">
                <FontAwesomeIcon icon={fas.faStar} className="mr-1" />{" "}
                {project.stats.stars}
              </span>
              <span title="Forks">
                <FontAwesomeIcon icon={fas.faCodeBranch} className="mr-1" />{" "}
                {project.stats.forks ?? 0}
              </span>
              <span title="Views">
                <FontAwesomeIcon icon={fas.faEye} className="mr-1" />{" "}
                {project.stats.views}
              </span>
            </div>
            <div className="flex items-center space-x-3 mt-2 sm:mt-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FontAwesomeIcon icon={fab.faGithub} className="mr-1" /> Code
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FontAwesomeIcon
                    icon={fas.faExternalLinkAlt}
                    className="mr-1"
                  />{" "}
                  Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // --- Grid View Rendering (Default) ---
    return (
      <div
        onClick={onClick}
        className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group transform hover:-translate-y-1 flex flex-col"
      >
        {/* Project Image */}
        <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
          {project.image ? (
            <div className="w-full overflow-hidden rounded-md aspect-video">
              <Image
                width={800}
                height={450}
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <FontAwesomeIcon icon={fas.faCodeBranch} size="3x" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
          {/* Status Badge */}
          <span
            className={`absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
              project.status === "completed"
                ? "bg-green-600 text-green-100"
                : project.status === "in-progress"
                ? "bg-yellow-600 text-yellow-100"
                : "bg-gray-600 text-gray-100"
            }`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
          {/* Stats Overlay (optional, on hover) */}
          <div className="absolute bottom-2 left-2 flex items-center space-x-3 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            <span title="Stars">
              <FontAwesomeIcon
                icon={fas.faStar}
                className="mr-1 text-yellow-400"
              />{" "}
              {project.stats.stars}
            </span>
            <span title="Forks">
              <FontAwesomeIcon icon={fas.faCodeBranch} className="mr-1" />{" "}
              {project.stats.forks ?? 0}
            </span>
            <span title="Views">
              <FontAwesomeIcon icon={fas.faEye} className="mr-1" />{" "}
              {project.stats.views}
            </span>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-white dark:text-white mb-1 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-gray-300 dark:text-gray-400 mb-3 line-clamp-3 flex-grow">
            {project.description}
          </p>{" "}
          {/* Use line-clamp */}
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 4).map(
              (
                tech,
                idx // Show top 4 tech
              ) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-700 dark:bg-gray-600 text-gray-200 dark:text-gray-200 px-2 py-0.5 rounded-full"
                >
                  {tech}
                </span>
              )
            )}
            {project.techStack.length > 4 && (
              <span className="text-xs bg-gray-700 dark:bg-gray-600 text-gray-200 px-2 py-0.5 rounded-full">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
          {/* Links */}
          <div className="mt-auto flex justify-end space-x-3 pt-2 border-t border-gray-700 dark:border-gray-600">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-400 hover:text-blue-400 transition"
                aria-label="View GitHub Repository"
              >
                <FontAwesomeIcon icon={fab.faGithub} size="lg" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-400 hover:text-blue-400 transition"
                aria-label="View Live Demo"
              >
                <FontAwesomeIcon icon={fas.faExternalLinkAlt} size="lg" />
              </a>
            )}
            <button
              onClick={onClick}
              className="text-gray-400 hover:text-blue-400 transition"
              aria-label="View Project Details"
            >
              <FontAwesomeIcon icon={fas.faInfoCircle} size="lg" />
            </button>
          </div>
        </div>
      </div>
    );
  }
};

// --- Component: Project Dialog ---
interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  if (!project) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 print:hidden" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal Content */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-gray-800 dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <Dialog.Title
                  as="h3"
                  className="text-xl md:text-2xl font-bold leading-6 text-white dark:text-white mb-2 flex justify-between items-center"
                >
                  <span>{project.title}</span>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <FontAwesomeIcon icon={fas.faTimes} className="h-5 w-5" />
                  </button>
                </Dialog.Title>
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-4 ${
                    project.status === "completed"
                      ? "bg-green-600 text-green-100"
                      : project.status === "in-progress"
                      ? "bg-yellow-600 text-yellow-100"
                      : "bg-gray-600 text-gray-100"
                  }`}
                >
                  Status:{" "}
                  {project.status.charAt(0).toUpperCase() +
                    project.status.slice(1)}
                </span>

                {/* Main Content */}
                <div className="mt-2 space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
                  {/* Optional Image */}
                  {project.image && (
                    <div className="relative w-full aspect-video max-h-64 mb-4 bg-gray-700 rounded-md">
                      <Image
                        src={project.image}
                        alt={`${project.title}`}
                        fill={true}
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-gray-300 dark:text-gray-300 leading-relaxed">
                    {project.longDescription || project.description}
                  </p>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-md font-semibold text-white mb-2">
                      Key Features:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-md font-semibold text-white mb-2">
                      Technology Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-700 dark:bg-gray-600 text-gray-200 px-2.5 py-1 rounded-full flex items-center"
                        >
                          {/* Try to find matching icon */}
                          {(() => {
                            const skill = skillsData.find(
                              (s) =>
                                s.name.toLowerCase() === tech.toLowerCase() ||
                                s.name.split("/")[0].toLowerCase() ===
                                  tech.toLowerCase()
                            );
                            return skill?.icon ? (
                              <FontAwesomeIcon
                                icon={skill.icon}
                                className="mr-1.5 h-3 w-3 text-gray-400"
                              />
                            ) : null;
                          })()}
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div>
                    <h4 className="text-md font-semibold text-white mb-2">
                      Statistics:
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div className="bg-gray-750 p-2 rounded text-center">
                        <FontAwesomeIcon
                          icon={fas.faStar}
                          className="text-yellow-400 mr-1.5"
                        />{" "}
                        {project.stats.stars} Stars
                      </div>
                      <div className="bg-gray-750 p-2 rounded text-center">
                        <FontAwesomeIcon
                          icon={fas.faCodeBranch}
                          className="text-blue-400 mr-1.5"
                        />{" "}
                        {project.stats.forks ?? 0} Forks
                      </div>
                      <div className="bg-gray-750 p-2 rounded text-center">
                        <FontAwesomeIcon
                          icon={fas.faEye}
                          className="text-green-400 mr-1.5"
                        />{" "}
                        {project.stats.views} Views
                      </div>
                      <div className="bg-gray-750 p-2 rounded text-center">
                        <FontAwesomeIcon
                          icon={fas.faHistory}
                          className="text-purple-400 mr-1.5"
                        />{" "}
                        {project.stats.commits ?? "N/A"} Commits
                      </div>
                    </div>
                  </div>

                  {/* Learnings/Challenges */}
                  {project.learnings && project.learnings.length > 0 && (
                    <div>
                      <h4 className="text-md font-semibold text-white mb-2">
                        Key Learnings / Challenges:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                        {project.learnings.map((learning, idx) => (
                          <li key={idx}>{learning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Collaborators */}
                  {project.collaborators &&
                    project.collaborators.length > 0 && (
                      <div>
                        <h4 className="text-md font-semibold text-white mb-2">
                          Collaborators:
                        </h4>
                        <div className="flex flex-wrap gap-2 text-sm">
                          {project.collaborators.map((collab, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-700 px-2 py-1 rounded text-gray-300"
                            >
                              <FontAwesomeIcon
                                icon={fas.faUser}
                                className="mr-1.5 text-gray-400"
                              />
                              {collab}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                {/* Footer / Actions */}
                <div className="mt-6 pt-4 border-t border-gray-700 dark:border-gray-600 flex flex-wrap justify-end gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 focus-visible:ring-offset-gray-800"
                    >
                      <FontAwesomeIcon
                        icon={fab.faGithub}
                        className="mr-2 h-4 w-4"
                      />{" "}
                      View Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:ring-offset-gray-800"
                    >
                      <FontAwesomeIcon
                        icon={fas.faExternalLinkAlt}
                        className="mr-2 h-4 w-4"
                      />{" "}
                      Live Demo
                    </a>
                  )}
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// --- Component: Skill Card ---
interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => (
  <div className="bg-gray-800 dark:bg-gray-800 p-5 rounded-lg shadow-md flex flex-col h-full hover:bg-gray-750 dark:hover:bg-gray-700 transition duration-200">
    <div className="flex items-center mb-3">
      {skill.icon && (
        <span className="w-10 h-10 flex items-center justify-center bg-gray-700 dark:bg-gray-700 rounded-lg mr-3">
          <FontAwesomeIcon
            icon={skill.icon}
            className="text-xl text-blue-400"
          />
        </span>
      )}
      <h4 className="text-lg font-semibold text-white dark:text-white flex-1">
        {skill.name}
      </h4>
      {skill.years && (
        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full">
          {skill.years} yrs
        </span>
      )}
    </div>
    <p className="text-sm text-gray-300 dark:text-gray-400 mb-3 flex-grow">
      {skill.description}
    </p>
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-400">Proficiency</span>
        <span className="text-xs font-medium text-blue-300">
          {skill.percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-700 dark:bg-gray-600 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full bg-gradient-to-r ${
            skill.color || "from-blue-500 to-cyan-500"
          }`}
          style={{ width: `${skill.percentage}%` }}
          role="progressbar"
          aria-valuenow={skill.percentage}
          aria-label={`${skill.name} proficiency level`}
        ></div>
      </div>
    </div>
    {skill.projectsUsedIn && skill.projectsUsedIn.length > 0 && (
      <div className="mt-3 pt-2 border-t border-gray-700">
        <p className="text-xs text-gray-400 mb-1">Used in:</p>
        <div className="flex flex-wrap gap-1.5">
          {skill.projectsUsedIn.map((projTitle, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-600 text-gray-200 px-2 py-0.5 rounded-full"
            >
              {projTitle}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

// --- Component: Experience Card ---
interface ExperienceCardProps {
  experience: WorkExperience;
}
const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const duration = calculateDuration(
    experience.period.split(" - ")[0],
    experience.period.split(" - ")[1]
  );
  const cardId = `exp-${experience.company.replace(
    /\s+/g,
    "-"
  )}-${experience.position.replace(/\s+/g, "-")}`;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex items-start relative pl-10">
      {/* Timeline Dot */}
      <span className="absolute left-0 top-1 flex items-center justify-center w-10 h-10">
        <span className="h-3 w-3 rounded-full bg-blue-500 ring-4 ring-gray-800 dark:ring-gray-850"></span>
      </span>

      {/* Card Content */}
      <div className="bg-gray-800 dark:bg-gray-800 p-5 rounded-lg shadow-md w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {experience.position}
            </h3>
            <p className="text-sm text-blue-400 font-medium">
              {experience.company}{" "}
              {experience.website && (
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 opacity-70 hover:opacity-100"
                >
                  <FontAwesomeIcon icon={fas.faExternalLinkAlt} size="xs" />
                </a>
              )}
            </p>
          </div>
          <div className="text-xs text-gray-400 mt-1 sm:mt-0 text-left sm:text-right">
            <p>
              {formatDate(experience.period.split(" - ")[0], "short")} -{" "}
              {experience.period.split(" - ")[1] === "Present"
                ? "Present"
                : formatDate(experience.period.split(" - ")[1], "short")}
            </p>
            {duration && <p>({duration})</p>}
            <p className="mt-1 capitalize">
              <FontAwesomeIcon icon={fas.faMapPin} className="mr-1" />{" "}
              {experience.location} ({experience.type})
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-300 mb-3">{experience.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {experience.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-700 dark:bg-gray-600 text-gray-200 px-2 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Toggle Button for Details */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-blue-400 hover:text-blue-300 mb-3 flex items-center"
          aria-expanded={isExpanded}
          aria-controls={`${cardId}-details`}
        >
          {isExpanded ? "Hide Details" : "Show Details"}
          <FontAwesomeIcon
            icon={isExpanded ? fas.faChevronUp : fas.faChevronDown}
            className="ml-1 h-3 w-3"
          />
        </button>

        {/* Collapsible Details */}
        <Transition
          show={isExpanded}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            id={`${cardId}-details`}
            className="space-y-3 border-t border-gray-700 pt-3"
          >
            {/* Responsibilities */}
            {experience.responsibilities &&
              experience.responsibilities.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    Key Responsibilities:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                    {experience.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}
            {/* Achievements */}
            {experience.achievements && experience.achievements.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  Notable Achievements:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                  {experience.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Transition>
      </div>
    </div>
  );
};

// --- Component: Education Card ---
interface EducationCardProps {
  education: Education;
}
const EducationCard: React.FC<EducationCardProps> = ({ education }) => (
  <div className="bg-gray-800 dark:bg-gray-800 p-5 rounded-lg shadow-md flex flex-col sm:flex-row items-start gap-4">
    {/* Logo (optional) */}
    {education.logo && (
      <Image
        src={education.logo}
        alt={`${education.institution} logo`}
        width={64}
        height={64}
        className="object-contain rounded-md bg-white p-1 flex-shrink-0 mb-3 sm:mb-0"
      />
    )}
    {!education.logo && (
      <div className="w-16 h-16 flex-shrink-0 bg-gray-700 rounded-md flex items-center justify-center text-gray-500 mb-3 sm:mb-0">
        <FontAwesomeIcon icon={fas.faUniversity} size="2x" />
      </div>
    )}

    {/* Details */}
    <div className="flex-grow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {education.degree}
          </h3>
          <p className="text-sm text-blue-400 font-medium">
            {education.institution}
          </p>
          <p className="text-xs text-gray-300">{education.field}</p>
        </div>
        <div className="text-xs text-gray-400 mt-1 sm:mt-0 text-left sm:text-right">
          <p>{education.period}</p>
          {education.location && (
            <p className="mt-1">
              <FontAwesomeIcon icon={fas.faMapPin} className="mr-1" />{" "}
              {education.location}
            </p>
          )}
          {education.gpa && <p className="mt-1">GPA: {education.gpa}</p>}
        </div>
      </div>
      <p className="text-sm text-gray-300 mt-2 mb-3">{education.description}</p>

      {/* Achievements */}
      {education.achievements && education.achievements.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-white mb-1">
            Achievements/Activities:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
            {education.achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

// --- Component: Certification Card ---
interface CertificationCardProps {
  certification: Certification;
}
const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
}) => (
  <div className="bg-gray-800 dark:bg-gray-800 p-5 rounded-lg shadow-md flex items-start gap-4 hover:bg-gray-750 transition duration-200">
    {/* Icon */}
    <div className="w-12 h-12 flex-shrink-0 bg-gray-700 rounded-lg flex items-center justify-center mt-1">
      <FontAwesomeIcon
        icon={certification.icon}
        className="text-2xl text-blue-400"
      />
    </div>
    {/* Details */}
    <div className="flex-grow">
      <h3 className="text-md font-semibold text-white">{certification.name}</h3>
      <p className="text-sm text-gray-400 mb-1">
        Issued by: {certification.issuer}
      </p>
      <p className="text-xs text-gray-400 mb-2">
        Issued: {formatDate(certification.date, "medium")}
        {certification.expiry &&
          certification.expiry !== "Lifetime" &&
          ` | Expires: ${formatDate(certification.expiry, "medium")}`}
        {certification.expiry === "Lifetime" && ` | Lifetime`}
      </p>
      <p className="text-sm text-gray-300 mb-3">{certification.description}</p>
      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="text-xs font-medium text-gray-400 mr-1">Skills:</span>
        {certification.skills.slice(0, 5).map((skill, idx) => (
          <span
            key={idx}
            className="text-xs bg-gray-700 text-gray-200 px-2 py-0.5 rounded-full"
          >
            {skill}
          </span>
        ))}
        {certification.skills.length > 5 && (
          <span className="text-xs bg-gray-700 text-gray-200 px-2 py-0.5 rounded-full">
            +{certification.skills.length - 5} more
          </span>
        )}
      </div>
      {/* Credential & Verification */}
      <div className="text-xs text-gray-400">
        <span>Credential ID: {certification.credentialId}</span>
        {certification.verificationUrl &&
          certification.verificationUrl !== "#" && (
            <a
              href={certification.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-blue-400 hover:text-blue-300 font-medium"
            >
              Verify Credential{" "}
              <FontAwesomeIcon icon={fas.faExternalLinkAlt} size="xs" />
            </a>
          )}
      </div>
    </div>
  </div>
);

// --- Component: Achievement Card ---
interface AchievementCardProps {
  achievement: Achievement;
}
const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => (
  <div className="bg-gray-800 dark:bg-gray-800 p-5 rounded-lg shadow-md flex flex-col items-center text-center hover:bg-gray-750 transition duration-200 h-full">
    <div className="w-16 h-16 bg-gradient-to-br from-blue-800 to-purple-800 rounded-full mb-3 flex items-center justify-center text-yellow-300 ring-2 ring-blue-700">
      <FontAwesomeIcon icon={achievement.icon} className="text-3xl" />
    </div>
    <h3 className="text-md font-semibold text-white mb-1">
      {achievement.title}
    </h3>
    <p className="text-xs text-gray-400 mb-2">
      {achievement.issuer && `${achievement.issuer} • `}
      {formatDate(achievement.date, "medium")} • {achievement.category}
    </p>
    <p className="text-sm text-gray-300 mb-3 flex-grow">
      {achievement.description}
    </p>
    {achievement.link && achievement.link !== "#" && (
      <a
        href={achievement.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto text-xs text-blue-400 hover:text-blue-300 font-medium"
      >
        View Details <FontAwesomeIcon icon={fas.faExternalLinkAlt} size="xs" />
      </a>
    )}
  </div>
);

// --- Component: Blog Post Card ---
interface BlogPostCardProps {
  post: BlogPost;
  onClick: () => void;
}
const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onClick }) => (
  <div
    onClick={onClick}
    className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col group"
  >
    {/* Image */}
    {post.image && (
      <div className="h-48 w-full overflow-hidden relative">
        <Image
          src={post.image}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    )}
    {!post.image && (
      <div className="h-45 w-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-gray-500">
        <FontAwesomeIcon icon={fas.faBlog} size="3x" />
      </div>
    )}

    {/* Content */}
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-1 text-xs text-gray-400">
        <span>{formatDate(post.date, "medium")}</span>
        <span>{post.readTime}</span>
      </div>
      <h3 className="text-lg font-semibold text-white dark:text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-gray-300 dark:text-gray-300 mb-3 flex-grow line-clamp-3">
        {post.excerpt}
      </p>{" "}
      {/* line-clamp */}
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.tags.slice(0, 3).map((tag, idx) => (
          <span
            key={idx}
            className="text-xs bg-gray-700 dark:bg-gray-600 text-gray-300 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
        {post.tags.length > 3 && (
          <span className="text-xs bg-gray-700 dark:bg-gray-600 text-gray-300 px-2 py-0.5 rounded-full">
            +{post.tags.length - 3}
          </span>
        )}
      </div>
      {/* Stats & Read More */}
      <div className="mt-auto flex justify-between items-center pt-2 border-t border-gray-700 dark:border-gray-600 text-xs text-gray-400">
        <div className="flex items-center space-x-3">
          <span title="Likes">
            <FontAwesomeIcon icon={fas.faThumbsUp} className="mr-1" />{" "}
            {post.likes}
          </span>
          <span title="Comments">
            <FontAwesomeIcon icon={fas.faComments} className="mr-1" />{" "}
            {post.comments}
          </span>
          <span title="Views">
            <FontAwesomeIcon icon={fas.faEye} className="mr-1" />{" "}
            {post.views ?? 0}
          </span>
        </div>
        <span className="text-blue-400 group-hover:underline">
          Read More &rarr;
        </span>
      </div>
    </div>
  </div>
);

// --- Component: Blog Post Dialog ---
interface BlogPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
}
const BlogPostDialog: React.FC<BlogPostDialogProps> = ({
  isOpen,
  onClose,
  post,
}) => {
  // In a real app, 'post.content' would likely be fetched or already available (e.g., Markdown/HTML)
  // For this example, we'll just display the existing info.
  if (!post) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 print:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-gray-800 dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-white mb-3 flex justify-between items-start"
                >
                  <span>{post.title}</span>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white p-1 rounded-full -mt-1 -mr-2"
                  >
                    <FontAwesomeIcon icon={fas.faTimes} className="h-5 w-5" />
                  </button>
                </Dialog.Title>
                <div className="flex justify-between items-center text-xs text-gray-400 mb-4 pb-3 border-b border-gray-700">
                  <span>By Youralpha on {formatDate(post.date, "long")}</span>
                  <span>
                    {post.readTime} &bull; {post.category}
                  </span>
                </div>

                <div className="mt-2 space-y-4 max-h-[70vh] overflow-y-auto pr-2 text-sm text-gray-300 leading-relaxed">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={450}
                      className="w-full h-auto max-h-72 object-cover rounded-md mb-4 bg-gray-700"
                    />
                  )}
                  {/* Display Excerpt or Full Content Here */}
                  <p className="mb-4">{post.excerpt}</p>

                  {/* Placeholder for actual content rendering */}
                  <div className="prose prose-sm prose-invert max-w-none">
                    <p>
                      <em>
                        (Full blog post content would be rendered here. This
                        might involve parsing Markdown or displaying HTML.)
                      </em>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <pre>
                      <code>{`function exampleCode() { \n  console.log("Hello, world!"); \n}`}</code>
                    </pre>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <span className="text-sm font-semibold text-white mr-2">
                      Tags:
                    </span>
                    <div className="inline-flex flex-wrap gap-2">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-700 dark:bg-gray-600 text-gray-200 px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// --- Component: Testimonial Card ---
interface TestimonialCardProps {
  testimonial: Testimonial;
}
const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
  <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full">
    <FontAwesomeIcon
      icon={fas.faQuoteLeft}
      className="text-3xl text-blue-500 mb-3"
    />
    <p className="text-sm text-gray-300 dark:text-gray-300 italic mb-4 flex-grow">
      {testimonial.text}
    </p>
    <div className="mt-auto pt-4 border-t border-gray-700 flex items-center">
      {testimonial.avatar && (
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={48}
          height={48}
          className="rounded-full object-cover mr-3 border-2 border-gray-600"
        />
      )}
      {!testimonial.avatar && (
        <span className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-3 border-2 border-gray-600">
          <FontAwesomeIcon
            icon={fas.faUser}
            className="text-xl text-gray-400"
          />
        </span>
      )}
      <div className="flex-grow">
        <p className="text-sm font-semibold text-white">{testimonial.name}</p>
        <p className="text-xs text-gray-400">
          {testimonial.position}, {testimonial.company}
        </p>
        <p className="text-xs text-gray-500">
          {testimonial.relation} &bull; {formatDate(testimonial.date, "medium")}
        </p>
      </div>
      {/* Rating */}
      <div className="flex text-yellow-400 ml-2 flex-shrink-0">
        {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
          <FontAwesomeIcon key={i} icon={fas.faStar} />
        ))}
        {testimonial.rating % 1 !== 0 && (
          <FontAwesomeIcon icon={fas.faStarHalfAlt} />
        )}
        {[...Array(5 - Math.ceil(testimonial.rating))].map((_, i) => (
          <FontAwesomeIcon
            key={`empty-${i}`}
            icon={fas.faStar}
            className="text-gray-600"
          />
        ))}
      </div>
    </div>
  </div>
);

// --- Component: Notification Panel ---
interface NotificationPanelProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClearAll: () => void;
  panelRef: React.Ref<HTMLDivElement>;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkRead,
  onMarkAllRead,
  onClearAll,
  panelRef,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return { icon: fas.faCheckCircle, color: "text-green-400" };
      case "warning":
        return { icon: fas.faExclamationTriangle, color: "text-yellow-400" };
      case "error":
        return { icon: fas.faTimesCircle, color: "text-red-400" };
      case "info":
      default:
        return { icon: fas.faInfoCircle, color: "text-blue-400" };
    }
  };

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <div
        ref={panelRef} // Attach ref here
        className="fixed top-16 right-4 sm:right-6 w-full max-w-sm bg-gray-800 dark:bg-gray-850 rounded-lg shadow-2xl z-50 border border-gray-700 dark:border-gray-700 print:hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700 dark:border-gray-700">
          <h4 className="text-md font-semibold text-white">
            Notifications {unreadCount > 0 && `(${unreadCount})`}
          </h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full"
          >
            <FontAwesomeIcon icon={fas.faTimes} className="h-4 w-4" />
          </button>
        </div>

        {/* Notification List */}
        <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-400 py-8 text-sm">
              No notifications yet.
            </p>
          ) : (
            notifications.map((notification) => {
              const { icon, color } = getIcon(notification.type);
              const timeAgo = new Date(notification.date).toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              ); // Simple time for example

              return (
                <div
                  key={notification.id}
                  className={`flex items-start p-3 border-b border-gray-700 dark:border-gray-750 last:border-b-0 transition-colors ${
                    !notification.read
                      ? "bg-gray-750 dark:bg-gray-800"
                      : "hover:bg-gray-700 dark:hover:bg-gray-750"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${color}`}
                  />
                  <div className="flex-grow text-sm">
                    <p
                      className={`font-medium ${
                        !notification.read ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {notification.title}
                    </p>
                    <p
                      className={`text-xs ${
                        !notification.read ? "text-gray-300" : "text-gray-400"
                      } mb-1`}
                    >
                      {notification.message}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatDate(notification.date.toISOString(), "short")} at{" "}
                      {timeAgo}
                    </span>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => onMarkRead(notification.id)}
                      className="ml-2 p-1 text-xs text-blue-400 hover:text-blue-300 flex-shrink-0"
                      title="Mark as read"
                    >
                      <FontAwesomeIcon icon={fas.faCheck} />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {notifications.length > 0 && (
          <div className="flex justify-between items-center px-4 py-2 border-t border-gray-700 dark:border-gray-700 text-xs">
            <button
              onClick={onMarkAllRead}
              disabled={unreadCount === 0}
              className="text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mark all as read
            </button>
            <button
              onClick={onClearAll}
              className="text-red-400 hover:text-red-300"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </Transition>
  );
};

// --- Component: Pagination Controls ---
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Determine page numbers to display (e.g., show 5 numbers max)
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if endPage reaches the totalPages limit early
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center space-x-2 mt-8 print:hidden"
      aria-label="Pagination"
    >
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
      >
        <FontAwesomeIcon icon={fas.faChevronLeft} className="mr-1 h-3 w-3" />{" "}
        Prev
      </button>

      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1.5 rounded-md transition text-sm ${
              currentPage === page
                ? "bg-blue-600 text-white font-medium"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-3 py-1.5 text-gray-500">
            ...
          </span>
        )
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
      >
        Next{" "}
        <FontAwesomeIcon icon={fas.faChevronRight} className="ml-1 h-3 w-3" />
      </button>
    </nav>
  );
};

// --- Component: Contribution Heatmap ---
interface ContributionHeatmapProps {
  data: ContributionData | null;
  onMouseEnterCell: (
    e: React.MouseEvent<SVGRectElement>,
    day: ContributionDay
  ) => void;
  onMouseLeaveCell: () => void;
  darkMode: boolean;
}

const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({
  data,
  onMouseEnterCell,
  onMouseLeaveCell,
  darkMode,
}) => {
  if (!data)
    return (
      <div className="text-center text-gray-500 py-4">
        Loading contribution data...
      </div>
    );

  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  const firstDayOffset = new Date(data.range.start).getDay(); // 0 = Sunday, 6 = Saturday

  // Add padding for the first week
  for (let i = 0; i < firstDayOffset; i++) {
    // Use a placeholder or mark these as non-contribution days
    currentWeek.push({ date: `padding-${i}`, count: -1, level: 0 }); // Use count -1 to signify padding
  }

  data.contributions.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Add the last partial week if it exists
  if (currentWeek.length > 0) {
    // Pad the last week to ensure it has 7 days for grid alignment
    while (currentWeek.length < 7) {
      currentWeek.push({
        date: `padding-end-${currentWeek.length}`,
        count: -1,
        level: 0,
      });
    }
    weeks.push(currentWeek);
  }

  const cellSize = 12; // Size of each square cell
  const cellGap = 2; // Gap between cells
  const weekLabelWidth = 30; // Space for Mon/Wed/Fri labels
  const monthLabelHeight = 20; // Space for month labels

  const heatmapWidth = weeks.length * (cellSize + cellGap) + weekLabelWidth;
  const heatmapHeight = 7 * (cellSize + cellGap) + monthLabelHeight;

  const getMonthLabels = () => {
    const labels: { month: string; x: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
      // Find the first valid day in the week to check the month
      const firstValidDayInWeek = week.find((d) => d.count >= 0);
      if (firstValidDayInWeek) {
        const month = new Date(firstValidDayInWeek.date).getMonth();
        if (month !== lastMonth) {
          // Only add label if it's a new month and not too close to the previous one
          if (lastMonth === -1 || weekIndex > 2) {
            // Avoid crowding labels at the start
            labels.push({
              month: new Date(firstValidDayInWeek.date).toLocaleString(
                "default",
                { month: "short" }
              ),
              x: weekIndex * (cellSize + cellGap) + weekLabelWidth,
            });
            lastMonth = month;
          }
        }
      }
    });
    return labels;
  };

  const monthLabels = getMonthLabels();
  const dayLabels: { label: string; y: number }[] = [
    { label: "Mon", y: 1 },
    { label: "Wed", y: 3 },
    { label: "Fri", y: 5 },
  ];

  const getColor = (level: ContributionDay["level"]) => {
    switch (level) {
      case 0:
        return darkMode ? "#2d333b" : "#ebedf0"; // No contribution (slightly darker in dark mode)
      case 1:
        return "#0e4429"; // Low
      case 2:
        return "#006d32"; // Medium
      case 3:
        return "#26a641"; // High
      case 4:
        return "#39d353"; // Very High
      default:
        return darkMode ? "#2d333b" : "#ebedf0";
    }
  };

  return (
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700 pb-2">
      <svg
        width={heatmapWidth}
        height={heatmapHeight}
        className="text-xs text-gray-400 dark:text-gray-500"
      >
        {/* Month Labels */}
        {monthLabels.map((label, i) => (
          <text
            key={i}
            x={label.x}
            y={monthLabelHeight - 5}
            fill={darkMode ? "#9ca3af" : "#6b7280"}
          >
            {label.month}
          </text>
        ))}

        {/* Day Labels (Mon, Wed, Fri) */}
        {dayLabels.map((label, i) => (
          <text
            key={i}
            x={weekLabelWidth - 5}
            y={
              monthLabelHeight + label.y * (cellSize + cellGap) + cellSize / 1.5
            }
            textAnchor="end"
            fill={darkMode ? "#9ca3af" : "#6b7280"}
          >
            {label.label}
          </text>
        ))}

        {/* Heatmap Cells */}
        {weeks.map((week, weekIndex) => (
          <g
            key={weekIndex}
            transform={`translate(${
              weekIndex * (cellSize + cellGap) + weekLabelWidth
            }, ${monthLabelHeight})`}
          >
            {week.map((day, dayIndex) =>
              day.count >= 0 ? ( // Only render valid days, not padding
                <rect
                  key={day.date}
                  x={0}
                  y={dayIndex * (cellSize + cellGap)}
                  width={cellSize}
                  height={cellSize}
                  fill={getColor(day.level)}
                  rx="2" // Rounded corners
                  ry="2"
                  onMouseEnter={(e) => onMouseEnterCell(e, day)}
                  onMouseLeave={onMouseLeaveCell}
                  data-date={day.date}
                  data-count={day.count}
                >
                  {/* Tooltip text can be added here if not using external tooltip */}
                  {/* <title>{`${day.count} contributions on ${formatDate(day.date)}`}</title> */}
                </rect>
              ) : null
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

// --- Component: Timeline Item ---
interface TimelineItemProps {
  event: TimelineEvent;
}
const TimelineItem: React.FC<TimelineItemProps> = ({ event }) => {
  const getTimelineIconColor = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "work":
        return "bg-blue-500";
      case "education":
        return "bg-green-500";
      case "achievement":
        return "bg-yellow-500";
      case "project":
        return "bg-red-500";
      case "certification":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex items-start relative pl-12 pb-8 last:pb-0">
      {/* Timeline Dot and Line */}
      <div className="absolute left-0 flex flex-col items-center">
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full ${getTimelineIconColor(
            event.type
          )} ring-4 ring-gray-800 dark:ring-gray-850 z-10`}
        >
          <FontAwesomeIcon icon={event.icon} className="h-4 w-4 text-white" />
        </span>
        {/* Vertical line connecting dots (except for last item maybe) */}
        {/* The main line is created by the parent's ::before pseudo-element */}
      </div>

      {/* Card Content */}
      <div className="bg-gray-850 dark:bg-gray-850 p-4 rounded-lg shadow-sm w-full ml-4">
        <p className="text-xs text-gray-400 mb-1">
          {formatDate(event.date, "medium")}
        </p>
        <h4 className="text-md font-semibold text-white">{event.title}</h4>
        {event.subtitle && (
          <p className="text-sm text-blue-400 mb-1">{event.subtitle}</p>
        )}
        {event.description && (
          <p className="text-xs text-gray-300 mt-1">{event.description}</p>
        )}
      </div>
    </div>
  );
};

// Export the main component
export default HomePage;
