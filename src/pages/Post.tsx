import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bookmark, Share2, MessageSquare, Heart, Clock, ArrowLeft, Cpu } from 'lucide-react';
import { format } from 'date-fns';
import { POSTS } from '../data/posts';

export const Post: React.FC = () => {
  const { id } = useParams();

  // Dynamically find post from the ID
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
    <article className="max-w-4xl mx-auto pb-16">
      {/* Back button */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> root@sachintha-daham:~/blog# cd ..
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`px-3 py-1 font-mono rounded-full text-xs font-bold tracking-wider uppercase border backdrop-blur-md ${getCategoryClass(post.category)}`}>
            {post.category}
          </span>
          <span className="font-mono text-xs text-muted-foreground bg-muted border border-border px-3 py-1 rounded-full uppercase flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> High Availability
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-8 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-between py-6 border-y border-border">
          <div className="flex items-center gap-4">
            <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full bg-muted border border-border" />
            <div>
              <div className="font-bold text-foreground flex items-center gap-1.5">
                {post.author.name}
                <span className="text-xs text-green-500 font-mono bg-green-500/10 px-2 py-0.5 border border-green-500/20 rounded-full font-normal">SRE Verified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5 font-mono">
                <span>{format(post.date, 'MMM d, yyyy')}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {post.readTime}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95 transition-all">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-12 rounded-3xl overflow-hidden aspect-[21/9] bg-muted border border-border">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Article Footer & Tags */}
      <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-border">
        {post.tags.map((tag, idx) => (
          <span key={idx} className="px-3.5 py-1.5 bg-muted text-muted-foreground border border-border rounded-full text-xs font-mono font-medium tracking-wide">
            #{tag}
          </span>
        ))}
      </div>

      {/* Engagement Bar */}
      <div className="flex items-center gap-6 mb-16">
        <button className="flex items-center gap-2 text-muted-foreground hover:text-rose-500 transition-colors">
          <Heart className="w-5 h-5" />
          <span className="font-mono text-sm font-bold">{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <MessageSquare className="w-5 h-5" />
          <span className="font-mono text-sm font-bold">{post.comments}</span>
        </button>
      </div>

      {/* Author Bio Box */}
      <div className="bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left backdrop-blur-sm">
        <img src={post.author.avatar} alt={post.author.name} className="w-24 h-24 rounded-full bg-muted border border-border shrink-0" />
        <div>
          <h3 className="text-xl font-bold mb-2">Technical Insight by {post.author.name}</h3>
          <p className="text-muted-foreground mb-4 font-mono text-sm leading-relaxed">
            {post.author.bio}. Architecting distributed, high-availability microservices. Focus on security, cloud-native deployments, and container orchestration.
          </p>
          <a href="https://github.com/it22564290" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-primary-foreground font-mono font-bold px-6 py-2.5 rounded-full text-xs hover:bg-primary/90 transition-all shadow-md active:scale-95">
            ~/view-github
          </a>
        </div>
      </div>
    </article>
  );
};
