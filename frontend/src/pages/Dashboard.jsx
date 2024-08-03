
import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export const Dashboard = ()=>{

    const [balance, setBalance] = useState(0);
    const [name,setName] = useState("")
    useEffect(()=>{
        const fetchBalance = async ()=>{
            try {

            const response  = await axios.get("http://localhost:3000/api/v1/accounts/balance",{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            setBalance(response.data.balance);
                
            } catch (error) {
                console.error("Error in fetching balance", error)
            }
        };

        fetchBalance();

    },[])

    useEffect(()=>{
        const fetchName = async()=>{

            try {

                const response = await axios.get("http://localhost:3000/api/v1/user/name",{
                    headers:{
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                setName(response.data.name)
 
            } catch (error) {
                console.error("Error in fetching name", error)
            }
        }
        fetchName();
    })

   return <div>
    <div>
        <Appbar name={name}></Appbar>
    </div>
    <div className="m-8">
        <Balance value={balance}></Balance>
        <Users></Users>
    </div>
   </div>

}
