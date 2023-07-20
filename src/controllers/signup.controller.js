import httpStatus from "http-status";
import User from "../models/user.model";
import APIResponse from "../utils/api-response";
import APIError from "../utils/api-error";
import { connectDb, queryNow } from "../pg";
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const saltRounds = 10
const key = "Rahul123"

const registerUser = async(req,res)=>{
const {name,email,password} = req.body
if(!name){
  return res.status(httpStatus.NOT_ACCEPTABLE).send({success:false,message:"name not acceptable"})
}
else if(!ValidateEmail(email)){
  return res.status(httpStatus.NOT_ACCEPTABLE).send({success:false,message:"email not valid"})
}
else if(password.length<6){
  return res.status(httpStatus.NOT_ACCEPTABLE).send({success:false,message:"password too short"})
}
await queryNow(`SELECT * FROM USERS where email = '${email}'`).then((result)=>{
  if(result.rows.length>0){
    return res.status(httpStatus.NOT_ACCEPTABLE).send({success:false,message:"user already registered!!!"})
  }
  else{
    bcrypt
    .hash(password, saltRounds)
    .then(async (hash) => {
      await queryNow(`INSERT INTO USERS(name,email,password) values('${name}','${email}','${hash}')`).then((result)=>{
        const token = jwt.sign({name:name,email:email}, key);
        return res.status(httpStatus.OK).send({success:true,message:"Registered successfully!!!",name,email,token})
      }).catch((err)=>{
        console.log(err)
      })
    })
    .catch(err => console.error(err.message))
  }
}).catch((err)=>{
  console.log(err)
})
}


function validateUser(hash) {
  bcrypt
    .compare(password, hash)
    .then(res => {
      return true // return true
    })
    .catch(err => {return false})        
}


function ValidateEmail(mail) 
{

  return String(mail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
export default registerUser;
