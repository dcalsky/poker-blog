import React from "react";
import "../style/general.less";

const General = React.createClass({
    render(){
        return(
            <div className="general">
                <ul className="articles">
                    {this.props.articles.map((item)=>{
                       return(
                           <li>
                                <article className="article">
                                    <h3 className="title">{item.title}</h3>
                                    <h4 className="desc">{item.desc}</h4>
                                    <p className="date">Post on {item.time}</p>
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