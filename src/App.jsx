import { useEffect, useMemo, useState } from 'react'
import { Container } from 'react-bootstrap'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import NavigationBar from './components/NavigationBar'
import Library from './components/Library'
import Footer from './components/Footer'
import Account from './components/Account'

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
  const [library, setLibrary] = useState(() => {
    const stored = localStorage.getItem('book-tracker-library')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (error) {
        console.warn('Unable to parse stored library', error)
      }
    }
    return seedLibrary
  })
  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem('book-tracker-profile')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return { name: 'Guest Reader', email: '' }
      }
    }
    return { name: 'Guest Reader', email: '' }
  })
  const [readingGoal, setReadingGoal] = useState(() => {
    const stored = localStorage.getItem('book-tracker-goal')
    if (stored) {
      const parsed = Number.parseInt(stored, 10)
      if (!Number.isNaN(parsed)) {
        return parsed
      }
    }
    return 20
  })

  useEffect(() => {
    localStorage.setItem('book-tracker-library', JSON.stringify(library))
  }, [library])

  useEffect(() => {
    localStorage.setItem('book-tracker-profile', JSON.stringify(profile))
  }, [profile])

  useEffect(() => {
    localStorage.setItem('book-tracker-goal', String(readingGoal))
  }, [readingGoal])

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

  const addReviewToBook = (bookId, review) => {
    setLibrary((current) =>
      current.map((book) =>
        book.id === bookId ? { ...book, reviews: [...book.reviews, { ...review, reviewer: profile.name }] } : book
      )
    )
  }

  const removeBookFromLibrary = (bookId) => {
    setLibrary((current) => current.filter((book) => book.id !== bookId))
  }

  const stats = useMemo(() => {
    return library.reduce(
      (acc, book) => {
        acc.total += 1
        acc[book.status] += 1
        acc.reviewCount += book.reviews.length
        book.reviews.forEach((review) => {
          acc.ratingSum += review.rating
          acc.ratingCount += 1
        })
        return acc
      },
      {
        total: 0,
        tbr: 0,
        'in-progress': 0,
        completed: 0,
        reviewCount: 0,
        ratingSum: 0,
        ratingCount: 0,
        completionRate: 0,
        averageRating: '—'
      }
    )
  }, [library])

  const computedStats = useMemo(() => {
    const averageRating =
      stats.ratingCount > 0 ? `${(stats.ratingSum / stats.ratingCount).toFixed(1)} / 5` : '—'
    const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
    return { ...stats, averageRating, completionRate }
  }, [stats])

  return (
    <HashRouter>
      <div className="app-shell">
        <NavigationBar profileName={profile.name} />
        <main>
          <Container>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    stats={computedStats}
                    library={library}
                    onAddBook={addBookToLibrary}
                    goal={readingGoal}
                    onUpdateGoal={setReadingGoal}
                    profile={profile}
                  />
                }
              />
              <Route
                path="/library"
                element={
                  <Library
                    library={library}
                    onUpdateStatus={updateBookStatus}
                    onAddReview={addReviewToBook}
                    onRemove={removeBookFromLibrary}
                  />
                }
              />
              <Route
                path="/account"
                element={<Account profile={profile} onSaveProfile={setProfile} libraryCount={library.length} />}
              />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
