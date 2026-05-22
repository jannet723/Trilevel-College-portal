import { Download, ExternalLink, File, Image as ImageIcon } from 'lucide-react';
import type { CourseResourceFile } from '../../types/courseResource';
import { formatFileSize, isImageMime, isPdfMime } from '../../utils/fileUpload';

interface ResourceFileAttachmentProps {
  file: CourseResourceFile;
  compact?: boolean;
}

const ResourceFileAttachment = ({ file, compact = false }: ResourceFileAttachmentProps) => {
  const isImage = isImageMime(file.mimeType);
  const isPdf = isPdfMime(file.mimeType);

  return (
    <div className={`rounded-xl border border-[#e8e2d9]/70 bg-white overflow-hidden ${compact ? '' : 'mt-3'}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#faf8f5]/90 border-b border-[#e8e2d9]/50">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#e8f0fe] border border-[#d4e2f7] flex items-center justify-center shrink-0 text-[#4a6a9b]">
            {isImage ? <ImageIcon size={16} /> : <File size={16} />}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#2c2824] truncate">{file.fileName}</p>
            <p className="text-[10px] text-[#9b9288]">{formatFileSize(file.size)}</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {(isPdf || isImage) && (
            <a
              href={file.dataUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#e0d9d0] text-[#6b645a] hover:bg-white hover:text-[#4a6a9b] transition"
            >
              <ExternalLink size={12} />
              View
            </a>
          )}
          <a
            href={file.dataUrl}
            download={file.fileName}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#4a6a9b]/10 text-[#4a6a9b] hover:bg-[#4a6a9b]/20 transition"
          >
            <Download size={12} />
            Download
          </a>
        </div>
      </div>
      {isImage && !compact && (
        <div className="p-4 bg-[#f8f6f2]">
          <img
            src={file.dataUrl}
            alt={file.fileName}
            className="max-h-64 w-auto mx-auto rounded-lg border border-[#e8e2d9] object-contain"
          />
        </div>
      )}
      {isPdf && !compact && (
        <div className="p-2 bg-[#f8f6f2]">
          <iframe
            title={file.fileName}
            src={file.dataUrl}
            className="w-full h-72 rounded-lg border border-[#e8e2d9] bg-white"
          />
        </div>
      )}
    </div>
  );
};

export default ResourceFileAttachment;
