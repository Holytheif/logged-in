import { Dispatch, SetStateAction } from "react";
import "./styles.scss";

export interface IFormActionProps {
	showLogInForm: boolean;
	setShowLogInForm: Dispatch<SetStateAction<boolean>>;
}

const actionBox = (
	showSignForm: IFormActionProps["showLogInForm"],
	setShowLogInForm: Dispatch<SetStateAction<boolean>>
) => {
	return (
		<div className="action-box">
			<button
				type="button"
				className={
					showSignForm
						? "logIn-btn switch-btn"
						: "signup-btn switch-btn"
				}
				onClick={() => {
					showSignForm
						? setShowLogInForm(false)
						: setShowLogInForm(true);
				}}
			>
				{showSignForm ? "Sign Up?" : "Log In?"}
			</button>
			<button
				type="submit"
				className={showSignForm ? "logIn-btn" : "signup-btn"}
			>
				{showSignForm ? "Log In" : "Sign Up"}
			</button>
		</div>
	);
};

export default function FormAction(props: IFormActionProps) {
	return <>{actionBox(props.showLogInForm, props.setShowLogInForm)}</>;
}
