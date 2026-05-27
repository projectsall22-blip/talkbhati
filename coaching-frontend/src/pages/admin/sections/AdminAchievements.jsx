import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Trophy, X } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../../utils/api'

const empty = { studentName: '', marks: '', percentage: '', rank: '', exam: '', college: '', year: new Date().getFullYear().toString(), category: 'JEE', featured: false }

export default function AdminAchievements() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = () => api.get('/achievements').then(r => setItems(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); setForm(empty); setPhoto(null); setModal(true) }
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setPhoto(null); setModal(true) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (photo) fd.append('photo', photo)
      if (editing) {
        await api.put(`/achievements/${editing._id}`, fd)
        toast.success('Achievement updated!')
      } else {
        await api.post('/achievements', fd)
        toast.success('Achievement added!')
      }
      setModal(false); load()
    } catch { toast.error('Operation failed') }
    finally { setLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this achievement?')) return
    try { await api.delete(`/achievements/${id}`); toast.success('Deleted'); load() }
    catch { toast.error('Delete failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Achievements</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <motion.div key={item._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-4">
            <img src={item.photo || `https://ui-avatars.com/api/?name=${item.studentName}&background=6366f1&color=fff`}
              alt={item.studentName} className="w-16 h-16 rounded-xl object-cover mx-auto mb-3" />
            <div className="text-center">
              <div className="text-white font-semibold text-sm">{item.studentName}</div>
              <div className="text-indigo-400 text-xs">{item.exam}</div>
              <div className="text-gray-400 text-xs">{item.rank || item.percentage}</div>
              <div className="text-xs text-gray-500 mt-1">{item.college}</div>
              <div className="flex gap-2 mt-3 justify-center">
                <button onClick={() => openEdit(item)} className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(item._id)} className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No achievements yet. Add your first one!</p>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">{editing ? 'Edit' : 'Add'} Achievement</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input className="input-field bg-gray-800 border-gray-700 text-white" placeholder="Student Name *" value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <input className="input-field bg-gray-800 border-gray-700 text-white" placeholder="Marks (e.g. 312/360)" value={form.marks} onChange={e => setForm({ ...form, marks: e.target.value })} required />
                <input className="input-field bg-gray-800 border-gray-700 text-white" placeholder="Percentage" value={form.percentage} onChange={e => setForm({ ...form, percentage: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input className="input-field bg-gray-800 border-gray-700 text-white" placeholder="Rank (e.g. AIR 47)" value={form.rank} onChange={e => setForm({ ...form, rank: e.target.value })} />
                <input className="input-field bg-gray-800 border-gray-700 text-white" placeholder="Exam *" value={form.exam} onChange={e => setForm({ ...form, exam: e.target.value })} required />
              </div>
              <input className="input-field bg-gray-800 border-gray-700 text-white" placeholder="College/University" value={form.college} onChange={e => setForm({ ...form, college: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <input className="input-field bg-gray-800 border-gray-700 text-white" placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} required />
                <select className="input-field bg-gray-800 border-gray-700 text-white" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option>D.Pharma</option><option>B.Pharma</option><option>M.Pharma</option><option>Pharm.D</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Student Photo</label>
                <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])}
                  className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:text-sm file:cursor-pointer" />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded" />
                Mark as Featured
              </label>
              <button type="submit" disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60">
                {loading ? 'Saving...' : editing ? 'Update' : 'Add Achievement'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
