import { Subheading } from "../components/Subheading";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/Inputbox";
import { Button } from "../components/Commonbutton";
import { Buttonwarning } from "../components/Buttonwarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to hold error messages
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center py-12">
            <div className="flex flex-col justify-centre">
                <div className="rounded-lg bg-white w-80 text-center p-6 h-max px-8">
                    <Heading label={"Sign up"}></Heading>
                    <Subheading label={"Enter your information to create an account"}></Subheading>
                    {error && <p className="text-red-500 mt-2 mb-4">{error}</p>} {/* Display error message */}
                    <InputBox onChange={e => {
                        setFirstName(e.target.value);
                    }} title={"First Name"} placeholder={"John"}></InputBox>
                    <InputBox onChange={e => {
                        setLastName(e.target.value);
                    }} title={"Last Name"} placeholder={"Smith"}></InputBox>
                    <InputBox onChange={e => {
                        setUserName(e.target.value);
                    }} title={"Email"} placeholder={"Johnsmith@gmail.com"}></InputBox>
                    <InputBox onChange={e => {
                        setPassword(e.target.value);
                    }} title={"Password"} placeholder={"*****"}></InputBox>
                    <div className="pt-4">
                        <Button onClick={async () => {
                            try {
                                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                    userName: userName,
                                    firstName: firstName,
                                    lastName: lastName,
                                    password: password
                                });
                                localStorage.setItem("token", response.data.token);
                                navigate("/dashboard");
                            } catch (error) {
                                if (error.response && error.response.status === 400) {
                                    setError('User already exists');
                                } else {
                                    setError('Something went wrong');
                                }
                            }
                        }} label={"Signup"}></Button>
                        <Buttonwarning description={"Already have an account?"} to={"/Signin"} buttonText={"Signin"}></Buttonwarning>
                    </div>
                </div>
            </div>
        </div>
    );
}
