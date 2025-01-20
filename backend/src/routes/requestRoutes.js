const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRequest,
  approveRequest,
  rejectRequest,
  getRequestsByPosterId
} = require("../controllers/requestController");

// Request routes
router.post("/", authMiddleware,createRequest); // Create a new request
router.post("/:id/approve",authMiddleware, approveRequest); // Approve a request
router.post("/:id/reject",authMiddleware, rejectRequest); // Reject a request
router.get("/requests/poster",authMiddleware, getRequestsByPosterId);
module.exports = router;
