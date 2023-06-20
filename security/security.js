const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const mailList = [];

async function sendEmail(mail, dataset) {
  console.log(mail);
  // E-posta göndermek için kullanacağınız e-posta hesap bilgilerini girin
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "testm5691@gmail.com", // E-posta adresin
      pass: "czelibeimwbknyjz", //App şifren
    },
  });

  // Token oluşturun
  const token = encryptForMail(mail);

  // maili ve user icin dataseti kaydet
  mailList.push({ mail: mail, dataset: dataset });

  // E-posta ayarlarınızı ve içeriğinizi düzenleyin
  const mailOptions = {
    from: "testm5691@gmail.com", // Gönderen e-posta adresi
    to: mail, // Alıcı e-posta adresi
    subject: "ML Measure Project Token Link", // E-posta konusu
    text: `Aşağıdaki bağlantıyı kullanarak giriş yapınız: http://localhost:3000/measure/predict?authToken=${token}`, // E-posta içeriği (metin formatı)
  };

  // E-postayı gönder
  const info = await transporter.sendMail(mailOptions);
  console.log("E-posta gönderildi:", info.messageId);
}

const encryptForMail = function (mail) {
  const token = jwt.sign(mail, process.env.TEMP_SECRET_KEY);
  return token;
};

const verifyToken = function (token) {
  if (!token) {
    throw "token is not presented";
  }
  const decoded = jwt.verify(token, process.env.TEMP_SECRET_KEY);
  let userExists = mailList.find((element) => element.mail === decoded);
  if (!userExists) {
    throw "token is invalid";
  }
};

const getDatasetForUser = function (token) {
  const decoded = jwt.verify(token, process.env.TEMP_SECRET_KEY);
  const user = mailList.find((element) => element.mail === decoded);
  return user.dataset;
};

const verifyAdmin = function (credential) {
  if (
    process.env.ADMIN_CREDENTIALS !==
    jwt.verify(credential, process.env.TEMP_SECRET_KEY)
  ) {
    throw "admin credentials are not valid!";
  }
};

const encryptAdminCredential = function (credential) {
  if (credential !== process.env.ADMIN_CREDENTIALS) {
    throw "admin credentials are not valid!";
  }
  const token = jwt.sign(
    process.env.ADMIN_CREDENTIALS,
    process.env.TEMP_SECRET_KEY
  );
  return token;
};

module.exports = {
  encryptForMail,
  verifyToken,
  sendEmail,
  getDatasetForUser,
  encryptAdminCredential,
  verifyAdmin,
};
