import { useState, useEffect, useRef, useCallback } from "react";
import { Trash2 } from "lucide-react";
import { MarkdownEditor } from "@/components/common/MarkdownEditor";
import { useStepNote, useUpsertStepNote, useDeleteStepNote } from "@/hooks/useRoadmapSteps";

interface NotesTabProps {
  roadmapId: string;
  stepId: string;
}

const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "go",
  "rust",
  "sql",
  "bash",
  "other",
];

export default function NotesTab({ roadmapId, stepId }: NotesTabProps) {
  const { data: note, isLoading } = useStepNote(roadmapId, stepId);
  const upsert = useUpsertStepNote();
  const deleteNote = useDeleteStepNote();

  const [content, setContent] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [initialized, setInitialized] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Load existing note data
  useEffect(() => {
    if (!isLoading && !initialized) {
      setContent(note?.content ?? "");
      setCodeSnippet(note?.code_snippet ?? "");
      setLanguage(note?.language ?? "javascript");
      setInitialized(true);
    }
  }, [note, isLoading, initialized]);

  // Reset when step changes
  useEffect(() => {
    setInitialized(false);
  }, [stepId]);

  const debouncedSave = useCallback(
    (c: string, cs: string, lang: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        upsert.mutate({
          roadmapId,
          stepId,
          content: c,
          code_snippet: cs || null,
          language: lang || null,
        });
      }, 1000);
    },
    [roadmapId, stepId, upsert],
  );

  const handleContentChange = (val: string) => {
    setContent(val);
    debouncedSave(val, codeSnippet, language);
  };

  const handleCodeChange = (val: string) => {
    setCodeSnippet(val);
    debouncedSave(content, val, language);
  };

  const handleLanguageChange = (val: string) => {
    setLanguage(val);
    debouncedSave(content, codeSnippet, val);
  };

  const handleDelete = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    deleteNote.mutate({ roadmapId, stepId });
    setContent("");
    setCodeSnippet("");
    setLanguage("javascript");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10 text-gray-400 text-sm">
        Loading notes...
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Markdown content */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">
          Notes (Markdown)
        </label>
        <MarkdownEditor
          value={content}
          onChange={handleContentChange}
          placeholder="Write your study notes..."
          minHeight="150px"
        />
      </div>

      {/* Code snippet */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-gray-600">
            Code Snippet
          </label>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={codeSnippet}
          onChange={(e) => handleCodeChange(e.target.value)}
          placeholder="Paste or write code here..."
          className="w-full min-h-[120px] p-3 font-mono text-xs bg-gray-900 text-green-400 rounded-lg border border-gray-700 resize-y outline-none"
        />
      </div>

      {/* Delete button */}
      {(content || codeSnippet) && (
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            Delete Note
          </button>
        </div>
      )}

      {/* Save status */}
      {upsert.isPending && (
        <p className="text-[10px] text-gray-400 text-right">Saving...</p>
      )}
    </div>
  );
}
