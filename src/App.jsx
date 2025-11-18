import { useMemo, useState } from 'react'
import { Container } from 'react-bootstrap'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import AboutMe from './components/AboutMe'
import NavigationBar from './components/NavigationBar'
import Library from './components/Library'

const seedLibrary = [
  {
    id: 'OL1M',
    title: 'Atomic Habits',
    author: 'James Clear',
    pages: 320,
    status: 'in-progress',
    reviews: [{ reviewer: 'Alvin', rating: 4, text: 'Great starter for habit loops.' }]
  },
  {
    id: 'OL2M',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    pages: 476,
    status: 'tbr',
    reviews: []
  },
  {
    id: 'OL3M',
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    pages: 401,
    status: 'completed',
    reviews: [{ reviewer: 'Jess', rating: 5, text: 'Loved the characters.' }]
  }
]

function App() {
  const [library, setLibrary] = useState(seedLibrary)

  const addBookToLibrary = (book) => {
    setLibrary((current) => {
      if (current.some((item) => item.id === book.id)) {
        return current
      }
      return [
        ...current,
        {
          ...book,
          status: 'tbr',
          reviews: []
        }
      ]
    })
  }

  const updateBookStatus = (bookId, status) => {
    setLibrary((current) =>
      current.map((book) => (book.id === bookId ? { ...book, status } : book))
    )
  }

  const stats = useMemo(() => {
    return library.reduce(
      (acc, book) => {
        acc.total += 1
        acc[book.status] += 1
        return acc
      },
      {
        total: 0,
        tbr: 0,
        'in-progress': 0,
        completed: 0
      }
    )
  }, [library])

  return (
    <HashRouter>
      <div className="app-shell">
        <NavigationBar />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<Home stats={stats} library={library} onAddBook={addBookToLibrary} />} />
              <Route path="/library" element={<Library library={library} onUpdateStatus={updateBookStatus} />} />
              <Route path="/about" element={<AboutMe />} />
            </Routes>
          </Container>
        </main>
      </div>
    </HashRouter>
  )
}

export default App
