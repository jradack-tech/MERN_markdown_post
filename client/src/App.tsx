import React, { useEffect } from "react";
import "./bootstrap.scss";
import { loadUser } from "./store/actions/auth";
import store from "./store/configureStore";

import Navbar from "./components/layouts/navbar";
import Routes from "./routes";
import { RouteChildrenProps, withRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(props: RouteChildrenProps) {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<>
			<Navbar />
			<Routes />
			<ToastContainer />
		</>
	);
}

export default withRouter(App);
