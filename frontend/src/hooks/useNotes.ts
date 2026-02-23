import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as notesApi from '../api/notes';
import type { NoteCreate, NoteUpdate } from '../api/notes';

export function useNotes(
  page: number = 1,
  perPage: number = 20,
  search?: string,
  tag?: string,
) {
  return useQuery({
    queryKey: ['notes', { page, perPage, search, tag }],
    queryFn: () =>
      notesApi.getNotes({ page, per_page: perPage, search, tag }),
    select: (res) => res.data,
  });
}

export function useNote(id: string) {
  return useQuery({
    queryKey: ['notes', id],
    queryFn: () => notesApi.getNote(id),
    select: (res) => res.data,
    enabled: !!id,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NoteCreate) => notesApi.createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: NoteUpdate }) =>
      notesApi.updateNote(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes', variables.id] });
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notesApi.deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}
