import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './stores/store';
import ResultContainer from './components/container/container.jsx'
import '../../semantic/dist/semantic.min.css';
import '../../styles/main.scss';

class MainApp extends Component {
    render () {
        return <ResultContainer />
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
