import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, PlayCircle, X, Radio } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../../utils/api'

const subjects = ['Pharmaceutics', 'Pharmacology', 'Pharmaceutical Chemistry',
  'Pharmacognosy', 'Medicinal Chemistry', 'Hospital Pharmacy', 'Clinical Pharmacy', 'Other']
const empty = { title: '', description: '', youtubeUrl: '', subject: 'Physics', className: '', isLive: false, featured: false }

export default function AdminVideos() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(false)

  const load = () => api.get('/videos').then(r => setItems(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); setForm(empty); setModal(true) }
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setModal(true) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editing) { await api.put(`/videos/${editing._id}`, form); toast.success('Video updated!') }
      else { await api.post('/videos', form); toast.success('Video added!') }
      setModal(false); load()
    } catch (err) { toast.error(err.response?.data?.message || 'Operation failed') }
    finally { setLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this video?')) return
    try { await api.delete(`/videos/${id}`); toast.success('Deleted'); load() }
    catch { toast.error('Delete failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">YouTube Videos</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div key={item._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
            <div className="relative aspect-video">
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
              {item.isLive && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                  <Radio className="w-3 h-3" /> LIVE
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="text-white font-medium text-sm mb-1 line-clamp-2">{item.title}</div>
              <div className="flex gap-2 mb-3">
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">{item.subject}</span>
                {item.className && <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded">{item.className}</span>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)} className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-xs">
                  <Pencil className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => handleDelete(item._id)} className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-xs">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <PlayCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No videos added yet.</p>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">{editing ? 'Edit' : 'Add'} Video</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input className="input-field bg-gray-800 border-gray-700 text-white" placeholder="Video Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              <input className="input-field bg-gray-800 border-gray-700 text-white" placeholder="YouTube URL *" value={form.youtubeUrl} onChange={e => setForm({ ...form, youtubeUrl: e.target.value })} required />
              <textarea className="input-field bg-gray-800 border-gray-700 text-white resize-none" rows={2} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <select className="input-field bg-gray-800 border-gray-700 text-white" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                  {subjects.map(s => <option key={s}>{s}</option>)}
                </select>
                <input className="input-field bg-gray-800 border-gray-700 text-white" placeholder="Class (optional)" value={form.className} onChange={e => setForm({ ...form, className: e.target.value })} />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={form.isLive} onChange={e => setForm({ ...form, isLive: e.target.checked })} />
                  Mark as Live
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                  Featured
                </label>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60">
                {loading ? 'Saving...' : editing ? 'Update Video' : 'Add Video'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
