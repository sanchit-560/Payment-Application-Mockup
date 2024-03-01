const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
app.use("/api/v1",mainRouter);// you can use app.use() for routing too||
app.listen(3001,()=>{
    console.log("listening on port 3001")
})

