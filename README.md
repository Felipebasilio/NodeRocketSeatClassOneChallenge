# NodeRocketSeatClassOneChallenge

## Task Management API

This project is a simple Task Management API developed using Node.js. It provides a basic CRUD system for managing tasks, with functionalities to create, read, update, delete, and mark tasks as completed.

### Features

- Create a new task
- List all tasks
- Update a task by its ID
- Delete a task by its ID
- Mark a task as completed or uncompleted by its ID
- Import tasks from a CSV file

### Endpoints

- `POST /tasks`: Create a new task. Requires `title` and `description` in the request body.
- `GET /tasks`: Retrieve all tasks or search by `title` and `description`.
- `PUT /tasks/:id`: Update a task by its ID. Allows partial updates of `title` or `description`.
- `DELETE /tasks/:id`: Delete a task by its ID.
- `PATCH /tasks/:id/complete`: Toggle a task's completion status.
- `POST /tasks/import`: Import tasks from a CSV file.

### Technologies Used

- Node.js
- File System (FS) Module
- UUID for task identification

### Getting Started

1. Clone the repository:
```
git clone <repository-url>
```

2. Install dependencies:
```
npm install
```

3. Start the application:
```
npm start
```

4. The API will be running at `http://localhost:3000`.

### License

This project is licensed under the MIT License.

