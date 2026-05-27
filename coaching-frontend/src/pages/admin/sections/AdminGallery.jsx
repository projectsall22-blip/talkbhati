import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Image, X } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../../utils/api'

export default function AdminGallery() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'General', description: '' })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = () => api.get('/gallery').then(r => setItems(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return toast.error('Please select an image')
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      fd.append('image', file)
      await api.post('/gallery', fd)
      toast.success('Image added!')
      setModal(false); setFile(null); load()
    } catch { toast.error('Upload failed') }
    finally { setLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return
    try { await api.delete(`/gallery/${id}`); toast.success('Deleted'); load() }
    catch { toast.error('Delete failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Gallery</h2>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <motion.div key={item._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="group relative aspect-video rounded-xl overflow-hidden bg-gray-800">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
              <div className="text-white text-xs font-medium text-center">{item.title}</div>
              <button onClick={() => handleDelete(item._id)} className="p-1.5 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <Image className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No images in gallery yet.</p>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Add Gallery Image</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input className="input-field bg-gray-800 border-gray-700 text-white" placeholder="Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              <select className="input-field bg-gray-800 border-gray-700 text-white" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {['General', 'Events', 'Achievements', 'Facilities', 'Classes'].map(c => <option key={c}>{c}</option>)}
              </select>
              <textarea className="input-field bg-gray-800 border-gray-700 text-white resize-none" rows={2} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <div>
                <label className="block text-sm text-gray-400 mb-1">Image *</label>
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} required
                  className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:text-sm file:cursor-pointer" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60">
                {loading ? 'Uploading...' : 'Add Image'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
