import React from "react";
import LeftNav from "../../components/left-nav.jsx";
import General from "../../components/general.jsx";
import "../../style/main.less";

const Home  = React.createClass({
    getInitialState(){
        return{
            articles: [
                {
                    title: "从表演系转到软件工程",
                    desc: "一个少年从同济大学表演系一步步走向噩梦的心酸史",
                    time: "2015/10/01"
                },{
                    title: "备胎的自我修养",
                    desc: "论作为一名备胎如何合格地演好自己",
                    time: "2015/10/02"
                },{
                    title: "今晚电一开黑啦, +++",
                    desc: "大家好，我叫周左左，最近有点不走运儿...",
                    time: "2015/10/03",
                },{
                    title: "Hello World",
                    desc: "First article",
                    time: "2015/10/03",
                }]
        };
    },
    render(){
        return(
            <div className="homepage">
                <LeftNav />
                <General articles={this.state.articles} />
            </div>
        );
    }
});

export default Home;