const express = require("express");

const router = express.Router();

const {createRecord} = require("../controllers/financeController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createRecord);

module.exports = router;