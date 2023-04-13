import React from 'react'
import user1 from '../../images/fashion.png'
import user2 from '../../images/fashionnxt.jpg'
import './Testimonials.css'


const Home = () => {
    return (
        <React.Fragment>
            <div style={{height: "500px"}}>
                <section className="content-container" style={{float: "left", marginLeft: "100px"}}>
                    <div className="cust-container">
                        <img src={user1} alt="Avatar" style={{width:"90px"}}/>
                        <p><span>Latest Gigs</span> Events in the town</p>
                        <p>Great attention to detail!</p>
                    </div>

                    <div className="cust-container">
                        <img src={user2} alt="Avatar" style={{width:"90px"}}/>
                        <p><span>Rebecca Flex.</span> Reporter</p>
                        <p>Nice enviroment to run my personal projects.</p>
                    </div>
                </section>
                <section className="content-container" style={{float: "right", marginRight: "100px"}}>
                    <div className="cust-container">
                    <p>Login as:</p>
                    <p><a href="/"><span>User</span></a> <a href="/"><span>Admin</span></a> <a href="/"><span>Client</span></a></p>
                    </div>
                </section>
            </div>

        </React.Fragment>
    )
}

export default Home;