import React from "react";
import CustomLink from "./pages/CustomLink";

import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav className="nav-bar">
                <Link to="/" className="site-title">
                    Site Name
                </Link>
                <ul>
                    <CustomLink to="/careers">Careers</CustomLink>
                    <CustomLink to="/about">About</CustomLink>
                </ul>
            </nav>
        </>
    );
}
