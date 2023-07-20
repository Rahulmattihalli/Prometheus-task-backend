import httpStatus from "http-status";
import User from "../models/user.model";
import APIResponse from "../utils/api-response";
import APIError from "../utils/api-error";
import { connectDb, queryNow } from "../pg";
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const saltRounds = 10
const key = "Rahul123"

const Login = async(req,res)=>{
const {email,password} = req.body
 if(!ValidateEmail(email)){
  return res.status(httpStatus.NOT_ACCEPTABLE).send({success:false,message:"email not valid"})
}
else if(!password||password.length<6){
  return res.status(httpStatus.NOT_ACCEPTABLE).send({success:false,message:"password too short"})
}
else{
  await queryNow(`SELECT * FROM USERS where email = '${email}'`).then((result)=>{
    if(result.rows.length>0){
      bcrypt
    .hash(req.body.password, saltRounds)
    .then(async (hash) => {
      const token = jwt.sign({name:result.rows[0].name,email:result.rows[0].email}, key);
    validateUser(req.body.password,result.rows[0].password).then(()=>{
      return res.status(httpStatus.NOT_ACCEPTABLE).send({success:true,message:"Login Success",name:result.rows[0].name,email:result.rows[0].email,token})
    }).catch(()=>{
      return res.status(httpStatus.NOT_ACCEPTABLE).send({success:false,message:"Login failed"})
    })
    }).catch((err)=>{
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({success:false,message:"something went wrong"})
    })
    
    }
    else{
      return res.status(httpStatus.NOT_ACCEPTABLE).send({success:false,message:"user doesnot exists"})
    }
  }).catch((err)=>{
    console.log(err)
  })
}
}


function validateUser(password,hash) {
  return new Promise((resolve,reject)=>{
    bcrypt
      .compare(password, hash)
      .then(res => {
      if(res)
       resolve() 
       else
       reject()// return true
      })
      .catch(err => {
        
      reject()  
      })   
  })       
}


function ValidateEmail(mail) 
{

  return String(mail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
export default Login;
