import ReactDOM from 'react-dom';
import React from "react";
import {Router, Link, IndexRoute, Route} from "react-router";
import {createHashHistory} from 'history';
import Postpage from "./pages/postpage.jsx";
import Homepage from "./pages/homepage.jsx";
import Publish from "./pages/publish.jsx";

const history = new createHashHistory();
const routes = (
    <Router history={history}>
        <Route path="/">
            <Route path="homepage" component={Homepage} />
            <Route path="publish" component={Publish} />
            <Route path="postpage" component={Postpage} />
            <IndexRoute component={Homepage} />
        </Route>
    </Router>
);

const element = module.hot ? document.body : document.getElementById("app");
const rootInstance = ReactDOM.render(
    routes, element
);

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function () {
            return [rootInstance];
        }
    });
}


