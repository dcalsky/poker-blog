import React from "react";
import "../style/loader.less";

const Loader = React.createClass({
    render(){
        let color = this.props.color ? this.props.color : "#000";
        return(
            <div className="loader">
                    <h1>Loading ...</h1>
                    <div className="ball-box">
                      <div className="d1" style={{background: color}}></div>
                      <div className="d2" style={{background: color}}></div>
                      <div className="d3" style={{background: color}}></div>
                      <div className="d4" style={{background: color}}></div>
                      <div className="d5" style={{background: color}}></div>
                    </div>
            </div>
        );
    }
});

export default Loader;