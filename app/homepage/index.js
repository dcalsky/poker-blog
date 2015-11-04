import ReactDOM from 'react-dom';
import React from "react";
import Homepage from './homepage.jsx';

const element = module.hot ? document.body : document.getElementById("homepage");
const rootInstance = ReactDOM.render(
    <Homepage />, element
);

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function () {
            return [rootInstance];
        }
    });
}