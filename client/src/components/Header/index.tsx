import "./styles.scss";
export interface IHeaderProps {
	showLoginForm: boolean;
}

export default function Header(props: IHeaderProps) {
	return (
		<header className="form-header">
			<div className="title">
				<h1>{props.showLoginForm ? "Log In " : "Sign Up"}</h1>
			</div>
		</header>
	);
}
