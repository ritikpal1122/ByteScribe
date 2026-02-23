import { create } from 'zustand';

interface EditorState {
  language: string;
  code: string;
  fontSize: number;
  theme: string;
  setLanguage: (language: string) => void;
  setCode: (code: string) => void;
  setFontSize: (fontSize: number) => void;
  setTheme: (theme: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  language: 'python',
  code: '',
  fontSize: 14,
  theme: 'vs-dark',
  setLanguage: (language) => set({ language }),
  setCode: (code) => set({ code }),
  setFontSize: (fontSize) => set({ fontSize }),
  setTheme: (theme) => set({ theme }),
}));
