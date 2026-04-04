const express = require("express");

const router = express.Router();
const {createRecord,getRecords} = require("../controllers/financeController");
const protect = require("../middleware/authMiddleware");



router.post("/", protect, createRecord);
router.get("/", protect, getRecords);

module.exports = router;