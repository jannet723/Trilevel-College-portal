import { useState } from 'react';
import { Download, ExternalLink, File, Image as ImageIcon, Play, FileText as FileTextIcon } from 'lucide-react';
import type { CourseResourceFile } from '../../types/courseResource';
import { formatFileSize, isImageMime, isPdfMime } from '../../utils/fileUpload';

interface ResourceFileAttachmentProps {
  file: CourseResourceFile;
  compact?: boolean;
}

const ResourceFileAttachment = ({ file, compact = false }: ResourceFileAttachmentProps) => {
  const isImage = isImageMime(file.mimeType);
  const isPdf = isPdfMime(file.mimeType);
  const isVideo = file.mimeType.startsWith('video/');
  const isText = file.mimeType.startsWith('text/') || file.fileName.endsWith('.md');
  const isOfficeDoc = file.mimeType.includes('officedocument') || file.mimeType.includes('word') || file.mimeType.includes('powerpoint') || file.mimeType.includes('spreadsheet') || file.fileName.match(/\.(doc|docx|xls|xlsx|ppt|pptx)$/i);
  
  const canPreview = isPdf || isImage || isVideo || isText;
  const [showTextPreview, setShowTextPreview] = useState(false);
  const [textContent, setTextContent] = useState<string>('');

  const handleViewText = async () => {
    if (textContent) {
      setShowTextPreview(true);
      return;
    }
    
    try {
      // Extract text content from data URL
      const dataUrl = file.dataUrl;
      if (dataUrl.startsWith('data:')) {
        const base64Data = dataUrl.split(',')[1];
        const binaryString = atob(base64Data);
        const text = binaryString;
        setTextContent(text);
        setShowTextPreview(true);
      }
    } catch (err) {
      console.error('Failed to extract text:', err);
    }
  };

  const getFileIcon = () => {
    if (isImage) return <ImageIcon size={16} />;
    if (isVideo) return <Play size={16} />;
    if (isText || isPdf) return <FileTextIcon size={16} />;
    return <File size={16} />;
  };

  const getFileTypeLabel = () => {
    if (isImage) return 'Image';
    if (isPdf) return 'PDF';
    if (isVideo) return 'Video';
    if (isText) return 'Text File';
    if (isOfficeDoc) return 'Document';
    return 'File';
  };

  return (
    <div className={`rounded-xl border border-[#e8e2d9]/70 bg-white overflow-hidden ${compact ? '' : 'mt-3'}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#faf8f5]/90 border-b border-[#e8e2d9]/50">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#e8f0fe] border border-[#d4e2f7] flex items-center justify-center shrink-0 text-[#4a6a9b]">
            {getFileIcon()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#2c2824] truncate">{file.fileName}</p>
            <p className="text-[10px] text-[#9b9288]">{getFileTypeLabel()} · {formatFileSize(file.size)}</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {canPreview && (
            <>
              {isText ? (
                <button
                  onClick={handleViewText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#e0d9d0] text-[#6b645a] hover:bg-white hover:text-[#4a6a9b] transition"
                >
                  <ExternalLink size={12} />
                  View
                </button>
              ) : (
                <a
                  href={file.dataUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#e0d9d0] text-[#6b645a] hover:bg-white hover:text-[#4a6a9b] transition"
                >
                  <ExternalLink size={12} />
                  Open
                </a>
              )}
            </>
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

      {/* Image Preview */}
      {isImage && !compact && (
        <div className="p-4 bg-[#f8f6f2]">
          <img
            src={file.dataUrl}
            alt={file.fileName}
            className="max-h-64 w-auto mx-auto rounded-lg border border-[#e8e2d9] object-contain"
          />
        </div>
      )}

      {/* PDF Preview */}
      {isPdf && !compact && (
        <div className="p-2 bg-[#f8f6f2]">
          <iframe
            title={file.fileName}
            src={file.dataUrl}
            className="w-full h-96 rounded-lg border border-[#e8e2d9] bg-white"
          />
        </div>
      )}

      {/* Video Preview */}
      {isVideo && !compact && (
        <div className="p-4 bg-[#f8f6f2]">
          <video
            controls
            className="max-h-96 w-full rounded-lg border border-[#e8e2d9] object-contain bg-black"
          >
            <source src={file.dataUrl} type={file.mimeType} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Text Preview Modal */}
      {showTextPreview && isText && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-[#e8e2d9]">
              <h3 className="text-lg font-semibold text-[#2c2824]">{file.fileName}</h3>
              <button
                onClick={() => setShowTextPreview(false)}
                className="text-[#9b9288] hover:text-[#2c2824] transition"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6 bg-[#f8f6f2]">
              <pre className="text-xs text-[#2c2824] whitespace-pre-wrap break-all font-mono">
                {textContent}
              </pre>
            </div>
            <div className="p-4 border-t border-[#e8e2d9] flex gap-2 justify-end">
              <button
                onClick={() => setShowTextPreview(false)}
                className="px-4 py-2 rounded-lg border border-[#e0d9d0] text-[#6b645a] hover:bg-white transition text-sm font-medium"
              >
                Close
              </button>
              <a
                href={file.dataUrl}
                download={file.fileName}
                className="px-4 py-2 rounded-lg bg-[#4a6a9b] text-white hover:bg-[#3d5a86] transition text-sm font-medium flex items-center gap-2"
              >
                <Download size={14} />
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceFileAttachment;
