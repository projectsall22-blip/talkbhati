import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ZoomIn } from 'lucide-react'
import api from '../../utils/api'

const placeholderImages = [
  { id: 1, title: 'Annual Prize Distribution', category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop' },
  { id: 2, title: 'Smart Classroom', category: 'Facilities', imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop' },
  { id: 3, title: 'JEE Toppers 2024', category: 'Achievements', imageUrl: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop' },
  { id: 4, title: 'Science Lab', category: 'Facilities', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543559c5f7f8?w=400&h=300&fit=crop' },
  { id: 5, title: 'NEET Toppers 2024', category: 'Achievements', imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop' },
  { id: 6, title: 'Library', category: 'Facilities', imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop' },
]

export default function Gallery() {
  const [images, setImages] = useState(placeholderImages)
  const [selected, setSelected] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    api.get('/gallery').then(res => { if (res.data.length) setImages(res.data) }).catch(() => {})
  }, [])

  return (
    <section ref={ref} className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="inline-block bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 mx-auto block text-center w-fit">
            Gallery
          </div>
          <h2 className="section-title">Life at <span className="gradient-text">EduPrime</span></h2>
          <p className="section-subtitle">A glimpse into our vibrant campus, facilities, and student achievements.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.slice(0, 6).map((img, i) => (
            <motion.div key={img.id || img._id}
              initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-video"
              onClick={() => setSelected(img)}>
              <img src={img.imageUrl} alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <div className="text-white font-semibold text-sm">{img.title}</div>
                  <div className="text-gray-300 text-xs">{img.category}</div>
                </div>
                <ZoomIn className="absolute top-4 right-4 w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors">
            <X className="w-8 h-8" />
          </button>
          <img src={selected.imageUrl} alt={selected.title}
            className="max-w-4xl max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
        </motion.div>
      )}
    </section>
  )
}
