const { getCollection } = require("../db/dbConnect.js");

const createNewJob = async (req, res)=>{
    const jobData = req.body;
    const jobCollection = await getCollection("jobs");
    const result = await jobCollection.insertOne(jobData);
    res.json(result);
}
const getCompanyJobs = async (req, res)=>{
    const query = {};
    if(req.query.companyId){
        query.companyId = req.query.companyId;
    }
    if(req.query.status){
        query.status = req.query.status;
    }
    const jobCollection = await getCollection("jobs");
    const result = await jobCollection.find(query).toArray();
     res.json(result);
}

module.exports = {createNewJob, getCompanyJobs}