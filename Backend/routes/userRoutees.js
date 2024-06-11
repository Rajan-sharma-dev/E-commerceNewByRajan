const express = require("express");
const { registerUser, 
    loginUser, logout,
     forgotPassword, 
     resetPassword, 
     getUserDetails, updatePassword,
     updateProfile,
     getAllUser,
     getSingleUser,
     deleteUser,
     updateUserRole
     } = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");

const router = express.Router();
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forget").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").post(logout)
router.route("/userDetails").post(getUserDetails)
router.route("/userDetails/update").post(updateProfile)
router.route("/password/update").put(updatePassword)

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);


module.exports = router