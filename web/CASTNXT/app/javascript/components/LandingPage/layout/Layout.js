import React from 'react'
import Footer from '../components/navigations/Footer'

import './Layout.css'

const Layout = (props) => {
    return(
        <React.Fragment>

            <nav className="header">
                <div className="nav-wrapper">
                    <div style={{ padding: "1.2%", textAlign: "center", backgroundColor:"black", display: "inline-block" }} >
                        <img src={require("../../../assets/images/logo.png")} alt="FASHIONXT" style={{ width: "300px" }} />
                    </div>
                    <input className="menu-btn" type="checkbox" id="menu-btn"/>
                    <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                    <ul className="menu">
                        <li><a href="/">Home</a></li>                
                    </ul>
                </div>
            </nav>

            <main className="main-content">
                {props.children}
            </main>

            <Footer/>
        </React.Fragment>
    );
}

export default Layout;