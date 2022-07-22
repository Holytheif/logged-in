import { Dispatch, SetStateAction } from "react";
import { AuthType } from "../../App";
import "./styles.scss";
export interface IPromptProps {
	signUpAuth: AuthType | undefined;
	logInAuth: AuthType | undefined;
	setLogOut: Dispatch<SetStateAction<boolean | undefined>>;
}

export default function Prompt(props: IPromptProps) {
	return (
		<div className="signup-prompt">
			{props.logInAuth === "success" ? (
				<>
					<p>
						Log in <span className="success"> successful!</span>
					</p>
					<button
						className="logout-btn"
						type="button"
						onClick={() => {
							props.setLogOut(true);
						}}
					>
						Log Out
					</button>
				</>
			) : (
				<p>
					Operation <span className="failure">failed!</span> Retry
				</p>
			)}
		</div>
	);
}
