import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppClient from './AppClientPagination';
import AppRemote from './AppRemote';
import App from './App';
import * as serviceWorker from './serviceWorker';



class Selector extends React.Component {
  state = { app: null }
  select = (evt) => {
    const app = evt.target.id;
    switch (app) {
      case "a2": this.setState({ app: <AppClient /> }); break;
      case "a3": this.setState({ app: <AppRemote url="http://localhost:1234/api" key='1' />  }); break;
      case "a4": this.setState({ app: <AppRemote url="http://localhost:8084/paginationBackend/api/names" key='2' /> }); break;
      default: this.setState({ app: <App /> })
    }
  }
  render() {
    return ( 
    <div>
      <div onClick={this.select} >
        <a href="#" id="a1"> Render All</a>
        <a href="#" id="a2"> Paginate on Client</a>
        <a href="#" id="a3"> Paginate on Server (json-server) </a>  
        <a href="#" id="a4"> Paginate on Server (Tomcat) </a>  
      </div>
      {this.state.app}
    </div>
    )}
}

ReactDOM.render(<Selector />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
