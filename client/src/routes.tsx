import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/utils/protectedRoute";

import Landing from "./components/layouts/landing";
import DashBoard from "./components/dashboard/dashboard";
import CreatePost from "./components/markdownPost/CreatePost";
import AllPosts from "./components/markdownPost/AllPosts";

function Routes() {
  return (
    <>
      <Switch>
        <ProtectedRoute
          path="/"
          exact
          element={<Landing />}
          componentIfAuth={false}
        />
        <>
          {/* use <> inside Switch not anything else */}
          <section className="container">
            <ProtectedRoute path="/dashboard" exact element={<DashBoard />} />
            <ProtectedRoute path="/create-post" exact element={<CreatePost />} />
            <Route path="/all-posts" exact component={AllPosts} />
          </section>
        </>
      </Switch>
    </>
  );
}

export default Routes;
