import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCreateQuestion } from '@/hooks/useQuestions';
import { MarkdownEditor } from '@/components/common/MarkdownEditor';
import { TagBadge } from '@/components/common/TagBadge';
import * as tagsApi from '@/api/tags';
import type { Tag } from '@/api/tags';

export default function QuestionCreate() {
  const navigate = useNavigate();
  const createMutation = useCreateQuestion();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Tag search state
  const [tagSearch, setTagSearch] = useState('');
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  /* ── Tag search ──────────────────────────────────────────── */

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

  /* ── Submit ──────────────────────────────────────────────── */

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    createMutation.mutate(
      {
        title: title.trim(),
        body,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
      },
      {
        onSuccess: (res) => {
          const slug = res.data.slug;
          navigate(`/questions/${slug}`, { replace: true });
        },
      },
    );
  }

  const filteredTags = availableTags.filter(
    (tag) => !selectedTags.includes(tag.name),
  );

  /* ── Render ──────────────────────────────────────────────── */

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back link */}
      <Link
        to="/questions"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Questions
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Ask a Question
      </h1>
      <p className="mt-2 text-gray-600">
        Describe your problem clearly. The more context you provide, the better
        answers you will receive.
      </p>

      {/* Error */}
      {createMutation.isError && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {createMutation.error instanceof Error
            ? createMutation.error.message
            : 'Failed to create question. Please try again.'}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Question title */}
        <div className="space-y-1.5">
          <label
            htmlFor="question-title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <p className="text-xs text-gray-500">
            Be specific and imagine you are asking a question to another person.
          </p>
          <input
            id="question-title"
            type="text"
            required
            placeholder="e.g. How to implement a binary search tree in Python?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={createMutation.isPending}
            className={cn(
              'block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors',
              'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
              'disabled:cursor-not-allowed disabled:opacity-60',
            )}
          />
        </div>

        {/* Body */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Body
          </label>
          <p className="text-xs text-gray-500">
            Include all the information someone would need to answer your
            question. Use Markdown for formatting.
          </p>
          <MarkdownEditor
            value={body}
            onChange={setBody}
            placeholder="Describe your question in detail..."
            minHeight="300px"
          />
        </div>

        {/* Tags */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <p className="text-xs text-gray-500">
            Add up to 5 tags to describe what your question is about.
          </p>

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
                setTimeout(() => setShowTagDropdown(false), 200);
              }}
              disabled={
                createMutation.isPending || selectedTags.length >= 5
              }
              className={cn(
                'block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors',
                'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
                'disabled:cursor-not-allowed disabled:opacity-60',
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

        {/* Submit */}
        <div className="flex items-center justify-end border-t border-gray-200 pt-6">
          <button
            type="submit"
            disabled={
              createMutation.isPending || !title.trim() || !body.trim()
            }
            className={cn(
              'inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors',
              'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-60',
            )}
          >
            {createMutation.isPending && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {createMutation.isPending ? 'Posting...' : 'Post Question'}
          </button>
        </div>
      </form>
    </div>
  );
}
