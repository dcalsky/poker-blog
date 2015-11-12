import React from "react";
import cookie from "cookie-cutter";
import "../style/general.less";

const General = React.createClass({
    handleInto(article_id){
        cookie.set("article_id", article_id);
        location.href = "../postpage";
    },
    render(){
        return(
            <div className="general">
                <ul className="articles">
                    {this.props.articles.map((item)=>{
                       return(
                           <li key={item.article_id}>
                                <article className="article">
                                    <h3 className="title" onClick={()=>{this.handleInto(item.article_id)}}>{item.title}</h3>
                                    <h4 className="desc">{item.desc}</h4>
                                    <p className="date">Post on {item.date}</p>
                                </article>
                           </li>
                       );
                    })}
                </ul>
            </div>
        );
    }
});

export default General;