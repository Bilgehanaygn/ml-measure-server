const express = require("express");
const { inviteByMailController } = require("../controllers/invite.js");

const router = express.Router();

router.get("/", inviteByMailController);

module.exports = router;
