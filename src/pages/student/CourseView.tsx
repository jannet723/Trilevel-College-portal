import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Bell,
  User,
  Menu,
  ChevronLeft,
  Play,
  FileText,
  Video,
  FileQuestion,
  Download,
  Clock,
  CheckCircle,
  Calendar,
  Star,
  Award,
} from 'lucide-react';

const CourseView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState(0);

  // Mock course data
  const course = {
    title: 'Introduction to Artificial Intelligence',
    department: 'Technology',
    type: 'Certificate',
    progress: 68,
    instructor: 'Dr. Sarah Mbeki',
    duration: '8 weeks',
    enrolled: 'January 15, 2024',
    description: 'Fundamentals of AI, machine learning concepts, and real-world applications across Africa.',
    modules: [
      {
        title: 'Module 1: Introduction to AI',
        duration: '2 hours',
        completed: true,
        lessons: [
          { title: 'What is Artificial Intelligence?', type: 'video', duration: '15 min', completed: true },
          { title: 'History of AI', type: 'video', duration: '12 min', completed: true },
          { title: 'AI in Africa', type: 'reading', duration: '20 min', completed: true },
          { title: 'Module 1 Quiz', type: 'quiz', duration: '10 min', completed: true },
        ]
      },
      {
        title: 'Module 2: Machine Learning Fundamentals',
        duration: '3 hours',
        completed: true,
        lessons: [
          { title: 'Supervised Learning', type: 'video', duration: '18 min', completed: true },
          { title: 'Unsupervised Learning', type: 'video', duration: '15 min', completed: true },
          { title: 'Reinforcement Learning', type: 'video', duration: '20 min', completed: true },
          { title: 'ML Applications', type: 'reading', duration: '25 min', completed: true },
          { title: 'Module 2 Quiz', type: 'quiz', duration: '15 min', completed: true },
        ]
      },
      {
        title: 'Module 3: Neural Networks & Deep Learning',
        duration: '4 hours',
        completed: false,
        lessons: [
          { title: 'Neural Network Architecture', type: 'video', duration: '22 min', completed: true },
          { title: 'Training Neural Networks', type: 'video', duration: '25 min', completed: true },
          { title: 'Deep Learning Frameworks', type: 'video', duration: '20 min', completed: false },
          { title: 'Case Studies', type: 'reading', duration: '30 min', completed: false },
          { title: 'Module 3 Quiz', type: 'quiz', duration: '20 min', completed: false },
        ]
      },
      {
        title: 'Module 4: AI Ethics & Future',
        duration: '2.5 hours',
        completed: false,
        lessons: [
          { title: 'Ethical Considerations in AI', type: 'video', duration: '20 min', completed: false },
          { title: 'Bias in AI Systems', type: 'video', duration: '18 min', completed: false },
          { title: 'Future of AI', type: 'reading', duration: '25 min', completed: false },
          { title: 'Final Assessment', type: 'quiz', duration: '30 min', completed: false },
        ]
      }
    ]
  };

  const handleSignOut = () => {
    navigate('/');
  };

  const getLessonIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video size={16} />;
      case 'quiz': return <FileQuestion size={16} />;
      case 'reading': return <FileText size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch(type) {
      case 'video': return 'text-[#4a6a9b] bg-[#e8f0fe]';
      case 'quiz': return 'text-[#7a5b9e] bg-[#f3eef9]';
      case 'reading': return 'text-[#4a7c5e] bg-[#eef5f0]';
      default: return 'text-[#9b9288] bg-[#f0ece6]';
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f6f2] overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif]">
      {/* Sidebar - same refined style */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white/40 backdrop-blur-xl text-[#2c2824] flex flex-col shrink-0 border-r border-[#e8e2d9] shadow-sm transition-all duration-300`}>
       {/* Logo area - softer */}
        <div className="p-6 border-b border-[#e8e2d9]">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Trilevel Logo" className="w-15 h-15 object-contain" />
            <div>
              <div className="font-semibold text-xl tracking-tight bg-linear-to-r from-[#2c2824] to-[#5a5248] bg-clip-text text-transparent"> Trilevel College</div>
              <div className="text-[10px] tracking-[0.2em] text-[#9b9288] uppercase">Student Portal</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className={`text-[10px] tracking-[0.2em] text-[#b0a89e] uppercase mb-3 ${isSidebarCollapsed ? 'text-center px-1' : 'px-3'}`}>
            {!isSidebarCollapsed ? 'Main' : '≡'}
          </div>
          <ul className="space-y-1.5">
            {[
              { icon: <Menu size={18} />, label: "Dashboard", path: "/student/dashboard" },
              { icon: <BookOpen size={18} />, label: "My Courses", path: "/student/my-courses" },
              { icon: <Search size={18} />, label: "Browse Courses", path: "/student/courses" },
             
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
              { icon: <Bell size={18} />, label: "Notifications", path: "/student/notifications" },
              { icon: <User size={18} />, label: "Profile", path: "/student/profile" },
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
        {/* Course Content */}
        <div className="p-8">
          {/* Course Info Banner */}
          <div className="bg-linear-to-r from-[#1a1d24] to-[#2c2824] rounded-xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-size-[20px_20px]"></div>
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#4a6a9b]/20 text-[#8aabcf]">
                    {course.type}
                  </span>
                  <span className="text-[10px] text-[#b0a89e]">{course.department}</span>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">{course.title}</h2>
                <p className="text-gray-300 text-sm mb-4 max-w-2xl">{course.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>Enrolled: {course.enrolled}</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      className="text-white/10"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="48"
                      cy="48"
                    />
                    <circle
                      className="text-[#8aabcf] transition-all duration-500"
                      strokeWidth="4"
                      strokeDasharray={2 * Math.PI * 42}
                      strokeDashoffset={2 * Math.PI * 42 * (1 - course.progress / 100)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="48"
                      cy="48"
                    />
                  </svg>
                  <span className="absolute text-white font-semibold text-xl">{course.progress}%</span>
                </div>
                <p className="text-xs text-gray-300 mt-2">Overall Progress</p>
              </div>
            </div>
          </div>

          {/* Course Modules */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Modules List */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-lg font-semibold text-[#2c2824] mb-4">Course Modules</h3>
              {course.modules.map((module, moduleIndex) => (
                <div
                  key={moduleIndex}
                  className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveModule(activeModule === moduleIndex ? -1 : moduleIndex)}
                    className="w-full p-5 flex items-center justify-between hover:bg-[#faf8f5] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        module.completed
                          ? 'bg-linear-to-r from-[#eef5f0] to-[#e0ebe5] text-[#4a7c5e]'
                          : 'bg-[#f0ece6] text-[#b0a89e]'
                      }`}>
                        {module.completed ? <CheckCircle size={16} /> : <span className="text-sm font-medium">{moduleIndex + 1}</span>}
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-[#2c2824]">{module.title}</h4>
                        <p className="text-xs text-[#9b9288]">{module.duration}</p>
                      </div>
                    </div>
                    <ChevronLeft size={16} className={`transform transition-transform ${activeModule === moduleIndex ? '-rotate-90' : '-rotate-180'} text-[#b0a89e]`} />
                  </button>
                  
                  {activeModule === moduleIndex && (
                    <div className="border-t border-[#e8e2d9] p-4 space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-[#faf8f5] transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${getLessonTypeColor(lesson.type)}`}>
                              {getLessonIcon(lesson.type)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#2c2824]">{lesson.title}</p>
                              <p className="text-xs text-[#9b9288]">{lesson.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {lesson.completed ? (
                              <CheckCircle size={14} className="text-[#4a7c5e]" />
                            ) : (
                              <button className="px-3 py-1.5 bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] text-white rounded-lg text-xs font-medium hover:from-[#3d5a86] hover:to-[#2c4a7a] transition shadow-sm flex items-center gap-1">
                                <Play size={10} />
                                Start
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar - Course Resources */}
            <div className="space-y-6">
              {/* Resources */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-5">
                <h3 className="font-semibold text-[#2c2824] mb-4 flex items-center gap-2">
                  <Star size={16} className="text-[#4a6a9b]" />
                  Course Resources
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Syllabus & Course Guide', type: 'PDF', size: '2.4 MB' },
                    { name: 'Lecture Slides - Module 1-2', type: 'PDF', size: '5.1 MB' },
                    { name: 'Additional Reading Materials', type: 'ZIP', size: '12.3 MB' },
                    { name: 'Python Notebook Examples', type: 'IPYNB', size: '3.7 MB' },
                  ].map((resource, idx) => (
                    <button key={idx} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#faf8f5] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] flex items-center justify-center">
                          <FileText size={14} className="text-[#4a6a9b]" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-[#2c2824] group-hover:text-[#4a6a9b] transition-colors">{resource.name}</p>
                          <p className="text-xs text-[#9b9288]">{resource.type} • {resource.size}</p>
                        </div>
                      </div>
                      <Download size={14} className="text-[#b0a89e] group-hover:text-[#4a6a9b] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Achievement */}
              <div className="bg-linear-to-br from-[#faf8f5] to-white rounded-xl border border-[#e8e2d9] p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Award size={24} className="text-[#4a7c5e]" />
                  <h3 className="font-semibold text-[#2c2824]">Course Achievement</h3>
                </div>
                <p className="text-sm text-[#6b645a] mb-3">Complete all modules to earn your certificate</p>
                <div className="h-2 bg-[#e8e2d9] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-[#4a7c5e] to-[#6b9b7e] rounded-full transition-all duration-500"
                    style={{ width: `${(course.modules.filter(m => m.completed).length / course.modules.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-[#9b9288] mt-2">
                  {course.modules.filter(m => m.completed).length} of {course.modules.length} modules completed
                </p>
              </div>

              {/* Next Up */}
              <div className="bg-linear-to-r from-[#e8f0fe] to-[#f3eef9] rounded-xl p-5">
                <h3 className="font-semibold text-[#2c2824] mb-2 flex items-center gap-2">
                  <Clock size={16} className="text-[#4a6a9b]" />
                  Next Up
                </h3>
                <p className="text-sm text-[#6b645a] mb-3">Continue where you left off</p>
                <button className="w-full py-2.5 bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] text-white rounded-lg text-sm font-medium hover:from-[#3d5a86] hover:to-[#2c4a7a] transition shadow-sm flex items-center justify-center gap-2">
                  <Play size={14} />
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseView;