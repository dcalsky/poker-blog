import React from "react";
import cookie from "cookie-cutter";
import Login from "./login.jsx";
import "../style/left-nav.less";
import avatar from "../images/avatar.jpg";

const LeftNav = React.createClass({
    getInitialState(){
        return{
            username: null,
            loginBoxShow: false
        };
    },
    componentWillMount(){
        this.setState({
            username: cookie.get("username")
        });
    },
    login(){
        if(this.state.username){
            this.logout();
        }else{
            this.setState({loginBoxShow: true});
        }
    },
    logout(){
        cookie.set("username", null);
        this.setState({
            username: null
        });
    },
    closeLoginBox(username){
        this.setState({
            loginBoxShow: false,
            username: username
        });
    },
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
                        <li className="hyperlink" onClick={this.login}>{this.state.username ?  "Your're " + this.state.username : "Login"}</li>
                        <li className="hyperlink">Home Page</li>
                        <li className="hyperlink">About Me</li>
                    </ul>
                    <div className="copyright">
                        <p >© Copyright 2015 周左左 All rights reserved</p>
                    </div>
                </div>
                {
                    this.state.loginBoxShow?
                        <Login closeLoginBox={this.closeLoginBox}/>
                        :
                        null
                }

            </div>
        );
    }
});

export default LeftNav;