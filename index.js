const express = require("express")
const connectDb = require("./db/db")
const { userRouter } = require("./routers/user.router")
const methodOverride  = require("method-override")
const path = require("path")

app = express()
app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use(express.static(path.join(__dirname, "templates"), {}))
// app.set("views", "./views")
// app.set("view engine", 'ejs')
// app.use(methodOverride('_method'))

PORT = 3001

app.use("/user", userRouter);

connectDb()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("App is running",PORT)
    })
})
.catch((err)=>{
    console.log(`Mongo DB connection FAILED !! ${err}`)
})
