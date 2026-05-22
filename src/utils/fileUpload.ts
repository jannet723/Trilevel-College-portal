export const MAX_RESOURCE_FILE_BYTES = 8 * 1024 * 1024; // 8 MB

export const ACCEPTED_RESOURCE_EXTENSIONS =
  '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.md,.png,.jpg,.jpeg,.webp,.gif,.zip';

export const ACCEPTED_RESOURCE_MIME_PREFIXES = [
  'application/pdf',
  'application/msword',
  'application/vnd.',
  'text/',
  'image/',
  'application/zip',
];

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isAcceptedResourceFile(file: File): boolean {
  const ext = file.name.includes('.') ? file.name.split('.').pop()?.toLowerCase() : '';
  const allowedExt = ACCEPTED_RESOURCE_EXTENSIONS.replace(/\./g, '').split(',');
  if (ext && allowedExt.includes(ext)) return true;
  return ACCEPTED_RESOURCE_MIME_PREFIXES.some((prefix) => file.type.startsWith(prefix));
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('Could not read file'));
    };
    reader.onerror = () => reject(reader.error ?? new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

export async function fileToResourceAttachment(file: File) {
  if (!isAcceptedResourceFile(file)) {
    throw new Error('File type not supported. Use PDF, Office docs, images, text, or ZIP.');
  }
  if (file.size > MAX_RESOURCE_FILE_BYTES) {
    throw new Error(`File is too large. Maximum size is ${formatFileSize(MAX_RESOURCE_FILE_BYTES)}.`);
  }
  const dataUrl = await readFileAsDataUrl(file);
  return {
    fileName: file.name,
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
    dataUrl,
  };
}

export function isImageMime(mimeType: string) {
  return mimeType.startsWith('image/');
}

export function isPdfMime(mimeType: string) {
  return mimeType === 'application/pdf';
}
