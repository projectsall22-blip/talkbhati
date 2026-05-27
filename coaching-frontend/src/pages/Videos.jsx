import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Radio, Filter, PlayCircle, X, ChevronDown } from 'lucide-react'
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
  const [filterOpen, setFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get('/videos')
      .then(res => { if (res.data?.length) setVideos(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Close modal on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setPlaying(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = playing ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [playing])

  const filtered = videos.filter(v =>
    (subject === 'All' || v.subject === subject) &&
    (!showLive || v.isLive)
  )

  const liveVideos = videos.filter(v => v.isLive)

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      {/* Header */}
      <div className="py-16 sm:py-20" style={{ background: 'linear-gradient(135deg, #1c0a00, #7f1d1d, #1c1917)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PlayCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Video <span className="text-red-400">Classes</span>
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base px-4">
              Watch free pharmacy lectures, live classes, and recorded sessions — D.Pharma, B.Pharma & M.Pharma.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Live banner */}
        {liveVideos.length > 0 && (
          <div className="rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
            style={{ background: 'linear-gradient(to right, #dc2626, #db2777)' }}>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse flex-shrink-0" />
              <div>
                <div className="text-white font-bold text-sm sm:text-base">Live Class in Progress</div>
                <div className="text-red-100 text-xs sm:text-sm">{liveVideos[0].title}</div>
              </div>
            </div>
            <button onClick={() => setPlaying(liveVideos[0])}
              className="w-full sm:w-auto bg-white text-red-600 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
              <Radio className="w-4 h-4" /> Join Live
            </button>
          </div>
        )}

        {/* Filters — desktop: inline, mobile: dropdown */}
        <div className="mb-6 sm:mb-8">
          {/* Mobile filter toggle */}
          <div className="flex items-center gap-2 sm:hidden mb-3">
            <button onClick={() => setFilterOpen(!filterOpen)}
              className="flex-1 flex items-center justify-between px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm">
              <span className="flex items-center gap-2"><Filter className="w-4 h-4" /> Filter: {subject}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </button>
            <button onClick={() => setShowLive(!showLive)}
              className={`flex items-center gap-1.5 px-3 py-3 rounded-xl text-sm font-medium transition-all border ${
                showLive
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'
              }`}>
              <Radio className="w-4 h-4" /> Live
            </button>
          </div>

          {/* Mobile filter dropdown */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="sm:hidden overflow-hidden mb-3">
                <div className="flex flex-wrap gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  {subjects.map(s => (
                    <button key={s} onClick={() => { setSubject(s); setFilterOpen(false) }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        subject === s
                          ? 'bg-red-600 text-white shadow'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop filters */}
          <div className="hidden sm:flex flex-wrap items-center gap-3">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <div className="flex flex-wrap gap-2">
              {subjects.map(s => (
                <button key={s} onClick={() => setSubject(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    subject === s
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
            <button onClick={() => setShowLive(!showLive)}
              className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                showLive
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'
              }`}>
              <Radio className="w-4 h-4" /> Live Only
            </button>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 animate-pulse">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((video, i) => (
              <motion.div key={video._id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 cursor-pointer group hover:-translate-y-1 transition-all duration-300"
                onClick={() => setPlaying(video)}>
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img src={video.thumbnail} alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-1" />
                    </div>
                  </div>
                  {video.isLive && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
                    </div>
                  )}
                  {video.views > 0 && (
                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                      {video.views.toLocaleString()} views
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
                      {video.subject}
                    </span>
                    {video.className && (
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                        {video.className}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug">{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-sm">No videos found for the selected filters.</p>
          </div>
        )}
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {playing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-3 sm:p-4"
            onClick={() => setPlaying(null)}>
            <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
              {/* Close button */}
              <div className="flex justify-end mb-2">
                <button onClick={() => setPlaying(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${playing.youtubeId}?autoplay=1`}
                  title={playing.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />
              </div>
              <div className="mt-3 sm:mt-4 text-white px-1">
                <h3 className="font-bold text-base sm:text-lg leading-snug">{playing.title}</h3>
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
