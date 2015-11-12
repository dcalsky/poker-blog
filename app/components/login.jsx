import React from "react";
import Cloud from "../cloud/index.js";
import cookie from "cookie-cutter";
import "../style/login.less";

const Login = React.createClass({
    getInitialState(){
        return {
            login: true,
            username: null,
            password: null,
            email: null
        }
    },
    handleSubmit(e){
        let username = this.state.username, password = this.state.password;
        e.preventDefault();
        if(this.validate(username, "username") && this.validate(password, "password")){
            Cloud.login(username, password, (res)=>{
                console.log(res);
                 if(res.status == "ok"){
                     console.log("login");
                     cookie.set("username", res.username);
                 }
            });

        }else{
            alert("账号密码格式出错啦=。=");
        }
    },
    handleInputChange(name, e){
        this.setState({
            username: name == "username" ? e.target.value : this.state.username,
            password: name == "password" ? e.target.value : this.state.password,
            email: name == "email" ? e.target.value : this.state.email
        });
    },
    validate(val, name){
        switch(name){
            case "username":
                if(/\w{3,12}/.test(val)){
                    return true;
                }else{
                    return false;
                }
                break;
            case "password":
                if(/\w{6,16}/.test(val)){
                    return true;
                }else{
                    return false;
                }
                break;
        }
    },
    render(){
        return(
            <div className="login" >
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="close" onClick={this.props.closeLoginBox}><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/324479/close.svg" alt=""/></div>
                    <div className="title">
                        {this.state.login ? "Login" : "Register" }
                    </div>
                    <div className="form-group">
                        <div className="label">账号:</div>
                        <input type="text" onChange={this.handleInputChange.bind(this, "username")} />
                    </div>
                    <div className="form-group">
                        <div className="label">密码:</div>
                        <input type="password" onChange={this.handleInputChange.bind(this, "password")} />
                    </div>
                    <div className="form-group" style={{textAlign: "left"}}>
                        <p className="changeMode" onClick={()=>{this.setState({login: !this.state.login})}}>{this.state.login ? "Have no account?" : "Back to login" }</p>
                    </div>
                    <div className="form-group submit">
                        <button type="submit">
                            提交
                        </button>
                    </div>
                </form>
            </div>
        );
    }
});

export default Login;