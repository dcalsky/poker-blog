import ReactDOM from 'react-dom';
import React from "react";
import Publish from "./publish.jsx";

const element = module.hot ? document.body : document.getElementById("publish");
const rootInstance = ReactDOM.render(
    <Publish />, element
);

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function () {
            return [rootInstance];
        }
    });
}