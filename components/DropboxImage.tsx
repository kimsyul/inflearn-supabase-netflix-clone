'use client';

import { Button } from '*/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { deleteFile } from 'actions/storageActions';
import { queryClient } from 'config/ReactQueryProvider';
import { Loader2 } from 'lucide-react';
import { getImageUrl } from 'utils/supabase/storage';

export default function DropboxImage({ image }) {
  const deleteFileMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['images'],
      });
    },
  });

  return (
    <div className="relative w-full flex flex-col gap-2 p-4 border border-gray-100 rounded-2xl shadow-md">
      <div>
        <img src={getImageUrl(image.name)} className="w-full aspect-square rounded-2xl" />
      </div>
      <div>{image.name}</div>
      <div>{new Date(image.updated_at).toLocaleTimeString()}</div>
      <div>
        <Button
          onClick={() => {
            deleteFileMutation.mutate(image.name);
          }}
          variant="destructive"
          className="absolute top-4 right-4">
          {deleteFileMutation.isPending ? <Loader2 /> : <i className="fas fa-trash" />}
        </Button>
      </div>
    </div>
  );
}
