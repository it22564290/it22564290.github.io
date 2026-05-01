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
    id: 'linux-server-migration',
    title: 'Linux Server Migrations & Administration (Ubuntu)',
    excerpt: 'Moving backend services across remote VMs without causing extended downtime or breaking file structures.',
    content: `
      <p class="lead">Migrating critical backend services across remote Ubuntu Virtual Machines without causing extended downtime.</p>
      
      <h2>The Technical Task</h2>
      <p>When moving applications between Virtual Machines (VMs), simply transferring files isn't enough. Web servers (such as Nginx or Apache) require strict file ownership and execution permissions. If these don't match exactly on the new machine, the server crashes with permission denied errors.</p>
      
      <h2>The Execution</h2>
      <p>The migration was executed entirely through the terminal using secure protocols:</p>
      <ul>
        <li>Utilized secure command-line protocols (<code>scp</code> and <code>rsync</code> over SSH) to migrate data, ensuring encrypted transit.</li>
        <li>Applied strict Linux kernel commands (<code>chown</code> and <code>chmod</code>) on the destination VM to reassign file ownership to the application user and ensure traffic routed correctly.</li>
      </ul>
      <pre><code># Re-establishing ownership and permissions post-migration
sudo chown -R app_user:www-data /var/www/app
sudo chmod -R 755 /var/www/app</code></pre>

      <h2>The Learning Outcome</h2>
      <p>Demonstrated advanced Linux system administration capabilities. Proved that robust infrastructure management relies heavily on understanding core OS mechanics, file systems, and network protocols.</p>
    `,
    author: AUTHOR,
    date: new Date('2024-03-22'),
    readTime: '7 min read',
    category: 'Linux & Security',
    tags: ['Ubuntu', 'Migration', 'SSH', 'Linux Kernel'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1000&q=80',
    likes: 185,
    comments: 24
  },
  {
    id: 'azure-infrastructure-provisioning',
    title: 'Cloud Infrastructure Provisioning (Azure VMs)',
    excerpt: 'Architecting the foundational compute resources in Azure for high availability and security.',
    content: `
      <p class="lead">Architecting the foundational compute resources in Azure to host enterprise backend services and ensure high availability.</p>

      <h2>The Technical Task</h2>
      <p>Moving from local setups to enterprise cloud means managing complex network security and preventing resource bloat. It requires selecting the right virtual hardware, configuring Network Security Groups (NSGs), and ensuring the compute sizing fits the application load.</p>

      <h2>The Execution</h2>
      <p>The deployment of the cloud infrastructure involved several critical steps:</p>
      <ul>
        <li>Provisioned Ubuntu LTS Azure VMs to guarantee OS-level stability.</li>
        <li>Configured strict Network Security Groups (NSGs) to open essential ports (<code>80</code>, <code>443</code>, <code>22</code>) while blocking all unauthorized traffic at the cloud firewall level.</li>
        <li>Monitored CPU and RAM utilization to optimize the cloud budget based on actual application load.</li>
      </ul>

      <h2>The Learning Outcome</h2>
      <p>Validated hands-on expertise with a major cloud provider (Azure). Showed the ability to architect secure, cost-effective, and reliable infrastructure from the ground up.</p>
    `,
    author: AUTHOR,
    date: new Date('2024-04-12'),
    readTime: '8 min read',
    category: 'Cloud Architecture',
    tags: ['Azure', 'VMs', 'Networking', 'Firewalls'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    likes: 175,
    comments: 22
  },
  {
    id: 'cloud-secret-management',
    title: 'Security & Secret Management (.env)',
    excerpt: 'Managing sensitive application configurations across VMs securely without exposing them in version control.',
    content: `
      <p class="lead">Managing sensitive application configurations across multiple Virtual Machines securely.</p>

      <h2>The Technical Task</h2>
      <p>Migrating an app requires perfectly syncing <code>.env</code> files—which contain database credentials and API keys—without exposing them in version control or leaving them readable by unauthorized system users.</p>

      <h2>The Execution</h2>
      <p>The security protocols for handling this data were meticulously executed:</p>
      <ul>
        <li>Extracted and manually mapped variables to the new Azure architecture via secure SSH access.</li>
        <li>Locked down the <code>.env</code> files on the new Linux VM using <code>chmod 600</code>, ensuring strict owner-only read/write access.</li>
      </ul>
      <pre><code># Securing the environment secrets
sudo chown app_user:app_user /var/www/app/.env
sudo chmod 600 /var/www/app/.env</code></pre>

      <h2>The Learning Outcome</h2>
      <p>Highlighted a deep understanding of infrastructure security and Configuration Management. Showcased the ability to handle high-stakes data securely during live migrations.</p>
    `,
    author: AUTHOR,
    date: new Date('2024-04-05'),
    readTime: '6 min read',
    category: 'Linux & Security',
    tags: ['Security', '.env', 'Configuration', 'Bash'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    likes: 210,
    comments: 31
  },
  {
    id: 'dns-cloudflare-orchestration',
    title: 'DNS Routing & Edge Networking (Cloudflare)',
    excerpt: 'Managing domain routing and resolving fatal SSL encryption errors for live traffic.',
    content: `
      <p class="lead">Managing the domain routing and SSL encryption for live production traffic through Cloudflare.</p>
      
      <h2>The Struggle</h2>
      <p>During deployment, the application suffered from fatal SSL handshakes and "Broken Domain" errors. This was caused by conflicts between self-signed server certificates and Cloudflare's edge proxy settings.</p>
      
      <h2>The Hardcore Fix</h2>
      <p>Isolated the issue to the Network Layer:</p>
      <ul>
        <li>Manually updated A-records and managed CNAME flattening to point directly to the new Azure VM instances.</li>
        <li>Toggled and tested between "Full" and "Flexible" SSL modes until end-to-end encryption stabilized without breaking the frontend connection.</li>
      </ul>

      <h2>The Outcome</h2>
      <p>Mastered traffic routing and edge-network configurations, isolating and fixing the bugs that live in the DNS layer to provide 100% encrypted traffic to end-users.</p>
    `,
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
    id: 'whats-up-docker-wud',
    title: 'What’s up Docker (WUD): Container Automation',
    excerpt: 'Bridging the gap between blind container updates and maintaining visibility across a fleet of applications using WUD.',
    content: `
      <p class="lead">Setting up <strong>What’s up Docker (WUD)</strong> is a game-changer for anyone managing a home lab or a fleet of containers.</p>

      <h2>Why We Chose "What’s up Docker" (WUD)</h2>
      <p>In the world of Docker automation, <strong>Watchtower</strong> is the famous veteran. However, we went with <strong>WUD</strong> for a few specific reasons:</p>
      <ul>
        <li><strong>Visibility vs. Blind Automation:</strong> Watchtower often updates things in the background. WUD provides a beautiful <strong>Web UI</strong> where you can see exactly what needs an update before pulling the trigger.</li>
        <li><strong>Granular Control:</strong> You can set regex filters to only watch for "minor" or "patch" updates, avoiding major version breaks.</li>
        <li><strong>Notification Richness:</strong> It supports everything from Discord to Gotify, sending a clean message when a new image is pushed.</li>
      </ul>

      <h2>The Setup: How We Did It</h2>
      <p>We deployed WUD using <code>docker-compose</code>:</p>
      <pre><code class="language-yaml">services:
  wud:
    image: fmartinou/whats-up-docker
    container_name: wud
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock # Allows WUD to see your containers
      - ./store:/store # Persists WUD data
    ports:
      - "3000:3000"
    environment:
      - WUD_WATCHER_LOCAL_CRON=0 0 * * * # Checks daily at midnight
      - WUD_LOG_LEVEL=info
      - WUD_TRIGGER_DISCORD_MYNOTIF_URL=https://discord.com/api/webhooks/... 
    restart: always</code></pre>

      <h2>Issues We Faced (and Solved)</h2>
      <h3>1. The "Docker Socket" Security Risk</h3>
      <p><strong>Issue:</strong> Mapping <code>/var/run/docker.sock</code> gives WUD root-level access.<br/>
      <strong>Lesson:</strong> We put WUD behind a VPN (Tailscale) or an auth-proxy (Authentik) so the dashboard isn't exposed to the public internet.</p>

      <h3>2. Rate Limiting on Docker Hub</h3>
      <p><strong>Issue:</strong> Checking 50+ containers too often causes Docker Hub to rate-limit the IP.<br/>
      <strong>Lesson:</strong> Configured a <strong>Registry</strong> environment variable to use our Docker Hub credentials, increasing pull limits.</p>

      <h3>3. The "Latest" Tag Nightmare</h3>
      <p><strong>Issue:</strong> Containers using the <code>:latest</code> tag gave no easy way to roll back when digests changed.<br/>
      <strong>Lesson:</strong> Learned to use <strong>semantic versioning</strong> tags (e.g., <code>:1.2.3</code>). WUD watches for <code>:1.2.4</code> and notifies us, making updates much safer.</p>

      <h2>What We Learned</h2>
      <p>Automation is a spectrum. You don't have to automate the <em>update</em> itself; automating the <strong>notification</strong> is often enough to keep a system stable. Furthermore, pruning is essential: we set a trigger in WUD to perform an <code>image prune</code> to save disk space after pulls.</p>
    `,
    author: AUTHOR,
    date: new Date('2024-05-10'),
    readTime: '9 min read',
    category: 'Docker & Automation',
    tags: ['Docker', 'Automation', 'WUD', 'Containers'],
    image: 'https://images.unsplash.com/photo-1607799279861-4dddf8473d71?auto=format&fit=crop&w=1000&q=80',
    likes: 342,
    comments: 48
  }
];

export const CATEGORIES = ['All', 'Linux & Security', 'Cloud Architecture', 'Networking', 'Docker & Automation'];
