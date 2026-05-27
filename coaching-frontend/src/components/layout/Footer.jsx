import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Globe, Share2, Play, MessageCircle } from 'lucide-react'
import logo from '../../assets/logo.png'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="TalksBhati Pharmacy" className="h-10 w-auto" />
              <div>
                <span className="text-white font-bold text-lg block leading-tight">TalksBhati</span>
                <span className="text-emerald-400 text-xs">Pharmacy Study Hub</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Students trusted online repository for D.Pharma, B.Pharma & M.Pharma semester-wise study notes. Empowering pharmacy students across India.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Globe, href: '#', color: 'hover:text-blue-400', label: 'Facebook' },
                { icon: Share2, href: '#', color: 'hover:text-pink-400', label: 'Instagram' },
                { icon: Play, href: '#', color: 'hover:text-red-400', label: 'YouTube' },
                { icon: MessageCircle, href: '#', color: 'hover:text-green-400', label: 'WhatsApp' },
              ].map(({ icon: Icon, href, color, label }) => (
                <a key={label} href={href} aria-label={label}
                  className={`w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center transition-colors ${color}`}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Founder', path: '/founder' },
                { label: 'Study Notes', path: '/notes' },
                { label: 'Video Classes', path: '/videos' },
                { label: 'Contact Us', path: '/contact' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1">
                    <span className="text-emerald-500">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              {[
                'D.Pharma (1st Year)',
                'D.Pharma (2nd Year)',
                'B.Pharma (Sem 1–4)',
                'B.Pharma (Sem 5–8)',
                'M.Pharma',
                'Pharm.D',
              ].map(c => (
                <li key={c} className="text-sm text-gray-400 flex items-center gap-1">
                  <span className="text-emerald-500">›</span> {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                C-28, Rafikabad Colony, Dasna, Ghaziabad
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                +91-8267908842
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                mazidalikhan9717@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 TalksBhati Pharmacy. All rights reserved.</p>
          <p className="text-sm text-gray-500">Designed with ❤️ for pharmacy students By Avatri Tech</p>
        </div>
      </div>
    </footer>
  )
}
