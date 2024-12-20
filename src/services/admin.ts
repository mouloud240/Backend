import StatusCode from "../enums/statusCode.enum"
import { adminModel, Iadmin } from "../models/admin"
import bcrypt from 'bcrypt';
export async function login(username:string,password:string){
  try {
    const admin=await adminModel.findOne({Username:username})
    if(admin==null){
      return {
        data:"User not found",
        Status:StatusCode.NOT_FOUND
      }
    }
    if(!await bcrypt.compare(password,admin.password)){
      return {
        data:"Incorrect Password",
        Status:StatusCode.UNAUTHORIZED
      }
    }
    return {
      data:admin,
      Status:StatusCode.OK
    }
  }catch(e){
    return {
      data:e,
      Status:StatusCode.INTERNAL_SERVER_ERROR
    }
  }}
export async function register(admin:Iadmin){
  try {
    const hash=await bcrypt.hash(admin.password,10);
    admin.password=hash;
    const model=new adminModel(admin);
    const output=await model.save();
    return {
      data:output,
      Status:StatusCode.CREATED
    }
  } catch (error) {
    return {
      data:error,
      Status:StatusCode.INTERNAL_SERVER_ERROR
    }
  }
}
export async function checkToken(token:String){
  try {
    const admin=await adminModel.findOne({token:token});
    if(admin==null){
      false
    }
    return true
  } catch (error) {
  return false 
  }
}
