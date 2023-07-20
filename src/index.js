import express from "express";
import mongoose from "mongoose";
import log from "./utils/logger";
import config from "../config";
import route from "./routers";
import { connectDb, queryNow } from "./pg";

const { server, database } = config;
const app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

connectDb().then(()=>{
  app.listen(server.port, server.host, () =>{
  })
}).catch((err)=>{
  console.log(err)
})


log(app);
route(app);



export default app;
