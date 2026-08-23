export const projects = [
  {
    id: 1,
    title: "ParkSense",
    description: "A parking management platform designed to manage vehicles, parking spaces, transactions, and parking fees through a centralized system.",
    fullDescription: "ParkSense is an intelligent parking management system that provides real-time monitoring of parking spaces, automated fee calculation, and comprehensive vehicle tracking. The system helps parking administrators optimize space utilization and improve operational efficiency.",
    category: "Full Stack",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    features: [
      "Real-time parking space monitoring",
      "Automated fee calculation system",
      "Vehicle registration and tracking",
      "Transaction history and reporting",
      "Admin dashboard for management"
    ],
    challenges: "Implementing real-time updates for parking space availability and creating an efficient fee calculation system that handles various pricing schemes.",
    learned: "Gained experience in database design for transaction systems and learned how to implement real-time features using JavaScript.",
    image: "/projects/parksense.svg",
    github: "https://github.com/jeanmarcaguilar/parksense",
    demo: "#"
  },
  {
    id: 2,
    title: "DevFlow",
    description: "A developer-focused platform designed to organize development tasks, projects, productivity information, and developer workflows.",
    fullDescription: "DevFlow is a comprehensive developer intelligence platform that helps developers organize their work, track productivity, and streamline development workflows. It provides tools for task management, project tracking, and performance analytics.",
    category: "Full Stack",
    technologies: ["React", "JavaScript", "Node.js", "MySQL"],
    features: [
      "Task and project management",
      "Productivity tracking and analytics",
      "Developer workflow automation",
      "Team collaboration features",
      "Performance metrics dashboard"
    ],
    challenges: "Creating an intuitive interface for complex project management and implementing real-time collaboration features.",
    learned: "Deepened my understanding of React state management and learned best practices for building scalable full-stack applications.",
    image: "/projects/devflow.svg",
    github: "https://github.com/jeanmarcaguilar/devflow",
    demo: "#"
  },
  {
    id: 3,
    title: "BlockCart",
    description: "An e-commerce application combining traditional database management with blockchain-based transaction verification.",
    fullDescription: "BlockCart is an innovative e-commerce platform that leverages blockchain technology for secure and transparent transaction verification. It combines the reliability of traditional database management with the security and immutability of blockchain technology.",
    category: "Blockchain",
    technologies: ["React", "Solidity", "MySQL", "MetaMask", "Ethereum"],
    features: [
      "Blockchain-based transaction verification",
      "Secure payment processing with MetaMask",
      "Traditional product catalog management",
      "Smart contract integration",
      "Transparent transaction history"
    ],
    challenges: "Integrating blockchain technology with traditional e-commerce functionality and ensuring smooth user experience for crypto payments.",
    learned: "Gained hands-on experience with blockchain development, smart contracts, and Web3 integration.",
    image: "/projects/blockcart.svg",
    github: "https://github.com/jeanmarcaguilar/blockcart",
    demo: "#"
  },
  {
    id: 4,
    title: "TaskMaster",
    description: "A modern task management application with real-time collaboration features and intuitive UI.",
    fullDescription: "TaskMaster is a comprehensive task management solution that helps teams organize work, track progress, and collaborate effectively. Features include drag-and-drop task organization, real-time updates, and team communication tools.",
    category: "Frontend",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    features: [
      "Drag-and-drop task organization",
      "Real-time collaboration",
      "Team communication tools",
      "Progress tracking dashboard",
      "Mobile-responsive design"
    ],
    challenges: "Implementing smooth drag-and-drop functionality and ensuring real-time synchronization across multiple users.",
    learned: "Mastered React state management patterns and learned real-time database integration with Firebase.",
    image: "/projects/taskmaster.svg",
    github: "https://github.com/jeanmarcaguilar/taskmaster",
    demo: "#"
  },
  {
    id: 5,
    title: "CryptoTracker",
    description: "A cryptocurrency portfolio tracker with real-time price updates and analytics.",
    fullDescription: "CryptoTracker provides users with real-time cryptocurrency price tracking, portfolio management, and market analytics. The application integrates with multiple cryptocurrency exchanges to provide accurate and up-to-date information.",
    category: "Frontend",
    technologies: ["React", "Chart.js", "API Integration", "CSS"],
    features: [
      "Real-time price tracking",
      "Portfolio management",
      "Market analytics charts",
      "Price alerts",
      "Historical data visualization"
    ],
    challenges: "Handling real-time data updates efficiently and creating responsive charts that work across devices.",
    learned: "Gained experience with API integration and data visualization libraries for financial applications.",
    image: "/projects/cryptotracker.svg",
    github: "https://github.com/jeanmarcaguilar/cryptotracker",
    demo: "#"
  },
  {
    id: 6,
    title: "ChatConnect",
    description: "A real-time messaging application with group chat and file sharing capabilities.",
    fullDescription: "ChatConnect is a modern messaging platform that enables real-time communication between users. Features include group chats, direct messaging, file sharing, and message encryption for secure communications.",
    category: "Backend",
    technologies: ["Node.js", "Socket.io", "MongoDB", "Express"],
    features: [
      "Real-time messaging",
      "Group chat functionality",
      "File sharing capabilities",
      "Message encryption",
      "User authentication"
    ],
    challenges: "Implementing real-time bidirectional communication and handling file transfers efficiently.",
    learned: "Mastered WebSocket programming with Socket.io and learned secure authentication practices.",
    image: "/projects/chatconnect.svg",
    github: "https://github.com/jeanmarcaguilar/chatconnect",
    demo: "#"
  }
];
