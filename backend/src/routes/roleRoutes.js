const express = require("express");
const { createRole } = require("../controllers/roleControllers");

const router = express.Router();

router.post("/create", createRole);

module.exports = router;
