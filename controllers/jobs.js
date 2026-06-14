const { getCollection } = require("../db/dbConnect.js");

const createNewJob = async (req, res)=>{
    const jobData = req.body;
    const newJob = {
        ...jobData,
        createdAt: new Date()
    }
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
const getRecruiterJobs = async (req, res)=>{
    try {
        const query = {};
        if(req.query.recruiterId){
            query.recruiterId = req.query.recruiterId
        }
        const jobsCollection = await getCollection("jobs");
        const result = await jobsCollection.find(query).toArray();
        res.json(result);

    } catch (error) {
        console.log(error)
    }
}

module.exports = {createNewJob, getCompanyJobs, getRecruiterJobs}