import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, FileText, Filter, BookOpen, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { getNotes, incrementDownload } from '../utils/notesStore'

const SUBJECTS = ['All', 'Pharmaceutics', 'Pharmaceutical Chemistry', 'Pharmacognosy', 'Pharmacology',
  'Human Anatomy & Physiology', 'Biochemistry', 'Microbiology', 'Medicinal Chemistry',
  'Hospital Pharmacy', 'Clinical Pharmacy', 'Pharmacy Law & Ethics',
  'Biopharmaceutics', 'Industrial Pharmacy', 'Pharmaceutical Analysis', 'Other']

const CLASSES = ['All', 'D.Pharma 1st Year', 'D.Pharma 2nd Year',
  'B.Pharma Sem 1', 'B.Pharma Sem 2', 'B.Pharma Sem 3', 'B.Pharma Sem 4',
  'B.Pharma Sem 5', 'B.Pharma Sem 6', 'B.Pharma Sem 7', 'B.Pharma Sem 8',
  'M.Pharma Sem 1', 'M.Pharma Sem 2', 'M.Pharma Sem 3', 'M.Pharma Sem 4',
  'Pharm.D Year 1', 'Pharm.D Year 2', 'Pharm.D Year 3',
  'Pharm.D Year 4', 'Pharm.D Year 5', 'Pharm.D Year 6']

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [search, setSearch] = useState('')
  const [subject, setSubject] = useState('All')
  const [className, setClassName] = useState('All')
  const [loading, setLoading] = useState(true)

  const fetchNotes = useCallback(() => {
    setLoading(true)
    try {
      let all = getNotes()
      if (subject !== 'All') all = all.filter(n => n.subject === subject)
      if (className !== 'All') all = all.filter(n => n.className === className)
      if (search.trim()) {
        const q = search.trim().toLowerCase()
        all = all.filter(n =>
          n.title.toLowerCase().includes(q) ||
          n.subject.toLowerCase().includes(q) ||
          (n.description || '').toLowerCase().includes(q)
        )
      }
      setNotes(all)
    } finally {
      setLoading(false)
    }
  }, [subject, className, search])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const handleDownload = async (note) => {
    try {
      if (note.fileData) {
        // base64 stored locally — trigger browser download
        const a = document.createElement('a')
        a.href = note.fileData
        a.download = note.fileName || `${note.title}.pdf`
        a.click()
      } else if (note.fileUrl) {
        window.open(note.fileUrl, '_blank')
      } else {
        toast.error('File not available')
        return
      }
      incrementDownload(note._id)
      setNotes(prev => prev.map(n =>
        n._id === note._id ? { ...n, downloads: (n.downloads || 0) + 1 } : n
      ))
      toast.success('Download started!')
    } catch {
      toast.error('Download failed. Please try again.')
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="py-20" style={{ background: 'linear-gradient(135deg,#022c22 0%,#064e3b 50%,#134e4a 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 border rounded-full px-4 py-2 mb-4"
              style={{ background: 'rgba(5,150,105,0.2)', borderColor: 'rgba(5,150,105,0.4)' }}>
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm">Pharmacy Study Materials</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Study{' '}
              <span style={{ background: 'linear-gradient(to right,#34d399,#2dd4bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Notes
              </span>
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto">
              Free semester-wise notes for D.Pharma, B.Pharma & M.Pharma. Download PDFs instantly.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="card p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input className="input-field pl-10"
                placeholder="Search notes by title or subject..."
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-400 shrink-0" />
              <select className="input-field w-auto" value={subject} onChange={e => setSubject(e.target.value)}>
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
              <select className="input-field w-auto" value={className} onChange={e => setClassName(e.target.value)}>
                {CLASSES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Count bar */}
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold text-sm">Available Notes</span>
          <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs px-2 py-0.5 rounded-full">
            {notes.length} notes
          </span>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">No notes found</p>
            <p className="text-sm mt-1">Try different filters or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, i) => (
              <motion.div key={note._id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="card p-6 hover:-translate-y-1 group">
                {/* Top */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                    style={{ background: 'linear-gradient(135deg,#059669,#0d9488)' }}>
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1.5 line-clamp-2 leading-snug">{note.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                        {note.subject}
                      </span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                        {note.className}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {note.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                    {note.description}
                  </p>
                )}

                {/* Tags */}
                {note.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {note.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded-full">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {(note.downloads || 0).toLocaleString()} downloads
                  </span>
                  <button onClick={() => handleDownload(note)}
                    className="flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-90 hover:scale-105"
                    style={{ background: 'linear-gradient(to right,#059669,#0d9488)' }}>
                    <Download className="w-3 h-3" /> Download PDF
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
