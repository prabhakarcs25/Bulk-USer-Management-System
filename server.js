const express=require("express")
const userRoutes=require("./routes/user.routes")

require('dotenv').config()
const PORT=process.env.PORT || 3000
const app=express()
app.use(express.json());

const DatabaseConn=require("./db/db")

DatabaseConn();
app.use("/api/users/",userRoutes)


app.listen(PORT,()=>{
    console.log(`Server Running or PORT 3000`)
})