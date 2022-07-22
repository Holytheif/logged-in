import { useState, Dispatch, SetStateAction } from "react";
import "./App.scss";
import Form from "./components/Form";
import Header from "./components/Header";
import Prompt from "./components/Prompt";

export interface IAppProps {}

export type FormType = {
	name?: string;
	mail: string;
	password: string;
};

export type AuthType = "success" | "failed" | "pending";

export type SetFormDetailsType = Dispatch<SetStateAction<FormType | undefined>>;

export default function App(props: IAppProps) {
	const [showLogInForm, setShowLogInForm] = useState(false);
	const [formDetails, setFormDetails] = useState<FormType>();
	const [signUpAuth, setSignUpAuth] = useState<AuthType>();
	const [logInAuth, setLogInAuth] = useState<AuthType>("pending");
	const [logOut, setLogOut] = useState<boolean>();

	return (
		<div className="form-container">
			{logInAuth === "pending" && !logOut ? (
				<>
					<Header showLoginForm={showLogInForm} />
					<Form
						showLogInForm={showLogInForm}
						setShowLogInForm={setShowLogInForm}
						formDetails={formDetails}
						setFormDetails={setFormDetails}
						setSignUpAuth={setSignUpAuth}
						setLogInAuth={setLogInAuth}
					/>
				</>
			) : (
				<Prompt
					signUpAuth={signUpAuth}
					logInAuth={logInAuth}
					setLogOut={setLogOut}
				/>
			)}
		</div>
	);
}
