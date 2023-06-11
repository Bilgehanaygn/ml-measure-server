const {
  getRandomSingleObservation,
  saveSingleObservationPrediction,
} = require("../services/diabetes_multiclass.js");
const { verifyToken } = require("../security/security.js");

const getRandomSingleObservationController = async (req, res) => {
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
    console.log(req.body);
    saveSingleObservationPrediction(
      req.body.objectId,
      req.body.prediction,
      req.body.userInfo.concat(req.headers["authorization"])
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(404).json({ success: false });
  }
};

const getConfigController = async (req, res) => {
  const diabetesConfig = require("../models/diabetesmulticlass_config.json");
  res.status(200).json(diabetesConfig);
};

module.exports = {
  getRandomSingleObservationController,
  getConfigController,
  saveSingleObservationPredictionController,
};
