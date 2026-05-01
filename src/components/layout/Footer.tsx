import React from 'react';

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
              Hardcore DevOps & Infrastructure Engineering insights. Moving legacy monoliths to highly available, distributed cloud environments.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-foreground tracking-wider uppercase text-xs mb-4 font-mono">Index</h3>
            <ul className="space-y-3 font-mono text-xs">
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">~/home</a></li>
              <li><a href="/write" className="text-muted-foreground hover:text-primary transition-colors">~/write</a></li>
              <li><a href="/login" className="text-muted-foreground hover:text-primary transition-colors">~/login</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground tracking-wider uppercase text-xs mb-4 font-mono">Socials</h3>
            <ul className="space-y-3 font-mono text-xs">
              <li><a href="https://github.com/it22564290" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Sachintha Daham. All deployments verified. Zero downtime.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span>Powered by React + Vite + TailwindCSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
