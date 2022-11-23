const express = require("express");
const router = express.Router();

const sampleController = require("../../controllers/authController");

router.post("/getAccessToken", sampleController.getAccessToken);

module.exports = router;
