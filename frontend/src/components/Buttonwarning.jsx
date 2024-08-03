import { Link } from "react-router-dom"
export function Buttonwarning({description,buttonText,to}){
    return <div className=" py-2 flex justify-centre ">
    <div>
        {description}
    </div>
    <Link to={to} className=" underline ml-2 text-md hover:text-blue-800 visited:text-purple-600">{buttonText}</Link>
    </div>
}