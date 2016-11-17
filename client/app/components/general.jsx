import React from "react";
import cookie from "react-cookie";
import Loader from "./loader.jsx";
import "../style/general.less";

const General = React.createClass({
    handleInto(article_id){
        cookie.save("article_id", article_id);
        this.props.history.pushState(null, "/postpage", {article_id: article_id});
    },
    render(){
        let component;
        if(this.props.loadCompleted){
            component = (
                <ul className="articles">
                    {this.props.articles.map((item)=>{
                        return(
                            <li key={item.objectId}>
                                <article className="article">
                                    <h3 className="title" onClick={()=>{this.handleInto(item.objectId)}}>{item.title}</h3>
                                    <h4 className="desc">{item.desc}</h4>
                                    <p className="date">Post on {item.createdAt}</p>
                                </article>
                            </li>
                        );
                    })}
                </ul>);
        }else{
            component = <Loader />
        }
        return(
            <div className="general">
                {component}
            </div>
        );
    }
});

export default General;