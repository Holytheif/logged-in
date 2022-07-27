import axios from "axios";
import { FormType } from "../../App";
import { Dispatch, SetStateAction } from "react";
import { AuthType } from "../../App";

export const makeSignUpRequest = async (
	formDetails: FormType | undefined,
	setSignUpAuth: Dispatch<SetStateAction<AuthType | undefined>>
) => {
	try {
		const signUpResponse = await axios.post("/signup", {
			...formDetails,
		});
		console.log("signup response", signUpResponse);

		return signUpResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (
				error.response?.status === 400 ||
				error.response?.status === 500
			) {
				return error;
			}
		}
	}
	return;
};
export const makeLogInRequest = async (formDetails: FormType | undefined) => {
	try {
		const logInResponse = await axios.post("/login", {
			...formDetails,
			token: localStorage.getItem("token"),
		});
		console.log("login response", logInResponse);

		return logInResponse;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (
				error.response?.status === 400 ||
				error.response?.status === 500
			) {
				return error;
			}
		}
	}
	return;
};
