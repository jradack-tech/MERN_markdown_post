const User = require("../models/User");
const path = require("path");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const axios = require("axios");
const { Octokit } = require("octokit");

exports.getAccessToken = async (req, res) => {
  console.log(req.body);
  const resp = await axios.post(
    "https://github.com/login/oauth/access_token",
    req.body
  );
  console.log(resp.data);
  const cuttedUri = resp.data.split("&")[0].slice(13);
  console.log(cuttedUri);
  const octokit = new Octokit({
    auth: cuttedUri,
  });
  const user = await octokit.request("GET /user", {});
  console.log(user.data.login);
  res.json({ user });
};
