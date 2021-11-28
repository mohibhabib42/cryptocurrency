import React from 'react'
import {Link} from "react-router-dom"

function Navigation() {
    return (
        <div className="Navbar">
            <Link to="/">
                <span>
                    Crypto
                </span>
            </Link>
        </div>
    )
}

export default Navigation
