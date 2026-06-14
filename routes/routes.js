const express = require("express");
const { createNewJob, getCompanyJobs } = require("../controllers/jobs.js");
const { createCompany, getRecruiterCompany } = require("../controllers/companys.js");
const appRouter = express.Router();
appRouter.post("/create-new-job", createNewJob);
appRouter.get("/companyjob", getCompanyJobs);
appRouter.post("/createcompany", createCompany);
appRouter.get("/recruiter-company", getRecruiterCompany);
module.exports = { appRouter }