import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import { Panel } from '../../components/UI'

const UploadMaterials = () => {
  const navigate = useNavigate()
  const [course, setCourse] = useState('')
  const [unit, setUnit] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')

  const handleSignOut = () => {
    navigate('/')
  }

  const recentUploads = [
    { file: 'Unit7_DeepLearning.pdf', course: 'Intro to AI', size: '2.4 MB', date: 'Today' },
    { file: 'Lecture8_Marketing.mp4', course: 'Business Admin', size: '84 MB', date: 'Yesterday' },
    { file: 'Unit4_Networks.pptx', course: 'Computer Studies', size: '6.1 MB', date: 'May 16' },
    { file: 'Theology_Unit3_Notes.pdf', course: 'Theology', size: '1.2 MB', date: 'May 15' },
  ]

  return (
    <DashboardLayout pageTitle="Upload Materials" role="admin" onSignOut={handleSignOut}>
      <div style={{ marginBottom: '20px' }}>
        <div className="sec-hd">
          <div>
            <h2>Upload Materials</h2>
            <p>Add lecture notes, videos and resources to any course</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '18px' }}>
        <div>
          <div className="upload-zone">
            <svg viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <h3>Drag & drop files here</h3>
            <p>PDF, DOCX, MP4, PPTX — up to 200 MB per file</p>
            <button className="cbtn" style={{ marginTop: '16px' }}>
              <svg viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Browse Files
            </button>
          </div>

          <Panel title="Recently Uploaded" action="View all">
            <table className="dtable">
              <thead>
                <tr>
                  <th>File</th>
                  <th>Course</th>
                  <th>Size</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentUploads.map((upload) => (
                  <tr key={upload.file}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📄 {upload.file}
                      </div>
                    </td>
                    <td>{upload.course}</td>
                    <td>{upload.size}</td>
                    <td>{upload.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

        <Panel title="Upload Settings">
          <div className="form-group">
            <label className="form-label">Select Course</label>
            <select
              className="form-input"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option>Introduction to AI</option>
              <option>Diploma in AI</option>
              <option>Business Administration</option>
              <option>Social Work</option>
              <option>Hospitality</option>
              <option>Theology</option>
              <option>Computer Studies</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Unit / Module</label>
            <input
              className="form-input"
              placeholder="e.g. Unit 7"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Material Type</label>
            <select
              className="form-input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Lecture Notes (PDF)</option>
              <option>Video Lecture</option>
              <option>Presentation (PPTX)</option>
              <option>Assignment</option>
              <option>Past Paper</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Brief description…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className="cbtn" style={{ width: '100%', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload Now
          </button>
        </Panel>
      </div>
    </DashboardLayout>
  )
}

export default UploadMaterials
