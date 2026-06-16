const express = require("express");
const { createNewJob, getCompanyJobs, getRecruiterJobs, getJobs, getJobDetail } = require("../controllers/jobs.js");
const { createCompany, getRecruiterCompany, getAllCompanies, updateCompany } = require("../controllers/companys.js");
const { postJobApplication, getApplicationsByApplicant } = require("../controllers/application.js");
const { getPlans } = require("../controllers/plans.js");
const { CreateSubscription } = require("../controllers/subscriptions.js");
const { getAllusers } = require("../controllers/users.js");
const appRouter = express.Router();

appRouter.post("/create-new-job", createNewJob);
appRouter.get("/companyjob", getCompanyJobs);
appRouter.post("/createcompany", createCompany);
appRouter.get("/recruiter-company", getRecruiterCompany);
appRouter.get("/get-recruiter-jobs", getRecruiterJobs);
appRouter.get("/jobs", getJobs);
appRouter.get("/jobdetail/:id",getJobDetail);
appRouter.post("/postjobApplication", postJobApplication);
appRouter.get("/getjobApplicationByApplicant", getApplicationsByApplicant);
appRouter.get("/plans",getPlans);
appRouter.post("/subscription", CreateSubscription);
appRouter.get("/users", getAllusers)
appRouter.get("/companys", getAllCompanies)
appRouter.patch("/update-company/:id", updateCompany)

module.exports = { appRouter }