# API

Express and Mongoose backend for the book library.

## Requirements

- Node.js 22.12 or later and npm.
- A MongoDB connection URI. For Atlas, use a database user with access to the
  `test` database and allow your current IP in the project's network access settings.

## Run locally

From the repository root:

```bash
cd api
npm install
cp .env.example .env
```

For an existing setup, keep your current `.env` instead of copying over it.
Edit `.env` and fill in `MONGODB_URI` with your MongoDB connection URI.
Leave `PORT=3000` to match the frontend's default proxy target.
The `.env` file is ignored by Git; keep credentials out of committed files.

```bash
npm run dev
```

The server connects to MongoDB before listening for HTTP requests. Once connected,
it prints `Server running at http://localhost:3000` (or your configured port).
Node's watch mode restarts the server when source files change.

The connection explicitly selects the `test` database in `config/db.js`.
The `Book` model uses its `books` collection, alongside any existing `tasks`
collection. You do not need to create the collection manually.

Keep this terminal running and start the [frontend](../client/README.md) in another
terminal. If you change `PORT`, also update the target in `client/vite.config.js`
and restart Vite.

## API endpoints

| Method | Path | Result |
|--------|------|--------|
| GET | `/api/books` | List books (`200`) |
| POST | `/api/books` | Create a book (`201`) |
| PATCH | `/api/books/:id` | Update a book (`200`) |
| DELETE | `/api/books/:id` | Delete a book (`204`, no response body) |

POST and PATCH require a JSON body with all three fields: `title`, `author`, and
`status`. Allowed statuses are `Not Started`, `Reading`, and `Finished`.
Responses expose the MongoDB ObjectId as a string named `id`.
Invalid input returns `400`; an update or delete for a missing book returns `404`.
Reading-status filtering happens in the frontend.

## Quick check

With the server running, open another terminal:

```bash
curl -i http://localhost:3000/api/books
```

Expect `200 OK` and a JSON array (empty if no books have been added).
If startup fails, check your URI, database-user permissions, and Atlas network access.
