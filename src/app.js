const express = require("express")
const cookieParser = require("cookie-parser")
const adminRoutes = require("./routes/adminRoutes")

const app = express()


app.use(express.json())
app.use(cookieParser())


const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes")
const transactionRoutes = require("./routes/transaction.routes")
const adminRoutes = require("./routes/adminRoutes")



app.get("/", (req, res) => {
    res.send("Ledger Service is up and running")
})

app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/transactions", transactionRoutes)
app.use("/api/admin", adminRoutes)

module.exports = app
