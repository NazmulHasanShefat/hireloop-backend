const dotenv = require("dotenv");
const { getCollection } = require("../db/dbConnect.js");
const { ObjectId } = require("mongodb");
dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req?.headers?.authorization;
    if (!authHeader) {
      return res.json({ message: "unAuthorized access denied" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "unAuthorized access denied" });
    }

    const query = { token: token };
    const sessionCollection = await getCollection("session");
    const session = await sessionCollection.findOne(query);
     if (!session) {
      return res.status(401).json({ message: "unAuthorized access denied" });
    }
    // console.log(session)
    const userId = session?.userId;
    const userQuery = {
      _id: userId,
    };
    const userCollection = await getCollection("user");
    const user = await userCollection.findOne(userQuery);
       if (!user) {
      return res.status(401).json({ message: "unAuthorized access denied" });
    }
    //  set data in the request object
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

const verifySeeker = async (req, res, next) => {
  try {
    if (req.user?.role !== "seeker") {
      return res.status(403).json({ message: "forbident access" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "forbident access" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

const verifyRecruiter = async (req, res, next) => {
  try {
    if (req.user?.role !== "recruiter") {
      return res.status(403).json({ message: "forbident access" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  verifyToken,
  verifySeeker,
  verifyRecruiter,
  verifyAdmin,
};
