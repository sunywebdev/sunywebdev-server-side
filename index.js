const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

//To select ID from MongoDB
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//MongoDB linking
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sunywebdev.7tytk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function run() {
	try {
		await client.connect();

		//DB Folder and Subfolder
		const database = client.db("sunywebdev");
		const projectsCollection = database.collection("projects");
		const usersCollection = database.collection("users");
		const mailsCollection = database.collection("mails");
		const reviewsCollection = database.collection("reviews");

		/* ------
        ------ login , role, add user
        ------ */

		//To add new user when login or signup
		app.post("/users", async (req, res) => {
			const newuser = req.body;
			console.log("Request from UI ", newuser);
			const result = await usersCollection.insertOne(newuser);
			console.log("Successfully Added New User ", result);
			res.json(result);
		});
		//To update or replace users data when login or signup
		app.put("/users", async (req, res) => {
			console.log(req.body);
			const user = req.body;
			const filter = { email: user?.email };
			console.log("Request to replace or add user", user);
			const options = { upsert: true };
			const updateuser = {
				$set: {
					email: user?.email,
					displayName: user?.displayName,
					photoURL: user?.photoURL,
				},
			};
			const result = await usersCollection.updateOne(
				filter,
				updateuser,
				options,
			);
			res.json(result);
			console.log("Successfully replaced or added user", result);
		});
		//Check Admin or Not
		app.get("/users/:email", async (req, res) => {
			const email = req.params.email;
			console.log("from UI", email);
			const filter = { email: email };
			console.log("Request to find ", filter);
			const user = await usersCollection.findOne(filter);
			console.log(user);
			let isAdmin = false;
			if (user?.userRole === "Admin") {
				isAdmin = true;
			}
			res.json({ admin: isAdmin });
			console.log("Found one", user);
		});

		/* ------
        ------post all
        ------ */

		//To post new mail
		app.post("/mails", async (req, res) => {
			const newMail = req.body;
			console.log("Request from UI ", newMail);
			const result = await mailsCollection.insertOne(newMail);
			console.log("Successfully Added new Mail ", result);
			res.json(result);
		});
		//To post new reviews
		app.post("/reviews", async (req, res) => {
			const newReviews = req.body;
			console.log("Request from UI ", newReviews);
			const result = await reviewsCollection.insertOne(newReviews);
			console.log("Successfully Added New reviews ", result);
			res.json(result);
		});
		//To post new projects
		app.post("/projects", async (req, res) => {
			const newProject = req.body;
			console.log("Request from UI ", newProject);
			const result = await projectsCollection.insertOne(newProject);
			console.log("Successfully Added New Project ", result);
			res.json(result);
		});
		// To store/update single project data
		app.put("/projects/:id", async (req, res) => {
			const id = req.params.id;
			console.log("Request to update ", id);
			const projectId = { _id: ObjectId(id) };
			const updatedReq = req.body;
			console.log("Comming form UI", updatedReq);
			const options = { upsert: true };
			const updateProject = {
				$set: {
					projectName: updatedReq.projectName,
					projectDetails: updatedReq.projectDetails,
					techUsed: updatedReq.techUsed,
					liveLink: updatedReq.liveLink,
					gitClientLink: updatedReq.gitClientLink,
					gitServerLink: updatedReq.gitServerLink,
					projectPhoto: updatedReq.projectPhoto,
				},
			};
			const result = await projectsCollection.updateOne(
				projectId,
				updateProject,
				options,
			);
			res.json(result);
			console.log("Updated Successfully", result);
		});

		/* ------
        ------Show all
        ------ */

		//To Show all users
		app.get("/users", async (req, res) => {
			console.log(req.query);
			const get = usersCollection.find({});
			console.log("Request to find users");
			users = await get.toArray();
			res.send(users);
			console.log("Found all users", users);
		});
		//To Show all projects
		app.get("/projects", async (req, res) => {
			console.log(req.query);
			const get = projectsCollection.find({});
			console.log("Request to find projects");
			projects = await get.toArray();
			res.send(projects);
			console.log("Found all projects", projects);
		});
		//To Show all reviews
		app.get("/reviews", async (req, res) => {
			console.log(req.query);
			const get = reviewsCollection.find({});
			console.log("Request to find reviews");
			reviews = await get.toArray();
			res.send(reviews);
			console.log("Found all reviews", reviews);
		});
		//To Show all mails
		app.get("/mails", async (req, res) => {
			console.log(req.query);
			const get = mailsCollection.find({});
			console.log("Request to find mails");
			mails = await get.toArray();
			res.send(mails);
			console.log("Found all mails", mails);
		});
		//To load single project by id
		app.get("/projects/:id", async (req, res) => {
			const id = req.params.id;
			console.log("Request to find ", id);
			const findId = { _id: ObjectId(id) };
			const result = await projectsCollection.findOne(findId);
			res.send(result);
			console.log("Found one", result);
		});

		/* ------
        ------delete all
        ------ */

		//To Delete user one by one
		app.delete("/users/:id", async (req, res) => {
			const id = req.params.id;
			console.log("Request to delete ", id);
			const deleteId = { _id: ObjectId(id) };
			const result = await usersCollection.deleteOne(deleteId);
			res.send(result);
			console.log("user Successfully Deleted", result);
		});
		//To Delete projects one by one
		app.delete("/projects/:id", async (req, res) => {
			const id = req.params.id;
			console.log("Request to delete ", id);
			const deleteId = { _id: ObjectId(id) };
			const result = await projectsCollection.deleteOne(deleteId);
			res.send(result);
			console.log("projects Successfully Deleted", result);
		});
		//To Delete reviews one by one
		app.delete("/reviews/:id", async (req, res) => {
			const id = req.params.id;
			console.log("Request to delete ", id);
			const deleteId = { _id: ObjectId(id) };
			const result = await reviewsCollection.deleteOne(deleteId);
			res.send(result);
			console.log("reviews Successfully Deleted", result);
		});
		//To Delete mails one by one
		app.delete("/mails/:id", async (req, res) => {
			const id = req.params.id;
			console.log("Request to delete ", id);
			const deleteId = { _id: ObjectId(id) };
			const result = await mailsCollection.deleteOne(deleteId);
			res.send(result);
			console.log("mails Successfully Deleted", result);
		});
	} finally {
		//await client.close();
	}
}
run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("sunywebdev Server is running just fine");
});

app.listen(port, () => {
	console.log("sunywebdev Server running on port :", port);
});
