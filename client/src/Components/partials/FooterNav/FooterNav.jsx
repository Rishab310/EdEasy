import React from 'react';
import { NavLink } from 'react-router-dom';
import "./FooterNav.css";
function FooterNav() {
  return ( 
    <>
      <div className="footer-nav">
        <div className="container">
          <div className="row py-1">
            <div className="col-4 d-flex justify-content-center">
              <h3>
                <NavLink to="/" className="nav-link footer-nav-link" activeClassName="selected" exact>
                  Home
                </NavLink>
              </h3>
            </div>
            <div className="col-4 d-flex justify-content-center">
              <h3>
                <NavLink to="/about" className="nav-link footer-nav-link" activeClassName="selected" exact>
                  About
                </NavLink>
              </h3>
            </div>
            <div className="col-4 d-flex justify-content-center">
              <h3>
                <NavLink to="/classes" className="nav-link footer-nav-link" activeClassName="selected" >
                  Classes
                </NavLink>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
   );
}

export default FooterNav;
{/* <li class="nav-item mx-3">
  <Link to="/" class="nav-link" aria-current="page" href="#">Home</Link>
</li>
<li class="nav-item mx-3">
  <Link to="/" class="nav-link" href="#">About</Link>
</li>
<li class="nav-item mx-3">
  <Link to="/classes" class="nav-link" href="#">Classes</Link>
</li> */}
// activeStyle={{fontWeight: "bold !important",color: "red !important"}}