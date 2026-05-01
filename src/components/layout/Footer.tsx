import React from "react";
import { Link } from "react-router-dom";
import { GitBranch, Link2, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border mt-auto py-12 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="font-extrabold text-xl tracking-tighter flex items-center gap-2">
              <span className="text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-xl font-mono">SD</span>
              <span>Sachintha Daham Blog</span>
            </span>
            <p className="mt-4 text-sm text-muted-foreground font-mono max-w-sm leading-relaxed">
              Field notes on cloud architecture, containers, CI/CD, Linux, and observability. Written from the trenches, not the marketing department.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-foreground tracking-wider uppercase text-xs mb-4 font-mono">Site</h3>
            <ul className="space-y-3 font-mono text-xs">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">Sign in</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground tracking-wider uppercase text-xs mb-4 font-mono">Connect</h3>
            <ul className="space-y-3 font-mono text-xs">
              <li>
                <a href="https://github.com/SachinthaDaham" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
                  <GitBranch className="w-3.5 h-3.5" /> GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/sachinthadaham/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Link2 className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:Dahamsachintha66@gmail.com" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              </li>
              <li>
                <a href="https://wa.me/94764220899" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Link2 className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </li>
              <li>
                <a href="https://sachinthadaham.me" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:text-primary/80 transition-colors inline-flex items-center gap-2 mt-2">
                  <Link2 className="w-3.5 h-3.5" /> Main Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            (c) {new Date().getFullYear()} Sachintha Daham. Built with care, deployed with caution.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span>React + Vite + TailwindCSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};