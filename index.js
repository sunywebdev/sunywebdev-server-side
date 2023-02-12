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

///email settings
const Sib = require("sib-api-v3-sdk");
const emailclient = Sib.ApiClient.instance;
const apiKey = emailclient.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY_SENDINBLUE;
const tranEmailApi = new Sib.TransactionalEmailsApi();

async function run() {
	try {
		await client.connect();

		//DB Folder and Subfolder
		const database = client.db("sunywebdev");
		const projectsCollection = database.collection("projects");
		const usersCollection = database.collection("users");
		const mailsCollection = database.collection("mails");
		const reviewsCollection = database.collection("reviews");
		const blogsCollection = database.collection("blogs");

		/* ------
        ------ login , role, add user
        ------ */

		//To add new user when login or signup
		app.post("/users", async (req, res) => {
			const newuser = req.body;
			const result = await usersCollection.insertOne(newuser);
			res.json(result);
		});
		//To update or replace users data when login or signup
		app.put("/users", async (req, res) => {
			const user = req.body;
			const filter = { email: user?.email };
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
		});
		//Check Admin or Not
		app.get("/users/:email", async (req, res) => {
			const email = req.params.email;
			const filter = { email: email };
			const user = await usersCollection.findOne(filter);
			let isAdmin = false;
			if (user?.userRole === "Admin") {
				isAdmin = true;
			}
			res.json({ admin: isAdmin });
		});

		/* ------
        ------post all
        ------ */

		//To post new mail
		app.post("/mails", async (req, res) => {
			const newMail = req.body;
			tranEmailApi.sendTransacEmail({
				sender: {
					email: newMail?.userEmail,
					name: newMail?.userName,
				},
				to: [{ email: "suny.webdev@gmail.com" }],
				subject: `New Mail From ${newMail?.userName} in Portfolio.`,
				htmlContent: `
				<h4>Name :</h4> <span>${newMail?.userName}</span><br/>
				<h4>Email :</h4> <span>${newMail?.userEmail}</span><br/>
				<h4>Subject :</h4> <span>${newMail?.subject}</span><br/>
				<h4>Message :</h4> <span>${newMail?.message}</span><br/>
		`,
			});
			const result = await mailsCollection.insertOne(newMail);
			res.json(result);
		});
		//To post new reviews
		app.post("/reviews", async (req, res) => {
			const newReviews = req.body;
			tranEmailApi.sendTransacEmail({
				sender: {
					email: newReviews?.userEmail,
					name: newReviews?.userName,
				},
				to: [{ email: "suny.webdev@gmail.com" }],
				subject: `New ${newReviews?.star} Star Reviews From ${newReviews?.userName} in Portfolio.`,
				htmlContent: `
				<h4>Name :</h4> <span>${newReviews?.userName}</span><br/>
				<h4>Email :</h4> <span>${newReviews?.userEmail}</span><br/>
				<h4>Rating Star :</h4> <span>${newReviews?.star}</span><br/>
				<h4>Review :</h4> <span>${newReviews?.userReview}</span><br/>
		`,
			});
			const result = await reviewsCollection.insertOne(newReviews);
			res.json(result);
		});
		//To post new blog
		app.post("/blogs", async (req, res) => {
			const newBlog = req.body;
			const result = await blogsCollection.insertOne(newBlog);
			res.json(result);
		});
		//To post new projects
		app.post("/projects", async (req, res) => {
			const newProject = req.body;
			const result = await projectsCollection.insertOne(newProject);
			res.json(result);
		});
		// To store/update single project data
		app.put("/projects/:id", async (req, res) => {
			const id = req.params.id;
			const projectId = { _id: ObjectId(id) };
			const updatedReq = req.body;
			const options = { upsert: true };
			const updateProject = {
				$set: {
					projectName: updatedReq.projectName,
					projectType: updatedReq.projectType,
					projectDetails: updatedReq.projectDetails,
					feature1: updatedReq.feature1,
					feature2: updatedReq.feature2,
					feature3: updatedReq.feature3,
					feature4: updatedReq.feature4,
					feature5: updatedReq.feature5,
					feature6: updatedReq.feature6,
					feature7: updatedReq.feature7,
					feature8: updatedReq.feature8,
					techUsed: updatedReq.techUsed,
					liveLink: updatedReq.liveLink,
					gitClientLink: updatedReq.gitClientLink,
					gitServerLink: updatedReq.gitServerLink,
					projectPhoto1: updatedReq.projectPhoto1,
					projectPhoto2: updatedReq.projectPhoto2,
					projectPhoto3: updatedReq.projectPhoto3,
					projectPhoto4: updatedReq.projectPhoto4,
					submitTime: updatedReq.submitTime,
					sort: updatedReq.sort,
				},
			};
			const result = await projectsCollection.updateOne(
				projectId,
				updateProject,
				options,
			);
			res.json(result);
		});

		/* ------
        ------Show all
        ------ */

		//To Show all users
		app.get("/users", async (req, res) => {
			const get = usersCollection.find({});
			users = await get.toArray();
			res.send(users);
		});
		//To Show all projects
		app.get("/projects", async (req, res) => {
			const get = projectsCollection.find({});
			projects = await get.toArray();
			res.send(projects);
		});
		//To Show all reviews
		app.get("/reviews", async (req, res) => {
			const get = reviewsCollection.find({});
			reviews = await get.toArray();
			res.send(reviews);
		});
		//To Show all Blogs
		app.get("/blogs", async (req, res) => {
			const get = blogsCollection.find({});
			blogs = await get.toArray();
			res.send(blogs);
		});
		//To Show all mails
		app.get("/mails", async (req, res) => {
			const get = mailsCollection.find({});
			mails = await get.toArray();
			res.send(mails);
		});
		//To load single project by id
		app.get("/projects/:id", async (req, res) => {
			const id = req.params.id;
			const findId = { _id: ObjectId(id) };
			const result = await projectsCollection.findOne(findId);
			res.send(result);
		});

		/* ------
        ------delete all
        ------ */

		//To Delete user one by one
		app.delete("/users/:id", async (req, res) => {
			const id = req.params.id;
			const deleteId = { _id: ObjectId(id) };
			const result = await usersCollection.deleteOne(deleteId);
			res.send(result);
		});

		//To Delete projects one by one
		app.delete("/projects/:id", async (req, res) => {
			const id = req.params.id;
			const deleteId = { _id: ObjectId(id) };
			const result = await projectsCollection.deleteOne(deleteId);
			res.send(result);
		});
		//To Delete reviews one by one
		app.delete("/reviews/:id", async (req, res) => {
			const id = req.params.id;
			const deleteId = { _id: ObjectId(id) };
			const result = await reviewsCollection.deleteOne(deleteId);
			res.send(result);
		});
		//To Delete mails one by one
		app.delete("/mails/:id", async (req, res) => {
			const id = req.params.id;
			const deleteId = { _id: ObjectId(id) };
			const result = await mailsCollection.deleteOne(deleteId);
			res.send(result);
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
