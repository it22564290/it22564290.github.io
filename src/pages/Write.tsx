import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Image, Save, Send } from 'lucide-react';

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

  return (
    <div className="max-w-5xl mx-auto min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
        <h1 className="text-2xl font-bold">Write a new story</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground bg-muted hover:bg-muted/80 rounded-full transition-colors">
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button className="flex items-center gap-2 px-6 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-colors shadow-sm">
            <Send className="w-4 h-4" />
            Publish
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {/* Cover Image Upload */}
        <div className="w-full h-48 border-2 border-dashed border-border rounded-2xl bg-muted/30 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer group">
          <Image className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Add a cover image</span>
          <span className="text-xs mt-1">Recommended: 1920x1080px</span>
        </div>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Article Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl md:text-5xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/50 w-full"
        />

        {/* Rich Text Editor */}
        <div className="flex-1 min-h-[500px] write-editor-container">
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent} 
            modules={modules}
            placeholder="Tell your story..."
            className="h-full text-lg"
          />
        </div>
      </div>

      {/* Editor Custom Styles added directly via style block for simplicity, usually moved to index.css */}
      <style>{`
        .write-editor-container .ql-container {
          font-family: inherit;
          font-size: 1.125rem;
          border: none;
        }
        .write-editor-container .ql-toolbar {
          border: none;
          border-bottom: 1px solid hsl(var(--border));
          padding: 1rem 0;
          margin-bottom: 1rem;
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
          color: hsl(var(--muted-foreground));
        }
      `}</style>
    </div>
  );
};
