import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Upload,
  FileText,
  Video,
  File,
  CheckCircle,
  AlertCircle,
  Trash2,
  Download,
  Eye,
} from 'lucide-react';
import AdminEmptyState from '../../components/AdminEmptyState';
import AdminLayout from '../../layouts/AdminLayout';
import { getCatalog, subscribeCatalog, getCourseById } from '../../data/courses';
import { useCourseResources } from '../../context/CourseResourcesContext';
import type { CourseResource, CourseResourceType } from '../../types/courseResource';
import {
  ACCEPTED_RESOURCE_EXTENSIONS,
  fileToResourceAttachment,
  formatFileSize,
  MAX_RESOURCE_FILE_BYTES,
} from '../../utils/fileUpload';
import ResourceFileAttachment from '../../components/course/ResourceFileAttachment';

const MATERIAL_TYPES: { value: string; label: string; resourceType: CourseResourceType }[] = [
  { value: 'lecture-notes', label: 'Lecture Notes (PDF)', resourceType: 'note' },
  { value: 'video', label: 'Video Lecture', resourceType: 'lesson' },
  { value: 'presentation', label: 'Presentation (PPTX)', resourceType: 'lesson' },
  { value: 'assignment', label: 'Assignment', resourceType: 'note' },
  { value: 'past-paper', label: 'Past Paper', resourceType: 'note' },
  { value: 'reading', label: 'Supplementary Reading', resourceType: 'note' },
];

function inferFileKind(mimeType: string, fileName: string): string {
  if (mimeType.startsWith('video/')) return 'Video';
  if (mimeType.includes('presentation') || fileName.endsWith('.pptx') || fileName.endsWith('.ppt'))
    return 'Presentation';
  if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) return 'PDF';
  return 'Document';
}

