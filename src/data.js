
export const listTools = [
  // Languages (ID 1-6)
  { id: 1, gambar: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg", nama: "Java", ket: "Enterprise & Android Dev", dad: "100" },
  { id: 2, gambar: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg", nama: "C++", ket: "Performance Systems", dad: "200" },
  { id: 3, gambar: "https://cdn.simpleicons.org/php/777BB4", nama: "PHP", ket: "Server-side Scripting", dad: "300" },
  { id: 4, gambar: "https://cdn.simpleicons.org/javascript/F7DF1E", nama: "JavaScript", ket: "Web Logic", dad: "400" },
  { id: 5, gambar: "https://cdn.simpleicons.org/typescript/3178C6", nama: "TypeScript", ket: "Type-safe JS", dad: "500" },
  { id: 6, gambar: "https://cdn.simpleicons.org/python/3776AB", nama: "Python", ket: "AI & Scripting", dad: "600" },

  // AI & Data Science (ID 7-14 + 34, 35)
  { id: 7, gambar: "https://cdn.simpleicons.org/scikitlearn/F7931E", nama: "Scikit-learn", ket: "Machine Learning Library", dad: "700" },
  { id: 8, gambar: "https://cdn.simpleicons.org/pandas/150458", nama: "Pandas", ket: "Data Analysis", dad: "800" },
  { id: 9, gambar: "https://cdn.simpleicons.org/numpy/013243", nama: "NumPy", ket: "Numerical Computing", dad: "900" },
  { id: 10, gambar: "https://cdn.simpleicons.org/tensorflow/FF6F00", nama: "TensorFlow", ket: "Deep Learning Framework", dad: "1000" },
  { id: 11, gambar: "https://cdn.simpleicons.org/keras/D00000", nama: "Keras", ket: "High-level Neural Networks", dad: "1100" },
  { id: 12, gambar: "https://cdn.simpleicons.org/jupyter/F37626", nama: "Jupyter", ket: "Interactive Notebooks", dad: "1200" },
  { id: 13, gambar: "https://cdn.simpleicons.org/pytorch/EE4C2C", nama: "PyTorch", ket: "Dynamic AI Research", dad: "1300" },
  { id: 14, gambar: "https://cdn.simpleicons.org/opencv/5C3EE8", nama: "OpenCV", ket: "Computer Vision", dad: "1400" },
  { id: 34, gambar: "https://cdn.simpleicons.org/huggingface/FFD21E", nama: "Hugging Face", ket: "AI Model Hosting", dad: "1410" },
  { id: 35, gambar: "https://cdn.simpleicons.org/streamlit/FF4B4B", nama: "Streamlit", ket: "ML App Framework", dad: "1420" },

  // Frontend (ID 15-21)
  { id: 15, gambar: "https://cdn.simpleicons.org/nextdotjs/white", nama: "Next.js", ket: "React Framework", dad: "1500" },
  { id: 16, gambar: "https://cdn.simpleicons.org/vite/646CFF", nama: "Vite", ket: "Modern Build Tool", dad: "1600" },
  { id: 17, gambar: "https://cdn.simpleicons.org/react/61DAFB", nama: "React", ket: "UI Library", dad: "1700" },
  { id: 18, gambar: "https://cdn.simpleicons.org/tailwindcss/06B6D4", nama: "Tailwind", ket: "Utility-first CSS", dad: "1800" },
  { id: 19, gambar: "https://cdn.simpleicons.org/framer/black", nama: "Framer Motion", ket: "Web Animations", dad: "1900" },
  { id: 20, gambar: "https://cdn.simpleicons.org/html5/E34F26", nama: "HTML5", ket: "Web Structure", dad: "2000" },
  { id: 21, gambar: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg", nama: "CSS3", ket: "Web Styling", dad: "2100" },

  // Backend & DB (ID 22-26)
  { id: 22, gambar: "https://cdn.simpleicons.org/mysql/4479A1", nama: "MySQL", ket: "Relational Database", dad: "2200" },
  { id: 23, gambar: "https://cdn.simpleicons.org/supabase/3FCF8E", nama: "Supabase", ket: "Backend as a Service", dad: "2300" },
  { id: 24, gambar: "https://cdn.simpleicons.org/mongodb/47A248", nama: "MongoDB", ket: "NoSQL Database", dad: "2400" },
  { id: 25, gambar: "https://cdn.simpleicons.org/socketdotio/white", nama: "Socket.io", ket: "Real-time Engine", dad: "2500" },
  { id: 26, gambar: "https://cdn.simpleicons.org/firebase/FFCA28", nama: "Firebase", ket: "Cloud Services", dad: "2600" },

  // Tools & DevOps (ID 27-33 + 36, 37)
  { id: 27, gambar: "https://cdn.simpleicons.org/git/F05032", nama: "Git", ket: "Version Control", dad: "2700" },
  { id: 28, gambar: "https://cdn.simpleicons.org/github/white", nama: "GitHub", ket: "Code Hosting", dad: "2800" },
  { id: 29, gambar: "https://cdn.simpleicons.org/vercel/white", nama: "Vercel", ket: "Deployment Platform", dad: "2900" },
  { id: 30, gambar: "https://cdn.simpleicons.org/postman/FF6C37", nama: "Postman", ket: "API Testing", dad: "3000" },
  { id: 31, gambar: "https://cdn.simpleicons.org/googlecloud/4285F4", nama: "GCP", ket: "Cloud Infrastructure", dad: "3100" },
  { id: 32, gambar: "https://cdn.simpleicons.org/ubuntu/E94321", nama: "Ubuntu", ket: "Linux OS", dad: "3200" },
  { id: 33, gambar: "https://cdn.simpleicons.org/docker/2496ED", nama: "Docker", ket: "Containerization", dad: "3300" },
  { id: 36, gambar: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", nama: "AWS", ket: "Cloud Platform", dad: "3600" },
  { id: 37, gambar: "https://upload.wikimedia.org/wikipedia/commons/b/b9/AWS_Simple_Icons_Compute_Amazon_EC2_Instances.svg", nama: "AWS EC2", ket: "Scalable Compute Service", dad: "3700" },
];

export const listProyek = [
  {
    id: 1,
    image: "/assets/projects/tsunami.jpg", 
    video: "https://vjs.zencdn.net/v/oceans.mp4", // Placeholder video
    title: "Tsunami Risk Prediction",
    subtitle: "ML-based tsunami prediction model using BMKG data",
    fullDescription: "Developing a machine learning-based tsunami prediction model using BMKG data (2008-2024). Using Python, Scikit-learn, Pandas, and XGBoost with results of AUC 0.96 and Accuracy 0.85.",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://your-tsunami-demo.vercel.app", 
    githubUrl: "https://github.com/haniifwardana/tsunami-risk-prediction",
    dad: "100",
  },
  {
    id: 2,
    image: "/assets/projects/hishiro.jpg", 
    video: "", 
    title: "Hishiro Ticketing System",
    subtitle: "Full-stack ticketing system with AI chatbot (Copyrighted)",
    fullDescription: "A full-stack ticketing system using React, Node.js, MongoDB, Firebase, and Docker. Features include admin dashboard, real-time chat, and an AI chatbot for FAQs. This system is officially copyrighted.",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://hishiro-ticketing.onrender.com",
    githubUrl: "https://github.com/haniifwardana/hishiro-ticketing",
    dad: "200",
  },
  {
    id: 3,
    image: "/assets/projects/deepfake.jpg", 
    video: "https://vjs.zencdn.net/v/oceans.mp4", 
    title: "Multimodal Deepfake Detection",
    subtitle: "AI project with Adaptive Fusion and Xception-based neural networks",
    fullDescription: "A multimodal deepfake detection system using audio and visual inputs. Built with Xception-based neural networks and adaptive fusion to dynamically weight predictions. Achieved 99%+ accuracy on FakeAVCeleb dataset.",
    borderColor: "#A855F7",
    gradient: "linear-gradient(145deg, #A855F7, #000)",
    url: "https://deepfake-detector-ai.streamlit.app",
    githubUrl: "https://github.com/haniifwardana/deepfake-detection",
    dad: "300",
  },
  {
    id: 4,
    image: "/assets/projects/attendance.jpg", 
    video: "", 
    title: "Automated Attendance System",
    subtitle: "Facial recognition system using OpenCV and Firebase",
    fullDescription: "Using OpenCV and face_recognition to detect and record attendance automatically. Connected to Firebase for real-time data synchronization and a simple user interface.",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(180deg, #F59E0B, #000)",
    url: "https://face-attendance-system.web.app",
    githubUrl: "https://github.com/haniifwardana/face-attendance",
    dad: "400",
  },
  {
    id: 5,
    image: "/assets/projects/finance.jpg", 
    video: "https://vjs.zencdn.net/v/oceans.mp4", 
    title: "Finance Tracker AI",
    subtitle: "Full-stack personal finance tracker with Next.js 14, Supabase, and Telegram integration",
    fullDescription: "A modern personal finance application that enables users to track income and expenses via web or Telegram. Features include AI-powered receipt parsing, real-time analytics with Recharts, savings management (Savings Pots), and a PWA-ready responsive layout. Integrated with Gemini/Groq for intelligent financial assistance.",
    borderColor: "#10B981",
    gradient: "linear-gradient(145deg, #059669, #000)",
    url: "https://finance-tracker-gamma-livid.vercel.app/",
    githubUrl: "https://github.com/haniifwardana/finance-tracker-ai",
    dad: "500",
  },
];

export const listAchievements = [
  {
    type: "publication",
    id: 1,
    title: "Tsunami Risk Prediction using Machine Learning",
    journal: "IEEE Xplore",
    date: "2024",
    description: "Research on predicting tsunami risks using historical BMKG data with XGBoost and Random Forest. Achieving AUC 0.96.",
    url: "https://ieeexplore.ieee.org/abstract/document/11389449", 
    dad: "1000",
  },
  {
    type: "certificate",
    id: 2,
    title: "AWS Academy - Generative AI Foundations",
    issuer: "AWS Academy",
    date: "Sep 23, 2025",
    image: "/assets/achievements/AWSAcademy.jpg", 
    url: "https://www.credly.com/badges/5fc34e1a-c7ad-4adb-aee9-4244402f7526",
    dad: "1100",
  },
  {
    type: "certificate",
    id: 3,
    title: "Google Colab Python",
    issuer: "Great Learning Academy",
    date: "Dec 2023",
    image: "/assets/achievements/collab.jpg", 
    url: "https://verify.mygreatlearning.com/GOUWYUUU",
    dad: "1200",
  },
  {
    type: "certificate",
    id: 4,
    title: "Java (Basic) Skill Assessment",
    issuer: "HackerRank",
    date: "May 13, 2024",
    image: "/assets/achievements/java.png", 
    url: "https://www.hackerrank.com/certificates/c12c3d084454",
    dad: "1300",
  }
];

export const listJourney = [
  {
    id: 1,
    title: "High School Diploma",
    location: "International Islamic High School (IIHS)",
    logo: "/assets/LOGO/IIHS.png", 
    date: "Jul 2021 - Jul 2023",
    description: "Completed an accelerated 2-year High School program in Learning Sciences.",
    icon: "education",
    category: "Education"
  },
  {
    id: 2,
    title: "Summer School Program",
    location: "Braemar College, Toronto",
    logo: "/assets/LOGO/braemar.png", 
    date: "Jul 2022 - Aug 2022",
    description: "Participated in an intensive communication and English language program in Toronto, Canada.",
    icon: "education",
    category: "Education"
  },
  {
    id: 3,
    title: "Computer Science Student",
    location: "BINUS International University",
    logo: "/assets/LOGO/binus.png", 
    date: "2023 - 2027",
    description: "Pursuing a degree in Computer Science. Gaining expertise in Full-Stack Development, Data Science, AI, Cybersecurity. ETC.",
    icon: "education",
    category: "Education"
  },
  {
    id: 4,
    title: "Web Developer Internship",
    location: "Komdigi (Ministry of Comm. & Digital)",
    logo: "/assets/LOGO/komdigi.png", 
    date: "Feb 2026 - Present",
    description: "Contributing as a Web Developer intern at the Ministry of Communication and Digital Affairs, focusing on public sector digital solutions.",
    icon: "work",
    category: "Experience"
  }
];
