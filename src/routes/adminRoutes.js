const express = require("express")
const router = express.Router()
const {
  simulateError, simulateDelay, simulateCPU, simulateMemory,
} = require("../controllers/adminController")

router.post("/simulate-error", simulateError)
router.post("/simulate-delay", simulateDelay)
router.post("/simulate-cpu", simulateCPU)
router.post("/simulate-memory", simulateMemory)

module.exports = router
