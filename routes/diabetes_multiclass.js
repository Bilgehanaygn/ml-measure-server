const express = require("express");
const {
  getRandomSingleObservationController,
  getConfigController,
  saveSingleObservationPredictionController,
} = require("../controllers/diabetes_multiclass.js");

const router = express.Router();

router.get("/", getRandomSingleObservationController);
router.get("/config", getConfigController);
router.post("/", saveSingleObservationPredictionController);

module.exports = router;
