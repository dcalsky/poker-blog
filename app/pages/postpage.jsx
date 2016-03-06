import React from "react";
import cookie from "react-cookie";
import LeftNav from "../components/left-nav.jsx";
import Loader from "../components/loader.jsx";
import Cloud from "../cloud/index.js";
import marked from "marked";
import backIcon from "../images/left.png";
import "../style/md.less";
import "../style/postpage.less";
import "../style/main.less";

const Post  = React.createClass({
    getInitialState(){
        return{
            article_id: null,
            title: null,
            date: null,
            content: "",
            comments: [],
            desc: null,
            comment: "",
            loadCompleted: false,
            commentCompleted: false
        };
    },
    componentWillMount(){
        let article_id = cookie.load("article_id");
        this.setState({article_id: article_id});
        Cloud.getArticle(article_id, (res)=>{
            console.log(res)
            this.setState({
                title: res.title,
                date: res.date,
                content: res.content,
                comments: res.comments,
                loadCompleted: true,
                desc: res.desc,
                commentCompleted: cookie.load("username") ? true : false
            });
        });
    },
    handleInput(e){
        this.setState({
            comment: e.target.value
        });
    },
    handleComment(){
        if(!this.state.commentCompleted || !this.state.loadCompleted){
            return;
        }
        this.setState({
            commentCompleted: false
        });
        //filter
        let content = this.state.comment.replace(/<\/?[^>]*>/g,'');
        let username = cookie.load("username").toString();
        let article_id = cookie.load("article_id");
        let new_comments = this.state.comments;
        content = content.replace(/[ | ]*\n/g,'\n');
        Cloud.comment(article_id, username, content, (res)=>{
            if(res.status == "ok"){
                new_comments.unshift({
                    username: res.username,
                    date: res.date,
                    content: content
                });
                this.setState({
                    comments: new_comments,
                    comment: "",
                    commentCompleted: true
                });
            }
        });
    },
    deleteComment(id){
        Cloud.deleteComment(id, (res)=>{
            if(res.status == "ok"){
                //TODO
            }
        });
    },
    getUsername(username){
        this.setState({
            commentCompleted: username ? true : false
        });
    },
    deleteArticle(){
        let article_id = cookie.load("article_id");
        Cloud.delete(article_id, (res)=>{
            if(res.status == "ok"){
                this.props.history.pushState(null, "/homepage", null);
            }
        });
    },
    handleBack(){
        this.props.history.pushState(null, "/homepage", null);
    },
    editArticle(){
        this.props.history.pushState(
            {
                content: this.state.content,
                title: this.state.title,
                desc: this.state.desc,
                new: false
            }, "/publish")
    },
    render(){
        return(
            <div className="postpage">
                <LeftNav getUsername={this.getUsername} history={this.props.history}/>
                <div className="post-article">
                    <img className="back" src={backIcon} alt="back button" onClick={this.handleBack}/>
                    {
                        cookie.load("username") == "1453937"?
                            <img className="delete-article" onClick={this.deleteArticle} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/324479/close.svg" alt=""/>
                            :
                            null
                    }

                    <div className="article">
                        <h1 className="title">
                            {this.state.title}
                        </h1>

                        <div className="date">
                            {this.state.date}
                        </div>
                        {
                            cookie.load("username") == "1453937"?
                                <b style={{"color": "#333", "cursor": "pointer"}} onClick={this.editArticle}>编辑</b>
                                :
                                null

                        }

                        <div className="content">
                            <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(this.state.content) }}></div>
                        </div>
                        <div className="comment-box">
                            {
                                this.state.loadCompleted?
                                    <div>
                                        <h1>Comment Box</h1>
                                        <div className="add-box">
                                            <input type="text" value={this.state.comment} onChange={this.handleInput} placeholder="Add your comment  (Use XSS if you can :) )" />
                                            <button className="add" onClick={this.handleComment} disabled={!this.state.commentCompleted}>Add</button>
                                        </div>
                                        <ul className="comments">
                                            {this.state.comments.map((comment)=>{
                                                return (
                                                    <li key={comment.id} className="comment">
                                                        <div className="username">
                                                            {comment.username}
                                                        </div>
                                                        <div className="date">
                                                            {comment.date}
                                                        </div>
                                                        <div className="content">
                                                            {comment.content}
                                                        </div>
                                                        {
                                                            cookie.load("username") == "1453937"?
                                                                <img className="delete" onClick={this.deleteComment.bind(this, comment.id)} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/324479/close.svg" alt=""/>
                                                                :
                                                                null
                                                        }
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                :
                                <Loader color={"#333"}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default Post;