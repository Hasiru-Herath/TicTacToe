import React,{useState} from 'react';
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp() {
  const cookies=new Cookies();
  const [user,setUser]=React.useState(null)

  const signUp=()=>{
    Axios.post("http://localhpst:3000/signup",user).then((res)=>{
      const {token,userId,fristName,lastName,username,hashedPassword}=res.data;

      Cookies.set("token",token);
      Cookies.set("token",userId);
      Cookies.set("token",username);
      Cookies.set("token",fristName);
      Cookies.set("token",lastName);
      Cookies.set("token",hashedPassword);


    }); 
  };
  return (
    <div className="signUp">
      <label>Sign Up</label>
      <input placeholder='First Name' onChange={(event)=>{
          setUser({...user,firstName:event.target.value});
      }} 
      />
      <input placeholder='Last Name' onChange={(event)=>{
          setUser({...user,lastName:event.target.value});
      }} 
      />
      <input placeholder='Userame' onChange={(event)=>{
          setUser({...user,username:event.target.value});
      }} 
      />
      <input placeholder='Password' onChange={(event)=>{
          setUser({...user,password:event.target.value});
      }} 
      />
        <button onClick={signUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;