import React, {Component} from "react"
import Home from './components/pages/Home'
import Layout from './layout/Layout'

class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        debugger
        return (
            <div className="body-wrap">
                <Layout>
                    <Home/>
                </Layout>
            </div>
        )
    }
}

export default LandingPage