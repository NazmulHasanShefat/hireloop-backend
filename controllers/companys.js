const { ObjectId } = require("mongodb");
const { getCollection } = require("../db/dbConnect.js");

const createCompany = async (req, res) => {
  const companyInfo = req.body;
  const newCompany = {
    ...companyInfo,
    status: "pending",
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
    return res.json(result);
  } catch (error) {
    res.json(error);
  }
};

const getAllCompanies = async (req, res)=>{
  try {
    const companiesCollection = await getCollection("companys");
    const result = await companiesCollection.find().toArray();
    return res.json(result);
  } catch (error) {
    console.log(error)
  }
}

const updateCompany = async (req, res)=>{
  const id = req.params.id;
  try {
    const filter = {_id: new ObjectId(id)};
    const updateCompany = req.body;
    const updatedDocument = {
      $set: {
        status: updateCompany.status,
      }
    }
    const companiesCollection = await getCollection("companys");
    const result = await companiesCollection.updateOne(filter, updatedDocument)
    return res.json(result)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { createCompany, getRecruiterCompany, getAllCompanies, updateCompany };
