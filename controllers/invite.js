const jwt = require("jsonwebtoken");
const { encryptForMail, sendEmail } = require("../security/security.js");

const inviteByMailController = async function (req, res) {
  try {
    const mail = req.query.mail;
    const dataset = req.query.dataset;
    console.log(mail);
    await sendEmail(mail, dataset);

    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false });
  }
};

module.exports = { inviteByMailController };
