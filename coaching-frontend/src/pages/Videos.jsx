import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Radio, PlayCircle, X } from 'lucide-react'
import api from '../utils/api'

const subjects = ['All', 'Pharmaceutics', 'Pharmacology', 'Pharmaceutical Chemistry',
  'Pharmacognosy', 'Medicinal Chemistry', 'Hospital Pharmacy', 'Clinical Pharmacy']

const placeholderVideos = [
  { _id: 'p1',  title: 'Pharmacy Lecture – Class 1',  subject: 'Pharmaceutics', youtubeId: '6nRiOV9g83w', thumbnail: 'https://img.youtube.com/vi/6nRiOV9g83w/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p2',  title: 'Pharmacy Lecture – Class 2',  subject: 'Pharmaceutics', youtubeId: '99QECuI-up0', thumbnail: 'https://img.youtube.com/vi/99QECuI-up0/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p3',  title: 'Pharmacy Lecture – Class 3',  subject: 'Pharmaceutics', youtubeId: '4HNc5TEyHJk', thumbnail: 'https://img.youtube.com/vi/4HNc5TEyHJk/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p4',  title: 'Pharmacy Lecture – Class 4',  subject: 'Pharmaceutics', youtubeId: 'KVSVBIVswu8', thumbnail: 'https://img.youtube.com/vi/KVSVBIVswu8/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p5',  title: 'Pharmacy Lecture – Class 5',  subject: 'Pharmaceutics', youtubeId: '4S4gnhm8bCY', thumbnail: 'https://img.youtube.com/vi/4S4gnhm8bCY/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p6',  title: 'Pharmacy Lecture – Class 6',  subject: 'Pharmaceutics', youtubeId: 'Abk5vZaxZho', thumbnail: 'https://img.youtube.com/vi/Abk5vZaxZho/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p7',  title: 'Pharmacy Lecture – Class 7',  subject: 'Pharmaceutics', youtubeId: 'HNIOeqaYFrY', thumbnail: 'https://img.youtube.com/vi/HNIOeqaYFrY/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p8',  title: 'Pharmacy Lecture – Class 8',  subject: 'Pharmaceutics', youtubeId: 'ptqp1Bp3ArY', thumbnail: 'https://img.youtube.com/vi/ptqp1Bp3ArY/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p9',  title: 'Pharmacy Lecture – Class 9',  subject: 'Pharmaceutics', youtubeId: '4t91EeJk6XY', thumbnail: 'https://img.youtube.com/vi/4t91EeJk6XY/hqdefault.jpg', isLive: false, views: 0, className: '' },
  { _id: 'p10', title: 'Pharmacy Lecture – Class 10', subject: 'Pharmaceutics', youtubeId: 'pNZ9XHSWIJ0', thumbnail: 'https://img.youtube.com/vi/pNZ9XHSWIJ0/hqdefault.jpg', isLive: false, views: 0, className: '' },
]

export default function Videos() {
  const [videos, setVideos] = useState(placeholderVideos)
  const [subject, setSubject] = useState('All')
  const [showLive, setShowLive] = useState(false)
  const [playing, setPlaying] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get('/videos')
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) setVideos(res.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setPlaying(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = playing ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [playing])

  const safeVideos = Array.isArray(videos) ? videos : placeholderVideos

  const filtered = safeVideos.filter(v =>
    (subject === 'All' || v.subject === subject) &&
    (!showLive || v.isLive)
  )

  const liveVideos = safeVideos.filter(v => v.isLive)

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Header */}
      <div className="py-12 sm:py-20" style={{ background: 'linear-gradient(135deg, #1c0a00, #7f1d1d, #1c1917)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PlayCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mx-auto mb-3" />
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3">
              Video <span className="text-red-400">Classes</span>
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
              Watch free pharmacy lectures — D.Pharma, B.Pharma & M.Pharma.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Live banner */}
        {liveVideos.length > 0 && (
          <div className="rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            style={{ background: 'linear-gradient(to right, #dc2626, #db2777)' }}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse shrink-0" />
              <div className="min-w-0">
                <div className="text-white font-bold text-sm">Live Class in Progress</div>
                <div className="text-red-100 text-xs truncate">{liveVideos[0].title}</div>
              </div>
            </div>
            <button onClick={() => setPlaying(liveVideos[0])}
              className="w-full sm:w-auto bg-white text-red-600 font-semibold px-4 py-2 rounded-xl text-sm flex items-center justify-center gap-2">
              <Radio className="w-4 h-4" /> Join Live
            </button>
          </div>
        )}

        {/* Subject filter — horizontal scroll on mobile */}
        <div className="mb-5">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {subjects.map(s => (
              <button key={s} onClick={() => setSubject(s)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all ${
                  subject === s
                    ? 'bg-red-600 text-white shadow'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}>
                {s}
              </button>
            ))}
            <button onClick={() => setShowLive(!showLive)}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-all border ${
                showLive
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'
              }`}>
              <Radio className="w-3.5 h-3.5" /> Live
            </button>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 animate-pulse">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video grid */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filtered.map((video, i) => (
              <motion.div key={video._id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer active:scale-95 transition-transform"
                onClick={() => setPlaying(video)}>
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img src={video.thumbnail} alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy" />
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  {video.isLive && (
                    <div className="absolute top-1.5 left-1.5 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
                    </div>
                  )}
                </div>
                <div className="p-2 sm:p-4">
                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
                    {video.subject?.split(' ')[0]}
                  </span>
                  <h3 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug mt-1.5">
                    {video.title}
                  </h3>
                  {video.className && (
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{video.className}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <PlayCircle className="w-14 h-14 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No videos found.</p>
          </div>
        )}
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {playing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-3 sm:p-6"
            onClick={() => setPlaying(null)}>
            <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
              <div className="flex justify-end mb-2">
                <button onClick={() => setPlaying(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${playing.youtubeId}?autoplay=1`}
                  title={playing.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />
              </div>
              <div className="mt-3 text-white px-1">
                <h3 className="font-bold text-sm sm:text-lg leading-snug">{playing.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  {playing.subject}{playing.className ? ` • ${playing.className}` : ''}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
