import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { Loader2, Image, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarkdownEditor } from '@/components/common/MarkdownEditor';
import { TagBadge } from '@/components/common/TagBadge';
import * as tagsApi from '@/api/tags';
import type { Tag } from '@/api/tags';
import type { ArticleCreate, ArticleUpdate } from '@/types/article';

type ArticleFormData = ArticleCreate;

interface ArticleEditorProps {
  initialData?: Partial<ArticleUpdate> & { tags?: string[] };
  onSubmit: (data: ArticleFormData) => void;
  isLoading: boolean;
  className?: string;
}

export function ArticleEditor({
  initialData,
  onSubmit,
  isLoading,
  className,
}: ArticleEditorProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [summary, setSummary] = useState(initialData?.summary ?? '');
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialData?.cover_image_url ?? ''
  );
  const [isPublished, setIsPublished] = useState(
    initialData?.is_published ?? false
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tags ?? []
  );

  // Tag search state
  const [tagSearch, setTagSearch] = useState('');
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const fetchTags = useCallback(async (search: string) => {
    try {
      const res = await tagsApi.getTags({ search, per_page: 10 });
      setAvailableTags(res.data.items);
    } catch {
      setAvailableTags([]);
    }
  }, []);

  useEffect(() => {
    if (tagSearch.trim()) {
      const timeout = setTimeout(() => fetchTags(tagSearch), 300);
      return () => clearTimeout(timeout);
    }
    setAvailableTags([]);
  }, [tagSearch, fetchTags]);

  function addTag(tagName: string) {
    if (!selectedTags.includes(tagName)) {
      setSelectedTags((prev) => [...prev, tagName]);
    }
    setTagSearch('');
    setShowTagDropdown(false);
  }

  function removeTag(tagName: string) {
    setSelectedTags((prev) => prev.filter((t) => t !== tagName));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const data: ArticleFormData = {
      title: title.trim(),
      content,
      summary: summary.trim(),
      cover_image_url: coverImageUrl.trim() || undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      is_published: isPublished,
    };

    onSubmit(data);
  }

  const filteredTags = availableTags.filter(
    (tag) => !selectedTags.includes(tag.name)
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-6', className)}
    >
      {/* Title */}
      <div className="space-y-1.5">
        <label
          htmlFor="article-title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="article-title"
          type="text"
          required
          placeholder="An engaging title for your article"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          className={cn(
            'block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base font-semibold text-gray-900 placeholder-gray-400 transition-colors',
            'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
            'disabled:cursor-not-allowed disabled:opacity-60'
          )}
        />
      </div>

      {/* Tags */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">
          Tags
        </label>

        {/* Selected tags */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pb-1">
            {selectedTags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1">
                <TagBadge name={tag} />
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="rounded-full p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  aria-label={`Remove ${tag}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Tag search input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search tags..."
            value={tagSearch}
            onChange={(e) => {
              setTagSearch(e.target.value);
              setShowTagDropdown(true);
            }}
            onFocus={() => {
              if (tagSearch.trim()) setShowTagDropdown(true);
            }}
            onBlur={() => {
              // Delay to allow click on dropdown
              setTimeout(() => setShowTagDropdown(false), 200);
            }}
            disabled={isLoading}
            className={cn(
              'block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors',
              'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
              'disabled:cursor-not-allowed disabled:opacity-60'
            )}
          />

          {/* Dropdown */}
          {showTagDropdown && filteredTags.length > 0 && (
            <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              {filteredTags.map((tag) => (
                <li key={tag.id}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => addTag(tag.name)}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <span>{tag.name}</span>
                    <span className="text-xs text-gray-400">
                      {tag.usage_count} uses
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Cover image URL */}
      <div className="space-y-1.5">
        <label
          htmlFor="article-cover"
          className="block text-sm font-medium text-gray-700"
        >
          Cover image URL
        </label>
        <div className="relative">
          <Image className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="article-cover"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            disabled={isLoading}
            className={cn(
              'block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors',
              'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
              'disabled:cursor-not-allowed disabled:opacity-60'
            )}
          />
        </div>
        {coverImageUrl && (
          <div className="mt-2 overflow-hidden rounded-lg border border-gray-200">
            <img
              src={coverImageUrl}
              alt="Cover preview"
              className="h-32 w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <MarkdownEditor
          value={content}
          onChange={setContent}
          placeholder="Write your article content in Markdown..."
          minHeight="400px"
        />
      </div>

      {/* Summary */}
      <div className="space-y-1.5">
        <label
          htmlFor="article-summary"
          className="block text-sm font-medium text-gray-700"
        >
          Summary
        </label>
        <textarea
          id="article-summary"
          required
          rows={3}
          placeholder="A short summary that appears in article listings..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          disabled={isLoading}
          className={cn(
            'block w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors',
            'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
            'disabled:cursor-not-allowed disabled:opacity-60'
          )}
        />
      </div>

      {/* Publish toggle and submit */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        {/* Publish / Draft toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={isPublished}
            onClick={() => setIsPublished((v) => !v)}
            disabled={isLoading}
            className={cn(
              'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              isPublished
                ? 'bg-blue-600'
                : 'bg-gray-200',
              'disabled:cursor-not-allowed disabled:opacity-60'
            )}
          >
            <span
              className={cn(
                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
                isPublished ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </button>
          <span className="text-sm font-medium text-gray-700">
            {isPublished ? 'Publish' : 'Save as draft'}
          </span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading || !title.trim() || !content.trim()}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors',
            'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-60'
          )}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading
            ? 'Saving...'
            : isPublished
              ? 'Publish article'
              : 'Save draft'}
        </button>
      </div>
    </form>
  );
}
