const jwt = require("jsonwebtoken");
const {
  sendEmail,
  getDatasetForUser,
  verifyAdmin,
  encryptAdminCredential,
} = require("../security/security.js");

const inviteByMailController = async function (req, res) {
  try {
    verifyAdmin(req.query.adminToken);
    const mail = req.query.mail;
    const dataset = req.query.dataset;
    await sendEmail(mail, dataset);

    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false });
  }
};

const getUserInviteConfigController = async function (req, res) {
  try {
    const userInviteConfig = require("../models/user_invite_config.json");
    res.status(200).json(userInviteConfig);
  } catch (error) {
    res.status(500).send({ success: false });
  }
};

const getDatasetForUserController = async function (req, res) {
  try {
    const token = req.query.authToken;
    const dataset = getDatasetForUser(token);
    res.status(200).json({ dataset: dataset });
  } catch (error) {
    res.status(500).send({ success: false });
  }
};

const getAdminCredentialsController = async function (req, res) {
  try {
    const token = encryptAdminCredential(req.query.credentials);
    res.status(200).send({ adminToken: token });
  } catch (error) {
    res.status(500).send({ success: false });
  }
};

module.exports = {
  inviteByMailController,
  getUserInviteConfigController,
  getDatasetForUserController,
  getAdminCredentialsController,
};
