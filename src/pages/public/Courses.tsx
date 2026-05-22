import { Link } from 'react-router-dom'

const Courses = () => {
  const courses = [
    { id: 1, title: 'Introduction to Computer Science', description: 'Learn the fundamentals of programming and computer science', level: 'Beginner' },
    { id: 2, title: 'Web Development', description: 'Build modern web applications using HTML, CSS, and JavaScript', level: 'Intermediate' },
    { id: 3, title: 'Data Science', description: 'Analyze data and build predictive models using Python', level: 'Advanced' },
    { id: 4, title: 'Mobile App Development', description: 'Create native mobile applications for iOS and Android', level: 'Intermediate' },
    { id: 5, title: 'Machine Learning', description: 'Understand and implement machine learning algorithms', level: 'Advanced' },
    { id: 6, title: 'Cloud Computing', description: 'Learn to deploy and manage applications in the cloud', level: 'Intermediate' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600">Trilevel College Portal</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">About</Link>
              <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Courses</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mb-3">
                {course.level}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <Link 
                to="/login" 
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Enroll Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Courses
