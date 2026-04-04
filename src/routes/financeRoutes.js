const express = require("express");

const router = express.Router();
const {createRecord,getRecords,getSingleRecord,deleteRecord,getSummary} = require("../controllers/financeController");
const protect = require("../middleware/authMiddleware");



router.post("/", protect, createRecord);
router.get("/", protect, getRecords);
router.get("/summary", protect, getSummary);
router.get("/:id", protect, getSingleRecord);
router.delete("/:id", protect, deleteRecord);


module.exports = router;