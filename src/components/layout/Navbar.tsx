import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useThemeStore } from "../../store/useThemeStore";
import { Moon, Sun, Menu, UserCircle, X, GitBranch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About", end: false }
];

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const linkBase = "text-xs font-mono font-bold tracking-wider uppercase transition-colors";
  const linkInactive = "text-muted-foreground hover:text-primary";
  const linkActive = "text-primary";

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-extrabold text-2xl tracking-tighter hover:text-primary transition-colors flex items-center gap-2">
              <span className="text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-xl text-lg font-mono">SD</span>
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent hidden sm:inline-block">Sachintha Daham</span>
              <span className="text-muted-foreground font-light text-xl hidden sm:inline-block">/</span>
              <span className="font-light text-muted-foreground text-lg hidden sm:inline-block">blog</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 mx-8">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            <a
              href="https://github.com/it22564290"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="GitHub"
            >
              <GitBranch className="w-5 h-5" />
            </a>

            <Link
              to="/login"
              className="hidden md:inline-flex items-center gap-2 text-xs font-mono font-bold bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-all shadow-md active:scale-95 uppercase tracking-wider"
            >
              <UserCircle className="w-4 h-4" />
              Sign in
            </Link>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md hover:bg-muted text-muted-foreground active:scale-95 transition-transform"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl absolute w-full overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-6 space-y-2 flex flex-col">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `text-sm font-mono font-bold p-3 rounded-xl transition-colors tracking-wider uppercase border ${
                      isActive
                        ? "text-primary border-primary/30 bg-primary/5"
                        : "text-foreground hover:bg-muted border-transparent"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                href="https://github.com/it22564290"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-mono font-bold text-foreground hover:bg-muted p-3 rounded-xl transition-colors tracking-wider uppercase border border-transparent"
              >
                <GitBranch className="w-4 h-4" /> GitHub
              </a>
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-mono font-bold bg-primary text-primary-foreground p-3 rounded-xl justify-center transition-all shadow-md active:scale-95 uppercase tracking-wider mt-2"
              >
                <UserCircle className="w-5 h-5" />
                Sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};