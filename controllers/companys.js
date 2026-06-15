const { getCollection } = require("../db/dbConnect.js");

const createCompany = async (req, res) => {
  const companyInfo = req.body;
  const newCompany = {
    ...companyInfo,
    createdAt: new Date()
  }
  const companyCollection = await getCollection("companys");
  const result = await companyCollection.insertOne(newCompany);
  return res.json(result);
};
const getRecruiterCompany = async (req, res) => {
  try {
    const query = {};
    if (req.query.recruiterId) {
      query.recruiterId = req.query.recruiterId;
    }
    const companyCollection = await getCollection("companys");
    const result = await companyCollection.find(query).toArray();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};
module.exports = { createCompany, getRecruiterCompany };
