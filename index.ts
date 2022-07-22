import express, { Request, Response } from "express";
import CORS from "cors";
import mongoose from "mongoose";
import { User } from "./model/user";
import jwt from "jsonwebtoken";

const app = express();
const port: number = 8000;
const url: string = `mongodb+srv://Risabh:9Z9UtLw5nxEhhYGf@loggedin.rajxvnm.mongodb.net/LoggedIn?retryWrites=true&w=majority`;
const token_key = "t2gs5$27hh";

export type FormDataType = {
	name?: string;
	mail: string;
	password: string;
	token: string;
};

mongoose
	.connect(url)
	.then(() => {
		console.log("Connected to the database ");
	})
	.catch((err) => {
		console.error(`Error connecting to the database. ${err}`);
	});

app.use(CORS());
app.use(express.json());
app.post("/signup", (req: Request, res: Response) => {
	const signUpFormData: FormDataType = req.body;
	const query = User.where({ mail: signUpFormData.mail });
	query.findOne((err: any, doc: any) => {
		if (!doc) {
			const token = jwt.sign({ id: signUpFormData.mail }, token_key, {
				algorithm: "HS256",
				expiresIn: "2h",
			});
			const userData = { ...signUpFormData, token: token };
			const newUser: any = User.create(userData);
			console.log("form data", signUpFormData);
			res.status(201).send(token);
		} else {
			console.log(signUpFormData);
			res.status(400).send("<h1> Mail exists </h1>");
		}
	});
});

app.post("/login", (req: Request, res: Response) => {
	const logInFormData: FormDataType = req.body;
	const query = User.where({ mail: logInFormData.mail });
	query.findOne((err: any, doc: any) => {
		if (doc) {
			console.log(doc);

			if (doc.password === logInFormData.password) {
				try {
					const token = jwt.verify(logInFormData.token, token_key);
					res.status(201).send(token);
				} catch (err) {
					res.status(400).send("Token required or Expired token");
				}
			}
		} else {
			res.status(400).send("<h1>Login failed</h1>");
		}
	});
});

app.listen(port, () => {
	console.log("Server is listening!");
});
