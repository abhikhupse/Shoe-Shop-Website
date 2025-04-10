const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/authController");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

module.exports = router;
