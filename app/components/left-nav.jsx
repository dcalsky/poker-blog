import React from "react";
import "../style/left-nav.less";
import avatar from "../images/avatar.jpg";

const LeftNav = React.createClass({
    render(){
        return(
            <div className="left-nav">
                <div className="board">
                    <div className="img">
                        <img className="avatar" src={avatar} alt="" />
                    </div>
                    <div className="title">Poker Blog</div>
                    <p className="desc">---."左左不是Mr.Right~!</p>

                    <ul>
                        <li className="hyperlink">Index</li>
                        <li className="hyperlink">Home Page</li>
                        <li className="hyperlink">About Me</li>
                    </ul>

                </div>
                <div className="copyright">
                    <p >© Copyright 2015 左爷 All rights reserved</p>
                </div>
            </div>
        );
    }
});

export default LeftNav;