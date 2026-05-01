import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Clock, ArrowRight, ShieldCheck, Search, Terminal as TerminalIcon, X, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import { POSTS, CATEGORIES } from "../data/posts";

const getCategoryClass = (cat: string) => {
  switch (cat.toLowerCase()) {
    case "kubernetes": return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
    case "ci/cd": return "bg-orange-500/10 text-orange-400 border border-orange-500/20";
    case "cloud architecture": return "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";
    case "linux & security": return "bg-green-500/10 text-green-400 border border-green-500/20";
    case "networking": return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
    case "docker & automation": return "bg-sky-500/10 text-sky-400 border border-sky-500/20";
    case "observability": return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    case "ai & machine learning": return "bg-pink-500/10 text-pink-400 border border-pink-500/20";
    default: return "bg-muted text-muted-foreground border border-border";
  }
};

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedPosts = [...POSTS].sort((a, b) => b.date.getTime() - a.date.getTime());

  const filteredPosts = sortedPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some(tag => tag.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16">
      <Helmet>
        <title>Sachintha Daham | Cloud and DevOps Engineering Notes</title>
        <meta name="description" content="Field notes on cloud architecture, containers, CI/CD, Linux administration and observability." />
        <meta property="og:title" content="Sachintha Daham | Cloud and DevOps Engineering Notes" />
        <meta property="og:description" content="Field notes on cloud architecture, containers, CI/CD, Linux administration and observability." />
      </Helmet>

      {/* Hero */}
      <section className="relative rounded-3xl overflow-hidden min-h-[480px] border border-border flex items-center shadow-2xl group transition-all duration-500 hover:shadow-primary/5 bg-black/40">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80"
            alt="Server Rack Background"
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-40 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative p-8 md:p-16 max-w-3xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-6 backdrop-blur-md bg-primary/10 text-primary border border-primary/20">
              <TerminalIcon className="w-4 h-4" /> root@sachintha-daham:~#
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-foreground">
              Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Cloud</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl font-mono leading-relaxed">
              Field notes on cloud architecture, container orchestration, secure Linux administration, and robust edge networking. Welcome to my infrastructure log.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://sachinthadaham.me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary text-primary-foreground font-extrabold px-8 py-4 rounded-full hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                View Main Portfolio <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://github.com/SachinthaDaham" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-card/50 text-foreground border border-border font-bold px-8 py-4 rounded-full hover:bg-muted hover:scale-105 active:scale-95 transition-all backdrop-blur-sm">
                <GitBranch className="w-4 h-4" /> GitHub
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Floating elements for visual flair */}
        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute hidden lg:block right-16 top-1/4 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none"
        />
        <motion.div 
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute hidden lg:block right-48 bottom-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-[50px] pointer-events-none"
        />
      </section>

      {/* Search + categories */}
      <section className="bg-card/40 backdrop-blur-md border border-border rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1 max-w-md">
            <label className="text-xs font-mono font-black tracking-widest text-muted-foreground uppercase flex items-center gap-2 mb-3">
              <TerminalIcon className="w-4 h-4 text-primary" /> ~/blog $ grep
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 bg-background/50 border border-border hover:border-primary/40 focus:border-primary rounded-xl font-mono text-sm placeholder-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                placeholder="search posts, tags, topics..."
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 select-none overflow-x-auto">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2.5 font-mono rounded-xl text-xs font-extrabold transition-all border ${
                  selectedCategory === cat
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/10 scale-105"
                    : "bg-muted/60 border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-black flex items-center gap-3">
              All posts
            </h2>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              {filteredPosts.length} {filteredPosts.length === 1 ? "match" : "matches"}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-green-500 font-mono bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4" /> Field-tested in production
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="group flex flex-col bg-card/40 border border-border hover:border-primary/40 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm"
              >
                <Link to={`/post/${post.id}`} className="aspect-[16/9] overflow-hidden relative border-b border-border select-none block">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 font-mono rounded-full text-xs font-black backdrop-blur-md tracking-wider border shadow-sm uppercase ${getCategoryClass(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-3">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                    <span>-</span>
                    <span>{format(post.date, "MMM d, yyyy")}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug tracking-tight">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </h3>

                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full bg-muted border border-border" />
                      <div>
                        <span className="text-sm font-bold block">{post.author.name}</span>
                        <p className="text-xs text-muted-foreground font-mono">DevOps Engineer</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-muted/80 rounded-full text-muted-foreground hover:text-primary transition-all active:scale-90" aria-label="Bookmark">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-border rounded-2xl font-mono text-muted-foreground space-y-3 bg-card/10">
            <TerminalIcon className="w-8 h-8 mx-auto text-primary animate-bounce" />
            <p className="text-sm font-bold">No posts match that query.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="text-xs text-primary font-black hover:underline mt-2 uppercase tracking-wide"
            >
              ~/reset-filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};