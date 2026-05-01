import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Mail, Link2, Server, Cloud, Container, GitBranch, Shield, Activity } from "lucide-react";

const skills = [
  { icon: Server, label: "Linux Administration", detail: "Ubuntu, Debian, systemd, Bash" },
  { icon: Cloud, label: "Cloud Platforms", detail: "Azure, AWS fundamentals" },
  { icon: Container, label: "Containers", detail: "Docker, Compose, registries" },
  { icon: GitBranch, label: "CI/CD", detail: "GitHub Actions, deployment pipelines" },
  { icon: Shield, label: "Security & Networking", detail: "TLS, Cloudflare, NSGs, secrets" },
  { icon: Activity, label: "Observability", detail: "Prometheus, Grafana, structured logs" }
];

const principles = [
  {
    title: "Reproducible beats clever",
    body: "A boring deployment that works the same way every time is worth more than a clever one nobody else can run."
  },
  {
    title: "Fix the root cause",
    body: "Restarting the service quiets the alarm. Finding why the service crashed is the actual job."
  },
  {
    title: "Document the why",
    body: "Code shows what was done. Comments and commit messages should explain why - that is the part future you will need."
  }
];

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-16">
      <Helmet>
        <title>About | Sachintha Daham</title>
        <meta name="description" content="About Sachintha Daham - cloud and DevOps engineer focused on reliable, secure infrastructure." />
      </Helmet>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start gap-8"
      >
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sachintha&backgroundColor=b6e3f4"
          alt="Sachintha Daham"
          className="w-32 h-32 rounded-2xl bg-muted border border-border shadow-lg shrink-0"
        />
        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">~ whoami</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            Hi, I am Sachintha Daham.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            I am a cloud and DevOps engineer. I spend my days making infrastructure boring - in the good way. The kind that wakes nobody up at 3am, deploys the same way on Friday as it does on Monday, and recovers itself when something inevitably breaks.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/it22564290" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-foreground text-background font-mono font-bold px-5 py-2.5 rounded-full text-xs hover:opacity-90 transition-all uppercase tracking-wide">
              <Code2 className="w-4 h-4" /> GitHub
            </a>
            <a href="https://www.Link2.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-muted text-foreground font-mono font-bold px-5 py-2.5 rounded-full text-xs hover:bg-muted/70 transition-all uppercase tracking-wide border border-border">
              <Link2 className="w-4 h-4" /> Link2
            </a>
            <a href="mailto:dahamsachintha66@gmail.com" className="inline-flex items-center gap-2 bg-muted text-foreground font-mono font-bold px-5 py-2.5 rounded-full text-xs hover:bg-muted/70 transition-all uppercase tracking-wide border border-border">
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      </motion.section>

      <section>
        <h2 className="text-2xl font-black mb-6">What I work on</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-card/40 border border-border rounded-2xl p-5 flex items-start gap-4 hover:border-primary/40 transition-colors"
              >
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-primary shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{skill.label}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{skill.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black mb-6">How I think about the work</h2>
        <div className="space-y-4">
          {principles.map((p, idx) => (
            <div key={idx} className="border-l-4 border-primary/40 pl-6 py-2">
              <h3 className="font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card/40 border border-border rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-black mb-3">Let us talk</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Working on something interesting? Hit a problem you want a second pair of eyes on? I am happy to chat about infrastructure, deployments, or anything in this blog.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono font-bold px-6 py-3 rounded-full text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 uppercase tracking-wide"
        >
          Get in touch
        </Link>
      </section>
    </div>
  );
};