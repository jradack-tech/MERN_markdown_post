import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/configureStore";
import { AuthState } from "../../store/reducers/auth";
import { MoonLoader } from "react-spinners";
import { Link } from "react-router-dom";

import UserPosts from "../markdownPost/UserPosts";

function DashBoard({ auth }: DashBoardProps) {

	const { loading, github_user } = auth;

	if (loading) {
		return (
			<div className="loader-page">
				<MoonLoader loading={true} size={100} color="#00A3B8" />
			</div>
		);
	} else {
		return (
			<div>
				<h1 className="display-4 text-secondary font-weight-bold">Dashboard</h1>

				<p className="lead mr-2 p-0 mb-0">Welcome, <b>{github_user} </b>✨</p>

				<Link to={"/create-post"}>Create a New Post!</Link>

				<UserPosts />

				<div className="alert alert-warning text-center my-5">
					under construction notifications zone 😃
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {  })(DashBoard);

interface DashBoardProps {
	auth: AuthState;
}
