import React from "react";
import marked from "marked";
import cookie from "react-cookie";
import Cloud from "../cloud/index.js";
import "../style/main.less";
import "../style/md.less";
import "../style/publish.less";

let initText = [
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

const Publish  = React.createClass({
    getInitialState(){
        return{
            text: this.props.location.state.content ? this.props.location.state.content : initText,
            title:  "",
            desc: ""
        };
    },
    componentWillMount(){
        if(cookie.load("username") != "1453937"){
            alert("不是左爷就别干坏事好么?");
            this.props.history.pushState(null, "/homepage", null);
        }
    },
    handleInputChange(name, e){
        if(name == "title"){
            this.setState({
                title: e.target.value
            });
        }else if(name == "desc"){
            this.setState({
                desc: e.target.value
            });
        }else{
            this.setState({
                text: e.target.value
            });
        }
    },
    handleSubmit(e){
        e.preventDefault();
        Cloud.publish(this.state.title, this.state.desc, this.state.text, (res)=>{
            if(res.status == "ok"){
                alert("可能成功了吧");
                this.props.history.pushState(null, "/homepage", null);
            }
        });
        //TODO edit article
    },
    render(){
        let content = this.props.location.state.content;
        let desc = this.props.location.state.desc;
        let title = this.props.location.state.title;

        return(
            <div className="publish">
                <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Title" defaultValue={title ? title : ""} onChange={this.handleInputChange.bind(this, "title")}/>
                    <input type="text"  className="desc"  defaultValue={desc ? desc : ""} placeholder="Desc" onChange={this.handleInputChange.bind(this, "desc")}/>
                        <textarea className="md" defaultValue={content ? content : this.state.text} onChange={this.handleInputChange.bind(this, "text")}></textarea>
                    <button type="submit" className="submit" >
                        提交
                    </button>
                </form>
                <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(this.state.text) }}></div>
            </div>
        )
    }
});

export default Publish;