const express = require("express");
const mongoose = require("mongoose");
var request = require("request");
const cors = require("cors");
const user = require("./model/model");
require("dotenv").config();
const app = express();
const port = 9000;
const userPost = require("./routes/userPost");
var bodyParser = require("body-parser");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
	origin: "http://localhost:3000",
};

app.use("/user", userPost);

mongoose
	.connect(
		`mongodb+srv://${process.env.dataName}:${process.env.DataBasePass}@cluster0.0a1tu.mongodb.net/Marvelcomic?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useFindAndModify: false,
		}
	)
	.then((res) => console.log("db connected"))
	.catch((err) => console.log(err));

// app.get("/api/marvel", (req, res) => {
// 	request(
// 		"http://gateway.marvel.com/v1/public/comics?ts=1&apikey=def13116fe0134cb9f6fb39ff9b3214d&hash=f3d8878fb6bff10b2e4f21baeb24b83e",
// 		function (error, response, body) {
// 			if (!error && response.statusCode == 200) {
// 				const parsedBody = JSON.parse(body);
// 				res.send(body);
// 			}
// 		}
// 	);
// });

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
