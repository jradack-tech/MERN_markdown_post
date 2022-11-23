import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../store/configureStore";
import { logout } from "../../store/actions/auth";

function Navbar({ logout, isAuthenticated }: NavbarProps) {

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<Link to="/" className="navbar-brand">
				<i className="fas fa-code"></i> Test
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item mx-2">
						<Link to="/all-posts">All Posts</Link>
					</li>
					{!isAuthenticated ? (
						<>
							{/* <li className="nav-item mx-2">
								<Link to="/login">Login</Link>
							</li> */}
						</>
					) : (
						<>
							<li onClick={logout} className="nav-item mx-2">
								<a>Logout</a>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}

const mapStateToProps = (state: AppState) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);

interface NavbarProps {
	isAuthenticated: boolean;
	logout: VoidFunction;
}
