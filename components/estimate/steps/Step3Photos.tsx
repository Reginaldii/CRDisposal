'use client';

import { useRef, useState } from 'react';
import { EstimateFormData, Photo } from '../types';
import { compressImage } from '@/lib/compressImage';
import { site } from '@/lib/site';
import { CameraIcon, UploadIcon, CloseIcon, MessageIcon } from '../../icons';

const MAX_PHOTOS = 20;

export default function Step3Photos({
  data,
  update,
}: {
  data: EstimateFormData;
  update: (patch: Partial<EstimateFormData>) => void;
}) {
  const [busyCount, setBusyCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const room = MAX_PHOTOS - data.photos.length;
    const toProcess = Array.from(files).slice(0, room);
    setBusyCount((c) => c + toProcess.length);

    const newPhotos: Photo[] = [];
    for (const file of toProcess) {
      try {
        const dataUrl = await compressImage(file);
        newPhotos.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, dataUrl, name: file.name });
      } catch {
        // skip files that fail to load/compress
      } finally {
        setBusyCount((c) => Math.max(0, c - 1));
      }
    }
    if (newPhotos.length) update({ photos: [...data.photos, ...newPhotos] });
  }

  function removePhoto(id: string) {
    update({ photos: data.photos.filter((p) => p.id !== id) });
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          Show us what needs to go.
        </h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">
          Optional, but photos help us quote accurately. Up to {MAX_PHOTOS}.
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          dragOver ? 'border-yellow-500 bg-yellow-500/5' : 'border-ink-900/15 dark:border-white/15'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/12 text-yellow-600 dark:text-yellow-400">
            <CameraIcon className="h-7 w-7" />
          </div>
          <p className="text-sm font-medium text-ink-600 dark:text-ink-300">
            Drag and drop, or tap to take/upload photos
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={data.photos.length >= MAX_PHOTOS}
            className="btn-dark disabled:opacity-40"
          >
            <UploadIcon className="h-4 w-4" />
            Add Photos ({data.photos.length}/{MAX_PHOTOS})
          </button>
        </div>
      </div>

      {(data.photos.length > 0 || busyCount > 0) && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {data.photos.map((p) => (
            <div key={p.id} className="group relative aspect-square overflow-hidden rounded-lg">
              {/* Compressed data URLs can't go through next/image's optimizer */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.dataUrl} alt={p.name} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(p.id)}
                aria-label="Remove photo"
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <CloseIcon className="h-3 w-3" />
              </button>
            </div>
          ))}
          {Array.from({ length: busyCount }).map((_, i) => (
            <div
              key={`busy-${i}`}
              className="flex aspect-square items-center justify-center rounded-lg bg-ink-900/5 dark:bg-white/5"
            >
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-500 border-t-transparent" />
            </div>
          ))}
        </div>
      )}

      <a
        href={site.smsHref}
        className="flex items-center justify-center gap-2 rounded-xl border border-ink-900/10 py-3 text-sm font-semibold text-ink-600 hover:border-yellow-500 dark:border-white/10 dark:text-ink-300"
      >
        <MessageIcon className="h-4 w-4 text-yellow-500" />
        Prefer to text photos instead? {site.phone}
      </a>
    </div>
  );
}
