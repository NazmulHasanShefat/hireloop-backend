const { ObjectId } = require("mongodb");
const { getCollection } = require("../db/dbConnect.js");

const createNewJob = async (req, res) => {
  const jobData = req.body;
  const newJob = {
    ...jobData,
    createdAt: new Date(),
  };
  const jobCollection = await getCollection("jobs");
  const result = await jobCollection.insertOne(newJob);
  return res.json(result);
};
const getCompanyJobs = async (req, res) => {
  const query = {};
  if (req.query.companyId) {
    query.companyId = req.query.companyId;
  }
  if (req.query.status) {
    query.status = req.query.status;
  }
  const jobCollection = await getCollection("jobs");
  const result = await jobCollection.find(query).toArray();
  return res.json(result);
};
const getJobs = async (req, res) => {
  try {
    const jobCollection = await getCollection("jobs");

    const result = await jobCollection.find().toArray();
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getRecruiterJobs = async (req, res) => {
  try {
    const query = {};
    if (req.query.recruiterId) {
      query.recruiterId = req.query.recruiterId;
    }
    const jobsCollection = await getCollection("jobs");
    const result = await jobsCollection.find(query).toArray();
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getJobDetail = async (req, res) => {
  const id = req.params;
  const query = { _id: new ObjectId(id) };
  try {
    const jobCollection = await getCollection("jobs");
    const result = await jobCollection.findOne(query);
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getJobsWithLinit = async (req, res) => {
  try {
    const pipeline = [
      {
        $skip: 2,
      },
      {
        $limit: 2,
      },
    ];
    const jobCollection = await getCollection("jobs");

    const result = await jobCollection.aggregate(pipeline).toArray();
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const jobGroup = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$jobType",
           status: { $first: "$status" },
        },
      },
      { $project: {jobType: "$_id", status: 1} }
    ];
    const jobCollection = await getCollection("jobs");
    const result = await jobCollection.aggregate(pipeline).toArray();
     res.json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewJob,
  getCompanyJobs,
  getRecruiterJobs,
  getJobs,
  getJobDetail,
  getJobsWithLinit,
  jobGroup
};
