import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-card border border-border rounded-3xl shadow-xl shadow-primary/5"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 tracking-tight">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-muted-foreground">
            {isLogin ? 'Enter your details to sign in to your account' : 'Join the community of developers'}
          </p>
        </div>

        <button className="w-full flex items-center justify-center gap-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium py-3 px-4 rounded-xl transition-colors mb-6">
          Continue with GitHub
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        <form className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Mail className="w-5 h-5" />
              </div>
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Password</label>
              {isLogin && (
                <a href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</a>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-4 rounded-xl transition-all shadow-sm mt-6 group">
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-primary font-semibold hover:underline"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};
