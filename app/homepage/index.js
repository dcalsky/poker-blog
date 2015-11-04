import ReactDOM from 'react-dom';
import React from "react";
import Homepage from './homepage.jsx';

const rootInstance = ReactDOM.render(
    <Homepage />, document.body
);

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function () {
            return [rootInstance];
        }
    });
}