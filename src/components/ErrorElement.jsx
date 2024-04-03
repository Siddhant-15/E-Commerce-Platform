//used to display an error message when an error occurs during routing
import { useRouteError } from "react-router-dom"


const ErrorElement = () => {
    //This hook is used to access errors that occur during routing.
    const error = useRouteError();
    console.log(error);
    return (
        <div className="h4 font-bold text-4xl">There was an error...</div>
    )
}

export default ErrorElement