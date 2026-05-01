export interface Author {
  name: string;
  avatar: string;
  bio: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  date: Date;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  likes: number;
  comments: number;
}

const AUTHOR: Author = {
  name: 'Sachintha Daham',
  bio: 'Cloud & DevOps Engineer specializing in Kubernetes, CI/CD, and high-availability systems',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sachintha&backgroundColor=b6e3f4'
};

export const POSTS: Post[] = [
  {
    id: 'legacy-resurrection',
    title: 'The 4-Year Legacy "Resurrection": Stabilizing a Ghost System',
    excerpt: 'Reviving a dead web-backend project that hadn\'t seen a commit or a successful pipeline run in four years, with a strict 24-hour deadline.',
    content: '<p class="lead">Reviving a dead web-backend project that hadn\'t seen a commit or a successful pipeline run in four years, with a strict 24-hour deadline to get it live for users.</p><h2>The Struggle</h2><p>The CI/CD runners were failing instantly because the underlying server environments (Node/Python versions on Ubuntu) had changed over the years. The domain mapping was broken, and the deployment logic was completely obsolete.</p><h2>The Hardcore Fix</h2><p>Conducted a manual, surgical audit of the remote servers via CLI. Extracted the old filesystem structures, rewrote the deployment scripts to match modern server architecture, and manually mapped the environment variables (<code>.env</code>) before fixing the DNS pointers.</p><h2>The Outcome: Reverse Engineering under pressure</h2><p>Stabilized a ghost system and delivered a working, accessible portal within the 24-hour window.</p>',
    author: AUTHOR,
    date: new Date('2024-03-10'),
    readTime: '6 min read',
    category: 'Cloud Architecture',
    tags: ['Reverse Engineering', 'CI/CD', 'Ubuntu', 'Legacy Systems'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    likes: 120,
    comments: 15
  },
  {
    id: 'kubernetes-6-microservice',
    title: 'Orchestrating a 6-Microservice System on AKS',
    excerpt: 'Moving a complex Library Management System from a local environment to a fully orchestrated Azure Kubernetes Service (AKS) cluster.',
    content: '<p class="lead">Moving a complex Library Management System from a local environment to a fully orchestrated Azure Kubernetes Service (AKS) cluster.</p><h2>The Struggle</h2><p>Managing Service Discovery and networking so the six distinct services (frontend, backend APIs, databases) could communicate securely. Furthermore, dealing with <code>CrashLoopBackOff</code> errors when services started before their database dependencies were ready.</p><h2>The Hardcore Fix</h2><p>Self-configured the AKS cluster without relying on default templates. Wrote custom YAML manifests utilizing <code>ClusterIPs</code> for internal networking, <code>Ingress</code> controllers for public access, and <code>readinessProbes</code> to ensure services only received traffic when healthy.</p><h2>The Outcome: Infrastructure as Code mastery</h2><p>Successfully transitioned from running monolithic code to orchestrating a highly scalable, distributed cloud-native application.</p>',
    author: AUTHOR,
    date: new Date('2024-03-15'),
    readTime: '8 min read',
    category: 'Kubernetes',
    tags: ['AKS', 'Microservices', 'Networking', 'YAML'],
    image: '/assets/images/kubernetes_aks_illustration_1777647723349.png',
    likes: 215,
    comments: 32
  },
  {
    id: 'qa-to-devops-jenkins',
    title: 'Bridging QA to DevOps: Solving the 245-Defect Crisis',
    excerpt: 'Finalizing the UAT phase for major projects stalled by a backlog of over 245 manual defects using automated Quality Gates.',
    content: '<p class="lead">Finalizing the User Acceptance Testing (UAT) phase for major projects like "Extra Space" and "MEGT," which were stalled by a backlog of over 245 manual defects.</p><h2>The Struggle</h2><p>The sheer volume of P1 and P2 issues was overwhelming the release cycle. Manual testing was becoming a massive bottleneck, and regression issues kept popping up.</p><h2>The Hardcore Fix</h2><p>Transitioned the workflow by integrating automated <strong>Quality Gates</strong>. Pulled Selenium test scripts into Jenkins pipelines to run headlessly during the build phase. Prioritized the critical blockers (like navigation and UI label corrections) and ensured every new build was automatically verified before hitting the UAT environment.</p><h2>The Outcome: Shift-Left Security and Quality</h2><p>Proved that building automated testing directly into the CI/CD pipeline is infinitely more efficient than managing hundreds of manual tickets.</p>',
    author: AUTHOR,
    date: new Date('2024-03-20'),
    readTime: '7 min read',
    category: 'CI/CD',
    tags: ['Jenkins', 'Selenium', 'Automation', 'QA'],
    image: '/assets/images/jenkins_cicd_illustration_1777647752126.png',
    likes: 184,
    comments: 24
  },
  {
    id: 'docker-disk-collapse',
    title: 'The Docker "Disk Space" Collapse',
    excerpt: 'Engineering automated cleanup protocols to prevent server crashes across multiple active development environments.',
    content: '<p class="lead">Maintaining server health across multiple active development environments that were suddenly crashing.</p><h2>The Struggle</h2><p>The server hit 100% disk utilization due to orphaned Docker volumes and layers of old images from frequent CI/CD deployments. The lack of space meant new images couldn\'t be pulled, bringing the pipelines to a halt.</p><h2>The Hardcore Fix</h2><p>Engineered automated cleanup protocols. Wrote shell scripts utilizing <code>docker system prune</code> targeting dangling images specifically, and scheduled them via <strong>Cron Jobs</strong> to run during off-peak hours, ensuring production databases and active containers remained untouched.</p><h2>The Outcome: Proactive Infrastructure Maintenance</h2><p>Automated the "janitorial" work of DevOps, ensuring high availability and zero deployment blockages due to resource exhaustion.</p>',
    author: AUTHOR,
    date: new Date('2024-04-02'),
    readTime: '5 min read',
    category: 'Linux & Security',
    tags: ['Docker', 'Shell Scripting', 'Cron', 'Maintenance'],
    image: 'https://images.unsplash.com/photo-1607799279861-4dddf8473d71?auto=format&fit=crop&w=1000&q=80',
    likes: 142,
    comments: 18
  },
  {
    id: 'zero-downtime-migration',
    title: 'Zero-Downtime Server Migrations & Linux Security',
    excerpt: 'Migrating a production web backend to a new server without losing configurations or destroying Linux file permissions.',
    content: '<p class="lead">Migrating a production web backend to a new server without losing environment-specific configurations or causing extended downtime.</p><h2>The Struggle</h2><p>Safely extracting sensitive <code>.env</code> secrets from the old server and moving the application files without destroying the Linux file permissions, which would cause the web server (Nginx) to crash.</p><h2>The Hardcore Fix</h2><p>Utilized secure CLI protocols (SSH tunnels/<code>scp</code>) for the transfer. Meticulously applied <code>chown</code> and <code>chmod</code> commands on the new server to ensure the application user owned the files, while locking down the <code>.env</code> secrets to strict <code>600</code> permissions.</p><h2>The Outcome: Fundamental Server Security</h2><p>Demonstrated that reliable migrations require deep knowledge of the Linux kernel, file ownership, and configuration management.</p>',
    author: AUTHOR,
    date: new Date('2024-04-10'),
    readTime: '6 min read',
    category: 'Linux & Security',
    tags: ['Linux', 'Nginx', 'SSH', 'Security'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1000&q=80',
    likes: 195,
    comments: 21
  },
  {
    id: 'dns-cloudflare-orchestration',
    title: 'DNS Orchestration & Cloudflare Traffic Management',
    excerpt: 'Resolving fatal SSL handshakes and "Broken Domain" errors caused by conflicts between self-signed certs and Cloudflare.',
    content: '<p class="lead">Managing the domain routing for a project and ensuring seamless, encrypted traffic through Cloudflare.</p><h2>The Struggle</h2><p>Resolving fatal SSL handshakes and "Broken Domain" errors caused by conflicts between the server\'s self-signed certificates and Cloudflare\'s edge proxy settings.</p><h2>The Hardcore Fix</h2><p>Manually updated A-records and managed CNAME flattening. Toggled and tested between "Full" and "Flexible" SSL modes until end-to-end encryption stabilized without breaking the frontend connection.</p><h2>The Outcome: Network-Layer Troubleshooting</h2><p>Mastered traffic routing and edge-network configurations, isolating and fixing the "invisible" bugs that live in the DNS layer.</p>',
    author: AUTHOR,
    date: new Date('2024-04-18'),
    readTime: '7 min read',
    category: 'Networking',
    tags: ['DNS', 'Cloudflare', 'SSL/TLS', 'Routing'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    likes: 156,
    comments: 14
  },
  {
    id: 'stateful-data-kubernetes',
    title: 'Stateful Data in Kubernetes (The Database Survival)',
    excerpt: 'Ensuring the Library Management System’s database could survive a node failure or pod crash within the AKS cluster using PVs and PVCs.',
    content: '<p class="lead">Ensuring the Library Management System’s database could survive a node failure or pod crash within the AKS cluster.</p><h2>The Struggle</h2><p>Kubernetes Pods are ephemeral (disposable), but database data must be stateful. If a database pod died, the data went with it.</p><h2>The Hardcore Fix</h2><p>Implemented <strong>Persistent Volumes (PV)</strong> and <strong>Persistent Volume Claims (PVC)</strong>. Wrote the YAML to dynamically provision Azure Disks and map them directly into the database container. If a pod died and restarted on a different node, it seamlessly reattached to the exact same disk.</p><h2>The Outcome: Data Persistence in Distributed Systems</h2><p>Conquered the most dangerous part of container orchestration: keeping data safe when the infrastructure shifts.</p>',
    author: AUTHOR,
    date: new Date('2024-04-25'),
    readTime: '9 min read',
    category: 'Kubernetes',
    tags: ['AKS', 'StatefulSets', 'Persistent Volumes', 'Databases'],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80',
    likes: 278,
    comments: 41
  },
  {
    id: 'ai-edge-mobilenet',
    title: 'The AI Edge: CNN MobileNet for Agri-Tech',
    excerpt: 'Developed a lightweight Convolutional Neural Network architecture for running complex machine learning on mobile devices in remote areas.',
    content: '<p class="lead">Bridging complex machine learning with practical, field-ready technology.</p><h2>The Struggle</h2><p>Farmers needed a way to identify N, P, and K (Nutrient) deficiencies in coconut trees, but running heavy AI models isn\'t feasible on standard mobile devices in remote areas.</p><h2>The Hardcore Fix</h2><p>Developed and trained a MobileNet Convolutional Neural Network (CNN) architecture—specifically chosen for its lightweight nature—to analyze leaf imagery and output accurate fertilizer recommendations directly to a smartphone.</p><h2>The Outcome: Applied Engineering</h2><p>Proved the ability to take high-level academic research and optimize it for low-resource, real-world deployment.</p>',
    author: AUTHOR,
    date: new Date('2024-05-01'),
    readTime: '10 min read',
    category: 'AI & Machine Learning',
    tags: ['CNN', 'MobileNet', 'Edge AI', 'Python'],
    image: 'https://images.unsplash.com/photo-1530836369250-ef71a3f55200?auto=format&fit=crop&w=1000&q=80',
    likes: 312,
    comments: 55
  }
];

export const CATEGORIES = ['All', 'Kubernetes', 'CI/CD', 'Cloud Architecture', 'Linux & Security', 'Networking', 'AI & Machine Learning'];
