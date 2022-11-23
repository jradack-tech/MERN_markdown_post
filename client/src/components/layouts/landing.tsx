import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import LoginGithub from 'react-login-github';
import axios from '../../axios.config'
import { setGithubUser } from "../../store/actions/auth";
import { MoonLoader } from "react-spinners";

export default function Landing() {
	console.log("process.env.CLIENT_ID=>", process.env.REACT_APP_CLIENT_ID)
	const dispatch = useDispatch();
	const auth: any = useSelector<any, boolean>(state => state.auth);

	const [loading, setLoading] = React.useState(false);

	const onSuccess = async (response: any) => {
		const data = {
			client_id: process.env.REACT_APP_CLIENT_ID,
			client_secret: process.env.REACT_APP_CLIENT_SECRET,
			code: response.code,
		};
		setLoading(true);
		const res = await axios.post('/api/auth/getAccessToken', data);
		console.log(auth);
		dispatch(setGithubUser(res.data.user.data.login));
		setLoading(false);
	};

	const onFailure = (response: any) => console.error(response);

	if (loading) {
		return (
			<div className="loader-page">
				<MoonLoader loading={true} size={100} color="#00A3B8" />
			</div>
		);
	} else {
		return (
			<section className="bg-dark container-fluid">
				<div className="row">
					<div
						className="col-12 d-flex flex-column justify-content-center align-items-center"
						style={{ height: "91.7vh" }}
					>
						<div className="row justify-content-center my-5">
							<h1 className="display-md-3 text-light font-weight-bold text-center">
								{auth.github_user === "" ? "Login with Github" : "Welcome, " + auth.github_user}
							</h1>
						</div>
						<div className="row justify-content-center my-2">
							{
								auth.github_user === "" ?
									<LoginGithub
										clientId="f293ac813310f732c35f"
										onSuccess={onSuccess}
										onFailure={onFailure}
										className="btn btn-lg btn-secondary"
									/>
									:
									<></>
							}

						</div>
						<div className="row my-5 py-3"></div>
					</div>
				</div>
			</section>
		);
	}
}
