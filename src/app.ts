import express, { Application, Request, Response } from "express";
import cors from "cors"
import config from "./config";
import router from "./app/routes";
import globalerrorhandler from "./app/middleware/globalerrorhandler";
import notfound from "./app/middleware/notfound";
import cookieparser from "cookie-parser"


const app: Application = express()

app.use(cors({
    origin: "http://localhost:5000",
    credentials: true
}))


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieparser())

app.use("/api/v1", router )

app.get("/" ,(req: Request, res: Response) => {
    res.send({
        message: "this is my first ",
        envioronment: config.node_env,
        uptime: process.uptime() / 60 + "min",
    })
})


app.use(globalerrorhandler)
app.use(notfound)


export default app