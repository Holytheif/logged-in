import { Dispatch, SetStateAction } from "react";
import { FormType, SetFormDetailsType, AuthType } from "../../App";
import FormAction from "../FormAction";
import "./styles.scss";
import CryptoJS from "crypto-js";
import { makeLogInRequest, makeSignUpRequest } from "./APIrequest";

export type IFormProps = {
	showLogInForm: boolean;
	setShowLogInForm: Dispatch<SetStateAction<boolean>>;
	formDetails: FormType | undefined;
	setFormDetails: SetFormDetailsType;
	setSignUpAuth: Dispatch<SetStateAction<AuthType | undefined>>;
	setLogInAuth: Dispatch<SetStateAction<AuthType>>;
};

const formSubmitHandler = async (
	event: any,
	setFormDetails: SetFormDetailsType,
	showLogInForm: IFormProps["showLogInForm"],
	formDetails: IFormProps["formDetails"],
	setSignUpAuth: Dispatch<SetStateAction<AuthType | undefined>>,
	setLogInAuth: Dispatch<SetStateAction<AuthType>>
) => {
	const formData = showLogInForm
		? {
				mail: event.target[0].value,
				password: event.target[1].value,
		  }
		: {
				name: event.target[0].value,
				mail: event.target[1].value,
				password: event.target[2].value,
		  };
	const encryptedFormData = {
		...formData,
		password: CryptoJS.SHA256(formData.password + formData.mail).toString(
			CryptoJS.enc.Hex
		),
	};
	setFormDetails(encryptedFormData);
	if (!showLogInForm) {
		const signUpResponse: any = await makeSignUpRequest(
			encryptedFormData,
			setSignUpAuth
		);
		if (signUpResponse?.status === 201) {
			setSignUpAuth("success");
			setLogInAuth("success");
			localStorage.setItem("token", signUpResponse.data);
			const token = localStorage.getItem("token");
			console.log("token", token);
		} else {
			setSignUpAuth("failed");
			setLogInAuth("failed");
		}
	} else {
		const logInResponse = await makeLogInRequest(encryptedFormData);
		console.log("login response", logInResponse);

		if (logInResponse?.status === 201) {
			setSignUpAuth("success");
			setLogInAuth("success");
		} else {
			setSignUpAuth("failed");
			setLogInAuth("failed");
		}
	}
};

const renderForm = (
	showLogInForm: IFormProps["showLogInForm"],
	setFormDetails: IFormProps["setFormDetails"],
	setShowLogInForm: IFormProps["setShowLogInForm"],
	formDetails: IFormProps["formDetails"],
	setSignUpAuth: Dispatch<SetStateAction<AuthType | undefined>>,
	setLogInAuth: Dispatch<SetStateAction<AuthType>>
) => {
	return (
		<div className="action-form">
			<form
				onSubmit={(event) => {
					event.preventDefault();
					formSubmitHandler(
						event,
						setFormDetails,
						showLogInForm,
						formDetails,
						setSignUpAuth,
						setLogInAuth
					);
				}}
			>
				{showLogInForm ? (
					<></>
				) : (
					<div className="personal-details-section">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							autoComplete="off"
							spellCheck="false"
							required
							autoFocus
						/>
					</div>
				)}

				<div className="mail-password-section">
					<div className="mail-input">
						<label htmlFor="mail">Email</label>
						<input
							type="email"
							name="mail"
							id="mail"
							autoComplete="off"
							required
						/>
					</div>
					<div className="password-input">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							minLength={8}
							required
						/>
					</div>
				</div>
				<FormAction
					setShowLogInForm={setShowLogInForm}
					showLogInForm={showLogInForm}
				/>
			</form>
		</div>
	);
};

export default function Form(props: IFormProps) {
	return (
		<>
			{renderForm(
				props.showLogInForm,
				props.setFormDetails,
				props.setShowLogInForm,
				props.formDetails,
				props.setSignUpAuth,
				props.setLogInAuth
			)}
		</>
	);
}
