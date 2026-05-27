import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Trash2, Mail, Phone, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../../utils/api'

const statusColors = {
  new: 'bg-blue-500/20 text-blue-400',
  read: 'bg-gray-500/20 text-gray-400',
  replied: 'bg-green-500/20 text-green-400',
}

export default function AdminContacts() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)

  const load = () => api.get('/contact').then(r => setItems(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/contact/${id}/status`, { status })
      load()
    } catch { toast.error('Update failed') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    try { await api.delete(`/contact/${id}`); toast.success('Deleted'); setSelected(null); load() }
    catch { toast.error('Delete failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Contact Messages</h2>
        <span className="bg-blue-500/20 text-blue-400 text-sm px-3 py-1 rounded-full">
          {items.filter(i => i.status === 'new').length} new
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* List */}
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div key={item._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => { setSelected(item); updateStatus(item._id, 'read') }}
              className={`bg-gray-800 border rounded-xl p-4 cursor-pointer transition-all hover:border-indigo-500/50 ${
                selected?._id === item._id ? 'border-indigo-500' : 'border-gray-700'
              }`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium text-sm">{item.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[item.status]}`}>{item.status}</span>
                  </div>
                  <div className="text-gray-400 text-xs truncate">{item.subject}</div>
                  <div className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No messages yet.</p>
            </div>
          )}
        </div>

        {/* Detail */}
        {selected && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-white font-bold">{selected.subject}</h3>
              <button onClick={() => handleDelete(selected._id)} className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-white font-medium">{selected.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" /> {selected.email}
              </div>
              {selected.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Phone className="w-4 h-4" /> {selected.phone}
                </div>
              )}
            </div>
            <div className="bg-gray-900 rounded-xl p-4 mb-4">
              <p className="text-gray-300 text-sm leading-relaxed">{selected.message}</p>
            </div>
            <div className="flex gap-2">
              <a href={`mailto:${selected.email}`}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-xl transition-colors">
                <Mail className="w-4 h-4" /> Reply via Email
              </a>
              <button onClick={() => updateStatus(selected._id, 'replied')}
                className="px-4 py-2 bg-green-500/20 text-green-400 rounded-xl text-sm hover:bg-green-500/30 transition-colors">
                Mark Replied
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
