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
		const blogsCollection = database.collection("blogs");

		///////////////////////
		/////////////////////////
		///////////////////////
		const formsCollection = database.collection("forms");
		const forms2Collection = database.collection("forms2");
		const emailsCollection = database.collection("emails");
		const headlineCollection = database.collection("headline");
		const linksCollection = database.collection("links");
		const detailsCollection = database.collection("details");
		const bannerCollection = database.collection("banner");
		const profileCollection = database.collection("profile");
		const galleryCollection = database.collection("gallery");
		const reviewCollection = database.collection("allreviews");

		//To post new forms
		app.post("/forms", async (req, res) => {
			const newForms = req.body;
			console.log("Request from UI ", newForms);
			const result = await formsCollection.insertOne(newForms);
			console.log("Successfully Added New forms ", result);
			res.json(result);
		});
		//To post new forms2
		app.post("/forms2", async (req, res) => {
			const newForms = req.body;
			console.log("Request from UI ", newForms);
			const result = await forms2Collection.insertOne(newForms);
			console.log("Successfully Added New forms ", result);
			res.json(result);
		});
		//To post new review
		app.post("/review", async (req, res) => {
			const review = req.body;
			console.log("Request from UI ", review);
			const result = await reviewCollection.insertOne(review);
			console.log("Successfully Added New review ", result);
			res.json(result);
		});
		//To post new emails
		app.post("/emails", async (req, res) => {
			const newEmail = req.body;
			console.log("Request from UI ", newEmail);
			const result = await emailsCollection.insertOne(newEmail);
			console.log("Successfully Added New emails ", result);
			res.json(result);
		});
		//To post new newHeadline
		app.post("/headline", async (req, res) => {
			const newHeadline = req.body;
			console.log("Request from UI ", newHeadline);
			const result = await headlineCollection.insertOne(newHeadline);
			console.log("Successfully Added New headline ", result);
			res.json(result);
		});

		// To store/update links
		app.put("/links/:type", async (req, res) => {
			const id = req.params.id;
			console.log("Request to update ", id);
			const projectId = { type: "links" };
			const updatedReq = req.body;
			console.log("Comming form UI", updatedReq);
			const options = { upsert: true };
			const updateProject = {
				$set: {
					email: updatedReq?.email,
					facebook: updatedReq?.facebook,
					whatsapp: updatedReq?.whatsapp,
					youtube: updatedReq?.youtube,
					sms: updatedReq?.sms,
					twitter: updatedReq?.twitter,
					vcf: updatedReq?.vcf,
				},
			};
			const result = await linksCollection.updateOne(
				projectId,
				updateProject,
				options,
			);
			res.json(result);
			console.log("Updated Successfully", result);
		});
		// To store/update details
		app.put("/details/:type", async (req, res) => {
			const id = req.params.id;
			console.log("Request to update ", id);
			const projectId = { type: "details" };
			const updatedReq = req.body;
			console.log("Comming form UI", updatedReq);
			const options = { upsert: true };
			const updateProject = {
				$set: {
					details: updatedReq?.details,
				},
			};
			const result = await detailsCollection.updateOne(
				projectId,
				updateProject,
				options,
			);
			res.json(result);
			console.log("Updated Successfully", result);
		});
		// To store/update profile
		app.put("/profile/:type", async (req, res) => {
			const id = req.params.id;
			console.log("Request to update ", id);
			const projectId = { type: "profile" };
			const updatedReq = req.body;
			console.log("Comming form UI", updatedReq);
			const options = { upsert: true };
			const updateProject = {
				$set: {
					imageLink2: updatedReq?.imageLink2,
				},
			};
			const result = await profileCollection.updateOne(
				projectId,
				updateProject,
				options,
			);
			res.json(result);
			console.log("Updated Successfully", result);
		});
		// To store/update banner
		app.put("/banner/:type", async (req, res) => {
			const id = req.params.id;
			console.log("Request to update ", id);
			const projectId = { type: "banner" };
			const updatedReq = req.body;
			console.log("Comming form UI", updatedReq);
			const options = { upsert: true };
			const updateProject = {
				$set: {
					imageLink2: updatedReq?.imageLink2,
				},
			};
			const result = await bannerCollection.updateOne(
				projectId,
				updateProject,
				options,
			);
			res.json(result);
			console.log("Updated Successfully", result);
		});
		// To store/update headline
		app.put("/headline/:type", async (req, res) => {
			const id = req.params.id;
			console.log("Request to update ", id);
			const projectId = { type: "headline" };
			const updatedReq = req.body;
			console.log("Comming form UI", updatedReq);
			const options = { upsert: true };
			const updateProject = {
				$set: {
					title: updatedReq?.title,
					subtitle: updatedReq?.subtitle,
				},
			};
			const result = await headlineCollection.updateOne(
				projectId,
				updateProject,
				options,
			);
			res.json(result);
			console.log("Updated Successfully", result);
		});

		//To post new links
		app.post("/links", async (req, res) => {
			const newLinks = req.body;
			console.log("Request from UI ", newLinks);
			const result = await linksCollection.insertOne(newLinks);
			console.log("Successfully Added New links ", result);
			res.json(result);
		});
		//To post new details
		app.post("/details", async (req, res) => {
			const newDetails = req.body;
			console.log("Request from UI ", newDetails);
			const result = await detailsCollection.insertOne(newDetails);
			console.log("Successfully Added New details ", result);
			res.json(result);
		});
		//To post new banner
		app.post("/banner", async (req, res) => {
			const newBanner = req.body;
			console.log("Request from UI ", newBanner);
			const result = await bannerCollection.insertOne(newBanner);
			console.log("Successfully Added New banner ", result);
			res.json(result);
		});
		//To post new profile
		app.post("/profile", async (req, res) => {
			const newProfile = req.body;
			console.log("Request from UI ", newProfile);
			const result = await profileCollection.insertOne(newProfile);
			console.log("Successfully Added New profile ", result);
			res.json(result);
		});
		//To post new gallery
		app.post("/gallery", async (req, res) => {
			const newGallery = req.body;
			console.log("Request from UI ", newGallery);
			const result = await galleryCollection.insertOne(newGallery);
			console.log("Successfully Added New gallery ", result);
			res.json(result);
		});

		//To load links by id
		app.get("/headline/:type", async (req, res) => {
			const id = req.params.id;
			console.log("Request to find ", id);
			const findId = { type: "headline" };
			const result = await headlineCollection.findOne(findId);
			res.send(result);
			console.log("Found one", result);
		});
		//To load links by id
		app.get("/links/:type", async (req, res) => {
			const id = req.params.id;
			console.log("Request to find ", id);
			const findId = { type: "links" };
			const result = await linksCollection.findOne(findId);
			res.send(result);
			console.log("Found one", result);
		});
		//To load links by id
		app.get("/details/:type", async (req, res) => {
			const id = req.params.id;
			console.log("Request to find ", id);
			const findId = { type: "details" };
			const result = await detailsCollection.findOne(findId);
			res.send(result);
			console.log("Found one", result);
		});
		//To load banner by id
		app.get("/banner/:type", async (req, res) => {
			const id = req.params.id;
			console.log("Request to find ", id);
			const findId = { type: "banner" };
			const result = await bannerCollection.findOne(findId);
			res.send(result);
			console.log("Found one", result);
		});
		//To load profile by id
		app.get("/profile/:type", async (req, res) => {
			const id = req.params.id;
			console.log("Request to find ", id);
			const findId = { type: "profile" };
			const result = await profileCollection.findOne(findId);
			res.send(result);
			console.log("Found one", result);
		});

		//To Show all gallery
		app.get("/gallery", async (req, res) => {
			console.log(req.query);
			const get = galleryCollection.find({});
			console.log("Request to find gallery");
			gallery = await get.toArray();
			res.send(gallery);
			console.log("Found all gallery", gallery);
		});
		//To Show all review
		app.get("/review", async (req, res) => {
			console.log(req.query);
			const get = reviewCollection.find({});
			console.log("Request to find review");
			review = await get.toArray();
			res.send(review);
			console.log("Found all review", review);
		});
		//To Show all forms
		app.get("/forms", async (req, res) => {
			console.log(req.query);
			const get = formsCollection.find({});
			console.log("Request to find forms");
			forms = await get.toArray();
			res.send(forms);
			console.log("Found all forms", forms);
		});
		//To Show all forms2
		app.get("/forms2", async (req, res) => {
			console.log(req.query);
			const get = forms2Collection.find({});
			console.log("Request to find forms");
			forms = await get.toArray();
			res.send(forms);
			console.log("Found all forms", forms);
		});
		//To Show all mails
		app.get("/emails", async (req, res) => {
			console.log(req.query);
			const get = emailsCollection.find({});
			console.log("Request to find emails");
			emails = await get.toArray();
			res.send(emails);
			console.log("Found all emails", emails);
		});

		//////////////////////
		/////////////////////
		//////////////////
		///////////////////
		////////////////
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
		//To post new blog
		app.post("/blogs", async (req, res) => {
			const newBlog = req.body;
			console.log("Request from UI ", newBlog);
			const result = await blogsCollection.insertOne(newBlog);
			console.log("Successfully Added New Blog ", result);
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
					feature1: updatedReq.feature1,
					feature2: updatedReq.feature2,
					feature3: updatedReq.feature3,
					feature4: updatedReq.feature4,
					feature5: updatedReq.feature5,
					techUsed: updatedReq.techUsed,
					liveLink: updatedReq.liveLink,
					gitClientLink: updatedReq.gitClientLink,
					gitServerLink: updatedReq.gitServerLink,
					projectPhoto1: updatedReq.projectPhoto1,
					projectPhoto2: updatedReq.projectPhoto2,
					projectPhoto3: updatedReq.projectPhoto3,
					projectPhoto4: updatedReq.projectPhoto4,
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
		//To Show all Blogs
		app.get("/blogs", async (req, res) => {
			console.log(req.query);
			const get = blogsCollection.find({});
			console.log("Request to find blogs");
			blogs = await get.toArray();
			res.send(blogs);
			console.log("Found all blogs", blogs);
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
