// ─── Local notes store (localStorage) ───────────────────────────────────────
// Used when backend is not available. Notes are stored in the browser.
// Each note: { _id, title, description, subject, className, tags, fileUrl,
//              fileName, fileData (base64), downloads, createdAt }

const KEY = 'tbp_notes'

export function getNotes() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function saveNote(note) {
  const notes = getNotes()
  notes.unshift(note)
  localStorage.setItem(KEY, JSON.stringify(notes))
}

export function deleteNote(id) {
  const notes = getNotes().filter(n => n._id !== id)
  localStorage.setItem(KEY, JSON.stringify(notes))
}

export function incrementDownload(id) {
  const notes = getNotes()
  const idx = notes.findIndex(n => n._id === id)
  if (idx !== -1) {
    notes[idx].downloads = (notes[idx].downloads || 0) + 1
    localStorage.setItem(KEY, JSON.stringify(notes))
  }
  return notes[idx]
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

// Convert File to base64 data URL
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
