import React from "react";
import "../style/loader.less";

const Loader = React.createClass({
    render(){
        let color = this.props.color ? this.props.color : "#FFF";
        return(
            <div className="loader">
                    <div className="d1" style={{background: color}}></div>
                    <div className="d2" style={{background: color}}></div>
                    <div className="d3" style={{background: color}}></div>
                    <div className="d4" style={{background: color}}></div>
                    <div className="d5" style={{background: color}}></div>
            </div>
        );
    }
});

export default Loader;