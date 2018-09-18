import React, { Component } from "react";
import fire from "../config/Access.js";
import Dashboard from './Dashboard.js';

class RenderDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: fire.database(),
            user: fire.auth().currentUser,
            tag: [],
            content: ""
        };
    }

    componentDidMount(){
        const rDash = this.state;

        rDash.db.ref(rDash.user.uid + "/articles").once("value",
            el => {
                let tag = Object.keys(el.val());

                this.setState({
                    tag: tag,
                    content: tag.map(val => {return <Dashboard key={val} keyID={val} numkey={tag.indexOf(val)} title={el.val()[tag[tag.indexOf(val)]].title} />}),
                });
            }
        );
    }

    render() {
        return(
            <div style={{ marginTop: "80px" }} className="container">
                <div className="row" style={{ marginBottom: "50px" }}>
                    {this.state.content}
                </div>
            </div>
        );
    }
}

export default RenderDashboard;