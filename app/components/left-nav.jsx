import React from "react";
import cookie from "react-cookie";
import Login from "./login.jsx";
import "../style/left-nav.less";
import avatar from "../images/avatar.jpg";
import config from "../config.json";

const LeftNav = React.createClass({
    getInitialState(){
        return{
            username: null,
            loginBoxShow: false
        };
    },
    componentWillMount(){
        this.setState({
            username: cookie.load("username")
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
        cookie.remove("username");
        this.setState({
            username: null
        });
        if(this.props.getUsername){
            this.props.getUsername(null);
        }

    },
    closeLoginBox(username){
        this.setState({
            loginBoxShow: false,
            username: username
        });
        if(this.props.getUsername){
            this.props.getUsername(username);
        }
    },
    render(){
        return(
            <div className="left-nav">
                <div className="board">
                    <div className="img">
                        <img className="avatar" src={avatar} alt="" />
                    </div>
                    <div className="title">{config.site_name}</div>
                    <p className="desc">{config.desc}</p>
                    <ul>
                        <li className="hyperlink" onClick={this.login}>{this.state.username ?  "Your're " + this.state.username : "Login"}</li>
                        <li className="hyperlink" onClick={()=>{this.props.history.pushState(null, "/homepage", null)}} >Home Page</li>
                        <li className="hyperlink">About Me</li>
                    </ul>
                    <div className="copyright">
                        <p >{config.copyright}</p>
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