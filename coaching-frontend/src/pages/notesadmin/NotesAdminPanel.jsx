import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LogOut, Plus, Trash2, FileText, Download,
  Search, X, Upload, BookOpen, Eye, Filter
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { getNotes, saveNote, deleteNote, generateId, fileToBase64 } from '../../utils/notesStore'
import logo from '../../assets/logo.png'

const SUBJECTS = [
  'Pharmaceutics', 'Pharmaceutical Chemistry', 'Pharmacognosy', 'Pharmacology',
  'Human Anatomy & Physiology', 'Biochemistry', 'Microbiology', 'Medicinal Chemistry',
  'Hospital Pharmacy', 'Clinical Pharmacy', 'Pharmacy Law & Ethics',
  'Biopharmaceutics', 'Industrial Pharmacy', 'Pharmaceutical Analysis', 'Other'
]

const CLASSES = [
  'D.Pharma 1st Year', 'D.Pharma 2nd Year',
  'B.Pharma Sem 1', 'B.Pharma Sem 2', 'B.Pharma Sem 3', 'B.Pharma Sem 4',
  'B.Pharma Sem 5', 'B.Pharma Sem 6', 'B.Pharma Sem 7', 'B.Pharma Sem 8',
  'M.Pharma Sem 1', 'M.Pharma Sem 2', 'M.Pharma Sem 3', 'M.Pharma Sem 4',
  'Pharm.D Year 1', 'Pharm.D Year 2', 'Pharm.D Year 3',
  'Pharm.D Year 4', 'Pharm.D Year 5', 'Pharm.D Year 6'
]

const emptyForm = {
  title: '', description: '', subject: 'Pharmaceutics',
  className: 'D.Pharma 1st Year', tags: ''
}

