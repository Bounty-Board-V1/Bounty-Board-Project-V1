const express = require("express");
const router = express.Router();
const {
  createRequest,
  approveRequest,
  rejectRequest,
} = require("../controllers/requestController");

// Request routes
router.post("/", createRequest); // Create a new request
router.post("/:id/approve", approveRequest); // Approve a request
router.post("/:id/reject", rejectRequest); // Reject a request

module.exports = router;
