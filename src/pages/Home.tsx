import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Clock, ArrowRight, ShieldCheck, Cpu, Terminal as TerminalIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { POSTS, CATEGORIES } from '../data/posts';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? POSTS 
    : POSTS.filter(p => p.category === selectedCategory);

  // Take first post as the featured/banner post
  const featuredPost = POSTS[POSTS.length - 1];

  const getCategoryClass = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'kubernetes': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'ci/cd': return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
      case 'cloud architecture': return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
      case 'linux & security': return 'bg-green-500/10 text-green-400 border border-green-500/20';
      case 'networking': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'ai & machine learning': return 'bg-pink-500/10 text-pink-400 border border-pink-500/20';
      default: return 'bg-muted text-muted-foreground border border-border';
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero / Header banner */}
      <section className="relative rounded-3xl overflow-hidden min-h-[460px] border border-border flex items-end">
        <div className="absolute inset-0">
          <img 
            src={featuredPost.image} 
            alt={featuredPost.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        
        <div className="relative p-6 sm:p-12 max-w-4xl">
          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-4 backdrop-blur-md ${getCategoryClass(featuredPost.category)}`}>
            <Cpu className="w-3.5 h-3.5" /> Latest Infrastructure Breakthrough
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            {featuredPost.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl line-clamp-2">
            {featuredPost.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to={`/post/${featuredPost.id}`} className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3.5 rounded-full hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/10">
              Review DevOps Deep-Dive <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-3">
              <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-10 h-10 rounded-full bg-muted border border-border" />
              <div>
                <div className="text-sm font-semibold">{featuredPost.author.name}</div>
                <div className="text-xs text-muted-foreground">{featuredPost.readTime}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cloud & Engineering Category Filter Bar */}
      <section className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-border">
        <span className="text-sm font-mono font-bold text-muted-foreground mr-4 uppercase shrink-0 flex items-center gap-1.5">
          <TerminalIcon className="w-4 h-4" /> root@sachintha-daham:~/categories#
        </span>
        {CATEGORIES.map((cat, idx) => (
          <button 
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 font-mono rounded-full text-xs font-semibold transition-all border ${
              selectedCategory === cat 
                ? 'bg-primary border-primary text-primary-foreground' 
                : 'bg-muted border-border hover:bg-muted/80 text-muted-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Articles Case Studies Grid */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-black flex items-center gap-3">
              Cloud & Infrastructure Engineering Portfolio
            </h2>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              {filteredPosts.length} critical systems optimizations documented
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-green-500 font-mono bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" /> All deployments validated (Zero downtime)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group flex flex-col bg-card border border-border hover:border-primary/40 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <div className="aspect-[16/9] overflow-hidden relative border-b border-border">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 font-mono rounded-full text-xs font-bold ${getCategoryClass(post.category)}`}>
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{format(post.date, 'MMM d, yyyy')}</span>
                </div>
                
                <h3 className="text-lg font-extrabold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full bg-muted border border-border" />
                    <div>
                      <span className="text-sm font-semibold">{post.author.name}</span>
                      <p className="text-xs text-muted-foreground font-mono">DevOps & SRE</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-primary transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};
