const { getCollection } = require("../db/dbConnect")

const CreateSubscription = async (req, res)=>{

    const data = req.body;
    const newSubscription = {
        ...data,
        createdAt: new Date()
    }
    try {
        const subscriptionsCollection = await getCollection("subscriptions");
        const userCollection = await getCollection("user")
        const result = await subscriptionsCollection.insertOne(newSubscription);
        // update the user plan information
        const filter = {email: data.email};
        const updatedDocument = {
            $set:{
                plan: data?.planId
            }
        }
        const updateResult = await userCollection.updateOne(filter, updatedDocument)
        res.json(updateResult);

    } catch (error) {
        console.log(error)
    }
}
module.exports = {CreateSubscription}