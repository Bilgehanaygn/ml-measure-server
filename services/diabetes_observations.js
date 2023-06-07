const client = require("../db/connection.js");
const { ObjectId } = require("mongodb");

const database = client.db("diabetes_db");
const diabetesCollection = database.collection("diabetes_csv");

const getRandomSingleObservation = async () => {
  const query = { status: undefined };
  const observation = await diabetesCollection.findOne(query);

  //set the status property of the document "active", thus the document can only be updated if its "active"
  await setStatusForSingleObservation(observation._id, "active");

  return observation;
};

const setStatusForSingleObservation = async (id, status) => {
  const filter = { _id: new ObjectId(id) };

  const updateObservation = {
    $set: {
      status: status,
    },
  };

  await diabetesCollection.updateOne(filter, updateObservation);
};

const saveSingleObservationPrediction = async (
  objectId,
  prediction,
  userInfo
) => {
  const filter = { _id: new ObjectId(objectId) };

  const observation = await diabetesCollection.findOne(filter);

  if (observation?.status != "active") {
    throw "Status is not active for this observation.";
  }

  const updateObservation = {
    $set: {
      status: "fetched",
      prediction: prediction,
      userInfo: userInfo,
    },
  };

  await diabetesCollection.updateOne(filter, updateObservation);
};

module.exports = {
  getRandomSingleObservation,
  saveSingleObservationPrediction,
};
