const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const { fetchClients, createClient, modifyClient, removeClient } = require("../controllers/clientController");

const router = express.Router();

router.get("/", verifyToken, fetchClients);
router.post("/", verifyToken, createClient);
router.put("/:id", verifyToken, modifyClient);
router.delete("/:id", verifyToken, removeClient);

module.exports = router;
