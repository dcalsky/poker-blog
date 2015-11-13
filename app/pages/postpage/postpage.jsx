import React from "react";
import cookie from "cookie-cutter";
import LeftNav from "../../components/left-nav.jsx";
import Cloud from "../../cloud/index.js";
import marked from "marked";
import "../../style/md.less";
import "../../style/postpage.less";
import "../../style/main.less";

let markdownSrc = [
    '# Live demo\n\nChanges are automatically rendered as you type.\n\n* Follows the ',
    '[CommonMark](http://commonmark.org/) spec\n* Renders actual, "native" React DOM ',
    'elements\n* Allows you to escape or skip HTML (try toggling the checkboxes above)',
    '\n* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!\n',
    '\n## HTML block below\n\n<blockquote>\n    This blockquote will change based ',
    'on the HTML settings above.\n</blockquote>\n\n## How about some code?\n',
    '```js\nvar React = require(\'react\');\nvar Markdown = require(\'react-markdown\');',
    '\n\nReact.render(\n    <Markdown source="# Your markdown here" />,\n    document.',
    'getElementById(\'content\')\n);\n```\n\nPretty neat, eh?\n\n', '## More info?\n\n',
    'Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)\n\n',
    '---------------\n\n',
    'A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal'
].join('');

const Post  = React.createClass({
    getInitialState(){
        return{
            article_id: null,
            title: null,
            date: null,
            content: null,
            comments: [],
            comment: ""
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
    handleInput(e){
        this.setState({
            comment: e.target.value
        });
    },
    handleComment(){
        //filter
        let content = this.state.comment.replace(/<\/?[^>]*>/g,'');
        let username = cookie.get("username");
        let article_id = cookie.get("article_id");
        let new_comments = this.state.comments;

        content = content.replace(/[ | ]*\n/g,'\n');
        Cloud.comment(article_id, username, content, (res)=>{
            console.log(res);
            if(res.status == "ok"){
                new_comments.unshift({
                    username: res.username,
                    date: res.date,
                    content: content
                });
                this.setState({
                    comments: new_comments,
                    comment: ""
                });
            }
        });
    },
    render(){
        console.log(this.state.comments);
        return(
            <div className="postpage">
                <LeftNav />
                <div className="post-article">
                    <div className="article">
                        <h1 className="title">
                            {this.state.title}
                        </h1>
                        <div className="date">
                            {this.state.date}
                        </div>
                        <div className="content">
                            <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(markdownSrc) }}></div>
                        </div>
                        <div className="comment-box">
                            <h1>Comment Box</h1>
                            <div className="add-box">
                                <input type="text" value={this.state.comment} onChange={this.handleInput} placeholder="Add your comment  (Use XSS if you can :) )" />
                                <button className="add" onClick={this.handleComment}>Add</button>
                            </div>
                            <ul className="comments">
                                {this.state.comments.map((comment)=>{
                                    return (
                                        <li className="comment">
                                            <div className="username">
                                                {comment.username}
                                            </div>
                                            <div className="date">
                                                {comment.date}
                                            </div>
                                            <div className="content">
                                                {comment.content}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default Post;