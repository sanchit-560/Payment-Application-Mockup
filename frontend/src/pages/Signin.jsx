import { Heading } from "../components/Heading"
import { InputBox } from "../components/Inputbox"
import { Subheading } from "../components/Subheading"
import { Button } from "../components/Commonbutton"
import { Buttonwarning } from "../components/Buttonwarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signin = ()=>{
     const [userName,setUserName] = useState("");
     const [password,setPassword] = useState("");
     const navigate  = useNavigate()
    return <div className="bg-slate-300 flex justify-center h-screen">
        <div className="flex flex-col justify-start pt-8">
            <div className="rounded-lg bg-white w-80 text-center p-6 h-max px-8">
                <Heading  label={"Signin"}></Heading>
                <Subheading label={"Enter your credentials to access the account"}></Subheading>
                <InputBox onChange={(e)=>{
                    setUserName(e.target.value)
                }} title={"Email"} placeholder={"Johnsmith@gmail.com"}></InputBox>
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value)
                }} title={"Password"} placeholder={"*****"}></InputBox>
                <div className="pt-4">
                 <Button onClick={async()=>{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                        userName:userName,
                        password:password
                    })
                 localStorage.setItem("token",response.data.token)
                  navigate("/dashboard")
                 }} label={"Signin"}></Button>
                <Buttonwarning description={"Do not have an account?"} to={"/Signup"} buttonText={"Signup"}></Buttonwarning>
                </div>
            </div>
        </div>
    </div>
}