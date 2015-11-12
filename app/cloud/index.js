import request from "superagent";

const URL = "http://pokerblog.avosapps.com";
const Cloud = {
    login(username, password, callback){
        fetch(URL + "/user/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((res)=>{
                return res.json()
            }).then((json)=>{
                callback(json);
            }).catch((err)=>{
                alert("你登陆失败了,别问我为什么!!!");
                callback({});
            })
    },
    register(username, password, callback){
        fetch(URL + "/user/register", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((res)=>{
            return res.json()
        }).then((json)=>{
            callback(json);
        }).catch((err)=>{
            alert("你注册失败了,别问我为什么!!!");
            callback({});
        })
    },
    getGeneral(callback){
        fetch(URL + "/article/general")
        .then((res)=>{
                return res.json()
            }).then((json)=>{
                callback(json);
            }).catch((err)=>{
                alert("人品不好,加载失败~！");
                callback({});
            })
    },
    getArticle(article_id, callback){
        fetch(URL + "/article/" + article_id)
            .then((res)=>{
                return res.json()
            }).then((json)=>{
                callback(json);
            }).catch((err)=>{
                alert("人品不好,加载失败~！");
                callback({});
            })
    },
    publish(title, desc, content, callback){
        fetch(URL + "/article/publish", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                desc: desc,
                content: content
            })
        }).then((res)=>{
            return res.json()
        }).then((json)=>{
            callback(json);
        }).catch((err)=>{
            alert("提交失败, 你已经不是我曾经认识的那个左爷了...");
            callback({});
        })
    },
    delete(article_id, callback){
        fetch(URL + "/article/delete", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                article_id: article_id
            })
        }).then((res)=>{
            return res.json()
        }).then((json)=>{
            callback(json);
        }).catch((err)=>{
            alert("这都能删除失败?!!");
            callback({});
        })
    },
    comment(article_id, content, username, callback){
        fetch(URL + "/article/comment", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                article_id: article_id,
                content: content,
                username: username
            })
        }).then((res)=>{
            return res.json()
        }).then((json)=>{
            callback(json);
        }).catch((err)=>{
            alert("评论失败, 兄台看看网线插好了没?");
            callback({});
        })
    },

};

export default Cloud