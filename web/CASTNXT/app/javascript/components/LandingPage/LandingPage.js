import React, {Component, Fragment} from "react"
import Home from './components/pages/Home'
import Layout from './layout/Layout'
import Header from './components/misc/Header'


class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className="body-wrap">
                    <Layout>
                        <Home/>
                    </Layout>
                </div>
            </Fragment>
        )
    }
}

export default LandingPage