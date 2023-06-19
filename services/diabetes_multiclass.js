const client = require("../db/connection.js");
const { ObjectId } = require("mongodb");

const database = client.db("diabetes_db");
const diabetesMulticlassCollection = database.collection(
  "diabetesmulticlass_csv"
);
const diabetesMulticlassConfig = require("../models/diabetesmulticlass_config.json");

//the binary fields have to be converted to meaningfulText
const binaryToMeaningfullText = (singleObservation) => {
  for (let feature of diabetesMulticlassConfig.features) {
    if (feature.values?.toString() === ["No", "Yes"].toString()) {
      //if 0 change to No, if 1 change to Yes
      if (singleObservation[feature.data_label] == 0) {
        singleObservation[feature.data_label] = "No";
      } else {
        singleObservation[feature.data_label] = "Yes";
      }
    }
    // a special case, in the sex feature 0 states Female and 1 states Male
    else if (feature.data_label === "Sex") {
      if (singleObservation[feature.data_label] === "0") {
        singleObservation[feature.data_label] = "Female";
      } else {
        singleObservation[feature.data_label] = "Male";
      }
    }
    //other numeric to readable text castings
    else if (feature.values) {
      let nonZeroIndex = singleObservation[feature.data_label];
      singleObservation[feature.data_label] = feature.values[nonZeroIndex - 1];
    }
  }
  return singleObservation;
};

const getRandomSingleObservation = async () => {
  const query = { status: undefined };
  const observation = await diabetesMulticlassCollection.findOne(query);
  const prettiedObservation = binaryToMeaningfullText(observation);
  //set the status property of the document "active", thus the document can only be updated if its "active"
  await setStatusForSingleObservation(observation._id, "active");

  return prettiedObservation;
};

const setStatusForSingleObservation = async (id, status) => {
  const filter = { _id: new ObjectId(id) };

  const updateObservation = {
    $set: {
      status: status,
    },
  };

  await diabetesMulticlassCollection.updateOne(filter, updateObservation);
};

const saveSingleObservationPrediction = async (
  objectId,
  prediction,
  userInfo
) => {
  const filter = { _id: new ObjectId(objectId) };

  const observation = await diabetesMulticlassCollection.findOne(filter);

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

  await diabetesMulticlassCollection.updateOne(filter, updateObservation);
};

module.exports = {
  getRandomSingleObservation,
  saveSingleObservationPrediction,
};
