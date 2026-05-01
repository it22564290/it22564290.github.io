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
  name: "Sachintha Daham",
  bio: "Cloud and DevOps engineer focused on Linux, containers, CI/CD and observability. I write about the unglamorous parts of shipping software reliably.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sachintha&backgroundColor=b6e3f4"
};

export const POSTS: Post[] = [
  {
    id: "linux-server-migration",
    title: "Migrating a Production Workload Between Ubuntu Servers Without Downtime",
    excerpt: "How to move a live web application between two Ubuntu VMs using rsync, SSH, and a careful DNS cutover - without breaking permissions or losing data.",
    content: `
      <p class="lead">Moving a running application between machines is rarely just a file copy. Permissions, file ownership, daemons, and DNS all have to line up before traffic is switched over.</p>

      <h2>The problem</h2>
      <p>The application was a Node.js API behind Nginx on an aging Ubuntu 20.04 host. We needed to relocate it to a fresh Ubuntu 22.04 VM with more memory, ideally with under one minute of perceived downtime.</p>

      <h2>Plan</h2>
      <ul>
        <li>Provision the new VM, install runtime dependencies, and harden it before any data moves.</li>
        <li>Snapshot the source tree with <code>rsync</code> over SSH for a fast, resumable transfer.</li>
        <li>Re-apply ownership and permissions explicitly - never trust them to come across cleanly.</li>
        <li>Pre-warm the new host with a copy of <code>/etc/nginx</code> and the systemd unit, then flip DNS once health checks pass.</li>
      </ul>

      <h2>The actual move</h2>
      <pre><code># 1. Initial bulk sync from old to new (run from the new host)
rsync -aAXHv --numeric-ids \
  --exclude={"/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"} \
  -e "ssh -i ~/.ssh/migrate.key" \
  deploy@old-host:/var/www/app/ /var/www/app/

# 2. Re-establish ownership on the new host
sudo chown -R app:www-data /var/www/app
sudo find /var/www/app -type d -exec chmod 755 {} \;
sudo find /var/www/app -type f -exec chmod 644 {} \;

# 3. Final delta sync just before the cutover
rsync -aAXH --delete -e "ssh -i ~/.ssh/migrate.key" \
  deploy@old-host:/var/www/app/ /var/www/app/</code></pre>

      <h2>Lessons</h2>
      <p>The boring lesson: every migration ends with a permissions bug. <code>chown -R</code> and an explicit <code>find ... -type f -exec chmod</code> pair removes an entire class of "it works on the old box" failures. The interesting lesson: pre-stage <em>everything</em> on the new host - config, secrets, TLS material - so the cutover itself is nothing more than a DNS change and a service start.</p>
    `,
    author: AUTHOR,
    date: new Date("2025-08-14"),
    readTime: "7 min read",
    category: "Linux & Security",
    tags: ["Ubuntu", "rsync", "SSH", "Migration"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    likes: 185,
    comments: 24
  },
  {
    id: "azure-infrastructure-provisioning",
    title: "Standing Up a Production-Ready Azure VM From Zero",
    excerpt: "A repeatable checklist for provisioning Linux VMs on Azure: sizing, NSG rules, managed identity, and the small details that bite you in week two.",
    content: `
      <p class="lead">Spinning up a VM in Azure is one click. Spinning up a VM you can actually trust in production is another story.</p>

      <h2>Choosing the size</h2>
      <p>For most stateless web workloads I start with the <code>B2s</code> burstable family in dev and move to <code>D2s_v5</code> or <code>D4s_v5</code> in production. Burstable instances look cheap until your CPU credits run out under sustained load - watch the credits metric for a week before committing.</p>

      <h2>Network security groups</h2>
      <p>The default NSG that Azure attaches when you create a VM through the portal opens SSH (22) to the entire internet. That is not a configuration, that is a default. Replace it before the VM is reachable:</p>
      <ul>
        <li>Inbound 22 - restrict to your bastion subnet or your office IP range.</li>
        <li>Inbound 80 and 443 - open to the internet, but terminate TLS at the load balancer or at Cloudflare, not on the VM.</li>
        <li>Everything else - deny.</li>
      </ul>

      <h2>Identity beats secrets</h2>
      <p>Use a system-assigned managed identity and grant it the minimum role on the resources it needs to talk to (Key Vault, Storage, etc.). The VM never sees a connection string - it asks the metadata endpoint for a short-lived token instead.</p>
      <pre><code># From inside the VM - get a token for Key Vault, no secrets on disk
curl -H "Metadata: true" \
  "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://vault.azure.net"</code></pre>

      <h2>What I always forget</h2>
      <p>Set <code>unattended-upgrades</code> for security patches, install the Azure Monitor Agent before the VM has traffic, and tag the resource with <code>owner</code> and <code>cost-center</code> at creation - not three months later when finance asks who is paying for it.</p>
    `,
    author: AUTHOR,
    date: new Date("2025-09-02"),
    readTime: "8 min read",
    category: "Cloud Architecture",
    tags: ["Azure", "VMs", "Networking", "Managed Identity"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    likes: 175,
    comments: 22
  },
  {
    id: "cloud-secret-management",
    title: "Stop Putting Secrets in .env Files (And What To Do Instead)",
    excerpt: "A pragmatic walkthrough of moving from committed .env files to a real secrets workflow using Azure Key Vault, environment injection, and least-privileged access.",
    content: `
      <p class="lead">Every team starts with a .env file. The day you have more than one server, more than one engineer, or more than one environment, that file becomes a liability.</p>

      <h2>The three failure modes</h2>
      <ul>
        <li><strong>Committed by accident.</strong> Even a single push to a public repo means the secret is rotated, period. GitHub secret scanning will find it before you do.</li>
        <li><strong>Drift between environments.</strong> Staging has 14 vars, production has 17, and nobody knows which three are different.</li>
        <li><strong>No audit trail.</strong> When an incident happens, you cannot answer "who read this secret last week?"</li>
      </ul>

      <h2>The workflow that actually scales</h2>
      <p>Store the secret once in Azure Key Vault (or AWS Secrets Manager, or HashiCorp Vault - the principles are the same). At deploy time, fetch it using the workload's identity and inject it as a process environment variable. The .env file on the host - if it exists at all - is generated, owned by the app user, and chmod 600.</p>

      <pre><code># Fetch into env at start time, never write to disk
DB_PASSWORD=$(az keyvault secret show \
  --vault-name prod-vault --name db-password \
  --query value -o tsv)
export DB_PASSWORD
exec /usr/bin/node /var/www/app/server.js</code></pre>

      <h2>What "least privilege" looks like in practice</h2>
      <p>The web tier identity gets <code>get</code> on exactly the secrets it needs - not <code>list</code>, not <code>set</code>. The CI pipeline gets a separate identity with <code>set</code> permissions only on the secrets it manages. Humans get nothing in production by default and request short-lived elevation through PIM when they need it.</p>
    `,
    author: AUTHOR,
    date: new Date("2025-09-19"),
    readTime: "6 min read",
    category: "Linux & Security",
    tags: ["Security", "Key Vault", "Secrets", "Configuration"],
    image: "https://images.unsplash.com/photo-1614064642639-e398cf05badb?auto=format&fit=crop&w=1600&q=80",
    likes: 210,
    comments: 31
  },
  {
    id: "dns-cloudflare-orchestration",
    title: "Debugging a Cloudflare SSL Mystery: Full vs Flexible vs Strict",
    excerpt: "An infinite redirect loop, a broken padlock, and the three Cloudflare SSL modes that nobody reads carefully enough. Here is how to actually pick one.",
    content: `
      <p class="lead">After moving the origin behind Cloudflare we got intermittent redirect loops in some browsers and a hard "ERR_TOO_MANY_REDIRECTS" in others. The cause was the SSL mode setting - or rather, a misunderstanding of what it does.</p>

      <h2>The four modes, in plain English</h2>
      <ul>
        <li><strong>Off</strong> - no encryption anywhere. Never use this.</li>
        <li><strong>Flexible</strong> - HTTPS from browser to Cloudflare, plain HTTP from Cloudflare to your origin. The browser sees a padlock, but the origin leg is unencrypted. Avoid.</li>
        <li><strong>Full</strong> - HTTPS end to end, but Cloudflare does not validate the origin certificate. Self-signed certs work.</li>
        <li><strong>Full (strict)</strong> - HTTPS end to end, and Cloudflare validates the origin certificate against a real CA chain. This is the only mode you should run in production.</li>
      </ul>

      <h2>Why "Flexible" caused the loop</h2>
      <p>Our Nginx config had a <code>return 301 https://$host$request_uri</code> on port 80. Cloudflare in Flexible mode hits the origin on port 80 - so Nginx redirected to HTTPS, Cloudflare hit port 80 again with the new request, Nginx redirected again. Loop.</p>

      <h2>The fix</h2>
      <pre><code># Issue an Origin Certificate from Cloudflare (15-year validity)
# Install on the origin Nginx server:
ssl_certificate     /etc/ssl/cloudflare/origin.pem;
ssl_certificate_key /etc/ssl/cloudflare/origin.key;

# Then in the Cloudflare dashboard:
#   SSL/TLS - Overview - Full (strict)
#   SSL/TLS - Edge Certificates - Always Use HTTPS - On
#   SSL/TLS - Edge Certificates - Authenticated Origin Pulls - On</code></pre>

      <h2>What I would do differently</h2>
      <p>Turn on Authenticated Origin Pulls from day one. It locks the origin to only accept connections that present a Cloudflare client certificate, which means an attacker who finds the origin IP cannot bypass Cloudflare to talk to the app directly.</p>
    `,
    author: AUTHOR,
    date: new Date("2025-10-04"),
    readTime: "7 min read",
    category: "Networking",
    tags: ["DNS", "Cloudflare", "TLS", "Nginx"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80",
    likes: 156,
    comments: 14
  },
  {
    id: "github-actions-cicd-pipeline",
    title: "A Boring, Reliable GitHub Actions Pipeline for a Vite + React App",
    excerpt: "The deployment workflow I copy into every new project: lint, type-check, build, deploy to GitHub Pages on green main, with caching that makes it fast.",
    content: `
      <p class="lead">A good CI pipeline is the one you stop noticing. It runs in two minutes, fails fast on the right things, and gets out of the way.</p>

      <h2>The shape of the pipeline</h2>
      <ul>
        <li><strong>On every PR:</strong> install, lint, type-check, build. Everything runs in parallel where it can.</li>
        <li><strong>On merge to main:</strong> the same checks, plus a deploy to GitHub Pages.</li>
        <li><strong>Cache aggressively.</strong> A cold install on this repo is 90 seconds; a cached install is under 10.</li>
      </ul>

      <h2>The workflow file</h2>
      <pre><code class="language-yaml">name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci --legacy-peer-deps
      - run: npm run lint
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4</code></pre>

      <h2>The bits that matter</h2>
      <p><strong><code>npm ci</code>, not <code>npm install</code>.</strong> CI must use the lockfile, full stop. <code>npm install</code> can mutate it and produce builds that work on your machine and nowhere else.</p>
      <p><strong>Separate <code>build</code> and <code>deploy</code> jobs.</strong> If the deploy step fails, you can re-run only the deploy without rebuilding from scratch. It also makes the security model cleaner - only the deploy job needs <code>pages: write</code>.</p>
      <p><strong>The <code>--legacy-peer-deps</code> flag.</strong> React 19 is still flushing through the ecosystem. If a transitive dependency declares a peer dependency on React 18, npm 7+ will refuse to install. The flag is a known, deliberate workaround until the ecosystem catches up.</p>
    `,
    author: AUTHOR,
    date: new Date("2025-10-22"),
    readTime: "6 min read",
    category: "CI/CD",
    tags: ["GitHub Actions", "CI/CD", "Vite", "Deployment"],
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1600&q=80",
    likes: 198,
    comments: 19
  },
  {
    id: "nginx-reverse-proxy-letsencrypt",
    title: "Nginx + Let's Encrypt: A Reverse Proxy Setup That Renews Itself",
    excerpt: "Front a containerized app with Nginx, get a real TLS certificate from Let's Encrypt, and never think about renewals again.",
    content: `
      <p class="lead">Nginx in front of an app server is the unsexy default for a reason. It handles TLS termination, gzip, static asset caching, and access logging - things your application code should not be doing.</p>

      <h2>The reverse proxy block</h2>
      <pre><code class="language-nginx">server {
    listen 80;
    server_name blog.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name blog.example.com;

    ssl_certificate     /etc/letsencrypt/live/blog.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blog.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}</code></pre>

      <h2>Getting (and keeping) a certificate</h2>
      <pre><code># One-time issuance
sudo certbot --nginx -d blog.example.com --email me@example.com --agree-tos --non-interactive

# certbot installs a systemd timer automatically - verify it
systemctl list-timers | grep certbot</code></pre>

      <p>Certbot installs a twice-daily renewal timer. Renewals only fire when the cert is within 30 days of expiry, so most checks are no-ops. The one trap: if you ever change the Nginx server block, certbot's renewal hook needs to be able to reload Nginx. Run <code>sudo certbot renew --dry-run</code> after any config change to confirm.</p>

      <h2>What I gzip, what I do not</h2>
      <p>Gzip text-like content (HTML, CSS, JS, JSON, SVG) and skip everything else. Compressing already-compressed formats (PNG, JPEG, MP4, woff2) wastes CPU and produces marginally larger files.</p>
    `,
    author: AUTHOR,
    date: new Date("2025-11-08"),
    readTime: "7 min read",
    category: "Networking",
    tags: ["Nginx", "TLS", "Let's Encrypt", "Reverse Proxy"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
    likes: 167,
    comments: 18
  },
  {
    id: "docker-compose-production",
    title: "Running Docker Compose in Production: What I Wish I Knew First",
    excerpt: "Compose is not just a dev-only tool. With a few constraints - resource limits, health checks, and a real restart policy - it runs small fleets reliably.",
    content: `
      <p class="lead">Kubernetes is overkill for a single VM running three containers. Docker Compose, configured properly, is a perfectly reasonable production tool for small workloads.</p>

      <h2>Five things every production compose file needs</h2>
      <ol>
        <li><strong>Pinned image tags.</strong> <code>:latest</code> is a bug waiting to happen. Pin to a specific version or a digest.</li>
        <li><strong>Health checks.</strong> Without a healthcheck, <code>depends_on</code> only waits for container start, not for the service to actually be ready.</li>
        <li><strong>Restart policies.</strong> <code>restart: unless-stopped</code> for app containers, <code>restart: always</code> for infrastructure (databases, proxies).</li>
        <li><strong>Resource limits.</strong> A runaway container should not be able to take down the host.</li>
        <li><strong>Log rotation.</strong> The default Docker log driver writes forever. Cap it.</li>
      </ol>

      <h2>A real-world example</h2>
      <pre><code class="language-yaml">services:
  app:
    image: ghcr.io/myorg/api:1.4.2
    restart: unless-stopped
    environment:
      DATABASE_URL: \${DATABASE_URL}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/healthz"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 30s
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 512M
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16.4-alpine
    restart: always
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    secrets:
      - db_password
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 3s
      retries: 5

volumes:
  pgdata:

secrets:
  db_password:
    file: ./secrets/db_password.txt</code></pre>

      <h2>The upgrade dance</h2>
      <p>For zero-downtime updates of a single replica behind Nginx: bump the image tag, run <code>docker compose up -d app</code>, watch <code>docker compose ps</code> until the new container is healthy, and trust Compose's default behavior of stopping the old container only after the new one is up. For more than one replica, you have outgrown Compose - move to Swarm or Kubernetes.</p>
    `,
    author: AUTHOR,
    date: new Date("2025-11-26"),
    readTime: "8 min read",
    category: "Docker & Automation",
    tags: ["Docker", "Compose", "Production", "Healthchecks"],
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1600&q=80",
    likes: 289,
    comments: 41
  },
  {
    id: "whats-up-docker-wud",
    title: "What's up Docker (WUD): Update Notifications Without the Watchtower Drama",
    excerpt: "Watchtower automatically updates containers - which is exactly the problem. WUD watches for updates and tells you, leaving the upgrade decision to you.",
    content: `
      <p class="lead">There are two philosophies for keeping container images current: silent automatic updates, and informed manual updates. WUD is the second.</p>

      <h2>Why not Watchtower</h2>
      <p>Watchtower is fantastic for a homelab where downtime does not matter. The moment you have a database, a stateful service, or any user-facing traffic, automatic <code>:latest</code> pulls become a foot-gun. A breaking minor version on a Friday night is not the same as a CVE patch.</p>

      <h2>What WUD does</h2>
      <ul>
        <li>Watches a list of running containers and reports when newer images are published upstream.</li>
        <li>Distinguishes patch / minor / major updates based on semver tags - so you can ignore majors and act on patches.</li>
        <li>Notifies via Discord, Slack, Gotify, email, or a generic webhook.</li>
        <li>Does <em>not</em> upgrade anything by default. You stay in control.</li>
      </ul>

      <h2>Compose snippet</h2>
      <pre><code class="language-yaml">services:
  wud:
    image: getwud/wud:latest
    container_name: wud
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./wud-store:/store
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      WUD_WATCHER_LOCAL_CRON: "0 6 * * *"
      WUD_TRIGGER_DISCORD_MAIN_URL: \${DISCORD_WEBHOOK_URL}</code></pre>

      <h2>Two settings I always change</h2>
      <p><strong>Mount the Docker socket read-only.</strong> WUD only needs to enumerate containers and check registries; it never needs to write. Adding <code>:ro</code> meaningfully reduces blast radius if WUD is ever compromised.</p>
      <p><strong>Bind to localhost.</strong> Expose the dashboard via your reverse proxy (with auth) instead of opening port 3000 to the world.</p>

      <h2>What this changed for me</h2>
      <p>I stopped fearing image updates. The discipline of seeing a notification, reading the changelog, and pulling deliberately is significantly better than either ignoring updates for months or letting Watchtower YOLO them at 3am.</p>
    `,
    author: AUTHOR,
    date: new Date("2025-12-15"),
    readTime: "6 min read",
    category: "Docker & Automation",
    tags: ["Docker", "WUD", "Automation", "Containers"],
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1600&q=80",
    likes: 342,
    comments: 48
  },
  {
    id: "prometheus-grafana-quickstart",
    title: "Prometheus + Grafana on a Single VM: A 30-Minute Observability Setup",
    excerpt: "The minimum useful monitoring stack: node_exporter for the host, cAdvisor for containers, Prometheus for storage, Grafana for the dashboard.",
    content: `
      <p class="lead">You cannot fix what you cannot see. Before any optimization, before any capacity plan, you need basic visibility into CPU, memory, disk, and per-container resource usage.</p>

      <h2>The four moving parts</h2>
      <ul>
        <li><strong>node_exporter</strong> - exposes host metrics (CPU, memory, disk, network) on port 9100.</li>
        <li><strong>cAdvisor</strong> - exposes per-container metrics on port 8080.</li>
        <li><strong>Prometheus</strong> - scrapes both exporters and stores time series.</li>
        <li><strong>Grafana</strong> - reads from Prometheus and renders dashboards.</li>
      </ul>

      <h2>Compose stack</h2>
      <pre><code class="language-yaml">services:
  prometheus:
    image: prom/prometheus:v2.54.1
    restart: unless-stopped
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prom-data:/prometheus
    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
      - "--storage.tsdb.retention.time=30d"

  node-exporter:
    image: prom/node-exporter:v1.8.2
    restart: unless-stopped
    pid: host
    volumes:
      - /:/host:ro,rslave

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:v0.49.1
    restart: unless-stopped
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker:/var/lib/docker:ro

  grafana:
    image: grafana/grafana-oss:11.2.0
    restart: unless-stopped
    ports:
      - "127.0.0.1:3001:3000"
    volumes:
      - grafana-data:/var/lib/grafana

volumes:
  prom-data:
  grafana-data:</code></pre>

      <h2>The matching prometheus.yml</h2>
      <pre><code class="language-yaml">global:
  scrape_interval: 15s

scrape_configs:
  - job_name: node
    static_configs:
      - targets: ["node-exporter:9100"]

  - job_name: cadvisor
    static_configs:
      - targets: ["cadvisor:8080"]</code></pre>

      <h2>Dashboards worth importing</h2>
      <p>Skip building dashboards from scratch on day one. In Grafana, "Add data source" - point at <code>http://prometheus:9090</code>, then "Import dashboard" by ID:</p>
      <ul>
        <li><strong>1860</strong> - "Node Exporter Full" - the canonical host overview.</li>
        <li><strong>14282</strong> - "cAdvisor exporter" - per-container CPU and memory.</li>
      </ul>
      <p>That is enough to find 80% of the problems you will hit on a small VM. Build custom dashboards only after the imported ones stop answering your questions.</p>
    `,
    author: AUTHOR,
    date: new Date("2026-01-18"),
    readTime: "9 min read",
    category: "Observability",
    tags: ["Prometheus", "Grafana", "Monitoring", "Docker"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    likes: 412,
    comments: 56
  }
];

export const CATEGORIES = [
  "All",
  "Linux & Security",
  "Cloud Architecture",
  "Networking",
  "CI/CD",
  "Docker & Automation",
  "Observability"
];