const { getCollection } = require("../db/dbConnect.js");

const getAllusers = async (req, res) => {
  try {
    const usersCollection = await getCollection("user");
    const result = await usersCollection.find().toArray();
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {getAllusers}