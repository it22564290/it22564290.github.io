import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bookmark, Share2, MessageSquare, Heart, Clock, ArrowLeft, Cpu } from 'lucide-react';
import { format } from 'date-fns';
import { POSTS } from '../data/posts';

export const Post: React.FC = () => {
  const { id } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(parseFloat(scroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const post = POSTS.find((p) => p.id === id) || POSTS[0];

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
    <div className="relative">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-muted/30">
        <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-75" style={{ width: `${scrollProgress}%` }} />
      </div>

      <article className="max-w-4xl mx-auto pb-16">
        {/* Back button */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs font-black text-muted-foreground hover:text-primary transition-all hover:translate-x-[-4px]">
            <ArrowLeft className="w-4 h-4" /> root@sachintha-daham:~/blog# cd ..
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className={`px-4 py-1.5 font-mono rounded-full text-xs font-black tracking-wider uppercase border backdrop-blur-md shadow-sm ${getCategoryClass(post.category)}`}>
              {post.category}
            </span>
            <span className="font-mono text-xs text-muted-foreground bg-muted border border-border px-3.5 py-1.5 rounded-full uppercase flex items-center gap-1.5 font-bold">
              <Cpu className="w-3.5 h-3.5" /> High Availability
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between py-6 border-y border-border">
            <div className="flex items-center gap-4">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full bg-muted border border-border" />
              <div>
                <div className="font-extrabold text-foreground flex items-center gap-2">
                  {post.author.name}
                  <span className="text-xs text-green-500 font-mono bg-green-500/10 px-2.5 py-0.5 border border-green-500/20 rounded-full font-bold uppercase animate-pulse">SRE Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5 font-mono">
                  <span>{format(post.date, 'MMM d, yyyy')}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {post.readTime}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-3 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-110 active:scale-95 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-110 active:scale-95 transition-all">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image with dynamic hover scale */}
        <div className="mb-12 rounded-3xl overflow-hidden aspect-[21/9] bg-muted border border-border shadow-xl group cursor-pointer">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 select-none" />
        </div>

        {/* Article Content with optimized typography */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Article Footer & Tags */}
        <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-border">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="px-4 py-2 bg-muted/60 text-muted-foreground hover:text-primary hover:border-primary/40 border border-border rounded-xl text-xs font-mono font-black tracking-wide transition-all cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>

        {/* Engagement Action Bar */}
        <div className="flex items-center gap-6 mb-16">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-rose-500 transition-colors group">
            <span className="p-2.5 bg-muted/50 rounded-full group-hover:bg-rose-500/10 transition-colors">
              <Heart className="w-5 h-5 group-hover:scale-110" />
            </span>
            <span className="font-mono text-sm font-bold">{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
            <span className="p-2.5 bg-muted/50 rounded-full group-hover:bg-primary/10 transition-colors">
              <MessageSquare className="w-5 h-5 group-hover:scale-110" />
            </span>
            <span className="font-mono text-sm font-bold">{post.comments}</span>
          </button>
        </div>

        {/* Author Bio Card */}
        <div className="bg-card/40 border border-border rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left backdrop-blur-sm shadow-xl">
          <img src={post.author.avatar} alt={post.author.name} className="w-24 h-24 rounded-full bg-muted border border-border shrink-0 select-none" />
          <div>
            <h3 className="text-xl font-black mb-2">Technical Insight by {post.author.name}</h3>
            <p className="text-muted-foreground mb-5 font-mono text-sm leading-relaxed">
              {post.author.bio}. Architecting distributed, high-availability microservices. Focus on cloud-native deployments, container orchestration, and continuous improvement.
            </p>
            <a href="https://github.com/it22564290" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-primary-foreground font-mono font-bold px-6 py-3 rounded-full text-xs hover:bg-primary/90 transition-all shadow-md active:scale-95 uppercase tracking-wide">
              ~/view-github
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};
