# 📋 Task Management Application

A full-stack web application for task management, similar to Trello, built using the MERN (MongoDB, Express.js, React, Node.js) stack.

## ✨ Features

- Create, update, and manage tasks within different columns
- User authentication (sign up, log in)
- Google OAuth integration for easy login
- Drag-and-drop functionality for tasks
- Responsive design with Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- React (with Vite)
- React Router Dom
- Tailwind CSS
- Axios
- Sonner (for toast notifications)
- Lucide React (for icons)
- React Beautiful DnD

### Backend

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Passport.js (for Google OAuth2)
- JSON Web Tokens (JWT)
- Bcrypt
- Zod (for validation)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB

## 🚀 Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/tapadar13/task-manager.git
   cd task-manager
   ```

2. Install backend dependencies:

   ```sh
   cd server
   npm install
   ```

3. Install frontend dependencies:

   ```sh
   cd ../client
   npm install
   ```

4. Set up environment variables:

   - In the `server` directory, create a `.env` file and add the following:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     FRONTEND_URL="http://localhost:5173"
     BACKEND_URL="http://localhost:3000"
     ```

5. Configure the API URL:
   - In the `client/src/services/api.js` file, ensure the `API_URL` is set correctly:
     ```javascript
     export const API_URL = "http://localhost:3000/api";
     ```
   - If you need to use a different URL for local development, you can modify this line accordingly.

## 🏃‍♂️ Running the Application

1. Start the backend server:

   ```sh
   cd server
   npm run dev
   ```

2. In a new terminal, start the frontend development server:

   ```sh
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to view the application.

## 📚 API Documentation

Here's a brief overview of the main API endpoints:

### Authentication Routes

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in a user
- `GET /api/auth/google`: Initiate Google OAuth2 authentication
- `GET /api/auth/google/callback`: Google OAuth2 callback route

### Task Routes

- `GET /api/tasks`: Retrieve all tasks for the authenticated user
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task

### Google OAuth2 Flow

1. The client initiates Google OAuth2 authentication by redirecting the user to `/api/auth/google`.
2. After successful authentication with Google, the user is redirected to `/api/auth/google/callback`.
3. The callback route authenticates the user, generates a JWT token, and redirects to the frontend dashboard with the token and user ID as query parameters.

Example of the Google OAuth2 routes implementation:

```javascript
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const { user, token } = req.user;
    res.redirect(
      `${process.env.FRONTEND_URL}/dashboard?token=${token}&userId=${user._id}`
    );
  }
);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the blazing fast frontend tooling
