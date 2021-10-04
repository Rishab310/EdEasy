import React from 'react'
import './Home.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Home = () => {
    return (
        <div>
            <div id="home" className="container-fluid">
                <div className="row align-items-center min-vh-100 content">
                <div className="col-md-8 ml-md-5 text-md-left">

                <h2>online</h2>
                <h1>education</h1>
                <h3>learn online from home</h3>

                <a href="#course"><button>Get Started</button></a>  

                {/* <div className="icons">
                    <a href="#" className="fab fa-facebook-f"></a>
                    <a href="#" className="fab fa-twitter"></a>
                    <a href="#" className="fab fa-instagram"></a>
                    <a href="#" className="fab fa-linkedin"></a>
                </div> */}

                </div>

                </div>


</div>
        </div>
    )
}

export default Home
