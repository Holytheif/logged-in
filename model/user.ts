import { Schema } from "mongoose";
import mongoose from "mongoose";

export type UserSchemaType = {
	name: string;
	mail: string;
	password: string;
	token: string;
};

const UserSchema = new Schema<UserSchemaType>(
	{
		name: {
			type: String,
			required: true,
		},
		mail: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		token: {
			type: String,
		},
	},
	{ collection: "users" }
);
export const User = mongoose.model<UserSchemaType>("user", UserSchema);
