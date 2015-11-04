import React from "react";
import LeftNav from "../components/left-nav.jsx";
import General from "../components/general.jsx";
import "../style/main.less";

const Home  = React.createClass({
    render(){
        return(
            <div className="homepage">
                <LeftNav />
                <General />
            </div>
        )
    }
});

export default Home;