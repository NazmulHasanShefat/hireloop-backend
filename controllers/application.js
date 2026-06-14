const { getCollection } = require("../db/dbConnect.js")

const applicationCollection = await getCollection("applicatios")
const postJobApplication = async (req, res)=>{
    const applicationBody = req.body;
    const newApplication = {
        ...applicationBody,
        createdAt: new Date()
    }
    try {
        const result = await applicationCollection.insertOne(newApplication);
        res.json(result);
    } catch (error) {
        console.log(error)
    }
}