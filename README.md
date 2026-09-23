# MERN Stack CRUD App

I have an upcoming MERN Stack debugging interview where I'll be given an existing application containing an error. My task will be to identify and fix the error with AI assistance.

I've already built a simple MERN Task Manager application and now want to build another CRUD application from scratch to reinforce what I've learned.

My goal is to become more comfortable with MERN application architecture, understand how data flows between different components, and gain confidence navigating and debugging an unfamiliar codebase.

## Project: Reading List

I want to build a simple MERN Stack application that allows users to manage a personal collection of books.

The application should support the following functionality:

* Add a new book with a title, author, and reading status.

* View all books in the library.

* Update a book's information.

* Delete a book from the library.

* Filter books by reading status.

Each book should contain the following fields:

| Field          | Example                           |
|----------------|-----------------------------------|
| Title          | The Hobbit                        |
| Author         | J. R. R. Tolkien                  |
| Reading Status | Not Started, Reading, or Finished |

### Learning Objectives

My primary goal is to reinforce my understanding of MERN application architecture by building another complete CRUD application.

I want to become more comfortable with:

* Organizing a MERN application into frontend and backend directories.

* Creating React components and managing state using `useState` and `useEffect`.

* Handling forms, user input, and events in React.

* Making HTTP requests using `fetch` and `async/await`.

* Defining Express routes and implementing controller functions.

* Creating Mongoose models and performing MongoDB CRUD operations.

* Handling API responses, errors, and asynchronous operations.

* Understanding how data flows between the frontend, backend, and database.

* Debugging common issues across different parts of the application.

Since I've already built a Task Manager, I want to implement more of the application independently this time rather than following detailed instructions for every step.

### Development Plan

I want to build the application incrementally in four stages.

#### Stage 1: Backend Setup

Initialize a Node.js project, set up Express, and organize the backend into routes, controllers, and models.

Create a simple API endpoint to verify that the server is running correctly.

#### Stage 2: Database and CRUD Operations

Connect MongoDB using Mongoose and define a Book model with the appropriate fields.

Implement REST API endpoints for creating, retrieving, updating, and deleting books.

Test the API independently before building the frontend.

#### Stage 3: React Frontend

Create a simple React application that allows users to add, view, edit, and delete books.

Implement form handling, state management, and API requests.

Add a simple filter that allows users to display books based on their reading status.

#### Stage 4: Debugging Practice

Once the application is functional, introduce common bugs and practice identifying and fixing them.

Focus on issues such as incorrect API endpoints, missing or incorrect request data, asynchronous programming mistakes, React state management errors, and unexpected database query results.

Practice tracing a request from the React frontend through the Express backend to MongoDB and back.

### How I Want Codex to Help

I want to write the code myself rather than have the entire application generated for me.

Since I've already completed one MERN CRUD application, please give me more independence this time.

Start by helping me establish the project structure and identifying what I need to implement. Then let me attempt each stage independently.

When I encounter an error, help me investigate it by identifying the relevant files, examining error messages, and tracing the application's data flow. Avoid immediately providing a complete solution unless I explicitly request one.

When I encounter unfamiliar JavaScript syntax or concepts, explain them briefly and relate them to Python or C++ when useful.

Keep the application simple and prioritize practical knowledge that will help me navigate and debug an existing MERN application during my interview.
