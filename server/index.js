require("dotenv").config();
const express = require("express");
const app = express();

const csvUpload = require("express-fileupload");
const cors = require("cors");
app.use(cors());
app.use(express.json()); // to use req.body

// Mine
const connectToMongoDB = require("./src/databases/mongodb/config");
connectToMongoDB();

const { createDir } = require("./src/utilities/helper_functions");
const { vars } = require("./src/utilities/constants");

// routes
app.get('/', (req,res)=>{
    res.send("Hellow");
})
app.use("/api/user/auth", require("./src/api/routes/user.js"));

app.use("/api/admin/auth", require("./src/api/routes/admin.js"));

app.use("/api/public", require("./src/api/routes/public.js"));

app.listen(process.env.port || 5000, () => {
  console.log("Server is listening at port 5000");

  // createDir(vars.imageFile.ORIGINAL_UPLOADS_DIR_PATH);
  // createDir(vars.imageFile.COMPRESSED_UPLOADS_DIR_PATH);
});

/*
todo:
while deployment:
make all import like mongodb in lowercase
uncomment createDir
firebase private key error while deployment:
https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
*/
