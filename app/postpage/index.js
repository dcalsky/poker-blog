import ReactDOM from 'react-dom';
import React from "react";
import Postpage from "./postpage.jsx";

const element = module.hot ? document.body : document.getElementById("postpage");
const rootInstance = ReactDOM.render(
    <Postpage />, element
);

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function () {
            return [rootInstance];
        }
    });
}