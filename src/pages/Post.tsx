import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Bookmark, Share2, MessageSquare, Heart, Clock, ArrowLeft, Cpu, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { POSTS } from "../data/posts";

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

export const Post: React.FC = () => {
  const { id } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(scroll * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const post = POSTS.find((p) => p.id === id) || POSTS[0];
  const related = POSTS
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt, url });
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <div className="relative">
      <Helmet>
        <title>{post.title} | Sachintha Daham</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-muted/30">
        <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-75" style={{ width: `${scrollProgress}%` }} />
      </div>

      <article className="max-w-4xl mx-auto pb-16">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs font-black text-muted-foreground hover:text-primary transition-all hover:-translate-x-1">
            <ArrowLeft className="w-4 h-4" /> back to all posts
          </Link>
        </div>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className={`px-4 py-1.5 font-mono rounded-full text-xs font-black tracking-wider uppercase border backdrop-blur-md shadow-sm ${getCategoryClass(post.category)}`}>
              {post.category}
            </span>
            <span className="font-mono text-xs text-muted-foreground bg-muted border border-border px-3.5 py-1.5 rounded-full uppercase flex items-center gap-1.5 font-bold">
              <Cpu className="w-3.5 h-3.5" /> Field notes
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-border">
            <div className="flex items-center gap-4">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full bg-muted border border-border" />
              <div>
                <div className="font-extrabold text-foreground">{post.author.name}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5 font-mono">
                  <span>{format(post.date, "MMM d, yyyy")}</span>
                  <span>-</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handleShare} className="p-3 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-110 active:scale-95 transition-all" aria-label="Share">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-110 active:scale-95 transition-all" aria-label="Bookmark">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="mb-12 rounded-3xl overflow-hidden aspect-[21/9] bg-muted border border-border shadow-xl group">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 select-none" />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-border">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="px-4 py-2 bg-muted/60 text-muted-foreground hover:text-primary hover:border-primary/40 border border-border rounded-xl text-xs font-mono font-black tracking-wide transition-all cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>

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

        <div className="bg-card/40 border border-border rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left backdrop-blur-sm shadow-xl">
          <img src={post.author.avatar} alt={post.author.name} className="w-24 h-24 rounded-full bg-muted border border-border shrink-0 select-none" />
          <div>
            <h3 className="text-xl font-black mb-2">About {post.author.name}</h3>
            <p className="text-muted-foreground mb-5 font-mono text-sm leading-relaxed">{post.author.bio}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link to="/about" className="inline-block bg-primary text-primary-foreground font-mono font-bold px-6 py-3 rounded-full text-xs hover:bg-primary/90 transition-all shadow-md active:scale-95 uppercase tracking-wide">
                More about me
              </Link>
              <a href="https://github.com/it22564290" target="_blank" rel="noopener noreferrer" className="inline-block bg-muted text-foreground font-mono font-bold px-6 py-3 rounded-full text-xs hover:bg-muted/70 transition-all active:scale-95 uppercase tracking-wide border border-border">
                GitHub
              </a>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-black mb-8">More on {post.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rp, idx) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link to={`/post/${rp.id}`} className="group block bg-card/40 border border-border hover:border-primary/40 rounded-2xl overflow-hidden transition-all hover:-translate-y-1">
                    <div className="aspect-[16/9] overflow-hidden border-b border-border">
                      <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{rp.title}</h3>
                      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                        <span>{rp.readTime}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};