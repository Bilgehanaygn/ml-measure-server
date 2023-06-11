const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
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

async function sendEmail() {
  try {
    // E-posta göndermek için kullanacağınız e-posta hesap bilgilerini girin
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "ayberk.aygun07@gmail.com", // E-posta adresin
        pass: "APP PASSWORD", //App şifren
      },
    });

    // Rastgele şifrelenmiş dizeyi oluşturun
    const randomString = generateRandomString(5);

    // Token oluşturun
    const token = jwt.sign({ randomString }, "your_secret_key");

    // E-posta ayarlarınızı ve içeriğinizi düzenleyin
    const mailOptions = {
      from: "ayberk.aygun07@gmail.com", // Gönderen e-posta adresi
      to: "ayberk.aygun127@gmail.com", // Alıcı e-posta adresi
      subject: "ML Measure Project Token Link", // E-posta konusu
      text: `Aşağıdaki bağlantıyı kullanarak giriş yapınız: http://localhost:3000/measure/token=${token}`, // E-posta içeriği (metin formatı)
    };

    // E-postayı gönder
    const info = await transporter.sendMail(mailOptions);
    console.log("E-posta gönderildi:", info.messageId);
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
  }
}

const encryptForMail = function (mail) {
  const token = jwt.sign("mailt7849@gmail.com", process.env.TEMP_SECRET_KEY);
  return token;
};

const verifyToken = function (token) {
  if (!token) {
    throw "token is not presented";
  }
  const decoded = jwt.verify(token, process.env.TEMP_SECRET_KEY);
  if (decoded !== "mailt7849@gmail.com") {
    throw "token is invalid";
  }
};

module.exports = { encryptForMail, verifyToken };
