import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home, AlertTriangle } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-card/40 border border-red-500/20 rounded-2xl p-8 md:p-12 max-w-2xl w-full backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
            <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black font-mono tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">
            404
          </h1>
          
          <div className="bg-muted border border-border rounded-lg p-4 mb-8 w-full max-w-md text-left font-mono text-sm">
            <div className="flex items-center gap-2 text-red-400 mb-2 font-bold">
              <Terminal className="w-4 h-4" /> root@system:~#
            </div>
            <p className="text-muted-foreground">
              <span className="text-red-500">Error:</span> Route not resolved.<br />
              <span className="text-yellow-500">Warning:</span> Target deployment missing or relocated.<br />
              Action required: Return to valid endpoint.
            </p>
          </div>

          <Link 
            to="/" 
            className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20 uppercase tracking-wider text-sm"
          >
            <Home className="w-4 h-4" />
            Return to Root
          </Link>
        </div>
      </div>
    </div>
  );
};
