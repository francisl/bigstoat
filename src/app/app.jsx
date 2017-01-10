import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './stores/store';
import ResultContainer from './components/container/container.jsx'
import Sidenav from './components/sidenav/sidenav.jsx'
import '../../semantic/dist/semantic.min.css';
import '../../styles/main.scss';


const HorizontalView = {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    width: '100%',
    display: 'flex'
}
class MainApp extends Component {
    render () {
        return <div style={HorizontalView}>
            <Sidenav />
            <ResultContainer />
        </div>
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
