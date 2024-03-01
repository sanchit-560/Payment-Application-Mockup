const express = require('express');
const app=express();
const UserRouter = require("./user");
const AccountRouter = require("./account")
const router = express.Router();
app.use(express.json());
router.use("/user",UserRouter)
router.use("/account",AccountRouter)
router.get("/", (req, res) => {
    res.json({
      message: "Hello World",
    });
})
module.exports = router;