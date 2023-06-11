const bodyParser = require("body-parser");
const {
  getRandomSingleObservation,
  saveSingleObservationPrediction,
} = require("../services/diabetes.js");
const { verifyToken } = require("../security/security.js");

const getRandomSingleObservationController = async (req, res) => {
  console.log("hit2");
  try {
    verifyToken(req.headers["authorization"]);
    const observation = await getRandomSingleObservation();

    res.status(200).json(observation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const saveSingleObservationPredictionController = async (req, res) => {
  try {
    verifyToken(req.headers["authorization"]);
    saveSingleObservationPrediction(
      req.body.objectId,
      req.body.prediction,
      req.body.userInfo
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(404).json({ success: false });
  }
};

const getConfigController = async (req, res) => {
  const diabetesConfig = require("../models/diabetes_config.json");
  res.status(200).json(diabetesConfig);
};

module.exports = {
  getRandomSingleObservationController,
  getConfigController,
  saveSingleObservationPredictionController,
};
