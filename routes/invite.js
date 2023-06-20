const express = require("express");
const {
  inviteByMailController,
  getUserInviteConfigController,
  getDatasetForUserController,
  getAdminCredentialsController,
} = require("../controllers/invite.js");

const router = express.Router();

router.get("/", inviteByMailController);
router.get("/config", getUserInviteConfigController);
router.get("/user_dataset", getDatasetForUserController);
router.get("/admin", getAdminCredentialsController);

module.exports = router;
