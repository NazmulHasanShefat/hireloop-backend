const { getCollection } = require("../db/dbConnect.js");

const postJobApplication = async (req, res) => {
  const applicationBody = req.body;
  const newApplication = {
    ...applicationBody,
    createdAt: new Date(),
  };
  try {
    const applicationCollection = await getCollection("applicatios");
    const result = await applicationCollection.insertOne(newApplication);
   return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getApplicationsByApplicant = async (req, res) => {
  const query = {};
  if (req.query.applicantId) {
    query.applicant_id = req.query.applicantId;
    console.log("this is application seeker", req.user, " ", req.query.applicantId)
    if(req.user?._id.toString() !== req.query.applicantId){
      return res.status(403).json({message: "forbident access"})
    }
  }
  if (req.query.jobId) {
    query.jobId = req.query.jobId;
  }
  try {
    const applicationCollection = await getCollection("applicatios");
    const result = await applicationCollection.find(query).toArray();
   return res.json(result)
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postJobApplication, getApplicationsByApplicant };
