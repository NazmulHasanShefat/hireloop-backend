const { getCollection } = require("../db/dbConnect.js");

const getPlans = async (req, res) => {
  try {
    const query = {};
    if (req.query.planId) {
      query.id = req.query.planId;
    }
    const plansCollection = await getCollection("plans");
    if (req.query.planId) {
      const result = await plansCollection.findOne(query);
      return res.json(result);
    } else {
      const result = await plansCollection.find().toArray();
      return res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getPlans };
