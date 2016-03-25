import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './stores/store';


class MainApp extends Component {
    render () {
        return <h1>Hello</h1>;
    }
}

const prodTemplate = <div>
    <Provider store={store}>
        <MainApp />
    </Provider>
</div>;

const devStyle = {
    marginLeft: '30%'
};

ReactDOM.render(
    prodTemplate,
    document.getElementById('main-content')
);
