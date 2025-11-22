import express, { Application, Request, Response } from "express";
import app from "./app";
import config from "./config";







app.listen(5000, () => {
    console.log(`server is runnint on port ${config.port}`)
})