import React from "react";
import{ NavLink} from 'react-router-dom'

function Pnf() {
    return(
        <div className="container">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-warning">Requested Path Not Found</h3>
                <h5 className="display-5 text-danger">404 Error</h5>
                <NavLink to={'/'} className="btn btn-outline-warning">Return Home</NavLink>
            </div>
        </div>
    )
}
export default Pnf