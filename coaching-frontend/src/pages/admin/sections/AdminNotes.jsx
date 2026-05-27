import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, FileText, X, Download } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../../utils/api'

const subjects = ['Pharmaceutics', 'Pharmaceutical Chemistry', 'Pharmacognosy', 'Pharmacology',
  'Human Anatomy & Physiology', 'Biochemistry', 'Microbiology', 'Medicinal Chemistry',
  'Hospital Pharmacy', 'Clinical Pharmacy', 'Pharmacy Law & Ethics', 'Other']

const classes = ['D.Pharma 1st Year', 'D.Pharma 2nd Year',
  'B.Pharma Sem 1', 'B.Pharma Sem 2', 'B.Pharma Sem 3', 'B.Pharma Sem 4',
  'B.Pharma Sem 5', 'B.Pharma Sem 6', 'B.Pharma Sem 7', 'B.Pharma Sem 8',
  'M.Pharma', 'Pharm.D']

export default function AdminNotes() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', subject: 'Physics', className: 'Class 11' })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = () => api.get('/notes').then(r => setItems(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return toast.error('Please select a file')
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      fd.append('file', file)
      await api.post('/notes', fd)
      toast.success('Note uploaded!')
      setModal(false); setFile(null); load()
    } catch { toast.error('Upload failed') }
    finally { setLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this note?')) return
    try { await api.delete(`/notes/${id}`); toast.success('Deleted'); load() }
    catch { toast.error('Delete failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Study Notes</h2>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Upload Note
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div key={item._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium text-sm truncate">{item.title}</div>
              <div className="flex gap-2 mt-1">
                <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded">{item.subject}</span>
                <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded">{item.className}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1"><Download className="w-3 h-3" />{item.downloads}</span>
              </div>
            </div>
            <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors shrink-0">
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No notes uploaded yet.</p>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Upload Note</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input className="input-field bg-gray-800 border-gray-700 text-white" placeholder="Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              <textarea className="input-field bg-gray-800 border-gray-700 text-white resize-none" rows={2} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <select className="input-field bg-gray-800 border-gray-700 text-white" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                  {subjects.map(s => <option key={s}>{s}</option>)}
                </select>
                <select className="input-field bg-gray-800 border-gray-700 text-white" value={form.className} onChange={e => setForm({ ...form, className: e.target.value })}>
                  {classes.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">File (PDF/DOC) *</label>
                <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={e => setFile(e.target.files[0])} required
                  className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:text-sm file:cursor-pointer" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60">
                {loading ? 'Uploading...' : 'Upload Note'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
