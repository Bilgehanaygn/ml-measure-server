const express = require("express");
const {
  getRandomSingleObservationController,
  getConfigController,
  saveSingleObservationPredictionController,
  getAnalyticsController,
} = require("../controllers/diabetes.js");

const router = express.Router();

router.get("/", getRandomSingleObservationController);
router.post("/", saveSingleObservationPredictionController);
router.get("/config", getConfigController);
router.get("/analytics", getAnalyticsController);

module.exports = router;
