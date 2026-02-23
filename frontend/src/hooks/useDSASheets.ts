import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as dsaSheetsApi from '../api/dsaSheets';

export function useDSASheets() {
  return useQuery({
    queryKey: ['dsa-sheets'],
    queryFn: () => dsaSheetsApi.getSheets(),
    select: (res) => res.data,
  });
}

export function useDSASheet(slug: string) {
  return useQuery({
    queryKey: ['dsa-sheets', slug],
    queryFn: () => dsaSheetsApi.getSheet(slug),
    select: (res) => res.data,
    enabled: !!slug,
  });
}

export function useMySheetProgress() {
  return useQuery({
    queryKey: ['dsa-sheets', 'my-progress'],
    queryFn: () => dsaSheetsApi.getMySheetProgress(),
    select: (res) => res.data,
  });
}

export function useToggleSheetProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sheetSlug, problemId }: { sheetSlug: string; problemId: string }) =>
      dsaSheetsApi.toggleProgress(sheetSlug, problemId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['dsa-sheets', variables.sheetSlug] });
    },
  });
}
