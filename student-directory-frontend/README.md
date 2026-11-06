Student Directory Application
A full-stack React and Node.js/Express application featuring JWT authentication, protected routes, MongoDB integration, and persistent user sessions.
---
Application Structure
React Auth Integration/
├── student-directory-backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Student.js
│   │   └── User.js
│   ├── node_modules/
│   ├── routes/
│   │   ├── auth.js
│   │   └── students.js
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── screenshots/
│   ├── 1_login_page.png
│   ├── 2_register_page.png
│   ├── 3_successful_login.png
│   ├── 4_failed_login.png
│   ├── 5_protected_route_redirect.png
│   └── 6_devtools_network.png
└── student-directory-frontend/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   └── useAuth.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Students.jsx
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .gitignore
    ├── .oxlintrc.json
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vite.config.js
```
---
Setup & Environment Configuration
Prerequisites
Node.js (v16+)
MongoDB Atlas account and cluster
1. Backend Setup (`student-directory-backend`)
Create a `.env` file inside the `student-directory-backend` directory with the following variables:
```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=<your_jwt_secret_key>
```
Install backend dependencies and start the server:
```
cd student-directory-backend
npm install
node server.js
```
The Express server runs on `http://localhost:3000`.
2. Frontend Setup (`student-directory-frontend`)
In a new terminal window, navigate to the frontend folder, install dependencies, and start the Vite dev server:
```bash
cd student-directory-frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
---
Reflection Questions
1. Why do we store the token in `localStorage`? What is one security risk of doing so, and what is a more secure alternative?
We store the JWT in `localStorage` to persist the user's authentication state across browser refreshes and tab reloads without forcing them to re-authenticate every time. The primary security risk of `localStorage` is its vulnerability to Cross-Site Scripting (XSS) attacks, as any malicious JavaScript executed within the domain context can access stored tokens. A more secure alternative is storing tokens in `HttpOnly`, `SameSite`, and `Secure` cookies, which are automatically attached to requests by the browser and inaccessible to client-side scripts.
2. What is the purpose of the `AuthContext`? Why not just pass the token as a prop to each component?
`AuthContext` provides a centralized, global state container for managing authentication tokens, user metadata, and helper methods (`login`, `logout`) across the entire React component tree. Passing tokens manually via props leads to severe prop drilling, forcing intermediate components to receive and forward properties they do not use. `AuthContext` keeps the code clean and allows any component to consume authentication state directly using the `useAuth()` custom hook.
3. What happens on the frontend when the JWT expires? Describe the user experience you would want to implement.
When a JWT expires, API requests to protected endpoints fail with a `401 Unauthorized` HTTP status code. To deliver an optimal user experience, the frontend should catch 401 responses globally, clear the invalid token from `localStorage` and `AuthContext` via `logout()`, display an informative message (e.g., "Your session has expired. Please log in again."), and automatically redirect the user to the `/login` route.
4. What is the difference between the backend's `requireAuth` middleware and the frontend's `ProtectedRoute` component? Why do we need both?
The backend's `requireAuth` middleware acts as the true security boundary by cryptographically verifying incoming JWT signatures and expiration before granting access to database endpoints. The frontend's `ProtectedRoute` component manages client-side navigation, preventing unauthenticated users from viewing protected UI routes in the browser. We need both because client-side routing guards can be bypassed in browser memory, making server-side validation mandatory for security while frontend protection ensures a proper user interface flow.