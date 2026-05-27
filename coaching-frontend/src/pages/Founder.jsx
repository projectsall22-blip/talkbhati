import { motion } from 'framer-motion'
import { Award, BookOpen, Target, Heart, Quote, FlaskConical, FileText, GraduationCap, Star } from 'lucide-react'
import founderImg from '../assets/founder.jpeg'

export default function Founder() {
  return (
    <div className="pt-16">

      {/* ── Hero ── */}
      <section className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#022c22 0%,#064e3b 50%,#134e4a 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle,#34d399 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-block border rounded-full px-4 py-1.5 mb-6 text-sm font-semibold text-emerald-300"
                style={{ background: 'rgba(5,150,105,0.2)', borderColor: 'rgba(5,150,105,0.4)' }}>
                Meet Our Founder
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Mazid Ali Khan</h1>
              <p className="text-emerald-400 text-base font-medium mb-1">M.Pharmacy (Pharmaceutics)</p>
              <p className="text-gray-400 text-sm mb-6">
                Dr. A.P.J. Abdul Kalam Technical University, Lucknow
              </p>

              <p className="text-gray-300 leading-relaxed mb-6">
                Mazid Ali Khan is a dedicated pharmacy professional with strong academic and research
                experience in the pharmaceutical field. He completed his B.Pharmacy and M.Pharmacy
                (Pharmaceutics) with a keen interest in formulation development and pharmaceutical research.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                He has actively participated in various national conferences, seminars, and awareness
                programs related to drug discovery, pharmaceutical sciences, and healthcare awareness.
                His commitment towards academic excellence and innovation is reflected through his
                research publication and professional achievements.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                {['B.Pharmacy', 'M.Pharmacy (Pharmaceutics)', 'Research Published', 'IPA Member'].map(b => (
                  <span key={b} className="text-xs font-semibold px-3 py-1.5 rounded-full border text-emerald-300"
                    style={{ background: 'rgba(5,150,105,0.15)', borderColor: 'rgba(5,150,105,0.35)' }}>
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — photo */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }} className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-80 rounded-3xl overflow-hidden shadow-2xl"
                  style={{ border: '4px solid rgba(5,150,105,0.5)', boxShadow: '0 0 50px rgba(5,150,105,0.25)' }}>
                  <img src={founderImg} alt="Mazid Ali Khan"
                    className="w-full h-full object-cover object-top" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 rounded-2xl px-4 py-3 shadow-xl text-center"
                  style={{ background: 'linear-gradient(to right,#059669,#0d9488)' }}>
                  <div className="text-white font-bold text-sm">Researcher</div>
                  <div className="text-emerald-200 text-xs">NeuroQuantology 2022</div>
                </div>
                {/* Top badge */}
                <div className="absolute -top-3 -left-3 rounded-xl px-3 py-2 shadow-lg"
                  style={{ background: 'linear-gradient(to right,#f59e0b,#f97316)' }}>
                  <div className="text-white font-bold text-xs">M.Pharma</div>
                  <div className="text-orange-100 text-xs">Pharmaceutics</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Research Publication ── */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="text-center mb-10">
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold px-4 py-1.5 rounded-full">
                Research Publication
              </span>
            </div>

            <div className="max-w-3xl mx-auto rounded-3xl p-8 shadow-xl border"
              style={{ background: 'linear-gradient(135deg,#022c22,#064e3b)', borderColor: 'rgba(5,150,105,0.4)' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(5,150,105,0.3)' }}>
                  <FileText className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                      style={{ background: '#059669' }}>NeuroQuantology</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                      style={{ background: '#0d9488' }}>August 2022</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                      style={{ background: '#0891b2' }}>Volume 20, Issue 10</span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-snug mb-3">
                    "Formulation and Evaluation of Fast Dissolving Buccal Film of Ketoconazole
                    for the Treatment of Oropharyngeal Candidiasis"
                  </h3>
                  <p className="text-emerald-200 text-sm leading-relaxed">
                    This research highlights expertise in novel drug delivery systems and pharmaceutical
                    formulation development — specifically buccal film technology for antifungal therapy.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Vision, Mission, Value ── */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Target, title: 'Vision', color: '#059669',
                text: 'To make quality pharmacy education accessible to every student in India, regardless of their background or financial status.'
              },
              {
                icon: Heart, title: 'Mission', color: '#0d9488',
                text: 'Providing structured, easy-to-access pharmacy study notes organized by semester and subject for students across India.'
              },
              {
                icon: FlaskConical, title: 'Value', color: '#0891b2',
                text: 'Committed to supporting student success through organized, accurate, and freely accessible pharmacy learning materials.'
              },
            ].map(({ icon: Icon, title, text, color }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-7">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${color}18`, border: `1px solid ${color}40` }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Achievements grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
            {[
              { icon: GraduationCap, value: 'B.Pharma', label: 'AKTU Lucknow' },
              { icon: GraduationCap, value: 'M.Pharma', label: 'Pharmaceutics' },
              { icon: FileText, value: '1', label: 'Research Paper' },
              { icon: Award, value: 'IPA', label: 'Member' },
            ].map(({ icon: Icon, value, label }) => (
              <motion.div key={label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4 }}
                className="card p-5 text-center">
                <Icon className="w-7 h-7 text-emerald-500 mx-auto mb-2" />
                <div className="text-xl font-bold mb-0.5"
                  style={{ background: 'linear-gradient(to right,#059669,#0d9488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {value}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Certificates section */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="card p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <h3 className="text-xl font-bold">Certificates & Recognition</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { org: 'Sanskar College of Pharmacy & Research Institute', desc: 'Certificate of Appreciation for active participation' },
                { org: 'Indian Pharmaceutical Association (IPA)', desc: 'Recognition for academic and professional contributions' },
                { org: 'National Conferences & Seminars', desc: 'Drug discovery, pharmaceutical sciences & healthcare awareness' },
                { org: 'University Level Programs', desc: 'Multiple certificates from reputed institutions' },
                { org: 'Awareness Programs', desc: 'Healthcare awareness and community pharmacy initiatives' },
                { org: 'Research Excellence', desc: 'Published in NeuroQuantology — indexed international journal' },
              ].map(({ org, desc }) => (
                <div key={org} className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.15)' }}>
                  <Award className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug">{org}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-3xl p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#f0fdf4,#ecfdf5)', border: '1px solid #bbf7d0' }}>
            <Quote className="w-14 h-14 absolute top-5 left-5 text-emerald-200" />
            <Quote className="w-14 h-14 absolute bottom-5 right-5 rotate-180 text-emerald-200" />
            <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed max-w-3xl mx-auto mb-6 relative z-10">
              "Every pharmacy student deserves access to quality study materials. This platform is my
              contribution to your success. Study hard, serve society, and make pharmacy proud."
            </p>
            <div className="font-bold text-emerald-600 text-lg">— Mazid Ali Khan</div>
            <div className="text-sm text-gray-500 mt-1">Founder, TalksBhati Pharmacy · M.Pharma (Pharmaceutics)</div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
