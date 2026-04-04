const express = require("express");

const router = express.Router();
const {createRecord,getRecords,getSingleRecord,deleteRecord} = require("../controllers/financeController");
const protect = require("../middleware/authMiddleware");



router.post("/", protect, createRecord);
router.get("/", protect, getRecords);
router.get("/:id", protect, getSingleRecord);
router.delete("/:id", protect, deleteRecord);

module.exports = router;