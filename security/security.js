const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const mailList = [];

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function sendEmail(mail, dataset) {
  try {
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

    // tokenlar ve mailleri listeye alma
    mailList.push(mail);

    // E-posta ayarlarınızı ve içeriğinizi düzenleyin
    const mailOptions = {
      from: "testm5691@gmail.com", // Gönderen e-posta adresi
      to: "testm5691@gmail.com", // Alıcı e-posta adresi
      subject: "ML Measure Project Token Link", // E-posta konusu
      text: `Aşağıdaki bağlantıyı kullanarak giriş yapınız: http://localhost:3000/measure?dataset=${dataset}&authToken=${token}`, // E-posta içeriği (metin formatı)
    };

    // E-postayı gönder
    const info = await transporter.sendMail(mailOptions);
    console.log("E-posta gönderildi:", info.messageId);
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
  }
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
  if (!mailList.includes(decoded)) {
    throw "token is invalid";
  }
};

module.exports = { encryptForMail, verifyToken, sendEmail };
