const BASE_URL = '/api/books';

async function checkResponse(response) {
  // fetch does not throw for HTTP errors such as 400 or 404.
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || `Request failed (${response.status})`);
  }
}

export async function getBooks() {
  const response = await fetch(BASE_URL);
  await checkResponse(response);
  return response.json();
}

export async function createBook(book) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  await checkResponse(response);
  return response.json();
}

export async function updateBook(id, book) {
  const response = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  await checkResponse(response);
  return response.json();
}

export async function deleteBook(id) {
  const response = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  await checkResponse(response);
  // A successful DELETE returns 204 with no body, so do not call json().
}
