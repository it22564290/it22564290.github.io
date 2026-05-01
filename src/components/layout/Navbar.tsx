import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';
import { Moon, Sun, Search, Menu, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-extrabold text-2xl tracking-tighter hover:text-primary transition-colors flex items-center gap-2">
              <span className="text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-xl text-lg font-mono">SD</span>
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Sachintha Daham</span>
              <span className="text-muted-foreground font-light text-xl">/</span>
              <span className="font-light text-muted-foreground text-lg">Blog</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-1.5 border border-border rounded-full leading-5 bg-background/50 text-foreground font-mono placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-xs transition-all"
                placeholder="search_blog_archive..."
              />
            </div>
          </div>

          {/* Right Nav */}
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            
            <div className="hidden md:flex items-center gap-4">
              <Link to="/write" className="text-sm font-mono font-medium hover:text-primary transition-colors">~/write</Link>
              <Link to="/login" className="flex items-center gap-2 text-xs font-mono font-bold bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-all shadow-sm">
                <UserCircle className="w-4 h-4" />
                ~/login
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button className="p-2 rounded-md hover:bg-muted text-muted-foreground">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