const UploadMaterials = () => {
  const [searchParams] = useSearchParams();
  const { resources, addResource, deleteResource } = useCourseResources();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [courseId, setCourseId] = useState('');
  const [unit, setUnit] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [description, setDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewResource, setPreviewResource] = useState<CourseResource | null>(null);

  useEffect(() => {
    const fromQuery = searchParams.get('course');
    if (fromQuery && getCourseById(Number(fromQuery))) {
      setCourseId(fromQuery);
    }
  }, [searchParams]);

  const recentUploads = useMemo(
    () =>
      [...resources]
        .filter((r) => r.file)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [resources]
  );

  const [courses, setCourses] = useState(() => getCatalog());

  useEffect(() => {
    const un = subscribeCatalog((list) => setCourses(list));
    return un;
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const addFiles = (files: File[]) => {
    setUploadError(null);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setSelectedFiles([]);
    setCourseId('');
    setUnit('');
    setMaterialType('');
    setDescription('');
    setUploadError(null);
  };

  const handleUpload = async () => {
    setUploadError(null);
    const parsedCourseId = Number(courseId);
    if (!parsedCourseId || !getCourseById(parsedCourseId)) {
      setUploadError('Please select a course.');
      return;
    }
    if (!materialType) {
      setUploadError('Please select a material type.');
      return;
    }
    if (selectedFiles.length === 0) {
      setUploadError('Please add at least one file to upload.');
      return;
    }

    const typeMeta = MATERIAL_TYPES.find((t) => t.value === materialType);
    if (!typeMeta) return;

    setUploading(true);
    try {
      for (const file of selectedFiles) {
        const attachment = await fileToResourceAttachment(file);
        const baseTitle = file.name.replace(/\.[^.]+$/, '');
        await addResource({
          courseId: parsedCourseId,
          type: typeMeta.resourceType,
          title: baseTitle,
          unit,
          content: description.trim()
            ? `${typeMeta.label}\n\n${description.trim()}`
            : typeMeta.label,
          file: attachment,
        });
      }
      resetForm();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (kind: string) => {
    switch (kind) {
      case 'Video':
        return <Video size={14} className="text-[#7a5b9e]" />;
      case 'Presentation':
        return <File size={14} className="text-[#d4a34b]" />;
      case 'PDF':
        return <FileText size={14} className="text-[#4a6a9b]" />;
      default:
        return <FileText size={14} className="text-[#9b9288]" />;
    }
  };

  const handleDeleteUpload = async (resource: CourseResource) => {
    if (window.confirm(`Remove "${resource.title}" from this course? Students will no longer see it.`)) {
      await deleteResource(resource.id);
      if (previewResource?.id === resource.id) setPreviewResource(null);
    }
  };

  return (
    <AdminLayout
      title="Upload Materials"
      subtitle="Upload files for a course — enrolled students see them on their course page"
      backTo="/admin/dashboard"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
              dragActive
                ? 'border-[#4a6a9b] bg-[#e8f0fe]/50'
                : 'border-[#e0d9d0] bg-white/40 hover:border-[#4a6a9b]/50 hover:bg-[#faf8f5]'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPTED_RESOURCE_EXTENSIONS}
              onChange={handleFileSelect}
              className="sr-only"
            />
            <div className="text-center pointer-events-none">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#e8f0fe] flex items-center justify-center">
                <Upload size={24} className="text-[#2563eb]" />
              </div>
              <h3 className="text-lg font-medium text-[#2c2824] mb-2">Drag & drop files here</h3>
              <p className="text-sm text-[#9b9288] mb-4">
                PDF, Office docs, images, text, ZIP — max {formatFileSize(MAX_RESOURCE_FILE_BYTES)} per file
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative z-10 mx-auto mt-2 flex px-5 py-2.5 bg-white border border-[#e0d9d0] rounded-lg text-sm font-medium text-[#2c2824] hover:bg-[#faf8f5] transition items-center gap-2"
            >
              <Upload size={14} />
              Browse Files
            </button>
          </div>

          {selectedFiles.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-5">
              <h3 className="font-semibold text-[#2c2824] mb-3 flex items-center gap-2">
                 <FileText size={16} className="text-[#2563eb]" />
                Selected Files ({selectedFiles.length})
              </h3>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-[#faf8f5] rounded-lg">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] flex items-center justify-center shrink-0">
                        <FileText size={14} className="text-[#2563eb]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#2c2824] truncate">{file.name}</p>
                        <p className="text-[10px] text-[#9b9288]">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#d4a34b] hover:bg-[#fef5e8] transition shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] overflow-hidden">
            <div className="p-5 border-b border-[#e8e2d9]">
              <h3 className="font-semibold text-[#2c2824]">Published Materials</h3>
              <p className="text-xs text-[#9b9288] mt-0.5">Visible to students enrolled in each course</p>
            </div>
            {recentUploads.length === 0 ? (
              <div className="p-6">
                <AdminEmptyState
                  icon={<Upload size={28} />}
                  title="No materials uploaded yet"
                  description="Select a course, choose a material type, add files, and click Upload Now. Students will see them under My Courses → Continue Learning."
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#faf8f5] border-b border-[#e8e2d9]">
                    <tr>
                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">File</th>
                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Course</th>
                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Unit</th>
                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Size</th>
                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUploads.map((upload) => {
                      const course = getCourseById(upload.courseId);
                      const kind = upload.file
                        ? inferFileKind(upload.file.mimeType, upload.file.fileName)
                        : 'Document';
                      return (
                        <tr key={upload.id} className="border-b border-[#e8e2d9] hover:bg-[#faf8f5] transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              {getFileIcon(kind)}
                              <span className="text-sm font-medium text-[#2c2824]">
                                {upload.file?.fileName ?? upload.title}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm text-[#6b645a] max-w-45">
                            <span className="line-clamp-2">{course?.title ?? 'Unknown'}</span>
                          </td>
                          <td className="px-5 py-3 text-sm text-[#6b645a]">{upload.unit}</td>
                          <td className="px-5 py-3 text-sm text-[#6b645a]">
                            {upload.file ? formatFileSize(upload.file.size) : '—'}
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              {upload.file && (
                                <button
                                  type="button"
                                  onClick={() => setPreviewResource(upload)}
                                  className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#4a6a9b] hover:bg-[#e8f0fe] transition"
                                  title="Preview"
                                >
                                  <Eye size={14} />
                                </button>
                              )}
                              {upload.file && (
                                <a
                                  href={upload.file.dataUrl}
                                  download={upload.file.fileName}
                                  className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#4a7c5e] hover:bg-[#eef5f0] transition inline-flex"
                                  title="Download"
                                >
                                  <Download size={14} />
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDeleteUpload(upload)}
                                className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#d4a34b] hover:bg-[#fef5e8] transition"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] flex items-center justify-center">
                <Upload size={14} className="text-[#4a6a9b]" />
              </div>
              <h3 className="font-semibold text-[#2c2824]">Upload Settings</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] mb-2 block font-medium">
                  Select Course
                </label>
                <select
                  className="w-full px-3 py-2.5 bg-white border border-[#e0d9d0] rounded-lg text-sm text-[#2c2824] focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/30 transition-all"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                >
                  <option value="">Select a course...</option>
                  {courses.map((c) => (
                    <option key={c.id} value={String(c.id)}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] mb-2 block font-medium">
                  Unit / Module
                </label>
                <input
                  className="w-full px-3 py-2.5 bg-white border border-[#e0d9d0] rounded-lg text-sm text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/30 transition-all"
                  placeholder="e.g., Unit 7 - Neural Networks"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] mb-2 block font-medium">
                  Material Type
                </label>
                <select
                  className="w-full px-3 py-2.5 bg-white border border-[#e0d9d0] rounded-lg text-sm text-[#2c2824] focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/30 transition-all"
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                >
                  <option value="">Select type...</option>
                  {MATERIAL_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] mb-2 block font-medium">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2.5 bg-white border border-[#e0d9d0] rounded-lg text-sm text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/30 transition-all resize-none"
                  rows={3}
                  placeholder="Brief description for students..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {uploadError && (
                <p className="text-xs text-[#b70c0c] bg-[#fef5f5] border border-[#f0d0d0] rounded-lg px-3 py-2">
                  {uploadError}
                </p>
              )}

              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading || selectedFiles.length === 0 || !courseId || !materialType}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  uploading || selectedFiles.length === 0 || !courseId || !materialType
                    ? 'bg-[#f0ece6] text-[#9b9288] cursor-not-allowed'
                    : 'bg-[#4a6a9b] text-white hover:bg-[#3d5a86] shadow-sm'
                }`}
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={14} />
                    Upload Now
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-[#faf8f5] rounded-xl border border-[#e8e2d9] p-5">
            <h3 className="font-semibold text-[#2c2824] mb-3 flex items-center gap-2">
              <AlertCircle size={14} className="text-[#d4a34b]" />
              Upload Tips
            </h3>
            <ul className="space-y-2 text-xs text-[#6b645a]">
              <li className="flex items-center gap-2">
                <CheckCircle size={12} className="text-[#4a7c5e] shrink-0" />
                Materials appear only for students enrolled in the selected course
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={12} className="text-[#4a7c5e] shrink-0" />
                Use clear file names and unit labels
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={12} className="text-[#4a7c5e] shrink-0" />
                Keep files under {formatFileSize(MAX_RESOURCE_FILE_BYTES)} for reliable storage
              </li>
            </ul>
          </div>
        </div>
      </div>

      {previewResource?.file && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#e8e2d9] shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e2d9] sticky top-0 bg-white">
              <h3 className="font-semibold text-[#2c2824] truncate pr-4">{previewResource.title}</h3>
              <button
                type="button"
                onClick={() => setPreviewResource(null)}
                className="text-sm text-[#6b645a] hover:text-[#2c2824]"
              >
                Close
              </button>
            </div>
            <div className="p-5">
              <ResourceFileAttachment file={previewResource.file} />
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UploadMaterials;
