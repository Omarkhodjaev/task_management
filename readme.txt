
1. superAdmin yaratish >>> 

router.post(
  "/create",
  // authorizationMiddleware.checkToken,
  // authorizationMiddleware.checkUser,
  // authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userController.create(req, res);
  }
);

2.  userController ichida >>> 

// if (req.currentUser.role === "admin" && dto.role === "superAdmin") {
      //   throw new AdminCannotAssignSuperAdmin();
      // }

___________________________________________________________________________________________________________

My Environment >>>

PORT=2400
JWT_KEY=OK
JWT_EXPIREDIN=3600000

DB_NAME=task_management
DB_PORT=5432
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=2004