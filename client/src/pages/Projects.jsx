import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/react'
import { Loader, AlertCircle, FileText, Image, BookOpen, MessageSquare, X, Copy, Download, Check } from 'lucide-react'

const Projects = () => {
  const { getToken } = useAuth()
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [projectTypes, setProjectTypes] = useState(['All'])
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const typeLabels = {
    blog: 'Blog Titles',
    article: 'Articles',
    image: 'Generated Images',
    custom: 'Custom Projects',
  }

  const typeIcons = {
    blog: <BookOpen size={16} className='text-blue-600' />,
    article: <FileText size={16} className='text-green-600' />,
    image: <Image size={16} className='text-purple-600' />,
    custom: <MessageSquare size={16} className='text-orange-600' />,
  }

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const token = await getToken()

      const response = await fetch('http://localhost:3000/api/ai/history?limit=100', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load projects')
      }

      if (data.success) {
        const sortedProjects = (data.items || []).sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
        setProjects(sortedProjects)

        // Extract unique types
        const types = ['All', ...new Set(sortedProjects.map((p) => p.type))]
        setProjectTypes(types)
        setFilteredProjects(sortedProjects)
      }
    } catch (err) {
      setError(err.message || 'Failed to load projects')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [getToken])

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
    if (filter === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((p) => p.type === filter))
    }
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    setCopied(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
    setCopied(false)
  }

  const handleCopyContent = async () => {
    if (!selectedProject) return

    try {
      await navigator.clipboard.writeText(selectedProject.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownloadImage = () => {
    if (!selectedProject) return

    const link = document.createElement('a')
    link.href = selectedProject.content
    link.download = `quicksol-${selectedProject.id}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getPreviewText = (content, type) => {
    if (type === 'image') {
      return '(Generated Image)'
    }
    if (!content || typeof content !== 'string') return ''
    return content.substring(0, 120) + (content.length > 120 ? '...' : '')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className='w-full h-full overflow-auto p-6 text-slate-700'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900 mb-2'>Your Projects</h1>
        <p className='text-slate-600'>Manage and view all your AI-generated projects</p>
      </div>

      {error && (
        <div className='mb-6 flex items-start gap-3 rounded-lg bg-red-50 px-4 py-3 border border-red-200'>
          <AlertCircle size={18} className='text-red-600 mt-0.5 shrink-0' />
          <p className='text-sm font-medium text-red-800'>{error}</p>
        </div>
      )}

      {/* Filter Buttons */}
      <div className='mb-6 flex flex-wrap gap-2'>
        {projectTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(type)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedFilter === type
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {type === 'All' ? 'All' : typeLabels[type] || type}
          </button>
        ))}
      </div>

      {/* Projects List */}
      {loading ? (
        <div className='flex flex-col items-center justify-center py-12'>
          <Loader size={40} className='animate-spin text-primary mb-4' />
          <p className='text-slate-600 font-medium'>Loading your projects...</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className='space-y-4'>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition cursor-pointer hover:border-violet-300'
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100'>
                      {typeIcons[project.type] || <FileText size={16} />}
                    </div>
                    <div className='flex flex-wrap items-center gap-2'>
                      <span className='text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700'>
                        {typeLabels[project.type] || project.type}
                      </span>
                      <span className='text-xs text-slate-500'>
                        {formatDate(project.created_at)}
                      </span>
                    </div>
                  </div>

                  <h3 className='text-lg font-semibold text-slate-900 mb-2 line-clamp-2'>
                    {project.prompt}
                  </h3>

                  <p className='text-sm text-slate-600 line-clamp-2'>
                    {getPreviewText(project.content, project.type)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex min-h-[24rem] flex-col items-center justify-center text-center'>
          <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400'>
            <FileText size={32} />
          </div>
          <h2 className='text-xl font-semibold text-slate-800 mb-2'>
            {selectedFilter === 'All'
              ? 'No projects yet'
              : `No ${typeLabels[selectedFilter] || selectedFilter} projects`}
          </h2>
          <p className='text-slate-600 max-w-sm'>
            {selectedFilter === 'All'
              ? 'Start creating AI projects to see them here'
              : `Try a different filter or create a new ${typeLabels[selectedFilter] || selectedFilter.toLowerCase()} project`}
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            {/* Modal Header */}
            <div className='sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white p-6 z-10'>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100'>
                  {typeIcons[selectedProject.type] || <FileText size={18} />}
                </div>
                <div>
                  <h2 className='text-xl font-semibold text-slate-900'>
                    {typeLabels[selectedProject.type] || selectedProject.type}
                  </h2>
                  <p className='text-xs text-slate-500'>
                    {formatDate(selectedProject.created_at)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className='rounded-lg hover:bg-slate-100 p-2 transition'
              >
                <X size={20} className='text-slate-600' />
              </button>
            </div>

            {/* Modal Content */}
            <div className='p-6'>
              {/* Prompt/Title */}
              <div className='mb-6'>
                <h3 className='text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wide'>
                  Topic / Prompt
                </h3>
                <p className='text-base text-slate-800 bg-slate-50 rounded-lg p-4 border border-slate-200'>
                  {selectedProject.prompt}
                </p>
              </div>

              {/* Content Section */}
              {selectedProject.type === 'image' ? (
                <div>
                  <h3 className='text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide'>
                    Generated Image
                  </h3>
                  <img
                    src={selectedProject.content}
                    alt='Generated'
                    className='w-full rounded-lg border border-slate-200 mb-6 max-h-96 object-cover'
                  />
                </div>
              ) : (
                <div>
                  <h3 className='text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide'>
                    Content
                  </h3>
                  <div className='bg-slate-50 rounded-lg border border-slate-200 p-4 mb-6'>
                    <pre className='text-sm text-slate-800 whitespace-pre-wrap break-words font-mono'>
                      {selectedProject.content}
                    </pre>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className='flex gap-3'>
                {selectedProject.type === 'image' ? (
                  <button
                    onClick={handleDownloadImage}
                    className='flex-1 flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 text-white font-semibold hover:bg-violet-700 transition'
                  >
                    <Download size={18} />
                    Download Image
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCopyContent}
                      className='flex-1 flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 text-white font-semibold hover:bg-violet-700 transition'
                    >
                      {copied ? (
                        <>
                          <Check size={18} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={18} />
                          Copy Content
                        </>
                      )}
                    </button>
                  </>
                )}
                <button
                  onClick={handleCloseModal}
                  className='flex-1 rounded-lg border border-slate-300 px-4 py-3 text-slate-700 font-semibold hover:bg-slate-50 transition'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects