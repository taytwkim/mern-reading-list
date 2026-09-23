# Reading List frontend

A basic React + Vite scaffold. The form, editing, deletion handlers, state updates,
loading/error states, and client-side status filter are wired up. HTTP requests use
the built-in fetch API in `src/api/books.js`.

## Run locally

Use Node.js 22.12 or later and npm. First follow the [backend setup](../api/README.md)
and keep its server running in a separate terminal.

From the repository root, in a new terminal:

```bash
cd client
npm install
npm run dev
```

Open the URL printed by Vite. The development proxy in `vite.config.js` forwards
`/api` to `http://localhost:3000`. Change that target if your backend uses another
port. The proxy is for development; production hosting needs its own API routing.
No frontend `.env` file is required. MongoDB credentials belong only in `api/.env`.

If Vite reports `ECONNREFUSED` for `/api/books`, check that the backend has finished
connecting to MongoDB and is listening on the proxy's configured port.

## API functions

1. `getBooks`: GET `/api/books`, check `response.ok`, return parsed JSON.
2. `createBook`: POST JSON with all three fields; return the new book.
3. `updateBook`: PATCH `/api/books/:id` with all three fields; return the updated book.
4. `deleteBook`: DELETE `/api/books/:id`; check success without parsing a 204 body.

Book responses use `{ id, title, author, status }`. The backend maps MongoDB's `_id`
to `id`. Unsuccessful responses throw an Error using the backend message when
available, or the HTTP status otherwise, so the existing UI can show it.

`src/App.jsx` contains the React state, effect, and event handlers. React StrictMode
may run the initial effect twice in development; the effect ignores stale results.

## Checks

```bash
npm run lint
npm run build
```
