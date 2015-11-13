import React from "react";

const Publish  = React.createClass({
    getInitialState(){
        return{
            text: "",
            title: ""
        };
    },
    componentWillMount(){
        //Todo
    },
    handleInputChange(name, e){
        if(name == "title"){
            this.setState({
                title: e.target.value
            });
        }else{
            this.setState({
                text: e.target.value
            });
        }
    },
    handleSubmit(e){
        e.preventDefault();
        //Todo
    },
    render(){
        return(
            <div className="publish">
                <form onSubmit={this.handleSubmit}>
                    <div className="title">
                        <input type="text" onChange={this.handleInputChange.bind(this, "title")}/>
                    </div>
                    <div className="text">
                        <textarea onChange={this.handleInputChange.bind(this, "text")}></textarea>
                    </div>
                    <div className="md">
                    </div>
                    <button className="submit" >
                        提交
                    </button>
                </form>
            </div>
        )
    }
});

export default Publish;