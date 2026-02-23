import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        'prose prose-gray max-w-none',
        // Headings
        'prose-headings:scroll-mt-20 prose-headings:font-semibold',
        'prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg',
        // Paragraphs
        'prose-p:leading-7',
        // Links
        'prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline',
        // Code
        'prose-code:rounded prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none',
        // Pre / code blocks
        'prose-pre:rounded-lg prose-pre:bg-gray-900 prose-pre:text-sm',
        // Lists
        'prose-ul:list-disc prose-ol:list-decimal',
        'prose-li:marker:text-gray-400',
        // Blockquotes
        'prose-blockquote:border-blue-300 prose-blockquote:text-gray-600',
        // Tables
        'prose-table:overflow-hidden prose-table:rounded-lg prose-table:border prose-table:border-gray-200',
        'prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2',
        'prose-td:px-4 prose-td:py-2',
        // Horizontal rule
        'prose-hr:border-gray-200',
        // Images
        'prose-img:rounded-lg',
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
