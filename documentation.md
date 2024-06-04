
Architecture:
    Database: MongoDB with Mongoose for schema definition and data management.
    Server: Node.js with Express for handling API routes and middleware.
    Authentication: JWT for secure user authentication and session management.
    Authorization: Role-based access control (RBAC) to restrict access based on user roles.


Business Logic:
    Roles: super_admin, admin, user, guest (uauthenticated)
    Permissions:
        super_admin: 
            can:  read, add, update, remove the profiles of admins and users
        admin: 
            can: read, add, update, remove the users profiles
            can: read admin profiles
            can: read and update gis profiles
            cannot: update roles of profiles
        user:
            can: create, read, update and remove his profile
            cannot: update role of his profile
        guest:
            can: only check open routes like health check or static files

I setuped roles' permissions on endpoint basis, we can handle permissions on multiple action types on single endpoint as well. See permissions code in config/db.js


APIs: (check routes folder)
Health Cheak Endpoint (in app.js)
Auth Endpoints
Admin Endpoints
User Endpoints
