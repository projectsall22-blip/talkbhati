import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Radio, Filter, PlayCircle } from 'lucide-react'
import api from '../utils/api'

const subjects = ['All', 'Pharmaceutics', 'Pharmacology', 'Pharmaceutical Chemistry',
  'Pharmacognosy', 'Medicinal Chemistry', 'Hospital Pharmacy', 'Clinical Pharmacy']

const placeholderVideos = [
  { _id: 'p1', title: 'Pharmacy Lecture – ', subject: 'Pharmaceutics', youtubeId: '6nRiOV9g83w', thumbnail: 'https://img.youtube.com/vi/6nRiOV9g83w/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p2', title: 'Pharmacy Lecture – ', subject: 'Pharmaceutics', youtubeId: '99QECuI-up0', thumbnail: 'https://img.youtube.com/vi/99QECuI-up0/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p3', title: 'Pharmacy Lecture – ', subject: 'Pharmaceutics', youtubeId: '4HNc5TEyHJk', thumbnail: 'https://img.youtube.com/vi/4HNc5TEyHJk/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p4', title: 'Pharmacy Lecture – ', subject: 'Pharmaceutics', youtubeId: 'KVSVBIVswu8', thumbnail: 'https://img.youtube.com/vi/KVSVBIVswu8/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p5', title: 'Pharmacy Lecture – ', subject: 'Pharmaceutics', youtubeId: '4S4gnhm8bCY', thumbnail: 'https://img.youtube.com/vi/4S4gnhm8bCY/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p6', title: 'Pharmacy Lecture – ', subject: 'Pharmaceutics', youtubeId: 'Abk5vZaxZho', thumbnail: 'https://img.youtube.com/vi/Abk5vZaxZho/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p7', title: 'Pharmacy Lecture – ', subject: 'Pharmaceutics', youtubeId: 'HNIOeqaYFrY', thumbnail: 'https://img.youtube.com/vi/HNIOeqaYFrY/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p8', title: 'Pharmacy Lecture – ', subject: 'Pharmaceutics', youtubeId: 'ptqp1Bp3ArY', thumbnail: 'https://img.youtube.com/vi/ptqp1Bp3ArY/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p9', title: 'Pharmacy Lecture – ', subject: 'Pharmaceutics', youtubeId: '4t91EeJk6XY', thumbnail: 'https://img.youtube.com/vi/4t91EeJk6XY/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p10', title: 'Pharmacy Lecture – ', subject: 'Pharmaceutics', youtubeId: 'pNZ9XHSWIJ0', thumbnail: 'https://img.youtube.com/vi/pNZ9XHSWIJ0/hqdefault.jpg', isLive: false, views: 0, className: '' },
]

export default function Videos() {
  const [videos, setVideos] = useState(placeholderVideos)
  const [subject, setSubject] = useState('All')
  const [showLive, setShowLive] = useState(false)
  const [playing, setPlaying] = useState(null)

  useEffect(() => {
    const params = {}
    if (subject !== 'All') params.subject = subject
    if (showLive) params.isLive = true
    api.get('/videos', { params })
      .then(res => { if (res.data.length) setVideos(res.data) })
      .catch(() => {})
  }, [subject, showLive])

  const filtered = videos.filter(v =>
    (subject === 'All' || v.subject === subject) &&
    (!showLive || v.isLive)
  )

  const liveVideos = videos.filter(v => v.isLive)

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="py-20" style={{ background: 'linear-gradient(135deg, #1c0a00, #7f1d1d, #1c1917)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PlayCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Video <span className="text-red-400">Classes</span>
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto">
              Watch free pharmacy lectures, live classes, and recorded sessions — D.Pharma, B.Pharma & M.Pharma.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Live banner */}
        {liveVideos.length > 0 && (
          <div className="rounded-2xl p-6 mb-8 flex items-center gap-4"
            style={{ background: 'linear-gradient(to right, #dc2626, #db2777)' }}>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <div>
              <div className="text-white font-bold">Live Class in Progress</div>
              <div className="text-red-100 text-sm">{liveVideos[0].title}</div>
            </div>
            <button onClick={() => setPlaying(liveVideos[0])}
              className="ml-auto bg-white text-red-600 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-red-50 transition-colors flex items-center gap-2">
              <Radio className="w-4 h-4" /> Join Live
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Filter className="w-4 h-4 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {subjects.map(s => (
              <button key={s} onClick={() => setSubject(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  subject === s
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700'
                }`}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={() => setShowLive(!showLive)}
            className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              showLive ? 'bg-red-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}>
            <Radio className="w-4 h-4" /> Live Only
          </button>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video, i) => (
            <motion.div key={video._id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card overflow-hidden group cursor-pointer hover:-translate-y-1"
              onClick={() => setPlaying(video)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={video.thumbnail} alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
                {video.isLive && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" /> LIVE
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.views?.toLocaleString()} views
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-2 mb-2 flex-wrap">
                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
                    {video.subject}
                  </span>
                  {video.className && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                      {video.className}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>No videos found for the selected filters.</p>
          </div>
        )}
      </div>

      {/* Video modal */}
      {playing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPlaying(null)}>
          <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${playing.youtubeId}?autoplay=1`}
                title={playing.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            </div>
            <div className="mt-4 text-white">
              <h3 className="font-bold text-lg">{playing.title}</h3>
              <p className="text-gray-400 text-sm">{playing.subject} • {playing.className}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
