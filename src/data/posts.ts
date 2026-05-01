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
    excerpt: 'Reviving a dead Python/Django web-backend project that hadn\'t seen a commit in four years, with a strict 24-hour deadline.',
    content: `
      <p class="lead">Reviving a dead web-backend project that hadn\'t been touched in four years, with a strict 24-hour deadline to get it live for end users.</p>
      
      <h2>The Infrastructure Struggle</h2>
      <p>The backend was written in an outdated version of Python/Django, and the previous environment documentation was completely lost. Attempting to boot the system on a modern Ubuntu server resulted in massive dependency failures, broken virtual environments, and a web server that refused to route traffic.</p>
      
      <h2>The Hardcore Fix</h2>
      <p>Conducted a manual, surgical audit of the remote servers via CLI. The process involved:</p>
      <ul>
        <li>Installing specific legacy Python binaries from source to satisfy the Django framework constraints.</li>
        <li>Manually recreating the <code>virtualenv</code> and reverse-engineering the <code>requirements.txt</code> by analyzing the import tracebacks.</li>
        <li>Re-configuring <strong>Gunicorn</strong> as the WSGI server and writing a custom <code>systemd</code> service file to ensure the application remained active as a daemon process.</li>
      </ul>
      <pre><code># Example of the systemd recovery config
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=app_user
Group=www-data
WorkingDirectory=/var/www/legacy_app
ExecStart=/var/www/legacy_app/venv/bin/gunicorn --workers 3 --bind unix:/var/www/legacy_app/app.sock core.wsgi:application</code></pre>
      
      <h2>The Outcome: Reverse Engineering Under Pressure</h2>
      <p>Stabilized a ghost system, established a reliable Nginx reverse proxy, and delivered a fully functional, highly performant portal within the 24-hour window.</p>
    `,
    author: AUTHOR,
    date: new Date('2024-03-10'),
    readTime: '6 min read',
    category: 'Cloud Architecture',
    tags: ['Python', 'Django', 'Nginx', 'Systemd'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    likes: 120,
    comments: 15
  },
  {
    id: 'remote-linux-migration',
    title: 'Remote Linux Server Administration & Migration',
    excerpt: 'Migrating backend web services across remote Ubuntu servers without causing extended downtime or breaking file structures.',
    content: `
      <p class="lead">Migrating critical backend web services across remote Ubuntu servers without causing extended downtime or destroying application file permissions.</p>
      
      <h2>The Technical Task</h2>
      <p>When moving applications between Virtual Machines (VMs), simply copying files isn't enough. The web server (such as Nginx or Apache) requires strict file ownership and execution permissions to serve the application securely. An incorrect permission on a single folder can bring the entire architecture down with a <code>500 Internal Server Error</code>.</p>
      
      <h2>The Execution</h2>
      <p>The migration was executed entirely through the terminal using secure protocols:</p>
      <ul>
        <li>Utilized secure command-line protocols (<code>SSH</code> and <code>rsync</code>) to transfer application data across servers, ensuring zero packet loss and encrypted transit.</li>
        <li>Executed strict Linux kernel commands on the destination VM to reassign file ownership to the application user and the web server group (<code>www-data</code>).</li>
      </ul>
      <pre><code># Re-establishing ownership and strict permissions post-migration
sudo chown -R app_user:www-data /var/www/production_app
sudo find /var/www/production_app -type d -exec chmod 755 {} \\;
sudo find /var/www/production_app -type f -exec chmod 644 {} \\;</code></pre>
      <p>Troubleshot the web server configurations directly via the CLI, ensuring traffic was correctly routed to the application port using updated socket definitions.</p>

      <h2>The Learning Outcome</h2>
      <p>Demonstrated advanced Linux system administration capabilities. Proved that robust infrastructure management relies heavily on understanding core OS mechanics, file systems, and network protocols, rather than just relying on cloud dashboards.</p>
    `,
    author: AUTHOR,
    date: new Date('2024-03-22'),
    readTime: '7 min read',
    category: 'Linux & Security',
    tags: ['Ubuntu', 'SSH', 'Linux Kernel', 'Nginx'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1000&q=80',
    likes: 185,
    comments: 24
  },
  {
    id: 'cloud-secret-management',
    title: 'Cloud Environment & Secret Management (.env)',
    excerpt: 'Managing sensitive configurations across Azure environments while ensuring secrets are never exposed to unauthorized users.',
    content: `
      <p class="lead">Managing sensitive configurations across multiple Azure environments while ensuring secrets are never exposed in version control or to unauthorized system users.</p>

      <h2>The Technical Task</h2>
      <p>Migrating a production application requires perfectly syncing the environment variables (<code>.env</code> files)—which contain database credentials, API keys, and cryptographic hashes—between the old and new VMs. A single missing variable causes fatal application crashes, while a compromised file leads to massive security breaches.</p>

      <h2>The Execution</h2>
      <p>The security protocols for handling this data were meticulously executed:</p>
      <ul>
        <li>Accessed the remote servers securely via SSH to extract existing <code>.env</code> configurations that were explicitly excluded from the Git repository (via <code>.gitignore</code>).</li>
        <li>Manually mapped, audited, and updated the variables to align with the new Azure cloud environment's architecture (e.g., updating database host IPs and caching endpoints).</li>
        <li>Locked down the <code>.env</code> files on the new Linux VM using strict permission modes, ensuring the secrets were only readable by the application owner.</li>
      </ul>
      <pre><code># Securing the environment secrets
sudo chown app_user:app_user /var/www/production_app/.env
sudo chmod 600 /var/www/production_app/.env</code></pre>
      <p>This <code>chmod 600</code> command guarantees that no other user on the system—even if they gain SSH access—can read or write to the configuration file.</p>

      <h2>The Learning Outcome</h2>
      <p>Highlighted a deep understanding of infrastructure security and Configuration Management. Showcased the ability to handle high-stakes data securely during live migrations without relying on external secret management SaaS products.</p>
    `,
    author: AUTHOR,
    date: new Date('2024-04-05'),
    readTime: '6 min read',
    category: 'Linux & Security',
    tags: ['Security', 'Configuration', 'Bash', 'Azure'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    likes: 210,
    comments: 31
  },
  {
    id: 'azure-infrastructure-provisioning',
    title: 'Cloud Infrastructure Provisioning (Azure VMs)',
    excerpt: 'Setting up the foundational compute resources and firewalls in Azure to host backend services securely.',
    content: `
      <p class="lead">Setting up the foundational compute resources in Azure to host enterprise backend services and ensure high availability and security.</p>

      <h2>The Technical Task</h2>
      <p>Moving beyond simple local hosting requires managing enterprise-grade cloud compute resources. This involves selecting the right virtual hardware, configuring Network Security Groups (NSGs), managing public IP routing, and ensuring the compute sizing fits the application load.</p>

      <h2>The Execution</h2>
      <p>The deployment of the cloud infrastructure involved several critical steps:</p>
      <ul>
        <li>Provisioned Azure Virtual Machines, deliberately selecting Ubuntu LTS (Long Term Support) images to guarantee OS-level stability and security patch availability.</li>
        <li>Configured strict Network Security Group (NSG) rules. This acted as the primary cloud firewall.</li>
        <li>Opened only essential inbound ports: <code>80</code> (HTTP) and <code>443</code> (HTTPS) for web traffic, and <code>22</code> (SSH) for administration—while restricting SSH access specifically to authorized IP blocks.</li>
      </ul>
      <p>Furthermore, actively monitored VM resource utilization (CPU, RAM, and Disk I/O) to ensure the compute power matched the application's load requirements without overspending the cloud budget.</p>

      <h2>The Learning Outcome</h2>
      <p>Validated hands-on expertise with a major cloud provider (Azure). Showed the ability to architect secure, cost-effective, and reliable infrastructure from the ground up, prioritizing security at the network perimeter.</p>
    `,
    author: AUTHOR,
    date: new Date('2024-04-12'),
    readTime: '8 min read',
    category: 'Cloud Architecture',
    tags: ['Azure', 'Networking', 'Firewalls', 'VMs'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    likes: 175,
    comments: 22
  },
  {
    id: 'dns-cloudflare-orchestration',
    title: 'DNS Orchestration & Cloudflare Traffic Management',
    excerpt: 'Resolving fatal SSL handshakes and "Broken Domain" errors caused by conflicts between self-signed certs and Cloudflare.',
    content: `
      <p class="lead">Managing the domain routing for a production application and ensuring seamless, encrypted traffic through Cloudflare's Edge Network.</p>
      
      <h2>The Struggle</h2>
      <p>During the domain migration, the application suffered from fatal SSL handshakes and "Too Many Redirects" errors. This was caused by conflicts between the server\'s local Nginx SSL configurations and Cloudflare\'s edge proxy settings.</p>
      
      <h2>The Hardcore Fix</h2>
      <p>Isolated the issue to the OSI Network Layer. Manually updated the A-records and managed CNAME flattening to point directly to the new Azure VM instances.</p>
      <p>To resolve the SSL loop, I toggled the Cloudflare SSL/TLS encryption mode from "Flexible" to "Full (Strict)". I then generated a Cloudflare Origin Certificate and installed it directly onto the Ubuntu server, binding it to the Nginx configuration:</p>
      <pre><code>server {
    listen 443 ssl;
    server_name production-domain.com;
    
    ssl_certificate /etc/ssl/certs/cloudflare_origin.pem;
    ssl_certificate_key /etc/ssl/private/cloudflare_origin.key;
    
    location / {
        proxy_pass http://unix:/var/www/app/app.sock;
    }
}</code></pre>

      <h2>The Outcome: Network-Layer Troubleshooting</h2>
      <p>Mastered traffic routing and edge-network configurations, isolating and fixing the "invisible" bugs that live in the DNS layer to provide 100% encrypted, fast traffic to end-users.</p>
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
    id: 'ai-edge-mobilenet',
    title: 'The AI Edge: CNN MobileNet for Agri-Tech',
    excerpt: 'Developed a lightweight Convolutional Neural Network architecture in TensorFlow/Keras for running machine learning on edge devices.',
    content: `
      <p class="lead">Bridging complex machine learning with practical, field-ready edge technology for the agricultural sector.</p>
      
      <h2>The Struggle</h2>
      <p>Farmers needed a rapid way to identify N, P, and K (Nutrient) deficiencies in coconut trees. However, running heavy, traditional AI models isn't feasible on standard mobile devices in remote areas with poor internet connectivity.</p>
      
      <h2>The Hardcore Fix</h2>
      <p>Developed and trained a <strong>MobileNet Convolutional Neural Network (CNN)</strong> architecture using <strong>TensorFlow and Keras</strong>. MobileNet was specifically chosen for its use of depthwise separable convolutions, which drastically reduces the number of parameters and computation required compared to standard networks.</p>
      <pre><code># Model compilation snippet
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D

base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model.trainable = False # Freeze base layers

model = Sequential([
    base_model,
    GlobalAveragePooling2D(),
    Dense(128, activation='relu'),
    Dense(3, activation='softmax') # 3 classes: N, P, K deficiencies
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])</code></pre>
      <p>The model was trained on a custom dataset of leaf imagery, optimized for inference speed, and exported as a TensorFlow Lite (<code>.tflite</code>) model to run entirely on-device, outputting accurate fertilizer recommendations without requiring cloud computation.</p>

      <h2>The Outcome: Applied Engineering</h2>
      <p>Proved the ability to take high-level mathematical and data science concepts in Python, optimize them through TensorFlow, and package them for low-resource, real-world edge deployment.</p>
    `,
    author: AUTHOR,
    date: new Date('2024-05-01'),
    readTime: '10 min read',
    category: 'AI & Machine Learning',
    tags: ['TensorFlow', 'Keras', 'Edge AI', 'Python'],
    image: 'https://images.unsplash.com/photo-1530836369250-ef71a3f55200?auto=format&fit=crop&w=1000&q=80',
    likes: 312,
    comments: 55
  }
];

export const CATEGORIES = ['All', 'Cloud Architecture', 'Linux & Security', 'Networking', 'AI & Machine Learning'];
