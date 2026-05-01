import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Image, Save, Send, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';

export const Write: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
  };

  const handleSaveDraft = () => {
    toast.success('Draft cached locally. Commit ready.');
  };

  const handlePublish = () => {
    if (!title || !content) {
      toast.error('Pipeline failed: Title and content are required parameters.');
      return;
    }
    const publishToast = toast.loading('Initiating deployment pipeline...');
    setTimeout(() => {
      toast.success('Deployment successful! Post is live.', { id: publishToast });
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto min-h-[calc(100vh-8rem)] flex flex-col pt-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-border gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Deploy New Infrastructure Log</h1>
          <p className="text-sm font-mono text-muted-foreground mt-2 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" /> root@sachintha-daham:~/drafts# vim new_post.md
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold text-muted-foreground bg-card/40 border border-border hover:border-primary/40 hover:text-foreground rounded-xl transition-all shadow-sm active:scale-95 uppercase tracking-wider"
          >
            <Save className="w-4 h-4" />
            git commit
          </button>
          <button 
            onClick={handlePublish}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-mono font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 uppercase tracking-wider"
          >
            <Send className="w-4 h-4" />
            git push
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-8 bg-card/20 p-8 rounded-3xl border border-border/50 shadow-inner">
        {/* Cover Image Upload */}
        <div className="w-full h-48 border-2 border-dashed border-border/60 hover:border-primary/50 rounded-2xl bg-background/50 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/30 transition-all cursor-pointer group shadow-sm">
          <Image className="w-8 h-8 mb-3 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">Mount Container Volume (Cover Image)</span>
          <span className="text-xs mt-1.5 font-mono">Accepts .jpg, .png, .webp</span>
        </div>

        {/* Title Input */}
        <input
          type="text"
          placeholder="System Architecture Overview..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl md:text-5xl font-black bg-transparent border-none outline-none placeholder:text-muted-foreground/30 w-full focus:ring-0 leading-tight tracking-tighter"
        />

        {/* Rich Text Editor */}
        <div className="flex-1 min-h-[500px] write-editor-container bg-background/50 rounded-xl border border-border/60 shadow-sm overflow-hidden">
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent} 
            modules={modules}
            placeholder="Document your engineering execution here..."
            className="h-full text-lg font-mono"
          />
        </div>
      </div>

      {/* Editor Custom Styles */}
      <style>{`
        .write-editor-container .ql-container {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 0.95rem;
          border: none !important;
        }
        .write-editor-container .ql-editor {
          padding: 2rem;
          line-height: 1.8;
        }
        .write-editor-container .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid hsl(var(--border)) !important;
          padding: 1rem 1.5rem !important;
          background: hsl(var(--card) / 0.4);
          backdrop-filter: blur(8px);
        }
        .dark .ql-toolbar .ql-stroke {
          stroke: hsl(var(--foreground));
        }
        .dark .ql-toolbar .ql-fill {
          fill: hsl(var(--foreground));
        }
        .dark .ql-toolbar .ql-picker {
          color: hsl(var(--foreground));
        }
        .dark .ql-editor.ql-blank::before {
          color: hsl(var(--muted-foreground) / 0.5);
          font-style: normal;
        }
      `}</style>
    </div>
  );
};
