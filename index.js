const express = require("express");
const userRouter = require("./routes/userRoute");
require("./config/modelConfig")
const app = express();
const port = 9000;
app.use(express.json())
app.use("/",userRouter)


app.listen(port, () => {
  console.log(`server is running ar ${port}`)
})