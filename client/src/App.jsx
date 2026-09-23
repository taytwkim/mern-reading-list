import { useEffect, useState } from 'react'
import * as booksApi from './api/books'
import './App.css'

const STATUSES = ['Not Started', 'Reading', 'Finished']
const EMPTY_FORM = { title: '', author: '', status: 'Not Started' }

export default function App() {
  const [books, setBooks] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Load books on mount; ignore results after this effect is cleaned up.
  useEffect(() => {
    let active = true
    async function loadBooks() {
      try {
        const data = await booksApi.getBooks()
        if (active) setBooks(data)
      } catch (err) {
        if (active) setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }
    loadBooks()
    return () => { active = false }
  }, [])

  function resetForm() {
    setForm(EMPTY_FORM)
    setEditingId(null)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSaving(true)
    try {
      if (editingId) {
        const updated = await booksApi.updateBook(editingId, form)
        setBooks(current => current.map(book => book.id === editingId ? updated : book))
      } else {
        const created = await booksApi.createBook(form)
        setBooks(current => [...current, created])
      }
      resetForm()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  function handleEdit(book) {
    setEditingId(book.id)
    setForm({ title: book.title, author: book.author, status: book.status })
    setError('')
  }

  async function handleDelete(id) {
    setError('')
    setSaving(true)
    try {
      await booksApi.deleteBook(id)
      setBooks(current => current.filter(book => book.id !== id))
      if (editingId === id) resetForm()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const visibleBooks = books.filter(book => filter === 'All' || book.status === filter)

  return (
    <main>
      <header>
        <p className="eyebrow">YOUR PERSONAL LIBRARY</p>
        <h1>Reading list</h1>
        <p>Keep track of the books you want to read, and the ones you’ve finished.</p>
      </header>

      {error && <p className="error" role="alert">{error}</p>}

      <div className="layout">
        <section className="panel" aria-labelledby="form-title">
          <h2 id="form-title">{editingId ? 'Edit book' : 'Add a book'}</h2>
          <form onSubmit={handleSubmit}>
            <fieldset disabled={saving || loading}>
              <label htmlFor="title">Title</label>
              <input id="title" name="title" value={form.title} onChange={handleChange} required placeholder="The Hobbit" />
              <label htmlFor="author">Author</label>
              <input id="author" name="author" value={form.author} onChange={handleChange} required placeholder="J. R. R. Tolkien" />
              <label htmlFor="status">Reading status</label>
              <select id="status" name="status" value={form.status} onChange={handleChange}>
                {STATUSES.map(status => <option key={status}>{status}</option>)}
              </select>
              <div className="actions">
                <button type="submit">{saving ? 'Saving…' : editingId ? 'Save changes' : 'Add book'}</button>
                {editingId && <button type="button" className="secondary" onClick={resetForm}>Cancel</button>}
              </div>
            </fieldset>
          </form>
        </section>

        <section className="panel" aria-labelledby="library-title">
          <div className="list-heading">
            <h2 id="library-title">Your books <span className="count">{books.length}</span></h2>
            <div>
              <label htmlFor="filter">Show</label>
              <select id="filter" value={filter} onChange={event => setFilter(event.target.value)}>
                {['All', ...STATUSES].map(status => <option key={status}>{status}</option>)}
              </select>
            </div>
          </div>
          {loading ? <p role="status">Loading books…</p> : visibleBooks.length === 0 ? (
            <p className="empty">{books.length === 0 ? 'No books to display yet.' : 'No books match this status.'}</p>
          ) : (
            <ul className="book-list">
              {visibleBooks.map(book => (
                <li key={book.id}>
                  <div>
                    <h3>{book.title}</h3>
                    <p className="author">{book.author}</p>
                    <span className="badge">{book.status}</span>
                  </div>
                  <div className="actions">
                    <button className="secondary" disabled={saving} onClick={() => handleEdit(book)} aria-label={`Edit ${book.title}`}>Edit</button>
                    <button className="danger" disabled={saving} onClick={() => handleDelete(book.id)} aria-label={`Delete ${book.title}`}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
