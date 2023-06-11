const jwt = require("jsonwebtoken");
const { encryptForMail } = require("../security/security.js");

const inviteByMailController = function (req, res) {
  try {
    const mail = req.params.mail;
    const token = encryptForMail(mail);

    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send({ success: false });
  }
};

module.exports = { inviteByMailController };
