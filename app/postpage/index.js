import ReactDOM from 'react-dom';
import React from "react";
import Postpage from "./postpage.jsx";

const rootInstance = ReactDOM.render(
    <Postpage />, document.body
);

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function () {
            return [rootInstance];
        }
    });
}