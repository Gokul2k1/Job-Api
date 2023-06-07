import React from "react";
import{ NavLink} from 'react-router-dom'

function AccessDenied() {
    return(
        <div className="container">
            <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-danger">Access denied...Login with Proper Crenditials..</h3>
                <NavLink to={'/'} className="btn btn-outline-warning">Redirect</NavLink>
            </div>
            </div>
        </div>
    )
}
export default AccessDenied