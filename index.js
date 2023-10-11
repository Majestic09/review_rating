require("dotenv").config();
const express = require("express");
// const { transport, mailOptions } = require("./services/emailService");
const app = express();
require("./config/modelConfig")
const cron = require("node-cron");
const mainRouter = require("./routes/mainRoute");

const PORT = process.env.PORT || 8080
const HOST = "localhost";
app.use(express.json())
app.use("/",mainRouter)

// app.get("/send", async (req, res) => {
//   transport.sendMail(mailOptions,(error, info)=> {
//     if (error) {
//       console.log(error)
//     } else {
//       console.log("Email Sent Successfully"+info.response)
//     }
//   })
// })

//schedule message using cron package
// cron.schedule("*/5 * * * * *", () => {
//   transport.sendMail(mailOptions1,(error, info)=> {
//     if (error) {
//       console.log(error)
//     } else {
//       console.log("Email Sent Successfully"+info.response)
//     }
//   })
// })
app.listen(PORT, () => {
  console.log(`server is running on PORT : http://${HOST}:${PORT}`)
})
