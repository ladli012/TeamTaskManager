# Team Task Manager (Full-Stack)

A professional, modern full-stack application designed to streamline team collaboration, project tracking, and task management. 
Built with a responsive frontend and a secure, scalable backend.


# Key Features & Functionality
Role-Based Access Control:

Admin Module: Create projects, assign tasks, track team progress, and manage users.
Member Module: View assigned tasks, filter by project, and update task statuses (Pending / Completed).
Secure Authentication: User registration and secure login protected with JSON Web Tokens (JWT).
Task Lifecycle Management: Perform CRUD operations on tasks with intuitive status updates.
Responsive Dashboard: Designed using modern CSS to ensure optimal accessibility across all devices.

# Technology Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB

# API Endpoints
- `POST /api/auth/signup` - Create a new user
- `POST /api/auth/login` - Login user
- `GET /api/task/my-tasks` - Get user-specific tasks
- `POST /api/task` - Create a new task (Admin only)


