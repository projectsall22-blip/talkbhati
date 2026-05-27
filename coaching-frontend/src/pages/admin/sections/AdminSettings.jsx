import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Settings } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../../utils/api'

export default function AdminSettings() {
  const [form, setForm] = useState({
    instituteName: '', tagline: '', phone: '', email: '', address: '',
    whatsapp: '', facebook: '', instagram: '', youtube: '', twitter: '',
    founderName: '', founderBio: '', founderExperience: '', founderVision: '',
    founderMission: '', founderMessage: '',
    totalStudents: '', totalSelections: '', yearsExperience: '', successRate: '',
  })
  const [founderPhoto, setFounderPhoto] = useState(null)
  const [heroImage, setHeroImage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/settings').then(r => { if (r.data) setForm(f => ({ ...f, ...r.data })) }).catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => { if (v !== undefined && v !== null) fd.append(k, v) })
      if (founderPhoto) fd.append('founderPhoto', founderPhoto)
      if (heroImage) fd.append('heroImage', heroImage)
      await api.put('/settings', fd)
      toast.success('Settings saved!')
    } catch { toast.error('Save failed') }
    finally { setLoading(false) }
  }

  const Field = ({ label, name, type = 'text', rows }) => (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      {rows ? (
        <textarea className="input-field bg-gray-800 border-gray-700 text-white resize-none" rows={rows}
          value={form[name] || ''} onChange={e => setForm({ ...form, [name]: e.target.value })} />
      ) : (
        <input type={type} className="input-field bg-gray-800 border-gray-700 text-white"
          value={form[name] || ''} onChange={e => setForm({ ...form, [name]: e.target.value })} />
      )}
    </div>
  )

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-5 h-5 text-indigo-400" />
        <h2 className="text-xl font-bold text-white">Site Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Institute Info */}
        <Section title="Institute Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Institute Name" name="instituteName" />
            <Field label="Tagline" name="tagline" />
            <Field label="Phone" name="phone" />
            <Field label="Email" name="email" type="email" />
            <Field label="WhatsApp Number" name="whatsapp" />
          </div>
          <Field label="Address" name="address" rows={2} />
          <div>
            <label className="block text-sm text-gray-400 mb-1">Hero Background Image</label>
            <input type="file" accept="image/*" onChange={e => setHeroImage(e.target.files[0])}
              className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:text-sm file:cursor-pointer" />
          </div>
        </Section>

        {/* Social Media */}
        <Section title="Social Media Links">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Facebook URL" name="facebook" />
            <Field label="Instagram URL" name="instagram" />
            <Field label="YouTube Channel URL" name="youtube" />
            <Field label="Twitter URL" name="twitter" />
          </div>
        </Section>

        {/* Founder */}
        <Section title="Founder Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Founder Name" name="founderName" />
            <Field label="Experience" name="founderExperience" />
          </div>
          <Field label="Biography" name="founderBio" rows={3} />
          <Field label="Vision" name="founderVision" rows={2} />
          <Field label="Mission" name="founderMission" rows={2} />
          <Field label="Motivational Message" name="founderMessage" rows={2} />
          <div>
            <label className="block text-sm text-gray-400 mb-1">Founder Photo</label>
            <input type="file" accept="image/*" onChange={e => setFounderPhoto(e.target.files[0])}
              className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:text-sm file:cursor-pointer" />
          </div>
        </Section>

        {/* Stats */}
        <Section title="Statistics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Total Students" name="totalStudents" type="number" />
            <Field label="Total Selections" name="totalSelections" type="number" />
            <Field label="Years Experience" name="yearsExperience" type="number" />
            <Field label="Success Rate (%)" name="successRate" type="number" />
          </div>
        </Section>

        <button type="submit" disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors disabled:opacity-60 shadow-lg">
          {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4 pb-3 border-b border-gray-700">{title}</h3>
      <div className="space-y-4">{children}</div>
    </motion.div>
  )
}
