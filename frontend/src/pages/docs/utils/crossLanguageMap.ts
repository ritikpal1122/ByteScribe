/* ================================================================== */
/*  Cross-Language Concept Mapping                                     */
/*  Maps canonical concept IDs to entry IDs in each language           */
/* ================================================================== */

export interface CrossLanguageMapping {
  conceptId: string;
  label: string;
  entries: Partial<Record<string, string>>; // langId -> entryId
}

export const CROSS_LANGUAGE_CONCEPTS: CrossLanguageMapping[] = [
  { conceptId: 'hello-world', label: 'Hello World', entries: { python: 'introduction', javascript: 'what-is-javascript', cpp: 'hello-world', java: 'hello-world', go: 'hello-world', rust: 'hello-world' } },
  { conceptId: 'variables', label: 'Variables', entries: { python: 'variables', javascript: 'variables-and-types', cpp: 'variables', java: 'variables', go: 'variables', rust: 'variables' } },
  { conceptId: 'data-types', label: 'Data Types', entries: { python: 'numbers', javascript: 'variables-and-types', cpp: 'data-types', java: 'data-types', go: 'basic-types', rust: 'data-types' } },
  { conceptId: 'strings', label: 'Strings', entries: { python: 'strings', javascript: 'template-literals', cpp: 'strings', java: 'strings', go: 'strings', rust: 'strings' } },
  { conceptId: 'arrays-lists', label: 'Arrays / Lists', entries: { python: 'lists', javascript: 'arrays', cpp: 'arrays', java: 'arrays', go: 'slices', rust: 'vectors' } },
  { conceptId: 'maps-dicts', label: 'Maps / Dicts', entries: { python: 'dictionaries', javascript: 'objects', cpp: 'maps', java: 'hashmaps', go: 'maps', rust: 'hashmaps' } },
  { conceptId: 'conditionals', label: 'Conditionals', entries: { python: 'if-statements', javascript: 'conditionals', cpp: 'if-else', java: 'if-else', go: 'if-else', rust: 'if-expressions' } },
  { conceptId: 'loops', label: 'Loops', entries: { python: 'for-loops', javascript: 'loops', cpp: 'loops', java: 'loops', go: 'for-loops', rust: 'loops' } },
  { conceptId: 'functions', label: 'Functions', entries: { python: 'defining-functions', javascript: 'functions', cpp: 'functions', java: 'methods', go: 'functions', rust: 'functions' } },
  { conceptId: 'classes-oop', label: 'Classes / OOP', entries: { python: 'classes', javascript: 'classes', cpp: 'classes', java: 'classes', go: 'structs', rust: 'structs' } },
  { conceptId: 'error-handling', label: 'Error Handling', entries: { python: 'error-handling', javascript: 'error-handling', cpp: 'exceptions', java: 'exceptions', go: 'error-handling', rust: 'result-option' } },
  { conceptId: 'modules', label: 'Modules / Imports', entries: { python: 'importing-modules', javascript: 'modules', cpp: 'headers', java: 'packages', go: 'packages', rust: 'modules' } },
  { conceptId: 'closures', label: 'Closures', entries: { python: 'lambda-functions', javascript: 'closures', cpp: 'lambdas', java: 'lambdas', go: 'closures', rust: 'closures' } },
  { conceptId: 'concurrency', label: 'Concurrency', entries: { python: 'threading', javascript: 'promises', cpp: 'threads', java: 'threads', go: 'goroutines', rust: 'concurrency' } },
  { conceptId: 'iterators', label: 'Iterators', entries: { python: 'iterators', javascript: 'iterators', cpp: 'iterators', java: 'iterators', go: 'range', rust: 'iterators' } },
  { conceptId: 'generics', label: 'Generics / Templates', entries: { python: 'type-hints', javascript: 'generics-ts', cpp: 'templates', java: 'generics', go: 'generics', rust: 'generics' } },
  { conceptId: 'testing', label: 'Testing', entries: { python: 'unittest', javascript: 'testing', cpp: 'testing', java: 'junit', go: 'testing', rust: 'testing' } },
  { conceptId: 'string-methods', label: 'String Methods', entries: { python: 'str-upper', javascript: 'str-toUpperCase', cpp: 'str-methods', java: 'str-methods', go: 'strings-package', rust: 'str-methods' } },
  { conceptId: 'sorting', label: 'Sorting', entries: { python: 'sorted', javascript: 'arr-sort', cpp: 'std-sort', java: 'collections-sort', go: 'sort-package', rust: 'vec-sort' } },
  { conceptId: 'file-io', label: 'File I/O', entries: { python: 'file-io', javascript: 'fs-module', cpp: 'file-io', java: 'file-io', go: 'file-io', rust: 'file-io' } },
];

export function findConceptEntries(
  conceptId: string,
): Partial<Record<string, string>> {
  const concept = CROSS_LANGUAGE_CONCEPTS.find(
    (c) => c.conceptId === conceptId,
  );
  return concept?.entries ?? {};
}

export function findConceptByEntryId(
  langId: string,
  entryId: string,
): CrossLanguageMapping | undefined {
  return CROSS_LANGUAGE_CONCEPTS.find(
    (c) => c.entries[langId] === entryId,
  );
}
