const bodyParser = require("body-parser");
const client = require("../db/connection.js");
const { ObjectId } = require("mongodb");
const {
  getRandomSingleObservation,
  saveSingleObservationPrediction,
} = require("../services/diabetes_observations.js");

const database = client.db("diabetes_db");
const diabetesCollection = database.collection("diabetes_csv");

const getRandomSingleObservationController = async (req, res) => {
  try {
    const observation = await getRandomSingleObservation();

    res.status(200).json(observation);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const saveSingleObservationPredictionController = async (req, res) => {
  try {
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
