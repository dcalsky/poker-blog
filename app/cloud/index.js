import request from "superagent"

const URL = "http://localhost:5000"
const Cloud = {
    login(username, password){

    },
    register(username, password){

    },
    getGeneral(callback){
        fetch(URL + "/article/general")
        .then((res)=>{
                return res.json()
            }).then((json)=>{
                if(json.status == "ok"){
                    callback(json);
                }else{
                    alert("人品不好,加载失败~！");
                    callback({});
                }
            }).catch((err)=>{
                alert("人品不好,加载失败~！");
                callback({});
            })
    }

};

export default Cloud