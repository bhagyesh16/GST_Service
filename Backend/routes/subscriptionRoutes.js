const express = require("express");
const { getActiveSubscriptions } = require("../controllers/subscriptionController");

const router = express.Router();

router.get("/", getActiveSubscriptions);

module.exports = router;