export default function NotesAdminPanel() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [notes, setNotes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [filterClass, setFilterClass] = useState('All')
  const [dragOver, setDragOver] = useState(false)

  const loadNotes = () => setNotes(getNotes())

  useEffect(() => { loadNotes() }, [])

  const handleLogout = () => { logout(); navigate('/notes-admin/login') }

  const openModal = () => { setForm(emptyForm); setFile(null); setShowModal(true) }

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return toast.error('Please select a PDF file')
    setUploading(true)
    try {
      const fileData = await fileToBase64(file)
      const note = {
        _id: generateId(),
        title: form.title,
        description: form.description,
        subject: form.subject,
        className: form.className,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        fileName: file.name,
        fileData,          // base64 — used for download
        fileUrl: null,     // no server URL
        downloads: 0,
        createdAt: new Date().toISOString(),
      }
      saveNote(note)
      toast.success('Note uploaded successfully!')
      setShowModal(false)
      loadNotes()
    } catch {
      toast.error('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return
    deleteNote(id)
    toast.success('Note deleted')
    loadNotes()
  }

  const filtered = notes.filter(n => {
    const q = search.toLowerCase()
    const matchSearch = n.title.toLowerCase().includes(q) || n.subject.toLowerCase().includes(q)
    const matchClass = filterClass === 'All' || n.className === filterClass
    return matchSearch && matchClass
  })

  const totalDownloads = notes.reduce((s, n) => s + (n.downloads || 0), 0)

  return (
    <div className="min-h-screen flex" style={{ background: '#0f172a' }}>

      {/* ── Sidebar ── */}
      <aside className="w-60 shrink-0 flex flex-col border-r hidden md:flex"
        style={{ background: '#111827', borderColor: 'rgba(5,150,105,0.2)' }}>
        {/* Logo */}
        <div className="p-5 border-b" style={{ borderColor: 'rgba(5,150,105,0.2)' }}>
          <div className="flex items-center gap-3">
            <img src={logo} alt="TalksBhati Pharmacy" className="h-9 w-auto" />
            <div>
              <div className="text-white font-bold text-sm">TalksBhati</div>
              <div className="text-emerald-400 text-xs">Notes Admin</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white"
            style={{ background: 'rgba(5,150,105,0.2)', border: '1px solid rgba(5,150,105,0.3)' }}>
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Notes Manager
          </div>
          <Link to="/notes" target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <Eye className="w-4 h-4" />
            View Public Page
          </Link>
        </nav>

        {/* User */}
        <div className="p-4 border-t" style={{ borderColor: 'rgba(5,150,105,0.2)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg,#059669,#0d9488)' }}>
              {user?.name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">{user?.name || 'Admin'}</div>
              <div className="text-gray-500 text-xs truncate">{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-xl text-xs transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="px-4 md:px-6 py-4 border-b flex items-center justify-between gap-3"
          style={{ background: '#111827', borderColor: 'rgba(5,150,105,0.2)' }}>
          <div className="flex items-center gap-3">
            {/* Mobile logo */}
            <img src={logo} alt="" className="h-8 w-auto md:hidden" />
            <div>
              <h1 className="text-white font-bold text-base md:text-lg leading-tight">Notes Manager</h1>
              <p className="text-gray-400 text-xs hidden sm:block">Upload and manage pharmacy study notes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={openModal}
              className="flex items-center gap-1.5 text-white text-sm font-semibold px-3 md:px-4 py-2 rounded-xl transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(to right,#059669,#0d9488)' }}>
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Upload Note</span>
              <span className="sm:hidden">Upload</span>
            </button>
            {/* Mobile logout */}
            <button onClick={handleLogout}
              className="md:hidden p-2 text-red-400 hover:bg-red-900/20 rounded-xl transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
            {[
              { label: 'Total Notes', value: notes.length, icon: FileText, color: '#059669' },
              { label: 'Downloads', value: totalDownloads, icon: Download, color: '#0d9488' },
              { label: 'Programs', value: [...new Set(notes.map(n => n.className?.split(' ')[0]))].filter(Boolean).length || 0, icon: BookOpen, color: '#0891b2' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="rounded-2xl p-3 md:p-4 border"
                style={{ background: '#1f2937', borderColor: 'rgba(75,85,99,0.4)' }}>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}20` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg leading-none">{value}</div>
                    <div className="text-gray-400 text-xs mt-0.5 hidden sm:block">{label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                style={{ background: '#1f2937', border: '1px solid rgba(75,85,99,0.5)' }}
                placeholder="Search by title or subject..."
                value={search} onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 shrink-0" />
              <select
                className="flex-1 sm:flex-none px-3 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                style={{ background: '#1f2937', border: '1px solid rgba(75,85,99,0.5)' }}
                value={filterClass} onChange={e => setFilterClass(e.target.value)}>
                <option value="All">All Programs</option>
                {CLASSES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Notes list */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <FileText className="w-14 h-14 mx-auto mb-3 opacity-20" />
              <p className="text-sm font-medium">
                {notes.length === 0 ? 'No notes yet. Click "Upload Note" to add your first note!' : 'No notes match your search.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((note, i) => (
                <motion.div key={note._id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3 md:gap-4 p-4 rounded-2xl border group"
                  style={{ background: '#1f2937', borderColor: 'rgba(75,85,99,0.4)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(5,150,105,0.15)' }}>
                    <FileText className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium text-sm truncate">{note.title}</div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(5,150,105,0.2)', color: '#34d399' }}>
                        {note.subject}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(75,85,99,0.4)', color: '#9ca3af' }}>
                        {note.className}
                      </span>
                    </div>
                  </div>
                  <div className="text-center shrink-0 hidden sm:block">
                    <div className="text-white text-sm font-semibold">{note.downloads || 0}</div>
                    <div className="text-gray-500 text-xs">downloads</div>
                  </div>
                  <div className="text-gray-500 text-xs shrink-0 hidden lg:block">
                    {new Date(note.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                  <button onClick={() => handleDelete(note._id, note.title)}
                    className="p-2 rounded-xl text-red-400 hover:bg-red-900/30 transition-colors shrink-0 opacity-0 group-hover:opacity-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ── Upload Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)' }}
            onClick={() => !uploading && setShowModal(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
              style={{ background: '#111827', border: '1px solid rgba(5,150,105,0.3)' }}>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white font-bold text-lg">Upload New Note</h2>
                  <p className="text-gray-400 text-xs mt-0.5">Fill all details and attach the PDF file</p>
                </div>
                <button onClick={() => setShowModal(false)} disabled={uploading}
                  className="text-gray-500 hover:text-white transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Note Title *</label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    style={{ background: '#1f2937', border: '1px solid rgba(75,85,99,0.5)' }}
                    placeholder="e.g. Pharmaceutics – Theory (ER20-11T)"
                    value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                </div>

                {/* Subject + Class */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Subject *</label>
                    <select
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      style={{ background: '#1f2937', border: '1px solid rgba(75,85,99,0.5)' }}
                      value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                      {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Program / Semester *</label>
                    <select
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      style={{ background: '#1f2937', border: '1px solid rgba(75,85,99,0.5)' }}
                      value={form.className} onChange={e => setForm({ ...form, className: e.target.value })}>
                      {CLASSES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Description</label>
                  <textarea
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    style={{ background: '#1f2937', border: '1px solid rgba(75,85,99,0.5)' }}
                    rows={2}
                    placeholder="Brief description of what this note covers..."
                    value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Tags (comma separated)</label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    style={{ background: '#1f2937', border: '1px solid rgba(75,85,99,0.5)' }}
                    placeholder="e.g. dosage forms, tablets, capsules"
                    value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
                </div>

                {/* File drop zone */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">PDF / Document File *</label>
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('fileInput').click()}
                    className="relative cursor-pointer rounded-xl p-5 text-center transition-all"
                    style={{
                      background: dragOver ? 'rgba(5,150,105,0.15)' : 'rgba(31,41,55,0.6)',
                      border: `2px dashed ${dragOver ? '#059669' : file ? '#059669' : 'rgba(75,85,99,0.6)'}`,
                    }}>
                    <input id="fileInput" type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      className="hidden"
                      onChange={e => setFile(e.target.files[0])} />
                    {file ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span className="text-emerald-400 text-sm font-medium truncate max-w-xs">{file.name}</span>
                        <button type="button"
                          onClick={e => { e.stopPropagation(); setFile(null) }}
                          className="text-gray-500 hover:text-red-400 transition-colors ml-1 shrink-0">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-400 text-sm">
                          Drag & drop file here, or <span className="text-emerald-400">click to browse</span>
                        </p>
                        <p className="text-gray-600 text-xs mt-1">PDF, DOC, DOCX, PPT, PPTX supported</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={uploading}
                  className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 hover:opacity-90"
                  style={{ background: 'linear-gradient(to right,#059669,#0d9488)' }}>
                  {uploading
                    ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                    : <><Upload className="w-4 h-4" /> Upload Note</>}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
