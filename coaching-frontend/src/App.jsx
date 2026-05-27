import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/common/WhatsAppButton'
import ScrollToTop from './components/common/ScrollToTop'

import Home from './pages/Home'
import Founder from './pages/Founder'
import Notes from './pages/Notes'
import Videos from './pages/Videos'
import Contact from './pages/Contact'

import NotesAdminLogin from './pages/notesadmin/NotesAdminLogin'
import NotesAdminPanel from './pages/notesadmin/NotesAdminPanel'
import NotesAdminRoute from './pages/notesadmin/NotesAdminRoute'

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster
            position="top-right"
            toastOptions={{ style: { borderRadius: '12px', fontFamily: 'Inter, sans-serif' } }}
          />
          <Routes>
            {/* ── Notes Admin (no navbar/footer) ── */}
            <Route path="/notes-admin/login" element={<NotesAdminLogin />} />
            <Route path="/notes-admin" element={
              <NotesAdminRoute><NotesAdminPanel /></NotesAdminRoute>
            } />
            <Route path="/notes-admin/*" element={
              <NotesAdminRoute><NotesAdminPanel /></NotesAdminRoute>
            } />

            {/* ── Public pages ── */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/founder" element={<PublicLayout><Founder /></PublicLayout>} />
            <Route path="/notes" element={<PublicLayout><Notes /></PublicLayout>} />
            <Route path="/videos" element={<PublicLayout><Videos /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
