import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Upload,
  FileText,
  Video,
  File,
  CheckCircle,
  AlertCircle,
  Trash2,
  Download,
  Eye,
  Menu,
  Users,
  Bell,
  User,
  Settings,
} from 'lucide-react';

const UploadMaterials = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [course, setCourse] = useState('');
  const [unit, setUnit] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const recentUploads = [
    { 
      id: 1,
      file: 'Unit7_DeepLearning.pdf', 
      course: 'Intro to AI', 
      size: '2.4 MB', 
      date: 'Today',
      type: 'PDF',
      uploadedBy: 'Dr. Sarah Mbeki',
      status: 'Published',
    },
    { 
      id: 2,
      file: 'Lecture8_Marketing.mp4', 
      course: 'Business Admin', 
      size: '84 MB', 
      date: 'Yesterday',
      type: 'Video',
      uploadedBy: 'Prof. James Otieno',
      status: 'Processing',
    },
    { 
      id: 3,
      file: 'Unit4_Networks.pptx', 
      course: 'Computer Studies', 
      size: '6.1 MB', 
      date: 'May 16',
      type: 'Presentation',
      uploadedBy: 'Dr. Alice Wanjiku',
      status: 'Published',
    },
    { 
      id: 4,
      file: 'Theology_Unit3_Notes.pdf', 
      course: 'Theology', 
      size: '1.2 MB', 
      date: 'May 15',
      type: 'PDF',
      uploadedBy: 'Rev. Peter Maina',
      status: 'Published',
    },
  ];

  const handleSignOut = () => {
    navigate('/');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setSelectedFiles([]);
      setCourse('');
      setUnit('');
      setType('');
      setDescription('');
    }, 2000);
  };

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'PDF': return <FileText size={14} className="text-[#4a6a9b]" />;
      case 'Video': return <Video size={14} className="text-[#7a5b9e]" />;
      case 'Presentation': return <File size={14} className="text-[#d4a34b]" />;
      default: return <FileText size={14} className="text-[#9b9288]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Published': return 'bg-[#eef5f0] text-[#4a7c5e]';
      case 'Processing': return 'bg-[#fef5e8] text-[#d4a34b]';
      default: return 'bg-[#f0ece6] text-[#9b9288]';
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f6f2] overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif]" style={{ fontFamily: "Georgia, serif" }}>
      {/* Sidebar - same refined style */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white/40 backdrop-blur-xl text-[#2c2824] flex flex-col shrink-0 border-r border-[#e8e2d9] shadow-sm transition-all duration-300`}>
        {/* Logo area */}
        <div className={`p-6 border-b border-[#e8e2d9] ${isSidebarCollapsed ? 'px-4' : ''}`}>
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-10 h-10 bg-linear-to-br from-[#4a6a9b] to-[#2c4a7a] rounded-xl flex items-center justify-center shadow-sm shrink-0">
              <img src="/logo.png" alt="Trilevel Logo" className="w-10 h-10 object-contain" />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <div className="font-semibold text-xl tracking-tight bg-linear-to-r from-[#2c2824] to-[#5a5248] bg-clip-text text-transparent">Inleed</div>
                <div className="text-[10px] tracking-[0.2em] text-[#9b9288] uppercase">Admin Portal</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className={`text-[10px] tracking-[0.2em] text-[#b0a89e] uppercase mb-3 ${isSidebarCollapsed ? 'text-center px-1' : 'px-3'}`}>
            {!isSidebarCollapsed ? 'Main' : '≡'}
          </div>
          <ul className="space-y-1.5">
            {[
              { icon: <Menu size={18} />, label: "Dashboard", path: "/admin/dashboard" },
              { icon: <Users size={18} />, label: "Students", path: "/admin/manage-students" },
              { icon: <BookOpen size={18} />, label: "Courses", path: "/admin/manage-courses" },
              { icon: <Upload size={18} />, label: "Approvals", path: "/admin/approvals" },
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-[#4a6a9b]/10 text-[#2c4a7a] font-medium' 
                      : 'text-[#6b645a] hover:bg-[#eae5dd] hover:text-[#2c2824]'
                  }`}
                >
                  {item.icon}
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>

          <div className={`text-[10px] tracking-[0.2em] text-[#b0a89e] uppercase mb-3 mt-8 ${isSidebarCollapsed ? 'text-center px-1' : 'px-3'}`}>
            {!isSidebarCollapsed ? 'Account' : '⚙️'}
          </div>
          <ul className="space-y-1.5">
            {[
              { icon: <Bell size={18} />, label: "Notifications", path: "/admin/notifications" },
              { icon: <User size={18} />, label: "Profile", path: "/admin/profile" },
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-[#4a6a9b]/10 text-[#2c4a7a] font-medium' 
                      : 'text-[#6b645a] hover:bg-[#eae5dd] hover:text-[#2c2824]'
                  }`}
                >
                  {item.icon}
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-5 border-t border-[#e8e2d9] space-y-2">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-[#9b9288] text-xs hover:text-[#2c2824] transition flex items-center gap-2 w-full"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d={isSidebarCollapsed ? "m9 18 6-6-6-6" : "m15 18-6-6 6-6"} />
            </svg>
            {!isSidebarCollapsed && "Collapse sidebar"}
          </button>
          <button 
            onClick={handleSignOut}
            className="text-[#9b9288] text-xs hover:text-[#2c2824] transition flex items-center gap-2 w-full"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {!isSidebarCollapsed && "Sign out"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
       

        {/* Upload Content */}
        <div className="p-8">
          {/* Header Section */}
          <div className="mb-6">
            <p className="text-xs text-[#9b9288] tracking-wide">Add course materials</p>
            <h2 className="text-xl font-semibold text-[#2c2824] tracking-tight mt-1">
              Upload Resources
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Upload Area & Recent Uploads */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload Zone */}
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
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] flex items-center justify-center">
                    <Upload size={24} className="text-[#4a6a9b]" />
                  </div>
                  <h3 className="text-lg font-medium text-[#2c2824] mb-2">Drag & drop files here</h3>
                  <p className="text-sm text-[#9b9288] mb-4">PDF, DOCX, MP4, PPTX — up to 200 MB per file</p>
                  <button className="px-5 py-2.5 bg-white border border-[#e0d9d0] rounded-lg text-sm font-medium text-[#2c2824] hover:bg-[#faf8f5] transition inline-flex items-center gap-2">
                    <Upload size={14} />
                    Browse Files
                  </button>
                </div>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-5">
                  <h3 className="font-semibold text-[#2c2824] mb-3 flex items-center gap-2">
                    <FileText size={16} className="text-[#4a6a9b]" />
                    Selected Files ({selectedFiles.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#faf8f5] rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] flex items-center justify-center">
                            <FileText size={14} className="text-[#4a6a9b]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#2c2824]">{file.name}</p>
                            <p className="text-[10px] text-[#9b9288]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#d4a34b] hover:bg-[#fef5e8] transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Uploads Table */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] overflow-hidden">
                <div className="p-5 border-b border-[#e8e2d9] flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[#2c2824]">Recent Uploads</h3>
                    <p className="text-xs text-[#9b9288] mt-0.5">Latest materials added to courses</p>
                  </div>
                  <button className="text-xs text-[#4a6a9b] hover:underline">View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#faf8f5] border-b border-[#e8e2d9]">
                      <tr>
                        <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">File</th>
                        <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Course</th>
                        <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Size</th>
                        <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Status</th>
                        <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUploads.map((upload) => (
                        <tr key={upload.id} className="border-b border-[#e8e2d9] hover:bg-[#faf8f5] transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              {getFileIcon(upload.type)}
                              <span className="text-sm font-medium text-[#2c2824]">{upload.file}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm text-[#6b645a]">{upload.course}</td>
                          <td className="px-5 py-3 text-sm text-[#6b645a]">{upload.size}</td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(upload.status)}`}>
                              {upload.status}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <button className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#4a6a9b] hover:bg-[#e8f0fe] transition" title="Preview">
                                <Eye size={14} />
                              </button>
                              <button className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#4a7c5e] hover:bg-[#eef5f0] transition" title="Download">
                                <Download size={14} />
                              </button>
                              <button className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#d4a34b] hover:bg-[#fef5e8] transition" title="Delete">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column - Upload Form */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] flex items-center justify-center">
                    <Settings size={14} className="text-[#4a6a9b]" />
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
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                    >
                      <option value="">Select a course...</option>
                      <option>Introduction to AI</option>
                      <option>Diploma in AI</option>
                      <option>Business Administration</option>
                      <option>Social Work & Community Dev.</option>
                      <option>Hospitality Management</option>
                      <option>Theology</option>
                      <option>Computer Studies</option>
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
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Select type...</option>
                      <option>Lecture Notes (PDF)</option>
                      <option>Video Lecture</option>
                      <option>Presentation (PPTX)</option>
                      <option>Assignment</option>
                      <option>Past Paper</option>
                      <option>Supplementary Reading</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] mb-2 block font-medium">
                      Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2.5 bg-white border border-[#e0d9d0] rounded-lg text-sm text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/30 transition-all resize-none"
                      rows={3}
                      placeholder="Brief description of the material..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={handleUpload}
                    disabled={uploading || selectedFiles.length === 0}
                    className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      uploading || selectedFiles.length === 0
                        ? 'bg-[#f0ece6] text-[#9b9288] cursor-not-allowed'
                        : 'bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] text-white hover:from-[#3d5a86] hover:to-[#2c4a7a] shadow-sm'
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

              {/* Upload Tips */}
              <div className="bg-linear-to-br from-[#faf8f5] to-white rounded-xl border border-[#e8e2d9] p-5">
                <h3 className="font-semibold text-[#2c2824] mb-3 flex items-center gap-2">
                  <AlertCircle size={14} className="text-[#d4a34b]" />
                  Upload Tips
                </h3>
                <ul className="space-y-2 text-xs text-[#6b645a]">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-[#4a7c5e]" />
                    Use clear file names for easy identification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-[#4a7c5e]" />
                    Compress large videos before uploading
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-[#4a7c5e]" />
                    Add descriptive titles and descriptions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-[#4a7c5e]" />
                    Organize materials by unit/module
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default UploadMaterials;