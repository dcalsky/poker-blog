import React from "react";
import cookie from "cookie-cutter";
import LeftNav from "../../components/left-nav.jsx";
import Cloud from "../../cloud/index.js";
import MD from "react-markdown";
import "../../style/main.less";

const Post  = React.createClass({
    getInitialState(){
        return{
            article_id: null,
            title: null,
            date: null,
            content: null,
            comments: []
        };
    },
    componentWillMount(){
        let article_id = cookie.get("article_id");
        this.setState({article_id: article_id});
        Cloud.getArticle(article_id, (res)=>{
            console.log(res);
            this.setState({
                title: res.title,
                date: res.date,
                content: res.content,
                comments: res.comments
            });
        });
    },
    render(){
        return(
            <div className="postpage">
                <LeftNav />
                <article className="article">
                    <div className="title">
                        {this.state.title}
                    </div>
                    <div className="date">
                        {this.state.date}
                    </div>
                </article>
            </div>
        )
    }
});

export default Post;