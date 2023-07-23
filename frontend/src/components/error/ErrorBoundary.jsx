import { Link, useRouteError } from "react-router-dom";

function ErrorBoundary() {
    let error = useRouteError();
   
    // Uncaught ReferenceError: path is not defined
    return( 
    <div
    style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="text-center gap-y-4 flex-col"
    >
        <h1 className="text-6xl font-bold font-Roboto" >OOOPSS!!! Sorry...</h1>
        <p>OOps! there is been error, <span className="text-lg font-semibold">{error.response.data.message}</span></p>

        <p>Go back to <Link to='/login' className="text-blue-800 font-semibold">Login page</Link></p>
    </div>);
  }

  export default ErrorBoundary