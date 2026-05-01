import React, { useState } from 'react';
import { Terminal, Lock, ArrowRight, GitCommit } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isLogin ? 'Authentication successful. Welcome, Admin.' : 'User provisioned. Awaiting verification.');
  };

  const handleGithub = () => {
    toast.loading('Redirecting to OAuth provider...', { duration: 2000 });
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-card/40 backdrop-blur-md border border-border hover:border-primary/40 transition-colors rounded-2xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <Terminal className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h2 className="text-3xl font-black mb-2 tracking-tight">
            {isLogin ? 'System Login' : 'Provision Access'}
          </h2>
          <p className="text-sm font-mono text-muted-foreground">
            {isLogin ? 'Authenticate to access the admin console' : 'Initialize a new developer account'}
          </p>
        </div>

        <button 
          onClick={handleGithub}
          className="w-full flex items-center justify-center gap-3 bg-foreground text-background hover:bg-foreground/90 font-bold py-3.5 px-4 rounded-xl transition-all mb-6 active:scale-95"
        >
          <GitCommit className="w-5 h-5" />
          Authenticate via GitHub
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border border-dashed"></div>
          </div>
          <div className="relative flex justify-center text-xs font-mono">
            <span className="px-4 bg-card text-muted-foreground uppercase tracking-widest">Or Local Auth</span>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider">Root Username</label>
              <input 
                type="text" 
                placeholder="developer_01"
                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border hover:border-primary/40 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono text-sm"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider">Admin Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <Terminal className="w-4 h-4" />
              </div>
              <input 
                type="email" 
                placeholder="admin@system.local"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/50 border border-border hover:border-primary/40 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider">Passphrase</label>
              {isLogin && (
                <a href="#" className="text-xs text-primary hover:underline font-mono">Reset Key?</a>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                <Lock className="w-4 h-4" />
              </div>
              <input 
                type="password" 
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/50 border border-border hover:border-primary/40 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-mono text-sm"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-black py-4 px-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mt-8 active:scale-95 group uppercase tracking-widest text-sm">
            {isLogin ? 'Execute Login' : 'Run Provision'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-8 text-center text-xs font-mono text-muted-foreground">
          {isLogin ? "No credentials found? " : "Already provisioned? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-primary font-bold hover:underline"
          >
            {isLogin ? 'init --new-user' : 'run --login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};
