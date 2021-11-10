const express = require("express");
const Usermodel = require("../model/model");
const router = express.Router();
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", (req, res) => {
	const un = req.body.username;
	const pws = req.body.password;

	const user = Usermodel.findOne({ username: un })
		.then((data) => {
			const hashedPw = data.password;
			console.log(data);
			// console.log("passwor", hashedPw);
			bcrypt.compare(pws, hashedPw, (err, userdata) => {
				console.log(userdata);
				if (userdata === true) {
					res.json(data);
				} else {
					res.send("User not found");
				}
			});
		})
		.catch((err) => {
			res.json(err);
		});
	//
});

router.post("/reg", (req, res) => {
	const pw = req.body.password;

	bcrypt.genSalt(saltRounds, (err, salt) => {
		bcrypt.hash(pw, salt, (err, hash) => {
			const user = new Usermodel({
				username: req.body.username,
				password: hash,
			});
			const saveUser = user
				.save()
				.then((data) => {
					res.json(data);
				})
				.catch((err) => {
					res.json({ message: err });
				});
			console.log(saveUser);
		});
	});
});

router.post("/update", (req, res) => {
	const un = req.body.username;

	const user = Usermodel.findOneAndUpdate(
		{ username: un },
		{ $push: { like: req.body.like } }
	)
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
});
router.post("/remove", (req, res) => {
	const un = req.body.username;

	const user = Usermodel.findOneAndRemove(
		{ username: un },
		{ $push: { like: req.body.like } }
	)
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
