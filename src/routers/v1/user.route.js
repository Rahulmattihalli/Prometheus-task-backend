import express from "express";
import authenticate from "../../middlewares/authentication";
import validate from "../../middlewares/validation";
import registerUser from "../../controllers/signup.controller";
import Login from "../../controllers/login.controller";
import { handle } from "../../utils/api-handler";
import httpStatus from "http-status";

const router = express.Router();

router.get('/',(req,res)=>{return res.status(httpStatus.OK).send({success:true})})
router.post('/register',registerUser)
router.post('/login',Login)
export default router;
