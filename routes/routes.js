const express = require("express");
const { createNewJob, getCompanyJobs, getRecruiterJobs, getJobs, getJobDetail, getJobsWithLinit, jobGroup } = require("../controllers/jobs.js");
const { createCompany, getRecruiterCompany, getAllCompanies, updateCompany } = require("../controllers/companys.js");
const { postJobApplication, getApplicationsByApplicant } = require("../controllers/application.js");
const { getPlans } = require("../controllers/plans.js");
const { CreateSubscription } = require("../controllers/subscriptions.js");
const { getAllusers } = require("../controllers/users.js");
const { verifyToken, verifySeeker, verifyAdmin } = require("../middleware/verifyToken.js");
const appRouter = express.Router();

appRouter.post("/create-new-job", createNewJob);
appRouter.get("/companyjob", getCompanyJobs);
appRouter.post("/createcompany", createCompany);
appRouter.get("/recruiter-company", getRecruiterCompany);
appRouter.get("/get-recruiter-jobs", getRecruiterJobs);
appRouter.get("/jobs", getJobs);
appRouter.get("/jobdetail/:id",getJobDetail);
appRouter.post("/postjobApplication", postJobApplication);
appRouter.get("/getjobApplicationByApplicant", verifyToken, verifySeeker, getApplicationsByApplicant);
appRouter.get("/plans",getPlans);
appRouter.post("/subscription", CreateSubscription);
appRouter.get("/users", getAllusers)
appRouter.get("/companys", verifyToken, verifyAdmin, getAllCompanies)
appRouter.patch("/update-company/:id", verifyToken, verifyAdmin, updateCompany)



appRouter.get("/joblimit",getJobsWithLinit);
appRouter.get("/jobgroup", jobGroup)

module.exports = { appRouter }