Folder Structure:
    bxtrack_task/
    │
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   └── userController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── roleMiddleware.js
    ├── models/
    │   ├── User.js
    │   └── Role.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── userRoutes.js
    ├── utils/
    │   └── generateToken.js
    ├── .env
    ├── server.js
    └── README.md


Architecture:
    Database: MongoDB with Mongoose for schema definition and data management.
    Server: Node.js with Express for handling API routes and middleware.
    Authentication: JWT for secure user authentication and session management.
    Authorization: Role-based access control (RBAC) to restrict access based on user roles.


Business Logic:
    Roles: super_admin, admin, user, guest
    Permissions:
        super_admin: 
            can:  read, add, update, remove the profiles of admins and users
        admin: 
            can: read, add, update, remove the users profiles
            can: read admin profiles
        user:
            can: create, read, update and remove profile
        guest:
            can: only check open routes like health check or static files

I setuped roles' permissions on endpoint basis, we can handle permissions on multiple action types on single endpoint as well. See permissions code in config/db.js


APIs:
    Health Check: GET /health
    Registration: POST /api/auth/register
    Login: POST /api/auth/login
    User Profile:
    Retrieve: GET /api/users/profile
    Update: PUT /api/users/profile